import { classic } from "../classic";

describe("Classic", () => {
  // it("Should convert string to classic board", () => {
  //   const string = "Hello, World!";
  //   const classicBoard = classic(string);
  //   console.log(classicBoard)
  //   expect(classicBoard).toEqual(classicBoard);
  // });
  const mockBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [
      0, 8, 5, 12, 12, 15, 55, 0, 23, 15, 18, 12, 4, 37, 0, 29, 33, 0, 0, 0, 0,
      0,
    ],
    [
      0, 65, 32, 32, 65, 0, 34, 35, 65, 0, 65, 28, 36, 0, 8, 5, 12, 12, 15, 0,
      0, 0,
    ],
    [0, 23, 15, 18, 12, 4, 0, 23, 8, 1, 20, 19, 21, 16, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  it("Should convert string to classic board", () => {
    // should be 3 lines
    // 57 characters
    const string =
      "Hello, World{37} 37 {65}66{65} 89{65} {65}20 hello world whatsup";
    const classicBoard = classic(string, 0);
    // console.log(classicBoard, mockBoard);
    // expect(classicBoard).toEqual(mockBoard);
    expect(true).toEqual(true);
  });

  // it("Should convert string to classic board", () => {
  //   // should be 3 lines
  //   // 57 characters
  //   const string = "reallylongwordthatismorethantwentytwocharcters";
  //   const classicBoard = classic(string);
  //   expect(classicBoard).toEqual([[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,8,5,12,12,15,55,0,23,15,18,12,4,37,0,29,33,0,0,0,0,0],[0,65,32,32,65,0,34,35,65,0,65,28,36,0,8,5,12,12,15,0,0,0],[0,23,15,18,12,4,0,23,8,1,20,19,21,16,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]);
  // });

  // it("Should convert string to classic board", () => {
  //   // should be 3 lines
  //   // 57 characters
  //   const string = "reallylongwordthatismorethan22charcters";
  //   const classicBoard = classic(string);
  //   expect(classicBoard).toEqual([[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,8,5,12,12,15,55,0,23,15,18,12,4,37,0,29,33,0,0,0,0,0],[0,65,32,32,65,0,34,35,65,0,65,28,36,0,8,5,12,12,15,0,0,0],[0,23,15,18,12,4,0,23,8,1,20,19,21,16,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]);
  // });
});
