<?php

namespace Vestaboard\Vbml\Tests;

use PHPUnit\Framework\TestCase;
use Vestaboard\Vbml\SanitizeSpecialCharacters;

class SanitizeSpecialCharactersTest extends TestCase
{
    public function testShouldNotModifyTextWithoutSpecialChars(): void
    {
        $text = 'abcdefghijklmnopqrstuvwxyz';
        $this->assertEquals($text, SanitizeSpecialCharacters::sanitize($text));
    }

    public function testShouldReplaceSpecialCharacters(): void
    {
        $this->assertEquals('a', SanitizeSpecialCharacters::sanitize('Ã'));
    }

    public function testShouldHandleSentence(): void
    {
        $this->assertEquals('hello world', SanitizeSpecialCharacters::sanitize('hello world'));
    }

    public function testShouldHandleMixedSpecialCharacters(): void
    {
        $this->assertEquals('hello world', SanitizeSpecialCharacters::sanitize('héllo wôrld'));
    }

    public function testShouldHandleMultipleSpecialCharactersTogether(): void
    {
        $this->assertEquals('ei', SanitizeSpecialCharacters::sanitize('ëï'));
    }

    public function testShouldReplaceFractionsWithMultipleCharacters(): void
    {
        $this->assertEquals('1/2', SanitizeSpecialCharacters::sanitize('½'));
    }

    public function testShouldSanitizeVariationSelectorFromHeartEmoji(): void
    {
        $text = "❤️"; // U+2764 U+FE0F
        $this->assertEquals('❤', SanitizeSpecialCharacters::sanitize($text));
    }

    public function testShouldSanitizeVariationSelectorFromLiteral(): void
    {
        $text = "\u{2764}\u{FE0F}";
        $this->assertEquals("\u{2764}", SanitizeSpecialCharacters::sanitize($text));
    }

    public function testShouldNotReplaceVestaboardHeart(): void
    {
        $text = "\u{2764}";
        $this->assertEquals('❤', SanitizeSpecialCharacters::sanitize($text));
    }

    public function testShouldAcceptWhitespaceAfterHeart(): void
    {
        $text = "\u{2764} ";
        $this->assertEquals($text, SanitizeSpecialCharacters::sanitize($text));
    }

    public function testShouldNotClearWhitespaceBetweenHearts(): void
    {
        $testString = "❤ ❤ ❤ ❤ ❤";
        $this->assertEquals($testString, SanitizeSpecialCharacters::sanitize($testString));
    }

    public function testShouldNotTrimWhitespaceWhenHeartFollowedByLatin(): void
    {
        $testString = "\u{2764} A";
        $this->assertEquals($testString, SanitizeSpecialCharacters::sanitize($testString));
    }

    public function testShouldNotTrimWhitespaceWhenHeartFollowedByEmoji(): void
    {
        $testString = "\u{2764} 🟧";
        $this->assertEquals($testString, SanitizeSpecialCharacters::sanitize($testString));
    }

    public function testShouldConvertUnsupportedEmojisToWhitespace(): void
    {
        $testString = "☠️⚠️✅▶️✨⌛️";
        $equivalentWhitespace = "      "; // 6 spaces
        $this->assertEquals($equivalentWhitespace, SanitizeSpecialCharacters::sanitize($testString));
    }

    public function testShouldHandleHeartEmojiAndUnsupportedEmojis(): void
    {
        $testString = "❤️☠️⚠️✅▶️✨⌛️";
        $expectation = "\u{2764}      "; // U+2764 + 6 spaces
        $this->assertEquals($expectation, SanitizeSpecialCharacters::sanitize($testString));
    }

    public function testShouldSanitizeGermanAndSpecialCharacters(): void
    {
        $this->assertEquals('AE', SanitizeSpecialCharacters::sanitize('ä'));
        $this->assertEquals('AE', SanitizeSpecialCharacters::sanitize('Ä'));
        $this->assertEquals('OE', SanitizeSpecialCharacters::sanitize('ö'));
        $this->assertEquals('OE', SanitizeSpecialCharacters::sanitize('Ö'));
        $this->assertEquals('UE', SanitizeSpecialCharacters::sanitize('ü'));
        $this->assertEquals('UE', SanitizeSpecialCharacters::sanitize('Ü'));
        $this->assertEquals('SS', SanitizeSpecialCharacters::sanitize('ß'));

        $this->assertEquals('o', SanitizeSpecialCharacters::sanitize('ø'));
        $this->assertEquals('a', SanitizeSpecialCharacters::sanitize('å'));

        $this->assertEquals('OE', SanitizeSpecialCharacters::sanitize('œ'));
        $this->assertEquals('AE', SanitizeSpecialCharacters::sanitize('æ'));

        $this->assertEquals('c', SanitizeSpecialCharacters::sanitize('ç'));
        $this->assertEquals('f', SanitizeSpecialCharacters::sanitize('ƒ'));
        $this->assertEquals(' ', SanitizeSpecialCharacters::sanitize('µ'));

        $this->assertEquals('...', SanitizeSpecialCharacters::sanitize('…'));
        $this->assertEquals('-', SanitizeSpecialCharacters::sanitize('–'));
        $this->assertEquals('/', SanitizeSpecialCharacters::sanitize('⁄'));

        $allChars = "äÄöÖüÜßøåœæçƒµ…–⁄∑¡¶¢[]|{}≠¿€®†¨π•±∂©º∆@¥≈√∫~∞";
        $result = SanitizeSpecialCharacters::sanitize($allChars);
        $this->assertNotEmpty($result);
        $this->assertIsString($result);
        $this->assertDoesNotMatchRegularExpression('/[äÄöÖüÜßøåœæçƒµ]/u', $result);
    }

    public function testShouldHandleGermanTextWithUmlauts(): void
    {
        $germanText = 'Über die Brücke gehen wir für Österreich';
        $result = SanitizeSpecialCharacters::sanitize($germanText);
        $this->assertEquals('UEber die BrUEcke gehen wir fUEr OEsterreich', $result);
    }

    public function testShouldHandleGermanSharpS(): void
    {
        $germanText = 'Straße';
        $result = SanitizeSpecialCharacters::sanitize($germanText);
        $this->assertEquals('StraSSe', $result);
    }

    public function testShouldConvertScharfesToSS(): void
    {
        $texts    = ['ß', 'Straße', 'fußball', 'groß', 'weiß'];
        $expected = ['SS', 'StraSSe', 'fuSSball', 'groSS', 'weiSS'];

        foreach ($texts as $i => $text) {
            $this->assertEquals($expected[$i], SanitizeSpecialCharacters::sanitize($text));
        }
    }
}
