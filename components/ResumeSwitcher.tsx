"use client";

import type { ReactNode } from "react";
import { useSyncExternalStore } from "react";
import type { Lang } from "@/resumes/types";
import { DownloadButton } from "./DownloadButton";
import { ArrowUpIcon } from "./icons";

function subscribeToLanguageChange(callback: () => void) {
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
}

function getLanguageFromUrl(): Lang {
  return new URLSearchParams(window.location.search).get("lang") === "zh"
    ? "zh"
    : "en";
}

function getServerLanguage(): Lang {
  return "en";
}

function titleCase(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

/**
 * 英文 PDF 文件名的名字部分（规则见 docs/页面设计规范.md#pdf-文件名）：
 * 取 names.en 的名（去括号昵称、Title Case），如 Zhiyuan LIN → Zhiyuan；
 * 中文名是两字的单字名（陈昕 → Xin）过于含糊，补姓区分：Xin_Chen。
 * 前提是 names.en 按「名在前、姓在后」书写（约定见设计规范）。
 */
function enNamePart(en: string, zh?: string): string {
  const words = en
    .replace(/\([^)]*\)|（[^）]*）/g, " ")
    .trim()
    .split(/\s+/);
  const given = titleCase(words[0]);
  const isSingleCharGivenName = zh?.length === 2; // 两字中文名 = 姓 + 单字名
  return isSingleCharGivenName && words.length > 1
    ? `${given}_${titleCase(words[words.length - 1])}`
    : given;
}

export function ResumeSwitcher({
  names,
  en,
  zh,
}: {
  names: Record<"en", string> & Partial<Record<"zh", string>>;
  en: ReactNode;
  zh?: ReactNode;
}) {
  const hasZh = Boolean(zh);
  const requestedLanguage = useSyncExternalStore(
    subscribeToLanguageChange,
    getLanguageFromUrl,
    getServerLanguage,
  );

  function choose(next: Lang) {
    const url = new URL(window.location.href);
    if (next === "en") url.searchParams.delete("lang");
    else url.searchParams.set("lang", next);
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  const shown: Lang = requestedLanguage === "zh" && zh ? "zh" : "en";
  const now = new Date();
  const yymm =
    String(now.getFullYear() % 100).padStart(2, "0") +
    String(now.getMonth() + 1).padStart(2, "0");
  // 文件名 <名字>_CV_<语言>_<年月>：中文版用中文全名（林知远_CV_ZH_2608），
  // 英文版用英文名（Zhiyuan_CV_EN_2608；单字名补姓 Jia_Liu_CV_EN_2608）。
  const namePart =
    shown === "zh" && names.zh
      ? names.zh.replace(/\s+/g, "")
      : enNamePart(names.en, names.zh);
  const fileName = `${namePart}_CV_${shown.toUpperCase()}_${yymm}`;

  return (
    <>
      <div className="toolbar">
        {hasZh && (
          <div className="langtoggle" role="group" aria-label="Language / 语言">
            <button
              type="button"
              className={shown === "en" ? "is-active" : ""}
              aria-pressed={shown === "en"}
              onClick={() => choose("en")}
            >
              EN
            </button>
            <button
              type="button"
              className={shown === "zh" ? "is-active" : ""}
              aria-pressed={shown === "zh"}
              onClick={() => choose("zh")}
            >
              ZH
            </button>
          </div>
        )}
        <DownloadButton fileName={fileName} />
      </div>

      {shown === "zh" && zh ? zh : en}

      <div className="actions">
        <button
          type="button"
          className="btn btn--icon"
          aria-label={shown === "en" ? "Back to top" : "回到顶部"}
          title={shown === "en" ? "Back to top" : "回到顶部"}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUpIcon />
        </button>
        <DownloadButton fileName={fileName} />
      </div>
    </>
  );
}
