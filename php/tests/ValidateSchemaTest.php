<?php

namespace Vestaboard\Vbml\Tests;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use Vestaboard\Vbml\ValidateSchema;
use Vestaboard\Vbml\VBMLSchemaDefinitionError;

/**
 * Port of validateSchema.spec.ts
 */
class ValidateSchemaTest extends TestCase
{
    private static function ok(array $overrides = []): array
    {
        return array_merge(['description' => 'd', 'evidence' => 'Freeform'], $overrides);
    }

    private function messageOf(mixed $schema): ?string
    {
        try {
            ValidateSchema::validate($schema);
        } catch (VBMLSchemaDefinitionError $e) {
            return $e->getMessage();
        }
        return null;
    }

    private function assertRejected(mixed $schema, string $pattern): void
    {
        $message = $this->messageOf($schema);
        $this->assertNotNull($message, 'expected VBMLSchemaDefinitionError');
        $this->assertMatchesRegularExpression($pattern, $message);
    }

    public function testAcceptsAValidSchemaOfEveryType(): void
    {
        $this->assertNull($this->messageOf([
            'a' => self::ok(),
            'b' => self::ok(['type' => 'Text', 'rows' => 2, 'columns' => 10]),
            'c' => self::ok(['type' => 'Numeric', 'evidence' => 'TemporalFact']),
            'd' => self::ok(['type' => 'Color', 'evidence' => 'GeneralFact']),
            'e' => self::ok([
                'type' => 'Enum',
                'options' => [['value' => 'x', 'description' => 'X']],
                'evidenceRule' => 'Use the same game as away_score.',
                'required' => false,
            ]),
        ]));
    }

    public function testRequiresADescription(): void
    {
        $this->assertRejected(['a' => ['evidence' => 'Freeform']], '/a.*description/');
        $this->assertRejected(['a' => self::ok(['description' => ''])], '/a.*description/');
    }

    public function testTreatsEvidenceAsOptional(): void
    {
        $this->assertNull($this->messageOf(['a' => ['description' => 'd']]));
        $this->assertNull($this->messageOf(['a' => ['description' => 'd', 'evidence' => null]]));
    }

    public function testRejectsAnInvalidEvidenceWhenProvided(): void
    {
        $this->assertRejected(['a' => self::ok(['evidence' => 'Guess'])], '/a.*evidence/');
    }

    public function testRejectsANonStringEvidenceRule(): void
    {
        $this->assertRejected(['a' => self::ok(['evidenceRule' => 5])], '/a.*evidenceRule/');
    }

    public function testRejectsAnUnknownType(): void
    {
        $this->assertRejected(['a' => self::ok(['type' => 'Date'])], '/a.*type/');
    }

    public static function badSizes(): array
    {
        return [[0], [-1], [1.5], ['3'], [true]];
    }

    #[DataProvider('badSizes')]
    public function testRejectsBadRowsAndColumns(mixed $value): void
    {
        $this->assertRejected(['a' => self::ok(['rows' => $value])], '/a.*rows/');
        $this->assertRejected(['a' => self::ok(['columns' => $value])], '/a.*columns/');
    }

    public function testRejectsANonBooleanRequired(): void
    {
        $this->assertRejected(['a' => self::ok(['required' => 'yes'])], '/a.*required/');
    }

    public function testEnumRequiresOptions(): void
    {
        $this->assertRejected(['a' => self::ok(['type' => 'Enum'])], '/a.*options/');
    }

    public function testEnumOptionsMustNotBeEmpty(): void
    {
        $this->assertRejected(['a' => self::ok(['type' => 'Enum', 'options' => []])], '/a.*options/');
    }

    public function testEnumOptionsNeedAValueAndDescription(): void
    {
        $this->assertRejected(
            ['a' => self::ok(['type' => 'Enum', 'options' => [['value' => 'x']]])],
            '/a.*options/'
        );
        $this->assertRejected(
            ['a' => self::ok(['type' => 'Enum', 'options' => [['description' => 'x']]])],
            '/a.*options/'
        );
    }

    public function testEnumOptionsMustBeUnique(): void
    {
        $this->assertRejected(['a' => self::ok([
            'type' => 'Enum',
            'options' => [
                ['value' => 'x', 'description' => '1'],
                ['value' => 'x', 'description' => '2'],
            ],
        ])], '/a.*duplicate/i');
    }

    public function testOptionsAreNotAllowedOnNonEnumTypes(): void
    {
        $this->assertRejected(
            ['a' => self::ok(['options' => [['value' => 'x', 'description' => 'X']]])],
            '/a.*options/'
        );
    }

    public function testRejectsANonArraySchemaOrField(): void
    {
        $this->assertNotNull($this->messageOf('x'));
        $this->assertNotNull($this->messageOf([['description' => 'd']]));
        $this->assertRejected(['a' => 'x'], '/a/');
    }
}
