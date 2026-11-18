"""Test vbml.parse with a schema.

Port of Vestaboard/vbml/src/__tests__/schema.spec.ts
"""

from __future__ import annotations

import json
from typing import Any

import pytest

from pyvbml import Color, VBMLSchemaDefinitionError, VBMLSchemaError, vbml


def definition(props: dict, schema: dict | None = None) -> dict[str, Any]:
    """Build a definition."""
    return {
        "props": props,
        "schema": schema
        or {
            "team": {
                "description": "Team name",
                "columns": 8,
                "evidence": "GeneralFact",
            }
        },
        "components": [{"template": "{{team}}"}],
    }


def test_parses_normally_when_props_satisfy_the_schema() -> None:
    """Should parse normally when props satisfy the schema."""
    with_schema = definition({"team": "Lakers"})
    without_schema = {k: v for k, v in with_schema.items() if k != "schema"}
    assert vbml.parse(with_schema) == vbml.parse(without_schema)


def test_is_unchanged_when_no_schema_is_given() -> None:
    """Should not validate when no schema is given."""
    vbml.parse({"props": {}, "components": [{"template": "{{team}}"}]})


def test_throws_schema_error_when_props_do_not_meet_the_schema() -> None:
    """Should throw VBMLSchemaError when props do not meet the schema."""
    with pytest.raises(VBMLSchemaError):
        vbml.parse(definition({"team": "Timberwolves"}))
    with pytest.raises(VBMLSchemaError):
        vbml.parse(definition({}))


def test_throws_definition_error_before_checking_props() -> None:
    """Should throw VBMLSchemaDefinitionError for a malformed schema."""
    with pytest.raises(VBMLSchemaDefinitionError):
        vbml.parse(
            definition(
                {},
                {"team": {"type": "Enum", "description": "d", "evidence": "Freeform"}},
            )
        )


def test_exports_a_semantic_color_map() -> None:
    """Should export a semantic Color map."""
    assert {c.name: int(c) for c in Color} == {
        "RED": 63,
        "ORANGE": 64,
        "YELLOW": 65,
        "GREEN": 66,
        "BLUE": 67,
        "VIOLET": 68,
        "WHITE": 69,
        "BLACK": 70,
        "FILLED": 71,
    }


def test_color_members_are_valid_color_props() -> None:
    """Should accept Color members as Color props."""
    vbml.parse(
        {
            "props": {"c": Color.RED},
            "schema": {"c": {"type": "Color", "description": "d"}},
            "components": [{"template": "x"}],
        }
    )


def test_works_with_a_json_parsed_definition() -> None:
    """Should work with a JSON-parsed definition."""
    parsed = json.loads(
        json.dumps(
            {
                "props": {"c": "{63}"},
                "schema": {
                    "c": {
                        "type": "Color",
                        "description": "Accent",
                        "evidence": "Freeform",
                    }
                },
                "components": [{"template": "{{c}}"}],
            }
        )
    )
    assert 63 in vbml.parse(parsed)[0]
