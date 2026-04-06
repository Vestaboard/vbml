<?php

namespace Vestaboard\Vbml\Tests;

use PHPUnit\Framework\TestCase;
use Vestaboard\Vbml\ParseComponent;

class ParseComponentTest extends TestCase
{
    public function testNoteBoardStyle3x15StartsFromBeginningProd1159(): void
    {
        // Bug: string rendered as "FINAL FOUR PLAYERS TO WATCH: SAR" because center-align
        // overflow produced a negative paddingTop, skipping the first rows.
        // Expected: board starts with "Women's..." not mid-string "Final Four..."
        $component = [
            'template' => "Women's 2026 Final Four players to watch: Sarah Strong, Joyce Edwards, more - The New York Times",
            'style'    => ['align' => 'center'],
        ];
        $parse  = ParseComponent::parseComponent(3, 15);
        $result = $parse($component);

        // Row 0 must start with W (23) for "Women's", not F (6) for "Final"
        $this->assertEquals(23, $result[0][0]); // W
    }

    public function testCenterAlignOverflowStartsFromBeginning(): void
    {
        // With width=4, "ab cd ef gh" wraps to 4 rows: [ab, cd, ef, gh]
        // With height=2, content overflows.
        // Bug: paddingTop = floor((2-4)/2) = -1 → starts from codes[1] (cd)
        // Fix: paddingTop = max(-1, 0) = 0 → starts from codes[0] (ab)
        $component = [
            'template' => 'ab cd ef gh',
            'style'    => ['align' => 'center'],
        ];
        $parse  = ParseComponent::parseComponent(2, 4);
        $result = $parse($component);

        $this->assertEquals(1, $result[0][0]); // A (not C)
        $this->assertEquals(2, $result[0][1]); // B (not D)
    }

    public function testJustifiedAlignOverflowStartsFromBeginning(): void
    {
        // Same overflow scenario with justified alignment.
        $component = [
            'template' => 'ab cd ef gh',
            'style'    => ['align' => 'justified'],
        ];
        $parse  = ParseComponent::parseComponent(2, 4);
        $result = $parse($component);

        $this->assertEquals(1, $result[0][0]); // A (not C)
        $this->assertEquals(2, $result[0][1]); // B (not D)
    }
}
