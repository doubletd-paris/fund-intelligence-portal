import { assets, benchmarkSeries, debtFacilities } from "@/data/mock-data";
import { QueryResult } from "@/types";

export function parseDemoQuery(query: string): QueryResult {
  const normalized = query.toLowerCase();

  if (normalized.includes("logistics") || normalized.includes("office") || normalized.includes("paris")) {
    const sector = normalized.includes("logistics") ? "Logistics" : normalized.includes("office") ? "Office" : undefined;
    const geography = normalized.includes("germany")
      ? "Germany"
      : normalized.includes("paris")
        ? "Paris"
        : undefined;
    const vacancyThreshold = normalized.includes("vacancy above 10") ? 90 : undefined;
    const matchedAssets = assets.filter((asset) => {
      const sectorMatch = sector ? asset.sector === sector : true;
      const geographyMatch = geography
        ? geography === "Paris"
          ? asset.city === "Paris"
          : asset.country === geography
        : true;
      const vacancyMatch = vacancyThreshold ? asset.occupancy < vacancyThreshold : true;
      return sectorMatch && geographyMatch && vacancyMatch;
    });

    return {
      type: "portfolio",
      interpretedQuery: sector && geography ? `${sector} assets in ${geography}` : "Filtered portfolio assets",
      appliedFilters: [
        sector ? `Sector: ${sector}` : "Sector: Any",
        geography ? `Geography: ${geography}` : "Geography: Any",
        vacancyThreshold ? "Vacancy > 10%" : "Occupancy: Any"
      ],
      resultCount: matchedAssets.length,
      title: "Portfolio screening results",
      description: "Cross-filtered assets from the explorer with direct links into portfolio and asset pages."
    };
  }

  if (normalized.includes("benchmark") || normalized.includes("performance")) {
    return {
      type: "performance",
      interpretedQuery: "Fund performance vs benchmark over five years",
      appliedFilters: ["Period: 5Y", "Comparators: INREV ODCE, MSCI PEPFI"],
      resultCount: benchmarkSeries.length,
      title: "Performance comparison",
      description: "Structured result combining total return, rolling return, and benchmark relative performance."
    };
  }

  if (normalized.includes("debt") || normalized.includes("maturing")) {
    const matched = debtFacilities.filter((facility) => new Date(facility.maturityDate) <= new Date("2027-12-31"));
    return {
      type: "debt",
      interpretedQuery: "Debt maturing within 24 months",
      appliedFilters: ["Maturity: <= 24 months"],
      resultCount: matched.length,
      title: "Near-term debt maturities",
      description: "Refined facility list with covenant and refinancing indicators."
    };
  }

  if (normalized.includes("valuation") || normalized.includes("increase")) {
    return {
      type: "valuation",
      interpretedQuery: "Assets with the largest valuation uplift this year",
      appliedFilters: ["Metric: YoY valuation growth", "Sort: Descending"],
      resultCount: 8,
      title: "Top positive valuation movements",
      description: "Largest movers pulled from the valuation module with contextual yield movement."
    };
  }

  return {
    type: "changes",
    interpretedQuery: "Quarterly change summary",
    appliedFilters: ["Period: Current quarter"],
    resultCount: 6,
    title: "What changed this quarter",
    description: "Aggregated update across valuation, leasing, debt, documents, and newly uploaded source files."
  };
}
