<?php

namespace Vestaboard\Vbml\Tests;

use PHPUnit\Framework\TestCase;
use Vestaboard\Vbml\Calendar;

class CalendarTest extends TestCase
{
    public function testShouldCreateCalendarWithOnly4Weeks(): void
    {
        $result = Calendar::makeCalendar(
            '2',
            '2026',
            []
        );
        $this->assertEquals([
            [28, 59, 28, 32, 0, 19, 13, 20, 23, 20, 6, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 27, 44, 33, 0, 65, 65, 65, 65, 65, 65, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 34, 44, 27, 30, 65, 65, 65, 65, 65, 65, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [27, 31, 44, 28, 27, 65, 65, 65, 65, 65, 65, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [28, 28, 44, 28, 34, 65, 65, 65, 65, 65, 65, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ], $result);
    }
}
