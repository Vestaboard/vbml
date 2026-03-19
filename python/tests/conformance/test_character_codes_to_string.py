from __future__ import annotations

import pytest

from pyvbml.character_codes_to_string import character_codes_to_string

from .support import assert_case, case_ids, load_cases


@pytest.mark.parametrize("case", load_cases("characterCodesToString"), ids=case_ids)
def test_character_codes_to_string(case) -> None:
    assert_case(
        case,
        lambda input_data: character_codes_to_string(
            input_data["characters"],
            input_data.get("options"),
        ),
    )
