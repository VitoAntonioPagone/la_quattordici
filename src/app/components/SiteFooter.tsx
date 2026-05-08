import Link from "next/link";
import { legalInfo, legalText, type Lang } from "../legalContent";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M14.62 3c.18 1.54 1.05 3.01 2.34 3.92.91.65 1.99.99 3.04.97v3.05a8.1 8.1 0 0 1-4.5-1.38v5.64c0 1.4-.44 2.76-1.28 3.89A6.58 6.58 0 0 1 9 21.7a6.57 6.57 0 0 1-5.17-2.58A6.56 6.56 0 0 1 2.5 15c0-1.47.49-2.89 1.4-4.03A6.56 6.56 0 0 1 9 8.36c.37 0 .73.03 1.09.09v3.16A3.57 3.57 0 0 0 5.93 15c0 .81.27 1.6.78 2.23A3.58 3.58 0 0 0 9 18.62c.78 0 1.54-.26 2.16-.75a3.58 3.58 0 0 0 1.39-2.83V3h2.07Z" />
    </svg>
  );
}

export default function SiteFooter({ lang }: { lang: Lang }) {
  const text = legalText[lang].footer;
  const year = new Date().getFullYear();
  const contactTitle = lang === "it" ? "Contatti" : "Contact";
  const legalTitle = lang === "it" ? "Legale" : "Legal";
  const moreTitle = lang === "it" ? "Altro" : "More";
  const sitemapLabel = lang === "it" ? "Mappa del sito" : "Sitemap";
  const rightsLabel = lang === "it" ? "Tutti i diritti riservati." : "All rights reserved.";

  return (
    <footer
      id="contact"
      className="bg-[#1A1A1A] text-stone py-24 border-t border-gray-800 scroll-mt-28"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-serif text-3xl text-white">{legalInfo.propertyName}</span>
            </div>

            <p className="text-gray-400 font-light text-base leading-relaxed mb-6">
              {legalInfo.addressLine}
              <br />
              {legalInfo.cityLine}
            </p>

            <div className="space-y-2 text-sm text-gray-400">
              <p>
                {text.operatorLabel}: {legalInfo.operatorName}
              </p>
              <p>
                {text.cinLabel}: {legalInfo.cin}
              </p>
              <p>
                {text.cisLabel}: {legalInfo.cis}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 lg:gap-24 text-sm">
            <div className="flex flex-col gap-4">
              <h5 className="font-bold uppercase tracking-[0.2em] text-white text-xs">{contactTitle}</h5>
              <a className="text-gray-400 hover:text-white transition-colors" href={`mailto:${legalInfo.email}`}>
                {legalInfo.email}
              </a>
              <a className="text-gray-400 hover:text-white transition-colors" href="https://wa.me/393920242382" target="_blank" rel="noopener noreferrer">
                {legalInfo.phone}
              </a>
              <a className="text-gray-400 hover:text-white transition-colors" href="https://www.instagram.com/la_quattordici/" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a className="text-gray-400 hover:text-white transition-colors" href="https://www.tiktok.com/@la.quattordici" target="_blank" rel="noopener noreferrer">
                TikTok
              </a>
              <div className="flex items-center gap-3 pt-2">
                <a
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-300 transition-all hover:border-white hover:bg-white hover:text-black"
                  href="https://www.instagram.com/la_quattordici/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-300 transition-all hover:border-white hover:bg-white hover:text-black"
                  href="https://www.tiktok.com/@la.quattordici"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                >
                  <TikTokIcon />
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h5 className="font-bold uppercase tracking-[0.2em] text-white text-xs">{legalTitle}</h5>
              <Link className="text-gray-400 hover:text-white transition-colors" href={`/legal?lang=${lang}`}>
                {text.legal}
              </Link>
              <Link className="text-gray-400 hover:text-white transition-colors" href={`/privacy?lang=${lang}`}>
                {text.privacy}
              </Link>
              <Link className="text-gray-400 hover:text-white transition-colors" href={`/terms?lang=${lang}`}>
                {text.terms}
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              <h5 className="font-bold uppercase tracking-[0.2em] text-white text-xs">{moreTitle}</h5>
              <Link className="text-gray-400 hover:text-white transition-colors" href={`/?lang=${lang}#hero`}>
                {sitemapLabel}
              </Link>
              <Link className="text-gray-400 hover:text-white transition-colors" href={`/privacy?lang=${lang}#external-content`}>
                {text.externalContent}
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-xs text-gray-600 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {year} {legalInfo.propertyName}. {rightsLabel}</p>
          <p>{legalInfo.operatorName}</p>
        </div>
      </div>
    </footer>
  );
}
