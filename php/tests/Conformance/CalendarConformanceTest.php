<?php

namespace Vestaboard\Vbml\Tests\Conformance;

use PHPUnit\Framework\Attributes\DataProvider;
use Vestaboard\Vbml\Calendar;

class CalendarConformanceTest extends ConformanceTestCase
{
    public static function cases(): array
    {
        return self::loadCases('calendar');
    }

    #[DataProvider('cases')]
    public function testCalendar(array $case): void
    {
        $this->assertCase($case, function (array $input) {
            return Calendar::makeCalendar(
                (string)$input['month'],
                (string)$input['year'],
                $input['days'] ?? [],
                $input['defaultDayColor'] ?? null,
                $input['hideSMTWTFS'] ?? false,
                $input['hideDates'] ?? false,
                $input['hideMonthYear'] ?? false
            );
        });
    }
}
