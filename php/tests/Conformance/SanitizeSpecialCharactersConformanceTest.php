<?php

namespace Vestaboard\Vbml\Tests\Conformance;

use PHPUnit\Framework\Attributes\DataProvider;
use Vestaboard\Vbml\SanitizeSpecialCharacters;

class SanitizeSpecialCharactersConformanceTest extends ConformanceTestCase
{
    public static function cases(): array
    {
        return self::loadCases('sanitizeSpecialCharacters');
    }

    #[DataProvider('cases')]
    public function testSanitizeSpecialCharacters(array $case): void
    {
        $this->assertCase($case, function (array $input) {
            return SanitizeSpecialCharacters::sanitize($input['text']);
        });
    }
}
