export default function Hero() {
  return (
    <section className="bg-neutral-50 border-b">
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 items-center gap-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Digital Compliance for African Businesses
          </h1>
          <p className="mt-4 text-neutral-700">
            AAAI connects professional bodies, regulators, local councils, financial institutions, and businesses in one trusted platform.
            Digitize filings, verify professionals, and share data securely.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="/products" className="px-5 py-3 rounded-full bg-black text-white">See pricing</a>
            <a href="#contact" className="px-5 py-3 rounded-full border">Talk to us</a>
          </div>
          <div className="mt-6 text-xs text-neutral-500">Aligned with Vision 2036 and AfCFTA. Built in Botswana.</div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] w-full rounded-2xl bg-white shadow grid grid-cols-2 gap-4 p-6">
            <Card title="Partnered with Accounting and Law professionals to verify authenticity." text="" />
            <Card title="Find Compliance requirements across different African markets." text="" />
            <Card title="Seamlessly store and access your company data from anywhere." text="" />
            <Card title="Build a credible track record for your business through online filing." text="" />
          </div>
          <div className="absolute -bottom-4 -right-4 hidden md:block text-xs text-neutral-400">Illustrative UI only</div>
        </div>
      </div>
    </section>
  );
}
function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border p-4">
      <div className="font-semibold">{title}</div>
      <p className="text-sm text-neutral-600 mt-2">{text}</p>
    </div>
  );
}