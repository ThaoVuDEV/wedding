import { useEffect, useState } from "react";
import { WeddingMonogram } from "./WeddingMonogram";

interface WelcomeProps {
  groomName: string;
  brideName: string;
  groomAlias?: string;
  brideAlias?: string;
  bgImage?: string;
}

export const Welcome = ({ groomName, brideName }: WelcomeProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), 200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#f7f0e8] px-6 py-16">
      <div className="absolute left-0 top-0 h-full w-[14px] bg-[#800020] md:w-[22px]" />
      <div className="absolute right-8 top-8 text-[10px] uppercase tracking-[0.5em] text-[#800020]/40 [writing-mode:vertical-rl]">
        November · Twenty Twenty Six
      </div>
      <div className="absolute -bottom-20 -left-12 font-script text-[18rem] leading-none text-[#800020]/[0.035] md:text-[26rem]">
        D
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <div
          className={`transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
        >
          <p className="mb-5 text-[10px] uppercase tracking-[0.55em] text-[#a8872b]">
            The wedding of
          </p>
          <div className="flex h-36 w-36 items-center justify-center rounded-full border border-[#d4af37]/60 md:h-44 md:w-44">
            <div className="flex h-[82%] w-[82%] items-center justify-center rounded-full bg-[#800020] text-[#f7e5a8] shadow-2xl">
              <WeddingMonogram className="text-7xl md:text-8xl" />
            </div>
          </div>
          <p className="mt-7 max-w-xs text-sm font-light leading-7 text-gray-500">
            Một ngày tháng Mười Một, chúng mình sẽ cùng bước sang một chương mới.
            Cảm ơn bạn vì đã có mặt trong hành trình ấy.
          </p>
        </div>

        <div
          className={`border-l border-[#d4af37]/35 pl-7 transition-all delay-300 duration-1000 md:pl-14 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#800020]/45">
            Save our date · XX.11.2026
          </p>
          <h1 className="font-script text-6xl leading-[0.95] text-[#800020] md:text-8xl lg:text-9xl">
            {groomName}
          </h1>
          <div className="my-4 flex items-center gap-4 text-[#d4af37]">
            <span className="h-px w-20 bg-current" />
            <span className="font-script text-3xl">and</span>
          </div>
          <h1 className="font-script text-6xl leading-[0.95] text-[#800020] md:text-8xl lg:text-9xl">
            {brideName}
          </h1>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[#800020]/45">
        <span className="text-[9px] uppercase tracking-[0.35em]">Khám phá</span>
        <span className="h-10 w-px bg-current" />
      </div>
    </section>
  );
};
