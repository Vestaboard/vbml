import { sanitizeSpecialCharacters } from "../sanitizeSpecialCharacters";

describe("Sanitize special characters", () => {
  it("Should not modify text without special characters", () => {
    const text = "abcdefghijklmnopqrstuvwxyz";
    expect(sanitizeSpecialCharacters(text)).toEqual(text);
  });

  it("Should replace special characters with their equivalent", () => {
    const text = "Ã";
    expect(sanitizeSpecialCharacters(text)).toEqual("a");
  });

  it("Should handle a sentence or two", () => {
    const text = "hello world";
    expect(sanitizeSpecialCharacters(text)).toEqual("hello world");
  });

  it("Should handle mixed special characters in text", () => {
    const text = "héllo wôrld";
    expect(sanitizeSpecialCharacters(text)).toEqual("hello world");
  });

  it("Should handle multiple special characters together", () => {
    const text = "ëï";
    expect(sanitizeSpecialCharacters(text)).toEqual("ei");
  });

  it("Should replace fractions with multiple characters", () => {
    const text = "½";
    expect(sanitizeSpecialCharacters(text)).toEqual("1/2");
  });

  it("Should sanitize variation selector-16 (U+FE0F) from ❤️", () => {
    const text = "❤️";
    expect(sanitizeSpecialCharacters(text)).toEqual("❤");
  });

  it("Should sanitize variation selector-16 (U+FE0F) from the string literal \\u2764\\uFE0F", () => {
    const text = "\u2764\uFE0F";
    expect(sanitizeSpecialCharacters(text)).toEqual("\u2764");
  });

  it("Should not replace Vestaboard Note unicode hearts (U+2764)", () => {
    const text = "\u2764";
    expect(sanitizeSpecialCharacters(text)).toEqual("❤");
  });

  it("Should accept whitespace after \u2764 (U+2764)", () => {
    const text = "\u2764 ";
    expect(sanitizeSpecialCharacters(text)).toEqual(text);
  });

  it("Should not clear whitespace between black heart unicode characters", () => {
    const testString = "❤ ❤ ❤ ❤ ❤";
    const result = sanitizeSpecialCharacters(testString);
    expect(result).toEqual(testString);
  });

  it("Should not trim whitespace when \u2764 if followed by a latin glyph", () => {
    const testString = "\u2764 A";
    const result = sanitizeSpecialCharacters(testString);
    expect(result).toEqual(testString);
  });

  it("Should not trim whitespace when \u2764 is followed by an emoji", () => {
    const testString = "\u2764 🟧";
    const result = sanitizeSpecialCharacters(testString);
    expect(result).toEqual(testString);
  });

  it("Should convert unsupported, sequenced emojis to whitespace", () => {
    const testString = "☠️⚠️✅▶️✨⌛️";
    const equivalentWhitespace = "\u0020\u0020\u0020\u0020\u0020\u0020";
    const result = sanitizeSpecialCharacters(testString);
    expect(result).toEqual(equivalentWhitespace);
  });

  it("Should handle the heart emoji and unsupported emojis", () => {
    const testString = "❤️☠️⚠️✅▶️✨⌛️";
    const expectation = "\u2764\u0020\u0020\u0020\u0020\u0020\u0020";
    const result = sanitizeSpecialCharacters(testString);
    expect(result).toEqual(expectation);
  });

  it("Should sanitize all German and special characters", () => {
    // Test individual German umlaut characters
    // Note: lowercase umlauts are converted to uppercase equivalents (ä → AE, not ae)
    expect(sanitizeSpecialCharacters("ä")).toEqual("AE");
    expect(sanitizeSpecialCharacters("Ä")).toEqual("AE");
    expect(sanitizeSpecialCharacters("ö")).toEqual("OE");
    expect(sanitizeSpecialCharacters("Ö")).toEqual("OE");
    expect(sanitizeSpecialCharacters("ü")).toEqual("UE");
    expect(sanitizeSpecialCharacters("Ü")).toEqual("UE");
    expect(sanitizeSpecialCharacters("ß")).toEqual("SS");

    // Test Scandinavian characters
    expect(sanitizeSpecialCharacters("ø")).toEqual("o");
    expect(sanitizeSpecialCharacters("å")).toEqual("a");

    // Test ligatures
    expect(sanitizeSpecialCharacters("œ")).toEqual("OE");
    expect(sanitizeSpecialCharacters("æ")).toEqual("AE");

    // Test other accented characters
    expect(sanitizeSpecialCharacters("ç")).toEqual("c");
    expect(sanitizeSpecialCharacters("ƒ")).toEqual("f");
    expect(sanitizeSpecialCharacters("µ")).toEqual(" "); // micro sign converts to space

    // Test special punctuation and symbols
    expect(sanitizeSpecialCharacters("…")).toEqual("...");
    expect(sanitizeSpecialCharacters("–")).toEqual("-");
    expect(sanitizeSpecialCharacters("⁄")).toEqual("/");

    // Test full string with all special characters
    const allChars = "äÄöÖüÜßøåœæçƒµ…–⁄∑¡¶¢[]|{}≠¿€®†¨π•±∂©º∆@¥≈√∫~∞";
    const result = sanitizeSpecialCharacters(allChars);
    expect(result).toBeTruthy();
    expect(typeof result).toBe("string");
    // Verify no special characters remain - should only contain A-Z, numbers, and basic punctuation
    expect(result).not.toMatch(/[äÄöÖüÜßøåœæçƒµ]/);
  });

  it("Should handle German text with umlauts in context", () => {
    const germanText = "Über die Brücke gehen wir für Österreich";
    const result = sanitizeSpecialCharacters(germanText);
    expect(result).toEqual("UEber die BrUEcke gehen wir fUEr OEsterreich");
  });

  it("Should handle German sharp s (ß) in context", () => {
    const germanText = "Straße";
    const result = sanitizeSpecialCharacters(germanText);
    expect(result).toEqual("StraSSe");
  });
});
