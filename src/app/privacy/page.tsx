import LegalPageLayout from "../components/LegalPageLayout";
import { legalInfo, legalText } from "../legalContent";
import { resolveLang } from "../locale";

export default async function PrivacyPage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const lang = await resolveLang(sp.lang);
  const text = legalText[lang].privacy;

  return (
    <LegalPageLayout title={text.title} lang={lang}>
      <p>{text.intro}</p>

      <section>
        <h2 className="font-serif text-2xl text-charcoal mb-3">{text.controllerTitle}</h2>
        <p>{legalInfo.operatorName}</p>
        <p>{legalInfo.addressLine}</p>
        <p>{legalInfo.cityLine}</p>
        <p>{legalInfo.email}</p>
        <p>{legalInfo.phone}</p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-charcoal mb-3">{text.dataTitle}</h2>
        <ul className="list-disc pl-6">
          {text.dataItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-charcoal mb-3">{text.purposesTitle}</h2>
        <ul className="list-disc pl-6">
          {text.purposesItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-charcoal mb-3">{text.recipientsTitle}</h2>
        <p>{text.recipientsBody}</p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-charcoal mb-3">{text.retentionTitle}</h2>
        <p>{text.retentionBody}</p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-charcoal mb-3">{text.transfersTitle}</h2>
        <p>{text.transfersBody}</p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-charcoal mb-3">{text.rightsTitle}</h2>
        <p>{text.rightsBody}</p>
      </section>

      <section id="external-content">
        <h2 className="font-serif text-2xl text-charcoal mb-3">{text.cookiesTitle}</h2>
        <p>{text.cookiesBody}</p>
      </section>
    </LegalPageLayout>
  );
}
