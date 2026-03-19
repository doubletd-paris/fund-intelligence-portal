import { dataSources } from "@/data/mock-data";
import { PageShell } from "@/components/layout/page-shell";
import { DataTable } from "@/components/ui/data-table";
import { Card, EmptyState, Pill } from "@/components/ui/primitives";
import { formatDate } from "@/lib/utils";

const dataSourceRows = dataSources.map((source) => ({
  sourceDataset: source.name,
  sourceType: source.sourceType,
  lastUpload: formatDate(source.lastUpload),
  status: source.status,
  frequency: source.frequency,
  linkedObjects: source.linkedObjects
}));

export default function DataManagementPage() {
  return (
    <PageShell
      eyebrow="Data Management"
      title="Data ingestion and lineage"
      description="Business-friendly data controls that visibly accommodate Excel-first operating workflows without looking overly technical."
      classification="Internal Confidential"
    >
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <DataTable
          title="Data overview"
          rows={dataSourceRows}
          columns={[
            { key: "sourceDataset", label: "Source dataset" },
            { key: "sourceType", label: "Source type" },
            { key: "lastUpload", label: "Last upload" },
            { key: "status", label: "Status" },
            { key: "frequency", label: "Frequency" },
            { key: "linkedObjects", label: "Linked objects" }
          ]}
        />
        <Card className="space-y-4 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Upload center</div>
          <div className="rounded-3xl border border-dashed border-line bg-white p-8 text-center text-sm text-slate-500">
            Drag and drop Excel files here
            <br />
            Choose data type, preview mapping, and validate rows before publish.
          </div>
          <div className="grid gap-3">
            <div className="rounded-2xl border border-line bg-white p-4 text-sm text-slate-600">
              Mapping preview: `Asset ID` matched to 47/48 rows. One manual mapping still required.
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-warning">
              Warning: Transactions pipeline file contains two stage labels outside the controlled vocabulary.
            </div>
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-danger">
              Error: One debt schedule record is missing maturity date.
            </div>
          </div>
        </Card>
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Lineage view</div>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div>Rent Roll to Assets to Income & Occupancy</div>
            <div>Valuations to Fund Overview to Valuation module to Asset detail</div>
            <div>Debt Schedule to Debt & Liquidity to Fund Overview</div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Stewardship</div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Pill tone="accent">Asset Finance</Pill>
            <Pill tone="accent">Investor Relations</Pill>
            <Pill tone="accent">Treasury</Pill>
            <Pill tone="accent">Performance Team</Pill>
          </div>
        </Card>
        <EmptyState title="No ingestion blockers on Asset Master" description="System-connected asset master feed is currently valid and fully reconciled." />
      </div>
    </PageShell>
  );
}
