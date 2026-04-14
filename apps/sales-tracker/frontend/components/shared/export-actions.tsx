"use client";

import { Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  exportRowsToCsv,
  exportRowsToExcel,
  exportRowsToPdf,
  type ExportRow,
} from "@/lib/exporters";

type ExportActionsProps = {
  rows: ExportRow[];
  fileBaseName: string;
  pdfTitle: string;
};

export function ExportActions({
  rows,
  fileBaseName,
  pdfTitle,
}: ExportActionsProps) {
  function runExport(action: () => void, label: string) {
    try {
      action();
      toast.success(`${label} export complete`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to export data.";
      toast.error(message);
    }
  }

  const disabled = rows.length === 0;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={disabled}
        onClick={() =>
          runExport(() => exportRowsToCsv(rows, fileBaseName), "CSV")
        }
      >
        <Download className="size-4" />
        CSV
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={disabled}
        onClick={() =>
          runExport(() => exportRowsToExcel(rows, fileBaseName), "Excel")
        }
      >
        <Download className="size-4" />
        Excel
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={disabled}
        onClick={() =>
          runExport(() => exportRowsToPdf(rows, fileBaseName, pdfTitle), "PDF")
        }
      >
        <Download className="size-4" />
        PDF
      </Button>
    </div>
  );
}
