<?php

namespace Vestaboard\Vbml;

/**
 * Port of createEmptyBoard.ts
 */
class CreateEmptyBoard
{
    public static function create(int $rows, int $columns): array
    {
        $result = [];
        for ($i = 0; $i < $rows; $i++) {
            $result[$i] = array_fill(0, $columns, CharacterCode::Blank);
        }
        return $result;
    }
}
