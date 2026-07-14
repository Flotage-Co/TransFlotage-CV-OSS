/**
 * 盘古之白：在 CJK 文字与拉丁字母/数字之间插入一个半角空格。
 * 幂等——已有空格不重复插入。全站文案渲染前统一过一遍。
 * 见 docs/页面设计规范.md §4「内容与文字规范」。
 */
const CJK = "⺀-⻿⼀-⿟぀-ゟ゠-ヿ㐀-䶿一-鿿豈-﫿";
// 与 CJK 相邻需补白的"另一侧"字符：拉丁字母、数字、部分符号
const ALNUM = "a-zA-Z0-9@&%=\\$\\^\\*\\-\\+\\\\/¡-ÿ•‧";

const reBefore = new RegExp(`([${CJK}])([${ALNUM}])`, "g");
const reAfter = new RegExp(`([${ALNUM}])([${CJK}])`, "g");

export function pangu(text: string): string {
  if (!text) return text;
  return text.replace(reBefore, "$1 $2").replace(reAfter, "$1 $2");
}
