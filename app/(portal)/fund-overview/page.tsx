import Link from "next/link";
import { benchmarkSeries, fund, transactions } from "@/data/mock-data";
import { AreaChartCard, BarChartCard, LineChartCard } from "@/components/charts/chart-card";
import { PageShell } from "@/components/layout/page-shell";
import { Card, StatCard } from "@/components/ui/primitives";
import { formatCurrency, formatPercent } from "@/lib/utils";

const allocationBySector = [
  { period: "Office", value: 32 },
  { period: "Logistics", value: 24 },
  { period: "Residential", value: 21 },
  { period: "Retail", value: 12 },
  { period: "Alternatives", value: 11 }
];

const allocationByGeography = [
  { period: "France", value: 18 },
  { period: "Germany", value: 22 },
  { period: "Netherlands", value: 16 },
  { period: "Spain", value: 11 },
  { period: "Italy", value: 10 },
  { period: "Other", value: 23 }
];

const benchmarkChartData = benchmarkSeries.map((item) => ({
  period: item.period,
  fund: item.fund,
  incomeReturn: item.incomeReturn,
  capitalReturn: item.capitalReturn,
  inrevOdce: item.inrevOdce,
  msciPepfi: item.msciPepfi
}));

export default function FundOverviewPage() {
  return (
    <PageShell
      eyebrow="Fund Overview"
      title={fund.name}
      description={fund.description}
      classification="Investor Shareable"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <StatCard label="GAV" value={formatCurrency(fund.gav)} helper="Gross asset value" onClick="/portfolio" />
        <StatCard label="NAV" value={formatCurrency(fund.nav)} helper="Current quarter close" onClick="/performance" />
        <StatCard label="LTV" value={formatPercent(fund.ltv)} helper="Debt against gross asset value" onClick="/debt" />
        <StatCard label="Cash %" value={formatPercent(fund.cashPct)} helper="Available liquidity" onClick="/debt" />
        <StatCard label="Distribution Yield" value={formatPercent(fund.distributionYield)} helper="Trailing 12 months" onClick="/performance" />
        <StatCard label="Occupancy" value={formatPercent(fund.occupancy)} helper="Portfolio weighted" onClick="/portfolio" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <LineChartCard
          title="Ten-year total return and benchmarks"
          data={benchmarkChartData}
          lines={[
            { dataKey: "fund", color: "#204a74", name: "Fund" },
            { dataKey: "inrevOdce", color: "#6483a6", name: "INREV ODCE" },
            { dataKey: "msciPepfi", color: "#9aafc6", name: "MSCI PEPFI" }
          ]}
        />
        <Card className="p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Long-term returns</div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {Object.entries(fund.totalReturns).map(([period, value]) => (
              <div key={period} className="rounded-2xl border border-line bg-white p-4">
                <div className="text-sm text-slate-500">{period}</div>
                <div className="mt-2 text-2xl font-semibold text-ink">{formatPercent(value)}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-line bg-accent.soft p-4 text-sm text-slate-700">
            Benchmark snapshot: Fund outperformed INREV ODCE by {formatPercent(fund.totalReturns["12M"] - fund.benchmarkSnapshot.inrevOdce)} over 12 months.
          </div>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <BarChartCard title="Allocation by sector" data={allocationBySector} bars={[{ dataKey: "value", color: "#204a74", name: "%" }]} />
        <BarChartCard title="Allocation by geography" data={allocationByGeography} bars={[{ dataKey: "value", color: "#7c96b3", name: "%" }]} />
        <Card className="p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Operating snapshot</div>
          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-line bg-white p-4">
              <div className="text-sm text-slate-500">Latest valuation movement</div>
              <div className="mt-2 text-xl font-semibold text-ink">+EUR 42m QoQ</div>
            </div>
            <div className="rounded-2xl border border-line bg-white p-4">
              <div className="text-sm text-slate-500">Debt snapshot</div>
              <div className="mt-2 text-xl font-semibold text-ink">28.4% LTV | 61% fixed</div>
            </div>
            <div className="rounded-2xl border border-line bg-white p-4">
              <div className="text-sm text-slate-500">Deal pipeline</div>
              <div className="mt-2 text-xl font-semibold text-ink">{transactions.length} live items</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr_0.9fr]">
        <AreaChartCard title="Income return" data={benchmarkChartData} dataKey="incomeReturn" color="#204a74" />
        <AreaChartCard title="Capital return" data={benchmarkChartData} dataKey="capitalReturn" color="#9aafc6" />
        <Card className="p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Presenter route</div>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>Use this page as the external landing page for existing investors and prospects.</p>
            <Link href="/portfolio-explorer" className="block rounded-2xl border border-line bg-white p-4 text-ink transition hover:border-accent">
              Continue to Portfolio Explorer
            </Link>
            <Link href="/performance" className="block rounded-2xl border border-line bg-white p-4 text-ink transition hover:border-accent">
              Open Performance module
            </Link>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
