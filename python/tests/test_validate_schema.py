"""Test validate schema.

Port of Vestaboard/vbml/src/__tests__/validateSchema.spec.ts
"""

from __future__ import annotations

import re
from typing import Any

import pytest

from pyvbml.schema_errors import VBMLSchemaDefinitionError
from pyvbml.validate_schema import validate_schema

OK: dict[str, Any] = {"description": "d", "evidence": "Freeform"}


def message_of(schema: Any) -> str | None:
    """Return the definition error message, or None when valid."""
    try:
        validate_schema(schema)
    except VBMLSchemaDefinitionError as err:
        assert type(err).__name__ == "VBMLSchemaDefinitionError"
        return str(err)
    return None


def assert_message(schema: Any, pattern: str) -> None:
    """Assert the schema is rejected with a matching message."""
    message = message_of(schema)
    assert message is not None, "expected VBMLSchemaDefinitionError"
    assert re.search(pattern, message), message


def test_accepts_a_valid_schema_of_every_type() -> None:
    """Should accept a valid schema of every type."""
    assert (
        message_of(
            {
                "a": {**OK},
                "b": {**OK, "type": "Text", "rows": 2, "columns": 10},
                "c": {**OK, "type": "Numeric", "evidence": "TemporalFact"},
                "d": {**OK, "type": "Color", "evidence": "GeneralFact"},
                "e": {
                    **OK,
                    "type": "Enum",
                    "options": [{"value": "x", "description": "X"}],
                    "evidenceRule": "Use the same game as away_score.",
                    "required": False,
                },
            }
        )
        is None
    )


def test_requires_a_description() -> None:
    """Should require a description."""
    assert_message({"a": {"evidence": "Freeform"}}, r"a.*description")
    assert_message({"a": {**OK, "description": ""}}, r"a.*description")


def test_treats_evidence_as_optional() -> None:
    """Should treat evidence as optional (defaults to Freeform)."""
    assert message_of({"a": {"description": "d"}}) is None
    assert message_of({"a": {"description": "d", "evidence": None}}) is None


def test_rejects_an_invalid_evidence_when_provided() -> None:
    """Should reject an invalid evidence when provided."""
    assert_message({"a": {**OK, "evidence": "Guess"}}, r"a.*evidence")


def test_rejects_a_non_string_evidence_rule() -> None:
    """Should reject a non-string evidenceRule."""
    assert_message({"a": {**OK, "evidenceRule": 5}}, r"a.*evidenceRule")


def test_rejects_an_unknown_type() -> None:
    """Should reject an unknown type."""
    assert_message({"a": {**OK, "type": "Date"}}, r"a.*type")


@pytest.mark.parametrize("value", [0, -1, 1.5, "3", True])
def test_rejects_bad_rows_and_columns(value: Any) -> None:
    """Should reject non-positive-integer rows/columns."""
    assert_message({"a": {**OK, "rows": value}}, r"a.*rows")
    assert_message({"a": {**OK, "columns": value}}, r"a.*columns")


def test_rejects_a_non_boolean_required() -> None:
    """Should reject a non-boolean required."""
    assert_message({"a": {**OK, "required": "yes"}}, r"a.*required")


class TestEnumOptions:
    """Enum options."""

    def test_are_required_for_enum(self) -> None:
        """Should require options for Enum."""
        assert_message({"a": {**OK, "type": "Enum"}}, r"a.*options")

    def test_must_not_be_empty(self) -> None:
        """Should reject empty options."""
        assert_message({"a": {**OK, "type": "Enum", "options": []}}, r"a.*options")

    def test_must_each_have_a_value_and_description(self) -> None:
        """Should require a string value and description on each option."""
        assert_message(
            {"a": {**OK, "type": "Enum", "options": [{"value": "x"}]}},
            r"a.*options",
        )
        assert_message(
            {"a": {**OK, "type": "Enum", "options": [{"description": "x"}]}},
            r"a.*options",
        )

    def test_must_have_unique_values(self) -> None:
        """Should reject duplicate values."""
        assert_message(
            {
                "a": {
                    **OK,
                    "type": "Enum",
                    "options": [
                        {"value": "x", "description": "1"},
                        {"value": "x", "description": "2"},
                    ],
                }
            },
            r"(?i)a.*duplicate",
        )

    def test_are_not_allowed_on_non_enum_types(self) -> None:
        """Should reject options on non-Enum types."""
        assert_message(
            {"a": {**OK, "options": [{"value": "x", "description": "X"}]}},
            r"a.*options",
        )


def test_rejects_non_object_schema_or_field() -> None:
    """Should reject a schema or field that is not a dict."""
    assert message_of([]) is not None
    assert message_of("x") is not None
    assert_message({"a": "x"}, r"a")
