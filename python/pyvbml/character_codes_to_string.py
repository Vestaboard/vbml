"""Character codes to string.

Port of Vestaboard/vbml/src/characterCodesToString.ts
"""

from __future__ import annotations

import re

from .types import ICharacterCodesToStringOptions

_CHARACTER_CODES_MAP: dict[str, str] = {
    "0": " ",
    "1": "A",
    "2": "B",
    "3": "C",
    "4": "D",
    "5": "E",
    "6": "F",
    "7": "G",
    "8": "H",
    "9": "I",
    "10": "J",
    "11": "K",
    "12": "L",
    "13": "M",
    "14": "N",
    "15": "O",
    "16": "P",
    "17": "Q",
    "18": "R",
    "19": "S",
    "20": "T",
    "21": "U",
    "22": "V",
    "23": "W",
    "24": "X",
    "25": "Y",
    "26": "Z",
    "27": "1",
    "28": "2",
    "29": "3",
    "30": "4",
    "31": "5",
    "32": "6",
    "33": "7",
    "34": "8",
    "35": "9",
    "36": "0",
    "37": "!",
    "38": "@",
    "39": "#",
    "40": "$",
    "41": "(",
    "42": ")",
    "43": " ",
    "44": "-",
    "45": "",
    "46": "+",
    "47": "&",
    "48": "=",
    "49": ";",
    "50": ":",
    "51": "",
    "52": "'",
    "53": '"',
    "54": "%",
    "55": ",",
    "56": ".",
    "57": "",
    "58": "",
    "59": "/",
    "60": "?",
    "61": "",
    "62": "°",
    "63": "",
    "64": "",
    "65": "",
    "66": "",
    "67": "",
    "68": "",
    "69": "",
    "70": "",
    "71": " ",
    "100": "\n",  # line break sentinel
}

# Characters considered "empty" — enough consecutive ones can justify a line break
_BREAKABLE = {k for k, v in _CHARACTER_CODES_MAP.items() if v in ("", " ")}


def _count_empty_before_first_word(row: list[int]) -> int:
    """Count leading breakable characters before the first real character."""
    count, counting = 0, True
    for code in row:
        if str(code) not in _BREAKABLE or not counting:
            counting = False
        else:
            count += 1
    return count


def _count_first_word_length(row: list[int]) -> int:
    """Length of the first non-empty word in the row."""
    count, counting, started = 0, True, False
    for code in row:
        if not counting:
            break
        is_char = str(code) not in _BREAKABLE
        if is_char:
            count += 1
            started = True
        elif started:
            counting = False
    return count


def character_codes_to_string(
    characters: list[list[int]],
    options: ICharacterCodesToStringOptions | None = None,
) -> str:
    """Character codes to string."""
    allow_line_breaks = (options or {}).get("allowLineBreaks", False)

    merged: list[int] = []
    for index, row in enumerate(characters):
        if index == 0:
            merged.extend(row)
            continue

        if allow_line_breaks:
            prev = characters[index - 1]
            prefix = _count_empty_before_first_word(prev)
            postfix = _count_empty_before_first_word(list(reversed(prev)))
            first_word = _count_first_word_length(row)
            sep = 100 if (prefix + postfix) > first_word else 0
        else:
            sep = 0

        merged.append(sep)
        merged.extend(row)

    text = "".join(_CHARACTER_CODES_MAP.get(str(c), "") for c in merged)
    text = text.strip()
    text = " ".join(p for p in text.split(" ") if p)  # collapse duplicate spaces
    text = re.sub(r" \n", "\n", text)  # remove space before line break
    return text
