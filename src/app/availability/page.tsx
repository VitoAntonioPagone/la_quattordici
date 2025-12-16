// src/app/availability/page.tsx
import type { Lang } from "../i18n";
import Link from "next/link";
import LanguageSwitch from "../LanguageSwitch";
import AvailabilityClient from "./AvailabilityClient";
import { translations } from "../i18n";

function getLang(raw?: string): Lang {
  return raw === "it" || raw === "en" ? raw : "en";
}

export default async function AvailabilityPage({
  searchParams
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  const sp = await searchParams;
  const lang = getLang(sp?.lang);
  const t = translations[lang];

  const navLinks: Array<{ key: keyof typeof t.nav; href: string }> = [
    { key: "villa", href: `/?lang=${lang}#villa` },
    { key: "experience", href: `/?lang=${lang}#experience` },
    { key: "journal", href: `/?lang=${lang}#journal` },
    { key: "location", href: `/?lang=${lang}#location` }
  ];

  return (
    <>
      <header className="fixed top-0 z-50 w-full transition-all duration-500 bg-white/95 backdrop-blur-md border-b border-stone/30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
          <Link className="flex items-center gap-3 group" href={`/?lang=${lang}`}>
            <span className="font-serif text-2xl lg:text-3xl tracking-wide text-charcoal group-hover:text-olive transition-colors">
              La Quattordici
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-12">
            {navLinks.map(({ key, href }) => (
              <a
                key={String(key)}
                className="text-xs uppercase tracking-[0.15em] font-medium text-gray-500 hover:text-charcoal transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-px after:bg-charcoal after:transition-all hover:after:w-full"
                href={href}
              >
                {t.nav[key]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4 lg:gap-8">
            <LanguageSwitch lang={lang} />
            <a
              className="hidden lg:block text-xs font-bold uppercase tracking-[0.15em] text-charcoal hover:text-olive"
              href={`/?lang=${lang}#contact`}
            >
              {t.nav.enquire}
            </a>
            <Link
              className="bg-charcoal text-white px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] hover:bg-olive transition-colors duration-500 rounded-sm"
              href={`/availability?lang=${lang}`}
              aria-current="page"
            >
              {lang === "it" ? "Disponibilità" : "Availability"}
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative h-[50vh] w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCg5ESvVHbTTrJ3nT-3K9tx_NkP511xgzcVNwJ-CIouWTzh6cn5je0FqVDwm2zBceovP_5Izi_Y3fTOUOVUJ5cZoUBU-tJWAdn7a2E1kRJ-TANQxEVvTxWaB26H2fMHrkqgN9fGN3E58hhZysIUNMUIPZwshEexJG6BK-_nSheRQsPhpfto4PdvqWmDhVwAxmwTaloO7_oAjx7x8v8Kii2Sl34T5IaGEe_eO81feMyPOKZzdPgq6Uy54cKoXYQsiuM-pJCyugTh80Kw")'
            }}
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6 pt-24">
            <span className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase mb-6 opacity-90">
              {lang === "it" ? "Pianifica la tua fuga" : "Plan Your Escape"}
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white drop-shadow-sm font-light italic">
              {lang === "it" ? "Disponibilità" : "Availability"}
            </h1>
          </div>
        </section>

        <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24">
          <AvailabilityClient lang={lang} />
        </section>
      </main>
    </>
  );
}
