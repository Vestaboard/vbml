from __future__ import annotations

import pytest

from pyvbml.classic import classic

from .support import assert_case, case_ids, load_cases


@pytest.mark.parametrize("case", load_cases("classic"), ids=case_ids)
def test_classic(case) -> None:
    def _run(input_data):
        options = input_data.get("options", {})
        return classic(
            input_data["text"],
            extra_h_padding=options.get("extraHPadding", 0),
            preserve_double_spaces=options.get("preserveDoubleSpaces", False),
        )

    assert_case(case, _run)
