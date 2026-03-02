"""Test character codes."""

from __future__ import annotations

from pyvbml.character_codes import convert_characters_to_character_codes


def test_dangling_bracket() -> None:
    """Should drop dangling bracket."""
    assert convert_characters_to_character_codes("{66}}") == [66]
