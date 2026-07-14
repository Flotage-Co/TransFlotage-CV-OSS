# TransFlotage-CV

[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg)](LICENSE)

TransFlotage 留学工作室的学生在线简历系统 —— 中英双语、在线浏览、一键导出 A4 PDF。

项目采用「内容优先、页面独立、设计统一」的方式：先完成每名学生的简历内容，再由 AI 根据专业、经历和申请方向生成独立 TSX 页面。项目不提供统一信息采集模板，也不要求所有学生遵循固定内容 schema。

在线页面支持中英文切换、浏览器打印与 PDF 下载。所有学生共享同一套设计令牌、基础排版组件和 A4 打印规范。

示例页面见 [`resumes/demo.tsx`](resumes/demo.tsx)，本地跑起来后访问 `/demo`。

## 核心原则

- **学生页面独立**：每名学生对应 `resumes/<slug>.tsx`，章节、顺序和信息密度可以不同。
- **设计系统固定**：字体、灰阶、留白、宽度、控件、基础组件和打印规则保持一致。
- **AI 负责内容编排**：AI 根据学生情况决定如何组织教育、研究、项目、作品、实践和其他专业内容。
- **不编造事实**：页面只能使用已经确认的简历内容和材料。
- **双语分别编辑**：英文版与中文版各自符合对应语言的简历习惯，不要求逐字翻译。
- **网页与 PDF 同源**：打印当前页面，不维护另一套 PDF 模板。

## 技术栈

- Next.js 16（App Router、静态导出 `output: "export"`）
- React 19
- TypeScript
- Puppeteer（构建期批量生成 A4 PDF，仅 devDependency）
- 纯 CSS 设计令牌 —— 没有 UI 框架，也没有一个工具类；`app/globals.css` 顶部自带 reset

## 目录结构

```text
app/
  layout.tsx           根布局、字体和默认 Metadata
  [slug]/page.tsx      学生页面路由、静态参数和 Metadata
  globals.css          reset、设计令牌、页面样式和 A4 打印规则
components/
  Resume.tsx           共享简历排版组件
  ResumeSwitcher.tsx   双语切换与页面工具条
  DownloadButton.tsx   PDF 下载
  icons.tsx            统一图标
lib/
  pangu.ts             盘古之白（CJK 与拉丁字符间补空格）
resumes/
  index.ts             学生路由登记表
  types.ts             最小页面登记类型
  demo.tsx             独立学生页面示例
docs/
  页面设计规范.md      固定的视觉、文字和输出规范
  AI生成提示词.md      让 AI 直接生成学生 TSX 页面的提示词
scripts/
  render-pdf.mjs       批量生成 A4 PDF
  screenshot.mjs       页面截图
serve.json             本地预览的静态服务配置（关闭目录列表）
```

根路径 `/` 不提供简历索引 —— 学生页面只通过各自的直达链接访问。这一点需要**服务器配合**，见下方「部署」。

## 本地开发

```bash
npm install
npm run dev     # 开发服务器，http://localhost:3000
npm run lint
```

示例页面：`http://localhost:3000/demo`。英文为默认版本，中文版使用 `?lang=zh`。

## 构建与预览

项目是静态导出，`npm run build` 产出 `out/` 目录，交给任意静态服务器托管即可。

```bash
npm run build   # → out/
npm run start   # http://localhost:3000
```

> `npm run start` 用的是 `serve`，不是 `next start` —— 在 `output: "export"` 下 `next start` 会直接报错退出。

## 部署

把 `out/` 整个目录交给静态服务器即可，无需 Node 运行时。

有一条**必须配置**的规则：静态导出不会在根目录生成 `index.html`，多数静态服务器遇到这种情况会退回**目录列表**，把所有学生页面文件名一次列出来。本项目刻意不提供简历索引，因此需要显式关掉它：

- 本地预览由仓库根部的 `serve.json`（`"directoryListing": false`）负责，`npm run start` 已经带上。
- nginx 等生产环境请自行加上等价规则，例如：

  ```nginx
  autoindex off;
  location = / { return 404; }
  ```

部署后请确认 `/` 返回 404 而不是文件列表。

## 新增学生

1. 先完成并确认学生的最终中英文简历内容。
2. 阅读 [`docs/页面设计规范.md`](docs/页面设计规范.md)。
3. 使用 [`docs/AI生成提示词.md`](docs/AI生成提示词.md) 让 AI 生成 `resumes/<slug>.tsx`。
4. 在 `resumes/index.ts` 导入并登记学生页面。
5. 运行 `npm run lint` 和 `npm run build`。
6. 检查桌面端、窄屏、中英文和 A4 打印效果。

学生页面只需要提供最小登记信息：

- `slug`：页面路径。
- `cohort`：可选的届别，例如 `"27"`。
- `names`：中英文姓名，用于页面标题与 PDF 文件名。
- `descriptions`：可选的页面描述。
- `pages`：中英文 TSX 页面组件。

`cohort` 与 `slug` **直接拼接成单段路径**（中间没有斜杠），例如 `cohort: "27"` + `slug: "zhiyuan"` → `/27zhiyuan`，这样对外短链更紧凑。不填 `cohort` 时路径就是 `/<slug>`，示例页面因此保持为 `/demo`。

教育、经历、项目、作品、奖项等不再定义统一字段，页面可以根据学生情况自由组织。

## 共享排版组件

`components/Resume.tsx` 提供固定视觉语言下的基础组件，包括页头、章节、条目、列表、附注、网格和行内信息。AI 可以自由组合这些组件，但不应在学生页面中建立另一套字体、颜色、卡片或阴影体系。

如果某个专业确实需要特殊结构，可以在学生页面内增加局部语义结构；当同类结构重复出现时，再将其提炼为共享组件。

## PDF 输出

页面中的「PDF」按钮调用浏览器打印，并按「姓名 + CV + 语言 + 年月」生成文件名。

批量生成需要先有一个跑起来的站点：

```bash
npm run build
npm run start                                   # 另开一个终端
npm run pdf -- http://localhost:3000 demo public/pdf
```

默认同时输出英文版和中文版；若学生只有一个语言版本，在命令末尾加 `en` 或 `zh` 指定。生成的 PDF 不入库（见 `.gitignore`）。

## 隐私

仓库内只包含 `demo` 这一份**完全虚构**的示例简历。真实学生的简历内容、联系方式和成绩不属于本仓库 —— 请存放在私有仓库或私有分支中，不要提交到这里。

## 许可

[MIT](LICENSE) © TransFlotage
