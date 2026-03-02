"""Sanitize special characters.

Port of Vestaboard/vbml/src/sanitizeSpecialCharacters.ts
"""

from __future__ import annotations

from .character_codes import mapping_to_character


def sanitize_special_characters(text: str) -> str:
    """Sanitize special characters."""
    return "".join(mapping_to_character(ch) for ch in text)
