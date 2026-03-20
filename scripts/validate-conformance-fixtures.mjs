/**
 * Validates the shared conformance fixture tree under `test/`.
 *
 * The script treats `test/input/<suite>/<case>.json` and
 * `test/expected/<suite>/<case>.json` as the canonical shared cases and
 * verifies that every case has both halves. It also validates the shape of
 * expected fixtures and platform-specific exceptions in
 * `test/platform-exceptions/<platform>/<suite>/<case>.json`.
 *
 * In practice this catches:
 * - missing input/expected pairs
 * - invalid JSON
 * - malformed expected error payloads
 * - malformed platform exceptions
 * - platform exceptions that do not map to a shared case
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const repoRoot = path.resolve(__dirname, "..");
const inputRoot = path.join(repoRoot, "test", "input");
const expectedRoot = path.join(repoRoot, "test", "expected");
const platformExceptionRoot = path.join(repoRoot, "test", "platform-exceptions");

const errors = [];

const isPlainObject = (value) =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const walkJsonFiles = (rootDir) => {
  if (!fs.existsSync(rootDir)) {
    return [];
  }

  return fs
    .readdirSync(rootDir, {
      withFileTypes: true,
    })
    .flatMap((entry) => {
      const fullPath = path.join(rootDir, entry.name);

      if (entry.isDirectory()) {
        return walkJsonFiles(fullPath);
      }

      return entry.name.endsWith(".json") ? [fullPath] : [];
    })
    .sort();
};

const toCaseId = (rootDir, filePath) =>
  path.relative(rootDir, filePath).replace(/\.json$/, "").split(path.sep).join("/");

const readJsonFile = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    errors.push(`${path.relative(repoRoot, filePath)} is not valid JSON: ${error.message}`);
    return null;
  }
};

const validateErrorExpectation = (fileLabel, value) => {
  if (!isPlainObject(value)) {
    errors.push(`${fileLabel} must define "error" as an object.`);
    return;
  }

  if (typeof value.message !== "string" || !value.message.trim()) {
    errors.push(`${fileLabel} must define "error.message" as a non-empty string.`);
  }
};

const validateExpectedFixture = (filePath, payload) => {
  const fileLabel = path.relative(repoRoot, filePath);

  if (!isPlainObject(payload)) {
    errors.push(`${fileLabel} must contain a JSON object.`);
    return;
  }

  const hasResult = Object.hasOwn(payload, "result");
  const hasError = Object.hasOwn(payload, "error");

  if (hasResult === hasError) {
    errors.push(`${fileLabel} must define exactly one of "result" or "error".`);
    return;
  }

  if (hasError) {
    validateErrorExpectation(fileLabel, payload.error);
  }
};

const validatePlatformException = (filePath, payload, knownCases) => {
  const relativePath = path.relative(platformExceptionRoot, filePath);
  const fileLabel = path.relative(repoRoot, filePath);
  const segments = relativePath.split(path.sep);

  if (segments.length < 3) {
    errors.push(`${fileLabel} must be stored as <platform>/<suite>/<case>.json.`);
    return;
  }

  const [platform, ...caseSegments] = segments;
  const caseId = caseSegments.join("/").replace(/\.json$/, "");

  if (!knownCases.has(caseId)) {
    errors.push(`${fileLabel} does not match a shared case in test/input and test/expected.`);
  }

  if (!isPlainObject(payload)) {
    errors.push(`${fileLabel} must contain a JSON object.`);
    return;
  }

  if (typeof payload.reason !== "string" || !payload.reason.trim()) {
    errors.push(`${fileLabel} must define "reason" as a non-empty string.`);
  }

  const hasResult = Object.hasOwn(payload, "result");
  const hasError = Object.hasOwn(payload, "error");
  const hasSkip = Object.hasOwn(payload, "skip");
  const expectationCount = [hasResult, hasError, hasSkip].filter(Boolean).length;

  if (expectationCount !== 1) {
    errors.push(`${fileLabel} must define exactly one of "result", "error", or "skip".`);
    return;
  }

  if (hasError) {
    validateErrorExpectation(fileLabel, payload.error);
  }

  if (hasSkip && payload.skip !== true) {
    errors.push(`${fileLabel} must define "skip": true when skipping a case.`);
  }
};

const inputFiles = walkJsonFiles(inputRoot);
const expectedFiles = walkJsonFiles(expectedRoot);
const platformExceptionFiles = walkJsonFiles(platformExceptionRoot);

const inputCases = new Set(inputFiles.map((filePath) => toCaseId(inputRoot, filePath)));
const expectedCases = new Set(
  expectedFiles.map((filePath) => toCaseId(expectedRoot, filePath))
);

for (const caseId of inputCases) {
  if (!expectedCases.has(caseId)) {
    errors.push(`Missing expected fixture for test/input/${caseId}.json.`);
  }
}

for (const caseId of expectedCases) {
  if (!inputCases.has(caseId)) {
    errors.push(`Missing input fixture for test/expected/${caseId}.json.`);
  }
}

for (const expectedFile of expectedFiles) {
  const payload = readJsonFile(expectedFile);
  if (payload !== null) {
    validateExpectedFixture(expectedFile, payload);
  }
}

const knownCases = new Set(
  [...inputCases].filter((caseId) => expectedCases.has(caseId))
);

for (const exceptionFile of platformExceptionFiles) {
  const payload = readJsonFile(exceptionFile);
  if (payload !== null) {
    validatePlatformException(exceptionFile, payload, knownCases);
  }
}

if (errors.length > 0) {
  console.error("Conformance fixture validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  `Validated ${knownCases.size} shared cases and ${platformExceptionFiles.length} platform exceptions.`
);
