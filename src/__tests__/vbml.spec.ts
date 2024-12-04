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

  it("Should layout a calendar component for Christmas 🎄", () => {
    const result = vbml.parse({
      style: {
        height: 6,
        width: 22,
      },
      components: [
        {
          calendar: {
            defaultDayColor: 66,
            month: "12",
            year: "2024",
            days: {
              "25": 63,
            },
          },
          style: {
            absolutePosition: {
              x: 0,
              y: 0,
            },
          },
        },
      ],
    });
    expect(result).toEqual([
      [
        27, 28, 59, 28, 30, 19, 13, 20, 23, 20, 6, 19, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0,
      ],
      [
        0, 27, 44, 33, 0, 66, 66, 66, 66, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
      ],
      [
        0, 34, 44, 27, 30, 66, 66, 66, 66, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0,
      ],
      [
        27, 31, 44, 28, 27, 66, 66, 66, 66, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0,
      ],
      [
        28, 28, 44, 28, 34, 66, 66, 66, 63, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0,
      ],
      [
        28, 35, 44, 29, 27, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
      ],
    ]);
    expect(result[0].length).toEqual(22);
    expect(result[1].length).toEqual(22);
    expect(result[2].length).toEqual(22);
    expect(result[3].length).toEqual(22);
    expect(result[4].length).toEqual(22);
    expect(result[5].length).toEqual(22);
  });

  it("Should layout a minimalist calendar component", () => {
    const result = vbml.parse({
      style: {
        height: 6,
        width: 22,
      },
      components: [
        {
          style: {
            absolutePosition: {
              x: 0,
              y: 0,
            },
          },
          calendar: {
            defaultDayColor: 66,
            hideDates: true,
            hideMonthYear: true,
            hideSMTWTFS: true,
            month: "12",
            year: "2024",
            days: {
              "25": 63,
            },
          },
        },
      ],
    });
    expect(result).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 66, 66, 66, 66, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 66, 66, 66, 66, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 66, 66, 66, 66, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 66, 66, 66, 63, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    expect(result[0].length).toEqual(22);
    expect(result[1].length).toEqual(22);
    expect(result[2].length).toEqual(22);
    expect(result[3].length).toEqual(22);
    expect(result[4].length).toEqual(22);
    expect(result[5].length).toEqual(22);
  });

  it("Should layout a calendar component with other components", () => {
    const result = vbml.parse({
      style: {
        height: 6,
        width: 22,
      },
      components: [
        {
          // absolute position Right
          template: "December 2024 Calendar",
          style: {
            height: 6,
            width: 10,
            absolutePosition: {
              x: 13,
              y: 0,
            },
          },
        },

        {
          calendar: {
            month: "12",
            year: "2024",
            days: {
              "1": 63,
              "2": 64,
              "3": 65,
              "4": 66,
              "5": 67,
              "6": 68,
              "7": 63,
            },
          },
          style: {
            absolutePosition: {
              x: 0,
              y: 0,
            },
          },
        },
      ],
    });
    expect(result).toEqual([
      [
        27, 28, 59, 28, 30, 19, 13, 20, 23, 20, 6, 19, 0, 4, 5, 3, 5, 13, 2, 5,
        18, 0,
      ],
      [
        0, 27, 44, 33, 0, 63, 64, 65, 66, 67, 68, 63, 0, 28, 36, 28, 30, 0, 0,
        0, 0, 0,
      ],
      [
        0, 34, 44, 27, 30, 65, 65, 65, 65, 65, 65, 65, 0, 3, 1, 12, 5, 14, 4, 1,
        18, 0,
      ],
      [
        27, 31, 44, 28, 27, 65, 65, 65, 65, 65, 65, 65, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0,
      ],
      [
        28, 28, 44, 28, 34, 65, 65, 65, 65, 65, 65, 65, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0,
      ],
      [
        28, 35, 44, 29, 27, 65, 65, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
      ],
    ]);

    expect(result[0].length).toEqual(22);
    expect(result[1].length).toEqual(22);
    expect(result[2].length).toEqual(22);
    expect(result[3].length).toEqual(22);
    expect(result[4].length).toEqual(22);
    expect(result[5].length).toEqual(22);
  });

  it("Should layout a calendar component on the right", () => {
    const result = vbml.parse({
      style: {
        height: 6,
        width: 22,
      },
      components: [
        {
          // absolute position Left
          template: "Merry Christmas",
          style: {
            height: 6,
            width: 10,
            absolutePosition: {
              x: 0,
              y: 0,
            },
          },
        },

        {
          calendar: {
            defaultDayColor: 66,
            month: "12",
            year: "2028",
            days: {
              "25": 63,
            },
          },
          style: {
            absolutePosition: {
              x: 10,
              y: 0,
            },
          },
        },
      ],
    });
    expect(result).toEqual([
      [
        13, 5, 18, 18, 25, 0, 0, 0, 0, 0, 27, 28, 59, 28, 34, 19, 13, 20, 23,
        20, 6, 19,
      ],
      [
        3, 8, 18, 9, 19, 20, 13, 1, 19, 0, 0, 27, 44, 28, 0, 0, 0, 0, 0, 0, 66,
        66,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 29, 44, 35, 0, 66, 66, 66, 66, 66, 66,
        66,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 36, 44, 27, 32, 66, 66, 66, 66, 66,
        66, 66,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 33, 44, 28, 29, 66, 66, 66, 66, 66,
        66, 66,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 30, 44, 29, 27, 66, 63, 66, 66, 66,
        66, 66,
      ],
    ]);
    expect(result[0].length).toEqual(22);
    expect(result[1].length).toEqual(22);
    expect(result[2].length).toEqual(22);
    expect(result[3].length).toEqual(22);
    expect(result[4].length).toEqual(22);
    expect(result[5].length).toEqual(22);
  });

  it("Should layout a calendar component on the left", () => {
    const result = vbml.parse({
      style: {
        height: 6,
        width: 22,
      },
      components: [
        {
          // absolute position right
          template: "Merry Christmas",
          style: {
            height: 6,
            width: 10,
            absolutePosition: {
              x: 13,
              y: 0,
            },
          },
        },

        {
          calendar: {
            defaultDayColor: 66,
            month: "12",
            year: "2024",
            hideDates: true,
            hideMonthYear: true,
            days: {
              "25": 63,
            },
          },
          style: {
            absolutePosition: {
              x: -3,
              y: 0,
            },
          },
        },
      ],
    });
    console.log(result);
    console.log(vbml.characterCodesToAscii(result));
    expect(result).toEqual([
      [
        0, 0, 19, 13, 20, 23, 20, 6, 19, 0, 0, 0, 0, 13, 5, 18, 18, 25, 0, 0, 0,
        0,
      ],
      [
        0, 0, 66, 66, 66, 66, 66, 66, 66, 0, 0, 0, 0, 3, 8, 18, 9, 19, 20, 13,
        1, 19,
      ],
      [0, 0, 66, 66, 66, 66, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 66, 66, 66, 66, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 66, 66, 66, 63, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    expect(result[0].length).toEqual(22);
    expect(result[1].length).toEqual(22);
    expect(result[2].length).toEqual(22);
    expect(result[3].length).toEqual(22);
    expect(result[4].length).toEqual(22);
    expect(result[5].length).toEqual(22);
  });
});
