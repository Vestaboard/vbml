import { CharacterCode } from "./characterCodes";
import { emojisToCharacterCodes } from "./emojisToCharacterCodes";
import { ISchemaIssue, VBMLSchemaError } from "./schemaErrors";
import { IVBMLSchemaField, VBMLProps, VBMLSchema } from "./types";

type Problem = { code: ISchemaIssue["code"]; message: string };

/** Cells a string fills: each {nn} token and each color emoji is one cell. */
const checkSize = (text: string, field: IVBMLSchemaField): Problem[] => {
  const lines = emojisToCharacterCodes(text)
    .replace(/\{\d{1,2}\}/g, "\u0000")
    .split("\n");
  const problems: Problem[] = [];
  if (field.rows !== undefined && lines.length > field.rows) {
    problems.push({
      code: "too_many_rows",
      message: `has ${lines.length} rows but at most ${field.rows} are allowed`,
    });
  }
  if (field.columns !== undefined) {
    const widest = Math.max(...lines.map((line) => Array.from(line).length));
    if (widest > field.columns) {
      problems.push({
        code: "too_many_columns",
        message: `has ${widest} columns but at most ${field.columns} are allowed`,
      });
    }
  }
  return problems;
};

const isNumeric = (value: any) =>
  (typeof value === "number" && isFinite(value)) ||
  (typeof value === "string" && value.trim() !== "" && isFinite(Number(value)));

const colorCode = (value: any): number | undefined => {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return undefined;
  const match = /^(?:\{(\d{1,2})\}|(\d{1,2}))$/.exec(value);
  return match ? Number(match[1] || match[2]) : undefined;
};

const checkField = (value: any, field: IVBMLSchemaField): Problem[] => {
  switch (field.type || "Text") {
    case "Numeric":
      return isNumeric(value)
        ? checkSize(String(value), field)
        : [{ code: "invalid_type", message: "must be a number or numeric string" }];
    case "Color": {
      const code = colorCode(value);
      return code !== undefined &&
        code >= CharacterCode.Red &&
        code <= CharacterCode.Filled &&
        Math.floor(code) === code
        ? []
        : [{ code: "invalid_color", message: "must be a color code from 63 to 71" }];
    }
    case "Enum": {
      const options = (field.options || []).map((option) => option.value);
      return options.indexOf(value) !== -1
        ? []
        : [{ code: "invalid_enum", message: `must be one of: ${options.join(", ")}` }];
    }
    default:
      return typeof value === "string"
        ? checkSize(value, field)
        : [{ code: "invalid_type", message: "must be a string" }];
  }
};

/** Throws VBMLSchemaError listing every prop that does not satisfy the schema. */
export const validateProps = (schema: VBMLSchema, props?: VBMLProps): void => {
  const issues: ISchemaIssue[] = [];

  Object.keys(schema).forEach((prop) => {
    const field = schema[prop];
    const value = props ? props[prop] : undefined;

    if (value === undefined || value === null) {
      if (field.required !== false) {
        issues.push({ prop, code: "missing", message: "is required but was not provided" });
      }
      return;
    }

    checkField(value, field).forEach((problem) =>
      issues.push({ prop, ...problem })
    );
  });

  if (issues.length > 0) throw new VBMLSchemaError(issues);
};
