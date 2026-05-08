import LegalPageLayout from "../components/LegalPageLayout";
import { legalInfo, legalText } from "../legalContent";
import { resolveLang } from "../locale";

export default async function LegalPage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const lang = await resolveLang(sp.lang);
  const text = legalText[lang].legalNotice;

  return (
    <LegalPageLayout title={text.title} lang={lang}>
      <p>{text.intro}</p>

      <section>
        <h2 className="font-serif text-2xl text-charcoal mb-3">{text.operatorTitle}</h2>
        <p>{legalInfo.operatorName}</p>
        <p>Codice fiscale: {legalInfo.taxCode}</p>
        <p>{legalInfo.addressLine}</p>
        <p>{legalInfo.cityLine}</p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-charcoal mb-3">{text.identifiersTitle}</h2>
        <p>CIN: {legalInfo.cin}</p>
        <p>CIS: {legalInfo.cis}</p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-charcoal mb-3">{text.contactTitle}</h2>
        <p>Email: {legalInfo.email}</p>
        <p>Tel: {legalInfo.phone}</p>
      </section>
    </LegalPageLayout>
  );
}
