import { demoResume } from "./demo";
import type { StudentResume } from "./types";

/**
 * 学生路由登记表。
 * 新增学生时导入其独立 TSX 文件并加入此处；正文结构由该文件自行决定。
 */
const resumes = [demoResume] satisfies StudentResume[];

export function getResumePath(resume: StudentResume): string {
  // 届别与 slug 直接拼成单段路径，如 27 + zhiyuan → "27zhiyuan"（对外短链更紧凑）。
  return [resume.cohort, resume.slug].filter(Boolean).join("");
}

const resumeByPath = new Map(
  resumes.map((resume) => [getResumePath(resume), resume]),
);

export function listResumes(): readonly StudentResume[] {
  return resumes;
}

export function getStudentResume(path: string): StudentResume | undefined {
  return resumeByPath.get(path);
}
