import { CharacterCode } from "./characterCodes";

export const createEmptyBoard = (
  rows: number,
  columns: number
): Array<number[]> => {
  const result: number[][] = [];

  let i = 0;
  while (i < rows) {
    result[i] = [];
    let i2 = 0;
    while (i2 < columns) {
      result[i][i2] = CharacterCode.Blank;
      i2++;
    }
    i++;
  }

  return result;
};
