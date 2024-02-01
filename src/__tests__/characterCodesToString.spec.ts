import { characterCodesToString } from "../characterCodesToString";

describe("Convert array of array of characters to a string", () => {
  it("Should covert a word to a string", () => {
    const result = characterCodesToString([[1, 2]]);
    expect(result).toEqual("AB");
  });

  it("Should convert two-line sentence", () => {
    const result = characterCodesToString([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [
        20, 8, 9, 19, 0, 9, 19, 0, 1, 0, 12, 15, 14, 7, 5, 18, 0, 2, 12, 15, 3,
        11,
      ],
      [
        20, 8, 1, 20, 0, 19, 16, 1, 14, 19, 0, 28, 0, 12, 9, 14, 5, 19, 0, 0, 0,
        0,
      ],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);

    expect(result).toEqual("THIS IS A LONGER BLOCK THAT SPANS 2 LINES");
  });

  it("Should handle breaks", () => {
    const result = characterCodesToString([
      [0, 0, 8, 1, 14, 4, 12, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [
        0, 0, 2, 18, 5, 1, 11, 19, 0, 7, 18, 1, 3, 5, 6, 21, 12, 12, 25, 0, 0,
        0,
      ],
    ]);

    expect(result).toEqual("HANDLE BREAKS GRACEFULLY");
  });

  it("Should handle line breaks", () => {
    const result = characterCodesToString(
      [
        [1, 2, 0, 0, 0],
        [3, 4, 0, 0, 0],
      ],
      {
        allowLineBreaks: true,
      }
    );

    expect(result).toEqual("AB\nCD");
  });

  it("Should assume there is no line break if the first word can fit on the previous line", () => {
    const result = characterCodesToString(
      [
        [1, 0],
        [2, 0],
      ],
      {
        allowLineBreaks: true,
      }
    );

    expect(result).toEqual("A B");
  });
});
