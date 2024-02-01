const characterCodesMap: {
  [key: string]: string;
} = {
  "0": " ",
  "1": "A",
  "2": "B",
  "3": "C",
  "4": "D",
  "5": "E",
  "6": "F",
  "7": "G",
  "8": "H",
  "9": "I",
  "10": "J",
  "11": "K",
  "12": "L",
  "13": "M",
  "14": "N",
  "15": "O",
  "16": "P",
  "17": "Q",
  "18": "R",
  "19": "S",
  "20": "T",
  "21": "U",
  "22": "V",
  "23": "W",
  "24": "X",
  "25": "Y",
  "26": "Z",
  "27": "1",
  "28": "2",
  "29": "3",
  "30": "4",
  "31": "5",
  "32": "6",
  "33": "7",
  "34": "8",
  "35": "9",
  "36": "0",
  "37": "!",
  "38": "@",
  "39": "#",
  "40": "$",
  "41": "(",
  "42": ")",
  "43": " ",
  "44": "-",
  "45": "",
  "46": "+",
  "47": "&",
  "48": "=",
  "49": ";",
  "50": ":",
  "51": "",
  "52": "'",
  "53": '"',
  "54": "%",
  "55": ",",
  "56": ".",
  "57": "",
  "58": "",
  "59": "/",
  "60": "?",
  "61": "",
  "62": "°",
  "63": "",
  "64": "",
  "65": "",
  "66": "",
  "67": "",
  "68": "",
  "69": "",
  "70": "",
  "71": " ",
  "100": "\n", // line break
};

// These characters are considered empty and if there are enough of them in a row, we can consider it a line break
const breakableCharacters = Object.keys(characterCodesMap).filter(
  (key) => characterCodesMap[key] === "" || characterCodesMap[key] === " "
);

interface ICharacterCodesToStringOptions {
  allowLineBreaks?: boolean;
}

const countEmptyCharactersBeforeFirstWord = (row: number[]) => {
  return row.reduce(
    (prev, current) => {
      if (!breakableCharacters.includes(`${current}`) || !prev.counting) {
        return {
          ...prev,
          counting: false,
        };
      }

      return {
        ...prev,
        count: prev.count + 1,
      };
    },
    {
      count: 0,
      counting: true,
    }
  ).count;
};

const countFirstWordLength = (row: number[]) => {
  return row.reduce(
    (prev, current) => {
      if (!prev.counting) {
        return prev;
      }

      const isCharacter = !breakableCharacters.includes(`${current}`);

      if (isCharacter && !prev.startedCounting) {
        return {
          ...prev,
          count: prev.count + 1,
          startedCounting: true,
        };
      }

      if (!isCharacter && !prev.startedCounting) {
        return prev;
      }

      if (!isCharacter && prev.startedCounting) {
        return {
          ...prev,
          counting: false,
        };
      }

      return {
        ...prev,
        count: prev.count + 1,
      };
    },
    {
      count: 0,
      counting: true,
      startedCounting: false,
    }
  ).count;
};

export const characterCodesToString = (
  characters: number[][],
  options?: ICharacterCodesToStringOptions
) => {
  const mergedRows = characters.reduce(
    (acc: number[], row: number[], index: number) => {
      const unbrokenAccumulator = [...acc, 0, ...row];
      if (options?.allowLineBreaks) {
        const previousLine = characters[index - 1] || null;

        if (!previousLine) {
          return unbrokenAccumulator;
        }

        const prefixBreakableCharacters =
          countEmptyCharactersBeforeFirstWord(previousLine);

        const postfixBreakableCharacters = countEmptyCharactersBeforeFirstWord(
          previousLine.reverse()
        );

        const firstWordLength = countFirstWordLength(row);

        const previousBreakableCharacters =
          prefixBreakableCharacters + postfixBreakableCharacters;

        return [
          ...acc,
          previousBreakableCharacters > firstWordLength ? 100 : 0,
          ...row,
        ];
      }

      return unbrokenAccumulator;
    },
    []
  );

  return (
    mergedRows
      .map((code: number) => characterCodesMap[`${code}`] || "")
      .join("")
      // Remove trailing whitespace
      .trim()
      // Remove duplicate whitespace
      .split(" ")
      .filter((string) => string != "")
      .join(" ")
      // Remove whitespace before line breaks
      .replace(/ \n/g, "\n")
  );
};
