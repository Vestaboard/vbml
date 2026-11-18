<?php

namespace Vestaboard\Vbml\Tests;

use PHPUnit\Framework\TestCase;
use ReflectionClass;
use Vestaboard\Vbml\Color;
use Vestaboard\Vbml\Vbml;
use Vestaboard\Vbml\VBMLSchemaDefinitionError;
use Vestaboard\Vbml\VBMLSchemaError;

/**
 * Port of schema.spec.ts (Vbml::parse with a schema)
 */
class SchemaTest extends TestCase
{
    private function definition(array $props, ?array $schema = null): array
    {
        return [
            'props' => $props,
            'schema' => $schema ?? [
                'team' => ['description' => 'Team name', 'columns' => 8, 'evidence' => 'GeneralFact'],
            ],
            'components' => [['template' => '{{team}}']],
        ];
    }

    public function testParsesNormallyWhenPropsSatisfyTheSchema(): void
    {
        $withSchema = $this->definition(['team' => 'Lakers']);
        $withoutSchema = $withSchema;
        unset($withoutSchema['schema']);
        $this->assertEquals(Vbml::parse($withoutSchema), Vbml::parse($withSchema));
    }

    public function testIsUnchangedWhenNoSchemaIsGiven(): void
    {
        $result = Vbml::parse(['props' => [], 'components' => [['template' => '{{team}}']]]);
        $this->assertIsArray($result);
    }

    public function testThrowsSchemaErrorWhenPropsDoNotMeetTheSchema(): void
    {
        $this->expectException(VBMLSchemaError::class);
        Vbml::parse($this->definition(['team' => 'Timberwolves']));
    }

    public function testThrowsSchemaErrorWhenAPropIsMissing(): void
    {
        $this->expectException(VBMLSchemaError::class);
        Vbml::parse($this->definition([]));
    }

    public function testThrowsDefinitionErrorBeforeCheckingProps(): void
    {
        $this->expectException(VBMLSchemaDefinitionError::class);
        Vbml::parse($this->definition([], [
            'team' => ['type' => 'Enum', 'description' => 'd', 'evidence' => 'Freeform'],
        ]));
    }

    public function testExportsASemanticColorMap(): void
    {
        $this->assertSame([
            'Red' => 63,
            'Orange' => 64,
            'Yellow' => 65,
            'Green' => 66,
            'Blue' => 67,
            'Violet' => 68,
            'White' => 69,
            'Black' => 70,
            'Filled' => 71,
        ], (new ReflectionClass(Color::class))->getConstants());
    }

    public function testWorksWithAJsonDecodedDefinition(): void
    {
        $decoded = json_decode(json_encode([
            'props' => ['c' => '{63}'],
            'schema' => ['c' => ['type' => 'Color', 'description' => 'Accent', 'evidence' => 'Freeform']],
            'components' => [['template' => '{{c}}']],
        ]), true);
        $this->assertContains(63, Vbml::parse($decoded)[0]);
    }
}
