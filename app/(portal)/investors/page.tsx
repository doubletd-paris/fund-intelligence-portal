import { investors } from "@/data/mock-data";
import { PageShell } from "@/components/layout/page-shell";
import { DataTable } from "@/components/ui/data-table";
import { Card, EmptyState } from "@/components/ui/primitives";
import { formatCurrency } from "@/lib/utils";

const investorRows = investors.map((investor) => ({
  investor: investor.name,
  investorHref: `/investors/${investor.id}`,
  geography: investor.geography,
  investorType: investor.investorType,
  sizeBucket: investor.sizeBucket,
  status: investor.status,
  commitment: formatCurrency(investor.commitment.amount)
}));

export default function InvestorsPage() {
  return (
    <PageShell
      eyebrow="Investors"
      title="Investor registry and flows"
      description="Internal relationship overview covering registry, commitments, segmentation, and prospect tracking. External users should not access the global registry."
      classification="Internal Confidential"
    >
      <div className="grid gap-4 xl:grid-cols-4">
        <Card className="p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Total commitments</div>
          <div className="mt-2 text-3xl font-semibold text-ink">EUR 2.9bn</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Active investors</div>
          <div className="mt-2 text-3xl font-semibold text-ink">18</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Prospects</div>
          <div className="mt-2 text-3xl font-semibold text-ink">6</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Net flow YTD</div>
          <div className="mt-2 text-3xl font-semibold text-ink">EUR 124m</div>
        </Card>
      </div>
      <DataTable
        title="Investor registry"
        rows={investorRows}
        columns={[
          { key: "investor", label: "Investor", kind: "link", hrefKey: "investorHref" },
          { key: "geography", label: "Geography" },
          { key: "investorType", label: "Type" },
          { key: "sizeBucket", label: "Size bucket" },
          { key: "status", label: "Status" },
          { key: "commitment", label: "Commitment" }
        ]}
      />
      <EmptyState
        title="External access disabled by design"
        description="Existing investors can be routed to their own detail page and document set, but the global registry remains internal-only."
      />
    </PageShell>
  );
}
