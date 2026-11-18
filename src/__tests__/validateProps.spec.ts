import { VBMLSchemaError } from "../schemaErrors";
import { validateProps } from "../validateProps";
import { VBMLSchema } from "../types";

const base = { description: "d", evidence: "Freeform" } as const;

const issuesOf = (schema: VBMLSchema, props: any) => {
  try {
    validateProps(schema, props);
  } catch (e) {
    expect(e).toBeInstanceOf(VBMLSchemaError);
    return (e as VBMLSchemaError).issues;
  }
  return [];
};

describe("validateProps", () => {
  describe("required", () => {
    it("throws when a declared prop is missing", () => {
      expect(issuesOf({ a: { ...base } }, {})).toEqual([
        expect.objectContaining({ prop: "a", code: "missing" }),
      ]);
    });

    it("treats null and undefined as missing", () => {
      expect(issuesOf({ a: { ...base } }, { a: null })[0].code).toBe("missing");
      expect(issuesOf({ a: { ...base } }, { a: undefined })[0].code).toBe(
        "missing"
      );
    });

    it("treats missing props as missing when props is undefined", () => {
      expect(issuesOf({ a: { ...base } }, undefined)[0].code).toBe("missing");
    });

    it("allows missing props when required is false", () => {
      expect(issuesOf({ a: { ...base, required: false } }, {})).toEqual([]);
    });

    it("still validates an optional prop when it is provided", () => {
      const schema: VBMLSchema = {
        a: { ...base, required: false, type: "Numeric" },
      };
      expect(issuesOf(schema, { a: "abc" })[0].code).toBe("invalid_type");
    });

    it("ignores props that are not declared in the schema", () => {
      expect(issuesOf({ a: { ...base } }, { a: "x", extra: [[1]] })).toEqual(
        []
      );
    });
  });

  describe("Text", () => {
    it("is the default type and accepts strings", () => {
      expect(issuesOf({ a: { ...base } }, { a: "hello" })).toEqual([]);
    });

    it("rejects non-strings", () => {
      expect(issuesOf({ a: { ...base } }, { a: 5 })[0].code).toBe(
        "invalid_type"
      );
      expect(issuesOf({ a: { ...base } }, { a: [[1]] })[0].code).toBe(
        "invalid_type"
      );
    });

    it("allows a value that exactly fills the columns", () => {
      expect(
        issuesOf({ a: { ...base, columns: 6 } }, { a: "Lakers" })
      ).toEqual([]);
    });

    it("rejects a value that exceeds the columns", () => {
      expect(
        issuesOf({ a: { ...base, columns: 5 } }, { a: "Lakers" })[0].code
      ).toBe("too_many_columns");
    });

    it("measures columns per line, not across the whole string", () => {
      expect(
        issuesOf({ a: { ...base, columns: 3 } }, { a: "abc\ndef" })
      ).toEqual([]);
    });

    it("rejects too many rows", () => {
      expect(
        issuesOf({ a: { ...base, rows: 2 } }, { a: "a\nb\nc" })[0].code
      ).toBe("too_many_rows");
    });

    it("allows exactly the max rows", () => {
      expect(issuesOf({ a: { ...base, rows: 2 } }, { a: "a\nb" })).toEqual([]);
    });

    it("counts {nn} tokens as a single cell", () => {
      expect(
        issuesOf({ a: { ...base, columns: 4 } }, { a: "Go {63}" })
      ).toEqual([]);
    });

    it("counts color emoji as a single cell", () => {
      expect(
        issuesOf({ a: { ...base, columns: 4 } }, { a: "Go 🟥" })
      ).toEqual([]);
    });

    it("reports both rows and columns problems", () => {
      const codes = issuesOf(
        { a: { ...base, rows: 1, columns: 1 } },
        { a: "ab\ncd" }
      ).map((i) => i.code);
      expect(codes).toEqual(["too_many_rows", "too_many_columns"]);
    });
  });

  describe("Numeric", () => {
    const schema: VBMLSchema = { a: { ...base, type: "Numeric" } };

    it.each([42, 3.5, -1, 0, "42", "-3.5", "0"])("accepts %p", (v) => {
      expect(issuesOf(schema, { a: v })).toEqual([]);
    });

    it.each([NaN, Infinity, "", "  ", "abc", "4x", true, {}, []])(
      "rejects %p",
      (v) => {
        expect(issuesOf(schema, { a: v })[0].code).toBe("invalid_type");
      }
    );

    it("applies columns to the string form", () => {
      const s: VBMLSchema = { a: { ...base, type: "Numeric", columns: 3 } };
      expect(issuesOf(s, { a: 999 })).toEqual([]);
      expect(issuesOf(s, { a: 1000 })[0].code).toBe("too_many_columns");
    });
  });

  describe("Color", () => {
    const schema: VBMLSchema = { a: { ...base, type: "Color" } };

    it.each([63, 70, 71, "63", "{63}", "{71}"])("accepts %p", (v) => {
      expect(issuesOf(schema, { a: v })).toEqual([]);
    });

    it.each([62, 72, 0, "red", "{62}", "{72}", "{}", "", 63.5, null === 1])(
      "rejects %p",
      (v) => {
        expect(issuesOf(schema, { a: v })[0].code).toBe("invalid_color");
      }
    );
  });

  describe("Enum", () => {
    const schema: VBMLSchema = {
      a: {
        ...base,
        type: "Enum",
        options: [
          { value: "home", description: "Home team" },
          { value: "away", description: "Away team" },
        ],
      },
    };

    it("accepts a listed value", () => {
      expect(issuesOf(schema, { a: "home" })).toEqual([]);
    });

    it("rejects an unlisted value, case-sensitively", () => {
      expect(issuesOf(schema, { a: "Home" })[0].code).toBe("invalid_enum");
      expect(issuesOf(schema, { a: "neutral" })[0].code).toBe("invalid_enum");
    });

    it("lists the valid options in the message", () => {
      expect(issuesOf(schema, { a: "x" })[0].message).toContain("home");
      expect(issuesOf(schema, { a: "x" })[0].message).toContain("away");
    });
  });

  describe("multiple problems", () => {
    it("collects every issue into one VBMLSchemaError", () => {
      const schema: VBMLSchema = {
        a: { ...base },
        b: { ...base, type: "Numeric" },
        c: { ...base, type: "Color" },
      };
      const issues = issuesOf(schema, { b: "x", c: 5 });
      expect(issues.map((i) => [i.prop, i.code])).toEqual([
        ["a", "missing"],
        ["b", "invalid_type"],
        ["c", "invalid_color"],
      ]);
    });

    it("puts every issue in the error message", () => {
      try {
        validateProps({ a: { ...base }, b: { ...base } }, {});
        fail("should throw");
      } catch (e) {
        expect((e as Error).message).toContain("a");
        expect((e as Error).message).toContain("b");
        expect((e as Error).name).toBe("VBMLSchemaError");
      }
    });
  });
});
