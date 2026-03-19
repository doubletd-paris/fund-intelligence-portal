import { benchmarkSeries } from "@/data/mock-data";
import { BarChartCard, ContributionBars, LineChartCard } from "@/components/charts/chart-card";
import { PageShell } from "@/components/layout/page-shell";
import { Card } from "@/components/ui/primitives";

const rolling = benchmarkSeries.map((item) => ({
  period: item.period,
  threeYear: item.fund - 1.1,
  fiveYear: item.fund - 0.4
}));

const contribution = [
  { name: "Germany logistics", value: 1.4 },
  { name: "France office", value: 0.8 },
  { name: "Residential", value: 1.2 },
  { name: "Retail drag", value: -0.4 },
  { name: "Debt carry", value: 0.3 }
];

export default function PerformancePage() {
  return (
    <PageShell
      eyebrow="Performance"
      title="Performance and benchmark analytics"
      description="Historical total return, component analysis, and benchmark context shaped for both internal review and investor communication."
      classification="Investor Shareable"
    >
      <div className="grid gap-4 xl:grid-cols-2">
        <LineChartCard
          title="Historical total return"
          data={benchmarkSeries}
          lines={[
            { dataKey: "fund", color: "#204a74", name: "Fund" },
            { dataKey: "inrevOdce", color: "#6483a6", name: "INREV ODCE" },
            { dataKey: "msciPepfi", color: "#9aafc6", name: "MSCI PEPFI" }
          ]}
        />
        <BarChartCard
          title="Income return vs capital return"
          data={benchmarkSeries}
          bars={[
            { dataKey: "incomeReturn", color: "#204a74", name: "Income return" },
            { dataKey: "capitalReturn", color: "#b2c1d3", name: "Capital return" }
          ]}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <LineChartCard
          title="Rolling returns"
          data={rolling}
          lines={[
            { dataKey: "threeYear", color: "#204a74", name: "3Y rolling" },
            { dataKey: "fiveYear", color: "#7c96b3", name: "5Y rolling" }
          ]}
        />
        <ContributionBars title="Attribution style contribution" data={contribution} />
      </div>

      <Card className="p-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Relative performance summary</div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-line bg-white p-4">
            <div className="text-sm text-slate-500">5Y vs INREV ODCE</div>
            <div className="mt-2 text-2xl font-semibold text-ink">+70 bps</div>
          </div>
          <div className="rounded-2xl border border-line bg-white p-4">
            <div className="text-sm text-slate-500">5Y vs MSCI PEPFI</div>
            <div className="mt-2 text-2xl font-semibold text-ink">+120 bps</div>
          </div>
          <div className="rounded-2xl border border-line bg-white p-4">
            <div className="text-sm text-slate-500">Internal commentary</div>
            <div className="mt-2 text-sm text-slate-600">
              Internal users can position this outperformance against valuation timing, debt carry, and leasing execution.
            </div>
          </div>
        </div>
      </Card>
    </PageShell>
  );
}
