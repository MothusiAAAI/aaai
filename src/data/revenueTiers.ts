// src/data/revenueTiers.ts

export type RevenueTier = {
  id: string;
  name: string;
  revenueRange?: string; // not required for Civil Societies
  pricePerYearUSD: number;
  audienceNote?: string; // for Civil Societies description
  features: string[];
};

const sharedFeatures: string[] = [
  "Compliance dashboard",
  "Automated filing reminders",
  "Annual & monthly compliance calendar",
  "Secure document vault",
  "Multi-entity support",
  "Email alerts & audit trail",
];

export const REVENUE_TIERS: RevenueTier[] = [
  {
    id: "small-enterprise",
    name: "Small Enterprise",
    revenueRange: "Under $100,000 / year revenue",
    pricePerYearUSD: 70,
    features: sharedFeatures,
  },
  {
    id: "medium-enterprise",
    name: "Medium Enterprise",
    revenueRange: "$100,000 – $500,000 / year revenue",
    pricePerYearUSD: 150,
    features: sharedFeatures,
  },
  {
    id: "corporate",
    name: "Corporate",
    revenueRange: "Over $500,000 / year revenue",
    pricePerYearUSD: 500,
    features: sharedFeatures,
  },
  {
    id: "civil-societies",
    name: "Civil Societies",
    pricePerYearUSD: 35,
    audienceNote: "Non-governmental, Non-profit, and Voluntary Organizations",
    features: sharedFeatures,
  },
];

export const PAYMENT_TIMING_NOTE =
  "Payment timing: SMEs at launch. Financial institutions three months post-launch. Government agencies from 2027.";