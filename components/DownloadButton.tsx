"use client";

import { DownloadIcon } from "./icons";

/**
 * 下载 PDF：触发浏览器打印（@media print + @page A4 已在 globals.css 调好），
 * 与屏幕同一套 HTML，所见即所得。
 * 浏览器「另存为 PDF」默认用 document.title 作文件名，故打印前临时改标题、打印后还原，
 * 从而得到 ResumeSwitcher 算出的「名字_CV_语言_年月」文件名（规则见 docs/页面设计规范.md#pdf-文件名）。
 * scripts/render-pdf.mjs 覆盖 window.print 后点击本按钮抓同一个标题——文件名只有这一条代码路径。
 */
export function DownloadButton({ fileName }: { fileName?: string }) {
  const label = "PDF";

  function handleClick() {
    if (fileName) {
      const prev = document.title;
      document.title = fileName;
      const restore = () => {
        document.title = prev;
        window.removeEventListener("afterprint", restore);
      };
      window.addEventListener("afterprint", restore);
      window.print();
    } else {
      window.print();
    }
  }

  return (
    <button className="btn" onClick={handleClick} type="button">
      <DownloadIcon />
      {label}
    </button>
  );
}
