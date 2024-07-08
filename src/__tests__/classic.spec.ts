
import { classic } from "../classic";

describe("Classic", () => {
  it("Should convert string to classic board", () => {
    const string = "Hello, World!";
    const classicBoard = classic(string);
    console.log(classicBoard)
    expect(classicBoard).toEqual(classicBoard);
  });
  it("Should convert string to classic board", () => {
    const string = "Hello, World{37}";
    const classicBoard = classic(string);
    console.log(classicBoard)
    expect(classicBoard).toEqual(classicBoard);
  });
});



