<?php

namespace Vestaboard\Vbml\Tests\Conformance;

use PHPUnit\Framework\TestCase;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;

abstract class ConformanceTestCase extends TestCase
{
    protected static function loadCases(string $suite, string $language = 'php'): array
    {
        $inputRoot = self::repoRoot() . "/test/input/{$suite}";
        $expectedRoot = self::repoRoot() . "/test/expected/{$suite}";

        $cases = [];
        foreach (self::walkJsonFiles($inputRoot) as $inputPath) {
            $relativePath = substr($inputPath, strlen($inputRoot) + 1);
            $expectedPath = "{$expectedRoot}/{$relativePath}";

            if (!is_file($expectedPath)) {
                throw new \RuntimeException(
                    "Missing expected file for {$suite}/{$relativePath}."
                );
            }

            $caseId = str_replace('\\', '/', substr($relativePath, 0, -5));
            $expected = self::resolveExpected(
                $suite,
                $caseId,
                self::readJsonFile($expectedPath),
                $language
            );

            $cases[$caseId] = [[
                'id' => $caseId,
                'input' => self::readJsonFile($inputPath),
                'expected' => $expected,
            ]];
        }

        return $cases;
    }

    protected function assertCase(array $case, callable $run): void
    {
        $expected = $case['expected'];

        if (isset($expected['skip'])) {
            $this->markTestSkipped($expected['skip']);
        }

        if (isset($expected['error'])) {
            try {
                $run($case['input']);
                $this->fail(
                    sprintf('Expected %s to throw an exception.', $case['id'])
                );
            } catch (\Throwable $error) {
                $this->assertSame(
                    $expected['error']['message'],
                    $error->getMessage()
                );
            }

            return;
        }

        $this->assertSame($expected['result'], $run($case['input']));
    }

    private static function repoRoot(): string
    {
        return dirname(__DIR__, 3);
    }

    private static function readJsonFile(string $filePath): array
    {
        return json_decode(
            file_get_contents($filePath),
            true,
            512,
            JSON_THROW_ON_ERROR
        );
    }

    private static function walkJsonFiles(string $rootDir): array
    {
        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($rootDir, RecursiveDirectoryIterator::SKIP_DOTS)
        );

        $paths = [];
        foreach ($iterator as $file) {
            if ($file->isFile() && str_ends_with($file->getFilename(), '.json')) {
                $paths[] = $file->getPathname();
            }
        }

        sort($paths);

        return $paths;
    }

    private static function resolveExpected(
        string $suite,
        string $caseId,
        array $payload,
        string $language
    ): array {
        $exceptionPath = self::repoRoot()
            . "/test/language-exceptions/{$language}/{$suite}/{$caseId}.json";

        if (is_file($exceptionPath)) {
            $exception = self::readJsonFile($exceptionPath);
            $reason = trim((string)($exception['reason'] ?? ''));
            if ($reason === '') {
                throw new \RuntimeException(
                    "Language exception \"{$suite}/{$caseId}\" is missing a reason."
                );
            }

            if (array_key_exists('skip', $exception)) {
                if (
                    array_key_exists('result', $exception)
                    || array_key_exists('error', $exception)
                ) {
                    throw new \RuntimeException(
                        "Language exception \"{$suite}/{$caseId}\" cannot define skip with result or error."
                    );
                }

                return [
                    'skip' => $reason,
                ];
            }

            $hasResult = array_key_exists('result', $exception);
            $hasError = array_key_exists('error', $exception);
            if ($hasResult === $hasError) {
                throw new \RuntimeException(
                    "Language exception \"{$suite}/{$caseId}\" must define exactly one of result or error."
                );
            }

            return $exception;
        }

        $hasResult = array_key_exists('result', $payload);
        $hasError = array_key_exists('error', $payload);
        if ($hasResult === $hasError) {
            throw new \RuntimeException(
                "Conformance case \"{$suite}/{$caseId}\" must define exactly one of result or error."
            );
        }

        return $payload;
    }
}
