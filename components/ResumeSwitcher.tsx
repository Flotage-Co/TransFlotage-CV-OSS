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
  const activeName = names[shown] ?? names.en;
  const now = new Date();
  const yymm =
    String(now.getFullYear() % 100).padStart(2, "0") +
    String(now.getMonth() + 1).padStart(2, "0");
  const fileName = `${activeName.replace(/\s+/g, "")}CV-${shown.toUpperCase()}-${yymm}`;

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
        <DownloadButton lang={shown} fileName={fileName} />
      </div>

      {shown === "zh" && zh ? zh : en}

      <div className="actions">
        <button
          type="button"
          className="btn btn--ghost btn--icon"
          aria-label={shown === "en" ? "Back to top" : "回到顶部"}
          title={shown === "en" ? "Back to top" : "回到顶部"}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUpIcon />
        </button>
        <DownloadButton lang={shown} fileName={fileName} />
      </div>
    </>
  );
}
