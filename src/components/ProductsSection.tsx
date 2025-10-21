// src/components/ProductsSection.tsx
import { REVENUE_TIERS, PAYMENT_TIMING_NOTE } from "@/data/revenueTiers";

export default function ProductsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Products and pricing</h2>
      <p className="text-neutral-600 mt-1">
        Transparent pricing for small enterprises, professionals, and institutions.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {REVENUE_TIERS.slice(0, 3).map((t) => (
          <div key={t.id} className="rounded-2xl border p-6">
            {t.revenueRange && (
              <div className="text-xs text-neutral-500 mb-1">{t.revenueRange}</div>
            )}
            <div className="text-xl font-bold">{t.name}</div>
            <div className="mt-2 text-2xl">${t.pricePerYearUSD} / year</div>
            <button className="mt-4 rounded-full bg-black text-white px-4 py-2 text-sm">
              Choose plan
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border p-6">
          <div className="text-xl font-bold">{REVENUE_TIERS[3].name}</div>
          <div className="mt-2 text-2xl">${REVENUE_TIERS[3].pricePerYearUSD} / year</div>
          {REVENUE_TIERS[3].audienceNote && (
            <div className="mt-2 text-sm text-neutral-600">{REVENUE_TIERS[3].audienceNote}</div>
          )}
          <button className="mt-4 rounded-full bg-black text-white px-4 py-2 text-sm">
            Choose plan
          </button>
        </div>
      </div>

      <p className="mt-8 text-xs text-neutral-600">{PAYMENT_TIMING_NOTE}</p>
    </section>
  );
}