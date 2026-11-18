import {
  Color,
  Evidence,
  IVBML,
  SchemaType,
  VBMLSchemaDefinitionError,
  VBMLSchemaError,
  vbml,
} from "..";

describe("vbml.parse with schema", () => {
  const definition = (props: any, schema: any = undefined): IVBML => ({
    props,
    schema: schema || {
      team: {
        description: "Team name",
        columns: 8,
        evidence: Evidence.GeneralFact,
      },
    },
    components: [{ template: "{{team}}" }],
  });

  it("parses normally when props satisfy the schema", () => {
    const result = vbml.parse(definition({ team: "Lakers" }));
    expect(result).toEqual(vbml.parse({ ...definition({ team: "Lakers" }), schema: undefined }));
  });

  it("is unchanged when no schema is given", () => {
    expect(() =>
      vbml.parse({ props: {}, components: [{ template: "{{team}}" }] })
    ).not.toThrow();
  });

  it("throws VBMLSchemaError when props do not meet the schema", () => {
    expect(() => vbml.parse(definition({ team: "Timberwolves" }))).toThrow(
      VBMLSchemaError
    );
    expect(() => vbml.parse(definition({}))).toThrow(VBMLSchemaError);
  });

  it("throws VBMLSchemaDefinitionError for a malformed schema, before checking props", () => {
    expect(() =>
      vbml.parse(
        definition({}, { team: { type: SchemaType.Enum, description: "d", evidence: "Freeform" } })
      )
    ).toThrow(VBMLSchemaDefinitionError);
  });

  it("exports a semantic Color map", () => {
    expect(Color).toEqual({
      Red: 63,
      Orange: 64,
      Yellow: 65,
      Green: 66,
      Blue: 67,
      Violet: 68,
      White: 69,
      Black: 70,
      Filled: 71,
    });
  });

  it("works with a JSON-parsed definition", () => {
    const json: IVBML = JSON.parse(
      JSON.stringify({
        props: { c: "{63}" },
        schema: {
          c: { type: "Color", description: "Accent", evidence: "Freeform" },
        },
        components: [{ template: "{{c}}" }],
      })
    );
    expect(vbml.parse(json)[0]).toContain(63);
  });
});
