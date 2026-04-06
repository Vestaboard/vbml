"""Vertical align.

Port of Vestaboard/vbml/src/verticalAlign.ts
"""

from __future__ import annotations

import math

from .types import Align


def vertical_align(
    height: int, align: Align, codes: list[list[int]]
) -> list[list[int]]:
    """Vertical align."""
    if align == Align.TOP:
        return codes

    if align == Align.BOTTOM:
        reversed_codes = list(reversed(codes))
        return [
            reversed_codes[height - 1 - i]
            if (height - 1 - i) < len(reversed_codes)
            else []
            for i in range(height)
        ]

    if align == Align.JUSTIFIED:
        padding_top = max(math.ceil((height - len(codes)) / 2), 0)
        return [
            codes[i - padding_top] if 0 <= i - padding_top < len(codes) else []
            for i in range(height)
        ]

    # default / center
    padding_top = max(math.floor((height - len(codes)) / 2), 0)
    return [
        codes[i - padding_top] if 0 <= i - padding_top < len(codes) else []
        for i in range(height)
    ]
