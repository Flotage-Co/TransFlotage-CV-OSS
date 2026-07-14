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
  return <article className={`resume resume--${lang}`}>{children}</article>;
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
  /** 强制布局；省略时按有无 summary / 联系方式数量自动判断。stack = 联系方式横排于名字下方。 */
  layout?: "split" | "stack";
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

export function ResumeEntry({
  title,
  titleSuffix,
  href,
  location,
  role,
  date,
  children,
}: {
  title: string;
  titleSuffix?: string;
  href?: string;
  location?: string;
  role?: ReactNode;
  date?: string;
  children?: ReactNode;
}) {
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
          {titleSuffix && <span className="r-entry__org-en">（{titleSuffix}）</span>}
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
