import { notFound } from "next/navigation";
import { investors } from "@/data/mock-data";
import { PageShell } from "@/components/layout/page-shell";
import { Card } from "@/components/ui/primitives";
import { formatCurrency } from "@/lib/utils";

export default async function InvestorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const investor = investors.find((item) => item.id === id);
  if (!investor) notFound();

  return (
    <PageShell
      eyebrow="Investor Detail"
      title={investor.name}
      description={`${investor.investorType} | ${investor.geography} | Relationship lead: ${investor.relationshipLead}`}
      classification="Internal Confidential"
    >
      <div className="grid gap-4 xl:grid-cols-4">
        <Card className="p-5">
          <div className="text-sm text-slate-500">Commitment</div>
          <div className="mt-2 text-2xl font-semibold text-ink">{formatCurrency(investor.commitment.amount)}</div>
        </Card>
        <Card className="p-5">
          <div className="text-sm text-slate-500">NAV</div>
          <div className="mt-2 text-2xl font-semibold text-ink">{formatCurrency(investor.commitment.nav)}</div>
        </Card>
        <Card className="p-5">
          <div className="text-sm text-slate-500">Distributions</div>
          <div className="mt-2 text-2xl font-semibold text-ink">{formatCurrency(investor.commitment.distributions)}</div>
        </Card>
        <Card className="p-5">
          <div className="text-sm text-slate-500">Status</div>
          <div className="mt-2 text-2xl font-semibold text-ink">{investor.status}</div>
        </Card>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Profile</div>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div>Geography: {investor.geography}</div>
            <div>Investor type: {investor.investorType}</div>
            <div>Size bucket: {investor.sizeBucket}</div>
            <div>Communication preference: Quarterly reporting and direct update call.</div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Timeline</div>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div>2025-12-15: Investor meeting completed</div>
            <div>2026-01-20: Factsheet issued</div>
            <div>2026-03-01: Capital account updated</div>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
