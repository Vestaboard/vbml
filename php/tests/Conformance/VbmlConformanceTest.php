<?php

namespace Vestaboard\Vbml\Tests\Conformance;

use PHPUnit\Framework\Attributes\DataProvider;
use Vestaboard\Vbml\Vbml;

class VbmlConformanceTest extends ConformanceTestCase
{
    public static function cases(): array
    {
        return self::loadCases('vbml');
    }

    #[DataProvider('cases')]
    public function testVbml(array $case): void
    {
        $this->assertCase($case, function (array $input) {
            return Vbml::parse($input);
        });
    }
}
