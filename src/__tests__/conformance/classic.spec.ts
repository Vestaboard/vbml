import { classic } from "../../classic";
import { runConformanceSuite } from "./support";

interface ClassicInput {
  text: string;
  options?: {
    extraHPadding?: number;
    preserveDoubleSpaces?: boolean;
  };
}

runConformanceSuite<ClassicInput, number[][]>({
  suiteName: "Classic conformance",
  suiteDir: "classic",
  run: ({ text, options }) => classic(text, options),
});
