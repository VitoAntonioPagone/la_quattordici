// src/app/availability/page.tsx
import type { Lang } from "../i18n";
import Link from "next/link";
import LanguageSwitch from "../LanguageSwitch";
import AvailabilityClient from "./AvailabilityClient";
import { translations } from "../i18n";
import Image from "next/image";

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
  <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 h-20 lg:h-24 flex items-center justify-between">
<Link className="flex items-center gap-3 group" href={`/?lang=${lang}`} aria-label="La Quattordici">
  <img
    src="/images/logo.png"
    alt="La Quattordici logo"
    className="h-9 w-9 lg:h-10 lg:w-10 object-contain"
  />

  <span className="hidden lg:inline font-sans font-medium text-2xl lg:text-3xl tracking-[0.08em] text-charcoal group-hover:text-olive transition-colors">
    La Quattordici
  </span>
</Link>



    {/* Desktop nav */}
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

    <div className="flex items-center gap-2 sm:gap-3 lg:gap-8">
      <LanguageSwitch lang={lang} />

      {/* Desktop enquire + CTA */}
      <a
        className="hidden lg:block text-xs font-bold uppercase tracking-[0.15em] text-charcoal hover:text-olive"
        href={`/?lang=${lang}#contact`}
      >
        {t.nav.enquire}
      </a>

      <Link
        className="hidden lg:inline-flex bg-charcoal text-white px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] hover:bg-olive transition-colors duration-500 rounded-sm whitespace-nowrap"
        href={`/availability?lang=${lang}`}
        aria-current="page"
      >
        {lang === "it" ? "Disponibilità" : "Availability"}
      </Link>

      {/* Mobile menu */}
      <details className="relative lg:hidden group">
        <summary className="list-none cursor-pointer select-none rounded-sm border border-stone/60 px-3 py-2 text-charcoal hover:bg-stone/10 transition">
          <span className="material-symbols-outlined text-[20px] leading-none">menu</span>
        </summary>

        <div className="absolute right-0 mt-3 w-[min(92vw,340px)] overflow-hidden rounded-lg border border-stone/30 bg-white shadow-xl">
          <div className="p-4 flex flex-col gap-2">
            {navLinks.map(({ key, href }) => (
              <a
                key={`m-${String(key)}`}
                href={href}
                className="px-3 py-2 rounded-md text-sm font-medium text-charcoal hover:bg-stone/10 transition"
              >
                {t.nav[key]}
              </a>
            ))}
          </div>

          <div className="p-4 border-t border-stone/30 flex flex-col gap-3">
            <a
              href={`/?lang=${lang}#contact`}
              className="w-full text-center bg-white border border-charcoal text-charcoal py-3 text-xs font-bold uppercase tracking-[0.18em] hover:border-olive hover:text-olive transition rounded-sm"
            >
              {t.nav.enquire}
            </a>

            <Link
              href={`/availability?lang=${lang}`}
              className="w-full text-center bg-charcoal text-white py-3 text-xs font-bold uppercase tracking-[0.18em] hover:bg-olive transition rounded-sm"
              aria-current="page"
            >
              {lang === "it" ? "Disponibilità" : "Availability"}
            </Link>
          </div>
        </div>
      </details>
    </div>
  </div>
</header>


      <main>
<section className="relative h-[50vh] w-full overflow-hidden">
  <Image
    src="/images/hero.jpg"
    alt="Hero"
    fill
    priority
    sizes="100vw"
    className="object-cover object-center"
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
