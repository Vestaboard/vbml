"""Validate props.

Port of Vestaboard/vbml/src/validateProps.ts
"""

from __future__ import annotations

import math
import re
from typing import Any

from .character_codes import CharacterCode
from .emojis_to_character_codes import emojis_to_character_codes
from .schema_errors import SchemaIssue, VBMLSchemaError
from .types import SchemaField, VBMLProps, VBMLSchema

_NUMERIC_RE = re.compile(r"^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$")
_COLOR_RE = re.compile(r"^(?:\{(\d{1,2})\}|(\d{1,2}))$")
_TOKEN_RE = re.compile(r"\{\d{1,2}\}")

Problem = tuple[str, str]


def _check_size(text: str, field: SchemaField) -> list[Problem]:
    """Each {nn} token and each color emoji counts as one cell."""
    lines = _TOKEN_RE.sub("\0", emojis_to_character_codes(text)).split("\n")
    problems: list[Problem] = []
    rows = field.get("rows")
    if rows is not None and len(lines) > rows:
        problems.append(
            (
                "too_many_rows",
                f"has {len(lines)} rows but at most {rows} are allowed",
            )
        )
    columns = field.get("columns")
    if columns is not None:
        widest = max(len(line) for line in lines)
        if widest > columns:
            problems.append(
                (
                    "too_many_columns",
                    f"has {widest} columns but at most {columns} are allowed",
                )
            )
    return problems


def _is_numeric(value: Any) -> bool:
    if isinstance(value, bool):
        return False
    if isinstance(value, (int, float)):
        return math.isfinite(value)
    if isinstance(value, str):
        stripped = value.strip()
        return bool(_NUMERIC_RE.match(stripped)) and math.isfinite(float(stripped))
    return False


def _color_code(value: Any) -> float | None:
    if isinstance(value, bool):
        return None
    if isinstance(value, (int, float)):
        return value
    if isinstance(value, str):
        match = _COLOR_RE.match(value)
        if match:
            return int(match.group(1) or match.group(2))
    return None


def _numeric_text(value: Any) -> str:
    if isinstance(value, float) and value.is_integer():
        return str(int(value))
    return str(value)


def _check_field(value: Any, field: SchemaField) -> list[Problem]:
    field_type = field.get("type") or "Text"
    if field_type == "Numeric":
        if _is_numeric(value):
            return _check_size(_numeric_text(value), field)
        return [("invalid_type", "must be a number or numeric string")]
    if field_type == "Color":
        code = _color_code(value)
        if (
            code is not None
            and CharacterCode.RED <= code <= CharacterCode.FILLED
            and code == int(code)
        ):
            return []
        return [("invalid_color", "must be a color code from 63 to 71")]
    if field_type == "Enum":
        options = [o["value"] for o in field.get("options") or []]
        if value in options:
            return []
        return [("invalid_enum", f"must be one of: {', '.join(options)}")]
    if isinstance(value, str):
        return _check_size(value, field)
    return [("invalid_type", "must be a string")]


def validate_props(schema: VBMLSchema, props: VBMLProps | None) -> None:
    """Raise VBMLSchemaError listing every prop that violates the schema."""
    issues: list[SchemaIssue] = []

    for prop, field in schema.items():
        value = props.get(prop) if props else None

        if value is None:
            if field.get("required") is not False:
                issues.append(
                    {
                        "prop": prop,
                        "code": "missing",
                        "message": "is required but was not provided",
                    }
                )
            continue

        for code, message in _check_field(value, field):
            issues.append({"prop": prop, "code": code, "message": message})  # type: ignore[typeddict-item]

    if issues:
        raise VBMLSchemaError(issues)
