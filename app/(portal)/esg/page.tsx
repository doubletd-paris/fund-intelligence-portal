import { assets, esgMetrics } from "@/data/mock-data";
import { PageShell } from "@/components/layout/page-shell";
import { Card } from "@/components/ui/primitives";

export default function EsgPage() {
  return (
    <PageShell
      eyebrow="ESG"
      title="Portfolio sustainability view"
      description="Selected portfolio-level ESG KPIs, asset highlights, and progress indicators aligned to an institutional reporting narrative."
      classification="Investor Shareable"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {esgMetrics.map((metric) => (
          <Card key={metric.id} className="p-5">
            <div className="text-sm text-slate-500">{metric.title}</div>
            <div className="mt-2 text-3xl font-semibold text-ink">{metric.value}</div>
            <div className="mt-2 text-sm text-slate-600">Target: {metric.target}</div>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        {assets.slice(0, 6).map((asset) => (
          <Card key={asset.id} className="p-5">
            <div className="text-lg font-semibold text-ink">{asset.name}</div>
            <div className="mt-2 text-sm text-slate-600">
              {asset.city}, {asset.country}
              <br />
              Certifications: {asset.certifications.join(", ")}
              <br />
              Energy intensity: {asset.energyIntensity} kWh/sqm
            </div>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
