"""Shared conformance helpers for Python."""

from __future__ import annotations

import json
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Callable

import pytest


@dataclass
class ResolvedExpected:
    """Resolved expected outcome for a test case."""

    result: Any | None = None
    error: str | None = None
    skip: str | None = None


@dataclass
class ConformanceCase:
    """A shared conformance case."""

    id: str
    input_data: Any
    expected: ResolvedExpected


_REPO_ROOT = Path(__file__).resolve().parents[3]
_INPUT_ROOT = _REPO_ROOT / "test" / "input"
_EXPECTED_ROOT = _REPO_ROOT / "test" / "expected"
_PLATFORM_EXCEPTION_ROOT = _REPO_ROOT / "test" / "platform-exceptions"


def _read_json(path: Path) -> Any:
    return json.loads(path.read_text())


def _walk_json_files(root: Path) -> list[Path]:
    return sorted(path for path in root.rglob("*.json") if path.is_file())


def _resolve_expected(
    suite: str,
    case_id: str,
    payload: dict[str, Any],
    platform: str,
) -> ResolvedExpected:
    exception_path = _PLATFORM_EXCEPTION_ROOT / platform / suite / f"{case_id}.json"

    if exception_path.exists():
        exception = _read_json(exception_path)
        reason = str(exception.get("reason", "")).strip()
        if not reason:
            raise ValueError(
                f'Platform exception "{suite}/{case_id}" is missing a reason.'
            )

        if exception.get("skip"):
            if "result" in exception or "error" in exception:
                raise ValueError(
                    f'Platform exception "{suite}/{case_id}" cannot define '
                    "skip with result or error."
                )

            return ResolvedExpected(skip=reason)

        has_result = "result" in exception
        has_error = "error" in exception
        if has_result == has_error:
            raise ValueError(
                f'Platform exception "{suite}/{case_id}" must define exactly '
                "one of result or error."
            )

        return ResolvedExpected(
            result=exception.get("result"),
            error=exception.get("error", {}).get("message"),
        )

    has_result = "result" in payload
    has_error = "error" in payload
    if has_result == has_error:
        raise ValueError(
            f'Conformance case "{suite}/{case_id}" must define exactly one of '
            "result or error."
        )

    return ResolvedExpected(
        result=payload.get("result"),
        error=payload.get("error", {}).get("message"),
    )


def load_cases(suite: str, platform: str = "python") -> list[ConformanceCase]:
    """Load all cases for a suite."""

    input_root = _INPUT_ROOT / suite
    expected_root = _EXPECTED_ROOT / suite

    cases: list[ConformanceCase] = []
    for input_path in _walk_json_files(input_root):
        relative_path = input_path.relative_to(input_root)
        expected_path = expected_root / relative_path

        if not expected_path.exists():
            raise FileNotFoundError(f"Missing expected file for {suite}/{relative_path}")

        case_id = str(relative_path.with_suffix("")).replace("\\", "/")
        input_data = _read_json(input_path)
        expected_payload = _read_json(expected_path)

        cases.append(
            ConformanceCase(
                id=case_id,
                input_data=input_data,
                expected=_resolve_expected(suite, case_id, expected_payload, platform),
            )
        )

    return cases


def case_ids(case: ConformanceCase) -> str:
    """Stable pytest case ids."""

    return case.id


def assert_case(case: ConformanceCase, run: Callable[[Any], Any]) -> None:
    """Run and assert a shared conformance case."""

    if case.expected.skip:
        pytest.skip(case.expected.skip)

    if case.expected.error:
        with pytest.raises(Exception, match=re.escape(case.expected.error)):
            run(case.input_data)
        return

    assert run(case.input_data) == case.expected.result
