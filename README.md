# VBML - Vestaboard Markup Language

## Installation

```bash
yarn install @vestaboard/vbml
```

or

```bash
npm i @vestaboard/vbml
```

## Usage

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

## Docs

Full documentation is available at [https://docs.vestaboard.com/docs/vbml](https://docs.vestaboard.com/docs/vbml)
