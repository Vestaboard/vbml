<?php

namespace Vestaboard\Vbml;

/**
 * Port of characterCodesToString.ts
 */
class CharacterCodesToString
{
    private static array $characterCodesMap = [
        '0'   => ' ',
        '1'   => 'A',
        '2'   => 'B',
        '3'   => 'C',
        '4'   => 'D',
        '5'   => 'E',
        '6'   => 'F',
        '7'   => 'G',
        '8'   => 'H',
        '9'   => 'I',
        '10'  => 'J',
        '11'  => 'K',
        '12'  => 'L',
        '13'  => 'M',
        '14'  => 'N',
        '15'  => 'O',
        '16'  => 'P',
        '17'  => 'Q',
        '18'  => 'R',
        '19'  => 'S',
        '20'  => 'T',
        '21'  => 'U',
        '22'  => 'V',
        '23'  => 'W',
        '24'  => 'X',
        '25'  => 'Y',
        '26'  => 'Z',
        '27'  => '1',
        '28'  => '2',
        '29'  => '3',
        '30'  => '4',
        '31'  => '5',
        '32'  => '6',
        '33'  => '7',
        '34'  => '8',
        '35'  => '9',
        '36'  => '0',
        '37'  => '!',
        '38'  => '@',
        '39'  => '#',
        '40'  => '$',
        '41'  => '(',
        '42'  => ')',
        '43'  => ' ',
        '44'  => '-',
        '45'  => '',
        '46'  => '+',
        '47'  => '&',
        '48'  => '=',
        '49'  => ';',
        '50'  => ':',
        '51'  => '',
        '52'  => "'",
        '53'  => '"',
        '54'  => '%',
        '55'  => ',',
        '56'  => '.',
        '57'  => '',
        '58'  => '',
        '59'  => '/',
        '60'  => '?',
        '61'  => '',
        '62'  => '°',
        '63'  => '',
        '64'  => '',
        '65'  => '',
        '66'  => '',
        '67'  => '',
        '68'  => '',
        '69'  => '',
        '70'  => '',
        '71'  => ' ',
        '100' => "\n",
    ];

    private static function getBreakableCharacters(): array
    {
        $breakable = [];
        foreach (self::$characterCodesMap as $key => $val) {
            if ($val === '' || $val === ' ') {
                $breakable[] = (int)$key;
            }
        }
        return $breakable;
    }

    private static function countEmptyCharactersBeforeFirstWord(array $row): int
    {
        $breakable = self::getBreakableCharacters();
        $count = 0;
        $counting = true;
        foreach ($row as $current) {
            if (!in_array((int)$current, $breakable, true) || !$counting) {
                $counting = false;
            } else {
                $count++;
            }
        }
        return $count;
    }

    private static function countFirstWordLength(array $row): int
    {
        $breakable = self::getBreakableCharacters();
        $count = 0;
        $counting = true;
        $startedCounting = false;
        foreach ($row as $current) {
            if (!$counting) {
                break;
            }
            $isCharacter = !in_array((int)$current, $breakable, true);
            if ($isCharacter && !$startedCounting) {
                $count++;
                $startedCounting = true;
            } elseif (!$isCharacter && !$startedCounting) {
                // skip
            } elseif (!$isCharacter && $startedCounting) {
                $counting = false;
            } else {
                $count++;
            }
        }
        return $count;
    }

    public static function convert(array $characters, array $options = []): string
    {
        $allowLineBreaks = $options['allowLineBreaks'] ?? false;
        $mergedRows = [];

        foreach ($characters as $index => $row) {
            if ($index === 0) {
                $mergedRows = array_merge($mergedRows, [0], $row);
            } else {
                if ($allowLineBreaks) {
                    $previousLine = $characters[$index - 1] ?? null;
                    if ($previousLine === null) {
                        $mergedRows = array_merge($mergedRows, [0], $row);
                        continue;
                    }

                    $prefixBreakable = self::countEmptyCharactersBeforeFirstWord($previousLine);
                    $reversedPrev = array_reverse($previousLine);
                    $postfixBreakable = self::countEmptyCharactersBeforeFirstWord($reversedPrev);
                    $firstWordLen = self::countFirstWordLength($row);
                    $previousBreakable = $prefixBreakable + $postfixBreakable;

                    $separator = $previousBreakable > $firstWordLen ? 100 : 0;
                    $mergedRows = array_merge($mergedRows, [$separator], $row);
                } else {
                    $mergedRows = array_merge($mergedRows, [0], $row);
                }
            }
        }

        $map = self::$characterCodesMap;
        $str = implode('', array_map(function ($code) use ($map) {
            return $map[(string)$code] ?? '';
        }, $mergedRows));

        // Remove trailing whitespace
        $str = trim($str);
        // Remove duplicate whitespace (split by space, filter empty, rejoin)
        $parts = explode(' ', $str);
        $parts = array_filter($parts, fn($s) => $s !== '');
        $str = implode(' ', $parts);
        // Remove whitespace before line breaks
        $str = preg_replace('/ \n/', "\n", $str);

        return $str;
    }
}
