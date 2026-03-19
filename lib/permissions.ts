import { Classification, PortalMode, Role } from "@/types";

export const roles: Role[] = [
  "Admin",
  "Fund Manager",
  "Investor Relations",
  "Asset Manager",
  "Investment Manager",
  "Property Fund Finance",
  "Tax & VAT",
  "Fund Performance",
  "Senior Management",
  "Existing Investor",
  "Prospect"
];

export const reportingPeriods = [
  { id: "2025-q4", label: "Q4 2025", quarter: "Q4 2025", date: "2025-12-31" },
  { id: "2025-q3", label: "Q3 2025", quarter: "Q3 2025", date: "2025-09-30" },
  { id: "2025-q2", label: "Q2 2025", quarter: "Q2 2025", date: "2025-06-30" },
  { id: "2025-q1", label: "Q1 2025", quarter: "Q1 2025", date: "2025-03-31" }
];

export function roleToPortalMode(role: Role): PortalMode {
  return role === "Existing Investor" || role === "Prospect" ? "Investor Portal" : "Internal Portal";
}

export function canAccessClassification(role: Role, classification: Classification) {
  if (role === "Admin") return true;
  if (role === "Prospect") return classification === "Prospect Safe";
  if (role === "Existing Investor") return classification !== "Internal Confidential";
  return true;
}

export function canViewGlobalInvestorRegistry(role: Role) {
  return !["Existing Investor", "Prospect"].includes(role);
}

export function isInternalRole(role: Role) {
  return !["Existing Investor", "Prospect"].includes(role);
}
