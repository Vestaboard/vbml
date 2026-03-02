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

## Docs

Full documentation is available at [https://docs.vestaboard.com/docs/vbml](https://docs.vestaboard.com/docs/vbml)
