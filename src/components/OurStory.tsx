import { useEffect, useRef, useState } from "react";

interface OurStoryProps {
  title?: string;
  story: string;
  quote?: string;
  image?: string;
  highlights?: Array<{ title: string; text: string }>;
}

export const OurStory = ({
  title = "Lời Ngỏ",
  story,
  quote,
  image,
  highlights = [],
}: OurStoryProps) => {
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
    <section ref={rootRef} className="relative flex min-h-0 items-center overflow-hidden bg-[#f8f1eb] px-5 py-14 text-[#741d35] md:min-h-[100svh] sm:px-6 sm:py-20">
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-[#d8b777]/30" />
      <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full border border-[#d8b777]/20" />
      <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#e9cbd0]/45 blur-3xl" />

      <div className="relative mx-auto w-full max-w-5xl">
        <div className="grid items-stretch gap-10 sm:gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          {image && (
            <div className={`group wedding-photo-frame h-full rounded-[2rem] p-0.5 shadow-[0_24px_70px_rgba(92,35,45,0.16)] transition-all duration-1000 sm:rounded-[2.5rem] sm:p-1 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}>
              <div className="relative aspect-[4/5] h-full overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] md:aspect-auto">
                <img
                  src={image}
                  alt="Khoảnh khắc cưới của Bùi Diễn và Ngọc Chinh"
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105 group-hover:brightness-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#741d35]/20 via-transparent to-[#f7e5a8]/25 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              </div>
            </div>
          )}

          <div className={`transition-all delay-300 duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <p className="text-[9px] uppercase tracking-[0.5em] text-[#a37d49]">Một lời nhắn nhỏ</p>
            <h2 className="mt-4 font-script text-6xl text-[#741d35] sm:mt-5 sm:text-7xl md:text-8xl">{title}</h2>
            <div className="mt-6 h-px w-16 bg-[#d8b777] sm:mt-8" />
            <span className="mt-7 block font-serif text-8xl leading-none text-[#b89258]/35">“</span>
            <p className="-mt-8 max-w-2xl text-lg font-light leading-8 text-[#625355] sm:text-xl sm:leading-9 md:text-2xl md:leading-10">{story}</p>
            {quote && <p className="mt-8 font-script text-2xl text-[#741d35] sm:mt-10 sm:text-3xl">{quote}</p>}
            <div className="mt-9 space-y-6 sm:mt-10">
              {highlights.map((highlight) => (
                <div key={highlight.title} className="border-l border-[#d8b777] pl-4 sm:pl-5">
                  <p className="font-script text-xl text-[#a3264c] sm:text-2xl">{highlight.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[#756568] sm:text-base sm:leading-7">{highlight.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex items-center gap-4 text-[9px] uppercase tracking-[0.35em] text-[#a37d49]/65 sm:mt-20">
          <span className="h-px w-12 bg-[#d8b777]/70" />
          <span>Diễn & Chinh</span>
        </div>
      </div>
    </section>
  );
};
