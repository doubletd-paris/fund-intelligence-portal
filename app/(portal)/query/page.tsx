import Link from "next/link";
import { assets, benchmarkSeries, debtFacilities } from "@/data/mock-data";
import { BarChartCard, LineChartCard } from "@/components/charts/chart-card";
import { PageShell } from "@/components/layout/page-shell";
import { AssetCard } from "@/components/ui/asset-card";
import { DataTable } from "@/components/ui/data-table";
import { Card, Pill } from "@/components/ui/primitives";
import { parseDemoQuery } from "@/lib/query-engine";
import { formatCurrency, formatDate } from "@/lib/utils";

const benchmarkChartData = benchmarkSeries.map((item) => ({
  period: item.period,
  fund: item.fund,
  incomeReturn: item.incomeReturn,
  capitalReturn: item.capitalReturn,
  inrevOdce: item.inrevOdce,
  msciPepfi: item.msciPepfi
}));

const debtMaturityRows = debtFacilities
  .filter((facility) => new Date(facility.maturityDate) <= new Date("2027-12-31"))
  .map((facility) => ({
    facility: facility.facilityName,
    lender: facility.lender,
    drawn: formatCurrency(facility.drawn),
    maturity: formatDate(facility.maturityDate)
  }));

const valuationResultChartData = assets.slice(0, 8).map((asset) => ({
  period: asset.name,
  value: asset.valuationHistory[asset.valuationHistory.length - 1]?.yoyChange ?? 0
}));

export default async function QueryPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams;
  const query = params.q ?? "What changed this quarter?";
  const result = parseDemoQuery(query);

  return (
    <PageShell
      eyebrow="Conversational Results"
      title={result.title}
      description={result.description}
      classification="Investor Shareable"
    >
      <Card className="p-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Interpreted query</div>
        <div className="mt-3 text-2xl font-semibold text-ink">{result.interpretedQuery}</div>
        <div className="mt-4 flex flex-wrap gap-2">
          {result.appliedFilters.map((filter) => (
            <Pill key={filter} tone="accent">
              {filter}
            </Pill>
          ))}
          <Pill tone="neutral">{result.resultCount} results</Pill>
        </div>
      </Card>

      {result.type === "portfolio" ? (
        <div className="grid gap-4 xl:grid-cols-3">
          {assets.slice(0, 6).map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      ) : null}

      {result.type === "performance" ? (
        <LineChartCard
          title="Structured benchmark output"
          data={benchmarkChartData}
          lines={[
            { dataKey: "fund", color: "#204a74", name: "Fund" },
            { dataKey: "inrevOdce", color: "#6483a6", name: "INREV ODCE" },
            { dataKey: "msciPepfi", color: "#9aafc6", name: "MSCI PEPFI" }
          ]}
        />
      ) : null}

      {result.type === "debt" ? (
        <DataTable
          title="Debt maturities"
          rows={debtMaturityRows}
          columns={[
            { key: "facility", label: "Facility" },
            { key: "lender", label: "Lender" },
            { key: "drawn", label: "Drawn" },
            { key: "maturity", label: "Maturity" }
          ]}
        />
      ) : null}

      {result.type === "valuation" ? (
        <BarChartCard
          title="Largest valuation increase this year"
          data={valuationResultChartData}
          bars={[{ dataKey: "value", color: "#204a74", name: "YoY %" }]}
        />
      ) : null}

      {result.type === "changes" ? (
        <div className="grid gap-4 xl:grid-cols-3">
          {[
            "Portfolio valuation up EUR 42m QoQ driven by logistics yield compression.",
            "Three lease renewals signed and one office floor returned in Berlin.",
            "Debt schedule refreshed with one facility entering 24-month maturity window.",
            "Two internal documents uploaded and one factsheet published externally.",
            "Transactions pipeline added one logistics acquisition in the Netherlands.",
            "Valuation data file requires one manual mapping review."
          ].map((change) => (
            <Card key={change} className="p-5 text-sm text-slate-600">
              {change}
            </Card>
          ))}
        </div>
      ) : null}

      <Card className="p-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Suggested next steps</div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <Link href="/portfolio-explorer" className="rounded-2xl border border-line bg-white p-4 text-sm text-ink">Open portfolio explorer</Link>
          <Link href="/performance" className="rounded-2xl border border-line bg-white p-4 text-sm text-ink">Go to performance module</Link>
          <Link href="/data-management" className="rounded-2xl border border-line bg-white p-4 text-sm text-ink">Review source data lineage</Link>
        </div>
      </Card>
    </PageShell>
  );
}
