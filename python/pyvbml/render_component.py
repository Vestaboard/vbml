"""Render component.

Port of Vestaboard/vbml/src/renderComponent.ts
"""

from __future__ import annotations


def render_component(
    empty_component: list[list[int]],
    codes: list[list[int]],
) -> list[list[int]]:
    """Render component."""
    return [
        [
            codes[row_idx][col_idx]
            if row_idx < len(codes) and col_idx < len(codes[row_idx])
            else char
            for col_idx, char in enumerate(line)
        ]
        for row_idx, line in enumerate(empty_component)
    ]
