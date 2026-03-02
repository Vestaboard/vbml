"""Test horizontal align."""

from __future__ import annotations

from pyvbml.horizontal_align import Justify, horizontal_align


def test_horizontal_align() -> None:
    """Test horizontal align."""
    assert horizontal_align(5, Justify.CENTER, [[1, 0, 2]]) == [[0, 1, 0, 2, 0]]
    assert horizontal_align(6, Justify.CENTER, [[1, 0, 2]]) == [[0, 1, 0, 2, 0, 0]]

    assert horizontal_align(5, Justify.LEFT, [[1, 0, 2]]) == [[1, 0, 2]]
    assert horizontal_align(6, Justify.LEFT, [[1, 0, 2]]) == [[1, 0, 2]]

    assert horizontal_align(5, Justify.RIGHT, [[1, 0, 2]]) == [[0, 0, 1, 0, 2]]
    assert horizontal_align(6, Justify.RIGHT, [[1, 0, 2]]) == [[0, 0, 0, 1, 0, 2]]

    assert horizontal_align(5, Justify.JUSTIFIED, [[1, 0, 2]]) == [[0, 1, 0, 2, 0]]
    assert horizontal_align(6, Justify.JUSTIFIED, [[1, 0, 2]]) == [[0, 1, 0, 2, 0, 0]]
