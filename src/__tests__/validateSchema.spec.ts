import { VBMLSchemaDefinitionError } from "../schemaErrors";
import { validateSchema } from "../validateSchema";

const ok = { description: "d", evidence: "Freeform" };

const messageOf = (schema: any): string | undefined => {
  try {
    validateSchema(schema);
  } catch (e) {
    expect(e).toBeInstanceOf(VBMLSchemaDefinitionError);
    expect((e as Error).name).toBe("VBMLSchemaDefinitionError");
    return (e as Error).message;
  }
  return undefined;
};

describe("validateSchema", () => {
  it("accepts a valid schema of every type", () => {
    expect(
      messageOf({
        a: { ...ok },
        b: { ...ok, type: "Text", rows: 2, columns: 10 },
        c: { ...ok, type: "Numeric", evidence: "TemporalFact" },
        d: { ...ok, type: "Color", evidence: "GeneralFact" },
        e: {
          ...ok,
          type: "Enum",
          options: [{ value: "x", description: "X" }],
          evidenceRule: "Use the same game as away_score.",
          required: false,
        },
      })
    ).toBeUndefined();
  });

  it("requires a description", () => {
    expect(messageOf({ a: { evidence: "Freeform" } })).toMatch(/a.*description/);
    expect(messageOf({ a: { ...ok, description: "" } })).toMatch(
      /a.*description/
    );
  });

  it("treats evidence as optional (defaults to Freeform)", () => {
    expect(messageOf({ a: { description: "d" } })).toBeUndefined();
    expect(
      messageOf({ a: { description: "d", evidence: undefined } })
    ).toBeUndefined();
  });

  it("rejects an invalid evidence when provided", () => {
    expect(messageOf({ a: { ...ok, evidence: "Guess" } })).toMatch(
      /a.*evidence/
    );
    expect(messageOf({ a: { ...ok, evidence: null } })).toMatch(/a.*evidence/);
  });

  it("rejects a non-string evidenceRule", () => {
    expect(messageOf({ a: { ...ok, evidenceRule: 5 } })).toMatch(
      /a.*evidenceRule/
    );
  });

  it("rejects an unknown type", () => {
    expect(messageOf({ a: { ...ok, type: "Date" } })).toMatch(/a.*type/);
  });

  it.each([0, -1, 1.5, "3"])("rejects rows/columns of %p", (v) => {
    expect(messageOf({ a: { ...ok, rows: v } })).toMatch(/a.*rows/);
    expect(messageOf({ a: { ...ok, columns: v } })).toMatch(/a.*columns/);
  });

  it("rejects a non-boolean required", () => {
    expect(messageOf({ a: { ...ok, required: "yes" } })).toMatch(
      /a.*required/
    );
  });

  describe("Enum options", () => {
    it("are required for Enum", () => {
      expect(messageOf({ a: { ...ok, type: "Enum" } })).toMatch(/a.*options/);
    });

    it("must not be empty", () => {
      expect(messageOf({ a: { ...ok, type: "Enum", options: [] } })).toMatch(
        /a.*options/
      );
    });

    it("must each have a string value and description", () => {
      expect(
        messageOf({ a: { ...ok, type: "Enum", options: [{ value: "x" }] } })
      ).toMatch(/a.*options/);
      expect(
        messageOf({
          a: { ...ok, type: "Enum", options: [{ description: "x" }] },
        })
      ).toMatch(/a.*options/);
    });

    it("must have unique values", () => {
      expect(
        messageOf({
          a: {
            ...ok,
            type: "Enum",
            options: [
              { value: "x", description: "1" },
              { value: "x", description: "2" },
            ],
          },
        })
      ).toMatch(/a.*duplicate/i);
    });

    it("are not allowed on non-Enum types", () => {
      expect(
        messageOf({
          a: { ...ok, options: [{ value: "x", description: "X" }] },
        })
      ).toMatch(/a.*options/);
    });
  });

  it("rejects a schema that is not an object, or a field that is not an object", () => {
    expect(messageOf([])).toBeDefined();
    expect(messageOf("x")).toBeDefined();
    expect(messageOf({ a: "x" })).toMatch(/a/);
  });
});
