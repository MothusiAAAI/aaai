"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Nav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const tabs = [
    { href: "/", key: "home", label: "Home" },
    { href: "/products", key: "products", label: "Products" },
    { href: "/about", key: "about", label: "About Us" },
    { href: "/compliance", key: "compliance", label: "Compliance" },
    { href: "/export", key: "export", label: "Export" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/aaai-logo.png"
              alt="Accountable Africa AI logo"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
            <span className="font-semibold">Accountable Africa AI</span>
          </Link>
        </div>

        <nav className="flex items-center gap-1">
          {tabs.map((t) => {
            const active = isActive(t.href);
            return (
              <Link
                key={t.key}
                href={t.href}
                aria-current={active ? "page" : undefined}
                className={`px-3 py-2 rounded-full text-sm ${
                  active ? "bg-black text-white" : "hover:bg-neutral-100"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}