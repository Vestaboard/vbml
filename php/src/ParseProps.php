<?php

namespace Vestaboard\Vbml;

use Mustache_Engine;

/**
 * Port of parseProps.ts
 */
class ParseProps
{
    public static function parse(array $props, string $template): string
    {
        $mustache = new Mustache_Engine();
        return $mustache->render($template, $props);
    }
}
