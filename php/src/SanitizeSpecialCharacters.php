<?php

namespace Vestaboard\Vbml;

/**
 * Port of sanitizeSpecialCharacters.ts
 * Uses text.split("") equivalent (mb_str_split) to handle UTF-8.
 */
class SanitizeSpecialCharacters
{
    public static function sanitize(string $text): string
    {
        $chars = mb_str_split($text);
        return implode('', array_map([CharacterCode::class, 'mappingToCharacter'], $chars));
    }
}
