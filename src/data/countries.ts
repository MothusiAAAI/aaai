export type Item = {
  title: string;
  authority: string;
  eligibility: string[];
  requirements: string[];
  fees: string;
  processing: string;
  notes?: string;
};

export type Country = {
  code: string;
  name: string;
  flag: string;
  items: Item[];
};

export const countries: Country[] = [
      {
    code: "BW",
    name: "Botswana",
    flag: "🇧🇼",
    items: [
      {
        title: "Business Registration (CIPA / OBRS)",
        authority: "Companies and Intellectual Property Authority (CIPA)",
        eligibility: [
          "Natural person or legal entity meeting ID and age requirements",
          "Foreign ownership allowed (sector rules may apply)"
        ],
        requirements: [
          "Name reservation (optional, often combined)",
          "Founding documents (memorandum, articles/constitution)",
          "Directors/shareholders IDs or passports",
          "Registered office address",
          "Beneficial ownership disclosure"
        ],
        fees:
          "Typical: Name reservation ~ P20; Company registration ~ P360; Constitution filing ~ P500",
        processing:
          "Name reservation 1–2 working days; incorporation typically 2–7 working days",
        notes:
          "Use OBRS for online submission and updates. Keep annual returns and BO records current."
      },
      {
        title: "Trade Licence (Retail/Wholesale and Services)",
        authority:
          "Local Town/District Council – Commercial Affairs / Trade Licensing",
        eligibility: [
          "Registered business or business name",
          "Zoned premises and basic health/environmental compliance"
        ],
        requirements: [
          "Completed application form",
          "Certificate of incorporation or business registration",
          "Proof of premises (lease or title deed)",
          "Planner's report / zoning approval",
          "Environmental Health inspection/clearance",
          "Principal ID/passport; where applicable, tax compliance"
        ],
        fees:
          "Application ~ BWP 100; annual licence renewal varies by council and business class",
        processing:
          "Commonly up to 5 working days (subject to inspections/committee schedules)",
        notes:
          "Licence transfers or premise changes require re-approval. Some activities may be citizen-reserved."
      },
      {
        title: "Industrial Licence (Manufacturing)",
        authority:
          "Industrial Licensing Authority (Ministry of Trade & Industry) via Regional Committees",
        eligibility: [
          "Registered company or individual (18+)",
          "Manufacturing activity subject to Industrial Development regulations"
        ],
        requirements: [
          "Industrial licence application (e.g., Form AIL)",
          "Company registration docs and shareholding details",
          "Physical planning approval; lease or title deed",
          "Environmental authorization/EIA where applicable",
          "Waste management arrangements where relevant"
        ],
        fees:
          "Admin fee ~ BWP 50; New licence ~ BWP 200; Annual fee ~ BWP 200; Other actions (duplicate/transfer/name change) BWP 100–500",
        processing: "Target ~ 5 working days after complete submission",
        notes:
          "Some manufacturing lines can be citizen-reserved. Micro/small thresholds may have exemptions per regulations."
      },
      {
        title: "Import and Export Permits",
        authority:
          "Botswana Unified Revenue Service (BURS) – Customs & Excise; line ministries for controlled goods",
        eligibility: [
          "Registered entity with valid trade/manufacturing licence",
          "Compliance with product-specific controls (e.g., agro, pharma)"
        ],
        requirements: [
          "Permit application and customs declarations",
          "Certificates for controlled goods (e.g., phytosanitary/sanitary)",
          "Certificates of origin for exports where required"
        ],
        fees: "Varies by commodity, volume, and permit type",
        processing:
          "Varies by commodity and inspections; allow additional time for controlled goods",
        notes:
          "Confirm HS codes and control lists before shipment; ensure standards compliance for destination markets."
      },
      {
        title: "Standards and Product Certification",
        authority: "Botswana Bureau of Standards (BOBS)",
        eligibility: [
          "Businesses producing or importing goods in compulsory standard categories"
        ],
        requirements: [
          "Product testing and conformity assessment",
          "Technical documentation and labeling compliance",
          "Factory audits where applicable"
        ],
        fees: "Testing and certification fees vary by product and scheme",
        processing: "Dependent on product testing cycles and audit scheduling",
        notes:
          "Compulsory standards have no waivers; ensure packaging and labeling conform to BOBS requirements."
      },
      {
        title: "Environmental and Health Permits",
        authority:
          "Department of Environmental Affairs; Local Council Environmental Health",
        eligibility: [
          "Projects/activities with environmental or public health impacts"
        ],
        requirements: [
          "Project briefs/EIA where required",
          "Mitigation and monitoring plans",
          "Premises health inspection and compliance"
        ],
        fees: "Set per council or by national schedule; varies by project scale",
        processing: "Timelines depend on EIA level and inspections",
        notes:
          "Confirm if your project triggers EIA thresholds; maintain ongoing compliance reporting if applicable."
      }
    ]
  },
  {
  code: "MW",
  name: "Malawi",
  flag: "🇲🇼",
  items: [
    {
      title: "Business Registration (Registrar General / MBRS)",
      authority: "Department of the Registrar General; Malawi Business Registration System (MBRS)",
      eligibility: [
        "Individual or legal entity with a fixed business address in Malawi",
        "Foreign investors may require MITC investment certification and local representation"
      ],
      requirements: [
        "Name reservation via MBRS",
        "Company registration forms (e.g., Form 2)",
        "Memorandum and Articles of Association",
        "IDs or passports for directors and shareholders",
        "Proof of address and Taxpayer Identification Number (TPIN)"
      ],
      fees: "Indicative: Name reservation ~ MWK 5,000; Business name ~ MWK 10,000; Company incorporation (private) ~ MWK 50,000; Annual return ~ MWK 20,000",
      processing: "Typically 3–7 working days via MBRS once documentation is complete",
      notes: "Register online at MBRS; foreign-owned entities commonly coordinate with MITC for investment licensing."
    },
    {
      title: "Trade Licence (Local Council / Ministry of Trade & Industry)",
      authority: "City, Municipal, or District Council; oversight by Ministry of Trade & Industry",
      eligibility: [
        "Registered business operating trade or services in Malawi",
        "Approved premises meeting health and environmental standards"
      ],
      requirements: [
        "Council application form",
        "Certificate of incorporation or business registration",
        "Lease agreement or title deed",
        "Owner identification (ID/passport)",
        "Fire and environmental health clearances"
      ],
      fees: "Application ~ MWK 5,000; Annual licence fee varies by council and activity (approx. MWK 30,000–100,000)",
      processing: "Commonly 5–10 working days subject to inspections",
      notes: "Annual renewal required; expect site inspections by council health and fire departments."
    },
    {
      title: "Industrial Licence (Manufacturing)",
      authority: "Department of Industry, Ministry of Trade & Industry",
      eligibility: [
        "Registered companies establishing or operating industrial/manufacturing plants",
        "Compliance with citizenship reservations where applicable"
      ],
      requirements: [
        "Industrial licence application",
        "Company registration documents",
        "Project proposal and factory layout plan",
        "Environmental Impact Assessment (MEPA) where applicable",
        "Land lease or title documents"
      ],
      fees: "Initial ~ MWK 100,000; Annual renewal ~ MWK 50,000 (indicative)",
      processing: "Approx. 7–10 working days after complete submission",
      notes: "Large projects require MEPA environmental clearance prior to operation."
    },
    {
      title: "Import and Export Permits",
      authority: "Ministry of Trade & Industry – Import/Export Licensing; Malawi Revenue Authority (Customs)",
      eligibility: [
        "Registered businesses with TPIN",
        "Relevant sector approvals for controlled goods (agriculture, chemicals, petroleum, etc.)"
      ],
      requirements: [
        "Completed import/export licence form",
        "Proforma invoice and product list",
        "Tax registration (TPIN)",
        "Sectoral clearances for controlled goods (e.g., Agriculture, Pharmacy Board, Energy)"
      ],
      fees: "Permit application typically ~ MWK 5,000",
      processing: "Usually 3–5 working days depending on product and controls",
      notes: "Some goods are controlled; exporters should register with MITC for export certification and promotion."
    },
    {
      title: "Standards and Product Certification",
      authority: "Malawi Bureau of Standards (MBS)",
      eligibility: [
        "Manufacturers, importers, and exporters in regulated product categories"
      ],
      requirements: [
        "Application to MBS for certification",
        "Product samples for laboratory testing",
        "Factory audit where applicable",
        "Labeling and packaging review"
      ],
      fees: "Testing and certification fees vary by product (approx. MWK 30,000–300,000)",
      processing: "Typically 2–4 weeks depending on testing and audits",
      notes: "Mandatory certification applies to certain products prior to import or sale; certificates subject to surveillance."
    },
    {
      title: "Environmental and Health Permits",
      authority: "Malawi Environmental Protection Authority (MEPA) and Local Council Health Departments",
      eligibility: [
        "Activities with potential environmental or public health impact"
      ],
      requirements: [
        "EIA screening report or full EIA (as required)",
        "Health inspection report",
        "Waste management and pollution control plan"
      ],
      fees: "EIA screening ~ MWK 50,000; detailed EIA review ~ MWK 200,000–500,000 depending on project",
      processing: "Screening about 5 working days; full EIA up to 60 days",
      notes: "Environmental clearance must be obtained before construction or operation of significant projects."
    }
  ]
},
{
  code: "NA",
  name: "Namibia",
  flag: "🇳🇦",
  items: [
    {
      title: "Business Registration (BIPA)",
      authority: "Business and Intellectual Property Authority (BIPA)",
      eligibility: [
        "Individuals or entities establishing a business in Namibia",
        "Foreign investors requiring NIPDB investment approval"
      ],
      requirements: [
        "Application for name reservation",
        "Company registration forms (CM2/CM5)",
        "Memorandum and Articles of Association",
        "Certified IDs or passports of directors and shareholders",
        "Proof of address for registered office",
        "Tax registration (TIN) with Namibia Revenue Agency (NamRA)"
      ],
      fees: "Name reservation ~ NAD 50; Company registration ~ NAD 300–500; Certificate of Incorporation ~ NAD 100",
      processing: "Usually 3–7 working days through BIPA online or in person",
      notes: "Business names must be registered for sole proprietorships; company incorporation completed via BIPA portal."
    },
    {
      title: "Trade and Business Licence",
      authority: "Local Authorities (Municipal or Town Councils) under Ministry of Industrialisation and Trade",
      eligibility: [
        "Registered business intending to conduct commercial or retail trade",
        "Premises must comply with zoning and health regulations"
      ],
      requirements: [
        "Completed licence application form",
        "Company registration certificate",
        "Proof of premises (lease or title deed)",
        "Applicant ID or passport",
        "Fire and health clearance certificates",
        "Zoning/building plan approval"
      ],
      fees: "Licence fee range NAD 250–2,000 annually depending on local authority",
      processing: "Average 5–10 working days depending on inspections and council meetings",
      notes: "Licences must be renewed annually; operating without a licence may result in fines or closure."
    },
    {
      title: "Industrial Licence (Manufacturing / Industrial Activities)",
      authority: "Ministry of Industrialisation and Trade (MIT)",
      eligibility: [
        "Registered entities engaging in industrial or manufacturing operations"
      ],
      requirements: [
        "Industrial Licence application form",
        "Business registration certificate (from BIPA)",
        "Factory layout and process description",
        "Environmental clearance from Ministry of Environment, Forestry and Tourism (MEFT)",
        "Land ownership or lease agreement"
      ],
      fees: "Application NAD 500; Licence NAD 1,000; Annual renewal NAD 500",
      processing: "Typically 7–14 working days",
      notes: "Industrial licences are sector-specific; environmental clearance may be required prior to issuance."
    },
    {
      title: "Import and Export Permits",
      authority: "Ministry of Industrialisation and Trade (MIT) and Namibia Revenue Agency (NamRA)",
      eligibility: [
        "Registered Namibian entities with valid tax credentials",
        "Goods subject to control (agriculture, petroleum, chemicals, etc.)"
      ],
      requirements: [
        "Application for Import/Export Permit (MIT Form 46)",
        "Commercial invoice and product list",
        "Tax registration certificate",
        "Sectoral clearance for controlled goods (Veterinary, Mines, Energy, etc.)"
      ],
      fees: "Permit fees NAD 150–500 depending on goods and volume",
      processing: "Normally 3–5 working days",
      notes: "Exporters require certificates of origin for SADC/AfCFTA trade; importers must confirm goods control lists."
    },
    {
      title: "Standards and Product Certification",
      authority: "Namibia Standards Institution (NSI)",
      eligibility: [
        "Manufacturers, importers, and exporters of regulated products"
      ],
      requirements: [
        "Application for product certification",
        "Submission of product samples for testing",
        "Technical documentation and labeling review",
        "Factory audit where applicable"
      ],
      fees: "Varies by product and test requirements (approx. NAD 2,000–50,000)",
      processing: "Processing typically 2–6 weeks",
      notes: "Certification mandatory for certain product categories (e.g., food, building materials); NSI issues export quality certificates."
    },
    {
      title: "Environmental and Health Permits",
      authority: "Ministry of Environment, Forestry and Tourism (MEFT) and Local Health Authorities",
      eligibility: [
        "Projects or businesses with environmental or public health impacts"
      ],
      requirements: [
        "Environmental Impact Assessment (EIA)",
        "Health inspection report",
        "Waste management plan"
      ],
      fees: "EIA processing NAD 500–5,000 depending on project size",
      processing: "Screening about 5 days; full EIA 30–60 days",
      notes: "Businesses must secure environmental clearance certificates before construction or operations."
    }
  ]
},
{
  code: "ZM",
  name: "Zambia",
  flag: "🇿🇲",
  items: [
    {
      title: "Business Registration (PACRA / Name Reservation)",
      authority: "Patents and Companies Registration Agency (PACRA)",
      eligibility: [
        "Individuals or entities aged 18+ and of sound mind",
        "Foreign entities registering a branch or subsidiary in Zambia"
      ],
      requirements: [
        "Name clearance and reservation via PACRA",
        "Incorporation documents (Forms 2, 5, 11 etc.)",
        "Memorandum & Articles of Association",
        "IDs or passports for directors and shareholders",
        "Registered office address proof",
        "Declaration of compliance signed before Commissioner of Oaths"
      ],
      fees: "Name clearance ~ K83; Name reservation ~ K166; Incorporation fees depend on company type",
      processing: "3–7 working days if documents are complete and correct",
      notes: "Foreign companies must submit certified incorporation documents. PACRA handles both name reservation and company registration."
    },
    {
      title: "Trade / Business Licence",
      authority: "Local City / Municipal / District Councils",
      eligibility: [
        "Registered entity conducting trade or services",
        "Premises meeting health, safety and zoning requirements"
      ],
      requirements: [
        "Completed council licence application form",
        "Company registration or business name certificate",
        "Proof of premises (lease or title deed)",
        "Director or owner ID documents",
        "Health, fire, and environmental clearance reports"
      ],
      fees: "Varies by council and business class; typically annual fees apply",
      processing: "5–10 working days depending on inspections and committee schedules",
      notes: "Renew annually; non-compliance may lead to fines or suspension."
    },
    {
      title: "Industrial / Manufacturing Licence",
      authority: "Ministry of Commerce, Trade & Industry",
      eligibility: [
        "Registered company intending to manufacture or engage in industrial production",
        "Compliance with industrial regulations"
      ],
      requirements: [
        "Industrial licence application",
        "Company registration documents",
        "Factory layout and production plan",
        "Environmental approval or EIA (ZEMA)",
        "Land or lease documentation"
      ],
      fees: "Fees vary by sector and project scale per ministry schedule",
      processing: "7–14 working days once documents are complete",
      notes: "Certain manufacturing sectors require additional certification (e.g., food, chemicals). Incentives exist under Multi-Facility Economic Zones."
    },
    {
      title: "Import & Export Permits",
      authority: "Ministry of Commerce, Trade & Industry and Zambia Revenue Authority (ZRA)",
      eligibility: [
        "Registered business with valid tax credentials",
        "Goods subject to import/export controls (agriculture, chemicals, pharmaceuticals)"
      ],
      requirements: [
        "Completed permit application",
        "Commercial invoices and product list with HS codes",
        "Tax compliance documentation",
        "Sectoral clearances for controlled goods"
      ],
      fees: "Varies depending on product type and quantity",
      processing: "3–5 working days subject to inspection requirements",
      notes: "Certificates of origin required for exports (SADC/AfCFTA). Controlled goods subject to additional regulations."
    },
    {
      title: "Standards & Product Certification",
      authority: "Zambia Bureau of Standards (ZABS) / Zambia Compulsory Standards Agency (ZCSA)",
      eligibility: [
        "Manufacturers, importers, and exporters handling regulated or compulsory standard products"
      ],
      requirements: [
        "Application for standard or product certification",
        "Submission of product samples for testing",
        "Technical documentation and labeling compliance",
        "Factory audits where applicable"
      ],
      fees: "Testing and certification fees vary by product and scheme",
      processing: "2–6 weeks depending on testing and inspection complexity",
      notes: "ZCSA enforces compulsory standards for categories such as food, electrical, and building materials; certificates require periodic renewal."
    },
    {
      title: "Environmental & Health Permits",
      authority: "Zambia Environmental Management Agency (ZEMA) and Local Health Authorities",
      eligibility: [
        "Projects or businesses with potential environmental, health, or ecological impacts"
      ],
      requirements: [
        "EIA screening or full EIA under Environmental Management Licensing Regulations",
        "Health inspection report",
        "Waste management and pollution control plan"
      ],
      fees: "EIA fees depend on project size as prescribed by ZEMA",
      processing: "Screening within a few days; full EIA up to 60 days or more",
      notes: "Licences for pesticides or hazardous substances fall under ZEMA; failure to comply may result in penalties or permit withdrawal."
    }
  ]
},
{
  code: "ZW",
  name: "Zimbabwe",
  flag: "🇿🇼",
  items: [
    {
      title: "Business Registration (Companies and Other Business Entities Act)",
      authority: "Deeds, Companies and Intellectual Property (DCIP) Office",
      eligibility: [
        "Individuals or entities aged 18+",
        "Foreign investors complying with investment and indigenisation rules"
      ],
      requirements: [
        "Name reservation via the Companies Registry (CR6)",
        "Company registration documents (Memorandum & Articles, CR5, CR14)",
        "Directors and shareholders identification",
        "Registered office address",
        "Tax registration (ZIMRA) and NSSA registration where applicable"
      ],
      fees: "Name reservation ~ USD 5; Company registration ~ USD 100–150 depending on entity type",
      processing: "5–10 working days via the e-Registry portal",
      notes: "Foreign-owned entities should also register with the Zimbabwe Investment and Development Agency (ZIDA)."
    },
    {
      title: "Trade Licence (Local Authority / Shop Licence)",
      authority: "Municipal, City, or Rural District Councils under the Shop Licences Act (Chapter 14:17)",
      eligibility: [
        "Registered business operating from fixed premises",
        "Premises meeting public health, building, and fire safety rules"
      ],
      requirements: [
        "Completed local authority application form",
        "Proof of business registration (e.g., CR14, CR6)",
        "Proof of premises ownership or lease",
        "Health inspection and fire safety certificates",
        "Proof of tax registration (ZIMRA)"
      ],
      fees: "Varies by council and trade type; typical range USD 50–200 per year",
      processing: "5–7 working days after inspection and fee payment",
      notes: "Licences are renewed annually; inspections by health and fire departments are mandatory prior to renewal."
    },
    {
      title: "Manufacturing / Industrial Licence",
      authority: "Ministry of Industry and Commerce",
      eligibility: [
        "Registered entities engaged in manufacturing or industrial production",
        "Compliance with environmental and labour standards"
      ],
      requirements: [
        "Industrial licence application",
        "Certificate of Incorporation and tax clearance",
        "Factory plan and process flow description",
        "Environmental Impact Assessment (EIA) approval from EMA",
        "Local authority health and safety compliance certificates"
      ],
      fees: "Depends on scale of operation (average USD 100–500 for initial licensing)",
      processing: "7–14 working days depending on inspections",
      notes: "Sectors like food, pharmaceuticals, or petroleum require additional line ministry approvals."
    },
    {
      title: "Import and Export Permits",
      authority: "Ministry of Industry and Commerce and Zimbabwe Revenue Authority (ZIMRA)",
      eligibility: [
        "Registered businesses with valid ZIMRA Tax Clearance",
        "Goods subject to import/export controls (agriculture, fuel, pharmaceuticals)"
      ],
      requirements: [
        "Completed import/export application form",
        "Commercial invoices and product list with HS codes",
        "Tax clearance certificate",
        "Sectoral clearance (e.g., Agriculture, Health, or Energy)"
      ],
      fees: "Permit application ~ USD 50–150 depending on goods",
      processing: "3–5 working days subject to inspection and document verification",
      notes: "Exporters require certificates of origin for COMESA/SADC trade. Controlled goods require prior import/export licence."
    },
    {
      title: "Standards and Product Certification",
      authority: "Standards Association of Zimbabwe (SAZ)",
      eligibility: [
        "Manufacturers, importers, and exporters dealing with regulated or certified products"
      ],
      requirements: [
        "Application for product certification or standards mark",
        "Product samples for testing and quality evaluation",
        "Factory audit and process verification",
        "Labeling and packaging compliance review"
      ],
      fees: "Testing and certification costs vary by product and scope (USD 100–1,000 typical)",
      processing: "3–6 weeks depending on laboratory analysis and audit scheduling",
      notes: "SAZ certification ensures compliance with national and international standards; required for many export categories."
    },
    {
      title: "Environmental and Health Permits",
      authority: "Environmental Management Agency (EMA) and Local Authority Health Departments",
      eligibility: [
        "Projects with potential environmental or public health impact",
        "Food handling, manufacturing, and waste management activities"
      ],
      requirements: [
        "EIA or project brief submission",
        "Health inspection and sanitation certificates",
        "Waste management and pollution control plan"
      ],
      fees: "EIA fees determined by project size (USD 100–1,000 typical)",
      processing: "EIA screening within 5 days; detailed assessment up to 60 days",
      notes: "Environmental clearance certificate (ECC) from EMA is mandatory before major construction or operation begins."
    }
  ]
},
];