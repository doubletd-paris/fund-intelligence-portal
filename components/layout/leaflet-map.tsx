"use client";

import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import { Asset } from "@/types";
import { formatCurrency, formatPercent } from "@/lib/utils";

export function LeafletMap({ assets }: { assets: Asset[] }) {
  const grouped = Object.values(
    assets.reduce<Record<string, { latitude: number; longitude: number; assets: Asset[] }>>((accumulator, asset) => {
      const key = `${asset.city}-${asset.country}`;
      if (!accumulator[key]) {
        accumulator[key] = { latitude: asset.latitude, longitude: asset.longitude, assets: [] };
      }
      accumulator[key].assets.push(asset);
      return accumulator;
    }, {})
  );

  return (
    <div className="h-[560px] overflow-hidden rounded-3xl border border-line">
      <MapContainer center={[50.8503, 7.3]} zoom={4} scrollWheelZoom className="h-full w-full">
        <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {grouped.map((cluster) => (
          <CircleMarker
            key={`${cluster.latitude}-${cluster.longitude}`}
            center={[cluster.latitude, cluster.longitude]}
            radius={10 + cluster.assets.length * 1.4}
            pathOptions={{ color: "#204a74", fillColor: "#204a74", fillOpacity: 0.45 }}
          >
            <Popup>
              <div className="space-y-3">
                <div className="font-semibold">
                  {cluster.assets[0].city}, {cluster.assets[0].country}
                </div>
                {cluster.assets.map((asset) => (
                  <div key={asset.id} className="border-t pt-2 first:border-t-0 first:pt-0">
                    <div className="font-medium">{asset.name}</div>
                    <div className="text-xs text-slate-600">
                      {asset.sector} | {formatCurrency(asset.latestValuation)} | {formatPercent(asset.occupancy)}
                    </div>
                  </div>
                ))}
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
