/**
 * 用 Puppeteer 把在线简历打印成 A4 PDF（与屏幕同一套 HTML）。
 * 默认同时生成英文版和中文版（?lang=zh）。
 * 用法: node scripts/render-pdf.mjs <baseUrl> <routePath> [outDir] [lang]
 *   lang 省略 = en + zh 都生成；指定 en / zh 只生成对应版本。
 * 例:   node scripts/render-pdf.mjs http://localhost:3939 demo public/pdf
 */
import puppeteer from "puppeteer";
import { mkdir } from "fs/promises";
import path from "path";

const baseUrl = process.argv[2] ?? "http://localhost:3939";
const routePath = process.argv[3] ?? "demo";
const outDir = process.argv[4] ?? "public/pdf";
const only = process.argv[5]; // en | zh | undefined

const langs = only ? [only] : ["en", "zh"];

const browser = await puppeteer.launch({ headless: true });
try {
  await mkdir(outDir, { recursive: true });
  const page = await browser.newPage();
  for (const lang of langs) {
    const url =
      lang === "en"
        ? `${baseUrl}/${routePath}`
        : `${baseUrl}/${routePath}?lang=${lang}`;
    await page.goto(url, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 500)); // 等 ?lang 切换 + 字体加载
    await page.emulateMediaType("print");
    const fileStem = routePath.replaceAll("/", "-");
    const out = path.join(outDir, `${fileStem}.${lang}.pdf`);
    await page.pdf({
      path: out,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });
    console.log(`✓ PDF 生成: ${out}`);
  }
} finally {
  await browser.close();
}
