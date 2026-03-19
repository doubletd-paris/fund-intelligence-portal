import Link from "next/link";
import { Asset } from "@/types";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { Card, Pill } from "@/components/ui/primitives";

export function AssetCard({ asset }: { asset: Asset }) {
  return (
    <Link href={`/asset/${asset.id}`}>
      <Card className="overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
        <div className="h-36 border-b border-line/80" style={{ background: `linear-gradient(135deg, ${asset.heroTone}, ${asset.heroAccent})` }} />
        <div className="space-y-4 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-ink">{asset.name}</h3>
              <p className="text-sm text-slate-500">
                {asset.city}, {asset.country}
              </p>
            </div>
            <Pill tone="accent">{asset.sector}</Pill>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
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
      </Card>
    </Link>
  );
}
