<?php

namespace Vestaboard\Vbml\Tests\Conformance;

use PHPUnit\Framework\Attributes\DataProvider;
use Vestaboard\Vbml\Classic;

class ClassicConformanceTest extends ConformanceTestCase
{
    public static function cases(): array
    {
        return self::loadCases('classic');
    }

    #[DataProvider('cases')]
    public function testClassic(array $case): void
    {
        $this->assertCase($case, function (array $input) {
            return Classic::classic($input['text'], $input['options'] ?? []);
        });
    }
}
