<?php

namespace Vestaboard\Vbml;

/**
 * Port of copyCharacterCodes.ts
 */
class CopyCharacterCodes
{
    public static function copy(array $characters): array
    {
        return array_map(fn($row) => array_values($row), $characters);
    }
}
