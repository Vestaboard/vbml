<?php

namespace Vestaboard\Vbml\Tests;

use PHPUnit\Framework\TestCase;
use Vestaboard\Vbml\HasSpecialCharacters;

class HasSpecialCharactersTest extends TestCase
{
    public function testShouldReturnTrueIfTextContainsSpecialCharacters(): void
    {
        $this->assertTrue(HasSpecialCharacters::check('ä'));
    }

    public function testShouldReturnTrueIfMixed(): void
    {
        $this->assertTrue(HasSpecialCharacters::check('äa'));
    }

    public function testShouldReturnFalseForLowercase(): void
    {
        $this->assertFalse(HasSpecialCharacters::check('abcdefghijklmnopqrstuvwxyz'));
    }

    public function testShouldReturnFalseForUppercase(): void
    {
        $this->assertFalse(HasSpecialCharacters::check('ABCDEFGHIJKLMNOPQRSTUVWXYZ'));
    }

    public function testShouldReturnFalseForNumbers(): void
    {
        $this->assertFalse(HasSpecialCharacters::check('0123456789'));
    }

    public function testShouldReturnFalseForStandardSymbols(): void
    {
        $this->assertFalse(HasSpecialCharacters::check("!@#\$()-+&=;:'\"%,./?°"));
    }

    public function testShouldReturnFalseForEmpty(): void
    {
        $this->assertFalse(HasSpecialCharacters::check(''));
    }

    public function testShouldExcludeNewlines(): void
    {
        $this->assertFalse(HasSpecialCharacters::check("Hello\nWorld"));
    }

    public function testShouldExcludeSingleQuoteFromIOS(): void
    {
        $this->assertFalse(HasSpecialCharacters::check("\u{2018}"));
    }

    public function testShouldExcludeDoubleQuoteFromIOS(): void
    {
        $this->assertFalse(HasSpecialCharacters::check("\u{201C}"));
    }

    public function testShouldExcludeWhiteColorSwatch(): void
    {
        $this->assertFalse(HasSpecialCharacters::check('⬜'));
    }

    public function testShouldExcludeBlackColorSwatch(): void
    {
        $this->assertFalse(HasSpecialCharacters::check('⬛'));
    }

    public function testShouldExcludeOrangeColorSwatch(): void
    {
        $this->assertFalse(HasSpecialCharacters::check('🟧'));
    }

    public function testShouldIncludeFractions(): void
    {
        $this->assertTrue(HasSpecialCharacters::check('½'));
    }
}
