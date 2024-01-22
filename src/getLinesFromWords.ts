import curry from "lodash/fp/curry";

export const getLinesFromWords = curry((width: number, words: string[]) => {
  const lines = words.reduce(
    (acc: Array<{ line: string; length: number }>, curr: string) => {
      const lastIndex = acc.length - 1;
      const lineLength = acc[lastIndex]["length"];
      const emptyLine = !acc[lastIndex]["line"];

      if (curr === "\n") {
        // finish the line if we hit a new line
        const line = {
          line: acc[lastIndex]["line"],
          length: width,
        };
        const previousLines = acc.splice(0, lastIndex);
        const lines = [...previousLines, line];
        return lines;
      }

      // colors // treat as one bit
      if (curr.startsWith("{") && curr.endsWith("}")) {
        // new line case for colors
        if (1 + lineLength > width) {
          // If a blank space is forced at the beginning of a line, it is ignored.
          if (curr === "{0}") {
            return acc;
          }

          const newLine = {
            line: curr,
            length: 1,
          };
          return [...acc, newLine];
        }
        const line = {
          line: [acc[lastIndex]["line"], curr].join(""),
          length: lineLength + 1,
        };
        const previousLines = acc.splice(0, lastIndex);
        const lines = [...previousLines, line];
        return lines;
        // check to see if word fits, join with previous line
      } else if (width >= curr.length + lineLength && !emptyLine) {
        const line = {
          line: [acc[lastIndex]["line"], curr].join(""),
          length: lineLength + curr.length,
        };
        const previousLines = acc.splice(0, lastIndex);
        const lines = [...previousLines, line];
        return lines;
      }
      // default, new line case
      const newLine = {
        line: curr,
        length: curr.length,
      };
      return [...acc, newLine];
    },
    // keep track of length separate from string since colors count as 1 bit
    [{ line: "", length: 0 }]
  );

  const firstLineEmpty = !lines[0].line;
  // remove 1st line we added for reduces default case
  return firstLineEmpty
    ? lines.slice(1, lines.length).map(({ line }) => line)
    : lines.map(({ line }) => line);
});
