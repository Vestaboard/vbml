"""Color.

Port of Vestaboard/vbml/src/color.ts
"""

from __future__ import annotations

from enum import IntEnum

from .character_codes import CharacterCode


class Color(IntEnum):
    """Semantic color names mapped to their character codes."""

    RED = CharacterCode.RED
    ORANGE = CharacterCode.ORANGE
    YELLOW = CharacterCode.YELLOW
    GREEN = CharacterCode.GREEN
    BLUE = CharacterCode.BLUE
    VIOLET = CharacterCode.VIOLET
    WHITE = CharacterCode.WHITE
    BLACK = CharacterCode.BLACK
    FILLED = CharacterCode.FILLED
