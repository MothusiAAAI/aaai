export default function Footer() {
  return (
    <footer id="contact" className="border-t">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6 items-start">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-black text-white grid place-items-center text-sm font-semibold">AI</div>
            <span className="font-semibold">Accountable Africa AI</span>
          </div>
          <p className="text-sm text-neutral-600 mt-3 max-w-sm">
            Building trusted compliance infrastructure for Africa. Starting in Botswana. Aligned with AfCFTA.
          </p>
        </div>
        <div>
          <div className="font-semibold">Company</div>
          <ul className="mt-2 text-sm text-neutral-700 space-y-1">
            <li><a href="/about">About</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/compliance">Compliance guide</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold">Contact</div>
          <div className="text-sm text-neutral-700 mt-2">Builtrec Inc / Accountable Africa AI (Pty) Ltd</div>
          <div className="text-sm text-neutral-700">+267 363 1043</div>
          <div className="text-sm text-neutral-700">support@accountableafrica.ai</div>
        </div>
      </div>
      <div className="text-xs text-neutral-500 border-t py-4 text-center">
        © {new Date().getFullYear()} Accountable Africa AI. All rights reserved.
      </div>
    </footer>
  );
}