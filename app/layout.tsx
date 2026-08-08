import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Inter,
  Libre_Baskerville,
  Noto_Sans_SC,
} from "next/font/google";
import "./globals.css";

/**
 * 简历字体：英文衬线 Cormorant Garamond（姓名）+ Libre Baskerville（正文），
 * 中文无衬线 Inter + Noto Sans SC。next/font 在构建期下载并自托管到
 * _next/static，浏览器零请求 Google——网络到 fonts.googleapis.com 不通的
 * 地区（如中国大陆）不再回退系统字体、阻塞渲染。四款均为 variable 字体，
 * 不锁字重档位；生成的 --font-* 变量接入 globals.css 的 --font-body /
 * --font-name 字体栈。斜体只有英文正文在用（Libre）；中文版斜体一律正体
 * （设计规范 §3），故 Inter 不载 italic。
 */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
});
const libre = Libre_Baskerville({
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-libre",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
// 中文字形不是可 preload 的命名 subset：按 unicode-range 分片自托管，用到才加载
const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sc",
});

// 品牌默认 favicon：白色圆圈 + "T"（TransFlotage）。学生页会用姓首字母覆盖它。
// Safari 不吃 SVG data-URI，会回退请求 /favicon.ico——兜底文件在 public/，
// 由 scripts/make-favicon.mjs 生成（图形与此处同源，改动要一起改）。
const brandIcon = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">` +
    `<circle cx="32" cy="32" r="32" fill="#ffffff"/>` +
    `<text x="32" y="46.2" text-anchor="middle" ` +
    `font-family="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" ` +
    `font-size="40" font-weight="600" fill="#171717">T</text></svg>`,
)}`;

export const metadata: Metadata = {
  title: "TransFlotage 在线简历",
  description: "TransFlotage 留学工作室 — 学生在线简历",
  icons: { icon: brandIcon },
  // 简历页只应凭直达链接访问，不做索引。本仓库示例是虚构的，但真实部署里
  // 简历带手机号/邮箱/成绩，被搜索引擎收录等于个人信息变成可搜索——默认
  // 关掉，避免下游填入真人数据后忘记这一步。
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 默认版本是英文简历，根语言为 en；中英文正文各自在 ResumeDocument 上标注 lang。
    // 字体变量必须挂在 <html>：globals.css 的 :root 用 var(--font-inter) 等组装
    // --font-body，挂在 <body> 上时 :root 取不到值，整条 --font-body 作废（CSS 规范：
    // 自定义属性引用未定义变量即失效），页面 chrome 会掉到浏览器默认字体。
    <html
      lang="en"
      className={`${cormorant.variable} ${libre.variable} ${inter.variable} ${notoSansSC.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
