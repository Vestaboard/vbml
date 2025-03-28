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
    mappings: [
      "A",
      "a",
      "â",
      "à",
      "å",
      "á",
      "À",
      "Á",
      "Â",
      "Ã",
      "Å",
      "ã",
      "ä",
      "Ä",
      "æ",
      "Æ",
    ],
  },
  {
    code: CharacterCode.B,
    name: "B",
    mappings: ["B", "b", "ß"],
  },
  {
    code: CharacterCode.C,
    name: "C",
    mappings: ["C", "c", "ç", "Ç", "¢", "ć", "Ć", "č", "Č"],
  },
  {
    code: CharacterCode.D,
    name: "D",
    mappings: ["D", "d", "Ð", "ð"],
  },
  {
    code: CharacterCode.E,
    name: "E",
    mappings: ["E", "e", "é", "ê", "ë", "è", "È", "É", "Ê", "Ë", "€", "£"],
  },
  {
    code: CharacterCode.F,
    name: "F",
    mappings: ["F", "f", "ƒ", "ſ"],
  },
  {
    code: CharacterCode.G,
    name: "G",
    mappings: ["G", "g", "ğ", "Ğ", "ģ", "Ģ", "ġ", "Ġ", "ĝ", "Ĝ"],
  },
  {
    code: CharacterCode.H,
    name: "H",
    mappings: ["H", "h", "ħ", "Ħ", "ĥ", "Ĥ"],
  },
  {
    code: CharacterCode.I,
    name: "I",
    mappings: ["I", "i", "í", "ï", "î", "ì", "Ì", "Í", "Î", "Ï", "|", "¡"],
  },
  {
    code: CharacterCode.J,
    name: "J",
    mappings: ["J", "j", "ĵ", "Ĵ", "į", "Į"],
  },
  {
    code: CharacterCode.K,
    name: "K",
    mappings: ["K", "k", "ķ", "Ķ", "ĸ"],
  },
  {
    code: CharacterCode.L,
    name: "L",
    mappings: ["L", "l", "£", "ł", "Ł", "ļ", "Ļ", "ĺ", "Ĺ", "ľ", "Ľ", "ŀ", "Ŀ"],
  },
  {
    code: CharacterCode.M,
    name: "M",
    mappings: ["M", "m"],
  },
  {
    code: CharacterCode.N,
    name: "N",
    mappings: ["N", "n", "ñ", "Ñ", "ń", "Ń", "ň", "Ň", "ņ", "Ņ"],
  },
  {
    code: CharacterCode.O,
    name: "O",
    mappings: [
      "O",
      "o",
      "ó",
      "ô",
      "ò",
      "Ò",
      "Ó",
      "Ô",
      "Õ",
      "Ø",
      "ð",
      "õ",
      "ø",
      "ö",
      "Ö",
      "œ",
      "Œ",
    ],
  },
  {
    code: CharacterCode.P,
    name: "P",
    mappings: ["P", "p", "Þ", "þ", "¶"],
  },
  {
    code: CharacterCode.Q,
    name: "Q",
    mappings: ["Q", "q"],
  },
  {
    code: CharacterCode.R,
    name: "R",
    mappings: ["R", "r", "ŕ", "Ŕ", "ř", "Ř", "ŗ", "Ŗ"],
  },
  {
    code: CharacterCode.S,
    name: "S",
    mappings: ["S", "s", "š", "Š", "§", "ś", "Ś", "ş", "Ş", "ș", "Ș"],
  },
  {
    code: CharacterCode.T,
    name: "T",
    mappings: ["T", "t", "ť", "Ť", "ţ", "Ţ", "ŧ", "Ŧ"],
  },
  {
    code: CharacterCode.U,
    name: "U",
    mappings: [
      "U",
      "u",
      "û",
      "ù",
      "ú",
      "Ù",
      "Ú",
      "Û",
      "Ü",
      "ü",
      "µ",
      "ū",
      "Ū",
      "ů",
      "Ů",
      "ų",
      "Ų",
    ],
  },
  {
    code: CharacterCode.V,
    name: "V",
    mappings: ["V", "v", "Ʋ", "ʋ"],
  },
  {
    code: CharacterCode.W,
    name: "W",
    mappings: ["W", "w", "ŵ", "Ŵ", "ẁ", "Ẁ", "ẃ", "Ẃ", "ẅ", "Ẅ"],
  },
  {
    code: CharacterCode.X,
    name: "X",
    mappings: ["X", "x", "ẍ", "Ẍ"],
  },
  {
    code: CharacterCode.Y,
    name: "Y",
    mappings: ["Y", "y", "ý", "ÿ", "Ý", "ŷ", "Ŷ", "ỳ", "Ỳ", "ỹ", "Ỹ", "Ÿ"],
  },
  {
    code: CharacterCode.Z,
    name: "Z",
    mappings: ["Z", "z", "ž", "Ž", "ź", "Ź", "ż", "Ż"],
  },
  {
    code: CharacterCode.One,
    name: "1",
    mappings: ["1", "¹"],
  },
  {
    code: CharacterCode.Two,
    name: "Two",
    mappings: ["2", "²"],
  },
  {
    code: CharacterCode.Three,
    name: "Three",
    mappings: ["3", "³"],
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
    mappings: ["0", "º"],
  },
  {
    code: CharacterCode.ExclamationMark,
    name: "ExclamationMark",
    mappings: ["!", "¡", "ǃ"],
  },
  {
    code: CharacterCode.AtSign,
    name: "AtSign",
    mappings: ["@"],
  },
  {
    code: CharacterCode.PoundSign,
    name: "PoundSign",
    mappings: ["#", "№"],
  },
  {
    code: CharacterCode.DollarSign,
    name: "DollarSign",
    mappings: ["$", "¢", "£", "¤", "¥", "₩", "₪", "₫", "€", "₹", "₺", "₽"],
  },
  {
    code: CharacterCode.LeftParen,
    name: "LeftParen",
    mappings: ["(", "[", "{", "⟨", "«"],
  },
  {
    code: CharacterCode.RightParen,
    name: "RightParen",
    mappings: [")", "]", "}", "⟩", "»"],
  },
  {
    code: CharacterCode.Hyphen,
    name: "Hyphen",
    mappings: ["-", "—", "–", "¯", "~"],
  },
  {
    code: CharacterCode.PlusSign,
    name: "PlusSign",
    mappings: ["+", "±", "∓", "∔"],
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
    mappings: [";", ";", "；"],
  },
  {
    code: CharacterCode.Colon,
    name: "Colon",
    mappings: [":", "¦"],
  },
  {
    code: CharacterCode.SingleQuote,
    name: "SingleQuote",
    mappings: [
      "'",
      "‘",
      "’",
      "`",
      "´",
      "‚",
      "‛",
      "ʹ",
      "ʻ",
      "ʽ",
      "ʾ",
      "ʿ",
      "ˈ",
      "ˊ",
      "ˋ",
    ],
  },
  {
    code: CharacterCode.DoubleQuote,
    name: "DoubleQuote",
    mappings: [`"`, "„", "“", "”", "¨", "˝", "ˮ", "˵", "˶"],
  },
  {
    code: CharacterCode.PercentSign,
    name: "PercentSign",
    mappings: ["%", "‰", "‱"],
  },
  {
    code: CharacterCode.Comma,
    name: "Comma",
    mappings: [",", "¸", "‚", "，", "、", "､"],
  },
  {
    code: CharacterCode.Period,
    name: "Period",
    mappings: [".", "․", "‥", "…"],
  },
  {
    code: CharacterCode.Slash,
    name: "Slash",
    mappings: ["/", "\\", "⁄", "∕", "⧸", "⫻", "⫽", "⧵"],
  },
  {
    code: CharacterCode.QuestionMark,
    name: "QuestionMark",
    mappings: ["?", "¿"],
  },
  {
    code: CharacterCode.DegreeSign,
    name: "DegreeSign",
    mappings: ["°", "¤", "•", "·", "∙", "∘", "⚬", "⦿", "⨀", "⨁", "⨂"],
  },
];

const _supportedCharacters = [
  ...CHARACTER_CODES.map((characterCode) =>
    characterCode.mappings[0]?.toLocaleLowerCase()
  ),
  ...CHARACTER_CODES.map((characterCode) =>
    characterCode.mappings[0]?.toUpperCase()
  ),
  ...["\n", "“", "‘"],
];

export const supportedCharacters = _supportedCharacters.filter(
  (item, index) => _supportedCharacters.indexOf(item) === index
);

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

export const mappingToCharacter = (character: string) => {
  if (supportedCharacters.includes(character)) {
    return character;
  }

  const characterCodeObject = CHARACTER_CODES.find((code) =>
    code.mappings.includes(character)
  );

  return characterCodeObject?.mappings[0]?.toLocaleLowerCase() || " ";
};
