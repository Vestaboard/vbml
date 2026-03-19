import fs from "fs";
import path from "path";

interface ConformanceErrorExpectation {
  message: string;
}

interface PlatformException<TExpected> {
  reason: string;
  result?: TExpected;
  error?: ConformanceErrorExpectation;
  skip?: boolean;
}

interface ConformanceExpected<TExpected> {
  result?: TExpected;
  error?: ConformanceErrorExpectation;
}

interface ConformanceCase<TInput, TExpected> {
  id: string;
  input: TInput;
  expected: ConformanceExpected<TExpected>;
}

interface ResolvedExpectation<TExpected> {
  result?: TExpected;
  error?: ConformanceErrorExpectation;
  skip?: string;
}

interface RunConformanceSuiteOptions<TInput, TExpected> {
  suiteName: string;
  suiteDir: string;
  run: (input: TInput) => TExpected;
  platform?: string;
}

const readJsonFile = <T>(filePath: string): T =>
  JSON.parse(fs.readFileSync(filePath, "utf8")) as T;

const walkJsonFiles = (rootDir: string): string[] => {
  const entries = fs.readdirSync(rootDir, {
    withFileTypes: true,
  });

  return entries
    .flatMap((entry) => {
      const fullPath = path.join(rootDir, entry.name);

      if (entry.isDirectory()) {
        return walkJsonFiles(fullPath);
      }

      return entry.name.endsWith(".json") ? [fullPath] : [];
    })
    .sort();
};

const loadCases = <TInput, TExpected>(suiteDir: string): Array<ConformanceCase<TInput, TExpected>> => {
  const inputRoot = path.resolve(__dirname, "../../../test/input", suiteDir);
  const expectedRoot = path.resolve(__dirname, "../../../test/expected", suiteDir);

  return walkJsonFiles(inputRoot).map((inputPath) => {
    const relativePath = path.relative(inputRoot, inputPath);
    const expectedPath = path.join(expectedRoot, relativePath);

    if (!fs.existsSync(expectedPath)) {
      throw new Error(
        `Missing expected file for ${suiteDir}/${relativePath}.`
      );
    }

    return {
      id: relativePath.replace(/\.json$/, ""),
      input: readJsonFile<TInput>(inputPath),
      expected: readJsonFile<ConformanceExpected<TExpected>>(expectedPath),
    };
  });
};

const loadPlatformException = <TExpected>(
  platform: string,
  suiteDir: string,
  testId: string
): PlatformException<TExpected> | null => {
  const exceptionPath = path.resolve(
    __dirname,
    "../../../test/platform-exceptions",
    platform,
    suiteDir,
    `${testId}.json`
  );

  if (!fs.existsSync(exceptionPath)) {
    return null;
  }

  return readJsonFile<PlatformException<TExpected>>(exceptionPath);
};

const resolveExpectation = <TExpected>(
  platform: string,
  suiteDir: string,
  testCase: ConformanceCase<unknown, TExpected>
): ResolvedExpectation<TExpected> => {
  const exception = loadPlatformException<TExpected>(
    platform,
    suiteDir,
    testCase.id
  );

  if (exception) {
    if (!exception.reason.trim()) {
      throw new Error(
        `Platform exception "${suiteDir}/${testCase.id}" is missing a reason for ${platform}.`
      );
    }

    if (exception.skip) {
      if (exception.result !== undefined || exception.error !== undefined) {
        throw new Error(
          `Platform exception "${suiteDir}/${testCase.id}" cannot define skip with result or error.`
        );
      }

      return {
        skip: exception.reason,
      };
    }

    if ((exception.result === undefined) === (exception.error === undefined)) {
      throw new Error(
        `Platform exception "${suiteDir}/${testCase.id}" must define exactly one of result or error.`
      );
    }

    return {
      result: exception.result,
      error: exception.error,
    };
  }

  if ((testCase.expected.result === undefined) === (testCase.expected.error === undefined)) {
    throw new Error(
      `Conformance case "${suiteDir}/${testCase.id}" must define exactly one of result or error.`
    );
  }

  return {
    result: testCase.expected.result,
    error: testCase.expected.error,
  };
};

export const runConformanceSuite = <TInput, TExpected>({
  suiteName,
  suiteDir,
  run,
  platform = "node",
}: RunConformanceSuiteOptions<TInput, TExpected>): void => {
  const cases = loadCases<TInput, TExpected>(suiteDir);

  describe(suiteName, () => {
    cases.forEach((testCase) => {
      const resolved = resolveExpectation(platform, suiteDir, testCase);
      const testMethod = resolved.skip ? it.skip : it;
      const label = testCase.id;

      testMethod(label, () => {
        if (resolved.error) {
          expect(() => run(testCase.input)).toThrow(resolved.error.message);
          return;
        }

        expect(run(testCase.input)).toEqual(resolved.result);
      });
    });
  });
};
