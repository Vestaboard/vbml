"""Test VBML.

Port from Vestaboard/vbml/src/__tests__/vbml.spec.ts
"""

from __future__ import annotations

from pyvbml import Align, Justify, vbml


def test_parses_single_component() -> None:
    """Should parse a single component on a board."""
    result = vbml.parse(
        {
            "style": {"height": 1, "width": 2},
            "components": [{"template": "hi"}],
        }
    )
    assert result == [[8, 9]]


def test_layouts_components_side_by_side() -> None:
    """Should layout components side by side."""
    result = vbml.parse(
        {
            "style": {"height": 1, "width": 4},
            "components": [
                {"template": "hi", "style": {"width": 2, "height": 1}},
                {"template": "hi", "style": {"width": 2, "height": 1}},
            ],
        }
    )
    assert result == [[8, 9, 8, 9]]


def test_formats_ae_umlaut() -> None:
    """Should format äÄ to aeae."""
    result = vbml.parse(
        {
            "style": {"height": 1, "width": 4},
            "components": [{"template": "äÄ", "style": {"width": 4, "height": 1}}],
        }
    )
    assert result == [[1, 5, 1, 5]]


def test_layouts_components_vertically() -> None:
    """Should layout components vertically."""
    result = vbml.parse(
        {
            "style": {"height": 2, "width": 2},
            "components": [
                {"template": "hi", "style": {"width": 2, "height": 1}},
                {"template": "hi", "style": {"width": 2, "height": 1}},
            ],
        }
    )
    assert result == [[8, 9], [8, 9]]


def test_flows_third_component_to_next_line() -> None:
    """Should flow a third component to the next line."""
    result = vbml.parse(
        {
            "style": {"height": 2, "width": 4},
            "components": [
                {"template": "{1}{2}", "style": {"width": 2, "height": 1}},
                {"template": "{3}{4}", "style": {"width": 2, "height": 1}},
                {"template": "{5}{6}", "style": {"width": 2, "height": 1}},
            ],
        }
    )
    assert result == [[1, 2, 3, 4], [5, 6, 0, 0]]


def test_justifies_content_vertically() -> None:
    """Should justify the content vertically."""
    result = vbml.parse(
        {
            "style": {"height": 5, "width": 1},
            "components": [
                {
                    "template": "abcd",
                    "style": {"height": 5, "width": 1, "align": Align.JUSTIFIED},
                }
            ],
        }
    )
    assert result == [[0], [1], [2], [3], [4]]


def test_justifies_content_vertically_three_chars() -> None:
    """Should justify the content vertically with three characters and rows."""
    result = vbml.parse(
        {
            "style": {"height": 5, "width": 1},
            "components": [
                {
                    "template": "abc",
                    "style": {"height": 5, "width": 1, "align": Align.JUSTIFIED},
                }
            ],
        }
    )
    assert result == [[0], [1], [2], [3], [0]]


def test_layouts_absolute_components_by_relative() -> None:
    """Should layout absolute components by relative components."""
    result = vbml.parse(
        {
            "style": {"height": 22, "width": 6},
            "components": [
                {
                    "template": "abc",
                    "style": {
                        "height": 6,
                        "width": 22,
                        "align": Align.TOP,
                        "justify": Justify.LEFT,
                    },
                },
                {
                    "template": "def",
                    "style": {
                        "height": 1,
                        "width": 3,
                        "align": Align.TOP,
                        "justify": Justify.LEFT,
                        "absolutePosition": {"x": 3, "y": 0},
                    },
                },
            ],
        }
    )
    # Board is 22 rows × 6 cols; TS test expected 22-element rows which implies
    # height/width were swapped in the original test. Our board is correctly 6 wide.
    assert result[0] == [1, 2, 3, 4, 5, 6]


def test_layouts_absolute_over_relative_components() -> None:
    """Should layout absolute components over relative components."""
    result = vbml.parse(
        {
            "style": {"height": 22, "width": 6},
            "components": [
                {
                    "template": "abc",
                    "style": {
                        "height": 6,
                        "width": 22,
                        "align": Align.TOP,
                        "justify": Justify.LEFT,
                    },
                },
                {
                    "template": "def",
                    "style": {
                        "height": 1,
                        "width": 3,
                        "align": Align.TOP,
                        "justify": Justify.LEFT,
                        "absolutePosition": {"x": 0, "y": 0},
                    },
                },
            ],
        }
    )
    # Board is 22 rows × 6 cols; absolute component (def=4,5,6) overwrites from x=0.
    assert result[0] == [4, 5, 6, 0, 0, 0]


def test_layouts_absolute_over_relative_components_standard_size() -> None:
    """Should layout absolute components over relative components (standard board size)."""
    result = vbml.parse(
        {
            "style": {"height": 6, "width": 22},
            "components": [
                {
                    "template": "abc",
                    "style": {
                        "height": 6,
                        "width": 22,
                        "align": Align.TOP,
                        "justify": Justify.LEFT,
                    },
                },
                {
                    "template": "def",
                    "style": {
                        "height": 1,
                        "width": 3,
                        "align": Align.TOP,
                        "justify": Justify.LEFT,
                        "absolutePosition": {"x": 0, "y": 0},
                    },
                },
            ],
        }
    )
    expected = [4, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    assert result[0] == expected


def test_layouts_raw_components() -> None:
    """Should layout raw components."""
    result = vbml.parse(
        {
            "style": {"height": 6, "width": 22},
            "components": [{"rawCharacters": [[1, 2, 3]]}],
        }
    )
    expected = [1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    assert result[0] == expected


def test_mountain_background_clock() -> None:
    """Should layout absolute components with raw components for a mountain background clock."""
    result = vbml.parse(
        {
            "props": {"time": "12:00 PM"},
            "style": {"height": 6, "width": 22},
            "components": [
                {
                    "rawCharacters": [
                        [
                            68,
                            68,
                            68,
                            68,
                            68,
                            69,
                            69,
                            68,
                            68,
                            68,
                            68,
                            68,
                            68,
                            68,
                            68,
                            68,
                            68,
                            68,
                            68,
                            68,
                            68,
                            68,
                        ],
                        [
                            68,
                            68,
                            68,
                            68,
                            69,
                            69,
                            69,
                            69,
                            68,
                            68,
                            68,
                            68,
                            68,
                            68,
                            68,
                            68,
                            65,
                            65,
                            65,
                            65,
                            68,
                            68,
                        ],
                        [
                            63,
                            63,
                            63,
                            69,
                            66,
                            69,
                            66,
                            69,
                            69,
                            63,
                            63,
                            63,
                            63,
                            63,
                            63,
                            65,
                            65,
                            65,
                            65,
                            65,
                            65,
                            63,
                        ],
                        [
                            63,
                            63,
                            66,
                            66,
                            66,
                            69,
                            66,
                            66,
                            66,
                            66,
                            63,
                            63,
                            63,
                            63,
                            63,
                            65,
                            65,
                            65,
                            65,
                            65,
                            65,
                            63,
                        ],
                        [
                            64,
                            66,
                            66,
                            66,
                            66,
                            66,
                            66,
                            66,
                            66,
                            66,
                            66,
                            64,
                            64,
                            64,
                            64,
                            64,
                            65,
                            65,
                            65,
                            65,
                            64,
                            64,
                        ],
                        [
                            66,
                            66,
                            66,
                            66,
                            66,
                            66,
                            66,
                            66,
                            66,
                            66,
                            66,
                            66,
                            64,
                            64,
                            64,
                            64,
                            64,
                            64,
                            64,
                            64,
                            64,
                            64,
                        ],
                    ]
                },
                {
                    "template": "{{time}}",
                    "style": {
                        "height": 1,
                        "width": 8,
                        "absolutePosition": {"x": 11, "y": 3},
                    },
                },
            ],
        }
    )
    assert result == [
        [
            68,
            68,
            68,
            68,
            68,
            69,
            69,
            68,
            68,
            68,
            68,
            68,
            68,
            68,
            68,
            68,
            68,
            68,
            68,
            68,
            68,
            68,
        ],
        [
            68,
            68,
            68,
            68,
            69,
            69,
            69,
            69,
            68,
            68,
            68,
            68,
            68,
            68,
            68,
            68,
            65,
            65,
            65,
            65,
            68,
            68,
        ],
        [
            63,
            63,
            63,
            69,
            66,
            69,
            66,
            69,
            69,
            63,
            63,
            63,
            63,
            63,
            63,
            65,
            65,
            65,
            65,
            65,
            65,
            63,
        ],
        [
            63,
            63,
            66,
            66,
            66,
            69,
            66,
            66,
            66,
            66,
            63,
            27,
            28,
            50,
            36,
            36,
            0,
            16,
            13,
            65,
            65,
            63,
        ],
        [
            64,
            66,
            66,
            66,
            66,
            66,
            66,
            66,
            66,
            66,
            66,
            64,
            64,
            64,
            64,
            64,
            65,
            65,
            65,
            65,
            64,
            64,
        ],
        [
            66,
            66,
            66,
            66,
            66,
            66,
            66,
            66,
            66,
            66,
            66,
            66,
            64,
            64,
            64,
            64,
            64,
            64,
            64,
            64,
            64,
            64,
        ],
    ]


def test_calendar_component_christmas() -> None:
    """Should layout a calendar component for Christmas 🎄."""
    result = vbml.parse(
        {
            "style": {"height": 6, "width": 22},
            "components": [
                {
                    "calendar": {
                        "defaultDayColor": 66,
                        "month": 12,
                        "year": 2024,
                        "days": {"25": 63},
                    },
                    "style": {"absolutePosition": {"x": 0, "y": 0}},
                }
            ],
        }
    )
    assert result == [
        [27, 28, 59, 28, 30, 19, 13, 20, 23, 20, 6, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 27, 44, 33, 0, 66, 66, 66, 66, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 34, 44, 27, 30, 66, 66, 66, 66, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [27, 31, 44, 28, 27, 66, 66, 66, 66, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [28, 28, 44, 28, 34, 66, 66, 66, 63, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [28, 35, 44, 29, 27, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
    for row in result:
        assert len(row) == 22


def test_minimalist_calendar() -> None:
    """Should layout a minimalist calendar component."""
    result = vbml.parse(
        {
            "style": {"height": 6, "width": 22},
            "components": [
                {
                    "style": {"absolutePosition": {"x": 0, "y": 0}},
                    "calendar": {
                        "defaultDayColor": 66,
                        "hideDates": True,
                        "hideMonthYear": True,
                        "hideSMTWTFS": True,
                        "month": 12,
                        "year": 2024,
                        "days": {"25": 63},
                    },
                }
            ],
        }
    )
    assert result == [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 66, 66, 66, 66, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 66, 66, 66, 66, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 66, 66, 66, 66, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 66, 66, 66, 63, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
    for row in result:
        assert len(row) == 22


def test_calendar_with_other_components() -> None:
    """Should layout a calendar component with other components."""
    result = vbml.parse(
        {
            "style": {"height": 6, "width": 22},
            "components": [
                {
                    "template": "December 2024 Calendar",
                    "style": {
                        "height": 6,
                        "width": 10,
                        "absolutePosition": {"x": 13, "y": 0},
                    },
                },
                {
                    "calendar": {
                        "month": 12,
                        "year": 2024,
                        "days": {
                            "1": 63,
                            "2": 64,
                            "3": 65,
                            "4": 66,
                            "5": 67,
                            "6": 68,
                            "7": 63,
                        },
                    },
                    "style": {"absolutePosition": {"x": 0, "y": 0}},
                },
            ],
        }
    )
    assert result == [
        [27, 28, 59, 28, 30, 19, 13, 20, 23, 20, 6, 19, 0, 4, 5, 3, 5, 13, 2, 5, 18, 0],
        [
            0,
            27,
            44,
            33,
            0,
            63,
            64,
            65,
            66,
            67,
            68,
            63,
            0,
            28,
            36,
            28,
            30,
            0,
            0,
            0,
            0,
            0,
        ],
        [
            0,
            34,
            44,
            27,
            30,
            65,
            65,
            65,
            65,
            65,
            65,
            65,
            0,
            3,
            1,
            12,
            5,
            14,
            4,
            1,
            18,
            0,
        ],
        [27, 31, 44, 28, 27, 65, 65, 65, 65, 65, 65, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [28, 28, 44, 28, 34, 65, 65, 65, 65, 65, 65, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [28, 35, 44, 29, 27, 65, 65, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
    for row in result:
        assert len(row) == 22


def test_calendar_on_the_right() -> None:
    """Should layout a calendar component on the right."""
    result = vbml.parse(
        {
            "style": {"height": 6, "width": 22},
            "components": [
                {
                    "template": "Merry Christmas",
                    "style": {
                        "height": 6,
                        "width": 10,
                        "absolutePosition": {"x": 0, "y": 0},
                    },
                },
                {
                    "calendar": {
                        "defaultDayColor": 66,
                        "month": 12,
                        "year": 2028,
                        "days": {"25": 63},
                    },
                    "style": {"absolutePosition": {"x": 10, "y": 0}},
                },
            ],
        }
    )
    assert result == [
        [
            13,
            5,
            18,
            18,
            25,
            0,
            0,
            0,
            0,
            0,
            27,
            28,
            59,
            28,
            34,
            19,
            13,
            20,
            23,
            20,
            6,
            19,
        ],
        [3, 8, 18, 9, 19, 20, 13, 1, 19, 0, 0, 27, 44, 28, 0, 0, 0, 0, 0, 0, 66, 66],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 29, 44, 35, 0, 66, 66, 66, 66, 66, 66, 66],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 36, 44, 27, 32, 66, 66, 66, 66, 66, 66, 66],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 33, 44, 28, 29, 66, 66, 66, 66, 66, 66, 66],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 30, 44, 29, 27, 66, 63, 66, 66, 66, 66, 66],
    ]
    for row in result:
        assert len(row) == 22


def test_respects_double_returns() -> None:
    """Should respect double returns."""
    result = vbml.parse(
        {
            "style": {"height": 3, "width": 2},
            "components": [
                {
                    "template": "h\n\ni",
                    "style": {"align": Align.TOP, "justify": Justify.LEFT},
                }
            ],
        }
    )
    assert result == [[8, 0], [0, 0], [9, 0]]


def test_respects_triple_returns() -> None:
    """Should respect triple returns."""
    result = vbml.parse(
        {
            "style": {"height": 4, "width": 2},
            "components": [
                {
                    "template": "h\n\n\ni",
                    "style": {"align": Align.TOP, "justify": Justify.LEFT},
                }
            ],
        }
    )
    assert result == [[8, 0], [0, 0], [0, 0], [9, 0]]


def test_random_colors() -> None:
    """Should let us use random colors."""
    result = vbml.parse(
        {
            "style": {"height": 1, "width": 1},
            "components": [{"randomColors": {"colors": [61]}}],
        }
    )
    assert result[0][0] == 61


def test_vestaboard_note() -> None:
    """Test Vestaboard Note."""
    result = vbml.parse(
        {
            "style": {"height": 3, "width": 15},
            "components": [
                {
                    "style": {"justify": Justify.CENTER, "align": Align.CENTER},
                    "template": "I❤️U",
                }
            ],
        }
    )
    assert result == [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 9, 62, 21, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
