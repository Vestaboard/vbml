"""Get lines from words.

Port of Vestaboard/vbml/src/getLinesFromWords.ts
"""

from __future__ import annotations


def get_lines_from_words(width: int, words: list[str]) -> list[str]:
    """Get lines from words."""
    # Each accumulator entry tracks the line string and its logical length
    # (colour codes count as 1, not their string length).
    acc: list[dict] = [{"line": "", "length": 0}]

    for index, curr in enumerate(words):
        last = acc[-1]
        line_length = last["length"]
        empty_line = not last["line"]

        # Double newline → insert a blank line
        if curr == "\n" and index > 0 and words[index - 1] == "\n":
            acc.append({"line": "", "length": 0})
            continue

        if curr == "\n":
            # Finish the current line and start a fresh one
            acc[-1] = {"line": last["line"], "length": width}
            continue

        # Colour / character codes — treat as one bit wide
        if curr.startswith("{") and curr.endswith("}"):
            if 1 + line_length > width:
                # A blank space forced at the beginning of a new line is ignored
                if curr == "{0}":
                    continue
                acc.append({"line": curr, "length": 1})
            else:
                acc[-1] = {
                    "line": last["line"] + curr,
                    "length": line_length + 1,
                }
            continue

        # Word fits on the current line
        if width >= len(curr) + line_length and not empty_line:
            acc[-1] = {
                "line": last["line"] + curr,
                "length": line_length + len(curr),
            }
        else:
            # Default: start a new line
            acc.append({"line": curr, "length": len(curr)})

    # Remove the initial empty sentinel if it was never filled
    if not acc[0]["line"]:
        return [item["line"] for item in acc[1:]]
    return [item["line"] for item in acc]
