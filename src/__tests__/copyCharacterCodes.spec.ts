import { copyCharacterCodes } from "../copyCharacterCodes";

describe("Copy character codes", () => {
  it("Should deep copy character codes", () => {
    const characters = [[1, 2]];
    const result = copyCharacterCodes(characters);
    expect(result).toEqual([[1, 2]]);
    expect(result).not.toBe(characters);

    characters[0][0] = 3;
    expect(result[0][0]).toEqual(1);
  });
});
