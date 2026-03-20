<?php

namespace Vestaboard\Vbml\Tests\Conformance;

use PHPUnit\Framework\Attributes\DataProvider;
use Vestaboard\Vbml\CharacterCodesToAscii;

class CharacterCodesToAsciiConformanceTest extends ConformanceTestCase
{
    public static function cases(): array
    {
        return self::loadCases('characterCodesToAscii');
    }

    #[DataProvider('cases')]
    public function testCharacterCodesToAscii(array $case): void
    {
        $this->assertCase($case, function (array $input) {
            return CharacterCodesToAscii::convert(
                $input['characterCodes'],
                $input['isWhite'] ?? false
            );
        });
    }
}
