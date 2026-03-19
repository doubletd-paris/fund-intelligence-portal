import {
  Asset,
  BenchmarkSeries,
  DataSource,
  DebtFacility,
  Document,
  ESGMetric,
  Fund,
  Investor,
  ReportingPeriod,
  Transaction,
  User
} from "@/types";
import { reportingPeriods, roleToPortalMode, roles } from "@/lib/permissions";

const cityCatalog = [
  ["Paris", "France", "FR", 48.8566, 2.3522],
  ["Lyon", "France", "FR", 45.764, 4.8357],
  ["Berlin", "Germany", "DE", 52.52, 13.405],
  ["Hamburg", "Germany", "DE", 53.5511, 9.9937],
  ["Munich", "Germany", "DE", 48.1351, 11.582],
  ["Amsterdam", "Netherlands", "NL", 52.3676, 4.9041],
  ["Rotterdam", "Netherlands", "NL", 51.9244, 4.4777],
  ["Madrid", "Spain", "ES", 40.4168, -3.7038],
  ["Barcelona", "Spain", "ES", 41.3874, 2.1686],
  ["Milan", "Italy", "IT", 45.4642, 9.19],
  ["Rome", "Italy", "IT", 41.9028, 12.4964],
  ["Brussels", "Belgium", "BE", 50.8503, 4.3517],
  ["Dublin", "Ireland", "IE", 53.3498, -6.2603],
  ["Warsaw", "Poland", "PL", 52.2297, 21.0122],
  ["Copenhagen", "Denmark", "DK", 55.6761, 12.5683],
  ["Stockholm", "Sweden", "SE", 59.3293, 18.0686]
] as const;

const sectors = [
  ["Office", "CBD Campus"],
  ["Logistics", "Urban Distribution"],
  ["Residential", "Living Platform"],
  ["Retail", "Convenience Retail"],
  ["Alternatives", "Life Sciences"]
] as const;

const heroTones = [
  ["#eef2f3", "#b9c9d3"],
  ["#f6f0ea", "#dbc9b8"],
  ["#eef3ef", "#b9c8be"],
  ["#f1f4f8", "#b7c2d4"]
];

export const periods: ReportingPeriod[] = reportingPeriods;

export const fund: Fund = {
  id: "fund-1",
  name: "Aurora Core Europe Real Estate Fund",
  description:
    "A fictional pan-European core fund spanning gateway office, urban logistics, living, and convenience real estate across major Western European markets.",
  classification: "Investor Shareable",
  currency: "EUR",
  strategy: "Pan-European Core",
  domicile: "Luxembourg",
  inceptionYear: 2015,
  gav: 3840000000,
  nav: 2410000000,
  ltv: 28.4,
  cashPct: 6.2,
  distributionYield: 4.3,
  occupancy: 94.1,
  totalReturns: {
    "3M": 1.8,
    "12M": 7.2,
    "3Y": 6.5,
    "5Y": 7.1,
    "10Y": 8.3
  },
  benchmarkSnapshot: {
    inrevOdce: 6.4,
    msciPepfi: 5.9
  },
  dataSource: "Performance Data",
  lastUpdated: "2026-03-12",
  dataQuality: "High"
};

export const assets: Asset[] = Array.from({ length: 48 }).map((_, index) => {
  const city = cityCatalog[index % cityCatalog.length];
  const sector = sectors[index % sectors.length];
  const tone = heroTones[index % heroTones.length];
  const marketValue = 42000000 + index * 12000000;
  const occupancy = 87 + (index % 10);
  const latestYield = 3.8 + ((index % 7) * 0.18);
  const currentValue = marketValue + ((index % 6) - 2) * 3500000;
  const tenants = Array.from({ length: 3 }).map((__, tenantIndex) => ({
    id: `tenant-${index}-${tenantIndex}`,
    name: `${["Northgate", "Aurelia", "Harbour", "Meridian", "Lattice"][tenantIndex]} ${
      ["Industries", "Advisory", "Health", "Logistics", "Retail"][index % 5]
    }`,
    sector: ["Corporate", "Logistics", "Healthcare", "Consumer"][tenantIndex % 4],
    leasedAreaSqm: 2800 + tenantIndex * 1800 + index * 25,
    annualRent: 420000 + tenantIndex * 210000 + index * 6500
  }));
  const leases = tenants.map((tenant, leaseIndex) => ({
    id: `lease-${index}-${leaseIndex}`,
    tenantId: tenant.id,
    assetId: `asset-${index + 1}`,
    startDate: `202${leaseIndex}-0${leaseIndex + 2}-01`,
    expiryDate: `202${7 + leaseIndex}-1${leaseIndex}-30`,
    breakDate: leaseIndex === 1 ? `2028-06-30` : undefined,
    annualRent: tenant.annualRent,
    status: leaseIndex === 2 ? "In Renewal" : "Secured"
  })) as Asset["leases"];

  return {
    id: `asset-${index + 1}`,
    slug: `asset-${index + 1}`,
    name: `${["Arc", "Canal", "Harbour", "North", "Riverside", "Westbridge"][index % 6]} ${
      ["Gate", "Yard", "Quarter", "Point", "Works", "Exchange"][Math.floor(index / 3) % 6]
    }`,
    city: city[0],
    country: city[1],
    countryCode: city[2],
    latitude: city[3] + (index % 3) * 0.03,
    longitude: city[4] + (index % 4) * 0.03,
    sector: sector[0],
    subSector: sector[1],
    bucket: index % 5 === 0 ? "Asset Management" : index % 7 === 0 ? "Development" : "Core Stabilised",
    esgLabel: index % 7 === 0 ? "C" : index % 3 === 0 ? "B" : "A",
    classification: index % 8 === 0 ? "Prospect Safe" : "Investor Shareable",
    heroTone: tone[0],
    heroAccent: tone[1],
    description:
      "Institutional-quality asset with modern technical specifications, established tenant mix, and clear operating visibility for internal and investor audiences.",
    marketValue,
    grossIncome: marketValue * 0.054,
    occupancy,
    waultYears: 4.1 + (index % 8) * 0.6,
    floorspaceSqm: 10500 + index * 950,
    yearBuilt: 2001 + (index % 20),
    latestValuation: currentValue,
    latestYield,
    valuationHistory: [
      { period: "2023 Q4", value: marketValue - 4800000, niy: latestYield + 0.35, qoqChange: 0.6, yoyChange: 2.1 },
      { period: "2024 Q2", value: marketValue - 2100000, niy: latestYield + 0.22, qoqChange: 0.8, yoyChange: 3.4 },
      { period: "2024 Q4", value: marketValue + 500000, niy: latestYield + 0.12, qoqChange: 1.1, yoyChange: 4.6 },
      { period: "2025 Q2", value: marketValue + 1600000, niy: latestYield + 0.05, qoqChange: 0.9, yoyChange: 5.2 },
      { period: "2025 Q4", value: currentValue, niy: latestYield, qoqChange: 1.3, yoyChange: 6.1 + (index % 5) * 0.5 }
    ],
    tenants,
    leases,
    certifications: index % 2 === 0 ? ["BREEAM Very Good", "WiredScore Gold"] : ["LEED Gold"],
    energyIntensity: 88 - (index % 9) * 4,
    carbonIntensity: 28 - (index % 7) * 2,
    internalNotes: "Synthetic note: lease renewal watchlist and data consolidation still tracked through shared valuation workbook.",
    dataSource: index % 2 === 0 ? "Asset Master" : "Rent Roll",
    lastUpdated: "2026-03-10",
    dataQuality: index % 9 === 0 ? "Watch" : "High"
  };
});

export const benchmarkSeries: BenchmarkSeries[] = [
  { period: "2016", fund: 8.4, incomeReturn: 4.6, capitalReturn: 3.8, inrevOdce: 7.3, msciPepfi: 6.8 },
  { period: "2017", fund: 9.1, incomeReturn: 4.7, capitalReturn: 4.4, inrevOdce: 7.8, msciPepfi: 7.1 },
  { period: "2018", fund: 8.8, incomeReturn: 4.9, capitalReturn: 3.9, inrevOdce: 6.9, msciPepfi: 6.6 },
  { period: "2019", fund: 9.4, incomeReturn: 4.8, capitalReturn: 4.6, inrevOdce: 7.5, msciPepfi: 7.2 },
  { period: "2020", fund: 1.9, incomeReturn: 3.7, capitalReturn: -1.8, inrevOdce: 1.1, msciPepfi: 0.8 },
  { period: "2021", fund: 7.6, incomeReturn: 3.9, capitalReturn: 3.7, inrevOdce: 6.8, msciPepfi: 6.2 },
  { period: "2022", fund: 5.1, incomeReturn: 4.1, capitalReturn: 1.0, inrevOdce: 4.3, msciPepfi: 4.1 },
  { period: "2023", fund: 2.8, incomeReturn: 4.2, capitalReturn: -1.4, inrevOdce: 1.5, msciPepfi: 1.1 },
  { period: "2024", fund: 6.6, incomeReturn: 4.2, capitalReturn: 2.4, inrevOdce: 5.7, msciPepfi: 5.3 },
  { period: "2025", fund: 7.2, incomeReturn: 4.3, capitalReturn: 2.9, inrevOdce: 6.4, msciPepfi: 5.9 }
];

export const investors: Investor[] = Array.from({ length: 28 }).map((_, index) => ({
  id: `investor-${index + 1}`,
  name: `${["Northlake", "Crescent", "Silver Oak", "Aster", "Meridian", "Longfield"][index % 6]} ${
    ["Pension Board", "Insurance Group", "Capital Partners", "Endowment", "Reserve Fund"][index % 5]
  }`,
  geography: ["UK", "Germany", "France", "Nordics", "Benelux", "Middle East"][index % 6],
  investorType: ["Pension", "Insurance", "Sovereign", "Family Office", "Endowment"][index % 5],
  sizeBucket: ["<50m", "50-100m", "100-250m", "250m+"][index % 4],
  status: index < 18 ? "Active" : index < 24 ? "Prospect" : "Redeemed",
  classification: index < 24 ? "Internal Confidential" : "Investor Shareable",
  relationshipLead: ["Emma Blake", "Jonas Richter", "Luc Marin", "Marta Silva"][index % 4],
  commitment: {
    fundId: fund.id,
    amount: 25000000 + index * 12000000,
    unfunded: Math.max(0, 12000000 - index * 250000),
    distributions: 9000000 + index * 750000,
    nav: 22000000 + index * 9800000
  },
  dataSource: "Investor Register",
  lastUpdated: "2026-03-09",
  dataQuality: index % 8 === 0 ? "Medium" : "High"
}));

export const debtFacilities: DebtFacility[] = [
  ["NordLand Bank", "Fund RCF", "RCF", 210000000, 140000000, 165, "2027-05-31", 35, "Comfortable"],
  ["Helios Credit", "Paris Office Term", "Term Loan", 180000000, 180000000, 152, "2028-09-30", 72, "Comfortable"],
  ["Continental Landesbank", "German Logistics Green", "Green Loan", 240000000, 180000000, 148, "2027-11-30", 58, "Monitor"],
  ["Avenue Debt Partners", "Living Portfolio Loan", "Term Loan", 125000000, 99000000, 172, "2026-12-31", 41, "Tight"],
  ["Meridian Bank", "Benelux Campus Facility", "Term Loan", 145000000, 110000000, 159, "2028-03-31", 64, "Comfortable"],
  ["Alpine Credit", "Nordics RCF", "RCF", 95000000, 42000000, 183, "2026-10-31", 22, "Monitor"]
].map((item, index) => ({
  id: `debt-${index + 1}`,
  lender: item[0],
  facilityName: item[1],
  type: item[2] as DebtFacility["type"],
  amount: item[3] as number,
  drawn: item[4] as number,
  marginBps: item[5] as number,
  maturityDate: item[6] as string,
  fixedPct: item[7] as number,
  covenantStatus: item[8] as DebtFacility["covenantStatus"],
  linkedAssets: assets.slice(index * 3, index * 3 + 4).map((asset) => asset.id),
  classification: "Internal Confidential",
  dataSource: "Debt Schedule",
  lastUpdated: "2026-03-11",
  dataQuality: index === 3 ? "Watch" : "High"
}));

export const transactions: Transaction[] = [
  ["Project Linden Quay", "Acquisition", "Exclusivity", 72, "2026-07-15", "Netherlands", "Logistics", 128000000, "Adds prime Randstad logistics exposure"],
  ["Project Atelier", "Acquisition", "IC Review", 48, "2026-09-30", "France", "Residential", 94000000, "Improves living allocation in Lyon"],
  ["Project Meridian Park", "Disposal", "Documentation", 85, "2026-06-28", "Germany", "Office", 156000000, "Releases capital from non-core office cluster"],
  ["Project Sienna", "Acquisition", "Origination", 25, "2026-12-12", "Spain", "Alternatives", 76000000, "Introduces life sciences angle in Barcelona"],
  ["Project Canal Market", "Disposal", "Closing", 96, "2026-04-25", "Belgium", "Retail", 52000000, "Reduces small-lot retail weighting"]
].map((item, index) => ({
  id: `txn-${index + 1}`,
  name: item[0],
  type: item[1] as Transaction["type"],
  stage: item[2] as Transaction["stage"],
  probability: item[3] as number,
  expectedClose: item[4] as string,
  geography: item[5] as string,
  sector: item[6] as string,
  price: item[7] as number,
  impact: item[8] as string,
  classification: index < 1 ? "Investor Shareable" : "Internal Confidential",
  dataSource: "Transactions Pipeline",
  lastUpdated: "2026-03-08",
  dataQuality: "High"
}));

export const esgMetrics: ESGMetric[] = [
  {
    id: "esg-1",
    title: "Certified floor area",
    value: "78%",
    trend: 6.2,
    target: "85% by 2027",
    classification: "Investor Shareable",
    dataSource: "ESG Tracker",
    lastUpdated: "2026-03-07",
    dataQuality: "High"
  },
  {
    id: "esg-2",
    title: "Portfolio energy intensity",
    value: "81 kWh/sqm",
    trend: -4.5,
    target: "<75 kWh/sqm",
    classification: "Investor Shareable",
    dataSource: "ESG Tracker",
    lastUpdated: "2026-03-07",
    dataQuality: "High"
  },
  {
    id: "esg-3",
    title: "Carbon intensity",
    value: "23 kgCO2e/sqm",
    trend: -5.1,
    target: "<20 kgCO2e/sqm",
    classification: "Investor Shareable",
    dataSource: "ESG Tracker",
    lastUpdated: "2026-03-07",
    dataQuality: "Medium"
  }
];

export const documents: Document[] = [
  ["FY2025 Investor Presentation", "Presentations", "2026-02-20", "Investor Shareable"],
  ["Q4 2025 Quarterly Report", "Quarterly Reports", "2026-02-18", "Investor Shareable"],
  ["Fund Factsheet March 2026", "Factsheets", "2026-03-10", "Prospect Safe"],
  ["Lux Prospectus Extract", "Prospectus", "2025-12-15", "Prospect Safe"],
  ["Portfolio Leasing Tracker", "Internal Documents", "2026-03-11", "Internal Confidential"],
  ["Valuation Committee Pack", "Internal Documents", "2026-03-06", "Internal Confidential"]
].map((doc, index) => ({
  id: `doc-${index + 1}`,
  name: doc[0] as string,
  category: doc[1] as Document["category"],
  date: doc[2] as string,
  classification: doc[3] as Document["classification"],
  description: "Synthetic demonstration document entry showing controlled visibility and contextual metadata."
}));

export const dataSources: DataSource[] = [
  ["Rent Roll", "Excel", "2026-03-12", "Valid", "Monthly", 48, 98, "Asset Finance"],
  ["Asset Master", "System", "2026-03-10", "Valid", "Daily", 48, 99, "Data Office"],
  ["Valuations", "Excel", "2026-03-09", "Warning", "Quarterly", 48, 95, "Valuation Lead"],
  ["Investor Register", "Excel", "2026-03-08", "Valid", "Weekly", 28, 97, "Investor Relations"],
  ["Debt Schedule", "Excel", "2026-03-11", "Warning", "Monthly", 6, 94, "Treasury"],
  ["Performance Data", "System", "2026-03-12", "Valid", "Quarterly", 10, 99, "Performance Team"],
  ["Benchmark Data", "External", "2026-03-05", "Valid", "Quarterly", 10, 96, "Performance Team"],
  ["Transactions Pipeline", "Excel", "2026-03-07", "Error", "Weekly", 5, 89, "Investment Management"]
].map((source, index) => ({
  id: `source-${index + 1}`,
  name: source[0] as string,
  sourceType: source[1] as DataSource["sourceType"],
  lastUpload: source[2] as string,
  status: source[3] as DataSource["status"],
  frequency: source[4] as string,
  linkedObjects: source[5] as number,
  completenessPct: source[6] as number,
  owner: source[7] as string,
  dataQuality: (source[3] === "Error" ? "Watch" : source[3] === "Warning" ? "Medium" : "High") as DataSource["dataQuality"]
}));

export const users: User[] = roles.map((role, index) => ({
  id: `user-${index + 1}`,
  name: `${role} Demo`,
  role,
  portalMode: roleToPortalMode(role),
  organization: roleToPortalMode(role) === "Investor Portal" ? "External User" : "Aurora Real Estate Management"
}));

export const quickQueries = [
  "Show logistics assets in Germany with vacancy above 10%",
  "Compare fund performance vs benchmark over 5 years",
  "List debt maturing in the next 24 months",
  "Which assets had the largest valuation increase this year?",
  "Show office assets in Paris",
  "What changed this quarter?"
];

export const recentFiles = [
  { name: "Q1 rent roll upload.xlsx", date: "2026-03-12", status: "Validated" },
  { name: "Debt covenant tracker_march.xlsx", date: "2026-03-11", status: "Warnings" },
  { name: "Asset imagery refresh.zip", date: "2026-03-10", status: "Loaded" }
];

export const alerts = [
  "One debt facility moves into a 24-month maturity window this quarter.",
  "Two valuation files still require manual mapping confirmation.",
  "Four lease events are due inside the next 120 days."
];
