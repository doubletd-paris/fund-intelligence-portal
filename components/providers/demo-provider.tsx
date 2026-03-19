"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { reportingPeriods, roleToPortalMode, roles } from "@/lib/permissions";
import { PortalMode, Role } from "@/types";

interface DemoContextValue {
  role: Role;
  portalMode: PortalMode;
  periodId: string;
  recentQueries: string[];
  setRole: (role: Role) => void;
  setPeriodId: (periodId: string) => void;
  addQuery: (query: string) => void;
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>("Fund Manager");
  const [periodId, setPeriodId] = useState(reportingPeriods[0].id);
  const [recentQueries, setRecentQueries] = useState<string[]>([]);

  const value = useMemo(
    () => ({
      role,
      portalMode: roleToPortalMode(role),
      periodId,
      recentQueries,
      setRole: (nextRole: Role) => setRoleState(nextRole),
      setPeriodId,
      addQuery: (query: string) =>
        setRecentQueries((current) => [query, ...current.filter((item) => item !== query)].slice(0, 5))
    }),
    [periodId, recentQueries, role]
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemo must be used within DemoProvider");
  }
  return context;
}

export { reportingPeriods, roles };
