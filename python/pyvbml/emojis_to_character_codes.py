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
        # Heart variants → char 62 (rendered as a heart on Flagship boards).
        # ❤️ (with U+FE0F variation selector) must be replaced before bare ❤.
        .replace("❤️", "{62}")
        .replace("❤", "{62}")
        .replace("🧡", "{62}")
        .replace("💛", "{62}")
        .replace("💚", "{62}")
        .replace("💙", "{62}")
        .replace("💜", "{62}")
        .replace("🖤", "{62}")
        .replace("🤍", "{62}")
        .replace("🤎", "{62}")
        .replace("ß", "SS")  # special case for ß → SS
    )
