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

    // Map heart variants to char 62, which Flagship boards render as a heart.
    // ❤️ (with U+FE0F variation selector) must be replaced before bare ❤.
    .replace(/❤️/g, "{62}")
    .replace(/❤/g, "{62}")
    .replace(/🧡/g, "{62}")
    .replace(/💛/g, "{62}")
    .replace(/💚/g, "{62}")
    .replace(/💙/g, "{62}")
    .replace(/💜/g, "{62}")
    .replace(/🖤/g, "{62}")
    .replace(/🤍/g, "{62}")
    .replace(/🤎/g, "{62}")

    // Handle special case for ß to SS
    .replace(/ß/g, "SS");
