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
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedPhotoCount, setLoadedPhotoCount] = useState(0);
  const [isAlbumReady, setIsAlbumReady] = useState(false);

  const albumPhotos: WeddingPhoto[] = [
    ...(coverImage
      ? [{ src: coverImage, alt: "Ảnh bìa cưới của Bùi Diễn và Ngọc Chinh" }]
      : []),
    ...images,
  ];

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

  useEffect(() => {
    setActiveIndex(0);
    setLoadedPhotoCount(0);
    setIsAlbumReady(albumPhotos.length === 0);

    if (albumPhotos.length === 0) return;

    let loadedCount = 0;
    let cancelled = false;
    const markAsLoaded = () => {
      loadedCount += 1;
      if (cancelled) return;
      setLoadedPhotoCount(loadedCount);
      if (loadedCount === albumPhotos.length) setIsAlbumReady(true);
    };

    albumPhotos.forEach((photo) => {
      const image = new Image();
      image.onload = markAsLoaded;
      image.onerror = markAsLoaded;
      image.src = photo.src;
    });

    return () => {
      cancelled = true;
    };
  }, [coverImage, images]);

  const activeAlbumPhoto = albumPhotos[activeIndex];
  const showPreviousPhoto = () => setActiveIndex((current) => (current - 1 + albumPhotos.length) % albumPhotos.length);
  const showNextPhoto = () => setActiveIndex((current) => (current + 1) % albumPhotos.length);

  return (
    <section ref={rootRef} className="relative min-h-0 overflow-hidden bg-[#f4ebe3] px-3 py-14 md:min-h-[100svh] sm:px-6 sm:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <header className={`mb-8 text-center transition-all duration-1000 sm:mb-10 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <p className="text-[9px] uppercase tracking-[0.5em] text-[#a8872b]">Những khoảnh khắc</p>
          <h2 className="mt-3 font-script text-5xl text-[#800020] min-[380px]:text-6xl sm:text-7xl">Chuyện Mình Qua Ảnh</h2>
        </header>

        <div className={`mx-auto w-full max-w-3xl transition-all delay-200 duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          {!isAlbumReady ? (
            <div className="flex min-h-[24rem] flex-col items-center justify-center rounded-[2rem] border border-[#d4af37]/20 bg-white/35 text-[#800020]/60 shadow-[0_24px_80px_rgba(92,35,45,0.08)]">
              <span className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[#d4af37]/25 border-t-[#800020]" />
              <p className="text-[10px] uppercase tracking-[0.3em]">Đang tải album</p>
              <p className="mt-2 text-xs text-[#800020]/45">{loadedPhotoCount}/{albumPhotos.length} ảnh</p>
            </div>
          ) : activeAlbumPhoto ? (
            <>
              <div className="relative mx-auto w-full max-w-[25rem] px-8 sm:max-w-[28rem] sm:px-10">
                <div className="wedding-photo-frame overflow-hidden rounded-[2rem] p-0.5 shadow-[0_24px_60px_rgba(92,35,45,0.18)] sm:rounded-[2.5rem] sm:p-1">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] bg-[#eadbd0] sm:rounded-[2.2rem]">
                    <button
                      type="button"
                      aria-label={`Xem lớn ${activeAlbumPhoto.alt}`}
                      onClick={() => setActivePhoto(activeAlbumPhoto)}
                      className="group h-full w-full cursor-zoom-in"
                    >
                      <img
                        src={activeAlbumPhoto.src}
                        alt={activeAlbumPhoto.alt}
                        decoding="async"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </button>
                  </div>
                </div>
                {albumPhotos.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Ảnh trước"
                      onClick={showPreviousPhoto}
                      className="absolute left-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-[#800020] shadow-lg transition hover:scale-110 hover:bg-white"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      aria-label="Ảnh tiếp theo"
                      onClick={showNextPhoto}
                      className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-[#800020] shadow-lg transition hover:scale-110 hover:bg-white"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {albumPhotos.length > 1 && (
                <div className="mt-6 flex gap-2 overflow-x-auto px-1 pb-2 sm:mt-7 sm:justify-center sm:gap-3">
                  {albumPhotos.map((photo, index) => (
                    <button
                      key={photo.src}
                      type="button"
                      aria-label={`Chọn ${photo.alt}`}
                      aria-current={index === activeIndex}
                      onClick={() => setActiveIndex(index)}
                      className={`w-14 shrink-0 overflow-hidden rounded-xl border-2 bg-white p-0.5 shadow-sm transition duration-300 sm:w-20 sm:rounded-2xl ${index === activeIndex ? "scale-105 border-[#800020] shadow-md" : "border-white/80 opacity-70 hover:scale-105 hover:opacity-100"}`}
                    >
                      <img src={photo.src} alt="" loading="eager" decoding="async" className="aspect-[3/4] w-full rounded-lg object-cover sm:rounded-xl" />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <EmptyPhoto label="Album ảnh cưới" />
          )}
        </div>

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
