"""Test random colors.

Port of Vestaboard/vbml/src/__tests__/randomColors.spec.ts
"""

from __future__ import annotations

import random

from pyvbml.random_colors import COLOR_CODES, random_colors


def test_fills_board_with_random_colors() -> None:
    """Should fill a board with random colors."""
    result = random_colors(6, 22)

    assert len(result) == 6
    assert len(result[0]) == 22

    # Validate only colors exist in the results
    assert all(c in COLOR_CODES for row in result for c in row)


def test_fills_board_with_selected_random_colors() -> None:
    """Should fill a board with selected random colors."""
    # Take 3 random colors
    colors = random.sample(COLOR_CODES, 3)
    result = random_colors(6, 22, colors)

    assert len(result) == 6
    assert len(result[0]) == 22

    # Validate only the selected colors exist in the results
    assert all(c in colors for row in result for c in row)
