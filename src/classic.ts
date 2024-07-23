// ░█░█░█▀▀░█▀▀░▀█▀░█▀█░█▀▄░█▀█░█▀█░█▀▄░█▀▄░░░█▀▀░█░░░█▀█░█▀▀░█▀▀░▀█▀░█▀▀
// ░▀▄▀░█▀▀░▀▀█░░█░░█▀█░█▀▄░█░█░█▀█░█▀▄░█░█░░░█░░░█░░░█▀█░▀▀█░▀▀█░░█░░█░░
// ░░▀░░▀▀▀░▀▀▀░░▀░░▀░▀░▀▀░░▀▀▀░▀░▀░▀░▀░▀▀░░░░▀▀▀░▀▀▀░▀░▀░▀▀▀░▀▀▀░▀▀▀░▀▀▀
// A direct translation of formatter.kt to TypeScript from the KMM project

// https://docs.vestaboard.com/docs/characterCodes
enum VestaboardCharacter {
  Blank, // 0
  A, // 1
  B, // 2
  C, // 3
  D, // 4
  E, // 5
  F, // 6
  G, // 7
  H, // 8
  I, // 9
  J, // 10
  K, // 11
  L, // 12
  M, // 13
  N, // 14
  O, // 15
  P, // 16
  Q, // 17
  R, // 18
  S, // 19
  T, // 20
  U, // 21
  V, // 22
  W, // 23
  X, // 24
  Y, // 25
  Z, // 26
  One, // 27
  Two, // 28
  Three, // 29
  Four, // 30
  Five, // 31
  Six, // 32
  Seven, // 33
  Eight, // 34
  Nine, // 35
  Zero, // 36
  ExclamationMark, // 37
  AtSign, // 38
  PoundSign, // 39
  DollarSign, // 40
  LeftParen, // 41
  RightParen, // 42
  Missing,  // 43 missing
  Hyphen, // 44
  Missing1, // 45 missing
  PlusSign, // 46
  Ampersand, // 47
  EqualsSign, // 48 
  Semicolon, // 49
  Colon, // 50
  Missing3, // 51 missing
  SingleQuote, // 52
  DoubleQuote, // 53
  PercentSign, // 54
  Comma, // 55
  Period, // 56
  Missing4, // 57
  Missing5, // 58
  Slash, // 59
  QuestionMark, // 60
  Missing6, // 61
  DegreeSign, // 62
  PoppyRed, // 63
  Orange, // 64
  Yellow, // 65
  Green, // 66
  ParisBlue, // 67
  Violet, // 68
  White, // 69
  Black, // 70
  Filled, // 71
}

const VestaboardCharactersCodeMap = {
  " ": VestaboardCharacter.Blank,
  A: VestaboardCharacter.A,
  B: VestaboardCharacter.B,
  C: VestaboardCharacter.C,
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
  a: VestaboardCharacter.A,
  b: VestaboardCharacter.B,
  c: VestaboardCharacter.C,
  d: VestaboardCharacter.D,
  e: VestaboardCharacter.E,
  f: VestaboardCharacter.F,
  g: VestaboardCharacter.G,
  h: VestaboardCharacter.H,
  i: VestaboardCharacter.I,
  j: VestaboardCharacter.J,
  k: VestaboardCharacter.K,
  l: VestaboardCharacter.L,
  m: VestaboardCharacter.M,
  n: VestaboardCharacter.N,
  o: VestaboardCharacter.O,
  p: VestaboardCharacter.P,
  q: VestaboardCharacter.Q,
  r: VestaboardCharacter.R,
  s: VestaboardCharacter.S,
  t: VestaboardCharacter.T,
  u: VestaboardCharacter.U,
  v: VestaboardCharacter.V,
  w: VestaboardCharacter.W,
  x: VestaboardCharacter.X,
  y: VestaboardCharacter.Y,
  z: VestaboardCharacter.Z,
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
  "\\": VestaboardCharacter.Slash,
  "?": VestaboardCharacter.QuestionMark,
  // " ": VestaboardCharacter.Missing6,
  "°": VestaboardCharacter.DegreeSign,  
  '—': VestaboardCharacter.Hyphen,
  '‘': VestaboardCharacter.SingleQuote,
  '’': VestaboardCharacter.SingleQuote,
  '`': VestaboardCharacter.SingleQuote,
  '´': VestaboardCharacter.SingleQuote,
  '–': VestaboardCharacter.Hyphen,
  '¯': VestaboardCharacter.Hyphen,
  '~': VestaboardCharacter.Hyphen,
  '¸': VestaboardCharacter.Comma,
  '¦': VestaboardCharacter.Colon,
  '¿': VestaboardCharacter.QuestionMark,
  '„': VestaboardCharacter.DoubleQuote,
  '“': VestaboardCharacter.DoubleQuote,
  '”': VestaboardCharacter.DoubleQuote,
  '¨': VestaboardCharacter.DoubleQuote,
  '[': VestaboardCharacter.LeftParen,
  '{': VestaboardCharacter.LeftParen,
  ']': VestaboardCharacter.RightParen,
  '}': VestaboardCharacter.RightParen,
  '‰': VestaboardCharacter.PercentSign,
  '¤': VestaboardCharacter.DegreeSign,
  '•': VestaboardCharacter.DegreeSign,
  '·': VestaboardCharacter.DegreeSign,
  'â': VestaboardCharacter.A,
  'ä': VestaboardCharacter.A,
  'à': VestaboardCharacter.A,
  'å': VestaboardCharacter.A,
  'á': VestaboardCharacter.A,
  'À': VestaboardCharacter.A,
  'Á': VestaboardCharacter.A,
  'Â': VestaboardCharacter.A,
  'Ã': VestaboardCharacter.A,
  'Ä': VestaboardCharacter.A,
  'Å': VestaboardCharacter.A,
  'ã': VestaboardCharacter.A,
  'ç': VestaboardCharacter.C,
  'Ç': VestaboardCharacter.C,
  '¢': VestaboardCharacter.C,
  'Ð': VestaboardCharacter.D,
  'é': VestaboardCharacter.E,
  'ê': VestaboardCharacter.E,
  'ë': VestaboardCharacter.E,
  'è': VestaboardCharacter.E,
  'È': VestaboardCharacter.E,
  'É': VestaboardCharacter.E,
  'Ê': VestaboardCharacter.E,
  'Ë': VestaboardCharacter.E,
  'ƒ': VestaboardCharacter.F,
  'í': VestaboardCharacter.I,
  'ï': VestaboardCharacter.I,
  'î': VestaboardCharacter.I,
  'ì': VestaboardCharacter.I,
  'Ì': VestaboardCharacter.I,
  'Í': VestaboardCharacter.I,
  'Î': VestaboardCharacter.I,
  'Ï': VestaboardCharacter.I,
  '|': VestaboardCharacter.I,
  '£': VestaboardCharacter.L,
  'ñ': VestaboardCharacter.N,
  'Ñ': VestaboardCharacter.N,
  'ó': VestaboardCharacter.O,
  'ô': VestaboardCharacter.O,
  'ö': VestaboardCharacter.O,
  'ò': VestaboardCharacter.O,
  'Ò': VestaboardCharacter.O,
  'Ó': VestaboardCharacter.O,
  'Ô': VestaboardCharacter.O,
  'Õ': VestaboardCharacter.O,
  'Ö': VestaboardCharacter.O,
  'Ø': VestaboardCharacter.O,
  'ð': VestaboardCharacter.O,
  'õ': VestaboardCharacter.O,
  'ø': VestaboardCharacter.O,
  '±': VestaboardCharacter.PlusSign,
  'š': VestaboardCharacter.S,
  'Š': VestaboardCharacter.S,
  '§': VestaboardCharacter.S,
  'û': VestaboardCharacter.U,
  'ù': VestaboardCharacter.U,
  'ú': VestaboardCharacter.U,
  'Ù': VestaboardCharacter.U,
  'Ú': VestaboardCharacter.U,
  'Û': VestaboardCharacter.U,
  'ğ': VestaboardCharacter.G,
  "{0}": VestaboardCharacter.Blank,
  "{1}": VestaboardCharacter.A,
  "{2}": VestaboardCharacter.B,
  "{3}": VestaboardCharacter.C,
  "{4}": VestaboardCharacter.D,
  "{5}": VestaboardCharacter.E,
  "{6}": VestaboardCharacter.F,
  "{7}": VestaboardCharacter.G,
  "{8}": VestaboardCharacter.H,
  "{9}": VestaboardCharacter.I,
  "{10}": VestaboardCharacter.J,
  "{11}": VestaboardCharacter.K,
  "{12}": VestaboardCharacter.L,
  "{13}": VestaboardCharacter.M,
  "{14}": VestaboardCharacter.N,
  "{15}": VestaboardCharacter.O,
  "{16}": VestaboardCharacter.P,
  "{17}": VestaboardCharacter.Q,
  "{18}": VestaboardCharacter.R,
  "{19}": VestaboardCharacter.S,
  "{20}": VestaboardCharacter.T,
  "{21}": VestaboardCharacter.U,
  "{22}": VestaboardCharacter.V,
  "{23}": VestaboardCharacter.W,
  "{24}": VestaboardCharacter.X,
  "{25}": VestaboardCharacter.Y,
  "{26}": VestaboardCharacter.Z,
  "{27}": VestaboardCharacter.One,
  "{28}": VestaboardCharacter.Two,
  "{29}": VestaboardCharacter.Three,
  "{30}": VestaboardCharacter.Four,
  "{31}": VestaboardCharacter.Five,
  "{32}": VestaboardCharacter.Six,
  "{33}": VestaboardCharacter.Seven,
  "{34}": VestaboardCharacter.Eight,
  "{35}": VestaboardCharacter.Nine,
  "{36}": VestaboardCharacter.Zero,
  "{37}": VestaboardCharacter.ExclamationMark,
  "{38}": VestaboardCharacter.AtSign,
  "{39}": VestaboardCharacter.PoundSign,
  "{40}": VestaboardCharacter.DollarSign,
  "{41}": VestaboardCharacter.LeftParen,
  "{42}": VestaboardCharacter.RightParen,
  "{43}": VestaboardCharacter.Missing,
  "{44}": VestaboardCharacter.Hyphen,
  "{45}": VestaboardCharacter.Missing1,
  "{46}": VestaboardCharacter.PlusSign,
  "{47}": VestaboardCharacter.Ampersand,
  "{48}": VestaboardCharacter.EqualsSign,
  "{49}": VestaboardCharacter.Semicolon,
  "{50}": VestaboardCharacter.Colon,
  "{51}": VestaboardCharacter.Missing3,
  "{52}": VestaboardCharacter.SingleQuote,
  "{53}": VestaboardCharacter.DoubleQuote,
  "{54}": VestaboardCharacter.PercentSign,
  "{55}": VestaboardCharacter.Comma,
  "{56}": VestaboardCharacter.Period,
  "{57}": VestaboardCharacter.Missing4,
  "{58}": VestaboardCharacter.Missing5,
  "{59}": VestaboardCharacter.Slash,
  "{60}": VestaboardCharacter.QuestionMark,
  "{61}": VestaboardCharacter.Missing6,
  "{62}": VestaboardCharacter.DegreeSign,
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
const rowCount = 6;
const columnCount = 22;
// KMM format
export function classic(text: string, extraHPadding = 0): Array<Array<number>> {
  const emptyRow = new Array(columnCount).fill(0);

  const emptyBoard = [
    emptyRow,
    emptyRow,
    emptyRow,
    emptyRow,
    emptyRow,
    emptyRow,
  ];

  if (!text) {
    return emptyBoard;
  }

  const lines = text.split("\n");
  const wordCharCodeRegex = /[a-zA-Z]+|\{.\d\}+|\{\d\}+|\d+|\s+|[^\w\s]/g;

  const chunkedLines = lines.map((line) => {
    const words = line.match(wordCharCodeRegex);
    return words;
  });
  
  const vestaboardCharsLines = chunkedLines
    .map((line) => {
      return line?.flatMap((word) => {
        if (word.includes("{") && word.includes("}")) {
          return VestaboardCharactersCodeMap[word];
        }
        return word.split("").flatMap((char) => {
          return VestaboardCharactersCodeMap[char];
        });
      });
    })
    .map((chars) => {
      let words = [];
      let word = [];
      for (let i = 0; i < chars?.length; i++) {
        if (chars?.[i] === 0) {
          words.push(word);
          word = [];
        } else {
          word.push(chars?.[i]);
        }
      }
      words.push(word);
      return words;
    });
  const contentAreaWidth = columnCount - extraHPadding;
  function makeLines(wrappedWord) {
    const words = wrappedWord.flatMap((word) =>
      word.reduce((acc, char, i) => {
        const index = Math.floor(i / contentAreaWidth);
        if (!acc[index]) acc[index] = [];
        acc[index].push(char);
        return acc;
      }, [])
    );

    if (
      words.reduce((sum, word) => sum + word.length, 0) + words.length - 1 <=
      contentAreaWidth
    )
      return [words];

    for (let index = 0; index <= words.length; index++) {
      const sublist = words.slice(0, index);
      const requiredCharacters =
        sublist
          .map((word) => word.length)
          .reduce((sum, count) => sum + count, 0) +
        sublist.length -
        1;

      if (requiredCharacters > contentAreaWidth) {
        return [
          words.slice(0, index - 1),
          ...makeLines(words.slice(index - 1, words.length)),
        ];
      }
    }
    return [];
  }

  const wrapping = vestaboardCharsLines.flatMap((line) => makeLines(line));
  const formatted = wrapping.map((line) => {
    return line.flatMap((word) => [word, [0]]).slice(0, -1);
  });
  const numContentRows = formatted.length;
  if (numContentRows === 3 && extraHPadding === 0) {
    // redo all the work, add padding
    return classic(text, extraHPadding + 4);
  }

  const maxNumContentColumns = Math.max(
    ...formatted.map((line) => line.reduce((sum, word) => sum + word.length, 0))
  );

  const hPad = Math.max(
    Math.floor((columnCount - (maxNumContentColumns + 1)) / 2),
    0
  );
  const vPad = Math.max(Math.floor((rowCount - numContentRows) / 2), 0);
  const emptyRowPaddings = new Array(vPad).fill(0).map(() => emptyRow);
  const hPaddings = new Array(hPad).fill([0]);

  const padded = [
    ...emptyRowPaddings,
    ...formatted.map((line) => [...hPaddings, ...line, ...hPaddings]),
    ...emptyRowPaddings,
  ];

  const codes = padded.slice(0, rowCount).map((line, rowIndex) => {
    return line
      .flatMap((word) => word)
      .slice(0, columnCount)
      .map((charCode) => charCode);
  });

  const finalBoard = emptyBoard.map((line, rowIndex) => {
    return line.map((_, columnIndex) => codes?.[rowIndex]?.[columnIndex] || 0);
  });

  return finalBoard;
}
