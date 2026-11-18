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
  rawCharacters?: number[][] | string;
}

export interface IVBMLCalendarComponent {
  style?: IComponentStyle;
  calendar?: {
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

export interface IVBMLComponentWithRandomColors {
  randomColors: {
    colors?: number[];
  };
  style?: IComponentStyle;
}

export type IVBMLComponent =
  | IVBMLRawComponent
  | IVBMLTemplateComponent
  | IVBMLCalendarComponent
  | IVBMLComponentWithRandomColors;

export type SchemaFieldType = "Text" | "Numeric" | "Color" | "Enum";

export const SchemaType = {
  Text: "Text",
  Numeric: "Numeric",
  Color: "Color",
  Enum: "Enum",
} as const;

export type Evidence = "TemporalFact" | "GeneralFact" | "Freeform";

/**
 * - TemporalFact: requires a user-supplied value or a source matching the
 *   requested event and time.
 * - GeneralFact: model knowledge is sufficient, e.g. a team color.
 * - Freeform: any value within the field constraints, e.g. a decorative accent.
 *
 * Evidence is guidance for agents and tooling; it is never enforced by parse.
 */
export const Evidence = {
  TemporalFact: "TemporalFact",
  GeneralFact: "GeneralFact",
  Freeform: "Freeform",
} as const;

export interface IVBMLSchemaOption {
  /** The actual enum value */
  value: string;
  /** What the enum value means */
  description: string;
}

export interface IVBMLSchemaField {
  /** The maximum number of rows the content can fill */
  rows?: number;
  /** The maximum number of columns the content can fill */
  columns?: number;
  /** What the content should be (especially helpful for AI agents) */
  description: string;
  /** Defaults to "Text". Colors must be character codes 63-71. */
  type?: SchemaFieldType;
  /** Only valid (and required) for Enum fields */
  options?: IVBMLSchemaOption[];
  /** Defaults to "Freeform". */
  evidence?: Evidence;
  /** Tightens the evidence requirement, e.g. "Use the same game as away_score." */
  evidenceRule?: string;
  /** Defaults to true. */
  required?: boolean;
}

export interface VBMLSchema {
  [propName: string]: IVBMLSchemaField;
}

export interface IVBML {
  props?: VBMLProps;
  schema?: VBMLSchema;
  style?: IVBMLStyle;
  components: IVBMLComponent[];
}

export interface ICharacterCodesToStringOptions {
  allowLineBreaks?: boolean;
}
