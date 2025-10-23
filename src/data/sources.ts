// src/data/sources.ts
export type SourceRef = {
  id: string;
  title: string;
  url: string;
  publisher?: string;
  lastChecked?: string; // ISO yyyy-mm-dd
};

export const sources: Record<string, SourceRef> = {
  // --- existing entries here ---

  // NEW — SACU
  "sacu-agreement-2002": {
    id: "sacu-agreement-2002",
    title: "Southern African Customs Union (2002) — Agreement",
    url: "https://www.sacu.int/agree.php", // replace with your preferred official copy if different
    publisher: "SACU Secretariat",
    lastChecked: "2025-10-22"
  },
  "sacu-origin-internal": {
    id: "sacu-origin-internal",
    title: "Intra-SACU movement & origin proof (overview)",
    url: "https://www.sacu.int/trade.php", // placeholder landing; swap for a specific guidance link you prefer
    publisher: "SACU Secretariat",
    lastChecked: "2025-10-22"
  },
  "sars-tariff-book": {
    id: "sars-tariff-book",
    title: "Common External Tariff (Tariff Book, reference)",
    url: "https://www.sars.gov.za/customs-and-excise/tariff/", // CET reference (South Africa publishes CET for SACU)
    publisher: "SARS",
    lastChecked: "2025-10-22"
  },
  "burs-customs-guide": {
    id: "burs-customs-guide",
    title: "Customs procedures (Botswana) — overview",
    url: "https://www.burs.org.bw/customs-excise",
    publisher: "Botswana Unified Revenue Service",
    lastChecked: "2025-10-22"
  }
};