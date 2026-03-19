# Shared Test Fixtures

The `test/input` and `test/expected` trees define the shared behavioral
contract for the Node, Python, and PHP implementations.

- Keep matching relative paths between `test/input/<suite>/...` and
  `test/expected/<suite>/...`.
- Use the filename as the test name.
- Store the input payload directly in `test/input`.
- Store either `{ "result": ... }` or `{ "error": { "message": "..." } }`
  in `test/expected`.
- Put platform differences under
  `test/expected/overrides/<platform>/<suite>/...`.
- Every override must include `kind` and `reason`, and then exactly one of
  `result`, `error`, or `skip`.
- Prefer shared behavior coverage. Keep local-only tests only when output files
  cannot express the contract cleanly, such as deep-copy identity.
