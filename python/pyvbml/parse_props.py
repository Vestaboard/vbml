"""Parse props.

Port of Vestaboard/vbml/src/parseProps.ts

Implements a minimal Mustache renderer covering:
  {{variable}}           — simple interpolation
  {{#key}}...{{/key}}    — truthy sections / array iteration ({{.}} for current item)
  {{^key}}...{{/key}}    — inverted (falsy) sections

For full Mustache support install the `chevron` package and replace _render with:
    import chevron
    return chevron.render(template, props)
"""

from __future__ import annotations

import re

from .types import VBMLProps

# Matches the innermost {{#tag}}content{{/tag}} or {{^tag}}content{{/tag}} block
_SECTION_RE = re.compile(r"\{\{([#^])(\w+)\}\}(.*?)\{\{/\2\}\}", re.DOTALL)
_VARIABLE_RE = re.compile(r"\{\{(\w+|\.)\}\}")


def _render(template: str, ctx: dict) -> str:
    # Process sections iteratively until none remain
    while True:
        m = _SECTION_RE.search(template)
        if not m:
            break
        sigil, key, body = m.group(1), m.group(2), m.group(3)
        value = ctx.get(key)

        if sigil == "#":
            if isinstance(value, list):
                replacement = "".join(
                    _render(body, {**ctx, ".": item}) for item in value
                )
            elif value:
                replacement = _render(body, ctx)
            else:
                replacement = ""
        else:  # "^" inverted
            replacement = "" if value else _render(body, ctx)

        template = template[: m.start()] + replacement + template[m.end() :]

    # Interpolate remaining {{variables}}
    def _sub(m: re.Match) -> str:
        key = m.group(1)
        val = ctx.get(key, "")
        return str(val)

    return _VARIABLE_RE.sub(_sub, template)


def parse_props(props: VBMLProps, template: str) -> str:
    """Parse props."""
    return _render(template, props)
