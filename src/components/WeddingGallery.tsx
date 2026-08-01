import { useEffect, useRef, useState } from "react";

interface WeddingPhoto {
  src: string;
  alt: string;
}

interface WeddingGalleryProps {
  coverImage?: string;
  images?: WeddingPhoto[];
}

const gallerySlots = ["Khoảnh khắc 01", "Khoảnh khắc 02", "Khoảnh khắc 03", "Khoảnh khắc 04"];

const EmptyPhoto = ({ label }: { label: string }) => (
  <div className="flex h-full min-h-48 w-full flex-col items-center justify-center bg-gradient-to-br from-[#f8f0e8] to-[#eadbd0] px-5 text-center">
    <span className="text-4xl text-[#d4af37]/60">♡</span>
    <p className="mt-3 text-[9px] uppercase tracking-[0.3em] text-[#800020]/40">{label}</p>
    <p className="mt-1 font-script text-lg text-[#800020]/55">Ảnh sẽ được cập nhật</p>
  </div>
);

export const WeddingGallery = ({ coverImage, images = [] }: WeddingGalleryProps) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.12 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={rootRef} className="relative min-h-screen overflow-hidden bg-[#f4ebe3] px-4 py-20 sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <header className={`mb-10 text-center transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#a8872b]">Our visual diary</p>
          <h2 className="mt-3 font-script text-5xl text-[#800020] sm:text-7xl">Chuyện Mình Qua Ảnh</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm font-light leading-7 text-gray-500">
            Nơi chúng mình lưu lại những khoảnh khắc đẹp nhất trước ngày về chung một nhà.
          </p>
        </header>

        <div className={`relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-2 shadow-[0_24px_80px_rgba(92,35,45,0.12)] transition-all delay-200 duration-1000 sm:rounded-[2.75rem] sm:p-3 ${isVisible ? "scale-100 opacity-100" : "scale-[0.97] opacity-0"}`}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] sm:aspect-[16/8] sm:rounded-[2.25rem]">
            {coverImage ? (
              <img src={coverImage} alt="Ảnh bìa cưới của Bùi Diễn và Ngọc Chinh" className="h-full w-full object-cover" />
            ) : (
              <EmptyPhoto label="Ảnh bìa cưới" />
            )}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2c000b]/80 to-transparent px-6 pb-7 pt-24 text-white sm:px-10 sm:pb-9">
              <p className="font-script text-3xl sm:text-5xl">Bùi Diễn · Ngọc Chinh</p>
              <p className="mt-2 text-[9px] uppercase tracking-[0.35em] text-white/60">Wedding · November 2026</p>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-7 sm:gap-5 lg:grid-cols-4">
          {gallerySlots.map((label, index) => {
            const photo = images[index];
            return (
              <div
                key={label}
                className={`overflow-hidden rounded-[1.4rem] border-4 border-white bg-white shadow-lg transition-all duration-700 sm:rounded-[1.8rem] ${index % 2 === 1 ? "mt-6" : "mb-6"} ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                style={{ transitionDelay: `${400 + index * 120}ms` }}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  {photo ? (
                    <img src={photo.src} alt={photo.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 hover:scale-105" />
                  ) : (
                    <EmptyPhoto label={label} />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-[10px] uppercase tracking-[0.35em] text-[#800020]/35">
          Ảnh bìa + 4 ảnh album đang chờ cập nhật
        </p>
      </div>
    </section>
  );
};
