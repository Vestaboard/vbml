<?php

namespace Vestaboard\Vbml;

use Mustache\Engine;

/**
 * Port of parseProps.ts
 */
class ParseProps
{
    public static function parse(array $props, string $template): string
    {
        $mustache = new Engine();
        return $mustache->render($template, $props);
    }
}
