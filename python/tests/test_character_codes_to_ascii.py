"""Test character codes to ASCII.

Port of Vestaboard/vbml/src/__tests__/characterCodesToAscii.spec.ts
"""

from __future__ import annotations

from pyvbml.character_codes_to_ascii import character_codes_to_ascii


def test_converts_color_codes() -> None:
    """Should convert colors."""
    result = character_codes_to_ascii([[63, 64, 65, 66, 67, 68, 69, 70]])
    assert result == "🟥🟧🟨🟩🟦🟪⬜⬛"


def test_handles_multiple_rows() -> None:
    """Should handle rows."""
    result = character_codes_to_ascii([[63, 64], [63, 64]])
    assert result == "🟥🟧\n\n🟥🟧"


def test_spaces_out_letters() -> None:
    """Should space out letters."""
    result = character_codes_to_ascii([[1, 2]])
    assert result == "A B "
