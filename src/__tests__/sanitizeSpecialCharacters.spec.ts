import { sanitizeSpecialCharacters } from "../sanitizeSpecialCharacters";

describe("Sanitize special characters", () => {
  it("Should not modify text without special characters", () => {
    const text = "abcdefghijklmnopqrstuvwxyz";
    expect(sanitizeSpecialCharacters(text)).toEqual(text);
  });

  it("Should replace special characters with their equivalent", () => {
    const text = "ä";
    expect(sanitizeSpecialCharacters(text)).toEqual("a");
  });

  it("Should handle a sentence or two", () => {
    const text = "hello world";
    expect(sanitizeSpecialCharacters(text)).toEqual("hello world");
  });

  it("Should handle mixed special characters in text", () => {
    const text = "héllö wôrld";
    expect(sanitizeSpecialCharacters(text)).toEqual("hello world");
  });

  it("Should handle multiple special characters together", () => {
    const text = "äëïöü";
    expect(sanitizeSpecialCharacters(text)).toEqual("aeiou");
  });
});
