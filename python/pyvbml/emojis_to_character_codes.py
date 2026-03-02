"""Emojis to character codes.

Port of Vestaboard/vbml/src/emojisToCharacterCodes.ts
"""

from __future__ import annotations


def emojis_to_character_codes(template: str) -> str:
    """Emojis to character codes."""
    return (
        template.replace("🟥", "{63}")
        .replace("🟧", "{64}")
        .replace("🟨", "{65}")
        .replace("🟩", "{66}")
        .replace("🟦", "{67}")
        .replace("🟪", "{68}")
        .replace("⬜", "{69}")
        .replace("⬛", "{70}")
        .replace("ß", "SS")  # special case for ß → SS
        .replace("❤️", "{62}")  # Vestaboard Note
    )
