<?php

namespace Vestaboard\Vbml\Tests;

use PHPUnit\Framework\TestCase;
use Vestaboard\Vbml\Vbml;

class VbmlTest extends TestCase
{
    public function testShouldParseSingleComponent(): void
    {
        $result = Vbml::parse([
            'style' => ['height' => 1, 'width' => 2],
            'components' => [['template' => 'hi']],
        ]);
        $this->assertEquals([[8, 9]], $result);
    }

    public function testShouldLayoutComponentsSideBySide(): void
    {
        $result = Vbml::parse([
            'style' => ['height' => 1, 'width' => 4],
            'components' => [
                ['template' => 'hi', 'style' => ['width' => 2, 'height' => 1]],
                ['template' => 'hi', 'style' => ['width' => 2, 'height' => 1]],
            ],
        ]);
        $this->assertEquals([[8, 9, 8, 9]], $result);
    }

    public function testShouldFormatAeAe(): void
    {
        $result = Vbml::parse([
            'style' => ['height' => 1, 'width' => 4],
            'components' => [
                ['template' => 'äÄ', 'style' => ['width' => 4, 'height' => 1]],
            ],
        ]);
        $this->assertEquals([[1, 5, 1, 5]], $result);
    }

    public function testShouldLayoutComponentsVertically(): void
    {
        $result = Vbml::parse([
            'style' => ['height' => 2, 'width' => 2],
            'components' => [
                ['template' => 'hi', 'style' => ['width' => 2, 'height' => 1]],
                ['template' => 'hi', 'style' => ['width' => 2, 'height' => 1]],
            ],
        ]);
        $this->assertEquals([[8, 9], [8, 9]], $result);
    }

    public function testShouldFlowThirdComponentToNextLine(): void
    {
        $result = Vbml::parse([
            'style' => ['height' => 2, 'width' => 4],
            'components' => [
                ['template' => '{1}{2}', 'style' => ['width' => 2, 'height' => 1]],
                ['template' => '{3}{4}', 'style' => ['width' => 2, 'height' => 1]],
                ['template' => '{5}{6}', 'style' => ['width' => 2, 'height' => 1]],
            ],
        ]);
        $this->assertEquals([[1, 2, 3, 4], [5, 6, 0, 0]], $result);
    }

    public function testShouldJustifyContentVertically(): void
    {
        $result = Vbml::parse([
            'style' => ['height' => 5, 'width' => 1],
            'components' => [
                ['template' => 'abcd', 'style' => ['height' => 5, 'width' => 1, 'align' => 'justified']],
            ],
        ]);
        $this->assertEquals([[0], [1], [2], [3], [4]], $result);
    }

    public function testShouldJustifyWithThreeCharsAndRows(): void
    {
        $result = Vbml::parse([
            'style' => ['height' => 5, 'width' => 1],
            'components' => [
                ['template' => 'abc', 'style' => ['height' => 5, 'width' => 1, 'align' => 'justified']],
            ],
        ]);
        $this->assertEquals([[0], [1], [2], [3], [0]], $result);
    }

    public function testShouldLayoutAbsoluteByRelative(): void
    {
        $result = Vbml::parse([
            'style' => ['height' => 6, 'width' => 22],
            'components' => [
                ['template' => 'abc', 'style' => ['height' => 6, 'width' => 22, 'align' => 'top', 'justify' => 'left']],
                ['template' => 'def', 'style' => ['height' => 1, 'width' => 3, 'align' => 'top', 'justify' => 'left', 'absolutePosition' => ['x' => 3, 'y' => 0]]],
            ],
        ]);
        $expected = [1, 2, 3, 4, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $this->assertEquals($expected, $result[0]);
    }

    public function testShouldLayoutAbsoluteOverRelative(): void
    {
        $result = Vbml::parse([
            'style' => ['height' => 6, 'width' => 22],
            'components' => [
                ['template' => 'abc', 'style' => ['height' => 6, 'width' => 22, 'align' => 'top', 'justify' => 'left']],
                ['template' => 'def', 'style' => ['height' => 1, 'width' => 3, 'align' => 'top', 'justify' => 'left', 'absolutePosition' => ['x' => 0, 'y' => 0]]],
            ],
        ]);
        $expected = [4, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $this->assertEquals($expected, $result[0]);
    }

    public function testShouldLayoutAbsoluteOverRelative2(): void
    {
        $result = Vbml::parse([
            'style' => ['height' => 6, 'width' => 22],
            'components' => [
                ['template' => 'abc', 'style' => ['height' => 6, 'width' => 22, 'align' => 'top', 'justify' => 'left']],
                ['template' => 'def', 'style' => ['height' => 1, 'width' => 3, 'align' => 'top', 'justify' => 'left', 'absolutePosition' => ['x' => 0, 'y' => 0]]],
            ],
        ]);
        $expected = [4, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $this->assertEquals($expected, $result[0]);
    }

    public function testShouldLayoutRawComponents(): void
    {
        $result = Vbml::parse([
            'style' => ['height' => 6, 'width' => 22],
            'components' => [
                ['rawCharacters' => [[1, 2, 3]]],
            ],
        ]);
        $expected = [1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $this->assertEquals($expected, $result[0]);
    }

    public function testShouldLayoutAbsoluteWithRawComponentsForClock(): void
    {
        $result = Vbml::parse([
            'props' => ['time' => '12:00 PM'],
            'style' => ['height' => 6, 'width' => 22],
            'components' => [
                ['rawCharacters' => [
                    [68, 68, 68, 68, 68, 69, 69, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68],
                    [68, 68, 68, 68, 69, 69, 69, 69, 68, 68, 68, 68, 68, 68, 68, 68, 65, 65, 65, 65, 68, 68],
                    [63, 63, 63, 69, 66, 69, 66, 69, 69, 63, 63, 63, 63, 63, 63, 65, 65, 65, 65, 65, 65, 63],
                    [63, 63, 66, 66, 66, 69, 66, 66, 66, 66, 63, 63, 63, 63, 63, 65, 65, 65, 65, 65, 65, 63],
                    [64, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 64, 64, 64, 64, 64, 65, 65, 65, 65, 64, 64],
                    [66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64],
                ]],
                ['template' => '{{time}}', 'style' => ['height' => 1, 'width' => 8, 'absolutePosition' => ['x' => 11, 'y' => 3]]],
            ],
        ]);
        $this->assertEquals([
            [68, 68, 68, 68, 68, 69, 69, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68],
            [68, 68, 68, 68, 69, 69, 69, 69, 68, 68, 68, 68, 68, 68, 68, 68, 65, 65, 65, 65, 68, 68],
            [63, 63, 63, 69, 66, 69, 66, 69, 69, 63, 63, 63, 63, 63, 63, 65, 65, 65, 65, 65, 65, 63],
            [63, 63, 66, 66, 66, 69, 66, 66, 66, 66, 63, 27, 28, 50, 36, 36, 0, 16, 13, 65, 65, 63],
            [64, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 64, 64, 64, 64, 64, 65, 65, 65, 65, 64, 64],
            [66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64],
        ], $result);
    }

    public function testShouldLayoutCalendarForChristmas(): void
    {
        $result = Vbml::parse([
            'style' => ['height' => 6, 'width' => 22],
            'components' => [
                [
                    'calendar' => [
                        'defaultDayColor' => 66,
                        'month' => '12',
                        'year' => '2024',
                        'days' => ['25' => 63],
                    ],
                    'style' => ['absolutePosition' => ['x' => 0, 'y' => 0]],
                ],
            ],
        ]);
        $this->assertEquals([
            [27, 28, 59, 28, 30, 19, 13, 20, 23, 20, 6, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 27, 44, 33, 0, 66, 66, 66, 66, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 34, 44, 27, 30, 66, 66, 66, 66, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [27, 31, 44, 28, 27, 66, 66, 66, 66, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [28, 28, 44, 28, 34, 66, 66, 66, 63, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [28, 35, 44, 29, 27, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ], $result);

        foreach ($result as $row) {
            $this->assertCount(22, $row);
        }
    }

    public function testShouldLayoutMinimalistCalendar(): void
    {
        $result = Vbml::parse([
            'style' => ['height' => 6, 'width' => 22],
            'components' => [
                [
                    'style' => ['absolutePosition' => ['x' => 0, 'y' => 0]],
                    'calendar' => [
                        'defaultDayColor' => 66,
                        'hideDates' => true,
                        'hideMonthYear' => true,
                        'hideSMTWTFS' => true,
                        'month' => '12',
                        'year' => '2024',
                        'days' => ['25' => 63],
                    ],
                ],
            ],
        ]);
        $this->assertEquals([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 66, 66, 66, 66, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 66, 66, 66, 66, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 66, 66, 66, 66, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 66, 66, 66, 63, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ], $result);

        foreach ($result as $row) {
            $this->assertCount(22, $row);
        }
    }

    public function testShouldLayoutCalendarWithOtherComponents(): void
    {
        $result = Vbml::parse([
            'style' => ['height' => 6, 'width' => 22],
            'components' => [
                [
                    'template' => 'December 2024 Calendar',
                    'style' => ['height' => 6, 'width' => 10, 'absolutePosition' => ['x' => 13, 'y' => 0]],
                ],
                [
                    'calendar' => [
                        'month' => '12',
                        'year' => '2024',
                        'days' => ['1' => 63, '2' => 64, '3' => 65, '4' => 66, '5' => 67, '6' => 68, '7' => 63],
                    ],
                    'style' => ['absolutePosition' => ['x' => 0, 'y' => 0]],
                ],
            ],
        ]);
        $this->assertEquals([
            [27, 28, 59, 28, 30, 19, 13, 20, 23, 20, 6, 19, 0, 4, 5, 3, 5, 13, 2, 5, 18, 0],
            [0, 27, 44, 33, 0, 63, 64, 65, 66, 67, 68, 63, 0, 28, 36, 28, 30, 0, 0, 0, 0, 0],
            [0, 34, 44, 27, 30, 65, 65, 65, 65, 65, 65, 65, 0, 3, 1, 12, 5, 14, 4, 1, 18, 0],
            [27, 31, 44, 28, 27, 65, 65, 65, 65, 65, 65, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [28, 28, 44, 28, 34, 65, 65, 65, 65, 65, 65, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [28, 35, 44, 29, 27, 65, 65, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ], $result);

        foreach ($result as $row) {
            $this->assertCount(22, $row);
        }
    }

    public function testShouldLayoutCalendarOnTheRight(): void
    {
        $result = Vbml::parse([
            'style' => ['height' => 6, 'width' => 22],
            'components' => [
                [
                    'template' => 'Merry Christmas',
                    'style' => ['height' => 6, 'width' => 10, 'absolutePosition' => ['x' => 0, 'y' => 0]],
                ],
                [
                    'calendar' => [
                        'defaultDayColor' => 66,
                        'month' => '12',
                        'year' => '2028',
                        'days' => ['25' => 63],
                    ],
                    'style' => ['absolutePosition' => ['x' => 10, 'y' => 0]],
                ],
            ],
        ]);
        $this->assertEquals([
            [13, 5, 18, 18, 25, 0, 0, 0, 0, 0, 27, 28, 59, 28, 34, 19, 13, 20, 23, 20, 6, 19],
            [3, 8, 18, 9, 19, 20, 13, 1, 19, 0, 0, 27, 44, 28, 0, 0, 0, 0, 0, 0, 66, 66],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 29, 44, 35, 0, 66, 66, 66, 66, 66, 66, 66],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 36, 44, 27, 32, 66, 66, 66, 66, 66, 66, 66],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 33, 44, 28, 29, 66, 66, 66, 66, 66, 66, 66],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 30, 44, 29, 27, 66, 63, 66, 66, 66, 66, 66],
        ], $result);

        foreach ($result as $row) {
            $this->assertCount(22, $row);
        }
    }

    public function testShouldRespectDoubleReturns(): void
    {
        $result = Vbml::parse([
            'style' => ['height' => 3, 'width' => 2],
            'components' => [
                ['template' => "h\n\ni", 'style' => ['align' => 'top', 'justify' => 'left']],
            ],
        ]);
        $this->assertEquals([[8, 0], [0, 0], [9, 0]], $result);
    }

    public function testShouldRespectTripleReturns(): void
    {
        $result = Vbml::parse([
            'style' => ['height' => 4, 'width' => 2],
            'components' => [
                ['template' => "h\n\n\ni", 'style' => ['align' => 'top', 'justify' => 'left']],
            ],
        ]);
        $this->assertEquals([[8, 0], [0, 0], [0, 0], [9, 0]], $result);
    }

    public function testShouldProduceUniformRowLengthsWhenComponentWiderThanBoard(): void
    {
        $result = Vbml::parse([
            'style' => ['height' => 22, 'width' => 6],
            'components' => [
                ['template' => 'abc', 'style' => ['height' => 6, 'width' => 22, 'align' => 'top', 'justify' => 'left']],
                ['template' => 'def', 'style' => ['height' => 1, 'width' => 3, 'align' => 'top', 'justify' => 'left', 'absolutePosition' => ['x' => 3, 'y' => 0]]],
            ],
        ]);

        // All rows should have the same width as the board (6)
        $this->assertCount(22, $result);
        foreach ($result as $row) {
            $this->assertCount(6, $row);
        }

        // First row should be truncated to board width
        $this->assertEquals([1, 2, 3, 4, 5, 6], $result[0]);
    }

    public function testShouldLetUsUseRandomColors(): void
    {
        $result = Vbml::parse([
            'style' => ['height' => 1, 'width' => 1],
            'components' => [
                ['randomColors' => ['colors' => [61]]],
            ],
        ]);
        $this->assertSame(61, $result[0][0]);
    }
}
