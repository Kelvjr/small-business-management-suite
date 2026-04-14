import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export type ExportRow = Record<
  string,
  string | number | boolean | null | undefined | Date
>;

function safeFileName(name: string) {
  return name.trim().toLowerCase().replace(/[^a-z0-9-_]+/g, "-");
}

function toText(value: ExportRow[string]) {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

function triggerBrowserDownload(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

export function exportRowsToCsv(rows: ExportRow[], fileBaseName: string) {
  if (!rows.length) {
    throw new Error("No rows available to export.");
  }

  const headers = Object.keys(rows[0]);
  const csvLines = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((header) => {
          const value = toText(row[header]).replace(/"/g, '""');
          return `"${value}"`;
        })
        .join(","),
    ),
  ];

  const csvContent = csvLines.join("\n");
  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  triggerBrowserDownload(blob, `${safeFileName(fileBaseName)}.csv`);
}

export function exportRowsToExcel(rows: ExportRow[], fileBaseName: string) {
  if (!rows.length) {
    throw new Error("No rows available to export.");
  }

  const worksheet = XLSX.utils.json_to_sheet(
    rows.map((row) =>
      Object.fromEntries(
        Object.entries(row).map(([key, value]) => [key, toText(value)]),
      ),
    ),
  );
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Export");
  XLSX.writeFile(workbook, `${safeFileName(fileBaseName)}.xlsx`);
}

export function exportRowsToPdf(
  rows: ExportRow[],
  fileBaseName: string,
  title: string,
) {
  if (!rows.length) {
    throw new Error("No rows available to export.");
  }

  const headers = Object.keys(rows[0]);
  const body = rows.map((row) => headers.map((header) => toText(row[header])));

  const doc = new jsPDF({
    orientation: headers.length > 6 ? "landscape" : "portrait",
    unit: "pt",
    format: "a4",
  });

  doc.setFontSize(14);
  doc.text(title, 40, 30);

  autoTable(doc, {
    head: [headers],
    body,
    startY: 45,
    styles: {
      fontSize: 9,
      cellPadding: 4,
    },
    headStyles: {
      fillColor: [33, 37, 41],
    },
  });

  doc.save(`${safeFileName(fileBaseName)}.pdf`);
}
