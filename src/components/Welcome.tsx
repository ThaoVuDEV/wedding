import { useEffect, useState } from "react";
import { WeddingMonogram } from "./WeddingMonogram";
import weddingPhoto from "../../images/10.png";

interface WelcomeProps {
  groomName: string;
  brideName: string;
  groomAlias?: string;
  brideAlias?: string;
  bgImage?: string;
  weddingDate: string;
}

export const Welcome = ({
  groomName,
  brideName,
  groomAlias = "Chú rể",
  brideAlias = "Cô dâu",
  weddingDate,
}: WelcomeProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), 200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[#f7f0e8] px-6 py-8 sm:px-10 sm:py-12">
      <img
        src={weddingPhoto}
        alt="Khoảnh khắc cưới của Bùi Diễn và Ngọc Chinh"
        className="absolute inset-0 h-full w-full object-cover object-center"
        decoding="async"
      />
      <div className="absolute inset-0 bg-white/10" />
      <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-white/85 via-white/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-white/55 via-white/10 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-6xl items-end">
        <div className={`max-w-[21rem] pb-3 transition-all duration-1000 sm:max-w-xl sm:pb-5 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}>
          <div className="border-t border-[#8f0026]/30 pt-4 sm:pt-5">
            <div className="flex items-baseline gap-4">
              <span className="w-14 font-serif text-[10px] uppercase tracking-[0.3em] text-[#5d4a4d]">{groomAlias}</span>
              <span className="font-script text-4xl text-[#8f0026] sm:text-6xl">{groomName}</span>
            </div>
            <div className="mt-2 flex items-baseline gap-4 sm:mt-3">
              <span className="w-14 font-serif text-[10px] uppercase tracking-[0.3em] text-[#5d4a4d]">{brideAlias}</span>
              <span className="font-script text-4xl text-[#8f0026] sm:text-6xl">{brideName}</span>
            </div>
            <p className="mt-3 font-serif text-base italic text-[#8f0026] sm:text-lg">{weddingDate}</p>
          </div>
        </div>
      </div>

      <div className="absolute left-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/70 bg-[#800020] text-[#f7e5a8] shadow-[0_10px_25px_rgba(73,37,45,0.22)] sm:left-8 sm:top-8 sm:h-14 sm:w-14">
        <WeddingMonogram className="text-4xl sm:text-5xl" />
      </div>
    </section>
  );
};
