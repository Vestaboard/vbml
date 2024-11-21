import { VBMLDays } from "./calendar";

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

interface IComponentStyle {
  justify?: Justify;
  align?: Align;
  height?: number;
  width?: number;
  absolutePosition?: {
    x: number;
    y: number;
  };
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

export interface IVBMLCalendarComponent {
  style?: IComponentStyle;
  calendar: {
    month: string;
    year: string;
    days: VBMLDays;
    defaultDayColor?: 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71;
    hideSMTWTFS?: boolean;
    hideDates?: boolean;
    hideMonthYear?: boolean;
  };
}

export interface IVBMLTemplateComponent {
  template: string;
  style?: IComponentStyle;
}

export type IVBMLComponent = IVBMLRawComponent &
  IVBMLTemplateComponent &
  IVBMLCalendarComponent;

export interface IVBML {
  props?: VBMLProps;
  style?: IVBMLStyle;
  components: IVBMLComponent[];
}

export interface ICharacterCodesToStringOptions {
  allowLineBreaks?: boolean;
}
