"""Test copy character codes.

Port of Vestaboard/vbml/src/__tests__/copyCharacterCodes.spec.ts
"""

from __future__ import annotations

from pyvbml.copy_character_codes import copy_character_codes


def test_deep_copies_character_codes() -> None:
    """Should deep copy character codes."""
    characters = [[1, 2]]
    result = copy_character_codes(characters)

    assert result == [[1, 2]]
    assert result is not characters

    # Mutating the original must not affect the copy
    characters[0][0] = 3
    assert result[0][0] == 1
