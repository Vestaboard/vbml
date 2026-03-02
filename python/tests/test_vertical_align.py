"""Test vertical align."""

from __future__ import annotations

from pyvbml.vertical_align import Align, vertical_align


def test_vertical_align() -> None:
    """Test vertical align."""
    assert vertical_align(3, Align.TOP, [[1, 2]]) == [[1, 2]]
    assert vertical_align(3, Align.BOTTOM, [[1, 2]]) == [[], [], [1, 2]]
    assert vertical_align(3, Align.JUSTIFIED, [[1, 2]]) == [[], [1, 2], []]
    assert vertical_align(4, Align.JUSTIFIED, [[1, 2]]) == [[], [], [1, 2], []]
    assert vertical_align(3, Align.CENTER, [[1, 2]]) == [[], [1, 2], []]
    assert vertical_align(4, Align.CENTER, [[1, 2]]) == [[], [1, 2], [], []]
