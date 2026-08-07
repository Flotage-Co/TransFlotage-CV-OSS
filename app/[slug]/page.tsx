import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResumeSwitcher } from "@/components/ResumeSwitcher";
import { getResumePath, getStudentResume, listResumes } from "@/resumes";

export const dynamicParams = false;

export function generateStaticParams() {
  return listResumes().map((resume) => ({ slug: getResumePath(resume) }));
}

function makeFavicon(name: string): string {
  const initial = (name.trim().charAt(0) || "?").toUpperCase();
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">` +
    `<circle cx="32" cy="32" r="32" fill="#ffffff"/>` +
    `<text x="32" y="46.2" text-anchor="middle" ` +
    `font-family="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" ` +
    `font-size="40" font-weight="600" fill="#171717">${initial}</text>` +
    `</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export async function generateMetadata(
  props: PageProps<"/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const resume = getStudentResume(slug);
  if (!resume) return { title: "Not found – Curriculum Vitae" };
  return {
    title: `${resume.names.en} – Curriculum Vitae`,
    description: resume.descriptions?.en,
    icons: { icon: makeFavicon(resume.names.en) },
  };
}

export default async function ResumePage(props: PageProps<"/[slug]">) {
  const { slug } = await props.params;
  const resume = getStudentResume(slug);
  if (!resume) notFound();

  const EnglishPage = resume.pages.en;
  const ChinesePage = resume.pages.zh;

  return (
    <main className="screen">
      <ResumeSwitcher
        names={resume.names}
        en={<EnglishPage />}
        zh={ChinesePage ? <ChinesePage /> : undefined}
      />
    </main>
  );
}
