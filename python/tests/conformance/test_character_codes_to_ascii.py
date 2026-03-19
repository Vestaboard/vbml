from __future__ import annotations

import pytest

from pyvbml.character_codes_to_ascii import character_codes_to_ascii

from .support import assert_case, case_ids, load_cases


@pytest.mark.parametrize("case", load_cases("characterCodesToAscii"), ids=case_ids)
def test_character_codes_to_ascii(case) -> None:
    assert_case(
        case,
        lambda input_data: character_codes_to_ascii(
            input_data["characterCodes"],
            input_data.get("isWhite", False),
        ),
    )
