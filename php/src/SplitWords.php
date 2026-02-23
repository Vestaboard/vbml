<?php

namespace Vestaboard\Vbml;

/**
 * Port of splitWords.ts
 */
class SplitWords
{
    public static function split(int $width, string $template): array
    {
        // Replace spaces with character code {0}
        $template = str_replace(' ', '{0}', $template);

        // Split by color/char code patterns, keeping delimiters
        $parts = preg_split('/(\{.*?\})/u', $template, -1, PREG_SPLIT_DELIM_CAPTURE);
        if ($parts === false) {
            $parts = [$template];
        }

        // Split on newlines (keeping \n as delimiter)
        $withNewlines = [];
        foreach ($parts as $part) {
            if (strpos($part, "\n") !== false) {
                $split = preg_split('/(\n)/', $part, -1, PREG_SPLIT_DELIM_CAPTURE);
                if ($split !== false) {
                    foreach ($split as $s) {
                        $withNewlines[] = $s;
                    }
                }
            } else {
                $withNewlines[] = $part;
            }
        }

        // Chunk long words
        $chunked = [];
        foreach ($withNewlines as $curr) {
            // Ignore colors and character codes for chunking
            if (
                mb_strlen($curr) > 0 &&
                mb_substr($curr, 0, 1) === '{' &&
                mb_substr($curr, -1) === '}'
            ) {
                $chunked[] = $curr;
                continue;
            }
            if (mb_strlen($curr) > $width) {
                $pieces = self::chunkString($curr, $width);
                foreach ($pieces as $piece) {
                    $chunked[] = $piece;
                }
            } else {
                $chunked[] = $curr;
            }
        }

        // Filter empty strings
        return array_values(array_filter($chunked, fn($p) => $p !== ''));
    }

    private static function chunkString(string $word, int $width): array
    {
        $result = [];
        $len = mb_strlen($word);
        $offset = 0;
        while ($offset < $len) {
            $result[] = mb_substr($word, $offset, $width);
            $offset += $width;
        }
        return $result;
    }
}
