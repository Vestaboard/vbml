"""Test validate props.

Port of Vestaboard/vbml/src/__tests__/validateProps.spec.ts
"""

from __future__ import annotations

from typing import Any

import pytest

from pyvbml.schema_errors import SchemaIssue, VBMLSchemaError
from pyvbml.validate_props import validate_props

BASE: dict[str, Any] = {"description": "d", "evidence": "Freeform"}


def field(**kwargs: Any) -> dict[str, Any]:
    """Build a schema field."""
    return {**BASE, **kwargs}


def issues_of(schema: dict, props: Any) -> list[SchemaIssue]:
    """Return the issues raised by validating props, or an empty list."""
    try:
        validate_props(schema, props)
    except VBMLSchemaError as err:
        return err.issues
    return []


def codes(schema: dict, props: Any) -> list[str]:
    """Return issue codes."""
    return [i["code"] for i in issues_of(schema, props)]


class TestRequired:
    """Required props."""

    def test_throws_when_a_declared_prop_is_missing(self) -> None:
        """Should throw when a declared prop is missing."""
        issues = issues_of({"a": field()}, {})
        assert len(issues) == 1
        assert issues[0]["prop"] == "a"
        assert issues[0]["code"] == "missing"

    def test_treats_none_as_missing(self) -> None:
        """Should treat None as missing."""
        assert codes({"a": field()}, {"a": None}) == ["missing"]

    def test_treats_missing_as_missing_when_props_is_none(self) -> None:
        """Should treat props=None as everything missing."""
        assert codes({"a": field()}, None) == ["missing"]

    def test_allows_missing_when_required_is_false(self) -> None:
        """Should allow a missing prop when required is False."""
        assert codes({"a": field(required=False)}, {}) == []

    def test_still_validates_an_optional_prop_when_provided(self) -> None:
        """Should validate an optional prop when it is provided."""
        schema = {"a": field(required=False, type="Numeric")}
        assert codes(schema, {"a": "abc"}) == ["invalid_type"]

    def test_ignores_props_not_declared_in_the_schema(self) -> None:
        """Should ignore undeclared props."""
        assert codes({"a": field()}, {"a": "x", "extra": [[1]]}) == []

    def test_does_not_treat_falsy_values_as_missing(self) -> None:
        """Should not treat 0 or empty string as missing."""
        assert codes({"a": field(type="Numeric")}, {"a": 0}) == []
        assert codes({"a": field()}, {"a": ""}) == []


class TestText:
    """Text type."""

    def test_default_type_accepts_strings(self) -> None:
        """Should default to Text and accept strings."""
        assert codes({"a": field()}, {"a": "hello"}) == []

    @pytest.mark.parametrize("value", [5, [[1]], {"x": 1}, True])
    def test_rejects_non_strings(self, value: Any) -> None:
        """Should reject non-strings."""
        assert codes({"a": field()}, {"a": value}) == ["invalid_type"]

    def test_allows_a_value_that_exactly_fills_columns(self) -> None:
        """Should allow a value that exactly fills the columns."""
        assert codes({"a": field(columns=6)}, {"a": "Lakers"}) == []

    def test_rejects_a_value_that_exceeds_columns(self) -> None:
        """Should reject a value that exceeds the columns."""
        assert codes({"a": field(columns=5)}, {"a": "Lakers"}) == [
            "too_many_columns"
        ]

    def test_measures_columns_per_line(self) -> None:
        """Should measure columns per line."""
        assert codes({"a": field(columns=3)}, {"a": "abc\ndef"}) == []

    def test_rejects_too_many_rows(self) -> None:
        """Should reject too many rows."""
        assert codes({"a": field(rows=2)}, {"a": "a\nb\nc"}) == ["too_many_rows"]

    def test_allows_exactly_max_rows(self) -> None:
        """Should allow exactly the max rows."""
        assert codes({"a": field(rows=2)}, {"a": "a\nb"}) == []

    def test_counts_character_code_tokens_as_one_cell(self) -> None:
        """Should count {nn} tokens as a single cell."""
        assert codes({"a": field(columns=4)}, {"a": "Go {63}"}) == []

    def test_counts_color_emoji_as_one_cell(self) -> None:
        """Should count color emoji as a single cell."""
        assert codes({"a": field(columns=4)}, {"a": "Go 🟥"}) == []

    def test_reports_both_rows_and_columns(self) -> None:
        """Should report both rows and columns problems."""
        assert codes({"a": field(rows=1, columns=1)}, {"a": "ab\ncd"}) == [
            "too_many_rows",
            "too_many_columns",
        ]


class TestNumeric:
    """Numeric type."""

    schema = {"a": field(type="Numeric")}

    @pytest.mark.parametrize("value", [42, 3.5, -1, 0, "42", "-3.5", "0", " 7 "])
    def test_accepts(self, value: Any) -> None:
        """Should accept finite numbers and numeric strings."""
        assert codes(self.schema, {"a": value}) == []

    @pytest.mark.parametrize(
        "value",
        [
            float("nan"),
            float("inf"),
            "",
            "  ",
            "abc",
            "4x",
            "1_000",
            "nan",
            "inf",
            True,
            {},
            [],
        ],
    )
    def test_rejects(self, value: Any) -> None:
        """Should reject everything else."""
        assert codes(self.schema, {"a": value}) == ["invalid_type"]

    def test_applies_columns_to_the_string_form(self) -> None:
        """Should apply columns to the string form."""
        schema = {"a": field(type="Numeric", columns=3)}
        assert codes(schema, {"a": 999}) == []
        assert codes(schema, {"a": 1000}) == ["too_many_columns"]


class TestColor:
    """Color type."""

    schema = {"a": field(type="Color")}

    @pytest.mark.parametrize("value", [63, 70, 71, "63", "{63}", "{71}"])
    def test_accepts(self, value: Any) -> None:
        """Should accept codes 63-71 in all forms."""
        assert codes(self.schema, {"a": value}) == []

    @pytest.mark.parametrize(
        "value", [62, 72, 0, "red", "{62}", "{72}", "{}", "", 63.5, True]
    )
    def test_rejects(self, value: Any) -> None:
        """Should reject non-colors."""
        assert codes(self.schema, {"a": value}) == ["invalid_color"]


class TestEnum:
    """Enum type."""

    schema = {
        "a": field(
            type="Enum",
            options=[
                {"value": "home", "description": "Home team"},
                {"value": "away", "description": "Away team"},
            ],
        )
    }

    def test_accepts_a_listed_value(self) -> None:
        """Should accept a listed value."""
        assert codes(self.schema, {"a": "home"}) == []

    def test_rejects_unlisted_values_case_sensitively(self) -> None:
        """Should reject unlisted values, case-sensitively."""
        assert codes(self.schema, {"a": "Home"}) == ["invalid_enum"]
        assert codes(self.schema, {"a": "neutral"}) == ["invalid_enum"]

    def test_lists_valid_options_in_the_message(self) -> None:
        """Should list the valid options in the message."""
        message = issues_of(self.schema, {"a": "x"})[0]["message"]
        assert "home" in message
        assert "away" in message


class TestMultipleProblems:
    """Multiple problems."""

    def test_collects_every_issue(self) -> None:
        """Should collect every issue into one error."""
        schema = {
            "a": field(),
            "b": field(type="Numeric"),
            "c": field(type="Color"),
        }
        issues = issues_of(schema, {"b": "x", "c": 5})
        assert [(i["prop"], i["code"]) for i in issues] == [
            ("a", "missing"),
            ("b", "invalid_type"),
            ("c", "invalid_color"),
        ]

    def test_puts_every_issue_in_the_message(self) -> None:
        """Should put every issue in the message."""
        with pytest.raises(VBMLSchemaError) as exc:
            validate_props({"a": field(), "b": field()}, {})
        assert "a" in str(exc.value)
        assert "b" in str(exc.value)
        assert type(exc.value).__name__ == "VBMLSchemaError"
