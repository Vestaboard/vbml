<?php

namespace Vestaboard\Vbml;

/**
 * Port of validateProps.ts
 */
class ValidateProps
{
    /**
     * Throws VBMLSchemaError listing every prop that does not satisfy the schema.
     *
     * @param array<string, array> $schema
     */
    public static function validate(array $schema, ?array $props): void
    {
        $issues = [];

        foreach ($schema as $prop => $field) {
            $value = $props[$prop] ?? null;

            if ($value === null) {
                if (($field['required'] ?? true) !== false) {
                    $issues[] = [
                        'prop' => (string) $prop,
                        'code' => 'missing',
                        'message' => 'is required but was not provided',
                    ];
                }
                continue;
            }

            foreach (self::checkField($value, $field) as [$code, $message]) {
                $issues[] = ['prop' => (string) $prop, 'code' => $code, 'message' => $message];
            }
        }

        if (count($issues) > 0) {
            throw new VBMLSchemaError($issues);
        }
    }

    /** @return array<int, array{0: string, 1: string}> */
    private static function checkField(mixed $value, array $field): array
    {
        switch ($field['type'] ?? 'Text') {
            case 'Numeric':
                return self::isNumeric($value)
                    ? self::checkSize(self::numericText($value), $field)
                    : [['invalid_type', 'must be a number or numeric string']];

            case 'Color':
                $code = self::colorCode($value);
                return $code !== null
                    && $code >= CharacterCode::Red
                    && $code <= CharacterCode::Filled
                    && floor($code) == $code
                    ? []
                    : [['invalid_color', 'must be a color code from 63 to 71']];

            case 'Enum':
                $options = array_map(fn($o) => $o['value'], $field['options'] ?? []);
                return in_array($value, $options, true)
                    ? []
                    : [['invalid_enum', 'must be one of: ' . implode(', ', $options)]];

            default:
                return is_string($value)
                    ? self::checkSize($value, $field)
                    : [['invalid_type', 'must be a string']];
        }
    }

    /** Each {nn} token and each color emoji counts as one cell. */
    private static function checkSize(string $text, array $field): array
    {
        $normalized = preg_replace('/\{\d{1,2}\}/', "\0", EmojisToCharacterCodes::convert($text));
        $lines = explode("\n", $normalized);
        $problems = [];

        $rows = $field['rows'] ?? null;
        if ($rows !== null && count($lines) > $rows) {
            $problems[] = ['too_many_rows', sprintf('has %d rows but at most %d are allowed', count($lines), $rows)];
        }

        $columns = $field['columns'] ?? null;
        if ($columns !== null) {
            $widest = max(array_map(fn($line) => mb_strlen($line, 'UTF-8'), $lines));
            if ($widest > $columns) {
                $problems[] = [
                    'too_many_columns',
                    sprintf('has %d columns but at most %d are allowed', $widest, $columns),
                ];
            }
        }

        return $problems;
    }

    private static function isNumeric(mixed $value): bool
    {
        if (is_int($value)) {
            return true;
        }
        if (is_float($value)) {
            return is_finite($value);
        }
        if (is_string($value)) {
            $trimmed = trim($value);
            return preg_match('/^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/', $trimmed) === 1
                && is_finite((float) $trimmed);
        }
        return false;
    }

    private static function numericText(mixed $value): string
    {
        if (is_float($value) && floor($value) === $value && abs($value) < 1e15) {
            return (string) (int) $value;
        }
        return (string) $value;
    }

    private static function colorCode(mixed $value): int|float|null
    {
        if (is_int($value) || is_float($value)) {
            return $value;
        }
        if (is_string($value) && preg_match('/^(?:\{(\d{1,2})\}|(\d{1,2}))$/', $value, $m)) {
            return (int) ($m[1] !== '' ? $m[1] : $m[2]);
        }
        return null;
    }
}
