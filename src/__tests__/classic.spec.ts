import { classic } from "../classic";

describe("Classic", () => {
  it("Should convert string to classic board", () => {
    const mockBoard = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [
        0, 0, 0, 0, 8, 5, 12, 12, 15, 55, 0, 23, 15, 18, 12, 4, 37, 0, 0, 0, 0,
        0,
      ],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const string = "Hello, World!";
    const classicBoard = classic(string);
    expect(classicBoard).toEqual(mockBoard);
  });

  it("Should convert embedded char code string to classic board", () => {
    const mockBoard = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [
        0, 8, 5, 12, 12, 15, 55, 0, 23, 15, 18, 12, 4, 37, 0, 29, 33, 0, 0, 0,
        0, 0,
      ],
      [
        0, 65, 32, 32, 65, 0, 34, 35, 65, 0, 65, 28, 36, 0, 8, 5, 12, 12, 15, 0,
        0, 0,
      ],
      [
        0, 23, 15, 18, 12, 4, 0, 23, 8, 1, 20, 19, 21, 16, 0, 0, 0, 0, 0, 0, 0,
        0,
      ],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const string =
      "Hello, World{37} 37 {65}66{65} 89{65} {65}20 hello world whatsup";
    const classicBoard = classic(string, 0);
    expect(classicBoard).toEqual(mockBoard);
  });

  it("Should convert longer string to classic board", () => {
    const string = "reallylongwordthatismorethantwentytwocharcters";
    const classicBoard = classic(string);
    expect(classicBoard).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [
        0, 18, 5, 1, 12, 12, 25, 12, 15, 14, 7, 23, 15, 18, 4, 20, 8, 1, 20, 0,
        0, 0,
      ],
      [
        0, 9, 19, 13, 15, 18, 5, 20, 8, 1, 14, 20, 23, 5, 14, 20, 25, 20, 23, 0,
        0, 0,
      ],
      [0, 15, 3, 8, 1, 18, 3, 20, 5, 18, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });

  it("Should convert long string with digits to classic board", () => {
    const string = "reallylongwordthatismorethan22charcters";
    const classicBoard = classic(string);
    expect(classicBoard).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [
        18, 5, 1, 12, 12, 25, 12, 15, 14, 7, 23, 15, 18, 4, 20, 8, 1, 20, 9, 19,
        13, 15,
      ],
      [
        18, 5, 20, 8, 1, 14, 28, 28, 3, 8, 1, 18, 3, 20, 5, 18, 19, 0, 0, 0, 0,
        0,
      ],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });

  it("Should convert single new line string to classic board", () => {
    const string = `hello
    world`;
    const classicBoard = classic(string);
    expect(classicBoard).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 8, 5, 12, 12, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 23, 15, 18, 12, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });

  it("Should convert double newline string to classic board", () => {
    const string = `hello\n\nworld`;
    const classicBoard = classic(string);
    expect(classicBoard).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 8, 5, 12, 12, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 23, 15, 18, 12, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });
  it("Should convert string to classic board", () => {
    const string = ``;
    const classicBoard = classic(string);
    const emptyRow = new Array(22).fill(0);

    expect(classicBoard).toEqual([
      emptyRow,
      emptyRow,
      emptyRow,
      emptyRow,
      emptyRow,
      emptyRow,
    ]);
  });

  it("Should convert char code 1 string to classic board with `a`", () => {
    const string = `{1}`;
    const classicBoard = classic(string);
    expect(classicBoard).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });
  it("Should convert hyphen string to classic board", () => {
    const string = `- -hyphen`;
    const classicBoard = classic(string);
    expect(classicBoard).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 44, 0, 44, 8, 25, 16, 8, 5, 14, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });

  it("Should convert special character strings to classic board", () => {
    const string = `!@#$%^&*()_+åß∂ƒ©˙∆˚¬µ√ç∫˜µ≤≥÷{}`;
    const classicBoard = classic(string);
    expect(classicBoard).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [
        37, 38, 39, 40, 54, 0, 47, 0, 41, 42, 46, 1, 0, 0, 6, 0, 0, 0, 0, 0, 0,
        0,
      ],
      [3, 0, 0, 0, 0, 0, 0, 41, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });

  it("Should convert emoji colors to classic board", () => {
    const string = "🟥🟧🟨🟩🟦🟪⬜⬛";
    const classicBoard = classic(string);
    expect(classicBoard).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [
        0, 0, 0, 0, 0, 0, 63, 64, 65, 66, 67, 68, 69, 70, 0, 0, 0, 0, 0, 0, 0,
        0,
      ],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });
});
