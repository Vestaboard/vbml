"""Schema errors.

Port of Vestaboard/vbml/src/schemaErrors.ts
"""

from __future__ import annotations

from typing import Literal, TypedDict

SchemaIssueCode = Literal[
    "missing",
    "invalid_type",
    "too_many_columns",
    "too_many_rows",
    "invalid_color",
    "invalid_enum",
]


class SchemaIssue(TypedDict):
    """A single problem found while validating props."""

    prop: str
    code: SchemaIssueCode
    message: str


class VBMLSchemaError(Exception):
    """Raised when props do not satisfy the schema."""

    def __init__(self, issues: list[SchemaIssue]) -> None:
        """Initialize with every issue that was found."""
        lines = "\n".join(f"- {i['prop']}: {i['message']}" for i in issues)
        super().__init__(f"Props do not match the schema:\n{lines}")
        self.issues = issues


class VBMLSchemaDefinitionError(Exception):
    """Raised when the schema definition itself is malformed."""
