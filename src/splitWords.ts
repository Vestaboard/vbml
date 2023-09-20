import curry from "lodash/fp/curry";
const colorMatchKeepDelim = /({.*?})/g;

export const splitWords = curry((width: number, template: string) =>
  template
    // convert spaces to character code 0 to make parsing more consistent
    .replaceAll(" ", "{0}")
    .split(colorMatchKeepDelim)
    .reduce((acc: Array<string>, curr: string) => {
      //split up new lines
      if (curr.includes("\n")) {
        const split = curr.split(/(\n)/);
        return [...acc, ...split];
      }
      return [...acc, curr];
    }, [])
    // split long words up into chunks that fit a line
    .reduce((acc: Array<string>, curr) => {
      // ignore colors and character codes for chunking since for edge case of width 2
      if (curr.startsWith("{") && curr.endsWith("}")) {
        return [...acc, curr];
      }
      if (curr.length > width) {
        const chunks = chunkString(curr, width);
        return [...acc, ...chunks];
      }
      return [...acc, curr];
    }, [])
    .filter((phrase) => !!phrase)
);

const chunkString = (word: string, width: number) => {
  const regexChunk = new RegExp(`.{1,${width}}`, "g");
  return word.match(regexChunk) as Array<string>;
};
