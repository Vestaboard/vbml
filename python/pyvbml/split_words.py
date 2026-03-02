"""Split words.

Port of Vestaboard/vbml/src/splitWords.ts
"""

from __future__ import annotations

import re

_COLOR_MATCH_KEEP_DELIM = re.compile(r"(\{.*?\})")


def _chunk_string(word: str, width: int) -> list[str]:
    """Chung string."""
    return [word[i : i + width] for i in range(0, len(word), width)]


def split_words(width: int, template: str) -> list[str]:
    """Split words."""
    # Convert spaces to {0} for consistent parsing
    replaced = template.replace(" ", "{0}")

    # Split on colour codes, keeping the delimiters
    parts = _COLOR_MATCH_KEEP_DELIM.split(replaced)

    # Expand newlines within each part
    expanded: list[str] = []
    for part in parts:
        if "\n" in part:
            expanded.extend(re.split(r"(\n)", part))
        else:
            expanded.append(part)

    # Split long words into chunks that fit on a line.
    # Colour/character codes are treated as single characters — skip chunking.
    result: list[str] = []
    for part in expanded:
        if part.startswith("{") and part.endswith("}"):
            result.append(part)
        elif len(part) > width:
            result.extend(_chunk_string(part, width))
        else:
            result.append(part)

    return [p for p in result if p]
