import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface WeddingPhoto {
  src: string;
  alt: string;
}

interface WeddingGalleryProps {
  coverImage?: string;
  images?: WeddingPhoto[];
}

const EmptyPhoto = ({ label }: { label: string }) => (
  <div className="flex h-full min-h-48 w-full flex-col items-center justify-center bg-gradient-to-br from-[#f8f0e8] to-[#eadbd0] px-5 text-center">
    <span className="text-4xl text-[#d4af37]/60">♡</span>
    <p className="mt-3 text-[9px] uppercase tracking-[0.3em] text-[#800020]/40">{label}</p>
    <p className="mt-1 font-script text-lg text-[#800020]/55">Sắp có ảnh đẹp</p>
  </div>
);

export const WeddingGallery = ({ coverImage, images = [] }: WeddingGalleryProps) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activePhoto, setActivePhoto] = useState<WeddingPhoto | null>(null);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.12 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!activePhoto) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePhoto(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [activePhoto]);

  return (
    <section ref={rootRef} className="relative min-h-0 overflow-hidden bg-[#f4ebe3] px-3 py-14 md:min-h-[100svh] sm:px-6 sm:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <header className={`mb-8 text-center transition-all duration-1000 sm:mb-10 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <p className="text-[9px] uppercase tracking-[0.5em] text-[#a8872b]">Những khoảnh khắc</p>
          <h2 className="mt-3 font-script text-5xl text-[#800020] min-[380px]:text-6xl sm:text-7xl">Chuyện Mình Qua Ảnh</h2>
        </header>

        <div className={`wedding-photo-frame relative overflow-hidden rounded-[2rem] p-0.5 shadow-[0_24px_80px_rgba(92,35,45,0.12)] transition-all delay-200 duration-1000 sm:rounded-[2.75rem] sm:p-1 ${isVisible ? "scale-100 opacity-100" : "scale-[0.97] opacity-0"}`}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] sm:aspect-[16/8] sm:rounded-[2.25rem]">
            {coverImage ? (
              <button
                type="button"
                aria-label="Xem ảnh bìa cưới"
                onClick={() =>
                  setActivePhoto({
                    src: coverImage,
                    alt: "Ảnh bìa cưới của Bùi Diễn và Ngọc Chinh",
                  })
                }
                className="h-full w-full cursor-zoom-in"
              >
                <img src={coverImage} alt="Ảnh bìa cưới của Bùi Diễn và Ngọc Chinh" decoding="async" className="h-full w-full object-cover" />
              </button>
            ) : (
              <EmptyPhoto label="Ảnh bìa cưới" />
            )}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2c000b]/80 to-transparent px-6 pb-7 pt-24 text-white sm:px-10 sm:pb-9">
              <p className="font-script text-3xl sm:text-5xl">Bùi Diễn · Ngọc Chinh</p>
              <p className="mt-2 text-[9px] uppercase tracking-[0.35em] text-white/60">Tháng Mười Một · 2026</p>
            </div>
          </div>
        </div>

        {images.length > 0 && (
          <div className={`mt-5 grid grid-cols-2 gap-2 transition-all delay-300 duration-1000 sm:gap-3.5 lg:grid-cols-4 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            {images.map((photo, index) => (
              <div
                key={photo.src}
                className={`wedding-photo-frame overflow-hidden rounded-[1.2rem] p-0.5 shadow-lg transition duration-500 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(92,35,45,0.18)] sm:rounded-[1.6rem] ${index % 2 === 1 ? "mt-2" : "mb-2"}`}
              >
                <div className="aspect-square overflow-hidden rounded-[1rem] sm:rounded-[1.4rem]">
                  <button
                    type="button"
                    aria-label={`Xem ${photo.alt}`}
                    onClick={() => setActivePhoto(photo)}
                    className="group h-full w-full cursor-zoom-in overflow-hidden"
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {activePhoto &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Xem ảnh cưới"
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/90 p-3 backdrop-blur-md sm:p-8"
            onClick={() => setActivePhoto(null)}
          >
            <button
              type="button"
              aria-label="Đóng ảnh"
              onClick={() => setActivePhoto(null)}
              className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/30 text-3xl text-white sm:right-7 sm:top-7"
            >
              ×
            </button>
            <div className="flex h-full w-full items-center justify-center">
              <img
                src={activePhoto.src}
                alt={activePhoto.alt}
                onClick={(event) => event.stopPropagation()}
                className="max-h-[92dvh] max-w-full rounded-xl object-contain shadow-2xl sm:rounded-2xl"
              />
            </div>
            <p className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/45 px-4 py-2 text-[9px] uppercase tracking-[0.25em] text-white/65">
              Chạm bên ngoài để đóng
            </p>
          </div>,
          document.body,
        )}
    </section>
  );
};
