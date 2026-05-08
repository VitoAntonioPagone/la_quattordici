"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { legalText, type Lang } from "../legalContent";

const STORAGE_KEY = "la-quattordici:external-map-consent";

export default function MapEmbedWithConsent({ lang }: { lang: Lang }) {
  const text = legalText[lang].map;
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(window.localStorage.getItem(STORAGE_KEY) === "granted");
  }, []);

  function allow() {
    window.localStorage.setItem(STORAGE_KEY, "granted");
    setAllowed(true);
  }

  if (allowed) {
    return (
      <iframe
        title="La Quattordici location on Google Maps"
        className="w-full h-full transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        src="https://www.google.com/maps?q=40.7342284,17.5768427&z=17&output=embed"
      />
    );
  }

  return (
    <div className="w-full h-full bg-stone/40 flex items-center justify-center p-8">
      <div className="max-w-md text-center bg-white/95 backdrop-blur rounded-lg shadow-xl p-8 border border-stone">
        <h4 className="font-serif text-2xl text-charcoal mb-4">{text.title}</h4>
        <p className="text-sm text-gray-600 leading-relaxed mb-6">{text.body}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={allow}
            className="bg-charcoal text-white px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] hover:bg-olive transition-colors rounded-sm"
          >
            {text.accept}
          </button>
          <Link
            href={`/privacy?lang=${lang}#external-content`}
            className="border border-charcoal text-charcoal px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] hover:border-olive hover:text-olive transition-colors rounded-sm"
          >
            {text.policy}
          </Link>
        </div>
      </div>
    </div>
  );
}

