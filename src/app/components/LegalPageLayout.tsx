import Link from "next/link";
import { legalInfo } from "../legalContent";

export default function LegalPageLayout({
  title,
  children,
  lang,
}: {
  title: string;
  children: React.ReactNode;
  lang: "en" | "it";
}) {
  const legalLabel = lang === "it" ? "Note legali" : "Legal";
  const privacyLabel = "Privacy";
  const termsLabel = lang === "it" ? "Termini" : "Terms";

  return (
    <main className="min-h-screen bg-paper text-charcoal">
      <section className="border-b border-stone bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-10 flex items-center justify-between gap-4">
          <Link
            href={`/?lang=${lang}`}
            className="text-xs font-bold uppercase tracking-[0.18em] text-charcoal hover:text-olive transition-colors"
          >
            ← {legalInfo.propertyName}
          </Link>
          <div className="flex gap-4 text-xs uppercase tracking-[0.15em]">
            <Link href={`/legal?lang=${lang}`} className="hover:text-olive transition-colors">
              {legalLabel}
            </Link>
            <Link href={`/privacy?lang=${lang}`} className="hover:text-olive transition-colors">
              {privacyLabel}
            </Link>
            <Link href={`/terms?lang=${lang}`} className="hover:text-olive transition-colors">
              {termsLabel}
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
        <h1 className="font-serif text-4xl md:text-5xl mb-10">{title}</h1>
        <div className="space-y-8 text-gray-700 leading-loose">{children}</div>
      </section>
    </main>
  );
}
