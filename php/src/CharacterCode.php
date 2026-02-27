<?php

namespace Vestaboard\Vbml;

/**
 * Character codes for the Vestaboard display.
 * Port of characterCodes.ts
 */
class CharacterCode
{
    const Blank = 0;
    const A = 1;
    const B = 2;
    const C = 3;
    const D = 4;
    const E = 5;
    const F = 6;
    const G = 7;
    const H = 8;
    const I = 9;
    const J = 10;
    const K = 11;
    const L = 12;
    const M = 13;
    const N = 14;
    const O = 15;
    const P = 16;
    const Q = 17;
    const R = 18;
    const S = 19;
    const T = 20;
    const U = 21;
    const V = 22;
    const W = 23;
    const X = 24;
    const Y = 25;
    const Z = 26;
    const One = 27;
    const Two = 28;
    const Three = 29;
    const Four = 30;
    const Five = 31;
    const Six = 32;
    const Seven = 33;
    const Eight = 34;
    const Nine = 35;
    const Zero = 36;
    const ExclamationMark = 37;
    const AtSign = 38;
    const PoundSign = 39;
    const DollarSign = 40;
    const LeftParen = 41;
    const RightParen = 42;
    const Hyphen = 44;
    const PlusSign = 46;
    const Ampersand = 47;
    const EqualsSign = 48;
    const Semicolon = 49;
    const Colon = 50;
    const SingleQuote = 52;
    const DoubleQuote = 53;
    const PercentSign = 54;
    const Comma = 55;
    const Period = 56;
    const Slash = 59;
    const QuestionMark = 60;
    const DegreeSign = 62;
    const Red = 63;
    const Orange = 64;
    const Yellow = 65;
    const Green = 66;
    const Blue = 67;
    const Violet = 68;
    const White = 69;
    const Black = 70;
    const Filled = 71;

    /**
     * Valid character code values (matching the TypeScript enum values).
     */
    public static function getValidCodes(): array
    {
        return [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
            36, 37, 38, 39, 40, 41, 42, 44, 46, 47, 48, 49, 50, 52, 53, 54, 55,
            56, 59, 60, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
        ];
    }

    public static function getCharacterCodes(): array
    {
        static $codes = null;
        if ($codes !== null) {
            return $codes;
        }
        $codes = [
            ['code' => self::Blank, 'name' => 'Blank', 'mappings' => [' ', '©', '®', '<', '>', '²', '†', '‡', 'ˆ', 'Þ', 'þ', 'µ', '¶', '*', '^', '¬', '«', '»', '›', '³', '¹', '€', '‹', '˜', '÷', 'π', '∆', '√', '∫', '∞']],
            ['code' => self::A, 'name' => 'A', 'mappings' => ['A', 'a', 'â', 'à', 'å', 'á', 'À', 'Á', 'Â', 'Ã', 'Å', 'ã', 'ä', 'Ä', '∂', 'œ', 'æ', 'Æ']],
            ['code' => self::B, 'name' => 'B', 'mappings' => ['B', 'b']],
            ['code' => self::C, 'name' => 'C', 'mappings' => ['C', 'c', 'ç', 'Ç', '¢', 'ć', 'Ć', 'č', 'Č']],
            ['code' => self::D, 'name' => 'D', 'mappings' => ['D', 'd', 'Ð', 'ð']],
            ['code' => self::E, 'name' => 'E', 'mappings' => ['E', 'e', 'é', 'ê', 'ë', 'è', 'È', 'É', 'Ê', 'Ë', '€', '£', '∑']],
            ['code' => self::F, 'name' => 'F', 'mappings' => ['F', 'f', 'ƒ', 'ſ']],
            ['code' => self::G, 'name' => 'G', 'mappings' => ['G', 'g', 'ğ', 'Ğ', 'ģ', 'Ģ', 'ġ', 'Ġ', 'ĝ', 'Ĝ']],
            ['code' => self::H, 'name' => 'H', 'mappings' => ['H', 'h', 'ħ', 'Ħ', 'ĥ', 'Ĥ']],
            ['code' => self::I, 'name' => 'I', 'mappings' => ['I', 'i', 'í', 'ï', 'î', 'ì', 'Ì', 'Í', 'Î', 'Ï', '|', '¡']],
            ['code' => self::J, 'name' => 'J', 'mappings' => ['J', 'j', 'ĵ', 'Ĵ', 'į', 'Į']],
            ['code' => self::K, 'name' => 'K', 'mappings' => ['K', 'k', 'ķ', 'Ķ', 'ĸ']],
            ['code' => self::L, 'name' => 'L', 'mappings' => ['L', 'l', '£', 'ł', 'Ł', 'ļ', 'Ļ', 'ĺ', 'Ĺ', 'ľ', 'Ľ', 'ŀ', 'Ŀ']],
            ['code' => self::M, 'name' => 'M', 'mappings' => ['M', 'm']],
            ['code' => self::N, 'name' => 'N', 'mappings' => ['N', 'n', 'ñ', 'Ñ', 'ń', 'Ń', 'ň', 'Ň', 'ņ', 'Ņ']],
            ['code' => self::O, 'name' => 'O', 'mappings' => ['O', 'o', 'ó', 'ô', 'ò', 'Ò', 'Ó', 'Ô', 'Õ', 'Ø', 'ð', 'õ', 'ø', 'ö', 'Ö']],
            ['code' => self::P, 'name' => 'P', 'mappings' => ['P', 'p', 'Þ', 'þ', '¶']],
            ['code' => self::Q, 'name' => 'Q', 'mappings' => ['Q', 'q']],
            ['code' => self::R, 'name' => 'R', 'mappings' => ['R', 'r', 'ŕ', 'Ŕ', 'ř', 'Ř', 'ŗ', 'Ŗ']],
            ['code' => self::S, 'name' => 'S', 'mappings' => ['S', 's', 'š', 'Š', '§', 'ś', 'Ś', 'ş', 'Ş', 'ș', 'Ș']],
            ['code' => self::T, 'name' => 'T', 'mappings' => ['T', 't', 'ť', 'Ť', 'ţ', 'Ţ', 'ŧ', 'Ŧ']],
            ['code' => self::U, 'name' => 'U', 'mappings' => ['U', 'u', 'û', 'ù', 'ú', 'Ù', 'Ú', 'Û', 'µ', 'ū', 'Ū', 'ů', 'Ů', 'ų', 'Ų', 'Ü']],
            ['code' => self::V, 'name' => 'V', 'mappings' => ['V', 'v', 'Ʋ', 'ʋ']],
            ['code' => self::W, 'name' => 'W', 'mappings' => ['W', 'w', 'ŵ', 'Ŵ', 'ẁ', 'Ẁ', 'ẃ', 'Ẃ', 'ẅ', 'Ẅ']],
            ['code' => self::X, 'name' => 'X', 'mappings' => ['X', 'x', 'ẍ', 'Ẍ']],
            ['code' => self::Y, 'name' => 'Y', 'mappings' => ['Y', 'y', 'ý', 'ÿ', 'Ý', 'ŷ', 'Ŷ', 'ỳ', 'Ỳ', 'ỹ', 'Ỹ', 'Ÿ']],
            ['code' => self::Z, 'name' => 'Z', 'mappings' => ['Z', 'z', 'ž', 'Ž', 'ź', 'Ź', 'ż', 'Ż']],
            ['code' => self::One, 'name' => 'One', 'mappings' => ['1', '¹']],
            ['code' => self::Two, 'name' => 'Two', 'mappings' => ['2', '²']],
            ['code' => self::Three, 'name' => 'Three', 'mappings' => ['3', '³']],
            ['code' => self::Four, 'name' => 'Four', 'mappings' => ['4']],
            ['code' => self::Five, 'name' => 'Five', 'mappings' => ['5']],
            ['code' => self::Six, 'name' => 'Six', 'mappings' => ['6']],
            ['code' => self::Seven, 'name' => 'Seven', 'mappings' => ['7']],
            ['code' => self::Eight, 'name' => 'Eight', 'mappings' => ['8']],
            ['code' => self::Nine, 'name' => 'Nine', 'mappings' => ['9']],
            ['code' => self::Zero, 'name' => 'Zero', 'mappings' => ['0']],
            ['code' => self::ExclamationMark, 'name' => 'ExclamationMark', 'mappings' => ['!', 'ǃ']],
            ['code' => self::AtSign, 'name' => 'AtSign', 'mappings' => ['@']],
            ['code' => self::PoundSign, 'name' => 'PoundSign', 'mappings' => ['#', '№']],
            ['code' => self::DollarSign, 'name' => 'DollarSign', 'mappings' => ['$', '¢', '£', '¤', '¥', '₩', '₪', '₫', '€', '₹', '₺', '₽']],
            ['code' => self::LeftParen, 'name' => 'LeftParen', 'mappings' => ['(', '[', '{', '⟨', '«']],
            ['code' => self::RightParen, 'name' => 'RightParen', 'mappings' => [')', ']', '}', '⟩', '»']],
            ['code' => self::Hyphen, 'name' => 'Hyphen', 'mappings' => ['-', '—', '–', '¯', '~', '_']],
            ['code' => self::PlusSign, 'name' => 'PlusSign', 'mappings' => ['+', '±', '∓', '∔']],
            ['code' => self::Ampersand, 'name' => 'Ampersand', 'mappings' => ['&']],
            ['code' => self::EqualsSign, 'name' => 'EqualsSign', 'mappings' => ['=', '≠', '≈', '≡']],
            ['code' => self::Semicolon, 'name' => 'Semicolon', 'mappings' => [';', ';', '；']],
            ['code' => self::Colon, 'name' => 'Colon', 'mappings' => [':', '¦']],
            ['code' => self::SingleQuote, 'name' => 'SingleQuote', 'mappings' => ["'", "\u{2018}", "\u{2019}", '`', '´', '‚', '‛', 'ʹ', 'ʻ', 'ʽ', 'ʾ', 'ʿ', 'ˈ', 'ˊ', 'ˋ']],
            ['code' => self::DoubleQuote, 'name' => 'DoubleQuote', 'mappings' => ['"', '„', "\u{201C}", "\u{201D}", '¨', '˝', 'ˮ', '˵', '˶', '‟', '"']],
            ['code' => self::PercentSign, 'name' => 'PercentSign', 'mappings' => ['%', '‰', '‱']],
            ['code' => self::Comma, 'name' => 'Comma', 'mappings' => [',', '¸', '‚', '，', '、', '､']],
            ['code' => self::Period, 'name' => 'Period', 'mappings' => ['.', '․', '‥', '…']],
            ['code' => self::Slash, 'name' => 'Slash', 'mappings' => ['/', '\\', '⁄', '∕', '⧸', '⫻', '⫽', '⧵']],
            ['code' => self::QuestionMark, 'name' => 'QuestionMark', 'mappings' => ['?', '¿']],
            ['code' => self::DegreeSign, 'name' => 'DegreeSign', 'mappings' => ['°', '˚', 'º', '¤', '•', '·', '∙', '∘', '⚬', '⦿', '⨀', '⨁', '⨂', "❤️", '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '❤']],
        ];
        return $codes;
    }

    /**
     * Build a flat map: character → code (for fast lookups).
     */
    private static function getMappedCharacters(): array
    {
        static $map = null;
        if ($map !== null) {
            return $map;
        }
        $map = [];
        foreach (self::getCharacterCodes() as $entry) {
            foreach ($entry['mappings'] as $m) {
                $map[$m] = $entry['code'];
            }
        }
        return $map;
    }

    public static function getCharacterCode(string $character): ?int
    {
        $map = self::getMappedCharacters();
        return $map[$character] ?? null;
    }

    private static function validateCharacterCode(int $code): int
    {
        if (in_array($code, self::getValidCodes(), true)) {
            return $code;
        }
        throw new \InvalidArgumentException("Invalid Character Code: {$code}");
    }

    /**
     * Port of convertCharactersToCharacterCodes from characterCodes.ts.
     * Parses strings like {42} as character codes and maps other chars.
     */
    public static function convertCharactersToCharacterCodes(string $characters): array
    {
        $chars = mb_str_split($characters);
        $count = count($chars);
        $accumulator = [];
        $isCharacterCode = false;
        $skipNext = false;

        for ($index = 0; $index < $count; $index++) {
            $current = $chars[$index];
            $next = $chars[$index + 1] ?? null;

            $characterCode = null;
            if ($isCharacterCode) {
                if ($next === '}') {
                    $characterCode = self::validateCharacterCode((int)$current);
                } else {
                    $twoDigit = $current . ($next ?? '');
                    $characterCode = self::validateCharacterCode((int)$twoDigit);
                }
            }

            if ($current !== '{' && $current !== '}' && !$skipNext) {
                $accumulator[] = $isCharacterCode ? $characterCode : self::getCharacterCode($current);
            }

            $newIsCharacterCode = ($current === '{');
            $newSkipNext = $isCharacterCode && ($next !== '}');

            $isCharacterCode = $newIsCharacterCode;
            $skipNext = $newSkipNext;
        }

        return $accumulator;
    }

    /**
     * Port of mappingToCharacter from characterCodes.ts.
     */
    public static function mappingToCharacter(string $character): string
    {
        // Remove variation selector-16 (U+FE0F)
        if ($character === "\u{FE0F}") {
            return '';
        }

        $multipleMapping = MultipleCharacterMappings::getMappings();
        if (isset($multipleMapping[$character])) {
            return $multipleMapping[$character];
        }

        $supported = self::getSupportedCharacters();
        if (in_array($character, $supported, true)) {
            return $character;
        }

        foreach (self::getCharacterCodes() as $entry) {
            if (in_array($character, $entry['mappings'], true)) {
                return mb_strtolower($entry['mappings'][0]);
            }
        }

        return ' ';
    }

    public static function getSupportedCharacters(): array
    {
        static $supported = null;
        if ($supported !== null) {
            return $supported;
        }

        $result = [];
        foreach (self::getCharacterCodes() as $entry) {
            if (!empty($entry['mappings'])) {
                $result[] = mb_strtolower($entry['mappings'][0]);
                $result[] = mb_strtoupper($entry['mappings'][0]);
            }
        }

        // Extra explicitly supported characters
        $extra = [
            "\n",
            "\u{201C}",  // left double quotation mark
            "\u{2018}",  // left single quotation mark
            '{',
            '}',
            '⬜',
            '🟥',
            '🟧',
            '🟨',
            '🟩',
            '🟦',
            '🟪',
            '⬛',
            '❤',
        ];

        $result = array_merge($result, $extra);
        $supported = array_values(array_unique($result));
        return $supported;
    }
}
