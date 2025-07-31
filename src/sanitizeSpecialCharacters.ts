import { mappingToCharacter } from "./characterCodes";

export const sanitizeSpecialCharacters = (text: string): string => {
  return text.split("").map(mappingToCharacter).join("").replace(/❤ /g, "❤️");
};
