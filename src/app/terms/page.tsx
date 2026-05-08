import LegalPageLayout from "../components/LegalPageLayout";
import { legalText } from "../legalContent";
import { resolveLang } from "../locale";

export default async function TermsPage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const lang = await resolveLang(sp.lang);
  const text = legalText[lang].terms;

  return (
    <LegalPageLayout title={text.title} lang={lang}>
      <p>{text.intro}</p>
      <ul className="list-disc pl-6">
        {text.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </LegalPageLayout>
  );
}
