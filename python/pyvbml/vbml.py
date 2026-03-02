"""VBML.

Port of Vestaboard/vbml/src/index.ts

Main entry point. Exposes the `vbml` namespace object and re-exports
all public types.
"""

from __future__ import annotations

from typing import cast

from .calendar import make_calendar
from .const import DIMENSIONS_FLAGSHIP
from .create_empty_board import create_empty_board
from .layout_components import layout_components
from .parse_calendar_component import parse_calendar_component
from .parse_component import parse_absolute_component, parse_component
from .types import IVBML, IVBMLComponent


def parse(input_data: IVBML) -> list[list[int]]:
    """Parse."""
    style = input_data.get("style") or {}
    height = style.get("height") or DIMENSIONS_FLAGSHIP[0]
    width = style.get("width") or DIMENSIONS_FLAGSHIP[1]
    props = input_data.get("props") or {}

    empty_board = create_empty_board(height, width)

    raw_components = input_data.get("components", [])

    def _has_abs(c: IVBMLComponent) -> bool:
        return bool((c.get("style") or {}).get("absolutePosition"))

    # Flow components (no absolute position, not a calendar)
    flow_components = [
        parse_component(height, width, props, c)
        for c in raw_components
        if not _has_abs(c) and "calendar" not in c
    ]

    # Absolute-positioned components (not calendars)
    absolute_components = [
        parse_absolute_component(height, width, props, c)
        for c in raw_components
        if _has_abs(c) and "calendar" not in c
    ]

    # Calendar components
    calendar_components = []
    for c in raw_components:
        if "calendar" not in c:
            continue
        cal_data = c["calendar"]
        x = cast(
            dict, cast(dict, c.get("style") or {}).get("absolutePosition") or {}
        ).get("x", 0)

        cal = make_calendar(
            month=cal_data["month"],
            year=cal_data["year"],
            default_day_color=cal_data.get("defaultDayColor"),
            highlighted_days=cal_data.get("days", {}),
            hide_day_of_week=cal_data.get("hideSMTWTFS", False),
            hide_dates=cal_data.get("hideDates", False),
            hide_month_year=cal_data.get("hideMonthYear", False),
        )
        calendar_components.append(parse_calendar_component(cal, x))

    return layout_components(
        empty_board, flow_components, absolute_components, calendar_components
    )
