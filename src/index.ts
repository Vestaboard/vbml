import "./characterCodes";
import { createEmptyBoard } from "./createEmptyBoard";
import { layoutComponents } from "./layoutComponents";
import { parseAbsoluteComponent, parseComponent } from "./parseComponent";
import { IVBML, Position } from "./types";
import { characterCodesToString } from "./characterCodesToString";
import { characterCodesToAscii } from "./characterCodesToAscii";
import { copyCharacterCodes } from "./copyCharacterCodes";

// Flagship size
const BOARD_ROWS = 6;
const BOARD_COLUMNS = 22;

export const vbml = {
  parse: (input: IVBML): Array<number[]> => {
    const height = input?.style?.height || BOARD_ROWS;
    const width = input?.style?.width || BOARD_COLUMNS;
    const emptyBoard = createEmptyBoard(height, width);

    const components = input.components
      .filter((component) => !component.style?.absolutePosition)
      .map(parseComponent(height, width, input.props));

    const absoluteComponents = input.components
      .filter((component) => !!component.style?.absolutePosition)
      .map(parseAbsoluteComponent(height, width, input.props));

    return layoutComponents(emptyBoard, components, absoluteComponents);
  },
  characterCodesToString,
  characterCodesToAscii,
  copyCharacterCodes,
};

export * from "./types";
