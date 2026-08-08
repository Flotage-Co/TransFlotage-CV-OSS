/**
 * 用 Puppeteer 把在线简历打印成 A4 PDF（与屏幕同一套 HTML）。
 * 默认生成英文版和中文版（?lang=zh）；没有中文版的学生自动只出英文版。
 * 用法: node scripts/render-pdf.mjs <baseUrl> <routePath> [outDir] [lang]
 *   lang 省略 = 有的版本都生成；指定 en / zh 只生成对应版本。
 * 例:   node scripts/render-pdf.mjs http://localhost:3939 demo public/pdf
 *
 * 文件名不在本脚本计算：覆盖 window.print() 后点击页面上的真实下载按钮，
 * 抓打印瞬间的 document.title——与网页「另存为 PDF」走同一条代码路径，
 * 规则只在 components/ResumeSwitcher.tsx 一处（见 docs/页面设计规范.md#pdf-文件名）。
 */
import puppeteer from "puppeteer";
import { mkdir } from "fs/promises";
import path from "path";

const baseUrl = process.argv[2] ?? "http://localhost:3939";
const routePath = process.argv[3] ?? "demo";
const outDir = process.argv[4] ?? "public/pdf";
const only = process.argv[5]; // en | zh | undefined

if (only && only !== "en" && only !== "zh") {
  console.error(`未知语言「${only}」，只支持 en / zh`);
  process.exit(1);
}

const browser = await puppeteer.launch({ headless: true });
try {
  await mkdir(outDir, { recursive: true });
  const page = await browser.newPage();

  // 拦截打印：下载按钮打印前会把 document.title 改成文件名，抓的就是它
  await page.evaluateOnNewDocument(() => {
    window.__printedTitle = null;
    window.print = () => {
      window.__printedTitle = document.title;
    };
  });

  // 先探测有没有中文版：有语言切换器（.langtoggle）= 登记了 pages.zh
  await page.goto(`${baseUrl}/${routePath}`, { waitUntil: "networkidle0" });
  await page.waitForSelector(".resume--en");
  const hasZh = (await page.$(".langtoggle")) !== null;
  if (only === "zh" && !hasZh) {
    console.error(`✗ ${routePath} 没有中文版`);
    process.exit(1);
  }
  const langs = only ? [only] : hasZh ? ["en", "zh"] : ["en"];
  if (!only && !hasZh) console.log(`· ${routePath} 只有英文版，跳过中文`);

  for (const lang of langs) {
    const url =
      lang === "en"
        ? `${baseUrl}/${routePath}`
        : `${baseUrl}/${routePath}?lang=${lang}`;
    await page.goto(url, { waitUntil: "networkidle0" });
    // ?lang=zh 是客户端切换：等对应语言版本真正挂载，不赌固定延时
    await page.waitForSelector(`.resume--${lang}`);
    await page.evaluate(() => document.fonts.ready.then(() => {}));

    await page.click(".toolbar .btn"); // 顶部工具条里唯一的 .btn 是下载按钮
    const fileName = await page.evaluate(() => window.__printedTitle);
    if (!fileName) {
      throw new Error("没抓到打印文件名——下载按钮没有触发 window.print？");
    }
    const out = path.join(outDir, `${fileName}.pdf`);
    // page.pdf 本身按 @media print 渲染，无需 emulateMediaType
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
