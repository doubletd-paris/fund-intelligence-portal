"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Building2,
  Database,
  FileText,
  Gauge,
  Home,
  Leaf,
  Landmark,
  Map,
  Shield,
  TrendingUp,
  Users,
  Wallet
} from "lucide-react";
import { useDemo } from "@/components/providers/demo-provider";
import { canViewGlobalInvestorRegistry, isInternalRole } from "@/lib/permissions";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/", label: "Home", icon: Home },
  { href: "/fund-overview", label: "Fund Overview", icon: Gauge },
  { href: "/performance", label: "Performance", icon: TrendingUp },
  { href: "/portfolio-explorer", label: "Portfolio Explorer", icon: Map },
  { href: "/portfolio", label: "Portfolio", icon: Building2 },
  { href: "/valuation", label: "Valuation", icon: BarChart3 },
  { href: "/investors", label: "Investors", icon: Users },
  { href: "/debt", label: "Debt & Liquidity", icon: Wallet },
  { href: "/transactions", label: "Transactions", icon: Landmark },
  { href: "/esg", label: "ESG", icon: Leaf },
  { href: "/documents", label: "Documents", icon: FileText },
  { href: "/data-management", label: "Data Management", icon: Database },
  { href: "/admin", label: "Admin", icon: Shield }
];

export function Sidebar() {
  const pathname = usePathname();
  const { role, portalMode } = useDemo();

  return (
    <aside className="hidden min-h-screen w-72 flex-col border-r border-line bg-[#f7f5f1] px-5 py-6 lg:flex">
      <div className="mb-8 space-y-2">
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Fund Intelligence Portal</div>
        <div className="font-serif text-2xl text-ink">Aurora Core Europe</div>
        <div className="text-sm text-slate-500">{portalMode}</div>
      </div>
      <nav className="space-y-1">
        {navigation
          .filter((item) => {
            if (item.href === "/admin") return isInternalRole(role);
            if (item.href === "/data-management") return isInternalRole(role);
            if (item.href === "/investors") return canViewGlobalInvestorRegistry(role);
            if (item.href === "/debt" || item.href === "/transactions" || item.href === "/valuation") return isInternalRole(role);
            return true;
          })
          .map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition",
                  active ? "bg-white text-ink shadow-card" : "text-slate-600 hover:bg-white/80 hover:text-ink"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
      </nav>
      <div className="mt-auto rounded-3xl border border-line/80 bg-white p-4 text-sm text-slate-600">
        <div className="font-semibold text-ink">Demo tip</div>
        Switch from `Fund Manager` to `Existing Investor` to show the permission layer and external landing flow.
      </div>
    </aside>
  );
}
