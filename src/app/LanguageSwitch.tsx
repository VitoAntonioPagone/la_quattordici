"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Lang } from "./i18n";

export default function LanguageSwitch({ lang }: { lang: Lang }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setLang = (next: Lang) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("lang", next);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div
      className="inline-flex items-center rounded-full border border-stone/40 bg-white/70 backdrop-blur px-1 py-1 shadow-sm"
      role="tablist"
      aria-label="Language switch"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        className={[
          "px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full transition-colors",
          lang === "en"
            ? "bg-charcoal text-white"
            : "text-gray-500 hover:text-charcoal"
        ].join(" ")}
        aria-selected={lang === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("it")}
        className={[
          "px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full transition-colors",
          lang === "it"
            ? "bg-charcoal text-white"
            : "text-gray-500 hover:text-charcoal"
        ].join(" ")}
        aria-selected={lang === "it"}
      >
        IT
      </button>
    </div>
  );
}
