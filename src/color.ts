import { CharacterCode } from "./characterCodes";

/** Semantic color names mapped to their character codes. */
export const Color = {
  Red: CharacterCode.Red,
  Orange: CharacterCode.Orange,
  Yellow: CharacterCode.Yellow,
  Green: CharacterCode.Green,
  Blue: CharacterCode.Blue,
  Violet: CharacterCode.Violet,
  White: CharacterCode.White,
  Black: CharacterCode.Black,
  Filled: CharacterCode.Filled,
} as const;
