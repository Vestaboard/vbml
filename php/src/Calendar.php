<?php

namespace Vestaboard\Vbml;

/**
 * Port of calendar.ts and parseCalendarComponent.ts
 */
class Calendar
{
    private static function getCharacterCodeForDigit(string $digit): int
    {
        return $digit === '0' ? 36 : (int)$digit + 26;
    }

    private static function getCharCodeForDay(string $day): int
    {
        return match ($day) {
            'Sun' => 19,
            'Mon' => 13,
            'Tue' => 20,
            'Wed' => 23,
            'Thu' => 20,
            'Fri' => 6,
            'Sat' => 19,
            default => 0,
        };
    }

    public static function makeCalendar(
        string $calendarMonth,
        string $calendarYear,
        array  $vbmlDays,
        ?int   $defaultDayColor = null,
        bool   $hideSMTWTFS = false,
        bool   $hideDates = false,
        bool   $hideMonthYear = false
    ): array {
        $month = (int)$calendarMonth - 1; // 0-based
        $year = (int)$calendarYear;

        $numberOfDaysInMonth = (int)date('t', mktime(0, 0, 0, $month + 1, 1, $year));
        $firstDayOfWeek = date('D', mktime(0, 0, 0, $month + 1, 1, $year)); // 'Sun','Mon',...

        $daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        $offset = array_search($firstDayOfWeek, $daysOfWeek);
        if ($offset === false) {
            $offset = 0;
        }

        $calendarDayColor = $defaultDayColor ?? 65;

        $firstRowDays = ['1', (string)(7 - $offset)];
        $secondRowDays = [(string)(7 - $offset + 1), (string)(7 - $offset + 7)];
        $thirdRowDays = [(string)(7 - $offset + 8), (string)(7 - $offset + 14)];
        $fourthRowDays = [(string)(7 - $offset + 15), (string)(7 - $offset + 21)];
        $fifthStart = 7 - $offset + 22;
        $fifthEnd = min(7 - $offset + $numberOfDaysInMonth, $numberOfDaysInMonth);
        $fifthRowDays = [(string)$fifthStart, (string)$fifthEnd];

        $numberOfDaysInLastRow = $fifthEnd - $fifthStart + 1;

        // Build first row
        if ($firstRowDays[0] === $firstRowDays[1]) {
            $firstRow = array_merge(
                [0, 0, 0, $hideDates ? 0 : self::getCharacterCodeForDigit($firstRowDays[0]), 0],
                array_fill(0, $offset, 0),
                array_fill(0, 7 - $offset, $calendarDayColor),
                array_fill(0, 22 - 12, 0)
            );
        } else {
            $firstRow = array_merge(
                [
                    0,
                    $hideDates ? 0 : self::getCharacterCodeForDigit($firstRowDays[0]),
                    $hideDates ? 0 : 44,
                    $hideDates ? 0 : self::getCharacterCodeForDigit($firstRowDays[1]),
                    0,
                ],
                array_fill(0, $offset, 0),
                array_fill(0, 7 - $offset, $calendarDayColor),
                array_fill(0, 22 - 12, 0)
            );
        }

        // Build second row
        $s0 = $secondRowDays[0];
        $s1 = $secondRowDays[1];
        $secondRow = array_merge(
            mb_strlen($s0) > 1
                ? [$hideDates ? 0 : self::getCharacterCodeForDigit(mb_substr($s0, 0, 1)),
                   $hideDates ? 0 : self::getCharacterCodeForDigit(mb_substr($s0, 1, 1))]
                : [0, $hideDates ? 0 : self::getCharacterCodeForDigit($s0)],
            [$hideDates ? 0 : 44],
            mb_strlen($s1) > 1
                ? [$hideDates ? 0 : self::getCharacterCodeForDigit(mb_substr($s1, 0, 1)),
                   $hideDates ? 0 : self::getCharacterCodeForDigit(mb_substr($s1, 1, 1))]
                : [$hideDates ? 0 : self::getCharacterCodeForDigit($s1), 0],
            array_fill(0, 7, $calendarDayColor),
            array_fill(0, 22 - 12, 0)
        );

        // Build third row
        $t0 = $thirdRowDays[0];
        $t1 = $thirdRowDays[1];
        $thirdRow = array_merge(
            mb_strlen($t0) > 1
                ? [$hideDates ? 0 : self::getCharacterCodeForDigit(mb_substr($t0, 0, 1)),
                   $hideDates ? 0 : self::getCharacterCodeForDigit(mb_substr($t0, 1, 1))]
                : [0, $hideDates ? 0 : self::getCharacterCodeForDigit($t0)],
            [$hideDates ? 0 : 44],
            [$hideDates ? 0 : self::getCharacterCodeForDigit(mb_substr($t1, 0, 1)),
             $hideDates ? 0 : self::getCharacterCodeForDigit(mb_substr($t1, 1, 1))],
            array_fill(0, 7, $calendarDayColor),
            array_fill(0, 22 - 12, 0)
        );

        // Build fourth row
        $f0 = $fourthRowDays[0];
        $f1 = $fourthRowDays[1];
        $fourthRow = array_merge(
            [$hideDates ? 0 : self::getCharacterCodeForDigit(mb_substr($f0, 0, 1)),
             $hideDates ? 0 : self::getCharacterCodeForDigit(mb_substr($f0, 1, 1))],
            [$hideDates ? 0 : 44],
            [$hideDates ? 0 : self::getCharacterCodeForDigit(mb_substr($f1, 0, 1)),
             $hideDates ? 0 : self::getCharacterCodeForDigit(mb_substr($f1, 1, 1))],
            array_fill(0, 7, $calendarDayColor),
            array_fill(0, 22 - 12, 0)
        );

        // Build fifth row
        if (count($fifthRowDays) === 0 || $fifthStart > $numberOfDaysInMonth) {
            $fifthRow = array_fill(0, 22, 0);
        } else {
            $fif0 = $fifthRowDays[0];
            $fif1 = $fifthRowDays[1];
            $fifthRow = array_merge(
                [$hideDates ? 0 : self::getCharacterCodeForDigit(mb_substr((string)$fif0, 0, 1)),
                 $hideDates ? 0 : self::getCharacterCodeForDigit(mb_substr((string)$fif0, 1, 1))],
                [$hideDates | $fif0 === $fif1 ? 0 : 44],
                [$hideDates | $fif0 === $fif1 ? 0 : self::getCharacterCodeForDigit(mb_substr((string)$fif1, 0, 1)),
                 $hideDates | $fif0 === $fif1 ? 0 : self::getCharacterCodeForDigit(mb_substr((string)$fif1, 1, 1))],
                array_fill(0, $numberOfDaysInLastRow, $calendarDayColor),
                array_fill(0, 22 - (5 + $numberOfDaysInLastRow), 0)
            );
        }

        // Build month/year header
        $monthYearStr = (string)($month + 1);
        if ($hideMonthYear) {
            $monthYear = [0, 0, 0, 0, 0];
        } else {
            $monthYear = [];
            foreach (str_split($monthYearStr) as $num) {
                $monthYear[] = self::getCharacterCodeForDigit($num);
            }
            $monthYear[] = 59; // slash
            $yearStr = (string)$year;
            // Last two digits of year
            $yearLast2 = mb_substr($yearStr, 2, 2);
            foreach (str_split($yearLast2) as $num) {
                $monthYear[] = self::getCharacterCodeForDigit($num);
            }
        }
        $headerSpace = 5 - count($monthYear);

        $headerRow = array_merge(
            $monthYear,
            array_fill(0, $headerSpace, 0),
            $hideSMTWTFS
                ? [0, 0, 0, 0, 0, 0, 0]
                : array_map([self::class, 'getCharCodeForDay'], $daysOfWeek),
            array_fill(0, 22 - (7 + 5), 0)
        );

        $calendar = [
            $headerRow,
            $firstRow,
            $secondRow,
            $thirdRow,
            $fourthRow,
            $fifthRow,
        ];

        // Fill in the days
        foreach ($vbmlDays as $vbmlDayKey => $color) {
            $day = (int)$vbmlDayKey;
            $todaysRow = (int)floor(($day + $offset - 1) / 7) + 1;
            $modulus = ($day + $offset - 1) % 7;
            $todaysColumn = $todaysRow > 5 ? ($modulus === 0 ? 12 : 13) : $modulus + 5;
            $rowIdx = $todaysRow > 5 ? 5 : $todaysRow;
            $calendar[$rowIdx][$todaysColumn] = $color;
        }

        return $calendar;
    }

    public static function parseCalendarComponent(array $characters, int $x): array
    {
        return [
            'characters' => $characters,
            'x' => $x,
        ];
    }
}
