// Returns a deep copy of the character codes array
export const copyCharacterCodes = (characters: number[][]) => [
  ...characters.map((row) => [...row]),
];
