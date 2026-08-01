import React, { useRef, useState, useEffect } from "react";

interface MemoriesProps {
  images: { src: string; alt: string }[];
}

export const Memories: React.FC<MemoriesProps> = ({ images }) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (idx: number) => {
    setCurrentIndex(idx);
  };

  const handleImageError = (idx: number) => {
    setImageErrors((prev) => new Set(prev).add(idx));
    console.error(`Failed to load image ${idx}:`, images[idx]?.src);
  };

  return (
    <section
      ref={rootRef}
      className="relative w-full flex flex-col items-center justify-center overflow-hidden pt-20"
      style={{ background: "#fbf7f1" }}
    >
      {/* Background Decor chìm: Nhành hoa ở góc dưới */}
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-10 pointer-events-none">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#d4af37]"
        >
          <path
            d="M0 100 C40 100 100 60 100 0"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        </svg>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
        {/* Title tinh chỉnh đồng điệu với Our Story */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <p className="font-script text-[#d4af37] text-sm tracking-[0.4em] mb-4 uppercase">
            Visual Memories
          </p>
          <h2 className="font-script text-4xl md:text-5xl text-[#800020] relative inline-block">
            ALBUM OF LOVE
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-[#d4af37]" />
          </h2>
        </div>

        {/* Main Image Container */}
        <div
          className={`relative w-full max-w-4xl mb-12 mx-auto transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          {/* Main Image with frame */}
          <div
            className="relative p-[4px] overflow-hidden rounded-[2rem] shadow-2xl group mx-auto max-w-[450px]"
            style={{ aspectRatio: "4/6" }}
          >
            {/* Viền hào quang chuyển động */}
            <div
              className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] opacity-100"
              style={{
                background:
                  "conic-gradient(from 90deg at 50% 50%, #800020 0%, #dec67b 25%, #800020 50%, #dec67b 75%, #800020 100%)",
              }}
            />

            {/* Khung nội dung chính bên trong */}
            <div className="relative w-full h-full bg-white rounded-[1.8rem] overflow-hidden flex flex-col">
              {images.length === 0 ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#fbf7f1] to-[#f2e7dc] text-center px-6">
                  <span className="text-6xl text-[#d4af37]/60 mb-5">♡</span>
                  <p className="font-script text-xl text-[#800020]/70">
                    Album ảnh sẽ được cập nhật
                  </p>
                </div>
              ) : imageErrors.has(currentIndex) ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <p className="text-gray-400 mb-2 font-serif">
                      Không thể tải ảnh
                    </p>
                    <p className="text-xs text-gray-300">
                      Vui lòng kiểm tra liên kết
                    </p>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={images[currentIndex]?.src}
                    alt={images[currentIndex]?.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    onError={() => handleImageError(currentIndex)}
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              )}

              {/* Fullscreen button */}
              {images.length > 0 && <button
                onClick={() => setIsFullscreen(true)}
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-md rounded-full p-2.5 shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 active:scale-95 z-20"
              >
                <svg
                  className="w-4 h-4 text-[#800020]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M3 3l6 0M3 3L3 9M21 3l-6 0M21 3L21 9M3 21l6 0M3 21L3 15M21 21l-6 0M21 21L21 15"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>}

              {/* Viền decor mảnh bên trong */}
              <div className="absolute inset-2 border border-white/30 rounded-[1.4rem] pointer-events-none z-10" />
            </div>
          </div>

          {/* Left Arrow - Tinh chỉnh mỏng và sang hơn */}
          {images.length > 1 && <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-[#800020] hover:text-white transition-all duration-300 z-20 group"
          >
            <svg
              className="w-5 h-5 text-[#800020] group-hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>}

          {/* Right Arrow - Tinh chỉnh mỏng và sang hơn */}
          {images.length > 1 && <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-[#800020] hover:text-white transition-all duration-300 z-20 group"
          >
            <svg
              className="w-5 h-5 text-[#800020] group-hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>}
        </div>

        {/* Thumbnails (Polaroid style) */}
        {images.length > 0 && <div
          className={`flex gap-3 justify-center flex-wrap max-w-4xl p-4 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {images.map((image, idx) => {
            const isActive = currentIndex === idx;

            return (
              <button
                key={idx}
                onClick={() => handleThumbnailClick(idx)}
                className={`relative transition-all duration-500 ease-in-out ${
                  isActive
                    ? "z-20 scale-110 rotate-0 translate-y-[-5px]"
                    : "z-10 scale-90 opacity-50 blur-[0.5px] grayscale-[20%] hover:opacity-100 hover:blur-0 hover:grayscale-0 hover:translate-y-[-2px]"
                }`}
              >
                {/* Hiệu ứng tia sáng loé nhẹ */}
                {isActive && (
                  <>
                    <div className="absolute inset-[-6px] bg-red-100/50 rounded-full blur-lg animate-pulse" />
                    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] animate-ping z-30" />
                  </>
                )}

                {/* Khung ảnh Polaroid */}
                <div
                  className={`relative bg-white p-1 pb-3.5 shadow-lg border border-gray-100
                    ${idx % 2 === 0 ? "rotate-2" : "-rotate-2"} 
                    ${isActive ? "!rotate-0" : ""} 
                    transition-transform duration-500`}
                >
                  <div className="w-12 h-12 overflow-hidden border border-gray-50 bg-gray-100">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={() => handleImageError(idx)}
                      crossOrigin="anonymous"
                    />
                  </div>

                  {/* Hiệu ứng bóng sáng quét qua */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                      className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent 
                        translate-x-[-200%] transition-transform duration-1000
                        ${isActive ? "animate-[shimmer_2.5s_infinite]" : ""}`}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>}

        {/* Image counter - Font Serif lãng mạn hơn */}
        {images.length > 0 && <div
          className={`mt-4 text-center transition-opacity duration-1000 delay-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <p className="text-sm font-serif italic text-gray-500">
            {currentIndex + 1} <span className="text-[#d4af37]">/</span>{" "}
            {images.length}
          </p>
        </div>}

        {/* Fullscreen Modal - Tinh chỉnh phông đen mờ cao cấp hơn */}
        {isFullscreen && (
          <div
            className="fixed inset-0 backdrop-blur-md bg-black/90 z-[100] flex items-center justify-center animate-in fade-in duration-300"
            onClick={() => setIsFullscreen(false)}
          >
            <div
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 rounded-full p-3 transition z-50"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Fullscreen Image */}
              <div className="relative p-2 bg-white rounded-lg shadow-2xl max-w-[90vw] max-h-[80vh] overflow-hidden">
                <img
                  src={images[currentIndex]?.src}
                  alt={images[currentIndex]?.alt}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  onError={() => handleImageError(currentIndex)}
                  crossOrigin="anonymous"
                />
              </div>

              {/* Navigation in Fullscreen (Mỏng hơn) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition"
              >
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition"
              >
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Counter in Fullscreen */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/70 text-sm font-serif bg-black/50 px-4 py-2 rounded-full">
                {currentIndex + 1} / {images.length}
              </div>
            </div>
          </div>
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shimmer {
          0% { transform: translateX(-200%); }
          100% { transform: translateX(200%); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `,
        }}
      />
    </section>
  );
};
