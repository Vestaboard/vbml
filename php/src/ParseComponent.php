<?php

namespace Vestaboard\Vbml;

/**
 * Port of parseComponent.ts and parseAbsoluteComponent
 */
class ParseComponent
{
    /**
     * Returns a closure that parses a component.
     */
    public static function parseComponent(
        int    $defaultHeight,
        int    $defaultWidth,
        ?array $props = null
    ): \Closure {
        return function (array $component) use ($defaultHeight, $defaultWidth, $props) {
            // Raw characters component
            if (isset($component['rawCharacters'])) {
                return $component['rawCharacters'];
            }

            $width  = $component['style']['width']  ?? $defaultWidth;
            $height = $component['style']['height'] ?? $defaultHeight;

            // Random colors component
            if (isset($component['randomColors'])) {
                $colors = $component['randomColors']['colors'] ?? RandomColors::$colorCodes;
                return RandomColors::generate($height, $width, $colors);
            }

            $emptyComponent = CreateEmptyBoard::create($height, $width);
            $template = $component['template'] ?? '';

            $align   = $component['style']['align']   ?? 'top';
            $justify = $component['style']['justify'] ?? 'left';

            // Pipeline
            $result = EmojisToCharacterCodes::convert($template);
            $result = ParseProps::parse($props ?? [], $result);
            $result = SanitizeSpecialCharacters::sanitize($result);
            $words  = SplitWords::split($width, $result);
            $lines  = GetLinesFromWords::getLines($width, $words);
            $coded  = array_map([CharacterCode::class, 'convertCharactersToCharacterCodes'], $lines);
            $vAligned = VerticalAlign::align($height, $align, $coded);
            $hAligned = HorizontalAlign::align($width, $justify, $vAligned);
            return RenderComponent::render($emptyComponent, $hAligned);
        };
    }

    /**
     * Returns a closure that parses an absolute component (with x/y position).
     */
    public static function parseAbsoluteComponent(
        int    $defaultHeight,
        int    $defaultWidth,
        ?array $props = null
    ): \Closure {
        return function (array $component) use ($defaultHeight, $defaultWidth, $props) {
            $characters = (self::parseComponent($defaultHeight, $defaultWidth, $props))($component);
            return [
                'characters' => $characters,
                'x' => $component['style']['absolutePosition']['x'] ?? 0,
                'y' => $component['style']['absolutePosition']['y'] ?? 0,
            ];
        };
    }
}
