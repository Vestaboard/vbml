import { hasSpecialCharacters } from "../hasSpecialCharacters";

describe("hasSpecialCharacters", () => {
  it("should return true if text contains special characters", () => {
    const text = "ä";
    expect(hasSpecialCharacters(text)).toBeTruthy();
  });

  it("should return false if text does not contain special characters", () => {
    const text = "abcdefghijklmnopqrstuvwxyz";
    expect(hasSpecialCharacters(text)).toBeFalsy();
  });

  it("should return false if text does not contain special characters (uppercased)", () => {
    const text = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    expect(hasSpecialCharacters(text)).toBeFalsy();
  });

  it("Should return false if text is standard numbers", () => {
    const text = "0123456789";
    expect(hasSpecialCharacters(text)).toBeFalsy();
  });

  it("Should return false if text is standard symbols supported by Vestaboard", () => {
    const text = "!@#$()-+&=;:'\"%,./?°";
    expect(hasSpecialCharacters(text)).toBeFalsy();
  });

  it("should return false if text is empty", () => {
    const text = "";
    expect(hasSpecialCharacters(text)).toBeFalsy();
  });
});
