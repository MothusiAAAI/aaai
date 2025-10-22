'use client';
import { useState } from "react";

type Card = { title: string; text: string };

function ReadMore({ text, limit = 15 }: { text: string; limit?: number }) {
  const words = text.trim().split(/\s+/);
  const isLong = words.length > limit;
  const [expanded, setExpanded] = useState(false);

  const visible = expanded || !isLong
    ? text
    : words.slice(0, limit).join(" ") + "…";

  return (
    <p className="text-sm text-neutral-600 mt-1">
      {visible}
      {isLong && (
        <button
          type="button"
          className="ml-1 underline underline-offset-2 text-neutral-800 hover:text-black"
          onClick={() => setExpanded(v => !v)}
          aria-expanded={expanded}
        >
          {expanded ? "See less" : "See more"}
        </button>
      )}
    </p>
  );
}

export default function Services() {
  const cards: Card[] = [
    {
      title: "Secure document vault",
      text:
        "Upload and store critical business documents that can be accessed from anywhere at anytime.",
    },
    {
      title: "Compliance automation",
      text: "Automated workflows for filings, renewals, and reviews.",
    },
    {
      title: "Professional verification",
      text:
        "Deter fraud and use our verifiable document feature to ensure your business documents are always accurately presented and always compliant.",
    },
    {
      title: "Regulatory integrations",
      text:
        "With our interoperability feature and role based access to the system, you now need not submit the same document many times to different partners. Be it banks, insurance companies, Government agencies. With one code,you will be able to upload one document and have all parties access it from one centralized point.",
    },
    {
      title: "User Enabled Access",
      text:
        "You are the custodian of your data, and you at all times, have the right to give access to anyone to view your data and or revoke access at any time. Your data is always secured with our multi factor authentication secure log-in.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold">What we offer</h2>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((c, i) => (
          <div key={i} className="rounded-2xl border p-5 hover:shadow transition">
            <div className="mt-1 font-semibold">{c.title}</div>
            {/* show 15 words then toggle */}
            <ReadMore text={c.text} limit={15} />
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href="/products"
          className="inline-block px-6 py-3 rounded-full bg-black text-white hover:bg-neutral-800 transition"
        >
          View Products and Pricing
        </a>
      </div>
    </section>
  );
}