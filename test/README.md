# Shared Conformance Fixtures

The `test/` directory is data-only. It defines the shared behavioral contract
for the Node, Python, and PHP implementations.

Node is the source of truth. Shared expectations in `test/expected` should
match Node behavior unless the Node suite itself is being corrected.

## Layout

- `test/input/<suite>/<case>.json`
- `test/expected/<suite>/<case>.json`
- `test/platform-exceptions/<platform>/<suite>/<case>.json`

The executable runners live outside of `test/`:

- Node: `src/__tests__/conformance`
- Python: `python/tests/conformance`
- PHP: `php/tests/Conformance`

## Shared Case Rules

- Keep matching relative paths between `test/input` and `test/expected`.
- Use the filename as the case name.
- Store the input payload directly in `test/input`.
- Store exactly one of these shapes in `test/expected`:
  - `{ "result": ... }`
  - `{ "error": { "message": "..." } }`

## Platform Exception Rules

Use `test/platform-exceptions` only when a non-Node platform intentionally or
currently behaves differently from the shared expectation.

- Never add platform exceptions for Node.
- Every platform exception must include a non-empty `reason`.
- Every platform exception must define exactly one of `result`, `error`, or
  `skip`.
- `skip` must be written as `{ "skip": true }`.
- Treat platform exceptions as temporary documentation of drift, not as an
  alternate test suite.

## When To Add Shared Cases

Prefer shared conformance coverage for supported behavior. Keep platform-native
tests only when the contract is not cleanly expressible as input and expected
output, such as deep-copy identity.

## Maintainer Workflow

1. Add or update `test/input/<suite>/<case>.json`.
2. Add the matching `test/expected/<suite>/<case>.json` using Node behavior as
   the default.
3. If Python or PHP differs, add a matching file under
   `test/platform-exceptions/<platform>/<suite>/<case>.json` with a `reason`.
4. Remove the platform exception when that platform matches the shared contract.
5. Run the fixture validator and the affected platform suites.

## Commands

- Validate shared fixtures: `yarn test:fixtures`
- Run Node tests: `yarn test --runInBand`
- Run Python conformance tests:
  `PYTHONPATH=python pytest python/tests/conformance -q`
- Run PHP tests: `cd php && ./vendor/bin/phpunit`
