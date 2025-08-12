import { colorCodes, randomColors } from "../randomColors";

describe("Random colors", () => {
  it("Should fill a board with random colors", () => {
    // Take 3 random colors from the default colorCodes
    const colors = colorCodes.sort(() => 0.5 - Math.random()).slice(0, 3);
    const result = randomColors(6, 22, colors);

    expect(result.length).toBe(6);
    expect(result[0].length).toBe(22);
  });
});
