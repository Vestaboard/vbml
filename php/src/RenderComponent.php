<?php

namespace Vestaboard\Vbml;

/**
 * Port of renderComponent.ts
 */
class RenderComponent
{
    public static function render(array $emptyComponent, array $codes): array
    {
        return array_map(function ($line, $index) use ($codes) {
            return array_map(function ($char, $charIndex) use ($codes, $index) {
                return $codes[$index][$charIndex] ?? $char;
            }, $line, array_keys($line));
        }, $emptyComponent, array_keys($emptyComponent));
    }
}
