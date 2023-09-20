export const layoutComponents = (
  board: number[][],
  components: number[][][]
) => {
  let position = {
    top: 0,
    left: 0,
    height: 0,
  };

  components.forEach((component) => {
    // If the component size plus the currently occupied size is larger than the board width, flow to the next line
    const newLine = position.left + component[0].length > board[0].length;
    const left = newLine ? 0 : position.left;
    const top = newLine ? position.top + position.height : position.top;

    // Fill in the individual component bits over the empty board
    component.forEach((row, rowIndex) => {
      row.forEach((bit, bitIndex) => {
        board[rowIndex + top][bitIndex + left] = bit;
      });
    });

    // Update the last position of this component for reference on the next iteration
    position = {
      top: top,
      left: left + component[0].length,
      height: component.length,
    };
  });

  return board;
};
