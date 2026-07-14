# AI 生成学生简历页面

本项目不再要求学生填写统一信息模板，也不要求 AI 输出固定 schema 的 JSON。正确流程是先完成简历内容，再让 AI 根据学生的专业、经历与申请方向组织页面。

把以下内容一并提供给 AI：

1. 已确认的中英文简历内容与原始依据。
2. [`页面设计规范.md`](页面设计规范.md)。
3. `components/Resume.tsx`、`resumes/types.ts` 和一个现有学生页面作为代码参考。

## 提示词

```text
你是 TransFlotage 留学工作室的简历页面编辑。请把已经确认的简历内容整理为一个独立的 React / TSX 学生页面。

目标文件：resumes/<slug>.tsx

工作原则：
- 先理解学生的专业、申请方向与经历强弱，再决定章节、顺序、标题和信息密度。
- 不套用固定章节模板。没有价值的章节不要创建；专业需要的特殊章节可以加入。
- 不编造、补全或推断学生没有提供的事实、数字、技能、排名和成果。
- 英文版与中文版分别按各自简历习惯编辑，不做逐字翻译。
- 页面必须复用 components/Resume.tsx 提供的共享组件，并遵守 docs/页面设计规范.md。
- 可自由组合 ResumeSection、ResumeEntry、ResumeBullets、ResumeNote、ResumeGrid 等组件。
- 如果现有组件确实无法表达专业所需内容，可以在学生文件内增加语义清晰的局部结构，但不得引入新的字体、颜色、阴影、卡片或视觉体系。
- 中文与英语或数字之间使用半角空格；不使用「·」堆叠信息；中文不使用斜体。
- 保留双语切换、PDF 下载和打印能力，不在学生页面内重复实现这些控件。

输出要求：
- 输出完整的 resumes/<slug>.tsx。
- 导出符合 StudentResume 类型的 <slug>Resume 常量。
- names.en、slug 和 pages.en 必填；正式学生填写 cohort，例如 cohort: "27" 与 slug: "zhiyuan" 拼成单段路径 /27zhiyuan（无斜杠）。demo 等特殊页面可以省略 cohort。
- 页面正文必须放在 ResumeDocument 内，并传入正确的 lang。
- 完成后把该常量登记到 resumes/index.ts。
- 运行 npm run lint 与 npm run build，保证页面可以静态生成。

输出前自检：
- 页面结构是否真正对应这名学生，而不是复制示例章节？
- 每一项事实是否有原始内容支持？
- 中英文内容是否各自自然、专业？
- 网页与 A4 打印是否都能清晰阅读？
```

## 落地流程

1. 完成并确认学生的最终简历内容。
2. 让 AI 生成 `resumes/<slug>.tsx`。
3. 在 `resumes/index.ts` 登记页面。
4. 运行 `npm run lint` 和 `npm run build`。
5. 本地检查英文、中文、窄屏和打印效果。
6. 内容与视觉确认后提交部署。
