import puppeteer from "puppeteer";

const baseUrl = process.argv[2] ?? "http://localhost:3939";
const routePath = process.argv[3] ?? "demo";
const out = process.argv[4] ?? "/tmp/shot.png";

const browser = await puppeteer.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1100, height: 1400, deviceScaleFactor: 2 });
  await page.goto(`${baseUrl}/${routePath}`, { waitUntil: "networkidle0" });
  await page.screenshot({ path: out, fullPage: true });
  console.log(`✓ screenshot: ${out}`);
} finally {
  await browser.close();
}
