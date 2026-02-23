<?php

namespace Vestaboard\Vbml\Tests;

use PHPUnit\Framework\TestCase;
use Vestaboard\Vbml\CopyCharacterCodes;

class CopyCharacterCodesTest extends TestCase
{
    public function testShouldDeepCopyCharacterCodes(): void
    {
        $characters = [[1, 2]];
        $result = CopyCharacterCodes::copy($characters);
        $this->assertEquals([[1, 2]], $result);

        // Verify deep copy: modifying original does not affect the copy
        $characters[0][0] = 3;
        $this->assertEquals(1, $result[0][0]);
    }
}
