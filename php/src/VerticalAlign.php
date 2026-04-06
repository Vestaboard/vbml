<?php

namespace Vestaboard\Vbml;

/**
 * Port of verticalAlign.ts
 */
class VerticalAlign
{
    /**
     * @param int     $height
     * @param string  $align  'top'|'bottom'|'justified'|'center' (default)
     * @param int[][] $codes
     * @return int[][]
     */
    public static function align(int $height, string $align, array $codes): array
    {
        switch ($align) {
            case 'top':
                return $codes;

            case 'bottom':
                $reversed = array_reverse($codes);
                $result = [];
                for ($i = 0; $i < $height; $i++) {
                    $srcIndex = $height - 1 - $i;
                    $result[] = $reversed[$srcIndex] ?? [];
                }
                return $result;

            case 'justified':
                $justifiedPaddingTop = max((int)ceil(($height - count($codes)) / 2), 0);
                $result = [];
                for ($i = 0; $i < $height; $i++) {
                    $srcIndex = $i - $justifiedPaddingTop;
                    $result[] = $codes[$srcIndex] ?? [];
                }
                return $result;

            default: // center
                $paddingTop = max((int)floor(($height - count($codes)) / 2), 0);
                $result = [];
                for ($i = 0; $i < $height; $i++) {
                    $srcIndex = $i - $paddingTop;
                    $result[] = $codes[$srcIndex] ?? [];
                }
                return $result;
        }
    }
}
