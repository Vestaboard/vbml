<?php

namespace Vestaboard\Vbml;

/**
 * Port of emojisToCharacterCodes.ts
 */
class EmojisToCharacterCodes
{
    public static function convert(string $template): string
    {
        $replacements = [
            '🟥' => '{63}',
            '🟧' => '{64}',
            '🟨' => '{65}',
            '🟩' => '{66}',
            '🟦' => '{67}',
            '🟪' => '{68}',
            '⬜' => '{69}',
            '⬛' => '{70}',
            'ß' => 'SS',
        ];
        foreach ($replacements as $emoji => $code) {
            $template = str_replace($emoji, $code, $template);
        }
        return $template;
    }
}
