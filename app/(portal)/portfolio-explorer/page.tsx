"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { assets } from "@/data/mock-data";
import { PageShell } from "@/components/layout/page-shell";
import { AssetCard } from "@/components/ui/asset-card";
import { Card, EmptyState, Pill } from "@/components/ui/primitives";
import { formatCurrency, formatPercent } from "@/lib/utils";

const LeafletMap = dynamic(() => import("@/components/layout/leaflet-map").then((module) => module.LeafletMap), { ssr: false });

export default function PortfolioExplorerPage() {
  const [view, setView] = useState<"map" | "grid" | "list">("map");
  const [sector, setSector] = useState("All");
  const [country, setCountry] = useState("All");

  const filtered = useMemo(
    () =>
      assets.filter((asset) => (sector === "All" ? true : asset.sector === sector) && (country === "All" ? true : asset.country === country)),
    [country, sector]
  );

  return (
    <PageShell
      eyebrow="Portfolio Explorer"
      title="Explore the portfolio spatially"
      description="Flagship discovery module with storytelling-ready map visuals, analytical filters, and fast drill-down into individual assets."
      classification="Investor Shareable"
      actions={
        <div className="flex items-center gap-2">
          {(["map", "grid", "list"] as const).map((option) => (
            <button
              key={option}
              onClick={() => setView(option)}
              className={`rounded-full px-3 py-1.5 text-sm ${view === option ? "bg-accent text-white" : "bg-white text-slate-600"}`}
            >
              {option[0].toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      }
    >
      <div className="grid gap-4 xl:grid-cols-[0.32fr_0.68fr]">
        <Card className="p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Filters</div>
          <div className="mt-4 space-y-4">
            <label className="block text-sm">
              <span className="mb-2 block text-slate-500">Country</span>
              <select value={country} onChange={(event) => setCountry(event.target.value)} className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none">
                {["All", ...new Set(assets.map((asset) => asset.country))].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              <span className="mb-2 block text-slate-500">Sector</span>
              <select value={sector} onChange={(event) => setSector(event.target.value)} className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none">
                {["All", ...new Set(assets.map((asset) => asset.sector))].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <div className="rounded-2xl border border-line bg-white p-4 text-sm text-slate-600">
              Additional demo-friendly filters can be extended here for city, occupancy band, value band, ESG label, and portfolio bucket.
            </div>
          </div>
        </Card>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Pill tone="accent">{filtered.length} results</Pill>
            <Pill tone="neutral">Default view: map</Pill>
            <Pill tone="neutral">All KPIs clickable</Pill>
          </div>
          {view === "map" ? (
            <LeafletMap assets={filtered} />
          ) : filtered.length ? (
            <div className={view === "grid" ? "grid gap-4 md:grid-cols-2 2xl:grid-cols-3" : "space-y-3"}>
              {view === "grid"
                ? filtered.map((asset) => <AssetCard key={asset.id} asset={asset} />)
                : filtered.map((asset) => (
                    <div key={asset.id} className="rounded-3xl border border-line bg-panel p-5 shadow-card">
                      <div className="flex flex-col justify-between gap-4 lg:flex-row">
                        <div>
                          <div className="text-lg font-semibold text-ink">{asset.name}</div>
                          <div className="text-sm text-slate-500">
                            {asset.city}, {asset.country} | {asset.sector} | {asset.subSector}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm lg:grid-cols-4">
                          <div>
                            <div className="text-slate-500">Value</div>
                            <div className="font-medium text-ink">{formatCurrency(asset.latestValuation)}</div>
                          </div>
                          <div>
                            <div className="text-slate-500">Occupancy</div>
                            <div className="font-medium text-ink">{formatPercent(asset.occupancy)}</div>
                          </div>
                          <div>
                            <div className="text-slate-500">WAULT</div>
                            <div className="font-medium text-ink">{asset.waultYears.toFixed(1)} yrs</div>
                          </div>
                          <div>
                            <div className="text-slate-500">ESG</div>
                            <div className="font-medium text-ink">{asset.esgLabel}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          ) : (
            <EmptyState title="No results" description="Try widening the country or sector filters to repopulate the explorer." />
          )}
        </div>
      </div>
    </PageShell>
  );
}
