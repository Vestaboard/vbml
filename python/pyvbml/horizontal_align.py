"""Horizontal align.

Port of Vestaboard/vbml/src/horizontalAlign.ts
"""

from __future__ import annotations

import math

from .character_codes import CharacterCode
from .types import Justify


def _remove_extra_space(row: list[int]) -> list[int]:
    """Strip leading blank characters (CharacterCode.Blank == 0)."""
    result: list[int] = []
    extra_space = True
    for code in row:
        if code == CharacterCode.BLANK and extra_space:
            continue
        result.append(code)
        extra_space = False
    return result


def horizontal_align(
    width: int, justify: Justify, codes: list[list[int]]
) -> list[list[int]]:
    """Horizontal align."""
    if justify == Justify.LEFT:
        return [_remove_extra_space(row) for row in codes]

    if justify == Justify.RIGHT:
        out = []
        for row in codes:
            stripped = list(reversed(_remove_extra_space(list(reversed(row)))))
            result: list[int] = [int(CharacterCode.BLANK)] * width
            for i, val in enumerate(reversed(stripped)):
                if i < width:
                    result[width - 1 - i] = val
            out.append(result)
        return out

    if justify == Justify.JUSTIFIED:
        rows = [_remove_extra_space(row) for row in codes]
        longest = max((len(r) for r in rows), default=0) - 1
        padding_right = math.floor((width - longest) / 2)
        padding_left = width - (longest + (padding_right + 1))
        padding = min(padding_right, padding_left)
        return [
            [
                row[i - padding]
                if 0 <= i - padding < len(row)
                else int(CharacterCode.BLANK)
                for i in range(width)
            ]
            for row in rows
        ]

    # default / center
    out = []
    for row in codes:
        stripped = list(reversed(_remove_extra_space(list(reversed(row)))))
        padding_left = math.floor((width - len(stripped)) / 2)
        out.append(
            [
                stripped[i - padding_left]
                if 0 <= i - padding_left < len(stripped)
                else int(CharacterCode.BLANK)
                for i in range(width)
            ]
        )
    return out
