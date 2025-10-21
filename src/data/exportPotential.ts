// src/data/exportPotential.ts
// Types & placeholders for ITC Export Potential Map (EPM) integration.

export type CountryCode = "BW" | "MW" | "NA" | "ZM" | "ZW";
export type PotentialRow = {
  code: string;               // HS2/HS4/HS6 or ISO3 market
  label: string;              // Product or market name
  potentialUSD: number;       // e.g., 12345678
  currentUSD?: number;        // optional current exports
  gapUSD?: number;            // potential - current
};

// --- MOCKS (replace via API later) ---
export const mockPotentialByCountry: Record<CountryCode, PotentialRow[]> = {
  BW: [
    { code: "HS0207", label: "Poultry meat", potentialUSD: 12000000, currentUSD: 3000000, gapUSD: 9000000 },
    { code: "HS0402", label: "Milk & cream", potentialUSD: 8000000, currentUSD: 1200000, gapUSD: 6800000 },
  ],
  MW: [],
  NA: [],
  ZM: [],
  ZW: [],
};

export const mockPotentialByProduct: Record<CountryCode, PotentialRow[]> = {
  BW: [
    { code: "HS7208", label: "Flat-rolled steel", potentialUSD: 5000000 },
    { code: "HS2203", label: "Beer made from malt", potentialUSD: 4300000 },
  ],
  MW: [],
  NA: [],
  ZM: [],
  ZW: [],
};

export const mockPotentialByMarket: Record<CountryCode, PotentialRow[]> = {
  BW: [
    { code: "ZAF", label: "South Africa", potentialUSD: 22000000 },
    { code: "NAM", label: "Namibia", potentialUSD: 6500000 },
  ],
  MW: [],
  NA: [],
  ZM: [],
  ZW: [],
};

// API stubs — call our Next.js API route (to be wired to ITC secure API later)
export async function fetchPotential(kind: "country" | "product" | "market", iso2: CountryCode) {
  const url = `/api/itc?kind=${kind}&iso2=${iso2}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`EPM fetch failed: ${res.status}`);
  return (await res.json()) as PotentialRow[];
}