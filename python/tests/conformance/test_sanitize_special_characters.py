from __future__ import annotations

import pytest

from pyvbml.sanitize_special_characters import sanitize_special_characters

from .support import assert_case, case_ids, load_cases


@pytest.mark.parametrize(
    "case", load_cases("sanitizeSpecialCharacters"), ids=case_ids
)
def test_sanitize_special_characters(case) -> None:
    assert_case(case, lambda input_data: sanitize_special_characters(input_data["text"]))
