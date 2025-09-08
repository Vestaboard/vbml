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

  it("Should not replace Vestaboard Note hearts", () => {
    const text = "❤️";
    expect(sanitizeSpecialCharacters(text)).toEqual("❤");
  });

  it("Should not replace Vestaboard Note unicode hearts", () => {
    const text = "❤";
    expect(sanitizeSpecialCharacters(text)).toEqual("❤");
  });
});
