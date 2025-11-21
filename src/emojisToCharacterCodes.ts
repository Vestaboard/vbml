export const emojisToCharacterCodes = (template: string) =>
  template
    .replace(/🟥/g, "{63}")
    .replace(/🟧/g, "{64}")
    .replace(/🟨/g, "{65}")
    .replace(/🟩/g, "{66}")
    .replace(/🟦/g, "{67}")
    .replace(/🟪/g, "{68}")
    .replace(/⬜/g, "{69}")
    .replace(/⬛/g, "{70}")

    // Handle special case for ß to SS
    .replace("ß", "SS");
