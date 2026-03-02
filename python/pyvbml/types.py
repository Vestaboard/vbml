"""Types.

Port of Vestaboard/vbml/src/types.ts
"""

from __future__ import annotations

import sys
from typing import Any, TypedDict

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


class IVBML(TypedDict, total=False):
    """VBML interface."""

    props: VBMLProps
    style: VBMLStyle
    components: list[IVBMLComponent]


class ICharacterCodesToStringOptions(TypedDict, total=False):
    """Character codes to string options interface."""

    allowLineBreaks: bool
