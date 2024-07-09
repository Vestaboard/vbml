enum VestaboardCharacter {
  Blank,
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  K,
  L,
  M,
  N,
  O,
  P,
  Q,
  R,
  S,
  T,
  U,
  V,
  W,
  X,
  Y,
  Z,
  One,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Zero,
  ExclamationMark,
  AtSign,
  PoundSign,
  DollarSign,
  LeftParen,
  RightParen,
  Hyphen,
  Missing,
  Missing2,
  PlusSign,
  Ampersand,
  EqualsSign,
  Semicolon,
  Colon,
  Missing3,
  SingleQuote,
  DoubleQuote,
  PercentSign,
  Comma,
  Period,
  Missing4,
  Missing5,
  Slash,
  QuestionMark,
  Missing6,
  DegreeSign,
  PoppyRed,
  Orange,
  Yellow,
  Green,
  ParisBlue,
  Violet,
  White,
  Black,
}

// KMM format
export function classic(text: string): string {
  const rowCount = 6;
  const columnCount = 22;
  const lines = text.split("\n");
  const wordCharCodeRegex = /[a-zA-Z]+|{.\d}+|\d+|\s+/g;

  const chunkedLines = lines.map((line) => {
    const words = line.match(wordCharCodeRegex);
    return words;
  });
  console.log(chunkedLines, "::chunkedLines");

  // break up lines/words that are too long into more lines
  const lineCount = chunkedLines.reduce(
    (acc, line) => acc + Math.ceil(line.length / columnCount),
    0
  );
//   const countNestedLines = (line: Array<string>) => {
//     const lineLength = line.reduce((acc, word) => {
//       if ((word.includes("{") && word.includes("}")) || word === " ") {
//         return acc + 1;
//       }
//       return acc + word.length;
//     }, 0);

//     return Math.ceil(lineLength / columnCount);
//   };

  const annotateWordLength = (line: Array<string>) => {
    const annotatedWords = line.reduce((acc, word) => {
      if ((word.includes("{") && word.includes("}")) || word === " ") {
        return [word, 1];
      }
      return [word, word.length];
    }, []);
    const lineLength = annotatedWords.reduce((acc, word) => acc + word[1], 0)
    return { annotatedWords, lineLength, nestedLineCount: Math.ceil(lineLength / columnCount)};
  };

  const formattedLines = chunkedLines.reduce((acc, line) => {
    const {annotatedWords, nestedLineCount} = annotateWordLength(line);
    console.log(nestedLineCount, "::nestedLineCount");
    if (nestedLineCount > 1) {
      const newLines = Array(nestedLineCount).fill([]);
      let currentLineIndex = 0;

      return acc.concat(newLines);
    }
    return acc.concat(line);
  }, []);

  console.log(formattedLines, "::formattedLines");

  const blankBoard = Array(rowCount).fill(Array(columnCount).fill(" "));
  //   const filledBoard = blankBoard.map((row, rowIndex) => {
  //     return row.map((_, columnIndex) => {

  //     });
  //   })

  //   console.log(lineCount)
  return formattedLines.join("\n");
}
