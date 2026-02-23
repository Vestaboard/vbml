<?php

namespace Vestaboard\Vbml;

/**
 * Port of hasSpecialCharacters.ts
 */
class HasSpecialCharacters
{
    public static function check(?string $text): bool
    {
        if (!$text) {
            return false;
        }
        $supported = CharacterCode::getSupportedCharacters();
        $chars = mb_str_split($text);
        foreach ($chars as $char) {
            if (!in_array($char, $supported, true)) {
                return true;
            }
        }
        return false;
    }
}
