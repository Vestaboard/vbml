import { characterCodesToAscii } from "../../characterCodesToAscii";
import { runConformanceSuite } from "./support";

interface CharacterCodesToAsciiInput {
  characterCodes: number[][];
  isWhite?: boolean;
}

runConformanceSuite<CharacterCodesToAsciiInput, string>({
  suiteName: "Character codes to ASCII conformance",
  suiteDir: "characterCodesToAscii",
  run: ({ characterCodes, isWhite }) =>
    characterCodesToAscii(characterCodes, isWhite),
});
