// src/data/procedures.ts

export type ProcedureItem = {
  title: string;
  authority: string;
  steps: string[];
  link?: string; // guidance URL
  forms?: { label: string; href: string }[];
};

export type ProceduresByCountry = Record<
  "BW" | "MW" | "NA" | "ZM" | "ZW",
  {
    import: ProcedureItem[];
    export: ProcedureItem[];
  }
>;

/**
 * Minimal, safe defaults so the UI never crashes.
 * Fill in each country's arrays as you gather official details and PDFs.
 */
export const procedures: ProceduresByCountry = {
  BW: {
    import: [
      {
        title: "Import permit (controlled goods)",
        authority: "Ministry of Trade & Industry",
        steps: [
          "Confirm your HS code requires a permit under the Control of Imports & Exports Act.",
          "Complete application and attach supporting documents.",
          "Submit and await approval; keep permit for customs clearance.",
        ],
        link: "https://www.mtie.gov.bw",
        forms: [
          { label: "Form 1 C2 (sample)", href: "/docs/BW/CONTROL_OF_IMPORTS_FORM_C2.pdf" },
        ],
      },
      {
        title: "Customs declaration (ASYCUDAWorld)",
        authority: "BURS – Customs & Excise",
        steps: [
          "Register as importer (or appoint a licensed clearing agent).",
          "Prepare invoice, packing list, transport doc, permits/SPS as applicable.",
          "Submit SAD 500 in ASYCUDAWorld with attachments; pay duties/VAT; obtain release.",
        ],
        link: "https://www.burs.org.bw",
        forms: [],
      },
    ],
    export: [
      {
        title: "Certificate of origin (preferences)",
        authority: "Customs / Chamber as applicable",
        steps: [
          "Verify eligibility under SACU/SADC/AfCFTA/EU-SADC EPA.",
          "Apply for the correct certificate (e.g., SADC, AfCFTA, EUR.1).",
          "Attach certificate to export documentation for preferential entry abroad.",
        ],
        forms: [],
      },
    ],
  },

  // Placeholders — safe to ship; UI will read “No entries yet.”
  MW: { import: [], export: [] },
  NA: { import: [], export: [] },
  ZM: { import: [], export: [] },
  ZW: { import: [], export: [] },
};

// ---- Country Guides (concise, official-style) ----

export type CountryGuide = {
  overview: string;
  steps: string[];
  agencies: { name: string; role: string; url?: string }[];
  links: { label: string; href: string }[];
  summary?: {
    rows: { step: string; authority: string; formOrSystem: string }[];
  };
};

export const countryGuides: Record<"BW"|"MW"|"NA"|"ZM"|"ZW", CountryGuide> = {
  BW: {
    overview:
      "Botswana requires importer registration with BURS and product-specific permits where applicable. Electronic customs clearance is via ASYCUDAWorld. Preferential rates may apply under SACU, SADC, AfCFTA, or EPA with a certificate of origin.",
    steps: [
      "Check if an import permit is required (e.g., agricultural, veterinary, pharmaceuticals, fuels, controlled goods).",
      "Register with BURS as importer/exporter (or appoint a licensed clearing agent).",
      "Prepare documents: commercial invoice, packing list, bill of lading/air waybill, certificate of origin (if claiming preferences), any SPS certificates, and permits.",
      "Submit SAD 500 in ASYCUDAWorld with attachments; BURS assigns inspection channel.",
      "Pay applicable customs duties and VAT; obtain customs release.",
      "Retain all records for at least 5 years for audit.",
    ],
    agencies: [
      { name: "BURS – Customs & Excise", role: "Customs clearance, duties/VAT", url: "https://www.burs.org.bw" },
      { name: "Ministry of Trade & Industry", role: "Import/export permits (controlled goods)" },
      { name: "BOBS – Botswana Bureau of Standards", role: "Product standards & labelling", url: "https://www.bobs.co.bw" },
      { name: "Veterinary & Plant Health Depts.", role: "SPS certificates (animal/plant products)" },
    ],
    links: [
      { label: "BURS eCustoms (ASYCUDA) guide (PDF)", href: "https://ecustoms.burs.org.bw/TFBSEW/docs/IMPORTERS%20%20EXPORTERS.pdf" },
      { label: "Import Permit — Form 1 C2 (sample)", href: "/docs/BW/CONTROL_OF_IMPORTS_FORM_C2.pdf" },
      { label: "Ministry of Trade & Industry (Botswana)", href: "https://www.mtie.gov.bw" },
      { label: "BOBS (Standards)", href: "https://www.bobs.co.bw" },
    ],
    summary: {
      rows: [
        { step: "Permit check", authority: "Ministry of Trade & Industry", formOrSystem: "Form 1 C2 (if required)" },
        { step: "Importer registration", authority: "BURS", formOrSystem: "Trader Registration" },
        { step: "Customs declaration", authority: "BURS", formOrSystem: "ASYCUDAWorld (SAD 500)" },
        { step: "Preferences (optional)", authority: "Customs/Exporter", formOrSystem: "SADC/AfCFTA/EPA CoO" },
        { step: "Standards/Labelling", authority: "BOBS", formOrSystem: "Inspection/Compliance" },
      ],
    },
  },

  // Minimal, editable placeholders for other countries
  MW: {
    overview:
      "Malawi’s customs is administered by MRA using ASYCUDAWorld. Certain goods require import permits and SPS certificates.",
    steps: [
      "Check permit/SPS requirements for your product.",
      "Register with MRA/appoint a clearing agent.",
      "Prepare invoice, packing list, transport doc, CoO (if preferences), permits/SPS.",
      "Submit customs declaration in ASYCUDAWorld; pay duties/VAT.",
      "Obtain customs release; keep records.",
    ],
    agencies: [
      { name: "MRA – Malawi Revenue Authority", role: "Customs & VAT" },
      { name: "Ministry of Trade & Industry (MW)", role: "Import permits/licensing" },
    ],
    links: [],
    summary: { rows: [
      { step: "Permit check", authority: "Ministry of Trade", formOrSystem: "Permit (if required)" },
      { step: "Importer registration", authority: "MRA", formOrSystem: "Trader ID" },
      { step: "Customs declaration", authority: "MRA", formOrSystem: "ASYCUDAWorld" },
    ]},
  },

  NA: {
    overview:
      "Namibia (within SACU) uses NamRA for customs. Many imports follow SACU rules; some goods require permits/SPS.",
    steps: [
      "Check permit/SPS requirements (sector regulators).",
      "Register with NamRA or appoint clearing agent.",
      "Prepare standard docs and CoO if using SACU/SADC/AfCFTA/EPA preferences.",
      "File customs declaration; pay duties/VAT.",
      "Obtain release; retain records.",
    ],
    agencies: [
      { name: "NamRA – Namibia Revenue Agency", role: "Customs & VAT" },
      { name: "Sector regulators (Agriculture, Health, etc.)", role: "Permits/SPS" },
    ],
    links: [],
    summary: { rows: [
      { step: "Permit check", authority: "Sector regulators", formOrSystem: "Permit (if required)" },
      { step: "Importer registration", authority: "NamRA", formOrSystem: "Trader Registration" },
      { step: "Customs declaration", authority: "NamRA", formOrSystem: "Customs system" },
    ]},
  },

  ZM: {
    overview:
      "Zambia Revenue Authority (ZRA) handles customs. Some categories require import permits and SPS documentation.",
    steps: [
      "Confirm permit/SPS needs for your HS code.",
      "Register with ZRA or appoint a clearing agent.",
      "Prepare invoice/packing list/transport docs/CoO (if preferences).",
      "Declare goods; pay duties/VAT.",
      "Collect release; keep records.",
    ],
    agencies: [
      { name: "ZRA – Zambia Revenue Authority", role: "Customs & VAT" },
      { name: "Ministry of Commerce, Trade & Industry (ZM)", role: "Trade permits/licensing" },
    ],
    links: [],
    summary: { rows: [
      { step: "Permit check", authority: "Line ministries", formOrSystem: "Permit (if required)" },
      { step: "Importer registration", authority: "ZRA", formOrSystem: "Trader ID" },
      { step: "Customs declaration", authority: "ZRA", formOrSystem: "Customs system" },
    ]},
  },

  ZW: {
    overview:
      "Zimbabwe Revenue Authority (ZIMRA) oversees customs. Some imports require permits, licences, or SPS.",
    steps: [
      "Check permit/licensing/SPS requirements by product.",
      "Register with ZIMRA or use a clearing agent.",
      "Prepare invoice, packing list, CoO (if preferences), permits/SPS.",
      "Submit customs declaration; pay duties/VAT.",
      "Obtain release; maintain records.",
    ],
    agencies: [
      { name: "ZIMRA – Zimbabwe Revenue Authority", role: "Customs & VAT" },
      { name: "Line ministries (e.g., Industry, Health, Agriculture)", role: "Permits & SPS" },
    ],
    links: [],
    summary: { rows: [
      { step: "Permit check", authority: "Line ministries", formOrSystem: "Permit (if required)" },
      { step: "Importer registration", authority: "ZIMRA", formOrSystem: "Trader Registration" },
      { step: "Customs declaration", authority: "ZIMRA", formOrSystem: "Customs system" },
    ]},
  },
};