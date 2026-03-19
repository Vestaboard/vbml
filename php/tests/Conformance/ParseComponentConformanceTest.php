<?php

namespace Vestaboard\Vbml\Tests\Conformance;

use PHPUnit\Framework\Attributes\DataProvider;
use Vestaboard\Vbml\ParseComponent;

class ParseComponentConformanceTest extends ConformanceTestCase
{
    public static function cases(): array
    {
        return self::loadCases('parseComponent');
    }

    #[DataProvider('cases')]
    public function testParseComponent(array $case): void
    {
        $this->assertCase($case, function (array $input) {
            $props = $input['props'] ?? [];
            $runner = ($input['mode'] ?? 'component') === 'absolute'
                ? ParseComponent::parseAbsoluteComponent(
                    $input['height'],
                    $input['width'],
                    $props
                )
                : ParseComponent::parseComponent(
                    $input['height'],
                    $input['width'],
                    $props
                );

            return $runner($input['component']);
        });
    }
}
