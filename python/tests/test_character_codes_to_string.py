"""Test character codes to string.

Port of Vestaboard/vbml/src/__tests__/characterCodesToString.spec.ts
"""

from __future__ import annotations

from pyvbml.character_codes_to_string import character_codes_to_string


def test_converts_word_to_string() -> None:
    """Should convert a word to a string."""
    assert character_codes_to_string([[1, 2]]) == "AB"


def test_converts_two_line_sentence() -> None:
    """Should convert two-line sentence."""
    result = character_codes_to_string(
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [
                20,
                8,
                9,
                19,
                0,
                9,
                19,
                0,
                1,
                0,
                12,
                15,
                14,
                7,
                5,
                18,
                0,
                2,
                12,
                15,
                3,
                11,
            ],
            [
                20,
                8,
                1,
                20,
                0,
                19,
                16,
                1,
                14,
                19,
                0,
                28,
                0,
                12,
                9,
                14,
                5,
                19,
                0,
                0,
                0,
                0,
            ],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]
    )
    assert result == "THIS IS A LONGER BLOCK THAT SPANS 2 LINES"


def test_handles_breaks_gracefully() -> None:
    """Should handle breaks."""
    result = character_codes_to_string(
        [
            [0, 0, 8, 1, 14, 4, 12, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 18, 5, 1, 11, 19, 0, 7, 18, 1, 3, 5, 6, 21, 12, 12, 25, 0, 0, 0],
        ]
    )
    assert result == "HANDLE BREAKS GRACEFULLY"


def test_handles_line_breaks() -> None:
    """Should handle line breaks."""
    result = character_codes_to_string(
        [[1, 2, 0, 0, 0], [3, 4, 0, 0, 0]],
        {"allowLineBreaks": True},
    )
    assert result == "AB\nCD"


def test_no_line_break_when_first_word_fits_on_previous_line() -> None:
    """Should assume there is no line break if the first word can fit on the previous line."""
    result = character_codes_to_string(
        [[1, 0], [2, 0]],
        {"allowLineBreaks": True},
    )
    assert result == "A B"
