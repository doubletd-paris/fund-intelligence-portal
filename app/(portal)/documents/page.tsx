import { documents } from "@/data/mock-data";
import { PageShell } from "@/components/layout/page-shell";
import { Card } from "@/components/ui/primitives";
import { formatDate } from "@/lib/utils";

export default function DocumentsPage() {
  return (
    <PageShell
      eyebrow="Documents"
      title="Controlled documents library"
      description="Searchable document surface with category, classification, and investor-facing packaging in one place."
      classification="Prospect Safe"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {documents.map((document) => (
          <Card key={document.id} className="p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{document.category}</div>
            <div className="mt-2 text-lg font-semibold text-ink">{document.name}</div>
            <p className="mt-2 text-sm text-slate-600">{document.description}</p>
            <div className="mt-4 text-sm text-slate-500">{formatDate(document.date)}</div>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
