import type { ComponentType } from "react";

export type Lang = "en" | "zh";

/**
 * 每名学生只登记路由与页面级元信息。
 * 简历正文由独立 TSX 组件自由组织，不受统一内容 schema 限制。
 */
export type StudentResume = {
  slug: string;
  /** 届别路径，如 "27"；不填时直接使用 /<slug>，用于 demo 等特殊页面。 */
  cohort?: string;
  names: Record<"en", string> & Partial<Record<"zh", string>>;
  descriptions?: Partial<Record<Lang, string>>;
  pages: Record<"en", ComponentType> & Partial<Record<"zh", ComponentType>>;
};
