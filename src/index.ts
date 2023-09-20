import "./characterCodes";
import { createEmptyBoard } from "./createEmptyBoard";
import { layoutComponents } from "./layoutComponents";
import { parseComponent } from "./parseComponent";
import { IVBML } from "./types";

// Flagship size
const BOARD_ROWS = 6;
const BOARD_COLUMNS = 22;

export const vbml = {
  parse: (input: IVBML): Array<number[]> => {
    const height = input?.style?.height || BOARD_ROWS;
    const width = input?.style?.width || BOARD_COLUMNS;
    const emptyBoard = createEmptyBoard(height, width);

    const components = input.components.map(
      parseComponent(height, width, input.props)
    );

    return layoutComponents(emptyBoard, components);
  },
};
