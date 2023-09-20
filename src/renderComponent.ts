import curry from "lodash/fp/curry";

export const renderComponent = curry(
  (emptyComponent: number[][], codes: number[][]) =>
    emptyComponent.map((line, index) =>
      line.map((char, charIndex) => codes[index]?.[charIndex] || char)
    )
);
