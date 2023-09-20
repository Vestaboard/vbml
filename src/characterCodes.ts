export enum CharacterCode {
  Blank = 0,
  A = 1,
  B = 2,
  C = 3,
  D = 4,
  E = 5,
  F = 6,
  G = 7,
  H = 8,
  I = 9,
  J = 10,
  K = 11,
  L = 12,
  M = 13,
  N = 14,
  O = 15,
  P = 16,
  Q = 17,
  R = 18,
  S = 19,
  T = 20,
  U = 21,
  V = 22,
  W = 23,
  X = 24,
  Y = 25,
  Z = 26,
  One = 27,
  Two = 28,
  Three = 29,
  Four = 30,
  Five = 31,
  Six = 32,
  Seven = 33,
  Eight = 34,
  Nine = 35,
  Zero = 36,
  ExclamationMark = 37,
  AtSign = 38,
  PoundSign = 39,
  DollarSign = 40,
  LeftParen = 41,
  RightParen = 42,
  Hyphen = 44,
  PlusSign = 46,
  Ampersand = 47,
  EqualsSign = 48,
  Semicolon = 49,
  Colon = 50,
  SingleQuote = 52,
  DoubleQuote = 53,
  PercentSign = 54,
  Comma = 55,
  Period = 56,
  Slash = 59,
  QuestionMark = 60,
  DegreeSign = 62,
  Red = 63,
  Orange = 64,
  Yellow = 65,
  Green = 66,
  Blue = 67,
  Violet = 68,
  White = 69,
  Black = 70,
  Filled = 71,
}

const validCharacterCodes = Object.keys(CharacterCode).map(
  (key) => CharacterCode[key]
);

const CHARACTER_CODES = [
  {
    code: CharacterCode.Blank,
    name: "Blank",
    mappings: [
      " ",
      "©",
      "®",
      "<",
      ">",
      "²",
      "†",
      "‡",
      "ˆ",
      "Þ",
      "þ",
      "µ",
      "¶",
      "*",
      "^",
      "_",
      "¬",
      "«",
      "»",
      "›",
      "³",
      "¹",
      "€",
      "‹",
      "˜",
      "÷",
    ],
  },
  {
    code: CharacterCode.A,
    name: "A",
    mappings: ["A", "a", "â", "à", "å", "á", "À", "Á", "Â", "Ã", "Å", "ã", "ã"],
  },
  {
    code: CharacterCode.B,
    name: "B",
    mappings: ["B", "b"],
  },
  {
    code: CharacterCode.C,
    name: "C",
    mappings: ["C", "c", "ç", "Ç", "¢", "ć", "Ć"],
  },
  {
    code: CharacterCode.D,
    name: "D",
    mappings: ["D", "d", "Ð"],
  },
  {
    code: CharacterCode.E,
    name: "E",
    mappings: ["E", "e", "é", "ê", "ë", "è", "È", "É", "Ê", "Ë"],
  },
  {
    code: CharacterCode.F,
    name: "F",
    mappings: ["F", "f", "ƒ"],
  },
  {
    code: CharacterCode.G,
    name: "G",
    mappings: ["G", "g", "ğ"],
  },
  {
    code: CharacterCode.H,
    name: "H",
    mappings: ["H", "h"],
  },
  {
    code: CharacterCode.I,
    name: "I",
    mappings: ["I", "i", "í", "ï", "î", "ì", "Ì", "Í", "Î", "Ï", "|"],
  },
  {
    code: CharacterCode.J,
    name: "J",
    mappings: ["J", "j"],
  },
  {
    code: CharacterCode.K,
    name: "K",
    mappings: ["K", "k"],
  },
  {
    code: CharacterCode.L,
    name: "L",
    mappings: ["L", "l", "£"],
  },
  {
    code: CharacterCode.M,
    name: "M",
    mappings: ["M", "m"],
  },
  {
    code: CharacterCode.N,
    name: "N",
    mappings: ["N", "n", "ñ", "Ñ"],
  },
  {
    code: CharacterCode.O,
    name: "O",
    mappings: ["O", "o", "ó", "ô", "ò", "Ò", "Ó", "Ô", "Õ", "Ø", "ð", "õ", "ø"],
  },
  {
    code: CharacterCode.P,
    name: "P",
    mappings: ["P", "p"],
  },
  {
    code: CharacterCode.Q,
    name: "Q",
    mappings: ["Q", "q"],
  },
  {
    code: CharacterCode.R,
    name: "R",
    mappings: ["R", "r"],
  },
  {
    code: CharacterCode.S,
    name: "S",
    mappings: ["S", "s", "š", "Š", "§"],
  },
  {
    code: CharacterCode.T,
    name: "T",
    mappings: ["T", "t"],
  },
  {
    code: CharacterCode.U,
    name: "U",
    mappings: ["U", "u", "û", "ù", "ú", "Ù", "Ú", "Û"],
  },
  {
    code: CharacterCode.V,
    name: "V",
    mappings: ["V", "v"],
  },
  {
    code: CharacterCode.W,
    name: "W",
    mappings: ["W", "w"],
  },
  {
    code: CharacterCode.X,
    name: "X",
    mappings: ["X", "x"],
  },
  {
    code: CharacterCode.Y,
    name: "Y",
    mappings: ["Y", "y"],
  },
  {
    code: CharacterCode.Z,
    name: "Z",
    mappings: ["Z", "z"],
  },
  {
    code: CharacterCode.One,
    name: "1",
    mappings: ["1"],
  },
  {
    code: CharacterCode.Two,
    name: "Two",
    mappings: ["2"],
  },
  {
    code: CharacterCode.Three,
    name: "Three",
    mappings: ["3"],
  },
  {
    code: CharacterCode.Four,
    name: "Four",
    mappings: ["4"],
  },
  {
    code: CharacterCode.Five,
    name: "Five",
    mappings: ["5"],
  },
  {
    code: CharacterCode.Six,
    name: "Six",
    mappings: ["6"],
  },
  {
    code: CharacterCode.Seven,
    name: "Seven",
    mappings: ["7"],
  },
  {
    code: CharacterCode.Eight,
    name: "Eight",
    mappings: ["8"],
  },
  {
    code: CharacterCode.Nine,
    name: "Nine",
    mappings: ["9"],
  },
  {
    code: CharacterCode.Zero,
    name: "Zero",
    mappings: ["0"],
  },
  {
    code: CharacterCode.ExclamationMark,
    name: "ExclamationMark",
    mappings: ["!"],
  },
  {
    code: CharacterCode.AtSign,
    name: "AtSign",
    mappings: ["@"],
  },
  {
    code: CharacterCode.PoundSign,
    name: "PoundSign",
    mappings: ["#"],
  },
  {
    code: CharacterCode.DollarSign,
    name: "DollarSign",
    mappings: ["$"],
  },
  {
    code: CharacterCode.LeftParen,
    name: "LeftParen",
    mappings: ["(", "[", "{"],
  },
  {
    code: CharacterCode.RightParen,
    name: "RightParen",
    mappings: [")", "]", "}"],
  },
  {
    code: CharacterCode.Hyphen,
    name: "Hyphen",
    mappings: ["-", "—", "–", "¯", "~"],
  },
  {
    code: CharacterCode.PlusSign,
    name: "PlusSign",
    mappings: ["+", "±"],
  },
  {
    code: CharacterCode.Ampersand,
    name: "Ampersand",
    mappings: ["&"],
  },
  {
    code: CharacterCode.EqualsSign,
    name: "EqualsSign",
    mappings: ["="],
  },
  {
    code: CharacterCode.Semicolon,
    name: "Semicolon",
    mappings: [";"],
  },
  {
    code: CharacterCode.Colon,
    name: "Colon",
    mappings: [":", "¦"],
  },
  {
    code: CharacterCode.SingleQuote,
    name: "SingleQuote",
    mappings: ["'", "‘", "’", "`", "´"],
  },
  {
    code: CharacterCode.DoubleQuote,
    name: "DoubleQuote",
    mappings: [`"`, "„", "“", "”", "¨"],
  },
  {
    code: CharacterCode.PercentSign,
    name: "PercentSign",
    mappings: ["%", "‰"],
  },
  {
    code: CharacterCode.Comma,
    name: "Comma",
    mappings: [",", "¸"],
  },
  {
    code: CharacterCode.Period,
    name: "Period",
    mappings: ["."],
  },
  {
    code: CharacterCode.Slash,
    name: "Slash",
    mappings: ["/", "\\"],
  },
  {
    code: CharacterCode.QuestionMark,
    name: "QuestionMark",
    mappings: ["?", "¿"],
  },
  {
    code: CharacterCode.DegreeSign,
    name: "DegreeSign",
    mappings: ["°", "¤", "•", "·"],
  },
];

const MAPPED_CHARACTERS = CHARACTER_CODES.reduce((prev, current) => {
  return {
    ...prev,
    ...current.mappings.reduce((prevMapping, currentMapping) => {
      return {
        ...prevMapping,
        [currentMapping]: current.code,
      };
    }, {}),
  };
}, {});

export const getCharacterCode = (character: string) =>
  MAPPED_CHARACTERS[character];

const validateCharacterCode = (code: number) => {
  if (validCharacterCodes.includes(code)) {
    return code as CharacterCode;
  }

  throw new Error(`Invalid Character Code: ${code}`);
};

export const convertCharactersToCharacterCodes = (characters: string) =>
  characters.split("").reduce(
    (prev: any, current, index) => {
      const characterCode = prev.isCharacterCode
        ? characters[index + 1] === "}"
          ? validateCharacterCode(+current)
          : validateCharacterCode(+`${current}${characters[index + 1]}`)
        : null;

      return {
        accumulator:
          current === "{" || current === "}" || prev.skipNext
            ? prev.accumulator
            : [
                ...prev.accumulator,
                prev.isCharacterCode
                  ? characterCode
                  : getCharacterCode(current),
              ],
        isCharacterCode: current === "{",
        skipNext: prev.isCharacterCode && characters[index + 1] !== "}",
      };
    },
    {
      accumulator: [],
      isCharacterCode: false,
      skipNext: false,
    }
  ).accumulator;
