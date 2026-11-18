<?php

namespace Vestaboard\Vbml;

/**
 * Port of validateSchema.ts
 */
class ValidateSchema
{
    private const EVIDENCE = ['TemporalFact', 'GeneralFact', 'Freeform'];
    private const TYPES = ['Text', 'Numeric', 'Color', 'Enum'];

    /**
     * Throws VBMLSchemaDefinitionError if the schema itself is malformed.
     */
    public static function validate(mixed $schema): void
    {
        if (!self::isObject($schema) && $schema !== []) {
            throw new VBMLSchemaDefinitionError('Invalid schema: must be an object');
        }
        foreach ($schema as $prop => $field) {
            self::validateField((string) $prop, $field);
        }
    }

    /** An associative array (the PHP equivalent of a JSON object). */
    private static function isObject(mixed $value): bool
    {
        return is_array($value) && !array_is_list($value);
    }

    private static function isPositiveInteger(mixed $value): bool
    {
        if (is_float($value) && floor($value) === $value) {
            $value = (int) $value;
        }
        return is_int($value) && $value > 0;
    }

    private static function fail(string $prop, string $message): never
    {
        throw new VBMLSchemaDefinitionError("Invalid schema for \"{$prop}\": {$message}");
    }

    private static function validateField(string $prop, mixed $field): void
    {
        if (!self::isObject($field)) {
            self::fail($prop, 'field definition must be an object');
        }

        $description = $field['description'] ?? null;
        if (!is_string($description) || $description === '') {
            self::fail($prop, 'description is required');
        }

        $evidence = $field['evidence'] ?? null;
        if ($evidence !== null && !in_array($evidence, self::EVIDENCE, true)) {
            self::fail($prop, 'evidence must be one of ' . implode(', ', self::EVIDENCE));
        }

        $rule = $field['evidenceRule'] ?? null;
        if ($rule !== null && !is_string($rule)) {
            self::fail($prop, 'evidenceRule must be a string');
        }

        $type = $field['type'] ?? 'Text';
        if (!in_array($type, self::TYPES, true)) {
            self::fail($prop, 'type must be one of ' . implode(', ', self::TYPES));
        }

        foreach (['rows', 'columns'] as $key) {
            if (($field[$key] ?? null) !== null && !self::isPositiveInteger($field[$key])) {
                self::fail($prop, "{$key} must be a positive integer");
            }
        }

        $required = $field['required'] ?? null;
        if ($required !== null && !is_bool($required)) {
            self::fail($prop, 'required must be a boolean');
        }

        $options = $field['options'] ?? null;
        if ($type !== 'Enum') {
            if ($options !== null) {
                self::fail($prop, 'options are only allowed when type is Enum');
            }
            return;
        }

        if (!is_array($options) || count($options) === 0) {
            self::fail($prop, 'options must be a non-empty array when type is Enum');
        }

        $seen = [];
        foreach ($options as $option) {
            if (
                !self::isObject($option)
                || !is_string($option['value'] ?? null)
                || !is_string($option['description'] ?? null)
            ) {
                self::fail($prop, 'each of options needs a string value and description');
            }
            if (isset($seen[$option['value']])) {
                self::fail($prop, "duplicate option value \"{$option['value']}\"");
            }
            $seen[$option['value']] = true;
        }
    }
}
