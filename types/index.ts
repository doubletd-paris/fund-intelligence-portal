export type Classification = "Internal Confidential" | "Investor Shareable" | "Prospect Safe";

export type PortalMode = "Internal Portal" | "Investor Portal";

export type Role =
  | "Admin"
  | "Fund Manager"
  | "Investor Relations"
  | "Asset Manager"
  | "Investment Manager"
  | "Property Fund Finance"
  | "Tax & VAT"
  | "Fund Performance"
  | "Senior Management"
  | "Existing Investor"
  | "Prospect";

export interface ReportingPeriod {
  id: string;
  label: string;
  quarter: string;
  date: string;
}

export interface DataMeta {
  dataSource: string;
  lastUpdated: string;
  dataQuality: "High" | "Medium" | "Watch";
}

export interface Fund extends DataMeta {
  id: string;
  name: string;
  description: string;
  classification: Classification;
  currency: string;
  strategy: string;
  domicile: string;
  inceptionYear: number;
  gav: number;
  nav: number;
  ltv: number;
  cashPct: number;
  distributionYield: number;
  occupancy: number;
  totalReturns: Record<"3M" | "12M" | "3Y" | "5Y" | "10Y", number>;
  benchmarkSnapshot: {
    inrevOdce: number;
    msciPepfi: number;
  };
}

export interface Tenant {
  id: string;
  name: string;
  sector: string;
  leasedAreaSqm: number;
  annualRent: number;
}

export interface Lease {
  id: string;
  tenantId: string;
  assetId: string;
  startDate: string;
  expiryDate: string;
  breakDate?: string;
  annualRent: number;
  status: "Secured" | "In Renewal" | "At Risk";
}

export interface Valuation {
  period: string;
  value: number;
  niy: number;
  qoqChange: number;
  yoyChange: number;
}

export interface Asset extends DataMeta {
  id: string;
  name: string;
  slug: string;
  city: string;
  country: string;
  countryCode: string;
  sector: "Office" | "Logistics" | "Residential" | "Retail" | "Alternatives";
  subSector: string;
  bucket: "Core Stabilised" | "Asset Management" | "Development";
  esgLabel: "A" | "B" | "C";
  classification: Classification;
  latitude: number;
  longitude: number;
  heroTone: string;
  heroAccent: string;
  description: string;
  marketValue: number;
  grossIncome: number;
  occupancy: number;
  waultYears: number;
  floorspaceSqm: number;
  yearBuilt: number;
  latestValuation: number;
  latestYield: number;
  valuationHistory: Valuation[];
  tenants: Tenant[];
  leases: Lease[];
  certifications: string[];
  energyIntensity: number;
  carbonIntensity: number;
  internalNotes: string;
}

export interface Commitment {
  fundId: string;
  amount: number;
  unfunded: number;
  distributions: number;
  nav: number;
}

export interface Investor extends DataMeta {
  id: string;
  name: string;
  geography: string;
  investorType: string;
  sizeBucket: string;
  status: "Active" | "Prospect" | "Redeemed";
  classification: Classification;
  relationshipLead: string;
  commitment: Commitment;
}

export interface DebtFacility extends DataMeta {
  id: string;
  lender: string;
  facilityName: string;
  type: "RCF" | "Term Loan" | "Green Loan";
  amount: number;
  drawn: number;
  marginBps: number;
  maturityDate: string;
  fixedPct: number;
  covenantStatus: "Comfortable" | "Monitor" | "Tight";
  linkedAssets: string[];
  classification: Classification;
}

export interface Transaction extends DataMeta {
  id: string;
  name: string;
  type: "Acquisition" | "Disposal";
  stage: "Origination" | "IC Review" | "Exclusivity" | "Documentation" | "Closing";
  probability: number;
  expectedClose: string;
  geography: string;
  sector: string;
  price: number;
  impact: string;
  classification: Classification;
}

export interface BenchmarkSeries {
  period: string;
  fund: number;
  incomeReturn: number;
  capitalReturn: number;
  inrevOdce: number;
  msciPepfi: number;
}

export interface ESGMetric extends DataMeta {
  id: string;
  title: string;
  value: string;
  trend: number;
  target: string;
  classification: Classification;
}

export interface Document {
  id: string;
  name: string;
  category: "Prospectus" | "Quarterly Reports" | "Presentations" | "Factsheets" | "Asset Documents" | "Internal Documents";
  assetId?: string;
  date: string;
  classification: Classification;
  description: string;
}

export interface DataSource {
  id: string;
  name: string;
  sourceType: "Excel" | "System" | "External";
  lastUpload: string;
  status: "Valid" | "Warning" | "Error";
  frequency: string;
  linkedObjects: number;
  completenessPct: number;
  owner: string;
  dataQuality: "High" | "Medium" | "Watch";
}

export interface User {
  id: string;
  name: string;
  role: Role;
  portalMode: PortalMode;
  organization: string;
}

export interface QueryResult {
  type: "portfolio" | "performance" | "debt" | "valuation" | "changes";
  interpretedQuery: string;
  appliedFilters: string[];
  resultCount: number;
  title: string;
  description: string;
}
