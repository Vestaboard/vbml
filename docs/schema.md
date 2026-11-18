# VBML Schema

A VBML definition can include an optional `schema` that describes each prop used by its templates. It does two jobs:

1. **Validation:** `vbml.parse` checks `props` against the schema and throws if they don't conform.
2. **Guidance:** descriptions, options and evidence tell humans and AI agents what each slot should contain.

If `schema` is absent, nothing changes: no validation runs.

```typescript
import { vbml } from "@vestaboard/vbml";

vbml.parse({
  props: { away_team: "Lakers", away_score: 101, accent: "{67}" },
  schema: {
    away_team: {
      description: "Name of the visiting team",
      columns: 10,
      evidence: "TemporalFact",
    },
    away_score: {
      type: "Numeric",
      description: "Visiting team's current score",
      columns: 3,
      evidence: "TemporalFact",
      evidenceRule: "Use the same game and score update as home_score.",
    },
    accent: {
      type: "Color",
      description: "Decorative accent color",
      required: false, // evidence omitted, so it defaults to "Freeform"
    },
  },
  components: [{ template: "{{away_team}} {{away_score}} {{accent}}" }],
});
```

## Shape

`schema` is an object keyed by prop name. Each value is a field definition:

```typescript
{
  [propName: string]: {
    description: string;        // required
    evidence?: "TemporalFact" | "GeneralFact" | "Freeform";  // default "Freeform"
    type?: "Text" | "Numeric" | "Color" | "Enum";   // default "Text"
    rows?: number;
    columns?: number;
    options?: { value: string; description: string }[];  // Enum only
    evidenceRule?: string;
    required?: boolean;         // default true
  }
}
```

## Field reference

| Field | Required | Values | Meaning |
| --- | --- | --- | --- |
| `description` | Yes | non-empty string | What the content should be. Written for agents as much as people. |
| `evidence` | No | `TemporalFact`, `GeneralFact`, `Freeform` (default) | How the value must be sourced. See [Evidence](#evidence). |
| `type` | No | `Text` (default), `Numeric`, `Color`, `Enum` | What kind of value is accepted. See [Types](#types). |
| `rows` | No | positive integer | Maximum number of lines the value can fill. |
| `columns` | No | positive integer | Maximum number of cells on any single line. |
| `options` | Enum only | non-empty array of `{ value, description }` | The allowed values. Required for `Enum`, rejected for other types. Values must be unique. |
| `evidenceRule` | No | string | Tightens the evidence requirement, e.g. `"Use the same game and score update as away_score."` |
| `required` | No | `true` (default), `false` | If `true`, a missing, `null` or `undefined` prop is an error. |

## Types

### Text (default)

- Accepts **strings only**. Numbers, arrays and objects are rejected (`invalid_type`); use `Numeric` for numbers.
- `rows` and `columns` apply.

### Numeric

- Accepts a finite number or a numeric string: `42`, `3.5`, `-1`, `"42"`, `"-3.5"`.
- Rejects `NaN`, `Infinity`, empty or whitespace strings, non-numeric strings, booleans, objects and arrays (`invalid_type`).
- `rows` and `columns` apply to the string form, so `columns: 3` accepts `999` and rejects `1000`.
- There is no `min` / `max`.

### Color

Accepts a Vestaboard color character code from 63 to 71, in any of these forms:

| Form | Example |
| --- | --- |
| number | `63` |
| numeric string | `"63"` |
| template token | `"{63}"` |

Anything else (62, 72, `"red"`, `63.5`) fails with `invalid_color`.

| Name | Code |
| --- | --- |
| Red | 63 |
| Orange | 64 |
| Yellow | 65 |
| Green | 66 |
| Blue | 67 |
| Violet | 68 |
| White | 69 |
| Black | 70 |
| Filled | 71 |

The `Color` map is exported: `Color.Red === 63`. Names are not accepted as prop values, only codes.

> A number or numeric string like `63` renders as the text "63" when interpolated into a template. To render a color tile, pass the token form (`"{63}"`).

### Enum

- The value must exactly match one of `options[].value` (case-sensitive).
- `options[].description` explains what each value means, which helps agents choose.

```typescript
side: {
  type: "Enum",
  description: "Which team is winning",
  evidence: "TemporalFact",
  options: [
    { value: "home", description: "The home team leads" },
    { value: "away", description: "The visiting team leads" },
  ],
}
```

## Size checks (`rows` and `columns`)

- The value is split on `\n`. `rows` is the line count; `columns` is the widest line.
- Each `{nn}` token (e.g. `{63}`) and each color emoji (🟥 🟧 🟨 🟩 🟦 🟪 ⬜ ⬛) counts as **one** cell, so `"Go {63}"` is 4 cells.
- Heart emoji count as one cell (they convert to `{62}`).
- A value that exactly fills the limit is valid; one over is not.
- Size is measured on the raw prop value, not on the laid-out component. It does not account for word wrapping, justification or alignment.

## Evidence

`evidence` states how trustworthy a value needs to be. It is optional and **defaults to `Freeform`** when omitted. It is **metadata only**: `parse` checks that a provided value is valid, but cannot verify where a prop's value came from. Set it explicitly on any field where sourcing matters (for example `TemporalFact` for live scores), since an omitted `evidence` tells an agent that any value is acceptable.

| Value | Meaning |
| --- | --- |
| `TemporalFact` | Requires a user-supplied value or a source matching the requested event and time (e.g. a live score). |
| `GeneralFact` | Model knowledge is sufficient (e.g. a team color). |
| `Freeform` | Any value within the field constraints (e.g. a decorative accent). |

`evidenceRule` is an optional free-text refinement, such as tying two fields to the same source.

`evidence` is a string-literal union type, exported as `Evidence`. Use the plain string in code and JSON (`evidence: "TemporalFact"`). The exported `Evidence` const (`Evidence.TemporalFact`) is an optional convenience that holds the same strings.

## Behavior

- **Order:** the schema definition is validated first, then the props.
- **Undeclared props** (present in `props` but not in `schema`) are allowed and not validated. This keeps props like `rawCharacters` arrays working.
- **Optional props** (`required: false`) are skipped when missing but still validated when provided.

## Errors

### `VBMLSchemaError`: props don't match the schema

Thrown after checking every prop, so all problems are reported at once. `error.issues` is `{ prop, code, message }[]`.

| Code | Cause |
| --- | --- |
| `missing` | Required prop is missing, `null` or `undefined`. |
| `invalid_type` | Wrong kind of value for `Text` or `Numeric`. |
| `too_many_rows` | More lines than `rows`. |
| `too_many_columns` | A line is wider than `columns`. |
| `invalid_color` | Not a color code from 63 to 71. |
| `invalid_enum` | Not one of the `options` values. The message lists the valid ones. |

```typescript
try {
  vbml.parse(definition);
} catch (e) {
  if (e instanceof VBMLSchemaError) {
    console.log(e.issues);
    // [{ prop: "away_score", code: "invalid_type", message: "must be a number or numeric string" }]
  }
}
```

### `VBMLSchemaDefinitionError`: the schema itself is malformed

Thrown (with a message naming the prop) when:

- the schema or a field is not an object
- `description` is missing or empty
- `evidence` is provided but is not one of the three values (omitting it is fine)
- `evidenceRule` is not a string
- `type` is not one of the four types
- `rows` / `columns` is not a positive integer
- `required` is not a boolean
- an `Enum` has no `options`, an empty `options`, options missing a string `value` or `description`, or duplicate values
- `options` is set on a non-`Enum` field

## Python and PHP

The schema behaves identically in all three packages: same fields, same values, same error codes, same messages. Only the surface differs.

**Python** (`pyvbml`): definitions are plain `dict`s.

```python
from pyvbml import Color, VBMLSchemaError, vbml

try:
    vbml.parse({
        "props": {"away_team": "Lakers", "accent": "{68}"},
        "schema": {
            "away_team": {"description": "Visiting team", "columns": 10, "evidence": "TemporalFact"},
            "accent": {"type": "Color", "description": "Accent color", "required": False},
        },
        "components": [{"template": "{{away_team}} {{accent}}"}],
    })
except VBMLSchemaError as err:
    print(err.issues)  # [{"prop": ..., "code": ..., "message": ...}]
```

- `Color` is an `IntEnum` (`Color.RED == 63`, ... `Color.FILLED == 71`). Members are valid Color props.
- `Evidence` and `SchemaFieldType` are `Literal` types; there are no const objects.
- Errors: `VBMLSchemaError` (with `.issues`) and `VBMLSchemaDefinitionError`.

**PHP** (`vestaboard/vbml`): definitions are associative arrays.

```php
use Vestaboard\Vbml\Vbml;
use Vestaboard\Vbml\VBMLSchemaError;

try {
    Vbml::parse([
        'props' => ['away_team' => 'Lakers', 'accent' => '{68}'],
        'schema' => [
            'away_team' => ['description' => 'Visiting team', 'columns' => 10, 'evidence' => 'TemporalFact'],
            'accent' => ['type' => 'Color', 'description' => 'Accent color', 'required' => false],
        ],
        'components' => [['template' => '{{away_team}} {{accent}}']],
    ]);
} catch (VBMLSchemaError $e) {
    print_r($e->issues); // [['prop' => ..., 'code' => ..., 'message' => ...]]
}
```

- `Vestaboard\Vbml\Color` holds the color constants (`Color::Red === 63` ... `Color::Filled === 71`). Evidence and type are plain strings.
- Errors: `VBMLSchemaError` (with `->issues`) and `VBMLSchemaDefinitionError`.

Small language differences:

- `Numeric` strings are matched with a strict decimal pattern (`42`, `-3.5`, `1e3`). TypeScript's `Number()` also accepts forms like `"0x10"`; Python and PHP reject them.
- Python rejects `True`/`False` for `Numeric` and `Color`; PHP rejects booleans too.
- `rows` / `columns` may be integer-valued floats (`2.0`) in Python and PHP, matching JavaScript, where `2.0` is `2`.

## JSON definitions

`type` and `evidence` are string-literal unions (`SchemaFieldType` and `Evidence`), so a schema can be authored as JSON (for example, by an agent) and parsed straight into an `IVBML` without casts. The `Color`, `SchemaType` and `Evidence` consts are conveniences, not requirements.
