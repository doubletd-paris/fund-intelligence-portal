import { notFound } from "next/navigation";
import { debtFacilities } from "@/data/mock-data";
import { PageShell } from "@/components/layout/page-shell";
import { Card } from "@/components/ui/primitives";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function DebtDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const facility = debtFacilities.find((item) => item.id === id);
  if (!facility) notFound();

  return (
    <PageShell
      eyebrow="Debt Detail"
      title={facility.facilityName}
      description={`${facility.lender} | ${facility.type}`}
      classification="Internal Confidential"
    >
      <div className="grid gap-4 xl:grid-cols-4">
        <Card className="p-5"><div className="text-sm text-slate-500">Committed</div><div className="mt-2 text-2xl font-semibold text-ink">{formatCurrency(facility.amount)}</div></Card>
        <Card className="p-5"><div className="text-sm text-slate-500">Drawn</div><div className="mt-2 text-2xl font-semibold text-ink">{formatCurrency(facility.drawn)}</div></Card>
        <Card className="p-5"><div className="text-sm text-slate-500">Margin</div><div className="mt-2 text-2xl font-semibold text-ink">{facility.marginBps} bps</div></Card>
        <Card className="p-5"><div className="text-sm text-slate-500">Maturity</div><div className="mt-2 text-2xl font-semibold text-ink">{formatDate(facility.maturityDate)}</div></Card>
      </div>
      <Card className="p-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Facility notes</div>
        <div className="mt-4 space-y-3 text-sm text-slate-600">
          <div>Fixed proportion: {facility.fixedPct}%</div>
          <div>Covenant status: {facility.covenantStatus}</div>
          <div>Linked assets: {facility.linkedAssets.join(", ")}</div>
        </div>
      </Card>
    </PageShell>
  );
}
