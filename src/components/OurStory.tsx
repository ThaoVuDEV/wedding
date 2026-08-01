import { useEffect, useRef, useState } from "react";

interface OurStoryProps {
  title?: string;
  story: string;
  quote?: string;
  image?: string;
}

export const OurStory = ({ title = "Lời Ngỏ", story, quote }: OurStoryProps) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={rootRef} className="relative flex min-h-screen items-center overflow-hidden bg-[#800020] px-6 py-20 text-white">
      <div className="absolute right-[-5rem] top-[-7rem] h-80 w-80 rounded-full border border-[#d4af37]/20" />
      <div className="absolute right-[-2rem] top-[-4rem] h-60 w-60 rounded-full border border-[#d4af37]/10" />

      <div className="relative mx-auto w-full max-w-5xl">
        <div className="grid gap-12 md:grid-cols-[0.55fr_1.45fr] md:gap-20">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#e1c66d]">From us, with love</p>
            <h2 className="mt-5 font-script text-6xl text-[#f7e5a8] md:text-7xl">{title}</h2>
            <div className="mt-8 h-px w-24 bg-[#d4af37]" />
          </div>

          <div className={`transition-all delay-300 duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <span className="font-serif text-8xl leading-none text-[#d4af37]/25">“</span>
            <p className="-mt-8 text-lg font-light leading-9 text-white/80 md:text-2xl md:leading-10">{story}</p>
            {quote && <p className="mt-10 font-script text-2xl text-[#f7e5a8]">— {quote}</p>}
          </div>
        </div>

        <div className="mt-20 grid gap-3 sm:grid-cols-3">
          {["Lắng nghe nhau", "Cùng nhau trưởng thành", "Thương nhau mỗi ngày"].map((value, index) => (
            <div key={value} className="border-t border-white/15 py-5">
              <span className="text-xs text-[#d4af37]">0{index + 1}</span>
              <p className="mt-2 font-script text-xl text-white/80">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
