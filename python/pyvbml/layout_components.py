"""Layout components.

Port of Vestaboard/vbml/src/layoutComponents.ts
"""

from __future__ import annotations


def layout_components(
    board: list[list[int]],
    components: list[list[list[int]]],
    absolute_components: list[dict],
    calendar_components: list[dict] | None = None,
) -> list[list[int]]:
    """Layout components."""
    position = {"top": 0, "left": 0, "height": 0}
    component: list[list[int]] | dict

    for component in components:
        # If the component would overflow the board width, wrap to the next line
        new_line = position["left"] + len(component[0]) > len(board[0])
        left = 0 if new_line else position["left"]
        top = (position["top"] + position["height"]) if new_line else position["top"]

        for row_idx, row in enumerate(component):
            for bit_idx, bit in enumerate(row):
                if row_idx + top >= len(board):
                    continue
                if bit_idx + left >= len(board[0]):
                    continue
                board[row_idx + top][bit_idx + left] = bit

        position = {
            "top": top,
            "left": left + len(component[0]),
            "height": len(component),
        }

    for component in absolute_components or []:
        for row_idx, row in enumerate(component["characters"]):
            for bit_idx, bit in enumerate(row):
                # Out-of-bounds: truncate
                if component["y"] + row_idx >= len(board):
                    continue
                if component["x"] + bit_idx >= len(board[0]):
                    continue
                board[row_idx + component["y"]][bit_idx + component["x"]] = bit

    for component in calendar_components or []:
        for row_idx, row in enumerate(component["characters"]):
            for bit_idx, bit in enumerate(row):
                if row_idx >= len(board):
                    continue
                # Calendars are always 12 wide
                if component["x"] + bit_idx >= len(board[0]) or bit_idx > 12:
                    continue
                board[row_idx][bit_idx + component["x"]] = bit

    return board
