<?php

namespace Vestaboard\Vbml;

use Exception;

/**
 * Thrown when props do not satisfy the schema.
 * Port of VBMLSchemaError in schemaErrors.ts
 */
class VBMLSchemaError extends Exception
{
    /**
     * @param array<int, array{prop: string, code: string, message: string}> $issues
     */
    public function __construct(public readonly array $issues)
    {
        $lines = implode("\n", array_map(
            fn($issue) => "- {$issue['prop']}: {$issue['message']}",
            $issues
        ));
        parent::__construct("Props do not match the schema:\n" . $lines);
    }
}
