"use client";

import { useEffect, useMemo, useState } from "react";

type Img = { src: string; alt: string };

export default function GallerySection({
  id,
  title,
  images,
  viewAllLabel,
  openGalleryAriaLabel,
  closeLabel,
  prevLabel,
  nextLabel,
  thumbnailAriaPrefix, // <- string
}: {
  id: string;
  title: string;
  images: Img[];

  viewAllLabel: string;
  openGalleryAriaLabel: string;
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
  thumbnailAriaPrefix: string; // e.g. "Apri immagine" / "Open image"
}) {
  const preview = useMemo(() => images.slice(0, 4), [images]);
  const total = images.length;

  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(0);

  const openAt = (idx: number) => {
    if (total === 0) return;
    setActive(Math.max(0, Math.min(idx, total - 1)));
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const next = () => setActive((i) => (i + 1) % total);
  const prev = () => setActive((i) => (i - 1 + total) % total);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, total]);

  if (!images?.length) return null;

  return (
    <section id={id} className="scroll-mt-28">
      <h3 className="font-serif text-4xl text-charcoal mb-12">{title}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          type="button"
          onClick={() => openAt(0)}
          className="md:col-span-1 h-[400px] md:h-[600px] overflow-hidden rounded-sm relative group text-left"
          aria-label={openGalleryAriaLabel}
        >
          {preview[0] && (
            <img
              alt={preview[0].alt}
              className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
              src={preview[0].src}
              loading="lazy"
            />
          )}
        </button>

        <div className="md:col-span-1 flex flex-col gap-6">
          <button
            type="button"
            onClick={() => openAt(1)}
            className="h-[300px] overflow-hidden rounded-sm relative group text-left"
            aria-label={openGalleryAriaLabel}
          >
            {preview[1] && (
              <img
                alt={preview[1].alt}
                className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                src={preview[1].src}
                loading="lazy"
              />
            )}
          </button>

          <button
            type="button"
            onClick={() => openAt(2)}
            className="h-[276px] overflow-hidden rounded-sm relative group text-left"
            aria-label={openGalleryAriaLabel}
          >
            {preview[2] && (
              <img
                alt={preview[2].alt}
                className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                src={preview[2].src}
                loading="lazy"
              />
            )}
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6 h-[250px]">
        <button
          type="button"
          onClick={() => openAt(3)}
          className="relative overflow-hidden group rounded-sm text-left"
          aria-label={openGalleryAriaLabel}
        >
          {preview[3] && (
            <img
              alt={preview[3].alt}
              className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
              src={preview[3].src}
              loading="lazy"
            />
          )}
        </button>

        <button
          type="button"
          onClick={() => openAt(0)}
          className="relative overflow-hidden bg-stone/30 flex items-center justify-center cursor-pointer hover:bg-stone/50 transition-colors rounded-sm border border-stone"
          aria-label={viewAllLabel}
        >
          <div className="text-center p-4">
            <span className="font-serif text-3xl italic block">{viewAllLabel}</span>
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm" role="dialog" aria-modal="true">
          <button type="button" onClick={close} className="absolute inset-0 cursor-default" aria-label={closeLabel} />

          <div className="relative mx-auto h-full max-w-6xl px-4 py-6">
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              <button
                type="button"
                onClick={prev}
                className="bg-white/90 hover:bg-white text-charcoal text-xs font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-sm"
              >
                {prevLabel}
              </button>
              <button
                type="button"
                onClick={next}
                className="bg-white/90 hover:bg-white text-charcoal text-xs font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-sm"
              >
                {nextLabel}
              </button>
              <button
                type="button"
                onClick={close}
                className="bg-white/90 hover:bg-white text-charcoal text-xs font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-sm"
              >
                {closeLabel}
              </button>
            </div>

            <div className="grid lg:grid-cols-5 gap-4 h-full pt-14">
              <div className="lg:col-span-3 h-[45vh] lg:h-full bg-black/20 rounded-sm overflow-hidden flex items-center justify-center">
                <img src={images[active]?.src} alt={images[active]?.alt} className="max-h-full max-w-full object-contain" />
              </div>

              <div className="lg:col-span-2 h-[35vh] lg:h-full overflow-auto rounded-sm bg-white/5 p-3">
                <div className="grid grid-cols-3 gap-3">
                  {images.map((img, idx) => (
                    <button
                      key={`${img.src}-${idx}`}
                      type="button"
                      onClick={() => setActive(idx)}
                      className={`overflow-hidden rounded-sm border transition-colors ${
                        idx === active ? "border-white" : "border-white/20 hover:border-white/60"
                      }`}
                      aria-label={`${thumbnailAriaPrefix} ${idx + 1}`}
                    >
                      <img src={img.src} alt={img.alt} className="h-20 w-full object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
