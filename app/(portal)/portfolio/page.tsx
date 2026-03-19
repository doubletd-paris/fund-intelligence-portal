import { assets } from "@/data/mock-data";
import { BarChartCard } from "@/components/charts/chart-card";
import { PageShell } from "@/components/layout/page-shell";
import { DataTable } from "@/components/ui/data-table";
import { Card } from "@/components/ui/primitives";
import { formatCurrency, formatPercent } from "@/lib/utils";

const byBucket = ["Core Stabilised", "Asset Management", "Development"].map((bucket) => ({
  period: bucket,
  value: assets.filter((asset) => asset.bucket === bucket).length
}));

const portfolioRows = assets.slice(0, 14).map((asset) => ({
  asset: asset.name,
  assetHref: `/asset/${asset.id}`,
  country: asset.country,
  sector: asset.sector,
  value: formatCurrency(asset.latestValuation),
  occupancy: formatPercent(asset.occupancy),
  wault: `${asset.waultYears.toFixed(1)} yrs`
}));

export default function PortfolioPage() {
  return (
    <PageShell
      eyebrow="Portfolio"
      title="Portfolio analytics"
      description="Table-first operating view for occupancy, WAULT, allocation, and asset status analysis."
      classification="Investor Shareable"
    >
      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">WAULT</div>
          <div className="mt-2 text-3xl font-semibold text-ink">5.8 years</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Vacancy</div>
          <div className="mt-2 text-3xl font-semibold text-ink">5.9%</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Assets on watchlist</div>
          <div className="mt-2 text-3xl font-semibold text-ink">7</div>
        </Card>
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <DataTable
          title="Portfolio table"
          rows={portfolioRows}
          columns={[
            { key: "asset", label: "Asset", kind: "link", hrefKey: "assetHref" },
            { key: "country", label: "Country" },
            { key: "sector", label: "Sector" },
            { key: "value", label: "Value" },
            { key: "occupancy", label: "Occupancy" },
            { key: "wault", label: "WAULT" }
          ]}
        />
        <BarChartCard title="Asset status overview" data={byBucket} bars={[{ dataKey: "value", color: "#204a74", name: "Assets" }]} />
      </div>
    </PageShell>
  );
}
