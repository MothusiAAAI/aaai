import Footer from "../../components/Footer";

const founders = [
  {
    name: "Thuso Mokate Modisenyane",
    title: "Co-founder and CEO",
    bio: "Tech entrepreneur focused on digital compliance and trade enablement in Africa.",
    photo: "/thuso.jpeg",
  },
  {
    name: "Steve Buck",
    title: "Co-founder",
    bio: "Operator and investor with experience in SME finance and platform strategy.",
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
            <div key={i} className="rounded-2xl border p-6 flex gap-4 items-center">
              <img src={f.photo} alt={f.name} className="w-24 h-24 rounded-full object-cover" />
              <div>
                <div className="font-semibold text-lg">{f.name}</div>
                <div className="text-sm text-neutral-600">{f.title}</div>
                <p className="text-sm mt-2 text-neutral-700">{f.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}