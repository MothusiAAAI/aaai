"use client";
import { useMemo, useState } from "react";
import type { Country } from "../../data/countries";
import { countries } from "../../data/countries";

function validateCountries(data: Country[]) {
  const errors: string[] = [];
  const codes = new Set<string>();
  data.forEach((c, ci) => {
    if (!c.code || !c.name || !c.flag) errors.push(`Country[${ci}] missing code/name/flag`);
    if (codes.has(c.code)) errors.push(`Duplicate code ${c.code}`);
    codes.add(c.code);
    if (!Array.isArray(c.items)) errors.push(`${c.code}: items must be an array`);
    c.items.forEach((it, ii) => {
      const path = `${c.code}.items[${ii}]`;
      ["title", "authority", "fees", "processing"].forEach((k) => {
        const v = (it as any)[k];
        if (!v || typeof v !== "string") errors.push(`${path}: missing string ${k}`);
      });
      ["eligibility", "requirements"].forEach((k) => {
        const v = (it as any)[k];
        if (!Array.isArray(v)) errors.push(`${path}: ${k} must be an array`);
      });
    });
  });
  return errors;
}

export default function CompliancePage() {
  const [active, setActive] = useState<string>(countries[0]?.code ?? "BW");
  const errors = useMemo(() => validateCountries(countries), []);
  const activeCountry = useMemo(
    () => countries.find((c) => c.code === active) || countries[0],
    [active]
  );

  return (
    <section className="bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold">Compliance guide</h1>
        <p className="text-neutral-700 mt-2">
          Select a country to view key licences and permits, with eligibility, requirements, fees, and processing times.
        </p>

        {errors.length > 0 && (
          <div className="mt-4 p-3 rounded-lg border border-red-300 bg-red-50 text-sm text-red-800">
            <div className="font-semibold">Data warnings</div>
            <ul className="list-disc list-inside">
              {errors.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {countries.map((c) => (
            <button
              key={c.code}
              onClick={() => setActive(c.code)}
              className={`px-4 py-2 rounded-full border flex items-center gap-2 ${
                active === c.code
                  ? "bg-black text-white border-black"
                  : "hover:bg-white"
              }`}
            >
              <span className="text-lg" aria-hidden>
                {c.flag}
              </span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border bg-white p-6">
          <div className="text-lg font-semibold flex items-center gap-2">
            <span className="text-xl" aria-hidden>
              {activeCountry.flag}
            </span>{" "}
            {activeCountry.name}
          </div>

          <div className="mt-4 space-y-4">
            {activeCountry.items.map((it, idx) => (
              <details key={idx} className="rounded-xl border p-4">
                <summary className="cursor-pointer font-medium">
                  {it.title}: {it.authority}
                </summary>
                <div className="mt-3 grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold">Eligibility</div>
                    <ul className="list-disc list-inside">
                      {it.eligibility.map((e, i) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold">Requirements</div>
                    <ul className="list-disc list-inside">
                      {it.requirements.map((e, i) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold">Fees</div>
                    <div>{it.fees}</div>
                  </div>
                  <div>
                    <div className="font-semibold">Processing</div>
                    <div>{it.processing}</div>
                  </div>
                  {it.notes && (
                    <div className="sm:col-span-2">
                      <div className="font-semibold">Notes</div>
                      <div>{it.notes}</div>
                    </div>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}