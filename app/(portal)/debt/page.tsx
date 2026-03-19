import { debtFacilities } from "@/data/mock-data";
import { BarChartCard } from "@/components/charts/chart-card";
import { PageShell } from "@/components/layout/page-shell";
import { DataTable } from "@/components/ui/data-table";
import { Card } from "@/components/ui/primitives";
import { formatCurrency, formatDate } from "@/lib/utils";

const maturityProfile = [
  { period: "2026", value: 194 },
  { period: "2027", value: 350 },
  { period: "2028", value: 325 }
];

const debtRows = debtFacilities.map((facility) => ({
  facility: facility.facilityName,
  facilityHref: `/debt/${facility.id}`,
  lender: facility.lender,
  drawn: formatCurrency(facility.drawn),
  maturity: formatDate(facility.maturityDate),
  covenant: facility.covenantStatus
}));

export default function DebtPage() {
  return (
    <PageShell
      eyebrow="Debt & Liquidity"
      title="Debt, liquidity and covenant monitoring"
      description="Facilities, maturity profile, fixed versus floating split, and sources-and-uses style liquidity context."
      classification="Internal Confidential"
    >
      <div className="grid gap-4 xl:grid-cols-4">
        <Card className="p-5"><div className="text-sm text-slate-500">Drawn debt</div><div className="mt-2 text-3xl font-semibold text-ink">EUR 751m</div></Card>
        <Card className="p-5"><div className="text-sm text-slate-500">Weighted cost</div><div className="mt-2 text-3xl font-semibold text-ink">3.42%</div></Card>
        <Card className="p-5"><div className="text-sm text-slate-500">Fixed / floating</div><div className="mt-2 text-3xl font-semibold text-ink">61 / 39</div></Card>
        <Card className="p-5"><div className="text-sm text-slate-500">Liquidity headroom</div><div className="mt-2 text-3xl font-semibold text-ink">EUR 238m</div></Card>
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <DataTable
          title="Debt facilities"
          rows={debtRows}
          columns={[
            { key: "facility", label: "Facility", kind: "link", hrefKey: "facilityHref" },
            { key: "lender", label: "Lender" },
            { key: "drawn", label: "Drawn" },
            { key: "maturity", label: "Maturity" },
            { key: "covenant", label: "Covenant" }
          ]}
        />
        <BarChartCard title="Maturity profile (EUR m)" data={maturityProfile} bars={[{ dataKey: "value", color: "#204a74", name: "Debt" }]} />
      </div>
    </PageShell>
  );
}
