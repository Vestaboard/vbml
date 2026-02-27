<?php

namespace Vestaboard\Vbml;

/**
 * Port of layoutComponents.ts
 */
class LayoutComponents
{
    public static function layout(
        array $board,
        array $components,
        array $absoluteComponents,
        ?array $calendarComponents = null
    ): array {
        $position = ['top' => 0, 'left' => 0, 'height' => 0];

        foreach ($components as $component) {
            if (empty($component)) {
                continue;
            }
            $componentWidth = count($component[0]);
            $boardWidth = count($board[0]);

            $newLine = $position['left'] + $componentWidth > $boardWidth;
            $left = $newLine ? 0 : $position['left'];
            $top = $newLine ? $position['top'] + $position['height'] : $position['top'];

            foreach ($component as $rowIndex => $row) {
                foreach ($row as $bitIndex => $bit) {
                    if (isset($board[$rowIndex + $top][$bitIndex + $left])) {
                        $board[$rowIndex + $top][$bitIndex + $left] = $bit;
                    }
                }
            }

            $position = [
                'top' => $top,
                'left' => $left + $componentWidth,
                'height' => count($component),
            ];
        }

        if ($absoluteComponents) {
            foreach ($absoluteComponents as $component) {
                if (empty($component)) continue;
                foreach ($component['characters'] as $rowIndex => $row) {
                    foreach ($row as $bitIndex => $bit) {
                        if ($component['y'] + $rowIndex >= count($board)) {
                            continue;
                        }
                        if ($component['x'] + $bitIndex >= count($board[0])) {
                            continue;
                        }
                        $board[$rowIndex + $component['y']][$bitIndex + $component['x']] = $bit;
                    }
                }
            }
        }

        if ($calendarComponents) {
            foreach ($calendarComponents as $component) {
                if (empty($component)) continue;
                foreach ($component['characters'] as $rowIndex => $row) {
                    foreach ($row as $bitIndex => $bit) {
                        if ($rowIndex >= count($board)) {
                            continue;
                        }
                        if ($component['x'] + $bitIndex >= count($board[0]) || $bitIndex > 12) {
                            // match TS: return board[rowIndex][bitIndex + component.x] (no assignment)
                            continue;
                        }
                        $board[$rowIndex][$bitIndex + $component['x']] = $bit;
                    }
                }
            }
        }

        return $board;
    }
}
