from __future__ import annotations

import pytest

from pyvbml.parse_component import parse_absolute_component, parse_component

from .support import assert_case, case_ids, load_cases


@pytest.mark.parametrize("case", load_cases("parseComponent"), ids=case_ids)
def test_parse_component(case) -> None:
    def _run(input_data):
        props = input_data.get("props", {})
        if input_data.get("mode") == "absolute":
            return parse_absolute_component(
                input_data["height"],
                input_data["width"],
                props,
                input_data["component"],
            )

        return parse_component(
            input_data["height"],
            input_data["width"],
            props,
            input_data["component"],
        )

    assert_case(case, _run)
