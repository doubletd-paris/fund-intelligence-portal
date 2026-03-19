"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Download } from "lucide-react";
import { Button, Card } from "@/components/ui/primitives";

type DataTableValue = string | number | null | undefined;

interface Column {
  key: string;
  label: string;
  kind?: "text" | "link";
  hrefKey?: string;
}

export function DataTable({
  title,
  rows,
  columns
}: {
  title?: string;
  rows: Record<string, DataTableValue>[];
  columns: Column[];
}) {
  const handleExport = () => {
    const header = columns.map((column) => column.label).join(",");
    const body = rows
      .map((row) =>
        columns
          .map((column) => {
            const value = row[column.key];
            return typeof value === "string" || typeof value === "number" ? `"${value}"` : '""';
          })
          .join(",")
      )
      .join("\n");
    const blob = new Blob([`${header}\n${body}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${(title || "table").toLowerCase().replace(/\s+/g, "-")}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-line/80 px-5 py-4">
        <div>{title ? <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{title}</h3> : null}</div>
        <Button variant="secondary" className="gap-2" onClick={handleExport}>
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={String(column.key)} className="px-5 py-3 font-medium">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-t border-line/70">
                {columns.map((column) => {
                  const value = row[column.key];
                  const content: ReactNode =
                    column.kind === "link" && column.hrefKey && typeof row[column.hrefKey] === "string" ? (
                      <Link href={String(row[column.hrefKey])} className="font-medium text-accent">
                        {String(value ?? "-")}
                      </Link>
                    ) : (
                      String(value ?? "-")
                    );

                  return (
                    <td key={String(column.key)} className="px-5 py-4 text-ink">
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
