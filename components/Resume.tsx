import type { ReactNode } from "react";
import { pangu as P } from "@/lib/pangu";
import { ContactIcon, type ContactIconName } from "./icons";
import type { Lang } from "@/resumes/types";

export function ResumeDocument({
  lang,
  children,
}: {
  lang: Lang;
  children: ReactNode;
}) {
  // lang 属性跟随简历语言（根布局是 en）：读屏发音、翻译提示、字体回退都依赖它。
  return (
    <article
      className={`resume resume--${lang}`}
      lang={lang === "zh" ? "zh-CN" : "en"}
    >
      {children}
    </article>
  );
}

export type ResumeContact = {
  label: string;
  href?: string;
  icon?: ContactIconName;
};

export function ResumeHeader({
  name,
  nameEn,
  summary,
  contacts = [],
  layout: layoutProp,
}: {
  name: string;
  nameEn?: string;
  summary?: string;
  contacts?: ResumeContact[];
  /**
   * 强制布局；省略时自动判断：无 summary → compact，有 summary 且联系方式
   * ≤3 → split，更多 → stack（名字/联系方式/summary 自上而下）。
   * compact 与 split 共用 .r-head__top 结构，仅 summary 有无之差，
   * `.r-head--compact` 无专属 CSS 规则、类名只作语义锚点（见 globals.css 抬头段注释）。
   */
  layout?: "compact" | "split" | "stack";
}) {
  const layout =
    layoutProp ?? (!summary ? "compact" : contacts.length <= 3 ? "split" : "stack");
  const nameBlock = (
    <h1 className="r-name r-id" translate="no">
      {name}
      {nameEn && <span className="r-name__en">{nameEn}</span>}
    </h1>
  );
  const contactBlock = contacts.map((contact) => {
    const content = (
      <>
        <ContactIcon icon={contact.icon} />
        {contact.label}
      </>
    );
    return contact.href ? (
      <a
        key={`${contact.label}-${contact.href}`}
        className="r-contact__item"
        href={contact.href}
        target={contact.href.startsWith("http") ? "_blank" : undefined}
        rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    ) : (
      <span key={contact.label} className="r-contact__item">
        {content}
      </span>
    );
  });

  return (
    <header className={`r-head r-head--${layout}`}>
      {layout === "stack" ? (
        <>
          {nameBlock}
          <div className="r-contact r-contact--row">{contactBlock}</div>
          {summary && <p className="r-summary">{P(summary)}</p>}
        </>
      ) : (
        <>
          <div className="r-head__top">
            {nameBlock}
            <div className="r-contact r-contact--list">{contactBlock}</div>
          </div>
          {summary && <p className="r-summary">{P(summary)}</p>}
        </>
      )}
    </header>
  );
}

export function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="r-section">
      <h2 className="r-section__title">{title}</h2>
      {children}
    </section>
  );
}

type ResumeEntryProps = {
  title: string;
  href?: string;
  location?: string;
  role?: ReactNode;
  date?: string;
  children?: ReactNode;
} & (
  | { titleSuffix?: never; lang?: never }
  | {
      /**
       * 并列在 title 后的括号补充，不加粗，括号随 lang 取全角（中文）或
       * 半角（英文）——页面内不要自己写括号。两类用途：
       * 1. 机构资质标注，如「双一流 A 类、985 工程」。
       * 2. 中英文名缺一不可识别的机构附另一语言名——罕见，默认不用：
       *    中文版有通行中文名时直接用中文名，不附英文直译括号（详见
       *    docs/页面设计规范.md §4）；只有英文名通行时（如 ZONST Data
       *    Group）直接拿英文名当 title 即可。
       */
      titleSuffix: string;
      /** titleSuffix 括号的语言，与所在 ResumeDocument 保持一致。 */
      lang: Lang;
    }
);

export function ResumeEntry({
  title,
  titleSuffix,
  lang,
  href,
  location,
  role,
  date,
  children,
}: ResumeEntryProps) {
  return (
    <div className="r-entry">
      <div className="r-entry__head">
        <p className="r-entry__org">
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {P(title)} ↗
            </a>
          ) : (
            P(title)
          )}
          {titleSuffix && (
            <span className="r-entry__org-suffix">
              {lang === "zh" ? `（${P(titleSuffix)}）` : ` (${P(titleSuffix)})`}
            </span>
          )}
        </p>
        {location && <span className="r-entry__loc">{P(location)}</span>}
      </div>
      {(role || date) && (
        <div className="r-entry__line">
          <span className="r-entry__role">
            {typeof role === "string" ? P(role) : role}
          </span>
          {date && <span className="r-entry__date">{date}</span>}
        </div>
      )}
      {children}
    </div>
  );
}

export function ResumeBullets({ children }: { children: ReactNode }) {
  return <ul className="r-bullets">{children}</ul>;
}

export function ResumeBullet({ children }: { children: ReactNode }) {
  return <li>{typeof children === "string" ? P(children) : children}</li>;
}

export function ResumeNote({
  children,
  plain = false,
}: {
  children: ReactNode;
  /** 去掉英文斜体（如 Relevant Coursework），正体显示。 */
  plain?: boolean;
}) {
  return (
    <p className={plain ? "r-note r-note--plain" : "r-note"}>
      {typeof children === "string" ? P(children) : children}
    </p>
  );
}

export function ResumeGrid({ children }: { children: ReactNode }) {
  return <div className="r-skills">{children}</div>;
}

export function ResumeGridRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <>
      <span className="r-skill__cat">{P(label)}</span>
      <span className="r-skill__items">
        {typeof children === "string" ? P(children) : children}
      </span>
    </>
  );
}

export function ResumeInline({
  label,
  children,
  lang,
}: {
  label: string;
  children: ReactNode;
  lang: Lang;
}) {
  return (
    <p className="r-inline">
      <span className="r-inline__label">
        {P(label)}
        {lang === "zh" ? "：" : ": "}
      </span>
      {typeof children === "string" ? P(children) : children}
    </p>
  );
}
