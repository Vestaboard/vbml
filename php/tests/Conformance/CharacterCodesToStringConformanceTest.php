<?php

namespace Vestaboard\Vbml\Tests\Conformance;

use PHPUnit\Framework\Attributes\DataProvider;
use Vestaboard\Vbml\CharacterCodesToString;

class CharacterCodesToStringConformanceTest extends ConformanceTestCase
{
    public static function cases(): array
    {
        return self::loadCases('characterCodesToString');
    }

    #[DataProvider('cases')]
    public function testCharacterCodesToString(array $case): void
    {
        $this->assertCase($case, function (array $input) {
            return CharacterCodesToString::convert(
                $input['characters'],
                $input['options'] ?? []
            );
        });
    }
}
