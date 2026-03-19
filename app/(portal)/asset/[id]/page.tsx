import { notFound } from "next/navigation";
import { assets, documents } from "@/data/mock-data";
import { AreaChartCard, BarChartCard } from "@/components/charts/chart-card";
import { PageShell } from "@/components/layout/page-shell";
import { DataTable } from "@/components/ui/data-table";
import { Card, Pill } from "@/components/ui/primitives";
import { formatCurrency, formatDate, formatPercent } from "@/lib/utils";

export default async function AssetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const asset = assets.find((item) => item.id === id);
  if (!asset) notFound();

  const tenantRows = asset.tenants.map((tenant) => ({
    tenant: tenant.name,
    sector: tenant.sector,
    area: `${tenant.leasedAreaSqm.toLocaleString()} sqm`,
    annualRent: formatCurrency(tenant.annualRent)
  }));

  const leaseRows = asset.leases.map((lease) => ({
    status: lease.status,
    start: formatDate(lease.startDate),
    expiry: formatDate(lease.expiryDate),
    annualRent: formatCurrency(lease.annualRent)
  }));

  return (
    <PageShell
      eyebrow="Asset Detail"
      title={asset.name}
      description={`${asset.city}, ${asset.country} | ${asset.sector} | ${asset.subSector}`}
      classification={asset.classification}
    >
      <div className="overflow-hidden rounded-[2rem] border border-line bg-panel shadow-card">
        <div className="h-64 border-b border-line" style={{ background: `linear-gradient(135deg, ${asset.heroTone}, ${asset.heroAccent})` }} />
        <div className="grid gap-6 p-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <Pill tone="accent">{asset.sector}</Pill>
              <Pill tone="neutral">{asset.bucket}</Pill>
              <Pill tone={asset.esgLabel === "A" ? "success" : asset.esgLabel === "B" ? "warning" : "danger"}>ESG {asset.esgLabel}</Pill>
            </div>
            <p className="max-w-3xl text-sm text-slate-600">{asset.description}</p>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div>
                <div className="text-sm text-slate-500">Latest valuation</div>
                <div className="mt-1 text-xl font-semibold text-ink">{formatCurrency(asset.latestValuation)}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500">Occupancy</div>
                <div className="mt-1 text-xl font-semibold text-ink">{formatPercent(asset.occupancy)}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500">WAULT</div>
                <div className="mt-1 text-xl font-semibold text-ink">{asset.waultYears.toFixed(1)} years</div>
              </div>
              <div>
                <div className="text-sm text-slate-500">Floor area</div>
                <div className="mt-1 text-xl font-semibold text-ink">{asset.floorspaceSqm.toLocaleString()} sqm</div>
              </div>
            </div>
          </div>
          <Card className="p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Internal metadata</div>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div>Data source: {asset.dataSource}</div>
              <div>Last updated: {formatDate(asset.lastUpdated)}</div>
              <div>Data quality: {asset.dataQuality}</div>
              <div>{asset.internalNotes}</div>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <AreaChartCard title="Valuation history" data={asset.valuationHistory} dataKey="value" color="#204a74" />
        <BarChartCard title="Yield movement" data={asset.valuationHistory} bars={[{ dataKey: "niy", color: "#7c96b3", name: "NIY" }]} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr_0.9fr]">
        <DataTable
          title="Major tenants"
          rows={tenantRows}
          columns={[
            { key: "tenant", label: "Tenant" },
            { key: "sector", label: "Sector" },
            { key: "area", label: "Area" },
            { key: "annualRent", label: "Annual rent" }
          ]}
        />
        <DataTable
          title="Lease events"
          rows={leaseRows}
          columns={[
            { key: "status", label: "Status" },
            { key: "start", label: "Start" },
            { key: "expiry", label: "Expiry" },
            { key: "annualRent", label: "Annual rent" }
          ]}
        />
        <Card className="space-y-4 p-5">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">ESG and media</div>
            <div className="mt-3 text-sm text-slate-600">
              Certifications: {asset.certifications.join(", ")}
              <br />
              Energy intensity: {asset.energyIntensity} kWh/sqm
              <br />
              Carbon intensity: {asset.carbonIntensity} kgCO2e/sqm
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-28 rounded-2xl border border-line" style={{ background: `linear-gradient(160deg, ${asset.heroAccent}, #ffffff)` }} />
            <div className="h-28 rounded-2xl border border-line" style={{ background: `linear-gradient(160deg, ${asset.heroTone}, #eef2f5)` }} />
          </div>
          <div className="rounded-2xl border border-dashed border-line bg-white p-4 text-sm text-slate-500">Video placeholder: asset fly-through and management commentary.</div>
          <div className="rounded-2xl border border-line bg-white p-4">
            <div className="text-sm font-medium text-ink">Related documents</div>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              {documents.slice(0, 3).map((document) => (
                <div key={document.id}>{document.name}</div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
