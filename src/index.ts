import "./characterCodes";

import { parseAbsoluteComponent, parseComponent } from "./parseComponent";

import { IVBML } from "./types";
import { characterCodesToAscii } from "./characterCodesToAscii";
import { characterCodesToString } from "./characterCodesToString";
import { classic } from "./classic";
import { copyCharacterCodes } from "./copyCharacterCodes";
import { createEmptyBoard } from "./createEmptyBoard";
import { hasSpecialCharacters } from "./hasSpecialCharacters";
import { layoutComponents } from "./layoutComponents";
import { makeCalendar } from "./calendar";
import { parseCalendarComponent } from "./parseCalendarComponent";
import { sanitizeSpecialCharacters } from "./sanitizeSpecialCharacters";

// Flagship size
const BOARD_ROWS = 6;
const BOARD_COLUMNS = 22;

export const vbml = {
  parse: (input: IVBML): Array<number[]> => {
    const height = input?.style?.height || BOARD_ROWS;
    const width = input?.style?.width || BOARD_COLUMNS;
    const emptyBoard = createEmptyBoard(height, width);

    const components = input.components
      .filter((component) => !component?.style?.absolutePosition)
      .map(parseComponent(height, width, input.props));

    const absoluteComponents = input.components
      .filter(
        (component) =>
          !("calendar" in component) && !!component?.style?.absolutePosition
      )
      .map(parseAbsoluteComponent(height, width, input.props));

    const calendarComponents = input.components
      .filter(
        // check typeof to see if calendar component
        (component) => "calendar" in component
      )
      .map((component) => {
        if (!("calendar" in component)) {
          return;
        }
        const {
          month,
          year,
          days,
          defaultDayColor,
          hideSMTWTFS,
          hideDates,
          hideMonthYear,
        } = component?.calendar;
        const x = component.style?.absolutePosition?.x || 0;
        const calendar = makeCalendar(
          month,
          year,
          days,
          defaultDayColor,
          hideSMTWTFS,
          hideDates,
          hideMonthYear
        );
        return parseCalendarComponent(calendar, x);
      });

    return layoutComponents(
      emptyBoard,
      components,
      absoluteComponents,
      calendarComponents
    );
  },
  characterCodesToString,
  characterCodesToAscii,
  copyCharacterCodes,
  classic,
  hasSpecialCharacters,
  sanitizeSpecialCharacters,
};

export * from "./types";
