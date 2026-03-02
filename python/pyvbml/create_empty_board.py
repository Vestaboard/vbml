"""Create empty board.

Port of Vestaboard/vbml/src/createEmptyBoard.ts
"""

from __future__ import annotations

from .character_codes import CharacterCode


def create_empty_board(rows: int, columns: int) -> list[list[int]]:
    """Create an empty board of *rows* * *columns*."""
    return [[int(CharacterCode.BLANK)] * columns for _ in range(rows)]
