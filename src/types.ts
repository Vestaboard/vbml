export enum Justify {
  center = "center",
  left = "left",
  right = "right",
  justified = "justified",
}

export enum Align {
  center = "center",
  top = "top",
  bottom = "bottom",
  justified = "justified",
  absolute = "absolute",
}

export enum Position {
  relative = "relative",
  absolute = "absolute",
}

interface IComponentStyle {
  justify?: Justify;
  align?: Align;
  height?: number;
  width?: number;
  position?: Position;
  x?: number;
  y?: number;
}

interface IVBMLStyle {
  height?: number;
  width?: number;
}

export interface VBMLProps {
  [key: string]: any;
}

export interface IVBMLRawComponent {
  style?: IComponentStyle;
  rawCharacters?: number[][];
}

export interface IVBMLTemplateComponent {
  template: string;
  style?: IComponentStyle;
}

export type IVBMLComponent = IVBMLRawComponent | IVBMLTemplateComponent;

export interface IVBML {
  props?: VBMLProps;
  style?: IVBMLStyle;
  components: IVBMLComponent[];
}

export interface ICharacterCodesToStringOptions {
  allowLineBreaks?: boolean;
}
