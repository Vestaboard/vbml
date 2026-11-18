# VBML - Vestaboard Markup Language

## Installation

### JavaScript / TypeScript

```bash
yarn install @vestaboard/vbml
```

or

```bash
npm i @vestaboard/vbml
```

### Python

```bash
pip install pyvbml
```

### PHP

```bash
composer require vestaboard/vbml
```

## Usage

### JavaScript / TypeScript

```typescript
import { vbml } from "@vestaboard/vbml";

// Generate an array of 6 rows of 22 character codes representing the template
const characters = vbml.parse({
  components: [
    {
      style: {
        justify: "center",
        align: "center",
      },
      template: "Hello World!",
    },
  ],
});
```

### Python

```python
from pyvbml import vbml

# Generate an array of 6 rows of 22 character codes representing the template
characters = vbml.parse({
    "components": [
        {
            "style": {
                "justify": "center",
                "align": "center",
            },
            "template": "Hello World!",
        }
    ]
})
```

### PHP

```php
use Vestaboard\Vbml\Vbml;

// Generate an array of 6 rows of 22 character codes representing the template
$characters = Vbml::parse([
    'components' => [
        [
            'style' => [
                'justify' => 'center',
                'align' => 'center',
            ],
            'template' => 'Hello World!',
        ],
    ],
]);
```

## Schema (JavaScript / TypeScript)

A definition can include an optional `schema` describing each prop. When present, `vbml.parse` validates `props` against it and throws if they don't conform. The descriptions also help AI agents fill in templates.

```typescript
import { vbml, IVBML, VBMLSchemaError } from "@vestaboard/vbml";

const definition: IVBML = {
  props: { away_team: "Lakers", away_score: 101, accent: "{68}" },
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
      type: "Color", // character codes 63-71, e.g. "{68}" (see the exported `Color` map)
      description: "Decorative accent color",
      required: false, // evidence omitted, so it defaults to "Freeform"
    },
  },
  components: [{ template: "{{away_team}} {{away_score}} {{accent}}" }],
};

try {
  vbml.parse(definition);
} catch (e) {
  if (e instanceof VBMLSchemaError) console.log(e.issues); // [{ prop, code, message }]
}
```

- `type`: `Text` (default), `Numeric`, `Color` or `Enum` (`Enum` requires `options: [{ value, description }]`).
- `rows` / `columns`: maximum lines / cells per line. Each `{nn}` token and color emoji counts as one cell.
- `required`: defaults to `true`; a missing prop throws `VBMLSchemaError` listing every problem.
- `evidence` (optional; `"TemporalFact"`, `"GeneralFact"` or `"Freeform"`, defaulting to `"Freeform"`) and `evidenceRule` are guidance for agents and are not enforced. See [docs/schema.md](docs/schema.md) for the full reference.
- Props not declared in the schema are passed through unvalidated.
- A malformed schema throws `VBMLSchemaDefinitionError`.

The same `schema` field is supported in the Python (`pyvbml`) and PHP packages. See [docs/schema.md](docs/schema.md) for examples in each language.

## Docs

Full documentation is available at [https://docs.vestaboard.com/docs/vbml](https://docs.vestaboard.com/docs/vbml)
