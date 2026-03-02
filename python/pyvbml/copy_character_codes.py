"""Copy character codes.

Port of Vestaboard/vbml/src/copyCharacterCodes.ts
"""

from __future__ import annotations


def copy_character_codes(characters: list[list[int]]) -> list[list[int]]:
    """Return a deep copy of the character codes array."""
    return [row[:] for row in characters]
