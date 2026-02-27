<?php

namespace Vestaboard\Vbml;

/**
 * Port of getLinesFromWords.ts
 */
class GetLinesFromWords
{
    public static function getLines(int $width, array $words): array
    {
        // acc is an array of ['line' => string, 'length' => int]
        $acc = [['line' => '', 'length' => 0]];
        $count = count($words);

        for ($index = 0; $index < $count; $index++) {
            $curr = $words[$index];
            $lastIndex = count($acc) - 1;
            $lineLength = $acc[$lastIndex]['length'];
            $emptyLine = ($acc[$lastIndex]['line'] === '');

            // Allow for empty lines if there is a double return
            if ($curr === "\n" && isset($words[$index - 1]) && $words[$index - 1] === "\n") {
                $acc[] = ['line' => '', 'length' => 0];
                continue;
            }

            if ($curr === "\n") {
                // Finish the line
                $acc[$lastIndex]['length'] = $width;
                // keep acc as is (line is finalized at full width)
                continue;
            }

            // Colors / character codes - treat as one bit wide
            $isColorCode = (mb_strlen($curr) >= 2 && mb_substr($curr, 0, 1) === '{' && mb_substr($curr, -1) === '}');
            if ($isColorCode) {
                if (1 + $lineLength > $width) {
                    // If a blank space is forced at beginning of a new line, ignore it
                    if ($curr === '{0}') {
                        continue;
                    }
                    $acc[] = ['line' => $curr, 'length' => 1];
                } else {
                    $acc[$lastIndex]['line'] .= $curr;
                    $acc[$lastIndex]['length'] = $lineLength + 1;
                }
                continue;
            }

            // Regular word
            $wordLen = mb_strlen($curr);
            if ($width >= $wordLen + $lineLength && !$emptyLine) {
                // Word fits on current line
                $acc[$lastIndex]['line'] .= $curr;
                $acc[$lastIndex]['length'] = $lineLength + $wordLen;
            } else {
                // New line
                $acc[] = ['line' => $curr, 'length' => $wordLen];
            }
        }

        $firstLineEmpty = ($acc[0]['line'] === '');
        if ($firstLineEmpty) {
            $acc = array_slice($acc, 1);
        }

        return array_map(fn($item) => $item['line'], $acc);
    }
}
