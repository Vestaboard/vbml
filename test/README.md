# Shared Conformance Fixtures

The `test/` directory is data-only. It defines the shared behavioral contract
for the TypeScript, Python, and PHP implementations.

Shared expectations in `test/expected` are the source of truth for every
language. Language-specific exceptions in `test/language-exceptions` document
temporary or intentional drift from that shared contract.

## Layout

- `test/input/<suite>/<case>.json`
- `test/expected/<suite>/<case>.json`
- `test/language-exceptions/<language>/<suite>/<case>.json`

The executable runners live outside of `test/`:

- TypeScript: `src/__tests__/conformance`
- Python: `python/tests/conformance`
- PHP: `php/tests/Conformance`

## Shared Case Rules

- Keep matching relative paths between `test/input` and `test/expected`.
- Use the filename as the case name.
- Store the input payload directly in `test/input`.
- Store exactly one of these shapes in `test/expected`:
  - `{ "result": ... }`
  - `{ "error": { "message": "..." } }`

## Language Exception Rules

Use `test/language-exceptions` only when a language intentionally or currently
behaves differently from the shared expectation.

- Every language exception must include a non-empty `reason`.
- Every language exception must define exactly one of `result`, `error`, or
  `skip`.
- `skip` must be written as `{ "skip": true }`.
- Treat language exceptions as temporary documentation of drift, not as an
  alternate test suite.

## When To Add Shared Cases

Prefer shared conformance coverage for supported behavior. Keep language-native
tests only when the contract is not cleanly expressible as input and expected
output, such as deep-copy identity.

## Maintainer Workflow

1. Add or update `test/input/<suite>/<case>.json`.
2. Add the matching `test/expected/<suite>/<case>.json` for the shared
   contract.
3. If any language differs, add a matching file under
   `test/language-exceptions/<language>/<suite>/<case>.json` with a `reason`.
4. Remove the language exception when that language matches the shared contract.
5. Run the fixture validator and the affected language suites.

## Commands

- Validate shared fixtures: `yarn test:fixtures`
- Run TypeScript tests: `yarn test --runInBand`
- Run Python conformance tests:
  `PYTHONPATH=python pytest python/tests/conformance -q`
- Run PHP tests: `cd php && ./vendor/bin/phpunit`
