import { characterCodesToString } from "../../characterCodesToString";
import { runConformanceSuite } from "./support";

interface CharacterCodesToStringInput {
  characters: number[][];
  options?: {
    allowLineBreaks?: boolean;
  };
}

runConformanceSuite<CharacterCodesToStringInput, string>({
  suiteName: "Character codes to string conformance",
  suiteDir: "characterCodesToString",
  run: ({ characters, options }) => characterCodesToString(characters, options),
});
