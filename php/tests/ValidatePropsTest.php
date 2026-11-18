<?php

namespace Vestaboard\Vbml\Tests;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use Vestaboard\Vbml\ValidateProps;
use Vestaboard\Vbml\VBMLSchemaError;

/**
 * Port of validateProps.spec.ts
 */
class ValidatePropsTest extends TestCase
{
    private static function field(array $overrides = []): array
    {
        return array_merge(['description' => 'd', 'evidence' => 'Freeform'], $overrides);
    }

    /** @return array<int, array{prop: string, code: string, message: string}> */
    private function issuesOf(array $schema, ?array $props): array
    {
        try {
            ValidateProps::validate($schema, $props);
        } catch (VBMLSchemaError $e) {
            return $e->issues;
        }
        return [];
    }

    private function codes(array $schema, ?array $props): array
    {
        return array_map(fn($i) => $i['code'], $this->issuesOf($schema, $props));
    }

    // --- required ---

    public function testThrowsWhenADeclaredPropIsMissing(): void
    {
        $issues = $this->issuesOf(['a' => self::field()], []);
        $this->assertCount(1, $issues);
        $this->assertSame('a', $issues[0]['prop']);
        $this->assertSame('missing', $issues[0]['code']);
    }

    public function testTreatsNullAsMissing(): void
    {
        $this->assertSame(['missing'], $this->codes(['a' => self::field()], ['a' => null]));
    }

    public function testTreatsEverythingAsMissingWhenPropsIsNull(): void
    {
        $this->assertSame(['missing'], $this->codes(['a' => self::field()], null));
    }

    public function testAllowsMissingWhenRequiredIsFalse(): void
    {
        $this->assertSame([], $this->codes(['a' => self::field(['required' => false])], []));
    }

    public function testStillValidatesAnOptionalPropWhenProvided(): void
    {
        $schema = ['a' => self::field(['required' => false, 'type' => 'Numeric'])];
        $this->assertSame(['invalid_type'], $this->codes($schema, ['a' => 'abc']));
    }

    public function testIgnoresPropsNotDeclaredInTheSchema(): void
    {
        $this->assertSame([], $this->codes(['a' => self::field()], ['a' => 'x', 'extra' => [[1]]]));
    }

    public function testDoesNotTreatFalsyValuesAsMissing(): void
    {
        $this->assertSame([], $this->codes(['a' => self::field(['type' => 'Numeric'])], ['a' => 0]));
        $this->assertSame([], $this->codes(['a' => self::field()], ['a' => '']));
    }

    // --- Text ---

    public function testTextIsTheDefaultTypeAndAcceptsStrings(): void
    {
        $this->assertSame([], $this->codes(['a' => self::field()], ['a' => 'hello']));
    }

    public static function nonStrings(): array
    {
        return [[5], [[[1]]], [true], [1.5]];
    }

    #[DataProvider('nonStrings')]
    public function testTextRejectsNonStrings(mixed $value): void
    {
        $this->assertSame(['invalid_type'], $this->codes(['a' => self::field()], ['a' => $value]));
    }

    public function testAllowsAValueThatExactlyFillsColumns(): void
    {
        $this->assertSame([], $this->codes(['a' => self::field(['columns' => 6])], ['a' => 'Lakers']));
    }

    public function testRejectsAValueThatExceedsColumns(): void
    {
        $this->assertSame(
            ['too_many_columns'],
            $this->codes(['a' => self::field(['columns' => 5])], ['a' => 'Lakers'])
        );
    }

    public function testMeasuresColumnsPerLine(): void
    {
        $this->assertSame([], $this->codes(['a' => self::field(['columns' => 3])], ['a' => "abc\ndef"]));
    }

    public function testRejectsTooManyRows(): void
    {
        $this->assertSame(
            ['too_many_rows'],
            $this->codes(['a' => self::field(['rows' => 2])], ['a' => "a\nb\nc"])
        );
    }

    public function testAllowsExactlyMaxRows(): void
    {
        $this->assertSame([], $this->codes(['a' => self::field(['rows' => 2])], ['a' => "a\nb"]));
    }

    public function testCountsCharacterCodeTokensAsOneCell(): void
    {
        $this->assertSame([], $this->codes(['a' => self::field(['columns' => 4])], ['a' => 'Go {63}']));
    }

    public function testCountsColorEmojiAsOneCell(): void
    {
        $this->assertSame([], $this->codes(['a' => self::field(['columns' => 4])], ['a' => 'Go 🟥']));
    }

    public function testReportsBothRowsAndColumns(): void
    {
        $this->assertSame(
            ['too_many_rows', 'too_many_columns'],
            $this->codes(['a' => self::field(['rows' => 1, 'columns' => 1])], ['a' => "ab\ncd"])
        );
    }

    // --- Numeric ---

    public static function validNumbers(): array
    {
        return [[42], [3.5], [-1], [0], ['42'], ['-3.5'], ['0'], [' 7 '], [101.0]];
    }

    #[DataProvider('validNumbers')]
    public function testNumericAccepts(mixed $value): void
    {
        $this->assertSame([], $this->codes(['a' => self::field(['type' => 'Numeric'])], ['a' => $value]));
    }

    public static function invalidNumbers(): array
    {
        return [[NAN], [INF], [''], ['  '], ['abc'], ['4x'], ['1_000'], ['nan'], ['inf'], [true], [[]]];
    }

    #[DataProvider('invalidNumbers')]
    public function testNumericRejects(mixed $value): void
    {
        $this->assertSame(
            ['invalid_type'],
            $this->codes(['a' => self::field(['type' => 'Numeric'])], ['a' => $value])
        );
    }

    public function testNumericAppliesColumnsToTheStringForm(): void
    {
        $schema = ['a' => self::field(['type' => 'Numeric', 'columns' => 3])];
        $this->assertSame([], $this->codes($schema, ['a' => 999]));
        $this->assertSame(['too_many_columns'], $this->codes($schema, ['a' => 1000]));
        $this->assertSame([], $this->codes($schema, ['a' => 101.0]));
    }

    // --- Color ---

    public static function validColors(): array
    {
        return [[63], [70], [71], ['63'], ['{63}'], ['{71}'], [63.0]];
    }

    #[DataProvider('validColors')]
    public function testColorAccepts(mixed $value): void
    {
        $this->assertSame([], $this->codes(['a' => self::field(['type' => 'Color'])], ['a' => $value]));
    }

    public static function invalidColors(): array
    {
        return [[62], [72], [0], ['red'], ['{62}'], ['{72}'], ['{}'], [''], [63.5], [true]];
    }

    #[DataProvider('invalidColors')]
    public function testColorRejects(mixed $value): void
    {
        $this->assertSame(
            ['invalid_color'],
            $this->codes(['a' => self::field(['type' => 'Color'])], ['a' => $value])
        );
    }

    // --- Enum ---

    private static function enumSchema(): array
    {
        return ['a' => self::field([
            'type' => 'Enum',
            'options' => [
                ['value' => 'home', 'description' => 'Home team'],
                ['value' => 'away', 'description' => 'Away team'],
            ],
        ])];
    }

    public function testEnumAcceptsAListedValue(): void
    {
        $this->assertSame([], $this->codes(self::enumSchema(), ['a' => 'home']));
    }

    public function testEnumRejectsUnlistedValuesCaseSensitively(): void
    {
        $this->assertSame(['invalid_enum'], $this->codes(self::enumSchema(), ['a' => 'Home']));
        $this->assertSame(['invalid_enum'], $this->codes(self::enumSchema(), ['a' => 'neutral']));
    }

    public function testEnumDoesNotLooselyMatchNonStrings(): void
    {
        $schema = ['a' => self::field([
            'type' => 'Enum',
            'options' => [['value' => '0', 'description' => 'zero']],
        ])];
        $this->assertSame(['invalid_enum'], $this->codes($schema, ['a' => 0]));
        $this->assertSame(['invalid_enum'], $this->codes($schema, ['a' => false]));
    }

    public function testEnumListsValidOptionsInTheMessage(): void
    {
        $message = $this->issuesOf(self::enumSchema(), ['a' => 'x'])[0]['message'];
        $this->assertStringContainsString('home', $message);
        $this->assertStringContainsString('away', $message);
    }

    // --- multiple problems ---

    public function testCollectsEveryIssueIntoOneError(): void
    {
        $schema = [
            'a' => self::field(),
            'b' => self::field(['type' => 'Numeric']),
            'c' => self::field(['type' => 'Color']),
        ];
        $issues = $this->issuesOf($schema, ['b' => 'x', 'c' => 5]);
        $this->assertSame(
            [['a', 'missing'], ['b', 'invalid_type'], ['c', 'invalid_color']],
            array_map(fn($i) => [$i['prop'], $i['code']], $issues)
        );
    }

    public function testPutsEveryIssueInTheMessage(): void
    {
        try {
            ValidateProps::validate(['a' => self::field(), 'b' => self::field()], []);
            $this->fail('should throw');
        } catch (VBMLSchemaError $e) {
            $this->assertStringContainsString('a', $e->getMessage());
            $this->assertStringContainsString('b', $e->getMessage());
        }
    }
}
