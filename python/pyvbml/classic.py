"""Classic.

Port of Vestaboard/vbml/src/classic.ts

A direct translation of formatter.kt → TypeScript → Python.
https://docs.vestaboard.com/docs/characterCodes
"""

from __future__ import annotations

import math
import re

from .const import DIMENSIONS_FLAGSHIP
from .emojis_to_character_codes import emojis_to_character_codes

# ---------------------------------------------------------------------------
# Character map (mirrors VestaboardCharactersCodeMap in classic.ts)
# ---------------------------------------------------------------------------

_VESTA_MAP: dict[str, int] = {
    " ": 0,
    # A–Z (upper and lower both map to the same code)
    **{c.upper(): i + 1 for i, c in enumerate("abcdefghijklmnopqrstuvwxyz")},
    **{c.lower(): i + 1 for i, c in enumerate("abcdefghijklmnopqrstuvwxyz")},
    # Digits
    "1": 27,
    "2": 28,
    "3": 29,
    "4": 30,
    "5": 31,
    "6": 32,
    "7": 33,
    "8": 34,
    "9": 35,
    "0": 36,
    # Punctuation / symbols
    "!": 37,
    "@": 38,
    "#": 39,
    "$": 40,
    "(": 41,
    ")": 42,
    "-": 44,
    "+": 46,
    "&": 47,
    "=": 48,
    ";": 49,
    ":": 50,
    "'": 52,
    '"': 53,
    "‟": 53,
    "\u201c": 53,
    "\u201d": 53,
    "„": 53,
    "¨": 53,
    "\u2019": 52,
    "´": 52,
    "ˋ": 52,
    "ˊ": 52,
    "‚": 52,
    "`": 52,
    "%": 54,
    ",": 55,
    ".": 56,
    "/": 59,
    "\\": 59,
    "?": 60,
    "°": 62,
    "—": 44,
    "–": 44,
    "¯": 44,
    "~": 44,
    "¸": 55,
    "¦": 50,
    "¿": 60,
    "[": 41,
    "{": 41,
    "]": 42,
    "}": 42,
    "‰": 54,
    "¤": 62,
    "•": 62,
    "·": 62,
    # Accented / extended characters
    "â": 1,
    "à": 1,
    "å": 1,
    "á": 1,
    "À": 1,
    "Á": 1,
    "Â": 1,
    "Ã": 1,
    "Ä": 1,
    "Å": 1,
    "ã": 1,
    "ç": 3,
    "Ç": 3,
    "¢": 3,
    "Ð": 4,
    "é": 5,
    "ê": 5,
    "ë": 5,
    "è": 5,
    "È": 5,
    "É": 5,
    "Ê": 5,
    "Ë": 5,
    "ƒ": 6,
    "í": 9,
    "ï": 9,
    "î": 9,
    "ì": 9,
    "Ì": 9,
    "Í": 9,
    "Î": 9,
    "Ï": 9,
    "|": 9,
    "£": 12,
    "ñ": 14,
    "Ñ": 14,
    "ó": 15,
    "ô": 15,
    "ö": 15,
    "ò": 15,
    "Ò": 15,
    "Ó": 15,
    "Ô": 15,
    "Õ": 15,
    "Ö": 15,
    "Ø": 15,
    "ð": 15,
    "õ": 15,
    "ø": 15,
    "±": 46,
    "š": 19,
    "Š": 19,
    "§": 19,
    "û": 21,
    "ù": 21,
    "ú": 21,
    "Ù": 21,
    "Ú": 21,
    "Û": 21,
    "ğ": 7,
    # {N} colour/character code literals
    **{f"{{{i}}}": i for i in range(72)},
}

_ROW_COUNT = DIMENSIONS_FLAGSHIP[0]
_COLUMN_COUNT = DIMENSIONS_FLAGSHIP[1]

_WORD_CHAR_RE = re.compile(r"[a-zA-Z]+|\{\.?\d+\}|\d+|\s+|[^\w\s]", re.ASCII)
_WORD_CHAR_DSPACE_RE = re.compile(r"[a-zA-Z]+|\{\.?\d+\}|\d+| {2}| |[^\w\s]", re.ASCII)


def classic(
    text: str,
    extra_h_padding: int = 0,
    preserve_double_spaces: bool = False,
) -> list[list[int]]:
    """Classic."""
    empty_row = [0] * _COLUMN_COUNT
    empty_board = [empty_row[:] for _ in range(_ROW_COUNT)]

    if not text:
        return empty_board

    lines = emojis_to_character_codes(text).split("\n")
    pattern = _WORD_CHAR_DSPACE_RE if preserve_double_spaces else _WORD_CHAR_RE

    chunked_lines = [pattern.findall(line) for line in lines]

    def word_to_codes(word: str) -> list[int]:
        # {N} colour/character code literal
        if word.startswith("{") and word.endswith("}"):
            v = _VESTA_MAP.get(word)
            return [v] if v is not None else []
        # Double-space preservation
        if preserve_double_spaces and word == "  ":
            return [0, 0]
        result: list[int] = []
        for ch in word:
            # ä/Ä expand to [A, E]
            if ch in ("ä", "Ä"):
                result += [_VESTA_MAP.get("a", 0), _VESTA_MAP.get("e", 0)]
            else:
                # Unknown chars map to 0 (blank), not dropped — matches TS behaviour
                result.append(_VESTA_MAP.get(ch, 0))
        return result

    vesta_lines = [
        [code for w in (line or []) for code in word_to_codes(w)]
        for line in chunked_lines
    ]

    def split_into_words(chars: list[int]) -> list[list[int]]:
        words: list[list[int]] = []
        word: list[int] = []
        for i, c in enumerate(chars):
            if c == 0 and not preserve_double_spaces:
                words.append(word)
                word = []
            elif c == 0 and preserve_double_spaces:
                # Only treat a lone 0 as a word boundary
                next_is_zero = i + 1 < len(chars) and chars[i + 1] == 0
                prev_is_zero = i > 0 and chars[i - 1] == 0
                if next_is_zero or prev_is_zero:
                    word.append(c)
                else:
                    words.append(word)
                    word = []
            else:
                word.append(c)
        words.append(word)
        return words

    words_lines = [split_into_words(chars) for chars in vesta_lines]
    content_width = _COLUMN_COUNT - extra_h_padding

    def make_lines(words: list[list[int]]) -> list[list[list[int]]]:
        # Strip leading/trailing empty words (from leading/trailing spaces)
        # This mirrors the TS behaviour where words with length 0 are filtered out
        words = [w for w in words if w]

        # Chunk any individual word that is longer than content_width
        chunked: list[list[int]] = []
        for w in words:
            for i in range(0, max(len(w), 1), content_width):
                chunked.append(w[i : i + content_width])
        words = chunked

        total = sum(len(w) for w in words) + max(len(words) - 1, 0)
        if total <= content_width:
            return [words]

        for idx in range(1, len(words) + 1):
            sub = words[:idx]
            needed = sum(len(w) for w in sub) + len(sub) - 1
            if needed > content_width:
                return [words[: idx - 1]] + make_lines(words[idx - 1 :])
        return []

    wrapping = [line for wl in words_lines for line in make_lines(wl)]

    # Interleave words with single-space [0] separators, drop trailing separator
    formatted = [
        [item for pair in zip(line, [[0]] * len(line)) for item in pair][:-1]
        for line in wrapping
    ]

    num_content_rows = len(formatted)

    # If exactly 3 rows with no padding, redo with horizontal padding to avoid
    # cramming content into the middle third of the board
    if num_content_rows == 3 and extra_h_padding == 0:
        return classic(
            text, extra_h_padding=4, preserve_double_spaces=preserve_double_spaces
        )

    max_cols = max(
        (sum(len(w) for w in line) for line in formatted),
        default=0,
    )
    h_pad = max(math.floor((_COLUMN_COUNT - (max_cols + 1)) / 2), 0)
    v_pad = max(math.floor((_ROW_COUNT - num_content_rows) / 2), 0)

    h_pad_words = [[0]] * h_pad
    empty_row_paddings = [empty_row[:] for _ in range(v_pad)]

    padded_content = [h_pad_words + line + h_pad_words for line in formatted]
    padded = empty_row_paddings + padded_content + empty_row_paddings

    def flatten(row) -> list[int]:
        """Flatten a row.

        A row is either a flat list[int] (empty padding) or list[list[int]] (content).
        """
        if not row:
            return []
        if isinstance(row[0], list):
            return [c for word in row for c in word]
        return list(row)

    codes = [flatten(row)[:_COLUMN_COUNT] for row in padded[:_ROW_COUNT]]

    return [
        [
            codes[r][c] if r < len(codes) and c < len(codes[r]) else 0
            for c in range(_COLUMN_COUNT)
        ]
        for r in range(_ROW_COUNT)
    ]
