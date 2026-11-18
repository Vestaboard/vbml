export type SchemaIssueCode =
  | "missing"
  | "invalid_type"
  | "too_many_columns"
  | "too_many_rows"
  | "invalid_color"
  | "invalid_enum";

export interface ISchemaIssue {
  prop: string;
  code: SchemaIssueCode;
  message: string;
}

/** Thrown when props do not satisfy the schema. */
export class VBMLSchemaError extends Error {
  issues: ISchemaIssue[];

  constructor(issues: ISchemaIssue[]) {
    super(
      `Props do not match the schema:\n${issues
        .map((issue) => `- ${issue.prop}: ${issue.message}`)
        .join("\n")}`
    );
    // Required for instanceof to work when targeting ES5
    Object.setPrototypeOf(this, VBMLSchemaError.prototype);
    this.name = "VBMLSchemaError";
    this.issues = issues;
  }
}

/** Thrown when the schema definition itself is malformed. */
export class VBMLSchemaDefinitionError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, VBMLSchemaDefinitionError.prototype);
    this.name = "VBMLSchemaDefinitionError";
  }
}
