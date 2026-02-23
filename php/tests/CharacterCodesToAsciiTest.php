<?php

namespace Vestaboard\Vbml\Tests;

use PHPUnit\Framework\TestCase;
use Vestaboard\Vbml\CharacterCodesToAscii;

class CharacterCodesToAsciiTest extends TestCase
{
    public function testShouldConvertColors(): void
    {
        $result = CharacterCodesToAscii::convert([[63, 64, 65, 66, 67, 68, 69, 70]]);
        $this->assertEquals('🟥🟧🟨🟩🟦🟪⬜⬛', $result);
    }

    public function testShouldHandleRows(): void
    {
        $result = CharacterCodesToAscii::convert([[63, 64], [63, 64]]);
        $this->assertEquals("🟥🟧\n\n🟥🟧", $result);
    }

    public function testShouldSpaceOutLetters(): void
    {
        $result = CharacterCodesToAscii::convert([[1, 2]]);
        $this->assertEquals('A B ', $result);
    }
}
