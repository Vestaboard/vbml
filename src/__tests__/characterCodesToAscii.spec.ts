import { characterCodesToAscii } from "../characterCodesToAscii";

describe("Character codes to ASCII", () => {
  it("Should convert colors", () => {
    const result = characterCodesToAscii([[63, 64, 65, 66, 67, 68, 69, 70]]);
    expect(result).toEqual("🟥🟧🟨🟩🟦🟪⬜⬛");
  });
  it("Should handle rows", () => {
    const result = characterCodesToAscii([
      [63, 64],
      [63, 64],
    ]);
    expect(result).toEqual(`🟥🟧\n\n🟥🟧`);
  });
  it("Should space out letters", () => {
    const result = characterCodesToAscii([[1, 2]]);
    expect(result).toEqual(`A B `);
  });
});
