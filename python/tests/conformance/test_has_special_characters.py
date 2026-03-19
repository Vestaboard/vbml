from __future__ import annotations

import pytest

from pyvbml.has_special_characters import has_special_characters

from .support import assert_case, case_ids, load_cases


@pytest.mark.parametrize("case", load_cases("hasSpecialCharacters"), ids=case_ids)
def test_has_special_characters(case) -> None:
    assert_case(case, lambda input_data: has_special_characters(input_data["text"]))
