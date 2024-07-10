import { convertCharactersToCharacterCodes } from "./characterCodes";
import { createEmptyBoard } from "./createEmptyBoard";
import { horizontalAlign } from "./horizontalAlign";
import { Align, IVBMLComponent, Justify, VBMLProps } from "./types";
import { verticalAlign } from "./verticalAlign";
import { getLinesFromWords } from "./getLinesFromWords";
import { renderComponent } from "./renderComponent";
import { parseProps } from "./parseProps";
import { splitWords } from "./splitWords";
import pipe from "lodash/fp/pipe";
import map from "lodash/fp/map";
import { emojisToCharacterCodes } from "./emojisToCharacterCodes";

export const parseComponent =
  (defaultHeight: number, defaultWidth: number, props?: VBMLProps) =>
  (component: IVBMLComponent) => {
    if ("rawCharacters" in component) return component.rawCharacters;

    const width = component?.style?.width || defaultWidth;
    const height = component?.style?.height || defaultHeight;
    const emptyComponent = createEmptyBoard(height, width);

    const template = "template" in component ? component.template : "";

    return pipe(
      emojisToCharacterCodes,
      parseProps(props || {}),
      splitWords(width),
      getLinesFromWords(width),
      map(convertCharactersToCharacterCodes),
      verticalAlign(height, component?.style?.align || Align.top),
      horizontalAlign(width, component?.style?.justify || Justify.left),
      renderComponent(emptyComponent)
    )(template) as number[][];
  };

export const parseAbsoluteComponent =
  (defaultHeight: number, defaultWidth: number, props?: VBMLProps) =>
  (component: IVBMLComponent) => {
    return {
      characters: parseComponent(
        defaultHeight,
        defaultWidth,
        props
      )(component) as number[][],
      x: component.style?.absolutePosition?.x || 0,
      y: component.style?.absolutePosition?.y || 0,
    };
  };
