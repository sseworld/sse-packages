import { assert } from "@sindresorhus/is";
import { emojiCodesByName, emojiNamesByCode } from "./data.js";
import { normalizeCode, normalizeName } from "./utils.js";

export const has = (codeOrName: string) => {
  assert.string(codeOrName);

  return (
    emojiCodesByName.has(normalizeName(codeOrName)) ||
    emojiNamesByCode.has(normalizeCode(codeOrName))
  );
};
