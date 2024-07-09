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
  Filled,
}

const VestaboardCharactersCodeMap = {
  " ": VestaboardCharacter.Blank,
  A: VestaboardCharacter.A,
  B: VestaboardCharacter.B,
  C: VestaboardCharacter.C,
  //do the rest
  D: VestaboardCharacter.D,
  E: VestaboardCharacter.E,
  F: VestaboardCharacter.F,
  G: VestaboardCharacter.G,
  H: VestaboardCharacter.H,
  I: VestaboardCharacter.I,
  J: VestaboardCharacter.J,
  K: VestaboardCharacter.K,
  L: VestaboardCharacter.L,
  M: VestaboardCharacter.M,
  N: VestaboardCharacter.N,
  O: VestaboardCharacter.O,
  P: VestaboardCharacter.P,
  Q: VestaboardCharacter.Q,
  R: VestaboardCharacter.R,
  S: VestaboardCharacter.S,
  T: VestaboardCharacter.T,
  U: VestaboardCharacter.U,
  V: VestaboardCharacter.V,
  W: VestaboardCharacter.W,
  X: VestaboardCharacter.X,
  Y: VestaboardCharacter.Y,
  Z: VestaboardCharacter.Z,
  "1": VestaboardCharacter.One,
  "2": VestaboardCharacter.Two,
  "3": VestaboardCharacter.Three,
  "4": VestaboardCharacter.Four,
  "5": VestaboardCharacter.Five,
  "6": VestaboardCharacter.Six,
  "7": VestaboardCharacter.Seven,
  "8": VestaboardCharacter.Eight,
  "9": VestaboardCharacter.Nine,
  "0": VestaboardCharacter.Zero,
  "!": VestaboardCharacter.ExclamationMark,
  "@": VestaboardCharacter.AtSign,
  "#": VestaboardCharacter.PoundSign,
  $: VestaboardCharacter.DollarSign,
  "(": VestaboardCharacter.LeftParen,
  ")": VestaboardCharacter.RightParen,
  "-": VestaboardCharacter.Hyphen,
  // " ": VestaboardCharacter.Missing,
  // " ": VestaboardCharacter.Missing2,
  "+": VestaboardCharacter.PlusSign,
  "&": VestaboardCharacter.Ampersand,
  "=": VestaboardCharacter.EqualsSign,
  ";": VestaboardCharacter.Semicolon,
  ":": VestaboardCharacter.Colon,
  // " ": VestaboardCharacter.Missing3,
  "'": VestaboardCharacter.SingleQuote,
  '"': VestaboardCharacter.DoubleQuote,
  "%": VestaboardCharacter.PercentSign,
  ",": VestaboardCharacter.Comma,
  ".": VestaboardCharacter.Period,
  // " ": VestaboardCharacter.Missing4,
  // " ": VestaboardCharacter.Missing5,
  "/": VestaboardCharacter.Slash,
  "?": VestaboardCharacter.QuestionMark,
  // " ": VestaboardCharacter.Missing6,
  "°": VestaboardCharacter.DegreeSign,
  "{63}": VestaboardCharacter.PoppyRed,
  "{64}": VestaboardCharacter.Orange,
  "{65}": VestaboardCharacter.Yellow,
  "{66}": VestaboardCharacter.Green,
  "{67}": VestaboardCharacter.ParisBlue,
  "{68}": VestaboardCharacter.Violet,
  "{69}": VestaboardCharacter.White,
  "{70}": VestaboardCharacter.Black,
  "{71}": VestaboardCharacter.Filled,
};

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
    const lineLength = annotatedWords.reduce((acc, word) => acc + word[1], 0);
    return {
      annotatedWords,
      lineLength,
      nestedLineCount: Math.ceil(lineLength / columnCount),
    };
  };

  const formattedLines = chunkedLines.reduce((acc, line) => {
    const { annotatedWords, nestedLineCount } = annotateWordLength(line);
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
