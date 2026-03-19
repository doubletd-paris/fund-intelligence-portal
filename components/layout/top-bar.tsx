"use client";

import Link from "next/link";
import { Bell, ChevronDown, Filter, Layers3, User2 } from "lucide-react";
import { useDemo, reportingPeriods, roles } from "@/components/providers/demo-provider";
import { QueryBar } from "@/components/ui/query-bar";
import { Button, Pill } from "@/components/ui/primitives";

export function TopBar() {
  const { role, setRole, periodId, setPeriodId, portalMode } = useDemo();

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-canvas/95 backdrop-blur">
      <div className="flex flex-col gap-4 px-4 py-4 lg:px-8">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <Pill tone="accent">{portalMode}</Pill>
            <div className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm text-slate-600">
              <User2 className="h-4 w-4" />
              <select value={role} onChange={(event) => setRole(event.target.value as typeof role)} className="bg-transparent outline-none">
                {roles.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </div>
            <div className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm text-slate-600">
              <Layers3 className="h-4 w-4" />
              <select value={periodId} onChange={(event) => setPeriodId(event.target.value)} className="bg-transparent outline-none">
                {reportingPeriods.map((period) => (
                  <option key={period.id} value={period.id}>
                    {period.label}
                  </option>
                ))}
              </select>
            </div>
            <Button variant="secondary" className="gap-2">
              <Filter className="h-4 w-4" />
              Global filters
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/documents" className="rounded-full border border-line bg-white px-4 py-2 text-sm text-slate-600">
              Documents
            </Link>
            <button className="rounded-full border border-line bg-white p-2 text-slate-600">
              <Bell className="h-4 w-4" />
            </button>
          </div>
        </div>
        <QueryBar compact />
      </div>
    </header>
  );
}
