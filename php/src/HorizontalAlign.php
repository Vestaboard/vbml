<?php

namespace Vestaboard\Vbml;

/**
 * Port of horizontalAlign.ts
 */
class HorizontalAlign
{
    /**
     * @param int      $width   The width of each row
     * @param string   $justify 'left'|'right'|'justified'|'center' (default)
     * @param int[][]  $codes   Array of rows, each row an array of ints
     * @return int[][]
     */
    public static function align(int $width, string $justify, array $codes): array
    {
        switch ($justify) {
            case 'left':
                return array_map(function (array $row) {
                    return self::removeExtraSpace($row)['row'];
                }, $codes);

            case 'right':
                return array_map(function (array $row) use ($width) {
                    $reversed = array_reverse($row);
                    $trimmed = self::removeExtraSpace($reversed)['row'];
                    $result = array_fill(0, $width, CharacterCode::Blank);
                    for ($i = 0; $i < $width; $i++) {
                        $srcIndex = $width - 1 - $i;
                        $result[$i] = $trimmed[$srcIndex] ?? CharacterCode::Blank;
                    }
                    return $result;
                }, $codes);

            case 'justified':
                $rows = array_map(fn($row) => self::removeExtraSpace($row)['row'], $codes);
                $longestRow = 0;
                foreach ($rows as $row) {
                    if (count($row) > $longestRow) {
                        $longestRow = count($row);
                    }
                }
                $longestRow = $longestRow - 1;
                $paddingRight = (int)floor(($width - $longestRow) / 2);
                $paddingLeft = $width - ($longestRow + ($paddingRight + 1));
                $padding = $paddingRight > $paddingLeft ? $paddingLeft : $paddingRight;

                return array_map(function (array $row) use ($width, $padding) {
                    $result = array_fill(0, $width, CharacterCode::Blank);
                    for ($i = 0; $i < $width; $i++) {
                        $srcIndex = $i - $padding;
                        $result[$i] = $row[$srcIndex] ?? CharacterCode::Blank;
                    }
                    return $result;
                }, $rows);

            default: // center
                return array_map(function (array $row) use ($width) {
                    $reversed = array_reverse($row);
                    $trimmedReversed = self::removeExtraSpace($reversed)['row'];
                    $trimmed = array_reverse($trimmedReversed);
                    $paddingLeft = (int)floor(($width - count($trimmed)) / 2);
                    $result = array_fill(0, $width, CharacterCode::Blank);
                    for ($i = 0; $i < $width; $i++) {
                        $srcIndex = $i - $paddingLeft;
                        $result[$i] = $trimmed[$srcIndex] ?? CharacterCode::Blank;
                    }
                    return $result;
                }, $codes);
        }
    }

    private static function removeExtraSpace(array $row): array
    {
        $resultRow = [];
        $extraSpace = true;
        foreach ($row as $cur) {
            if ($cur === CharacterCode::Blank && $extraSpace) {
                // skip leading blank
            } else {
                $resultRow[] = $cur;
                $extraSpace = false;
            }
        }
        return ['row' => $resultRow, 'extraSpace' => $extraSpace];
    }
}
