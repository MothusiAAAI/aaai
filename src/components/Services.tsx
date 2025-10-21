export default function Services() {
  const cards = [
    { title: "Secure document vault", text: "Store signed documents with traceability and integrity." },
    { title: "Compliance automation", text: "Automated workflows for filings, renewals, and reviews." },
    { title: "Professional verification", text: "Verify every submission is signed by a registered professional." },
    { title: "Regulatory integrations", text: "Interoperability with agencies, councils, and banks." },
    { title: "User Enabled Access", text: "You remain a custodian of your data and you get to grant or revoke access any time." },
  ]; 
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold">What we offer</h2>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((c,i)=> (
          <div key={i} className="rounded-2xl border p-5 hover:shadow transition">
            <div className="mt-1 font-semibold">{c.title}</div>
            <p className="text-sm text-neutral-600 mt-1">{c.text}</p>
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