"""Has special characters.

Port of Vestaboard/vbml/src/hasSpecialCharacters.ts
"""

from __future__ import annotations

from .character_codes import supported_characters


def has_special_characters(text: str) -> bool:
    """Has special characters."""
    if not text:
        return False
    return any(char not in supported_characters for char in text)
