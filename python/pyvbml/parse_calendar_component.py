"""Parse calendar component.

Port of Vestaboard/vbml/src/parseCalendarComponent.ts
"""

from __future__ import annotations


def parse_calendar_component(characters: list[list[int]], x: int) -> dict:
    """Parse calendar component."""
    return {"characters": characters, "x": x}
