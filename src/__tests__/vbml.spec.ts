import { Align, Justify, vbml } from "..";

describe("VBML", () => {
  it("Should parse a single component on a board", () => {
    const result = vbml.parse({
      style: {
        height: 1,
        width: 2,
      },
      components: [
        {
          template: "hi",
        },
      ],
    });

    expect(result).toEqual([[8, 9]]);
  });

  it("Should layout components side by side", () => {
    const result = vbml.parse({
      style: {
        height: 1,
        width: 4,
      },
      components: [
        {
          template: "hi",
          style: {
            width: 2,
            height: 1,
          },
        },
        {
          template: "hi",
          style: {
            width: 2,
            height: 1,
          },
        },
      ],
    });

    expect(result).toEqual([[8, 9, 8, 9]]);
  });

  it("Should layout components vertically", () => {
    const result = vbml.parse({
      style: {
        height: 2,
        width: 2,
      },
      components: [
        {
          template: "hi",
          style: {
            width: 2,
            height: 1,
          },
        },
        {
          template: "hi",
          style: {
            width: 2,
            height: 1,
          },
        },
      ],
    });

    expect(result).toEqual([
      [8, 9],
      [8, 9],
    ]);
  });

  it("Should flow a third component to the next line", () => {
    const result = vbml.parse({
      style: {
        height: 2,
        width: 4,
      },
      components: [
        {
          template: "{1}{2}",
          style: {
            width: 2,
            height: 1,
          },
        },
        {
          template: "{3}{4}",
          style: {
            width: 2,
            height: 1,
          },
        },
        {
          template: "{5}{6}",
          style: {
            width: 2,
            height: 1,
          },
        },
      ],
    });

    expect(result).toEqual([
      [1, 2, 3, 4],
      [5, 6, 0, 0],
    ]);
  });

  it("Should justify the content vertically", () => {
    const result = vbml.parse({
      style: {
        height: 5,
        width: 1,
      },
      components: [
        {
          template: "abcd",
          style: {
            height: 5,
            width: 1,
            align: Align.justified,
          },
        },
      ],
    });

    expect(result).toEqual([[0], [1], [2], [3], [4]]);
  });

  it("Should justify the content vertically with three characters and rows", () => {
    const result = vbml.parse({
      style: {
        height: 5,
        width: 1,
      },
      components: [
        {
          template: "abc",
          style: {
            height: 5,
            width: 1,
            align: Align.justified,
          },
        },
      ],
    });

    expect(result).toEqual([[0], [1], [2], [3], [0]]);
  });

  it("Should layout absolute components by relative components", () => {
    const result = vbml.parse({
      style: {
        height: 22,
        width: 6,
      },
      components: [
        {
          template: "abc",
          style: {
            height: 6,
            width: 22,
            align: Align.top,
            justify: Justify.left,
          },
        },
        {
          template: "def",
          style: {
            height: 1,
            width: 3,
            align: Align.top,
            justify: Justify.left,
            absolutePosition: {
              x: 3,
              y: 0,
            },
          },
        },
      ],
    });
    expect(result[0]).toEqual([
      1, 2, 3, 4, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);
  });

  it("Should layout absolute components over relative components", () => {
    const result = vbml.parse({
      style: {
        height: 22,
        width: 6,
      },
      components: [
        {
          template: "abc",
          style: {
            height: 6,
            width: 22,
            align: Align.top,
            justify: Justify.left,
          },
        },
        {
          template: "def",
          style: {
            height: 1,
            width: 3,
            align: Align.top,
            justify: Justify.left,
            absolutePosition: {
              x: 0,
              y: 0,
            },
          },
        },
      ],
    });
    expect(result[0]).toEqual([
      4, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);
  });

  it("Should layout absolute components over relative components", () => {
    const result = vbml.parse({
      style: {
        height: 6,
        width: 22,
      },
      components: [
        {
          template: "abc",
          style: {
            height: 6,
            width: 22,
            align: Align.top,
            justify: Justify.left,
          },
        },
        {
          template: "def",
          style: {
            height: 1,
            width: 3,
            align: Align.top,
            justify: Justify.left,
            absolutePosition: {
              x: 0,
              y: 0,
            },
          },
        },
      ],
    });
    expect(result[0]).toEqual([
      4, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);
  });

  it("Should layout raw components", () => {
    const result = vbml.parse({
      style: {
        height: 6,
        width: 22,
      },
      components: [
        {
          rawCharacters: [[1, 2, 3]],
        },
      ],
    });
    expect(result[0]).toEqual([
      1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);
  });

  it("Should layout absolute components with raw components for a mountain background clock", () => {
    const result = vbml.parse({
      props: {
        time: "12:00 PM",
      },
      style: {
        height: 6,
        width: 22,
      },
      components: [
        {
          rawCharacters: [
            [
              68, 68, 68, 68, 68, 69, 69, 68, 68, 68, 68, 68, 68, 68, 68, 68,
              68, 68, 68, 68, 68, 68,
            ],
            [
              68, 68, 68, 68, 69, 69, 69, 69, 68, 68, 68, 68, 68, 68, 68, 68,
              65, 65, 65, 65, 68, 68,
            ],
            [
              63, 63, 63, 69, 66, 69, 66, 69, 69, 63, 63, 63, 63, 63, 63, 65,
              65, 65, 65, 65, 65, 63,
            ],
            [
              63, 63, 66, 66, 66, 69, 66, 66, 66, 66, 63, 63, 63, 63, 63, 65,
              65, 65, 65, 65, 65, 63,
            ],
            [
              64, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 64, 64, 64, 64, 64,
              65, 65, 65, 65, 64, 64,
            ],
            [
              66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 64, 64, 64, 64,
              64, 64, 64, 64, 64, 64,
            ],
          ],
        },
        {
          template: "{{time}}",
          style: {
            height: 1,
            width: 8,
            absolutePosition: {
              x: 11,
              y: 3,
            },
          },
        },
      ],
    });
    // visual representation of the result
    // https://web.vestaboard.com/board/cda490a3-aaa5-4f2d-9018-a41cd365328a/compose/duplicate/[[68,68,68,68,68,69,69,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68],[68,68,68,68,69,69,69,69,68,68,68,68,68,68,68,68,65,65,65,65,68,68],[63,63,63,69,66,69,66,69,69,63,63,63,63,63,63,65,65,65,65,65,65,63],[63,63,66,66,66,69,66,66,66,66,63,27,28,50,36,36,0,16,13,65,65,63],[64,66,66,66,66,66,66,66,66,66,66,64,64,64,64,64,65,65,65,65,64,64],[66,66,66,66,66,66,66,66,66,66,66,66,64,64,64,64,64,64,64,64,64,64]]
    expect(result).toEqual([
      [
        68, 68, 68, 68, 68, 69, 69, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68,
        68, 68, 68, 68,
      ],
      [
        68, 68, 68, 68, 69, 69, 69, 69, 68, 68, 68, 68, 68, 68, 68, 68, 65, 65,
        65, 65, 68, 68,
      ],
      [
        63, 63, 63, 69, 66, 69, 66, 69, 69, 63, 63, 63, 63, 63, 63, 65, 65, 65,
        65, 65, 65, 63,
      ],
      [
        63, 63, 66, 66, 66, 69, 66, 66, 66, 66, 63, 27, 28, 50, 36, 36, 0, 16,
        13, 65, 65, 63,
      ],
      [
        64, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 64, 64, 64, 64, 64, 65, 65,
        65, 65, 64, 64,
      ],
      [
        66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 64, 64, 64, 64, 64, 64,
        64, 64, 64, 64,
      ],
    ]);
  });
});
