import { assert } from "@sindresorhus/is";
import { emojiData } from "./data";
import { normalizeName } from "./utils.js";

export const search = (keyword: string) => {
  assert.string(keyword);

  keyword = normalizeName(keyword);

  return emojiData
    .filter(([name]) => name.includes(keyword))
    .map(([name, emoji]) => ({ emoji, name }));
};
