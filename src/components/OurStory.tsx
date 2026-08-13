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
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={rootRef} className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#741d35] px-5 py-14 text-white sm:px-6 sm:py-20">
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-[#d8b777]/20" />
      <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full border border-[#d8b777]/10" />
      <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#4a1224]/35 blur-3xl" />

      <div className="relative mx-auto w-full max-w-5xl">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-[0.55fr_1.45fr] md:gap-20">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <p className="text-[9px] uppercase tracking-[0.5em] text-[#e7c98e]">Một lời nhắn nhỏ</p>
            <h2 className="mt-4 font-script text-6xl text-[#fff1cf] sm:mt-5 sm:text-7xl md:text-8xl">{title}</h2>
            <div className="mt-6 h-px w-16 bg-[#d8b777] sm:mt-8" />
          </div>

          <div className={`transition-all delay-300 duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <span className="font-serif text-8xl leading-none text-[#d8b777]/30">“</span>
            <p className="-mt-8 max-w-2xl text-lg font-light leading-8 text-white/85 sm:text-xl sm:leading-9 md:text-3xl md:leading-10">{story}</p>
            {quote && <p className="mt-8 font-script text-2xl text-[#fff1cf] sm:mt-10 sm:text-3xl">{quote}</p>}
          </div>
        </div>

        <div className="mt-14 flex items-center gap-4 text-[9px] uppercase tracking-[0.35em] text-white/45 sm:mt-20">
          <span className="h-px w-12 bg-[#d8b777]/60" />
          <span>Diễn & Chinh</span>
        </div>
      </div>
    </section>
  );
};
