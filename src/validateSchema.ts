import { VBMLSchemaDefinitionError } from "./schemaErrors";
import { Evidence, SchemaType } from "./types";

const isObject = (value: any) =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isPositiveInteger = (value: any) =>
  typeof value === "number" && isFinite(value) && Math.floor(value) === value && value > 0;

const values = (obj: { [key: string]: string }) =>
  Object.keys(obj).map((key) => obj[key]);

const fail = (prop: string, message: string): never => {
  throw new VBMLSchemaDefinitionError(`Invalid schema for "${prop}": ${message}`);
};

const validateField = (prop: string, field: any) => {
  if (!isObject(field)) fail(prop, "field definition must be an object");

  if (typeof field.description !== "string" || field.description === "") {
    fail(prop, "description is required");
  }

  if (
    field.evidence !== undefined &&
    values(Evidence).indexOf(field.evidence) === -1
  ) {
    fail(prop, `evidence must be one of ${values(Evidence).join(", ")}`);
  }

  if (field.evidenceRule !== undefined && typeof field.evidenceRule !== "string") {
    fail(prop, "evidenceRule must be a string");
  }

  const type = field.type === undefined ? SchemaType.Text : field.type;
  if (values(SchemaType).indexOf(type) === -1) {
    fail(prop, `type must be one of ${values(SchemaType).join(", ")}`);
  }

  ["rows", "columns"].forEach((key) => {
    if (field[key] !== undefined && !isPositiveInteger(field[key])) {
      fail(prop, `${key} must be a positive integer`);
    }
  });

  if (field.required !== undefined && typeof field.required !== "boolean") {
    fail(prop, "required must be a boolean");
  }

  if (type !== SchemaType.Enum) {
    if (field.options !== undefined) {
      fail(prop, "options are only allowed when type is Enum");
    }
    return;
  }

  if (!Array.isArray(field.options) || field.options.length === 0) {
    fail(prop, "options must be a non-empty array when type is Enum");
  }
  const seen: { [value: string]: boolean } = {};
  field.options.forEach((option: any) => {
    if (
      !isObject(option) ||
      typeof option.value !== "string" ||
      typeof option.description !== "string"
    ) {
      fail(prop, "each of options needs a string value and description");
    }
    if (seen[option.value]) {
      fail(prop, `duplicate option value "${option.value}"`);
    }
    seen[option.value] = true;
  });
};

/** Throws VBMLSchemaDefinitionError if the schema itself is malformed. */
export const validateSchema = (schema: any): void => {
  if (!isObject(schema)) {
    throw new VBMLSchemaDefinitionError("Invalid schema: must be an object");
  }
  Object.keys(schema).forEach((prop) => validateField(prop, schema[prop]));
};
