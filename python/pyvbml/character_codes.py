"""Character codes.

Port of Vestaboard/vbml/src/characterCodes.ts
"""

from __future__ import annotations

from enum import IntEnum
from typing import Final

from .multiple_character_mappings import MULTIPLE_CHARACTER_MAPPINGS

# __VARIATION SELECTOR-16__
# https://www.unicode.org/charts/PDF/UFE00.pdf
# Emoji variation selector; preceded by U+2764 ("Heavy Black Heart") to produce
# "Red Heart" (❤️). Should be removed entirely, not cast to whitespace.
_VARIATION_SELECTOR_SIXTEEN = "\ufe0f"


class CharacterCode(IntEnum):
    """Character code."""

    BLANK = 0
    LETTER_A = 1
    LETTER_B = 2
    LETTER_C = 3
    LETTER_D = 4
    LETTER_E = 5
    LETTER_F = 6
    LETTER_G = 7
    LETTER_H = 8
    LETTER_I = 9
    LETTER_J = 10
    LETTER_K = 11
    LETTER_L = 12
    LETTER_M = 13
    LETTER_N = 14
    LETTER_O = 15
    LETTER_P = 16
    LETTER_Q = 17
    LETTER_R = 18
    LETTER_S = 19
    LETTER_T = 20
    LETTER_U = 21
    LETTER_V = 22
    LETTER_W = 23
    LETTER_X = 24
    LETTER_Y = 25
    LETTER_Z = 26
    ONE = 27
    TWO = 28
    THREE = 29
    FOUR = 30
    FIVE = 31
    SIX = 32
    SEVEN = 33
    EIGHT = 34
    NINE = 35
    ZERO = 36
    EXCLAMATION_MARK = 37
    AT_SIGN = 38
    POUND_SIGN = 39
    DOLLAR_SIGN = 40
    LEFT_PARENTHESIS = 41
    RIGHT_PARENTHESIS = 42
    HYPHEN = 44
    PLUS_SIGN = 46
    AMPERSAND = 47
    EQUALS_SIGN = 48
    SEMICOLON = 49
    COLON = 50
    SINGLE_QUOTE = 52
    DOUBLE_QUOTE = 53
    PERCENT_SIGN = 54
    COMMA = 55
    PERIOD = 56
    SLASH = 59
    QUESTION_MARK = 60
    DEGREE_SIGN = 62
    RED = 63
    ORANGE = 64
    YELLOW = 65
    GREEN = 66
    BLUE = 67
    VIOLET = 68
    WHITE = 69
    BLACK = 70
    FILLED = 71


COLOR_CODES: Final[list[CharacterCode]] = [
    CharacterCode.RED,
    CharacterCode.ORANGE,
    CharacterCode.YELLOW,
    CharacterCode.GREEN,
    CharacterCode.BLUE,
    CharacterCode.VIOLET,
    CharacterCode.WHITE,
    CharacterCode.BLACK,
]

_valid_character_codes = set(int(c) for c in CharacterCode)

_CHARACTER_CODES_TABLE = [
    (
        CharacterCode.BLANK,
        [
            " ",
            "©",
            "®",
            "<",
            ">",
            "²",
            "†",
            "‡",
            "ˆ",
            "Þ",
            "þ",
            "µ",
            "¶",
            "*",
            "^",
            "¬",
            "«",
            "»",
            "›",
            "³",
            "¹",
            "€",
            "‹",
            "˜",
            "÷",
            "π",
            "∆",
            "√",
            "∫",
            "∞",
        ],
    ),
    (
        CharacterCode.LETTER_A,
        [
            "A",
            "a",
            "â",
            "à",
            "å",
            "á",
            "À",
            "Á",
            "Â",
            "Ã",
            "Å",
            "ã",
            "ä",
            "Ä",
            "∂",
            "œ",
            "æ",
            "Æ",
        ],
    ),
    (CharacterCode.LETTER_B, ["B", "b"]),
    (CharacterCode.LETTER_C, ["C", "c", "ç", "Ç", "¢", "ć", "Ć", "č", "Č"]),
    (CharacterCode.LETTER_D, ["D", "d", "Ð", "ð"]),
    (
        CharacterCode.LETTER_E,
        ["E", "e", "é", "ê", "ë", "è", "È", "É", "Ê", "Ë", "€", "£", "∑"],
    ),
    (CharacterCode.LETTER_F, ["F", "f", "ƒ", "ſ"]),
    (CharacterCode.LETTER_G, ["G", "g", "ğ", "Ğ", "ģ", "Ģ", "ġ", "Ġ", "ĝ", "Ĝ"]),
    (CharacterCode.LETTER_H, ["H", "h", "ħ", "Ħ", "ĥ", "Ĥ"]),
    (
        CharacterCode.LETTER_I,
        ["I", "i", "í", "ï", "î", "ì", "Ì", "Í", "Î", "Ï", "|", "¡"],
    ),
    (CharacterCode.LETTER_J, ["J", "j", "ĵ", "Ĵ", "į", "Į"]),
    (CharacterCode.LETTER_K, ["K", "k", "ķ", "Ķ", "ĸ"]),
    (
        CharacterCode.LETTER_L,
        ["L", "l", "£", "ł", "Ł", "ļ", "Ļ", "ĺ", "Ĺ", "ľ", "Ľ", "ŀ", "Ŀ"],
    ),
    (CharacterCode.LETTER_M, ["M", "m"]),
    (CharacterCode.LETTER_N, ["N", "n", "ñ", "Ñ", "ń", "Ń", "ň", "Ň", "ņ", "Ņ"]),
    (
        CharacterCode.LETTER_O,
        ["O", "o", "ó", "ô", "ò", "Ò", "Ó", "Ô", "Õ", "Ø", "ð", "õ", "ø", "ö", "Ö"],
    ),
    (CharacterCode.LETTER_P, ["P", "p", "Þ", "þ", "¶"]),
    (CharacterCode.LETTER_Q, ["Q", "q"]),
    (CharacterCode.LETTER_R, ["R", "r", "ŕ", "Ŕ", "ř", "Ř", "ŗ", "Ŗ"]),
    (CharacterCode.LETTER_S, ["S", "s", "š", "Š", "§", "ś", "Ś", "ş", "Ş", "ș", "Ș"]),
    (CharacterCode.LETTER_T, ["T", "t", "ť", "Ť", "ţ", "Ţ", "ŧ", "Ŧ"]),
    (
        CharacterCode.LETTER_U,
        [
            "U",
            "u",
            "û",
            "ù",
            "ú",
            "Ù",
            "Ú",
            "Û",
            "µ",
            "ū",
            "Ū",
            "ů",
            "Ů",
            "ų",
            "Ų",
            "Ü",
        ],
    ),
    (CharacterCode.LETTER_V, ["V", "v", "Ʋ", "ʋ"]),
    (CharacterCode.LETTER_W, ["W", "w", "ŵ", "Ŵ", "ẁ", "Ẁ", "ẃ", "Ẃ", "ẅ", "Ẅ"]),
    (CharacterCode.LETTER_X, ["X", "x", "ẍ", "Ẍ"]),
    (
        CharacterCode.LETTER_Y,
        ["Y", "y", "ý", "ÿ", "Ý", "ŷ", "Ŷ", "ỳ", "Ỳ", "ỹ", "Ỹ", "Ÿ"],
    ),
    (CharacterCode.LETTER_Z, ["Z", "z", "ž", "Ž", "ź", "Ź", "ż", "Ż"]),
    (CharacterCode.ONE, ["1", "¹"]),
    (CharacterCode.TWO, ["2", "²"]),
    (CharacterCode.THREE, ["3", "³"]),
    (CharacterCode.FOUR, ["4"]),
    (CharacterCode.FIVE, ["5"]),
    (CharacterCode.SIX, ["6"]),
    (CharacterCode.SEVEN, ["7"]),
    (CharacterCode.EIGHT, ["8"]),
    (CharacterCode.NINE, ["9"]),
    (CharacterCode.ZERO, ["0"]),
    (CharacterCode.EXCLAMATION_MARK, ["!", "ǃ"]),
    (CharacterCode.AT_SIGN, ["@"]),
    (CharacterCode.POUND_SIGN, ["#", "№"]),
    (
        CharacterCode.DOLLAR_SIGN,
        ["$", "¢", "£", "¤", "¥", "₩", "₪", "₫", "€", "₹", "₺", "₽"],
    ),
    (CharacterCode.LEFT_PARENTHESIS, ["(", "[", "{", "⟨", "«"]),
    (CharacterCode.RIGHT_PARENTHESIS, [")", "]", "}", "⟩", "»"]),
    (CharacterCode.HYPHEN, ["-", "—", "–", "¯", "~", "_"]),
    (CharacterCode.PLUS_SIGN, ["+", "±", "∓", "∔"]),
    (CharacterCode.AMPERSAND, ["&"]),
    (CharacterCode.EQUALS_SIGN, ["=", "≠", "≈", "≡"]),
    (CharacterCode.SEMICOLON, [";", "；"]),
    (CharacterCode.COLON, [":", "¦"]),
    (
        CharacterCode.SINGLE_QUOTE,
        ["'", "'", "'", "`", "´", "‚", "‛", "ʹ", "ʻ", "ʽ", "ʾ", "ʿ", "ˈ", "ˊ", "ˋ"],
    ),
    (
        CharacterCode.DOUBLE_QUOTE,
        ['"', "„", "\u201c", "\u201d", "¨", "˝", "ˮ", "˵", "˶", "‟", "\u201f"],
    ),
    (CharacterCode.PERCENT_SIGN, ["%", "‰", "‱"]),
    (CharacterCode.COMMA, [",", "¸", "‚", "，", "、", "､"]),
    (CharacterCode.PERIOD, [".", "․", "‥", "…"]),
    (CharacterCode.SLASH, ["/", "\\", "⁄", "∕", "⧸", "⫻", "⫽", "⧵"]),
    (CharacterCode.QUESTION_MARK, ["?", "¿"]),
    (
        CharacterCode.DEGREE_SIGN,
        [
            "°",
            "˚",
            "º",
            "¤",
            "•",
            "·",
            "∙",
            "∘",
            "⚬",
            "⦿",
            "⨀",
            "⨁",
            "⨂",
            "❤️",
            "🧡",
            "💛",
            "💚",
            "💙",
            "💜",
            "🖤",
            "🤍",
            "🤎",
            "❤",
        ],
    ),
]

_supported: list[str] = []
for _code, _mappings in _CHARACTER_CODES_TABLE:
    if _mappings:
        _supported.append(_mappings[0].lower())
        _supported.append(_mappings[0].upper())

_supported += [
    "\n",
    "\u201c",
    "\u2019",
    "{",
    "}",
    "⬜",
    "🟥",
    "🟧",
    "🟨",
    "🟩",
    "🟦",
    "🟪",
    "⬛",
    "❤",
]

supported_characters: list[str] = list(
    dict.fromkeys(_supported)
)  # deduplicated, order preserved

# Flat char → code lookup (first mapping wins)
_MAPPED_CHARACTERS: dict[str, int] = {}
for _code, _mappings in _CHARACTER_CODES_TABLE:
    for _m in _mappings:
        if _m not in _MAPPED_CHARACTERS:
            _MAPPED_CHARACTERS[_m] = int(_code)


def get_character_code(character: str) -> int | None:
    """Get character code."""
    return _MAPPED_CHARACTERS.get(character)


def _validate_character_code(code: int) -> int:
    """Validate character code."""
    if code in _valid_character_codes:
        return code
    raise ValueError(f"Invalid Character Code: {code}")


def convert_characters_to_character_codes(characters: str) -> list[int]:
    """Convert a string (possibly containing {N} colour/character codes) into a list of integer character codes."""
    result: list[int] = []
    i = 0
    while i < len(characters):
        ch = characters[i]
        if ch == "{":
            j = characters.index("}", i)
            code_str = characters[i + 1 : j]
            result.append(_validate_character_code(int(code_str)))
            i = j + 1
        elif ch == "}":
            i += 1
        else:
            code = get_character_code(ch)
            if code is not None:
                result.append(code)
            i += 1
    return result


def mapping_to_character(character: str) -> str:
    """Map a character."""
    if character == _VARIATION_SELECTOR_SIXTEEN:
        return ""

    multi = MULTIPLE_CHARACTER_MAPPINGS.get(character)
    if multi:
        return multi

    if character in supported_characters:
        return character

    for _code, mappings in _CHARACTER_CODES_TABLE:
        if character in mappings:
            return mappings[0].lower()

    return " "
