import { useEffect, useState } from "react";
import { WeddingMonogram } from "./WeddingMonogram";

interface WelcomeProps {
  groomName: string;
  brideName: string;
  groomAlias?: string;
  brideAlias?: string;
  bgImage?: string;
  weddingDate: string;
}

export const Welcome = ({ groomName, brideName, weddingDate }: WelcomeProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), 200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#f7f0e8] px-5 py-8 sm:px-6 sm:py-16">
      <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center gap-7 sm:gap-10 md:grid md:max-w-6xl md:grid-cols-[0.8fr_1.2fr]">
        <div
          className={`flex flex-col items-center text-center transition-all duration-1000 md:items-start md:text-left ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"}`}
        >
          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-[#d4af37]/60 p-1.5 shadow-[0_12px_35px_rgba(128,0,32,0.12)] sm:h-36 sm:w-36 md:h-48 md:w-48">
            <div className="flex h-[82%] w-[82%] items-center justify-center rounded-full bg-[#800020] text-[#f7e5a8] shadow-2xl">
              <WeddingMonogram className="text-6xl sm:text-7xl md:text-9xl" />
            </div>
          </div>
        </div>

        <div
          className={`w-full border-t border-[#d4af37]/35 pt-5 text-center transition-all delay-300 duration-1000 md:border-l md:border-t-0 md:pl-14 md:pt-0 md:text-left ${isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}
        >
          <h1 className="font-script text-[3.25rem] leading-none text-[#800020] sm:text-6xl md:text-8xl lg:text-9xl">
            {groomName}
          </h1>
          <div className="my-2 flex items-center justify-center gap-3 text-[#d4af37] md:my-4 md:justify-start">
            <span className="h-px w-12 bg-current sm:w-20" />
            <span className="font-script text-2xl sm:text-3xl">and</span>
            <span className="h-px w-12 bg-current sm:hidden" />
          </div>
          <h1 className="font-script text-[3.25rem] leading-none text-[#800020] sm:text-6xl md:text-8xl lg:text-9xl">
            {brideName}
          </h1>

          <div className="mx-auto mt-6 flex max-w-xs items-center justify-center gap-4 border-t border-[#d4af37]/30 pt-4 font-script text-xl text-[#800020] sm:text-2xl md:mx-0 md:justify-start md:gap-6">
            <p>{weddingDate}</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 hidden h-10 w-px -translate-x-1/2 bg-[#800020]/30 sm:block" />
    </section>
  );
};
