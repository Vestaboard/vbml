"""Test create empty board."""

from __future__ import annotations

from pyvbml.create_empty_board import create_empty_board


def test_create_empty_board() -> None:
    """Test create empty board."""
    result = create_empty_board(3, 2)
    assert result == [[0, 0], [0, 0], [0, 0]]
