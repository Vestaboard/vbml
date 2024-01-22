import { Justify } from "./types";
import { CharacterCode } from "./characterCodes";
import curry from "lodash/fp/curry";

export const horizontalAlign = curry(
  (width: number, justify: Justify, codes: number[][]) => {
    switch (justify) {
      case Justify.left:
        return codes.map((row) => {
          const rowWithoutLeadingZero = removeExtraSpace(row);
          return rowWithoutLeadingZero.row;
        });
      case Justify.right:
        return codes.map((row) => {
          const reversedRow = row.reverse();
          const rowWithoutTrailingZero = removeExtraSpace(reversedRow);
          return Array(width)
            .fill(CharacterCode.Blank)
            .map(
              (_, index) =>
                rowWithoutTrailingZero.row[width - 1 - index] ||
                CharacterCode.Blank
            );
        });
      case Justify.justified:
        const rows = codes.map((row) => removeExtraSpace(row).row);
        const longestRow =
          rows.reduce((prev, current) => {
            return current.length > prev ? current.length : prev;
          }, 0) - 1;
        const paddingRight = +Math.floor((width - longestRow) / 2);
        const paddingLeft = width - (longestRow + (paddingRight + 1));
        const padding = paddingRight > paddingLeft ? paddingLeft : paddingRight;

        return rows.map((row) => {
          return Array(width)
            .fill(CharacterCode.Blank)
            .map((_, index) => row[index - padding] || CharacterCode.Blank);
        });
      default:
        return codes.map((row) => {
          const reversedRow = row.reverse();
          const rowWithoutTrailing0 =
            removeExtraSpace(reversedRow).row.reverse();
          const paddingLeft = Math.floor(
            (width - rowWithoutTrailing0.length) / 2
          );
          return Array(width)
            .fill(CharacterCode.Blank)
            .map(
              (_, index) =>
                rowWithoutTrailing0[index - paddingLeft] || CharacterCode.Blank
            );
        });
    }
  }
);

const removeExtraSpace = (row: number[]) => {
  return row.reduce(
    (acc, cur) => {
      if (cur === CharacterCode.Blank && acc.extraSpace) {
        return {
          row: [...acc.row],
          extraSpace: true,
        };
      } else {
        return {
          row: [...acc.row, cur],
          extraSpace: false,
        };
      }
    },
    {
      row: [],
      extraSpace: true,
    }
  );
};
