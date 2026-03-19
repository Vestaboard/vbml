import {
  parseAbsoluteComponent,
  parseComponent,
} from "../../parseComponent";
import { IVBMLComponent, VBMLProps } from "../../types";
import { runConformanceSuite } from "./support";

interface ParseComponentInput {
  mode?: "component" | "absolute";
  height: number;
  width: number;
  props?: VBMLProps;
  component: IVBMLComponent;
}

type ParseComponentOutput =
  | number[][]
  | {
      characters: number[][];
      x: number;
      y: number;
    };

runConformanceSuite<ParseComponentInput, ParseComponentOutput>({
  suiteName: "Parse component conformance",
  suiteDir: "parseComponent",
  run: ({ mode = "component", height, width, props, component }) => {
    if (mode === "absolute") {
      return parseAbsoluteComponent(height, width, props)(component);
    }

    return parseComponent(height, width, props)(component);
  },
});
