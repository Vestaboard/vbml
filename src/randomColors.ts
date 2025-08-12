export const colorCodes = [63, 64, 65, 66, 67, 68, 69, 70];

export const randomColors = (
  rows: number = 6,
  columns: number = 22,
  colors: number[] = colorCodes
) => {
  const board: number[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: number[] = [];
    for (let c = 0; c < columns; c++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      row.push(color);
    }
    board.push(row);
  }
  return board;
};
