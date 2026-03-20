import { sanitizeSpecialCharacters } from "../../sanitizeSpecialCharacters";
import { runConformanceSuite } from "./support";

interface SanitizeSpecialCharactersInput {
  text: string;
}

runConformanceSuite<SanitizeSpecialCharactersInput, string>({
  suiteName: "Sanitize special characters conformance",
  suiteDir: "sanitizeSpecialCharacters",
  run: ({ text }) => sanitizeSpecialCharacters(text),
});
