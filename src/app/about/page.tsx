import Footer from "../../components/Footer";

const founders = [
  {
    name: "Thuso Mokate Modisenyane",
    title: "Co-founder and CEO",
    bio: [
      "Expert in Finance with over 5 years work experience in sales, business development and credit departments. Risk Professional with a passion for creating impact driven tech solutions to serve the African market.",
      "Thuso has a BCOM (Honors) Risk Management and Insurance from the National University of Science and Technology.",
      "Certified by ACAMS as an AML Fintech Compliance Associate.",
    ],
    photo: "/thuso.jpeg",
  },
  {
    name: "Steve Buck",
    title: "Co-founder and CTO",
    bio: [
      "Passionate and experienced founder and Chief Technology Officer who has spent the last 30+ years creating commercial software for Standard & Poor’s, OnPoint Technologies, Primark, Thomson Reuters, and CSC. Proven track record in commercial software development.",
      "Steve has a bachelor’s degree in Mathematics from UNC-CH and an MBA from the University of Colorado.",
    ],
    photo: "/steve.jpeg",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold">About us</h1>
        <p className="text-neutral-600 mt-2 max-w-3xl">
          Accountable Africa AI is a Builtrec Inc company. We build trusted digital infrastructure for compliance across Africa,
          starting in Botswana and aligned with AfCFTA goals.
        </p>

        <div className="mt-8 grid sm:grid-cols-2 gap-6">
          {founders.map((f, i) => (
            <div key={i} className="rounded-2xl border p-6 flex gap-4 items-start">
              <img src={f.photo} alt={f.name} className="w-24 h-24 rounded-full object-cover" />
              <div>
                <div className="font-semibold text-lg">{f.name}</div>
                <div className="text-sm text-neutral-600">{f.title}</div>
                <div className="mt-2 space-y-2">
                  {f.bio.map((para, idx) => (
                    <p key={idx} className="text-sm text-neutral-700">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}