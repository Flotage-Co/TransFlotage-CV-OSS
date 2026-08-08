/**
 * 生成 Safari 兜底图标：public/favicon.ico（32px）+ public/apple-touch-icon.png（180px）。
 * Safari 不支持 SVG data-URI favicon（Chrome/Firefox 里学生页仍是姓首字母 SVG），
 * 会回退请求 /favicon.ico——这里生成品牌图形（白圆 + T，与 app/layout.tsx 的
 * brandIcon 同源）作为全站兜底。图形改动后重跑本脚本并提交产物。
 * 用法: node scripts/make-favicon.mjs
 */
import puppeteer from "puppeteer";
import { writeFile } from "fs/promises";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#ffffff"/><text x="32" y="46.2" text-anchor="middle" font-family="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="40" font-weight="600" fill="#171717">T</text></svg>`;

const browser = await puppeteer.launch({ headless: true });
try {
  const page = await browser.newPage();

  /** @param {number} size @param {boolean} transparent 透明背景（ico 用）；触屏图标要不透明白底 */
  async function shot(size, transparent) {
    await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
    await page.setContent(
      `<style>*{margin:0}</style><img src="data:image/svg+xml,${encodeURIComponent(svg)}" width="${size}" height="${size}">`,
    );
    return page.screenshot({
      omitBackground: transparent,
      clip: { x: 0, y: 0, width: size, height: size },
    });
  }

  const png32 = Buffer.from(await shot(32, true));
  const png180 = Buffer.from(await shot(180, false));

  // ICO 容器（PNG 载荷）：ICONDIR(6B) + ICONDIRENTRY(16B) + PNG
  const header = Buffer.alloc(22);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // 1 张
  header[6] = 32; // 宽
  header[7] = 32; // 高
  header.writeUInt16LE(1, 10); // planes
  header.writeUInt16LE(32, 12); // bpp
  header.writeUInt32LE(png32.length, 14);
  header.writeUInt32LE(22, 18); // PNG 偏移
  await writeFile("public/favicon.ico", Buffer.concat([header, png32]));
  await writeFile("public/apple-touch-icon.png", png180);
  console.log("✓ public/favicon.ico + public/apple-touch-icon.png");
} finally {
  await browser.close();
}
