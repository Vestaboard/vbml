from __future__ import annotations

import pytest

from pyvbml import vbml

from .support import assert_case, case_ids, load_cases


@pytest.mark.parametrize("case", load_cases("vbml"), ids=case_ids)
def test_vbml(case) -> None:
    assert_case(case, lambda input_data: vbml.parse(input_data))
