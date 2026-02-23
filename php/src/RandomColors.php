<?php

namespace Vestaboard\Vbml;

/**
 * Port of randomColors.ts
 */
class RandomColors
{
    public static array $colorCodes = [63, 64, 65, 66, 67, 68, 69, 70];

    public static function generate(
        int $rows = 6,
        int $columns = 22,
        array $colors = []
    ): array {
        if (empty($colors)) {
            $colors = self::$colorCodes;
        }
        $board = [];
        for ($r = 0; $r < $rows; $r++) {
            $row = [];
            for ($c = 0; $c < $columns; $c++) {
                $row[] = $colors[array_rand($colors)];
            }
            $board[] = $row;
        }
        return $board;
    }
}
