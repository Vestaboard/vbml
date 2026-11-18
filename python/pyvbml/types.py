"""Types.

Port of Vestaboard/vbml/src/types.ts
"""

from __future__ import annotations

import sys
from typing import Any, Literal, TypedDict

if sys.version_info >= (3, 11):
    from enum import StrEnum
else:
    from backports.strenum import StrEnum


class Justify(StrEnum):
    """Justify options."""

    CENTER = "center"
    LEFT = "left"
    RIGHT = "right"
    JUSTIFIED = "justified"


class Align(StrEnum):
    """Align options."""

    CENTER = "center"
    TOP = "top"
    BOTTOM = "bottom"
    JUSTIFIED = "justified"
    ABSOLUTE = "absolute"


class AbsolutePosition(TypedDict):
    """Absolute position."""

    x: int
    y: int


class ComponentStyle(TypedDict, total=False):
    """Component style."""

    justify: Justify
    align: Align
    height: int
    width: int
    absolutePosition: AbsolutePosition


class VBMLStyle(TypedDict, total=False):
    """VBML style."""

    height: int
    width: int


# VBMLProps is an open dict
VBMLProps = dict[str, Any]


class CalendarData(TypedDict, total=False):
    """Calendar data."""

    month: int
    year: int
    defaultDayColor: int
    days: dict[str | int, int]  # highlighted days
    hideSMTWTFS: bool
    hideDates: bool
    hideMonthYear: bool


class RandomColorsData(TypedDict, total=False):
    """Random colors data."""

    colors: list[int]


class IVBMLComponent(TypedDict, total=False):
    """VBML component interface."""

    template: str
    rawCharacters: list[list[int]]
    calendar: CalendarData
    randomColors: RandomColorsData
    style: ComponentStyle


SchemaFieldType = Literal["Text", "Numeric", "Color", "Enum"]

# TemporalFact: requires a user-supplied value or a source matching the
#   requested event and time.
# GeneralFact: model knowledge is sufficient, e.g. a team color.
# Freeform: any value within the field constraints, e.g. a decorative accent.
# Evidence is guidance for agents and tooling; it is never enforced by parse.
Evidence = Literal["TemporalFact", "GeneralFact", "Freeform"]


class SchemaOption(TypedDict):
    """A single allowed value of an Enum schema field."""

    value: str
    description: str


class SchemaField(TypedDict, total=False):
    """Schema field definition. `description` is required."""

    description: str
    rows: int
    columns: int
    type: SchemaFieldType
    options: list[SchemaOption]
    evidence: Evidence
    evidenceRule: str
    required: bool


# VBMLSchema maps a prop name to its field definition
VBMLSchema = dict[str, SchemaField]


class IVBML(TypedDict, total=False):
    """VBML interface."""

    props: VBMLProps
    schema: VBMLSchema
    style: VBMLStyle
    components: list[IVBMLComponent]


class ICharacterCodesToStringOptions(TypedDict, total=False):
    """Character codes to string options interface."""

    allowLineBreaks: bool
