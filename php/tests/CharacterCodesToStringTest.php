<?php

namespace Vestaboard\Vbml\Tests;

use PHPUnit\Framework\TestCase;
use Vestaboard\Vbml\CharacterCodesToString;

class CharacterCodesToStringTest extends TestCase
{
    public function testShouldConvertWordToString(): void
    {
        $result = CharacterCodesToString::convert([[1, 2]]);
        $this->assertEquals('AB', $result);
    }

    public function testShouldConvertTwoLineSentence(): void
    {
        $result = CharacterCodesToString::convert([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [20, 8, 9, 19, 0, 9, 19, 0, 1, 0, 12, 15, 14, 7, 5, 18, 0, 2, 12, 15, 3, 11],
            [20, 8, 1, 20, 0, 19, 16, 1, 14, 19, 0, 28, 0, 12, 9, 14, 5, 19, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]);
        $this->assertEquals('THIS IS A LONGER BLOCK THAT SPANS 2 LINES', $result);
    }

    public function testShouldHandleBreaks(): void
    {
        $result = CharacterCodesToString::convert([
            [0, 0, 8, 1, 14, 4, 12, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 18, 5, 1, 11, 19, 0, 7, 18, 1, 3, 5, 6, 21, 12, 12, 25, 0, 0, 0],
        ]);
        $this->assertEquals('HANDLE BREAKS GRACEFULLY', $result);
    }

    public function testShouldHandleLineBreaks(): void
    {
        $result = CharacterCodesToString::convert(
            [[1, 2, 0, 0, 0], [3, 4, 0, 0, 0]],
            ['allowLineBreaks' => true]
        );
        $this->assertEquals("AB\nCD", $result);
    }

    public function testShouldAssumeNoLineBreakIfFirstWordFits(): void
    {
        $result = CharacterCodesToString::convert(
            [[1, 0], [2, 0]],
            ['allowLineBreaks' => true]
        );
        $this->assertEquals('A B', $result);
    }
}
