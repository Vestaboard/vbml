"""Test parse component.

Port of Vestaboard/vbml/src/__tests__/parseComponent.spec.ts

Note on currying: the TS source calls parseComponent(height, width, props?)(component).
Python doesn't auto-curry, so we use a thin helper that mirrors the same call pattern.
"""

from __future__ import annotations

from pyvbml.parse_component import parse_absolute_component, parse_component
from pyvbml.types import Align, Justify

# ---------------------------------------------------------------------------
# Curry-style helpers matching the TS call signatures
# ---------------------------------------------------------------------------


def _pc(height, width, props=None):
    """parseComponent(height, width, props?)(component) → result."""

    def _call(component):
        return parse_component(height, width, props or {}, component)

    return _call


def _pac(height, width, props=None):
    """parseAbsoluteComponent(height, width, props?)(component) → result."""

    def _call(component):
        return parse_absolute_component(height, width, props or {}, component)

    return _call


# ---------------------------------------------------------------------------
# Tests
# ---------------------------------------------------------------------------


def test_formats_plain_text() -> None:
    """Should format a message with plain text."""
    result = _pc(1, 12)({"template": "Hello World!"})
    assert result == [[8, 5, 12, 12, 15, 0, 23, 15, 18, 12, 4, 37]]


def test_formats_longer_plain_text() -> None:
    """Should format a longer message with plain text."""
    result = _pc(2, 12)({"template": "Thank you for having us!"})
    assert result == [
        [20, 8, 1, 14, 11, 0, 25, 15, 21, 0, 0, 0],
        [6, 15, 18, 0, 8, 1, 22, 9, 14, 7, 0, 0],
    ]


def test_formats_longer_message_centered() -> None:
    """Should format a longer message center with plain text."""
    result = _pc(2, 22)(
        {
            "template": "Thank you for having us!",
            "style": {"justify": Justify.CENTER},
        }
    )
    assert result == [
        [
            0,
            20,
            8,
            1,
            14,
            11,
            0,
            25,
            15,
            21,
            0,
            6,
            15,
            18,
            0,
            8,
            1,
            22,
            9,
            14,
            7,
            0,
        ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 19, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]


def test_adds_extra_spaces() -> None:
    """Should add extra spaces."""
    result = _pc(1, 13)({"template": "Hello World!"})
    assert result == [[8, 5, 12, 12, 15, 0, 23, 15, 18, 12, 4, 37, 0]]


def test_automatically_breaks_line() -> None:
    """Should automatically break the line."""
    result = _pc(2, 6)({"template": "Hello World!"})
    assert result == [
        [8, 5, 12, 12, 15, 0],
        [23, 15, 18, 12, 4, 37],
    ]


def test_does_not_break_when_unnecessary() -> None:
    """Should not break the line if it doesn't need to."""
    result = _pc(3, 13)({"template": "Hello World!"})
    assert result == [
        [8, 5, 12, 12, 15, 0, 23, 15, 18, 12, 4, 37, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]


def test_vertically_aligns_bottom() -> None:
    """Should vertically align bottom."""
    result = _pc(4, 1)({"template": "!", "style": {"align": Align.BOTTOM}})
    assert result == [[0], [0], [0], [37]]


def test_vertically_aligns_center() -> None:
    """Should vertically align to the center."""
    result = _pc(3, 1)({"template": "!", "style": {"align": Align.CENTER}})
    assert result == [[0], [37], [0]]


def test_vertically_aligns_center_multiple_rows() -> None:
    """Should vertically align to the center with multiple rows."""
    result = _pc(5, 1)({"template": "!", "style": {"align": Align.CENTER}})
    assert result == [[0], [0], [37], [0], [0]]


def test_vertically_aligns_center_sticks_to_top_when_no_even_padding() -> None:
    """Should vertically align to the center by sticking to the top if there is not even padding."""
    result = _pc(6, 1)({"template": "!", "style": {"align": Align.CENTER}})
    assert result == [[0], [0], [37], [0], [0], [0]]


def test_horizontally_aligns_right() -> None:
    """Should horizontally align right."""
    result = _pc(1, 3)({"template": "!", "style": {"justify": Justify.RIGHT}})
    assert result == [[0, 0, 37]]


def test_horizontally_aligns_center() -> None:
    """Should horizontally align center."""
    result = _pc(1, 3)({"template": "!", "style": {"justify": Justify.CENTER}})
    assert result == [[0, 37, 0]]


def test_horizontally_aligns_justified() -> None:
    """Should horizontally align justified."""
    result = _pc(6, 22)(
        {
            "template": "Testing Testing 123",
            "style": {"align": Align.CENTER, "justify": Justify.JUSTIFIED},
        }
    )
    assert result == [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [
            0,
            20,
            5,
            19,
            20,
            9,
            14,
            7,
            0,
            20,
            5,
            19,
            20,
            9,
            14,
            7,
            0,
            27,
            28,
            29,
            0,
            0,
        ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]


def test_justified_when_full_line_covered() -> None:
    """Should horizontally align justified when the full line is covered."""
    result = _pc(6, 22)(
        {
            "template": "Testing Testing 123456",
            "style": {"align": Align.CENTER, "justify": Justify.JUSTIFIED},
        }
    )
    assert result == [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [
            20,
            5,
            19,
            20,
            9,
            14,
            7,
            0,
            20,
            5,
            19,
            20,
            9,
            14,
            7,
            0,
            27,
            28,
            29,
            30,
            31,
            32,
        ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]


def test_justified_when_flowing_to_next_line() -> None:
    """Should horizontally align justified when we flow to the next line."""
    result = _pc(6, 22)(
        {
            "template": "Testing Testing 123456789",
            "style": {"align": Align.CENTER, "justify": Justify.JUSTIFIED},
        }
    )
    assert result == [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 20, 5, 19, 20, 9, 14, 7, 0, 20, 5, 19, 20, 9, 14, 7, 0, 0, 0, 0],
        [0, 0, 0, 27, 28, 29, 30, 31, 32, 33, 34, 35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]


def test_justified_long_complex_message() -> None:
    """Should horizontally align justified a long complex message."""
    result = _pc(6, 22)(
        {
            "template": "Pack my box with five dozen liquor jugs. The quick brown fox jumps over the lazy dog. How vexingly quick daft zebras jump!",
            "style": {"align": Align.CENTER, "justify": Justify.JUSTIFIED},
        }
    )
    assert result == [
        [16, 1, 3, 11, 0, 13, 25, 0, 2, 15, 24, 0, 23, 9, 20, 8, 0, 6, 9, 22, 5, 0],
        [
            4,
            15,
            26,
            5,
            14,
            0,
            12,
            9,
            17,
            21,
            15,
            18,
            0,
            10,
            21,
            7,
            19,
            56,
            0,
            20,
            8,
            5,
        ],
        [
            17,
            21,
            9,
            3,
            11,
            0,
            2,
            18,
            15,
            23,
            14,
            0,
            6,
            15,
            24,
            0,
            10,
            21,
            13,
            16,
            19,
            0,
        ],
        [
            15,
            22,
            5,
            18,
            0,
            20,
            8,
            5,
            0,
            12,
            1,
            26,
            25,
            0,
            4,
            15,
            7,
            56,
            0,
            8,
            15,
            23,
        ],
        [22, 5, 24, 9, 14, 7, 12, 25, 0, 17, 21, 9, 3, 11, 0, 4, 1, 6, 20, 0, 0, 0],
        [26, 5, 2, 18, 1, 19, 0, 10, 21, 13, 16, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]


def test_horizontally_and_vertically_aligned_center() -> None:
    """Should horizontally and vertically align center."""
    result = _pc(3, 3)(
        {
            "template": "!",
            "style": {"justify": Justify.CENTER, "align": Align.CENTER},
        }
    )
    assert result == [[0, 0, 0], [0, 37, 0], [0, 0, 0]]


def test_parses_character_codes() -> None:
    """Should parse character codes."""
    result = _pc(1, 3)(
        {
            "template": "{1}{2}{3}",
            "style": {"justify": Justify.CENTER, "align": Align.CENTER},
        }
    )
    assert result == [[1, 2, 3]]


def test_breaks_on_lines_with_character_codes() -> None:
    """Should break on lines with character codes."""
    result = _pc(2, 3)(
        {
            "template": "{1}{2} {3}{4}",
            "style": {"justify": Justify.CENTER, "align": Align.CENTER},
        }
    )
    assert result == [[1, 2, 0], [3, 4, 0]]


def test_parses_two_digit_character_codes() -> None:
    """Should parse two-digit character codes."""
    result = _pc(1, 2)(
        {
            "template": "{68}{69}",
            "style": {"justify": Justify.CENTER, "align": Align.CENTER},
        }
    )
    assert result == [[68, 69]]


def test_throws_for_invalid_character_codes() -> None:
    """Should throw for invalid character codes."""
    raised = False
    try:
        _pc(1, 1)(
            {
                "template": "{99}",
                "style": {"justify": Justify.CENTER, "align": Align.CENTER},
            }
        )
    except ValueError:
        raised = True
    assert raised


def test_allows_newlines() -> None:
    """Should allow newlines."""
    result = _pc(2, 2)({"template": "{1}\n{1}"})
    assert result == [[1, 0], [1, 0]]


def test_allows_newlines_after_spaces() -> None:
    """Should allow newlines after spaces."""
    result = _pc(2, 2)({"template": "{1} \n{1}"})
    assert result == [[1, 0], [1, 0]]


def test_allows_newlines_before_spaces() -> None:
    """Should allow newlines before spaces."""
    result = _pc(2, 2)(
        {"template": "{1}\n{70}{1}", "style": {"justify": Justify.CENTER}}
    )
    assert result == [[1, 0], [70, 1]]


def test_adds_template_props() -> None:
    """Should add template props."""
    result = _pc(1, 11, {"greeting": "Hello"})({"template": "{{greeting}} World"})
    assert result == [[8, 5, 12, 12, 15, 0, 23, 15, 18, 12, 4]]


def test_allows_conditions() -> None:
    """Should allow conditions."""
    template = "I am {{#isHappy}}Happy{{/isHappy}}{{^isHappy}}Mad{{/isHappy}}"
    result_happy = _pc(1, 10, {"isHappy": True})({"template": template})
    assert result_happy == [[9, 0, 1, 13, 0, 8, 1, 16, 16, 25]]

    result_mad = _pc(1, 10, {"isHappy": False})({"template": template})
    assert result_mad == [[9, 0, 1, 13, 0, 13, 1, 4, 0, 0]]


def test_allows_array_iteration() -> None:
    """Should allow arrays to be iterated."""
    result = _pc(1, 3, {"numbers": [1, 2, 3]})(
        {"template": "{{#numbers}}{{.}}{{/numbers}}"}
    )
    assert result == [[27, 28, 29]]


def test_splits_long_words() -> None:
    """Should split long words."""
    result = _pc(2, 2)({"template": "{1}{2}{3}{4}"})
    assert result == [[1, 2], [3, 4]]


def test_parses_absolute_component() -> None:
    """Should parse absolute component."""
    component = {
        "template": "Hello World!",
        "style": {"absolutePosition": {"x": 4, "y": 2}, "width": 6, "height": 2},
    }
    result = _pac(3, 12)(component)
    assert result == {
        "characters": [
            [8, 5, 12, 12, 15, 0],
            [23, 15, 18, 12, 4, 37],
        ],
        "x": 4,
        "y": 2,
    }


def test_parses_raw_component() -> None:
    """Should parse a raw component."""
    result = _pc(3, 12)({"rawCharacters": [[1, 2], [3, 4]]})
    assert result == [[1, 2], [3, 4]]


def test_converts_emoji_characters_to_character_codes() -> None:
    """Should convert emoji characters to character codes."""
    result = _pc(1, 8)({"template": "🟥🟧🟨🟩🟦🟪⬜⬛"})
    assert result == [[63, 64, 65, 66, 67, 68, 69, 70]]


def test_note_board_style_3x15_starts_from_beginning_prod_1159() -> None:
    """Should render Note BoardStyle (3x15) starting from the beginning of a long string (PROD-1159).

    Bug: string rendered as "FINAL FOUR PLAYERS TO WATCH: SAR" because center-align
    overflow produced a negative padding_top, skipping the first rows.
    Expected: board starts with "Women's..." not mid-string "Final Four..."
    """
    result = _pc(3, 15)(
        {
            "template": "Women's 2026 Final Four players to watch: Sarah Strong, Joyce Edwards, more - The New York Times",
            "style": {"align": Align.CENTER},
        }
    )
    # Row 0 must start with W (23) for "Women's", not F (6) for "Final"
    assert result[0][0] == 23  # W


def test_justified_align_overflow_starts_from_beginning() -> None:
    """Should start from the beginning of a string when justified-aligned content overflows the component height."""
    result = _pc(2, 4)({"template": "ab cd ef gh", "style": {"align": Align.JUSTIFIED}})
    assert result[0][0] == 1  # A (not C)
    assert result[0][1] == 2  # B (not D)


def test_center_align_overflow_starts_from_beginning() -> None:
    """Should start from the beginning of a string when center-aligned content overflows the component height."""
    # With width=4, "ab cd ef gh" wraps to 4 rows: [ab, cd, ef, gh]
    # With height=2, content overflows.
    # Bug: padding_top = floor((2-4)/2) = -1 → starts from codes[1] (cd)
    # Fix: padding_top = max(-1, 0) = 0 → starts from codes[0] (ab)
    result = _pc(2, 4)({"template": "ab cd ef gh", "style": {"align": Align.CENTER}})
    assert result == [
        [1, 2, 0, 0],  # A, B, blank, blank
        [3, 4, 0, 0],  # C, D, blank, blank
    ]
