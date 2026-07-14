"use client";

import { DownloadIcon } from "./icons";
import type { Lang } from "@/resumes/types";

/**
 * 下载 PDF：触发浏览器打印（@media print + @page A4 已在 globals.css 调好），
 * 与屏幕同一套 HTML，所见即所得。按钮文案跟随当前简历语言。
 * 浏览器"另存为 PDF"默认用 document.title 作文件名，故打印前临时改标题、打印后还原，
 * 从而得到「姓名CV-语言-年月」格式的文件名（如 LinZhiyuanCV-EN-2607 / 林知远CV-ZH-2607）。
 */
export function DownloadButton({
  fileName,
}: {
  lang?: Lang;
  fileName?: string;
}) {
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
