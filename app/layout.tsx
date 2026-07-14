import type { Metadata } from "next";
import "./globals.css";

// 品牌默认 favicon：白色圆圈 + "T"（TransFlotage）。学生页会用姓首字母覆盖它。
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        {/* 英文简历：Cormorant Garamond + Libre Baskerville（衬线）；中文简历：Inter + Noto Sans SC（无衬线） */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Noto+Sans+SC:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
