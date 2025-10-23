'use client';

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info, MapPin, FileText, Search, ShieldAlert, Globe2, GitBranch, Package, AlertTriangle } from "lucide-react";

// NEW: data for Potential + Procedures
import { fetchPotential, type PotentialRow } from "@/data/exportPotential";
import { procedures, countryGuides } from "@/data/procedures";

// ---------- Types ----------
type AgreementKind = "regional" | "bilateral";
type ImplementationStatus =
  | "in force"
  | "provisionally applied"
  | "signed"
  | "ratified"
  | "under negotiation"
  | "not in force";

type GoodsCategory = { id: string; label: string; note?: string; details?: string; };
type SensitiveItem = { id: string; label: string; reason?: string; details?: string; };

type Agreement = {
  id: string;
  name: string;
  kind: AgreementKind;
  status: ImplementationStatus;
  yearOfSigning: number | null;
  parties: string[];
  source: string;
  coverage: { categories: GoodsCategory[]; sensitive: SensitiveItem[]; };
};

type Country = { code: string; name: string };
// ---- HS schedule (SACU) helpers ----
type HSRow = {
  hs6: string;
  description: string;
  fromDuty: string;
  toDuty: string;
  conditions?: string;
  roo?: string;
  sources?: string[];
};

function pairKey(fromName: string, toName: string) {
  return `${codeOf(fromName)}-${codeOf(toName)}`; // e.g., BW-NA
}

// ---------- Countries ----------
const COUNTRIES: Country[] = [
  { code: "BW", name: "Botswana" },
  { code: "MW", name: "Malawi" },
  { code: "NA", name: "Namibia" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" },
];

// ---------- Sample agreements (replace with real data before launch) ----------
const AGREEMENTS: Record<string, Agreement> = {
    SADC_FTA: {
    id: "SADC_FTA",
    name: "SADC Free Trade Area",
    kind: "regional",
    status: "in force",
    yearOfSigning: 1996, // SADC Protocol on Trade (goods). FTA launched later.
    parties: ["SADC Member States"],
    // Tip: put an official link here when you’re ready, e.g. SADC Protocol on Trade PDF
    source: "TBD",
    coverage: {
      categories: [
        {
          id: "industrial_goods",
          label: "Industrial goods (HS 25–97, ex. some chapters)",
          note:
            "Most industrial tariff lines among SADC FTA participants are scheduled to zero; exact timing/coverage depends on each member’s tariff offer.",
          details:
            "Intra-SADC trade in manufactures is largely duty-free where both parties have implemented the FTA and list the HS lines as liberalised. Check tariff schedules and any remaining phase-downs. Rules of Origin: use SADC Product-Specific Rules (PSRs) and cumulation within SADC. Non-tariff: TBT conformity and customs documentation still apply."
        },
        {
          id: "agri_goods",
          label: "Agricultural goods (HS 01–24)",
          note:
            "A significant share of agri lines are liberalised, with some lines phased or excluded by individual members.",
          details:
            "Tariff preferences apply per national schedules. SPS (sanitary/phytosanitary) requirements continue to apply (permits, health certificates, inspections). Verify: national tariff offer, SPS permits, and any quantitative restrictions."
        },
        {
          id: "roocum",
          label: "Rules of origin & cumulation",
          details:
            "Preferential access requires meeting SADC Rules of Origin (general + PSRs). Cumulation generally allowed for inputs sourced in SADC. Keep supplier declarations, BOM, and processing records for verification."
        },
        {
          id: "trade_facilitation",
          label: "Trade facilitation & docs",
          details:
            "Typical docs: Commercial Invoice, Packing List, SADC Certificate of Origin, transport docs, permits where applicable (SPS/TBT). Check national single-window/customs portals for current process."
        }
      ],
      sensitive: [
        {
          id: "member_sensitive_lines",
          label: "Member-specific sensitive tariff lines",
            reason:
              "Each member may list sensitive HS lines with slower phase-down or exclusions.",
            details:
              "Examples vary by country and period (e.g., some meat, dairy, certain processed foods, selected textiles). Always confirm in the exporting and importing country schedules for the exact HS code before shipment."
        },
        {
          id: "safeguards_qr",
          label: "Safeguards / quotas (where notified)",
          reason:
            "Temporary protective measures can be applied under the Protocol within WTO-consistent rules.",
          details:
            "If a safeguard/TRQ is in force, duties/quantities may differ from the base preference. Verify current notices with the importing authority."
        }
      ]
    }
  },
  AFCFTA: {
    id: "AFCFTA",
    name: "African Continental Free Trade Area",
    kind: "regional",
    status: "provisionally applied",
    yearOfSigning: 2018,
    parties: ["African Union States"],
    source: "TBD",
    coverage: {
      categories: [
        { id: "manufactures", label: "Manufactures", details: "Tariff cuts by country groupings. ROO vary by HS." },
        { id: "processed_foods", label: "Processed foods", details: "Phased liberalisation; SPS/TBT apply." },
      ],
      sensitive: [
        { id: "autos", label: "Automotive", reason: "Frequently excluded/long phase", details: "Check national offers and ROO annex." },
      ],
    },
  },
  SACU: {
  id: "SACU",
  name: "Southern African Customs Union",
  kind: "regional",
  status: "in force",
  yearOfSigning: 2002, // modern agreement signed 2002 (legacy union from 1910; 1969 agreement replaced)
  parties: ["Botswana", "Namibia", "South Africa", "Lesotho", "Eswatini"],
  // NEW: use multiple sources
  source: "TBD", // TODO: replace with official SACU Agreement URL or a canonical source
  coverage: {
    categories: [
      {
        id: "intra_union",
        label: "Intra-SACU trade (duty-free circulation)",
        details:
          "Goods in free circulation within SACU move duty-free between members. Standard customs clearance still applies (declaration, valuation, SPS/TBT where applicable)."
      },
      {
        id: "cet",
        label: "Common External Tariff (CET)",
        details:
          "A single external tariff applies to extra-SACU imports. Internal movements are duty-free once goods enter SACU and are in free circulation."
      },
      {
        id: "origin_and_procedures",
        label: "Origin & procedures",
        details:
          "For goods produced within SACU, typical proof is commercial documentation plus customs declaration—no preference certificate like SADC Form A is needed for **internal** SACU trade. For goods first imported into SACU from outside, ensure they are in **free circulation** before re-export within SACU."
      }
    ],
    sensitive: []
  }
},
  COMESA_FTA: {
    id: "COMESA_FTA",
    name: "COMESA Free Trade Area",
    kind: "regional",
    status: "in force",
    yearOfSigning: 1994,
    parties: ["COMESA Member States"],
    source: "TBD",
    coverage: {
      categories: [{ id: "goods", label: "Goods", details: "Tariff preferences among FTA participants; implementation varies by member." }],
      sensitive: [],
    },
  },
  SADC_EU_EPA: {
    id: "SADC_EU_EPA",
    name: "EU – SADC Economic Partnership Agreement",
    kind: "regional",
    status: "in force",
    yearOfSigning: 2016,
    parties: ["Botswana", "Namibia", "South Africa", "Lesotho", "Eswatini", "Mozambique", "European Union"],
    source: "TBD",
    coverage: {
      categories: [{ id: "dfqf", label: "DFQF access (most goods)", details: "Asymmetric liberalisation with safeguards; ROO by HS." }],
      sensitive: [{ id: "sugar_trq", label: "Sugar quotas", reason: "TRQs/safeguards may apply", details: "Check EPA schedules and TRQ admin." }],
    },
  },
  ESA_EU_iEPA: {
    id: "ESA_EU_iEPA",
    name: "EU – Eastern & Southern Africa interim EPA",
    kind: "regional",
    status: "in force",
    yearOfSigning: 2009,
    parties: ["Zimbabwe", "Mauritius", "Madagascar", "Seychelles", "Comoros", "European Union"],
    source: "TBD",
    coverage: {
      categories: [{ id: "market_access", label: "Market access to EU", details: "Duty-free or reduced tariffs for many lines; check schedules." }],
      sensitive: [],
    },
  },
  BWA_ZWE_BILAT: {
    id: "BWA_ZWE_BILAT",
    name: "Botswana – Zimbabwe Bilateral Trade Agreement",
    kind: "bilateral",
    status: "in force",
    yearOfSigning: 1988, // placeholder, verify
    parties: ["Botswana", "Zimbabwe"],
    source: "TBD",
    coverage: {
      categories: [{ id: "preferential_goods", label: "Preferential goods", details: "Reduced/zero tariffs for listed HS lines; check ROO." }],
      sensitive: [{ id: "textiles", label: "Certain textiles", reason: "Possible exclusions/quotas", details: "Consult annexes." }],
    },
  },
};

// ---------- Memberships / Bilaterals ----------
const MEMBERSHIPS: Record<string, string[]> = {
  Botswana: ["SADC_FTA", "SACU", "AFCFTA", "SADC_EU_EPA"],
  Malawi: ["SADC_FTA", "COMESA_FTA", "AFCFTA"],
  Namibia: ["SADC_FTA", "SACU", "AFCFTA", "SADC_EU_EPA"],
  Zambia: ["SADC_FTA", "COMESA_FTA", "AFCFTA"],
  Zimbabwe: ["SADC_FTA", "COMESA_FTA", "AFCFTA", "ESA_EU_iEPA"],
};

const BILATS: Record<string, string[]> = {
  "BW|ZW": ["BWA_ZWE_BILAT"],
};

// ---------- Helpers ----------
function codeOf(name: string) {
  const found = COUNTRIES.find((c) => c.name === name);
  return found ? found.code : name.slice(0, 2).toUpperCase();
}

function getAgreementsForPair(exportFromName: string, exportToName: string) {
  const regionals = new Set([
    ...(MEMBERSHIPS[exportFromName] || []),
    ...(MEMBERSHIPS[exportToName] || []),
  ]);

  const applicableRegional = Array.from(regionals)
    .map((id) => AGREEMENTS[id])
    .filter(Boolean)
    .filter((a) => {
      if (!a) return false;
      if (a.id === "AFCFTA") return true; // broad default; refine with national offers when available
      const fromHas = (MEMBERSHIPS[exportFromName] || []).includes(a.id);
      const toHas = (MEMBERSHIPS[exportToName] || []).includes(a.id);
      return fromHas && toHas;
    });

  const key = `${codeOf(exportFromName)}|${codeOf(exportToName)}`;
  const rkey = `${codeOf(exportToName)}|${codeOf(exportFromName)}`;
  const bilateralIds = BILATS[key] || BILATS[rkey] || [];
  const bilaterals = bilateralIds.map((id) => AGREEMENTS[id]).filter(Boolean) as Agreement[];

  return { regionals: applicableRegional as Agreement[], bilaterals };
}

function statusVariant(s: string) {
  switch (s) {
    case "in force":
      return "default";
    case "provisionally applied":
    case "ratified":
      return "secondary";
    case "signed":
      return "outline";
    case "under negotiation":
    case "not in force":
    default:
      return "destructive";
  }
}

// ---------- UI ----------
function AgreementCard({ a }: { a: Agreement }) {
  return (
    <Card className="rounded-2xl shadow-sm border border-neutral-200">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2">
          {a.kind === "regional" ? <Globe2 className="h-4 w-4" /> : <GitBranch className="h-4 w-4" />}
          <CardTitle className="text-lg">{a.name}</CardTitle>
        </div>
        <CardDescription className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{a.kind}</Badge>
          <Badge className="capitalize" variant={statusVariant(a.status)}>{a.status}</Badge>
          <Badge variant="outline">Signed: {a.yearOfSigning ?? "TBD"}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-neutral-700">Parties: {a.parties.join(", ")}</div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2"><Package className="h-4 w-4" /> Goods coverage</h4>
            <div className="flex flex-wrap gap-2">
              {a.coverage.categories.map((cat) => (
                <Sheet key={cat.id}>
                  <SheetTrigger asChild>
                    <Button size="sm" variant="outline">{cat.label}</Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:max-w-xl">
                    <SheetHeader>
                      <SheetTitle>{a.name}: {cat.label}</SheetTitle>
                    </SheetHeader>
                    <ScrollArea className="h-[75vh] pr-4 mt-4">
                      <p className="text-sm whitespace-pre-line">{cat.details || "Details coming soon."}</p>
                      {cat.note && <p className="text-xs text-neutral-500 mt-4">Note: {cat.note}</p>}
                    </ScrollArea>
                  </SheetContent>
                </Sheet>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2"><ShieldAlert className="h-4 w-4" /> Sensitive products</h4>
            {a.coverage.sensitive.length === 0 && (
              <p className="text-sm text-neutral-600">None listed. Confirm with schedules.</p>
            )}
            <div className="flex flex-wrap gap-2">
              {a.coverage.sensitive.map((sp) => (
                <Sheet key={sp.id}>
                  <SheetTrigger asChild>
                    <Button size="sm" variant="secondary">{sp.label}</Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:max-w-xl">
                    <SheetHeader>
                      <SheetTitle>{a.name}: {sp.label}</SheetTitle>
                    </SheetHeader>
                    <ScrollArea className="h-[75vh] pr-4 mt-4">
                      <div className="space-y-3">
                        {sp.reason && <p className="text-sm"><span className="font-medium">Reason:</span> {sp.reason}</p>}
                        <p className="text-sm whitespace-pre-line">{sp.details || "Details coming soon."}</p>
                      </div>
                    </ScrollArea>
                  </SheetContent>
                </Sheet>
              ))}
            </div>
          </div>
        </div>

        {a.source && a.source !== "TBD" && (
          <div className="mt-3 text-xs text-neutral-500 flex items-center gap-2"><FileText className="h-3 w-3" /> Source: <a className="underline" href={a.source} target="_blank" rel="noreferrer">Open</a></div>
        )}
      </CardContent>
    </Card>
  );
}

export default function ExportLookupTool() {
  const [from, setFrom] = useState<string>("Botswana");
  const [to, setTo] = useState<string>("Namibia");
  const [query, setQuery] = useState<string>("");

  const { regionals, bilaterals } = useMemo(() => getAgreementsForPair(from, to), [from, to]);
  const all = useMemo<Agreement[]>(() => [...bilaterals, ...regionals], [bilaterals, regionals]);

  const filtered = useMemo(() => {
    if (!query.trim()) return all;
    const q = query.toLowerCase();
    return all.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.parties.join(", ").toLowerCase().includes(q) ||
        a.coverage.categories.some((c) => c.label.toLowerCase().includes(q)) ||
        a.coverage.sensitive.some((s) => s.label.toLowerCase().includes(q))
    );
  }, [all, query]);

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Export</h1>
        <p className="text-neutral-600 mt-1">Look up cross-border trade agreements, implementation status, goods coverage, and export potential.</p>
      </div>

      <Card className="mb-6 rounded-2xl">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <Label className="mb-2 block">Export from</Label>
              <Select value={from} onValueChange={setFrom}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Select country" /></SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Countries</SelectLabel>
                    {COUNTRIES.map((c) => (
                      <SelectItem key={c.code} value={c.name}>{c.name}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block">Export to</Label>
              <Select value={to} onValueChange={setTo}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Select country" /></SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Countries</SelectLabel>
                    {COUNTRIES.map((c) => (
                      <SelectItem key={c.code} value={c.name}>{c.name}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="md:pt-6">
              <div className="flex items-center gap-2">
                <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search agreements, parties, goods" />
                <Button variant="secondary"><Search className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>

          <div className="mt-3 text-xs text-neutral-600 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> Pair:</span>
            <Badge variant="outline">{from}</Badge>
            <span>to</span>
            <Badge variant="outline">{to}</Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="agreements">
        <TabsList className="grid grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="agreements">Agreements</TabsTrigger>
          <TabsTrigger value="goods">Goods coverage</TabsTrigger>
          <TabsTrigger value="sensitive">Sensitive products</TabsTrigger>
          <TabsTrigger value="potential">Potential</TabsTrigger> {/* NEW */}
        </TabsList>

        <TabsContent value="agreements" className="mt-6">
  <div className="grid gap-4">
    {filtered.length === 0 && (
      <EmptyState title="No agreements found for this pair" subtitle="Try another pair or clear your search." />
    )}
    {filtered.map((a) => <AgreementCard key={a.id} a={a} />)}
  </div>

  {/* HS schedule panel (SACU examples / your JSON) */}
  <div className="mt-6">
    <HSPanel from={from} to={to} />
  </div>
</TabsContent>

        <TabsContent value="goods" className="mt-6">
          <Accordion type="single" collapsible className="w-full">
            {filtered.map((a) => (
              <AccordionItem key={a.id} value={a.id}>
                <AccordionTrigger><div className="flex items-center gap-2"><Package className="h-4 w-4" /> {a.name}</div></AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-2">
                    {a.coverage.categories.map((cat) => (
                      <Sheet key={cat.id}>
                        <SheetTrigger asChild><Button size="sm" variant="outline">{cat.label}</Button></SheetTrigger>
                        <SheetContent side="right" className="w-full sm:max-w-xl">
                          <SheetHeader><SheetTitle>{a.name}: {cat.label}</SheetTitle></SheetHeader>
                          <ScrollArea className="h-[75vh] pr-4 mt-4"><p className="text-sm whitespace-pre-line">{cat.details || "Details coming soon."}</p></ScrollArea>
                        </SheetContent>
                      </Sheet>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="sensitive" className="mt-6">
          <Accordion type="single" collapsible className="w-full">
            {filtered.map((a) => (
              <AccordionItem key={a.id} value={a.id}>
                <AccordionTrigger><div className="flex items-center gap-2"><AlertTriangle className="h-4 w-4" /> {a.name}</div></AccordionTrigger>
                <AccordionContent>
                  {a.coverage.sensitive.length === 0 && <p className="text-sm text-neutral-600">No sensitive products listed. Confirm with official schedules.</p>}
                  <div className="flex flex-wrap gap-2">
                    {a.coverage.sensitive.map((sp) => (
                      <Sheet key={sp.id}>
                        <SheetTrigger asChild><Button size="sm" variant="secondary">{sp.label}</Button></SheetTrigger>
                        <SheetContent side="right" className="w-full sm:max-w-xl">
                          <SheetHeader><SheetTitle>{a.name}: {sp.label}</SheetTitle></SheetHeader>
                          <ScrollArea className="h-[75vh] pr-4 mt-4">
                            <div className="space-y-3">
                              {sp.reason && <p className="text-sm"><span className="font-medium">Reason:</span> {sp.reason}</p>}
                              <p className="text-sm whitespace-pre-line">{sp.details || "Details coming soon."}</p>
                            </div>
                          </ScrollArea>
                        </SheetContent>
                      </Sheet>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        {/* NEW: Export Potential */}
        <TabsContent value="potential" className="mt-6">
          <PotentialPanel />
        </TabsContent>
      </Tabs>

      {/* NEW: Licences & Forms */}
      <Card className="mt-8 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">Licences & Forms</CardTitle>
          <CardDescription>Application procedures and official forms by country.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-3">
            <div>
              <Label className="mb-2 block">Country</Label>
              <Select value={from} onValueChange={setFrom}>
                <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((c) => (
                    <SelectItem key={c.code} value={c.name}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <LicencesForms countryName={from} />
        </CardContent>
      </Card>

      <Card className="mt-8 bg-neutral-50 border-dashed">
        <CardHeader>
          <CardTitle className="text-lg">Implementation tips</CardTitle>
          <CardDescription>How to wire this page to live data</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 text-sm space-y-2 text-neutral-700">
            <li>Replace the sample AGREEMENTS/MEMBERSHIPS with your dataset (same shape).</li>
            <li>When you have national offers/HS schedules, refine <code>getAgreementsForPair</code> to filter per pair.</li>
            <li>Fill <code>source</code> with official links for auditability.</li>
            <li>Connect the Potential tab to the ITC EPM API via <code>/api/itc</code> once you have credentials.</li>
            <li>Add real PDFs under <code>public/docs/{`<ISO2>`}</code> so download buttons work.</li>
          </ul>
          <div className="mt-4 text-xs text-neutral-500 flex items-start gap-2">
            <Info className="h-4 w-4 mt-0.5" />
            <span>Years/statuses marked as placeholders should be verified before go-live.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function EmptyState({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="border rounded-2xl p-8 text-center text-neutral-600">
      <p className="font-medium">{title}</p>
      <p className="text-sm mt-1">{subtitle}</p>
    </div>
  );
}

/* =========================
   NEW helpers & panels
   ========================= */

function Num({ n }: { n: number }) {
  return <span>{n.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>;
}

function SimpleTable({ rows }: { rows: PotentialRow[] }) {
  if (!rows.length) return <p className="text-sm text-neutral-600">No data yet.</p>;
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-neutral-50 text-left">
          <tr>
            <th className="p-3">Code</th>
            <th className="p-3">Label</th>
            <th className="p-3">Potential (USD)</th>
            <th className="p-3">Current</th>
            <th className="p-3">Gap</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t">
              <td className="p-3">{r.code}</td>
              <td className="p-3">{r.label}</td>
              <td className="p-3"><Num n={r.potentialUSD} /></td>
              <td className="p-3">{r.currentUSD ? <Num n={r.currentUSD} /> : "-"}</td>
              <td className="p-3">{r.gapUSD ? <Num n={r.gapUSD} /> : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PotentialPanel() {
  const [mode, setMode] = useState<"country"|"product"|"market">("country");
  const [iso2, setIso2] = useState<string>("BW");
  const [rows, setRows] = useState<PotentialRow[]>([]);

  useEffect(() => {
    fetchPotential(mode, iso2 as any).then(setRows).catch(() => setRows([]));
  }, [mode, iso2]);

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg">Export Potential</CardTitle>
        <CardDescription>
          Source: ITC Export Potential Map. (Mock data shown — connect API later via <code>/api/itc</code>.)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <Label className="mb-2 block">View</Label>
            <Select value={mode} onValueChange={(v) => setMode(v as any)}>
              <SelectTrigger><SelectValue placeholder="Country / Product / Market" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="country">By Country (top products)</SelectItem>
                <SelectItem value="product">By Product (potential)</SelectItem>
                <SelectItem value="market">By Market (destinations)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-2 block">Country</Label>
            <Select value={iso2} onValueChange={setIso2}>
              <SelectTrigger><SelectValue placeholder="Country" /></SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((c) => (
                  <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <SimpleTable rows={rows} />
      </CardContent>
    </Card>
  );
}
function HSPanel({ from, to }: { from: string; to: string }) {
  const [rows, setRows] = useState<HSRow[] | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const key = pairKey(from, to);
    setRows(null);
    setMissing(false);

    // We serve JSON from /public/hs/sacu/<PAIR>.json (no import needed)
    fetch(`/hs/sacu/${key}.json`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && Array.isArray(data)) setRows(data as HSRow[]);
        else setMissing(true);
      })
      .catch(() => setMissing(true));
  }, [from, to]);

  if (missing) {
    // No file found for this pair — show a gentle hint in dev
    return (
      <Card className="rounded-2xl border-dashed">
        <CardHeader>
          <CardTitle className="text-base">HS schedule (beta) — {codeOf(from)} → {codeOf(to)}</CardTitle>
          <CardDescription>No HS rows found yet for this pair. Add a JSON file at <code>public/hs/sacu/{pairKey(from,to)}.json</code>.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!rows) return null; // still loading or not applicable

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-base">HS schedule (beta) — {codeOf(from)} → {codeOf(to)}</CardTitle>
        <CardDescription>Illustrative SACU examples. Replace with your real HS6 data.</CardDescription>
      </CardHeader>
      <CardContent>
        {rows.length === 0 ? (
          <p className="text-sm text-neutral-600">No HS entries yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-left">
                <tr>
                  <th className="p-3">HS6</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">From Duty</th>
                  <th className="p-3">To Duty</th>
                  <th className="p-3">Conditions</th>
                  <th className="p-3">ROO / Notes</th>
                  <th className="p-3">Sources</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-t align-top">
                    <td className="p-3 whitespace-nowrap">{r.hs6}</td>
                    <td className="p-3">{r.description}</td>
                    <td className="p-3 whitespace-nowrap">{r.fromDuty}</td>
                    <td className="p-3 whitespace-nowrap">{r.toDuty}</td>
                    <td className="p-3">{r.conditions || "-"}</td>
                    <td className="p-3">{r.roo || "-"}</td>
                    <td className="p-3">
                      {r.sources?.length
                        ? r.sources.map((s, j) => (
                            <div key={j}>
                              <a className="underline" href={s} target="_blank" rel="noreferrer">
                                {s}
                              </a>
                            </div>
                          ))
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
function iso2FromName(name: string) {
  return (COUNTRIES.find(c => c.name === name)?.code || "BW") as "BW"|"MW"|"NA"|"ZM"|"ZW";
}

function Section({ title, list }: { title: string; list: any[] }) {
  if (!list?.length) return <p className="text-sm text-neutral-600">No entries yet.</p>;
  return (
    <div className="space-y-3">
      {list.map((p, i) => (
        <div key={i} className="rounded-xl border p-4">
          <div className="font-medium">{p.title}</div>
          <div className="text-sm text-neutral-700">Authority: {p.authority}</div>
          {p.link && <a href={p.link} target="_blank" className="text-sm underline mt-1 inline-block">Guidance</a>}
          <div className="mt-2">
            <div className="text-sm font-semibold">Steps</div>
            <ul className="list-disc list-inside text-sm">
              {p.steps.map((s: string, idx: number) => <li key={idx}>{s}</li>)}
            </ul>
          </div>
          {p.forms?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {p.forms.map((f: any, j: number) => (
                <a key={j} className="text-sm rounded-full border px-3 py-1 hover:bg-neutral-50" href={f.href} download>
                  {f.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function CountryGuideSheet({ iso2 }: { iso2: "BW"|"MW"|"NA"|"ZM"|"ZW" }) {
  const g = countryGuides[iso2];
  if (!g) return null;

  return (
    <SheetContent side="right" className="w-full sm:max-w-2xl">
      <SheetHeader>
        <SheetTitle>Country guide — {COUNTRIES.find(c => c.code === iso2)?.name}</SheetTitle>
      </SheetHeader>

      <ScrollArea className="h-[75vh] pr-4 mt-4">
        <div className="space-y-6 text-sm">
          <div>
            <div className="font-semibold mb-1">Overview</div>
            <p className="text-neutral-700">{g.overview}</p>
          </div>

          <div>
            <div className="font-semibold mb-1">Step-by-step</div>
            <ol className="list-decimal list-inside space-y-1">
              {g.steps.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
          </div>

          <div>
            <div className="font-semibold mb-1">Key authorities</div>
            <ul className="list-disc list-inside">
              {g.agencies.map((a, i) => (
                <li key={i}>
                  <span className="font-medium">{a.name}</span> — {a.role}
                  {a.url && <> — <a href={a.url} className="underline" target="_blank" rel="noreferrer">website</a></>}
                </li>
              ))}
            </ul>
          </div>

          {g.summary?.rows?.length ? (
            <div>
              <div className="font-semibold mb-2">Quick summary</div>
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full text-sm">
                  <thead className="bg-neutral-50 text-left">
                    <tr>
                      <th className="p-3">Step</th>
                      <th className="p-3">Authority</th>
                      <th className="p-3">Form / System</th>
                    </tr>
                  </thead>
                  <tbody>
                    {g.summary.rows.map((r, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-3">{r.step}</td>
                        <td className="p-3">{r.authority}</td>
                        <td className="p-3">{r.formOrSystem}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          {g.links?.length ? (
            <div>
              <div className="font-semibold mb-1">Useful links</div>
              <ul className="list-disc list-inside">
                {g.links.map((l, i) => (
                  <li key={i}><a className="underline" href={l.href} target="_blank" rel="noreferrer">{l.label}</a></li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </ScrollArea>
    </SheetContent>
  );
}

function LicencesForms({ countryName }: { countryName: string }) {
  const iso2 = iso2FromName(countryName);
  const cfg = procedures[iso2];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h4 className="font-semibold mb-2">Import procedures & forms</h4>
          <Section title="Import" list={cfg?.import || []} />
        </div>
        <div>
          <h4 className="font-semibold mb-2">Export procedures & forms</h4>
          <Section title="Export" list={cfg?.export || []} />
        </div>
      </div>

      <div className="pt-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">View full country guide</Button>
          </SheetTrigger>
          <CountryGuideSheet iso2={iso2} />
        </Sheet>
      </div>
    </div>
  );
}