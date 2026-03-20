from __future__ import annotations

import pytest

from pyvbml.calendar import make_calendar

from .support import assert_case, case_ids, load_cases


@pytest.mark.parametrize("case", load_cases("calendar"), ids=case_ids)
def test_calendar(case) -> None:
    def _run(input_data):
        return make_calendar(
            input_data["month"],
            input_data["year"],
            default_day_color=input_data.get("defaultDayColor"),
            highlighted_days=input_data.get("days"),
            hide_day_of_week=input_data.get("hideSMTWTFS", False),
            hide_dates=input_data.get("hideDates", False),
            hide_month_year=input_data.get("hideMonthYear", False),
        )

    assert_case(case, _run)
