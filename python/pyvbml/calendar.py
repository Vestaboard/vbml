"""Calendar.

Port of Vestaboard/vbml/src/calendar.ts
"""

from __future__ import annotations

import math
from calendar import monthrange
from datetime import date

from .character_codes import CharacterCode


def _char_code_for_digit(digit: str) -> int:
    """Char code for digit."""
    return 36 if digit == "0" else int(digit) + 26


def _char_code_for_day(day: str) -> int:
    """Char code for day."""
    return {
        "Sun": 19,
        "Mon": 13,
        "Tue": 20,
        "Wed": 23,
        "Thu": 20,
        "Fri": 6,
        "Sat": 19,
    }.get(day, 0)


def make_calendar(
    month: int,
    year: int,
    *,
    default_day_color: CharacterCode | int | None = None,
    highlighted_days: dict[int | str, CharacterCode | int] | None = None,
    hide_day_of_week: bool = False,
    hide_dates: bool = False,
    hide_month_year: bool = False,
) -> list[list[int]]:
    """Make calendar."""
    num_days = monthrange(year, month)[1]

    first_day_of_month = date(year, month, 1).strftime("%a")  # e.g. "Mon"
    days_of_week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    offset = days_of_week.index(first_day_of_month)

    cal_color = CharacterCode.YELLOW if default_day_color is None else default_day_color

    # Row day ranges (as strings, matching the TS template literals)
    first_row_days = [str(1), str(7 - offset)]
    second_row_days = [str(7 - offset + 1), str(7 - offset + 7)]
    third_row_days = [str(7 - offset + 8), str(7 - offset + 14)]
    fourth_row_days = [str(7 - offset + 15), str(7 - offset + 21)]
    fifth_start = 7 - offset + 22
    fifth_end = min(7 - offset + num_days, num_days)
    fifth_row_days = (
        [str(fifth_start), str(fifth_end)] if fifth_start <= num_days else None
    )
    num_days_last_row = fifth_end - fifth_start + 1

    def dc(digit: str) -> int:
        """Digit → character code, or 0 when dates are hidden."""
        return 0 if hide_dates else _char_code_for_digit(digit)

    if first_row_days[0] == first_row_days[1]:
        first_row = (
            [0, 0, 0, dc(first_row_days[0]), 0]
            + [0] * offset
            + [cal_color] * (7 - offset)
            + [0] * (22 - 12)
        )
    else:
        first_row = (
            [
                0,
                dc(first_row_days[0]),
                0 if hide_dates else 44,
                dc(first_row_days[1]),
                0,
            ]
            + [0] * offset
            + [cal_color] * (7 - offset)
            + [0] * (22 - 12)
        )

    def _two_digit_row(row_days: list[str]) -> list[int]:
        start, end = list(row_days[0]), list(row_days[1])
        row: list[int] = []
        row += [dc(start[0]), dc(start[1])] if len(start) > 1 else [0, dc(start[0])]
        row += [0 if hide_dates else 44]
        row += [dc(end[0]), dc(end[1])] if len(end) > 1 else [dc(end[0]), 0]
        row += [cal_color] * 7
        row += [0] * (22 - 12)
        return row

    second_row = _two_digit_row(second_row_days)
    third_row = _two_digit_row(third_row_days)

    def _exact_two_digit_row(row_days: list[str]) -> list[int]:
        start, end = list(row_days[0]), list(row_days[1])
        row = [
            dc(start[0]),
            dc(start[1]),
            0 if hide_dates else 44,
            dc(end[0]),
            dc(end[1]),
        ]
        row += [cal_color] * 7
        row += [0] * (22 - 12)
        return row

    fourth_row = _exact_two_digit_row(fourth_row_days)

    if not fifth_row_days:
        fifth_row = [0] * 22
    else:
        start, end = list(fifth_row_days[0]), list(fifth_row_days[1])
        fifth_row = [
            dc(start[0]),
            dc(start[1]),
            0 if hide_dates or start == end else 44,
            0 if start == end else dc(end[0]),
            0 if start == end else dc(end[1]),
        ]
        fifth_row += [cal_color] * num_days_last_row
        fifth_row += [0] * (22 - (5 + num_days_last_row))

    # Header: month/year + day-of-week labels
    if hide_month_year:
        month_year = [0, 0, 0, 0, 0]
    else:
        month_year = (
            [_char_code_for_digit(c) for c in str(month)]
            + [59]  # slash
            + [_char_code_for_digit(c) for c in str(year)[2:4]]
        )

    header_space = 5 - len(month_year)
    header_row = (
        month_year
        + [0] * header_space
        + (
            [0] * 7
            if hide_day_of_week
            else [_char_code_for_day(d) for d in days_of_week]
        )
        + [0] * (22 - (7 + 5))
    )

    calendar = [header_row, first_row, second_row, third_row, fourth_row, fifth_row]

    # Overlay individual day colors
    for day_key, color in (highlighted_days or {}).items():
        if (day := int(day_key)) > num_days:
            continue  # ignore days that don't exist in month
        todays_row = math.floor((day + offset - 1) / 7) + 1
        modulus = (day + offset - 1) % 7
        # Account for spillover off the board
        todays_col = (12 if modulus == 0 else 13) if todays_row > 5 else modulus + 5
        calendar[5 if todays_row > 5 else todays_row][todays_col] = color

    return calendar
