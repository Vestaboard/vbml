import { supportedCharacters } from "./characterCodes";

export const hasSpecialCharacters = (text: string): boolean => {
  if (!text) {
    return false;
  }

  return text.split("").some((char) => {
    return !supportedCharacters.includes(char);
  });
};
