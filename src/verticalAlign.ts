import { Align } from "./types";
import curry from "lodash/fp/curry";

export const verticalAlign = curry(
  (height: number, align: Align, codes: number[][]) => {
    switch (align) {
      case Align.top:
        return codes;
      case Align.bottom:
        const reversedCodes = codes.reverse();
        return Array(height)
          .fill([])
          .map((_, index) => reversedCodes[height - 1 - index] || []);
      default:
        const paddingTop = Math.floor((height - codes.length) / 2);
        return Array(height)
          .fill([])
          .map((_, index) => codes[index - paddingTop] || []);
    }
  }
);
