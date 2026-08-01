import React, { useRef, useEffect, useState } from "react";

interface WeddingDayProps {
  image?: string;
  mainText: string;
  description: string;
  shortStories?: { title: string; content: string }[];
}

export const WeddingDay: React.FC<WeddingDayProps> = ({
  image,
  mainText,
  description,
  shortStories = [],
}) => {
  const rootRef = useRef<HTMLElement | null>(null);
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

  const renderAnimatedLetters = (text: string) =>
    text.split("").map((ch, i) => (
      <span
        key={i}
        className={`inline-block transition-all duration-700 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
        style={{ transitionDelay: `${i * 0.05}s` }}
      >
        {ch === " " ? "\u00A0" : ch}
      </span>
    ));

  return (
    <section
      ref={rootRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24"
      style={{ background: "#fbf7f1" }}
    >
      {/* Background nhẹ nhàng hơn (giảm blur, tăng độ thanh thoát) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />

      <div className="relative z-10 w-full max-w-6xl px-6">
        <div className="relative flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          {/* CỘT TRÁI: ẢNH CHÍNH VỚI VIỀN ÁNH SÁNG (REUSE TỪ BƯỚC 1) */}
          <div
            className={`relative w-full md:w-1/2 transition-all duration-[1500ms] ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`}
          >
            {/* Lớp viền ánh sáng chạy quanh ảnh */}
            <div className="relative p-[6px] overflow-hidden rounded-2xl shadow-2xl group">
              <div
                className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] opacity-50"
                style={{
                  background:
                    "conic-gradient(from 90deg at 50% 50%, #800020 0%, #d4af37 25%, #800020 50%, #d4af37 75%, #800020 100%)",
                }}
              />
              <div className="relative bg-white rounded-xl overflow-hidden aspect-[3/4]">
                {image ? (
                  <img
                    src={image}
                    alt="Khoảnh khắc cưới"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#fbf7f1] to-[#f2e7dc] text-center px-6">
                    <span className="text-5xl text-[#d4af37]/60 mb-5">♡</span>
                    <p className="font-script text-xl text-[#800020]/70">
                      Ảnh cưới sẽ được cập nhật
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Họa tiết hoa văn góc vàng đồng */}
            <div className="absolute -top-6 -left-6 w-24 h-24 text-[#d4af37] opacity-40 animate-pulse">
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path d="M0 100 C0 40 40 0 100 0 L100 10 L10 10 L10 100 Z" />
              </svg>
            </div>
          </div>

          {/* CỘT PHẢI: NỘI DUNG CHỮ */}
          <div className="w-full md:w-1/2 space-y-8">
            <header className="space-y-4">
              <p
                className={`font-script text-[#d4af37] tracking-[0.4em] text-sm font-light transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
              >
                SAVOUR THE MOMENT
              </p>
              <h2 className="font-script text-4xl md:text-5xl lg:text-6xl text-[#800020] leading-[1.1]">
                {renderAnimatedLetters(mainText)}
              </h2>
            </header>

            <div
              className={`relative transition-all duration-1000 delay-[1000ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="absolute -left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#d4af37] to-transparent" />
              <p className="font-script text-gray-600 font-light text-lg italic leading-relaxed">
                {description}
              </p>
            </div>

            {/* Short Stories thiết kế dạng thẻ mảnh (Stationery Style) */}
            {shortStories.length > 0 && (
              <div className="space-y-8 pt-6">
                {shortStories.map((story, idx) => (
                  <div
                    key={idx}
                    className={`group transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                    style={{ transitionDelay: `${1.2 + idx * 0.2}s` }}
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <span className="w-8 h-[1px] bg-[#d4af37]" />
                      <h3 className="font-script text-[#800020] text-xl tracking-wide">
                        {story.title}
                      </h3>
                    </div>
                    <p className="text-gray-500 font-light leading-relaxed pl-12 text-sm md:text-base border-l border-transparent group-hover:border-[#d4af37]/30 transition-colors">
                      {story.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hiệu ứng hạt lấp lánh nhẹ (Dust) */}
      {isVisible && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#d4af37] rounded-full animate-ping opacity-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Nút scroll xuống đồng điệu với các phần trên */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <div className="w-[1px] h-10 bg-gradient-to-t from-[#800020] to-transparent" />
        <p className="font-script text-[10px] tracking-[0.2em] text-[#800020] uppercase font-bold">
          Ảnh của chúng mình
        </p>
      </div>
      <div className="absolute bottom-10 left-10 w-40 h-40 opacity-5 pointer-events-none grayscale">
        <img
          src="https://res.cloudinary.com/dvglujyon/image/upload/v1776937337/pngegg_2_kre1q3.png"
          alt="pattern"
          className="w-full h-full object-contain"
        />
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
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
