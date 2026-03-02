"""Test has special characters.

Port of Vestaboard/vbml/src/__tests__/hasSpecialCharacters.spec.ts
"""

from __future__ import annotations

from pyvbml.has_special_characters import has_special_characters


def test_returns_true_for_special_character() -> None:
    """Should return true if text contains special characters."""
    assert has_special_characters("ä") is True


def test_returns_true_for_mixed_special_and_standard() -> None:
    """Should return true if text contains special characters mixed with standard characters."""
    assert has_special_characters("äa") is True


def test_returns_false_for_lowercase_alphabet() -> None:
    """Should return false if text does not contain special characters."""
    assert has_special_characters("abcdefghijklmnopqrstuvwxyz") is False


def test_returns_false_for_uppercase_alphabet() -> None:
    """Should return false if text does not contain special characters (uppercased)."""
    assert has_special_characters("ABCDEFGHIJKLMNOPQRSTUVWXYZ") is False


def test_returns_false_for_standard_numbers() -> None:
    """Should return false if text is standard numbers."""
    assert has_special_characters("0123456789") is False


def test_returns_false_for_standard_vestaboard_symbols() -> None:
    """Should return false if text is standard symbols supported by Vestaboard."""
    assert has_special_characters("!@#$()-+&=;:'\"" + "%,./?°") is False


def test_returns_false_for_empty_string() -> None:
    """Should return false if text is empty."""
    assert has_special_characters("") is False


def test_excludes_newlines() -> None:
    """Should exclude newlines."""
    assert has_special_characters("Hello\nWorld") is False


def test_excludes_ios_single_quote() -> None:
    """Should exclude the single quote from the iOS keyboard."""
    assert has_special_characters("\u2019") is False


def test_excludes_ios_double_quote() -> None:
    """Should exclude the double quote from the iOS keyboard."""
    assert has_special_characters("\u201c") is False


def test_excludes_white_color_swatch() -> None:
    """Should exclude white color swatch."""
    assert has_special_characters("⬜") is False


def test_excludes_black_color_swatch() -> None:
    """Should exclude black color swatch."""
    assert has_special_characters("⬛") is False


def test_excludes_orange_color_swatch() -> None:
    """Should exclude orange color swatch."""
    assert has_special_characters("🟧") is False


def test_includes_fractions() -> None:
    """Should include fractions."""
    assert has_special_characters("½") is True
