import { mappingToCharacter } from "./characterCodes";

export const sanitizeSpecialCharacters = (text: string): string => {
  return text
    .split("")
    .map(mappingToCharacter)
    .join("")
    .replaceAll("\u2674\uFE0F", "\u2674");
};
