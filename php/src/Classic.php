<?php

namespace Vestaboard\Vbml;

/**
 * Port of classic.ts
 * A direct translation of formatter.kt to PHP via TypeScript from the KMM project.
 */
class Classic
{
    private const ROW_COUNT = 6;
    private const COLUMN_COUNT = 22;

    // Maps character strings (including {N} notation) to character codes
    private static function getCharMap(): array
    {
        static $map = null;
        if ($map !== null) {
            return $map;
        }
        $map = [
            ' '    => 0,
            'A'    => 1,  'B' => 2,  'C' => 3,  'D' => 4,  'E' => 5,
            'F'    => 6,  'G' => 7,  'H' => 8,  'I' => 9,  'J' => 10,
            'K'    => 11, 'L' => 12, 'M' => 13, 'N' => 14, 'O' => 15,
            'P'    => 16, 'Q' => 17, 'R' => 18, 'S' => 19, 'T' => 20,
            'U'    => 21, 'V' => 22, 'W' => 23, 'X' => 24, 'Y' => 25,
            'Z'    => 26,
            'a'    => 1,  'b' => 2,  'c' => 3,  'd' => 4,  'e' => 5,
            'f'    => 6,  'g' => 7,  'h' => 8,  'i' => 9,  'j' => 10,
            'k'    => 11, 'l' => 12, 'm' => 13, 'n' => 14, 'o' => 15,
            'p'    => 16, 'q' => 17, 'r' => 18, 's' => 19, 't' => 20,
            'u'    => 21, 'v' => 22, 'w' => 23, 'x' => 24, 'y' => 25,
            'z'    => 26,
            '1'    => 27, '2' => 28, '3' => 29, '4' => 30, '5' => 31,
            '6'    => 32, '7' => 33, '8' => 34, '9' => 35, '0' => 36,
            '!'    => 37, '@' => 38, '#' => 39, '$' => 40,
            '('    => 41, ')' => 42,
            '-'    => 44, '+'  => 46, '&' => 47, '='  => 48,
            ';'    => 49, ':'  => 50, "'"  => 52, '"'  => 53,
            '%'    => 54, ','  => 55, '.'  => 56, '/'  => 59,
            '?'    => 60, '°'  => 62,
            '—'    => 44, '–'  => 44, '¯' => 44, '~' => 44,
            '¸'    => 55, '¦'  => 50, '¿' => 60,
            '['    => 41, '{'  => 41, ']' => 42, '}' => 42,
            '‰'    => 54, '¤'  => 62, '•' => 62, '·' => 62,
            "\u{201C}" => 53, "\u{201D}" => 53,
            "\u{2018}" => 52, "\u{2019}" => 52,
            '„'    => 53, '¨'  => 53,
            'ˋ'    => 52, 'ˊ'  => 52,
            '‚'    => 52, '`'  => 52, '´' => 52, '‟' => 53,
            'â'    => 1,  'ä' => 1,  'à' => 1,  'å' => 1,  'á' => 1,
            'À'    => 1,  'Á' => 1,  'Â' => 1,  'Ã' => 1,  'Ä' => 1,
            'Å'    => 1,  'ã' => 1,
            'ç'    => 3,  'Ç' => 3,  '¢' => 3,
            'Ð'    => 4,
            'é'    => 5,  'ê' => 5,  'ë' => 5,  'è' => 5,
            'È'    => 5,  'É' => 5,  'Ê' => 5,  'Ë' => 5,
            'ƒ'    => 6,
            'í'    => 9,  'ï' => 9,  'î' => 9,  'ì' => 9,
            'Ì'    => 9,  'Í' => 9,  'Î' => 9,  'Ï' => 9,
            '|'    => 9,
            '£'    => 12,
            'ñ'    => 14, 'Ñ' => 14,
            'ó'    => 15, 'ô' => 15, 'ö' => 15, 'ò' => 15,
            'Ò'    => 15, 'Ó' => 15, 'Ô' => 15, 'Õ' => 15,
            'Ö'    => 15, 'Ø' => 15, 'ð' => 15, 'õ' => 15, 'ø' => 15,
            '±'    => 46,
            'š'    => 19, 'Š' => 19, '§' => 19,
            'û'    => 21, 'ù' => 21, 'ú' => 21,
            'Ù'    => 21, 'Ú' => 21, 'Û' => 21,
            'ğ'    => 7,
            '\\'   => 59,
            // Character code notation
            '{0}'  => 0,  '{1}'  => 1,  '{2}'  => 2,  '{3}'  => 3,
            '{4}'  => 4,  '{5}'  => 5,  '{6}'  => 6,  '{7}'  => 7,
            '{8}'  => 8,  '{9}'  => 9,  '{10}' => 10, '{11}' => 11,
            '{12}' => 12, '{13}' => 13, '{14}' => 14, '{15}' => 15,
            '{16}' => 16, '{17}' => 17, '{18}' => 18, '{19}' => 19,
            '{20}' => 20, '{21}' => 21, '{22}' => 22, '{23}' => 23,
            '{24}' => 24, '{25}' => 25, '{26}' => 26, '{27}' => 27,
            '{28}' => 28, '{29}' => 29, '{30}' => 30, '{31}' => 31,
            '{32}' => 32, '{33}' => 33, '{34}' => 34, '{35}' => 35,
            '{36}' => 36, '{37}' => 37, '{38}' => 38, '{39}' => 39,
            '{40}' => 40, '{41}' => 41, '{42}' => 42, '{43}' => 43,
            '{44}' => 44, '{45}' => 45, '{46}' => 46, '{47}' => 47,
            '{48}' => 48, '{49}' => 49, '{50}' => 50, '{51}' => 51,
            '{52}' => 52, '{53}' => 53, '{54}' => 54, '{55}' => 55,
            '{56}' => 56, '{57}' => 57, '{58}' => 58, '{59}' => 59,
            '{60}' => 60, '{61}' => 61, '{62}' => 62, '{63}' => 63,
            '{64}' => 64, '{65}' => 65, '{66}' => 66, '{67}' => 67,
            '{68}' => 68, '{69}' => 69, '{70}' => 70, '{71}' => 71,
        ];
        return $map;
    }

    public static function classic(string $text, array $options = []): array
    {
        $emptyRow = array_fill(0, self::COLUMN_COUNT, 0);
        $extraHPadding = $options['extraHPadding'] ?? 0;
        $preserveDoubleSpaces = $options['preserveDoubleSpaces'] ?? false;

        $emptyBoard = array_fill(0, self::ROW_COUNT, $emptyRow);

        if (!$text) {
            return $emptyBoard;
        }

        $text = EmojisToCharacterCodes::convert($text);
        $lines = explode("\n", $text);

        if ($preserveDoubleSpaces) {
            $wordCharCodePattern = '/[a-zA-Z]+|\{.\d\}|\{\d\}|\d+| {2}| |[^\p{L}\p{N}_\s]|\p{L}/u';
        } else {
            $wordCharCodePattern = '/[a-zA-Z]+|\{.\d\}|\{\d\}|\d+|\s+|[^\p{L}\p{N}_\s]|\p{L}/u';
        }

        $charMap = self::getCharMap();

        // Convert each line to arrays of char-code words
        $vestaboardCharsLines = [];
        foreach ($lines as $line) {
            preg_match_all($wordCharCodePattern, $line, $matches);
            $words = $matches[0] ?? [];
            if (empty($words)) {
                $vestaboardCharsLines[] = [];
                continue;
            }

            // flatMap: convert each word token to char codes
            $chars = [];
            foreach ($words as $word) {
                if (strpos($word, '{') !== false && strpos($word, '}') !== false) {
                    $chars[] = $charMap[$word] ?? 0;
                } elseif ($preserveDoubleSpaces && $word === '  ') {
                    $chars[] = 0;
                    $chars[] = 0;
                } else {
                    $wordChars = mb_str_split($word);
                    foreach ($wordChars as $char) {
                        if ($char === 'ä' || $char === 'Ä') {
                            $chars[] = $charMap['a'] ?? 1; // A
                            $chars[] = $charMap['e'] ?? 5; // E
                        } else {
                            $chars[] = $charMap[$char] ?? null;
                        }
                    }
                }
            }

            // Group chars into words split by 0 (space)
            $wordGroups = [];
            $currentWord = [];
            for ($i = 0; $i < count($chars); $i++) {
                $c = $chars[$i];
                if ($c === 0 && !$preserveDoubleSpaces) {
                    $wordGroups[] = $currentWord;
                    $currentWord = [];
                } elseif ($c === 0 && $preserveDoubleSpaces) {
                    // When preserving double spaces, only single 0 is word boundary
                    $next = $chars[$i + 1] ?? null;
                    $prev = $chars[$i - 1] ?? null;
                    if ($next === 0) {
                        $currentWord[] = $c;
                    } elseif ($prev === 0) {
                        $currentWord[] = $c;
                    } else {
                        $wordGroups[] = $currentWord;
                        $currentWord = [];
                    }
                } else {
                    $currentWord[] = $c;
                }
            }
            $wordGroups[] = $currentWord;
            $vestaboardCharsLines[] = $wordGroups;
        }

        $contentAreaWidth = self::COLUMN_COUNT - $extraHPadding;

        // makeLines recursive function
        $makeLines = null;
        $makeLines = function (array $wrappedWord) use ($contentAreaWidth, &$makeLines): array {
            // First, chunk each word into pieces <= contentAreaWidth
            $words = [];
            foreach ($wrappedWord as $word) {
                $wordLen = count($word);
                if ($wordLen === 0) {
                    continue;
                }
                // Chunk into contentAreaWidth-sized pieces
                $numChunks = (int)ceil($wordLen / $contentAreaWidth);
                for ($chunkIdx = 0; $chunkIdx < $numChunks; $chunkIdx++) {
                    $start = $chunkIdx * $contentAreaWidth;
                    $words[] = array_slice($word, $start, $contentAreaWidth);
                }
            }

            // Check if all words fit in one line
            $totalChars = array_sum(array_map('count', $words));
            $numWords = count($words);
            if ($numWords === 0) {
                return [[]];
            }
            if ($totalChars + $numWords - 1 <= $contentAreaWidth) {
                return [$words];
            }

            // Find break point
            for ($index = 0; $index <= count($words); $index++) {
                $sublist = array_slice($words, 0, $index);
                $required = array_sum(array_map('count', $sublist)) + count($sublist) - 1;
                if ($required > $contentAreaWidth) {
                    $firstPart = array_slice($words, 0, $index - 1);
                    $rest = array_slice($words, $index - 1);
                    return array_merge([$firstPart], $makeLines($rest));
                }
            }
            return [];
        };

        $wrapping = [];
        foreach ($vestaboardCharsLines as $line) {
            $lineWrapped = $makeLines($line);
            foreach ($lineWrapped as $w) {
                $wrapping[] = $w;
            }
        }

        // Format: join words in each line with [0] space between
        $formatted = array_map(function (array $line) {
            if (empty($line)) {
                return [];
            }
            // flatMap: [word, [0], word, [0], ...] then slice off last [0]
            $result = [];
            foreach ($line as $word) {
                $result[] = $word;
                $result[] = [0];
            }
            // Remove last [0]
            array_pop($result);
            return $result;
        }, $wrapping);

        $numContentRows = count($formatted);

        // Special case: 3 rows with no extra padding -> re-run with extraHPadding+4
        if ($numContentRows === 3 && $extraHPadding === 0) {
            return self::classic($text, [
                'extraHPadding' => $extraHPadding + 4,
                'preserveDoubleSpaces' => $preserveDoubleSpaces,
            ]);
        }

        // Calculate max content columns
        $maxNumContentColumns = 0;
        foreach ($formatted as $line) {
            $lineLen = array_sum(array_map('count', $line));
            if ($lineLen > $maxNumContentColumns) {
                $maxNumContentColumns = $lineLen;
            }
        }

        $hPad = max((int)floor((self::COLUMN_COUNT - ($maxNumContentColumns + 1)) / 2), 0);
        $vPad = max((int)floor((self::ROW_COUNT - $numContentRows) / 2), 0);

        $emptyRowPaddings = array_fill(0, $vPad, $emptyRow);
        $hPaddings = array_fill(0, $hPad, [0]);

        $padded = array_merge(
            $emptyRowPaddings,
            array_map(function ($line) use ($hPaddings) {
                return array_merge($hPaddings, $line, $hPaddings);
            }, $formatted),
            $emptyRowPaddings
        );

        // Build codes: flatten each padded line, take first COLUMN_COUNT chars
        $codes = [];
        $paddedSlice = array_slice($padded, 0, self::ROW_COUNT);
        foreach ($paddedSlice as $line) {
            // Flatten: line is an array of word-arrays
            $flat = [];
            foreach ($line as $wordOrZero) {
                if (is_array($wordOrZero)) {
                    foreach ($wordOrZero as $c) {
                        $flat[] = $c;
                    }
                } else {
                    $flat[] = $wordOrZero;
                }
            }
            $codes[] = array_slice($flat, 0, self::COLUMN_COUNT);
        }

        // Build finalBoard
        $finalBoard = [];
        foreach ($emptyBoard as $rowIndex => $line) {
            $finalRow = [];
            foreach ($line as $colIndex => $_) {
                $finalRow[] = $codes[$rowIndex][$colIndex] ?? 0;
            }
            $finalBoard[] = $finalRow;
        }

        return $finalBoard;
    }
}
