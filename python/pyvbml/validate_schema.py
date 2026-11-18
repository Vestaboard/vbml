"""Validate schema.

Port of Vestaboard/vbml/src/validateSchema.ts
"""

from __future__ import annotations

from typing import Any, NoReturn, get_args

from .schema_errors import VBMLSchemaDefinitionError
from .types import Evidence, SchemaFieldType

EVIDENCE_VALUES = get_args(Evidence)
TYPE_VALUES = get_args(SchemaFieldType)


def _fail(prop: str, message: str) -> NoReturn:
    raise VBMLSchemaDefinitionError(f'Invalid schema for "{prop}": {message}')


def _is_positive_integer(value: Any) -> bool:
    if isinstance(value, bool):
        return False
    if isinstance(value, float):
        value = int(value) if value.is_integer() else None
    return isinstance(value, int) and value > 0


def _validate_field(prop: str, field: Any) -> None:
    if not isinstance(field, dict):
        _fail(prop, "field definition must be an object")

    description = field.get("description")
    if not isinstance(description, str) or description == "":
        _fail(prop, "description is required")

    evidence = field.get("evidence")
    if evidence is not None and evidence not in EVIDENCE_VALUES:
        _fail(prop, f"evidence must be one of {', '.join(EVIDENCE_VALUES)}")

    rule = field.get("evidenceRule")
    if rule is not None and not isinstance(rule, str):
        _fail(prop, "evidenceRule must be a string")

    field_type = field.get("type")
    if field_type is None:
        field_type = "Text"
    if field_type not in TYPE_VALUES:
        _fail(prop, f"type must be one of {', '.join(TYPE_VALUES)}")

    for key in ("rows", "columns"):
        if field.get(key) is not None and not _is_positive_integer(field[key]):
            _fail(prop, f"{key} must be a positive integer")

    required = field.get("required")
    if required is not None and not isinstance(required, bool):
        _fail(prop, "required must be a boolean")

    options = field.get("options")
    if field_type != "Enum":
        if options is not None:
            _fail(prop, "options are only allowed when type is Enum")
        return

    if not isinstance(options, list) or len(options) == 0:
        _fail(prop, "options must be a non-empty array when type is Enum")

    seen: set[str] = set()
    for option in options:
        if (
            not isinstance(option, dict)
            or not isinstance(option.get("value"), str)
            or not isinstance(option.get("description"), str)
        ):
            _fail(prop, "each of options needs a string value and description")
        if option["value"] in seen:
            _fail(prop, f'duplicate option value "{option["value"]}"')
        seen.add(option["value"])


def validate_schema(schema: Any) -> None:
    """Raise VBMLSchemaDefinitionError if the schema itself is malformed."""
    if not isinstance(schema, dict):
        raise VBMLSchemaDefinitionError("Invalid schema: must be an object")
    for prop, field in schema.items():
        _validate_field(prop, field)
