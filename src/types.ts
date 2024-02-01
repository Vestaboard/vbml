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
}

interface IComponentStyle {
  justify?: Justify;
  align?: Align;
  height?: number;
  width?: number;
}

interface IVBMLStyle {
  height?: number;
  width?: number;
}

export interface VBMLProps {
  [key: string]: any;
}

export interface IVBMLComponent {
  template: string;
  style?: IComponentStyle;
}

export interface IVBML {
  props?: VBMLProps;
  style?: IVBMLStyle;
  components: IVBMLComponent[];
}

export interface ICharacterCodesToStringOptions {
  allowLineBreaks?: boolean;
}
