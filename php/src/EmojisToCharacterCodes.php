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
            // Heart variants → char 62 (rendered as a heart on Flagship boards).
            // ❤️ (with U+FE0F variation selector) must come before bare ❤.
            '❤️' => '{62}',
            '❤' => '{62}',
            '🧡' => '{62}',
            '💛' => '{62}',
            '💚' => '{62}',
            '💙' => '{62}',
            '💜' => '{62}',
            '🖤' => '{62}',
            '🤍' => '{62}',
            '🤎' => '{62}',
            'ß' => 'SS',
        ];
        foreach ($replacements as $emoji => $code) {
            $template = str_replace($emoji, $code, $template);
        }
        return $template;
    }
}
