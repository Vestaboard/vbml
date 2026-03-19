import { hasSpecialCharacters } from "../../hasSpecialCharacters";
import { runConformanceSuite } from "./support";

interface HasSpecialCharactersInput {
  text: string;
}

runConformanceSuite<HasSpecialCharactersInput, boolean>({
  suiteName: "Has special characters conformance",
  suiteDir: "hasSpecialCharacters",
  run: ({ text }) => hasSpecialCharacters(text),
});
