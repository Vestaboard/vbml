"""Character codes to ASCII.

Port of Vestaboard/vbml/src/characterCodesToAscii.ts
"""

from __future__ import annotations


def character_codes_to_ascii(
    character_codes: list[list[int]],
    is_white: bool = False,
) -> str:
    """Character codes to ASCII."""
    BLACK = "⬛"
    WHITE = "⬜"
    VIOLET = "🟪"
    BLUE = "🟦"
    GREEN = "🟩"
    YELLOW = "🟨"
    ORANGE = "🟧"
    RED = "🟥"
    BLANK = "  "
    FILLED = WHITE if not is_white else BLACK

    character_codes_map: dict[str, str] = {
        "0": BLANK,
        "1": "A ",
        "2": "B ",
        "3": "C ",
        "4": "D ",
        "5": "E ",
        "6": "F ",
        "7": "G ",
        "8": "H ",
        "9": "I ",
        "10": "J ",
        "11": "K ",
        "12": "L ",
        "13": "M ",
        "14": "N ",
        "15": "O ",
        "16": "P ",
        "17": "Q ",
        "18": "R ",
        "19": "S ",
        "20": "T ",
        "21": "U ",
        "22": "V ",
        "23": "W ",
        "24": "X ",
        "25": "Y ",
        "26": "Z ",
        "27": "1 ",
        "28": "2 ",
        "29": "3 ",
        "30": "4 ",
        "31": "5 ",
        "32": "6 ",
        "33": "7 ",
        "34": "8 ",
        "35": "9 ",
        "36": "0 ",
        "37": "! ",
        "38": "@ ",
        "39": "# ",
        "40": "$ ",
        "41": "( ",
        "42": ") ",
        "43": "  ",
        "44": "- ",
        "45": "  ",
        "46": "+ ",
        "47": "& ",
        "48": "= ",
        "49": "; ",
        "50": ": ",
        "51": "  ",
        "52": "' ",
        "53": '" ',
        "54": "% ",
        "55": ", ",
        "56": ". ",
        "57": "  ",
        "58": "  ",
        "59": "/ ",
        "60": "? ",
        "61": "  ",
        "62": "° ",
        "63": RED,
        "64": ORANGE,
        "65": YELLOW,
        "66": GREEN,
        "67": BLUE,
        "68": VIOLET,
        "69": WHITE,
        "70": BLACK,
        "71": FILLED,
    }

    return "\n\n".join(
        "".join(character_codes_map.get(str(code), "") for code in row)
        for row in character_codes
    )
