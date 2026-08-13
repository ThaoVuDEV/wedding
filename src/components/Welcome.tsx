import { useEffect, useState } from "react";
import { WeddingMonogram } from "./WeddingMonogram";

interface WelcomeProps {
  groomName: string;
  brideName: string;
  groomAlias?: string;
  brideAlias?: string;
  bgImage?: string;
  weddingDate: string;
  weddingTime: string;
}

export const Welcome = ({ groomName, brideName, weddingDate, weddingTime }: WelcomeProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), 200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#f7f0e8] px-5 py-10 sm:px-6 sm:py-16">
      <div className="absolute -bottom-20 -left-12 font-script text-[18rem] leading-none text-[#800020]/[0.035] md:text-[26rem]">
        D
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-7 sm:gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <div
          className={`flex flex-col items-center text-center transition-all duration-1000 md:items-start md:text-left ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
        >
          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-[#d4af37]/60 sm:h-36 sm:w-36 md:h-44 md:w-44">
            <div className="flex h-[82%] w-[82%] items-center justify-center rounded-full bg-[#800020] text-[#f7e5a8] shadow-2xl">
              <WeddingMonogram className="text-6xl sm:text-7xl md:text-8xl" />
            </div>
          </div>
        </div>

        <div
          className={`border-t border-[#d4af37]/35 pt-6 text-center transition-all delay-300 duration-1000 md:border-l md:border-t-0 md:pl-14 md:pt-0 md:text-left ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h1 className="font-script text-5xl leading-[0.95] text-[#800020] sm:text-6xl md:text-8xl lg:text-9xl">
            {groomName}
          </h1>
          <div className="my-3 flex items-center justify-center gap-4 text-[#d4af37] md:my-4 md:justify-start">
            <span className="h-px w-20 bg-current" />
            <span className="font-script text-3xl">and</span>
          </div>
          <h1 className="font-script text-5xl leading-[0.95] text-[#800020] sm:text-6xl md:text-8xl lg:text-9xl">
            {brideName}
          </h1>

          <div className="mt-7 flex items-center justify-center gap-4 border-t border-[#d4af37]/30 pt-5 font-script text-xl text-[#800020] md:justify-start md:gap-6 sm:text-2xl">
            <p>{weddingDate}</p>
            <span className="h-10 w-px bg-[#d4af37]/40" />
            <p>{weddingTime}</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 hidden h-10 w-px -translate-x-1/2 bg-[#800020]/30 sm:block" />
    </section>
  );
};
