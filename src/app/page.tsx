// page.tsx
import { translations, type Lang } from "./i18n";
import LanguageSwitch from "./LanguageSwitch";
import Link from "next/link";
import GallerySection from "./GallerySection";


type PageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

function getLang(raw?: string): Lang {
  return raw === "it" || raw === "en" ? raw : "en";
}

export default async function Page({ searchParams }: PageProps) {
  const sp = (await searchParams) ?? {};
  const lang = getLang(sp.lang);
  const t = translations[lang];
const galleryImages = Array.from({ length: 27 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return { src: `images/gallery/${n}.jpeg`, alt: `La Quattordici photo ${n}` };
});



const navLinks: Array<{ key: keyof typeof t.nav; href: string }> = [
  { key: "apartment", href: "#apartment" },
  { key: "experience", href: "#experience" },
  { key: "gallery", href: "#gallery" },
  { key: "location", href: "#location" },
];


  const year = new Date().getFullYear();

  return (
    <>
<header className="fixed top-0 z-50 w-full transition-all duration-500 bg-white/95 backdrop-blur-md border-b border-stone/30">
  <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 h-20 lg:h-24 flex items-center justify-between">
    <a className="flex items-center gap-3 group" href="#hero" aria-label="La Quattordici">
      <img
        src="/images/logo.png"
        alt="La Quattordici logo"
        className="h-9 w-9 lg:h-10 lg:w-10 object-contain bg-transparent"
        style={{ backgroundColor: "transparent" }}
      />

      {/* Hide name on mobile/tablet to avoid overflow */}
      <span className="hidden lg:inline font-sans font-medium text-2xl lg:text-3xl tracking-[0.08em] text-charcoal group-hover:text-olive transition-colors">
        La Quattordici
      </span>
    </a>

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
      {/* Desktop enquire */}
      <a
        className="hidden lg:block text-xs font-bold uppercase tracking-[0.15em] text-charcoal hover:text-olive"
        href="#contact"
      >
        {t.nav.enquire}
      </a>

      <LanguageSwitch lang={lang} />

      {/* Desktop CTA */}
      <Link
        href={`/availability?lang=${lang}`}
        className="hidden lg:inline-flex bg-charcoal text-white px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] hover:bg-olive transition-colors duration-500 rounded-sm whitespace-nowrap"
      >
        {lang === "it" ? "Verifica disponibilità" : "Check availability"}
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
            {/* Mobile enquire full width so it never goes out of margin */}
            <a
              href="#contact"
              className="w-full text-center bg-white border border-charcoal text-charcoal py-3 text-xs font-bold uppercase tracking-[0.18em] hover:border-olive hover:text-olive transition rounded-sm"
            >
              {t.nav.enquire}
            </a>

            <Link
              href={`/availability?lang=${lang}`}
              className="w-full text-center bg-charcoal text-white py-3 text-xs font-bold uppercase tracking-[0.18em] hover:bg-olive transition rounded-sm"
            >
              {lang === "it" ? "Verifica disponibilità" : "Check availability"}
            </Link>
          </div>
        </div>
      </details>
    </div>
  </div>
</header>




<main>
  {/* HERO */}
  <section id="hero" className="relative h-screen w-full overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] hover:scale-105 ease-out"
style={{
  backgroundImage: 'url("/images/hero.jpg")',
}}

    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

<div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6 pt-20">
  <span className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase mb-6 opacity-90">
    {t.hero.subtitle}
  </span>

  <h1 className="text-white mb-8 drop-shadow-sm">
    <span className="font-sans font-bold uppercase tracking-[0.22em] block text-3xl md:text-5xl lg:text-6xl leading-tight">
      {lang === "it" ? "Benvenuti a Ostuni" : "Welcome to Ostuni"}
    </span>
  </h1>

  <p className="max-w-xl font-light text-lg md:text-xl leading-relaxed opacity-90 tracking-wide font-serif italic">
    {t.hero.tagline}
  </p>
</div>


    {/* Discover -> Apartment */}
    <a
      href="#apartment"
      className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-opacity"
    >
      <span className="text-[10px] uppercase tracking-[0.2em]">{t.discover}</span>
      <span className="material-symbols-outlined text-white text-3xl font-light">
        expand_more
      </span>
    </a>
  </section>

  {/* APARTMENT INTRO */}
  <section
    id="apartment"
    className="py-32 px-6 md:px-12 max-w-4xl mx-auto text-center scroll-mt-28"
  >
    <span className="material-symbols-outlined text-olive text-4xl mb-8 opacity-80">
      spa
    </span>
    <h2 className="font-serif text-3xl md:text-5xl text-charcoal mb-10 leading-snug">
      {t.sectionIntro.title}{" "}
      <span className="italic text-olive">{t.sectionIntro.highlight}</span>.
    </h2>
    <div className="w-24 h-px bg-gray-300 mx-auto mb-10" />
    <p className="text-gray-600 leading-loose text-lg font-light max-w-2xl mx-auto font-sans">
      {t.sectionIntro.text}
    </p>
  </section>

  <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-32 grid grid-cols-1 lg:grid-cols-12 gap-16">
    <div className="lg:col-span-8 flex flex-col gap-24">
      <div className="border-y border-stone py-10 flex flex-wrap justify-between gap-8 items-center">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl text-olive font-light">
            king_bed
          </span>
          <span className="text-xs uppercase tracking-[0.15em] text-gray-600">
            {t.stats.bedrooms}
          </span>
        </div>
        <span className="w-px h-8 bg-stone hidden md:block" />
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl text-olive font-light">
            shower
          </span>
          <span className="text-xs uppercase tracking-[0.15em] text-gray-600">
            {t.stats.bathrooms}
          </span>
        </div>
        <span className="w-px h-8 bg-stone hidden md:block" />
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl text-olive font-light">
            groups
          </span>
          <span className="text-xs uppercase tracking-[0.15em] text-gray-600">
            {t.stats.guests}
          </span>
        </div>
        <span className="w-px h-8 bg-stone hidden md:block" />
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl text-olive font-light">
            wifi
          </span>
          <span className="text-xs uppercase tracking-[0.15em] text-gray-600">
            {t.stats.wifi}
          </span>
        </div>
      </div>

      <div className="w-full h-[600px] overflow-hidden rounded-sm relative group shadow-sm">
        <img
          alt="Interior living room with stone arches"
          className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
          src="/images/apartment/living.jpg"
        />
      </div>

      {/* EXPERIENCE */}
      <section id="experience" className="scroll-mt-28">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
          <h3 className="font-serif text-4xl text-charcoal">{t.experience.title}</h3>

          <a
            className="hidden md:block text-xs font-bold uppercase tracking-[0.15em] border-b border-charcoal pb-1 hover:text-olive hover:border-olive transition-colors"
            href="#gallery"
          >
            {t.experience.viewAll}
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
        {t.experience.items.map((item, idx) => (
          <div key={`${item.title}-${idx}`} className="group">

              <span className="material-symbols-outlined text-olive text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </span>
              <h4 className="font-serif text-2xl mb-3">{item.title}</h4>
              <p className="text-gray-500 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 md:hidden">
          <a
            className="text-xs font-bold uppercase tracking-[0.15em] border-b border-charcoal pb-1"
            href="#gallery"
          >
            {t.experience.viewAll}
          </a>
        </div>
      </section>

      {/* GALLERY / INTERIORS */}
    <GallerySection
      id="gallery"
      title={lang === "it" ? "Interni" : "Interiors"}
      images={galleryImages}
      viewAllLabel={lang === "it" ? "Vedi galleria" : "View Gallery"}
      openGalleryAriaLabel={lang === "it" ? "Apri la galleria" : "Open gallery"}
      closeLabel={lang === "it" ? "Chiudi" : "Close"}
      prevLabel={lang === "it" ? "Precedente" : "Prev"}
      nextLabel={lang === "it" ? "Successiva" : "Next"}
      thumbnailAriaPrefix={lang === "it" ? "Apri immagine" : "Open image"}
    />





      {/* TESTIMONIAL (no anchor needed)       <div className="bg-cream p-12 lg:p-16 rounded-sm relative overflow-hidden">
        <span className="absolute top-[-20px] left-[-20px] text-[200px] leading-none text-white font-serif select-none opacity-50">
          "
        </span>
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <div className="flex justify-center gap-1 mb-6 text-olive">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="material-symbols-filled text-lg">
                star
              </span>
            ))}
          </div>
          <h3 className="font-serif text-2xl md:text-3xl italic text-charcoal leading-relaxed mb-8">
            "Absolutely magical. The terrace views are even better in person. The house
            is perfectly located, quiet but close to everything."
          </h3>
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] mb-1">
              Sarah Mitchell
            </span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">
              United Kingdom • October 2023
            </span>
          </div>
        </div>
      </div>*/}

    </div>

    {/* RIGHT COLUMN */}
    <div className="lg:col-span-4 relative">
      <div className="sticky top-32 bg-white rounded-lg p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-gray-100">
        <div className="flex flex-col gap-6">
          <div className="border-b border-gray-100 pb-6">
            <span className="block text-xs text-gray-400 uppercase tracking-widest mb-1">
              {t.booking.startingFrom}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-serif text-charcoal">€80</span>
              <span className="text-sm text-gray-400 font-light">{t.booking.night}</span>
            </div>
          </div>

          <Link
            href={`/availability?lang=${lang}`}
            className="w-full bg-charcoal text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-olive transition-all duration-500 shadow-lg hover:shadow-olive/20 rounded-sm text-center"
          >
            {lang === "it" ? "Verifica disponibilità" : "Check availability"}
          </Link>

          <p className="text-center text-[10px] text-gray-400">{t.booking.disclaimer}</p>
        </div>
      </div>
    </div>
  </div>

{/* LOCATION / SURROUNDINGS */}
<section id="location" className="bg-white border-t border-stone py-0 scroll-mt-28">
  <div className="grid lg:grid-cols-2">
    <div className="p-12 lg:p-24 flex flex-col justify-center">
      <span className="text-olive font-bold text-xs uppercase tracking-[0.2em] mb-4 block">
        {t.surroundings.label}
      </span>

      <h3 className="font-serif text-4xl lg:text-5xl mb-8 text-charcoal">
        {t.surroundings.title}
      </h3>

      <p className="text-gray-600 leading-loose mb-12 font-light text-lg">
        {t.surroundings.description}
      </p>

      <div className="space-y-8">
        <div className="flex items-center gap-6 group cursor-pointer">
          <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-olive group-hover:bg-olive group-hover:text-white transition-all">
            <span className="material-symbols-outlined text-xl">directions_walk</span>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-1 text-charcoal">
              {t.surroundings.poi1Title}
            </h4>
            <p className="text-sm text-gray-500 font-light">{t.surroundings.poi1Meta}</p>
          </div>
        </div>

        <div className="flex items-center gap-6 group cursor-pointer">
          <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-olive group-hover:bg-olive group-hover:text-white transition-all">
            <span className="material-symbols-outlined text-xl">waves</span>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-1 text-charcoal">
              {t.surroundings.poi2Title}
            </h4>
            <p className="text-sm text-gray-500 font-light">{t.surroundings.poi2Meta}</p>
          </div>
        </div>
      </div>
    </div>

    <div className="h-[500px] lg:h-auto w-full relative group overflow-hidden">
      <iframe
        title="La Quattordici location on Google Maps"
        className="w-full h-full transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        src="https://www.google.com/maps?q=40.7342284,17.5768427&z=17&output=embed"
      />

      <div className="absolute inset-0 bg-black/5 pointer-events-none" />

      <div className="absolute bottom-12 left-12 bg-white/95 backdrop-blur px-8 py-6 shadow-2xl max-w-xs transform transition-transform group-hover:-translate-y-2 duration-500">
        <span className="font-serif text-2xl italic text-charcoal block mb-1">
          {t.surroundings.city}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-gray-500 block">
          {t.surroundings.region}
        </span>

        <a
          className="mt-3 inline-block text-[10px] uppercase tracking-widest text-olive font-bold hover:text-charcoal transition-colors"
          href="https://maps.app.goo.gl/RFwKiKWTLskwYWtq6"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.surroundings.openMaps}
        </a>
      </div>
    </div>
  </div>
</section>

</main>


<footer
  id="contact"
  className="bg-[#1A1A1A] text-stone py-24 border-t border-gray-800 scroll-mt-28"
>
  <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
    <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">
      <div className="max-w-md">
        <div className="flex items-center gap-3 mb-8">
          <span className="font-serif text-3xl text-white">La Quattordici</span>
        </div>

        <p className="text-gray-400 font-light text-base leading-relaxed mb-8">
          {t.footer.description}
        </p>

        <div className="flex gap-4">
          <a
            className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"
            href="https://www.instagram.com/la_quattordici/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            IG
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-16 lg:gap-24 text-sm">
        {[
          {
            title: "Explore",
            links: [
              { label: t.nav.apartment, href: "#apartment" },
              { label: t.nav.experience, href: "#experience" },
              { label: t.nav.gallery, href: "#gallery" },
              { label: t.nav.location, href: "#location" },
            ],
          },

          // {
          //   title: "Stay",
          //   links: [
          //     { label: lang === "it" ? "Servizi" : "Amenities", href: "#apartment" },
          //     { label: lang === "it" ? "Regole" : "Policies", href: "#contact" },
          //     { label: "FAQ", href: "#contact" },
          //   ],
          // },

          {
            title: "Contact",
            links: [
              {
                label: lang === "it" ? "Email" : "Email",
                href: "mailto:laquattordiciluxuryapartment@gmail.com",
              },
              {
                label: "WhatsApp",
                href: "https://wa.me/393920242382",
              },
              {
                label: "Instagram",
                href: "https://www.instagram.com/la_quattordici/",
              },
            ],
          },
        ].map((col, colIdx) => (
          <div key={`${col.title}-${colIdx}`} className="flex flex-col gap-6">
            <h5 className="font-bold uppercase tracking-[0.2em] text-white text-xs">
              {col.title}
            </h5>

            {col.links.map((l, linkIdx) => (
              <a
                key={`${l.label}-${l.href}-${linkIdx}`}
                className="text-gray-400 hover:text-white transition-colors"
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {l.label}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>

    <div className="pt-8 border-t border-gray-800 text-xs text-gray-600 flex flex-col md:flex-row justify-between items-center gap-4">
      <p>
        © {year} La Quattordici. {t.footer.rights}
      </p>

      <div className="flex gap-8">
        {[
          { label: "Privacy", href: "#contact" },
          { label: "Terms", href: "#contact" },
          { label: "Sitemap", href: "#hero" },
        ].map((x, idx) => (
          <a
            key={`${x.label}-${idx}`}
            className="hover:text-gray-400 transition-colors"
            href={x.href}
          >
            {x.label}
          </a>
        ))}
      </div>
    </div>
  </div>
</footer>


    </>
  );
}
