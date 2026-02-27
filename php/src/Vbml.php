<?php

namespace Vestaboard\Vbml;

/**
 * Main VBML class.
 * Port of index.ts
 */
class Vbml
{
    private const BOARD_ROWS    = 6;
    private const BOARD_COLUMNS = 22;

    public static function parse(array $input): array
    {
        $height = $input['style']['height'] ?? self::BOARD_ROWS;
        $width  = $input['style']['width']  ?? self::BOARD_COLUMNS;
        $props  = $input['props'] ?? null;

        $emptyBoard = CreateEmptyBoard::create($height, $width);

        // Regular (non-absolute) components
        $components = array_values(array_filter(
            $input['components'],
            fn($c) => !isset($c['style']['absolutePosition']) && !isset($c['calendar'])
        ));
        $components = array_map(
            ParseComponent::parseComponent($height, $width, $props),
            $components
        );

        // Absolute components (non-calendar)
        $absoluteComponents = array_values(array_filter(
            $input['components'],
            fn($c) => !isset($c['calendar']) && isset($c['style']['absolutePosition'])
        ));
        $absoluteComponents = array_map(
            ParseComponent::parseAbsoluteComponent($height, $width, $props),
            $absoluteComponents
        );

        // Calendar components
        $calendarComponents = [];
        foreach ($input['components'] as $component) {
            if (!isset($component['calendar'])) {
                continue;
            }
            $cal = $component['calendar'];
            $x = $component['style']['absolutePosition']['x'] ?? 0;
            $calendar = Calendar::makeCalendar(
                $cal['month'],
                $cal['year'],
                $cal['days'] ?? [],
                $cal['defaultDayColor'] ?? null,
                $cal['hideSMTWTFS'] ?? false,
                $cal['hideDates'] ?? false,
                $cal['hideMonthYear'] ?? false
            );
            $calendarComponents[] = Calendar::parseCalendarComponent($calendar, $x);
        }

        return LayoutComponents::layout($emptyBoard, $components, $absoluteComponents, $calendarComponents);
    }

    public static function characterCodesToString(array $characters, array $options = []): string
    {
        return CharacterCodesToString::convert($characters, $options);
    }

    public static function characterCodesToAscii(array $characterCodes, bool $isWhite = false): string
    {
        return CharacterCodesToAscii::convert($characterCodes, $isWhite);
    }

    public static function copyCharacterCodes(array $characters): array
    {
        return CopyCharacterCodes::copy($characters);
    }

    public static function classic(string $text, array $options = []): array
    {
        return Classic::classic($text, $options);
    }

    public static function hasSpecialCharacters(?string $text): bool
    {
        return HasSpecialCharacters::check($text);
    }

    public static function sanitizeSpecialCharacters(string $text): string
    {
        return SanitizeSpecialCharacters::sanitize($text);
    }
}
