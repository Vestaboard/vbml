<?php

namespace Vestaboard\Vbml\Tests\Conformance;

use PHPUnit\Framework\Attributes\DataProvider;
use Vestaboard\Vbml\HasSpecialCharacters;

class HasSpecialCharactersConformanceTest extends ConformanceTestCase
{
    public static function cases(): array
    {
        return self::loadCases('hasSpecialCharacters');
    }

    #[DataProvider('cases')]
    public function testHasSpecialCharacters(array $case): void
    {
        $this->assertCase($case, function (array $input) {
            return HasSpecialCharacters::check($input['text']);
        });
    }
}
