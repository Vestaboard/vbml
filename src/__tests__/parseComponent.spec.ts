import { parseComponent } from "../parseComponent";
import { Align, IVBMLComponent, Justify } from "../types";

describe("Parse Component", () => {
  it("Should format a message with plain text", () => {
    const input: IVBMLComponent = {
      template: "Hello World!",
    };
    const result = parseComponent(1, 12)(input);
    expect(result).toEqual([[8, 5, 12, 12, 15, 0, 23, 15, 18, 12, 4, 37]]);
  });

  it("Should format a longer message with plain text", () => {
    const input: IVBMLComponent = {
      template: "Thank you for having us!",
    };

    const result = parseComponent(2, 12)(input);
    expect(result).toEqual([
      [20, 8, 1, 14, 11, 0, 25, 15, 21, 0, 0, 0],
      [6, 15, 18, 0, 8, 1, 22, 9, 14, 7, 0, 0],
    ]);
  });

  it("Should format a longer message center with plain text", () => {
    const input: IVBMLComponent = {
      template: "Thank you for having us!",
      style: {
        justify: Justify.center,
      },
    };

    const result = parseComponent(2, 22)(input);

    expect(result).toEqual([
      [
        0, 20, 8, 1, 14, 11, 0, 25, 15, 21, 0, 6, 15, 18, 0, 8, 1, 22, 9, 14, 7,
        0,
      ],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 19, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });

  it("Should add extra spaces", () => {
    const input: IVBMLComponent = {
      template: "Hello World!",
    };

    const result = parseComponent(1, 13)(input);
    expect(result).toEqual([[8, 5, 12, 12, 15, 0, 23, 15, 18, 12, 4, 37, 0]]);
  });

  it("Should automatically break the line", () => {
    const input: IVBMLComponent = {
      template: "Hello World!",
    };

    const result = parseComponent(2, 6)(input);
    expect(result).toEqual([
      [8, 5, 12, 12, 15, 0],
      [23, 15, 18, 12, 4, 37],
    ]);
  });

  it("Should not break the line if it doesn't need to", () => {
    const input: IVBMLComponent = {
      template: "Hello World!",
    };

    const result = parseComponent(3, 13)(input);
    expect(result).toEqual([
      [8, 5, 12, 12, 15, 0, 23, 15, 18, 12, 4, 37, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });

  it("Should vertically align bottom", () => {
    const input: IVBMLComponent = {
      template: "!",
      style: {
        align: Align.bottom,
      },
    };

    const result = parseComponent(4, 1)(input);
    expect(result).toEqual([[0], [0], [0], [37]]);
  });

  it("Should vertically align to the center", () => {
    const input: IVBMLComponent = {
      template: "!",
      style: {
        align: Align.center,
      },
    };

    const result = parseComponent(3, 1)(input);
    expect(result).toEqual([[0], [37], [0]]);
  });

  it("Should vertically align to the center with multiple rows", () => {
    const input: IVBMLComponent = {
      template: "!",
      style: {
        align: Align.center,
      },
    };

    const result = parseComponent(5, 1)(input);
    expect(result).toEqual([[0], [0], [37], [0], [0]]);
  });

  it("Should vertically align to the center by sticking to the top if there is not even padding", () => {
    const input: IVBMLComponent = {
      template: "!",
      style: {
        align: Align.center,
      },
    };

    const result = parseComponent(6, 1)(input);
    expect(result).toEqual([[0], [0], [37], [0], [0], [0]]);
  });

  it("Should horizontally align right", () => {
    const input: IVBMLComponent = {
      template: "!",
      style: {
        justify: Justify.right,
      },
    };

    const result = parseComponent(1, 3)(input);
    expect(result).toEqual([[0, 0, 37]]);
  });

  it("Should horizontally align center", () => {
    const input: IVBMLComponent = {
      template: "!",
      style: {
        justify: Justify.center,
      },
    };

    const result = parseComponent(1, 3)(input);
    expect(result).toEqual([[0, 37, 0]]);
  });

  it("Should horizontally align justified", () => {
    const input: IVBMLComponent = {
      template: "the quick brown fox jumped over the lazy dog",
      style: {
        justify: Justify.justified,
      },
    };

    const result = parseComponent(6, 22)(input);

    expect(result).toEqual([
      [
        0, 20, 8, 5, 0, 17, 21, 9, 3, 11, 0, 2, 18, 15, 23, 14, 0, 6, 15, 24, 0,
        0,
      ],
      [
        0, 10, 21, 13, 16, 5, 4, 0, 15, 22, 5, 18, 0, 20, 8, 5, 0, 12, 1, 26,
        25, 0,
      ],
      [0, 4, 15, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });

  it("Should horizontally and vertically align center", () => {
    const input: IVBMLComponent = {
      template: "!",
      style: {
        justify: Justify.center,
        align: Align.center,
      },
    };

    const result = parseComponent(3, 3)(input);
    expect(result).toEqual([
      [0, 0, 0],
      [0, 37, 0],
      [0, 0, 0],
    ]);
  });

  it("Should parse character codes", () => {
    const input: IVBMLComponent = {
      template: "{1}{2}{3}",
      style: {
        justify: Justify.center,
        align: Align.center,
      },
    };

    const result = parseComponent(1, 3)(input);
    expect(result).toEqual([[1, 2, 3]]);
  });

  it("Should break on lines with character codes", () => {
    const input: IVBMLComponent = {
      template: "{1}{2} {3}{4}",
      style: {
        justify: Justify.center,
        align: Align.center,
      },
    };

    const result = parseComponent(2, 3)(input);
    expect(result).toEqual([
      [1, 2, 0],
      [3, 4, 0],
    ]);
  });

  it("Should parse two-digit character codes", () => {
    const input: IVBMLComponent = {
      template: "{68}{69}",
      style: {
        justify: Justify.center,
        align: Align.center,
      },
    };

    const result = parseComponent(1, 2)(input);

    expect(result).toEqual([[68, 69]]);
  });

  it("Should throw for invalid character codes", () => {
    const input: IVBMLComponent = {
      template: "{99}",
      style: {
        justify: Justify.center,
        align: Align.center,
      },
    };

    expect(() => {
      parseComponent(1, 1)(input);
    }).toThrow();
  });

  it("Should allow newlines", () => {
    const input: IVBMLComponent = {
      template: "{1}\n{1}",
    };

    const result = parseComponent(2, 2)(input);

    expect(result).toEqual([
      [1, 0],
      [1, 0],
    ]);
  });

  it("Should allow newlines after spaces", () => {
    const input: IVBMLComponent = {
      template: "{1} \n{1}",
    };

    const result = parseComponent(2, 2)(input);

    expect(result).toEqual([
      [1, 0],
      [1, 0],
    ]);
  });

  it("Should allow newlines before spaces", () => {
    const input: IVBMLComponent = {
      template: "{1}\n{0}{1}",
      style: {
        justify: Justify.center,
      },
    };

    const result = parseComponent(2, 2)(input);

    expect(result).toEqual([
      [1, 0],
      [0, 1],
    ]);
  });

  it("Should add template props", () => {
    const input: IVBMLComponent = {
      template: "{{greeting}} World",
    };

    const result = parseComponent(1, 11, {
      greeting: "Hello",
    })(input);

    expect(result).toEqual([[8, 5, 12, 12, 15, 0, 23, 15, 18, 12, 4]]);
  });

  it("Should allow conditions", () => {
    const input: IVBMLComponent = {
      template: "I am {{#isHappy}}Happy{{/isHappy}}{{^isHappy}}Mad{{/isHappy}}",
    };

    const result = parseComponent(1, 10, {
      isHappy: true,
    })(input);

    expect(result).toEqual([[9, 0, 1, 13, 0, 8, 1, 16, 16, 25]]);

    const result2 = parseComponent(1, 10, {
      isHappy: false,
    })(input);

    expect(result2).toEqual([[9, 0, 1, 13, 0, 13, 1, 4, 0, 0]]);
  });

  it("Should allow arrays to be iterated", () => {
    const input: IVBMLComponent = {
      template: "{{#numbers}}{{.}}{{/numbers}}",
    };

    const result = parseComponent(1, 3, {
      numbers: [1, 2, 3],
    })(input);

    expect(result).toEqual([[27, 28, 29]]);
  });

  it("Should split long words", () => {
    const input: IVBMLComponent = {
      template: "{1}{2}{3}{4}",
    };

    const result = parseComponent(2, 2)(input);

    expect(result).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });
});
