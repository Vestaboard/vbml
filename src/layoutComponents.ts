export const layoutComponents = (
  board: number[][],
  components: number[][][],
  absoluteComponents: { characters: number[][]; x: number; y: number }[],
  calendarComponents?: { characters: number[][]; x: number }[]
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

  absoluteComponents &&
    absoluteComponents.forEach((component) => {
      component.characters.forEach((row, rowIndex) => {
        row.forEach((bit, bitIndex) => {
          // make sure we are in bounds, truncate the rest for now
          if (component.y + rowIndex >= board.length) {
            return;
          }
          if (component.x + bitIndex >= board[0].length) {
            return;
          }
          board[rowIndex + component.y][bitIndex + component.x] = bit;
        });
      });
    });

  calendarComponents &&
    calendarComponents.forEach((component) => {
      component.characters.forEach((row, rowIndex) => {
        row.forEach((bit, bitIndex) => {
          // make sure we are in bounds, truncate the rest for now
          if (rowIndex >= board.length) {
            return;
          }
          // calendars are always 12 wide
          if (
            component.x + bitIndex >= board[0].length ||
            component.x + bitIndex > 12
          ) {
            return;
          }
          board[rowIndex][bitIndex + component.x] = bit;
        });
      });
    });

  return board;
};
