import { vbml } from "../..";
import { IVBML } from "../../types";
import { runConformanceSuite } from "./support";

runConformanceSuite<IVBML, number[][]>({
  suiteName: "VBML conformance",
  suiteDir: "vbml",
  run: (input) => vbml.parse(input),
});
