"use client";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function PdfDownloadButton({
  contentId,
}: {
  contentId: string;
}) {
  function handleDownload() {
    const element = document.getElementById(contentId);

    if (!element) {
      console.error(`Element with ID '${contentId}' not found`);
      return;
    }

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${contentId}_report.pdf`);
    });
  }

  return (
    <button
      onClick={handleDownload}
      className="flex h-10 items-center bg-gradient-to-r from-emerald-400 to-green-500 py-2 px-4 rounded-md inline-block text-white text-lg font-bold shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
    >
      Tải xuống PDF
    </button>
  );
}
