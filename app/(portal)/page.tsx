import Link from "next/link";
import { alerts, assets, quickQueries, recentFiles } from "@/data/mock-data";
import { PageShell } from "@/components/layout/page-shell";
import { QueryBar } from "@/components/ui/query-bar";
import { Card, StatCard } from "@/components/ui/primitives";

export default function HomePage() {
  return (
    <PageShell
      eyebrow="Home"
      title="Fund command center"
      description="A unified internal and investor-ready entry point that brings fragmented portfolio, performance, and source data together in a single presentation-grade environment."
      classification="Prospect Safe"
    >
      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <Card className="space-y-5 p-6">
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Conversational search</div>
            <h2 className="font-serif text-2xl text-ink">Ask the fund a question</h2>
            <p className="max-w-2xl text-sm text-slate-600">
              The demo query layer translates natural-language prompts into structured filters, cross-links, and pre-shaped result views.
            </p>
          </div>
          <QueryBar />
        </Card>
        <Card className="grid gap-4 p-6 sm:grid-cols-2">
          <StatCard label="GAV" value="EUR 3.84bn" helper="Synthetic pan-European portfolio" onClick="/fund-overview" />
          <StatCard label="Occupancy" value="94.1%" helper="Weighted portfolio occupancy" onClick="/portfolio" />
          <StatCard label="Assets" value={`${assets.length}`} helper="Across 16 European cities" onClick="/portfolio-explorer" />
          <StatCard label="Distribution Yield" value="4.3%" helper="Current investor snapshot" onClick="/performance" />
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="p-6 xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Quick links</div>
              <h3 className="mt-1 text-xl font-semibold text-ink">Role-aware priorities</h3>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              ["Fund Overview", "/fund-overview", "Presentation-grade fund snapshot"],
              ["Portfolio Explorer", "/portfolio-explorer", "Map, grid, and filtered storytelling"],
              ["Asset Detail", "/asset/asset-4", "Rich object-level operating page"],
              ["Data Management", "/data-management", "Excel-first upload and lineage controls"],
              ["Documents", "/documents", "Controlled investor communications"],
              ["Performance", "/performance", "Fund and benchmark analytics"]
            ].map((item) => (
              <Link key={item[0]} href={item[1]} className="rounded-3xl border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-card">
                <div className="text-lg font-semibold text-ink">{item[0]}</div>
                <p className="mt-2 text-sm text-slate-600">{item[2]}</p>
              </Link>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">What changed</div>
          <div className="mt-4 space-y-4">
            {alerts.map((alert) => (
              <div key={alert} className="rounded-2xl border border-line bg-white p-4 text-sm text-slate-600">
                {alert}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Recent uploaded files</div>
          <div className="mt-4 space-y-3">
            {recentFiles.map((file) => (
              <div key={file.name} className="flex items-center justify-between rounded-2xl border border-line bg-white p-4">
                <div>
                  <div className="font-medium text-ink">{file.name}</div>
                  <div className="text-sm text-slate-500">{file.date}</div>
                </div>
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">{file.status}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Suggested prompts</div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {quickQueries.map((prompt) => (
              <Link
                key={prompt}
                href={`/query?q=${encodeURIComponent(prompt)}`}
                className="rounded-2xl border border-line bg-white p-4 text-sm text-slate-600 transition hover:border-accent hover:text-ink"
              >
                {prompt}
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
