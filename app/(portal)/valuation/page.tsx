import { assets } from "@/data/mock-data";
import { ContributionBars, LineChartCard } from "@/components/charts/chart-card";
import { PageShell } from "@/components/layout/page-shell";
import { DataTable } from "@/components/ui/data-table";
import { formatCurrency, formatPercent } from "@/lib/utils";

const topMovers = assets
  .map((asset) => ({
    name: asset.name,
    value: asset.valuationHistory[asset.valuationHistory.length - 1]?.yoyChange ?? 0
  }))
  .sort((a, b) => b.value - a.value)
  .slice(0, 8);

const valuationRows = assets.slice(0, 12).map((asset) => {
  const latest = asset.valuationHistory[asset.valuationHistory.length - 1];
  return {
    asset: asset.name,
    latestValue: formatCurrency(asset.latestValuation),
    yield: formatPercent(asset.latestYield),
    yoyChange: formatPercent(latest?.yoyChange ?? 0)
  };
});

export default function ValuationPage() {
  return (
    <PageShell
      eyebrow="Valuation"
      title="Valuation movements"
      description="Quarterly valuation monitoring, yield movement, and biggest positive or negative asset-level changes."
      classification="Internal Confidential"
    >
      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <DataTable
          title="Latest valuations by asset"
          rows={valuationRows}
          columns={[
            { key: "asset", label: "Asset" },
            { key: "latestValue", label: "Latest value" },
            { key: "yield", label: "Yield" },
            { key: "yoyChange", label: "YoY change" }
          ]}
        />
        <ContributionBars title="Biggest positive movements" data={topMovers} />
      </div>
      <LineChartCard
        title="Portfolio valuation trend"
        data={[
          { period: "2024 Q1", value: 3560 },
          { period: "2024 Q2", value: 3625 },
          { period: "2024 Q3", value: 3670 },
          { period: "2024 Q4", value: 3715 },
          { period: "2025 Q1", value: 3750 },
          { period: "2025 Q2", value: 3780 },
          { period: "2025 Q3", value: 3806 },
          { period: "2025 Q4", value: 3840 }
        ]}
        lines={[{ dataKey: "value", color: "#204a74", name: "EUR m" }]}
      />
    </PageShell>
  );
}
