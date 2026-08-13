import { useState, useRef, useEffect } from "react";
import { Welcome } from "./components/Welcome";
import { OurStory } from "./components/OurStory";
import { WeddingWishes } from "./components/WeddingWishes";
import { WeddingSchedule } from "./components/WeddingSchedule";
import { ThankYou } from "./components/ThankYou";
import { MusicToggle } from "./components/MusicToggle";
import { Confetti } from "./components/Confetti";
import { PetalFall } from "./components/PetalFall";
import { WeddingMonogram } from "./components/WeddingMonogram";
import { WeddingGallery } from "./components/WeddingGallery";
import weddingPhoto1 from "./assets/wedding/1.webp";
import weddingPhoto2 from "./assets/wedding/2.webp";
import weddingPhoto3 from "./assets/wedding/3.webp";
import weddingPhoto4 from "./assets/wedding/4.webp";
import weddingPhoto5 from "./assets/wedding/5.webp";
import "./index.css";

const COUPLE = {
  groomName: "Bùi Diễn",
  brideName: "Ngọc Chinh",
} as const;

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const programmaticScrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const isProgrammaticScrollingRef = useRef(false);

  const sections = [
    <Welcome
      key="welcome"
      groomName={COUPLE.groomName}
      brideName={COUPLE.brideName}
      groomAlias="Chú rể"
      brideAlias="Cô dâu"
    />,
    <OurStory
      key="story"
      title="Lời Ngỏ"
      story="Chúng mình không mong một câu chuyện hoàn hảo, chỉ mong mỗi ngày đều có thể cùng nhau ăn một bữa cơm, kể vài chuyện nhỏ và bình yên đi qua những tháng năm dài. Tháng Mười Một này, chúng mình muốn chia sẻ niềm vui ấy với những người thân thương nhất."
      quote="Bùi Diễn & Ngọc Chinh"
    />,
    <WeddingGallery
      key="gallery"
      coverImage={weddingPhoto1}
      images={[
        { src: weddingPhoto2, alt: "Khoảnh khắc cưới 1" },
        { src: weddingPhoto3, alt: "Khoảnh khắc cưới 2" },
        { src: weddingPhoto4, alt: "Khoảnh khắc cưới 3" },
        { src: weddingPhoto5, alt: "Khoảnh khắc cưới 4" },
      ]}
    />,
    <WeddingSchedule
      key="schedule"
      groomName={COUPLE.groomName}
      brideName={COUPLE.brideName}
    />,
    <WeddingWishes key="wishes" />,
    <ThankYou
      key="thankyou"
      weddingDate="XX/11/2026"
      message="Niềm vui của chúng mình sẽ trọn vẹn hơn khi có bạn ở bên. Hẹn gặp bạn vào một ngày thật đẹp của tháng Mười Một."
    />,
  ];

  // Track the visible section without starting another smooth scroll.
  useEffect(() => {
    const handleScroll = () => {
      if (isProgrammaticScrollingRef.current) return;

      if (containerRef.current) {
        const container = containerRef.current;
        const scrollPosition = container.scrollTop;

        const children = Array.from(
          container.querySelectorAll<HTMLElement>(".section"),
        );
        let nearest = 0;
        let minDist = Infinity;

        children.forEach((child, i) => {
          const offset = child.offsetTop;
          const dist = Math.abs(scrollPosition - offset);
          if (dist < minDist) {
            minDist = dist;
            nearest = i;
          }
        });

        // Only update if page actually changed
        if (
          nearest !== currentPage &&
          nearest < sections.length &&
          nearest >= 0
        ) {
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }
          scrollTimeoutRef.current = setTimeout(() => {
            setCurrentPage(nearest);
          }, 100);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      // Use passive listener for better scroll performance
      container.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentPage, sections.length]);

  // Handle arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isInvitationOpen) return;

      let nextPage = currentPage;
      if (e.key === "ArrowDown" && currentPage < sections.length - 1) {
        nextPage = currentPage + 1;
      } else if (e.key === "ArrowUp" && currentPage > 0) {
        nextPage = currentPage - 1;
      } else {
        return;
      }

      e.preventDefault();
      const container = containerRef.current;
      const target = container?.querySelectorAll<HTMLElement>(".section")[
        nextPage
      ];

      if (!container || !target) return;

      isProgrammaticScrollingRef.current = true;
      setCurrentPage(nextPage);
      container.scrollTo({ top: target.offsetTop, behavior: "smooth" });

      if (programmaticScrollTimeoutRef.current) {
        clearTimeout(programmaticScrollTimeoutRef.current);
      }
      programmaticScrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScrollingRef.current = false;
      }, 700);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, sections.length, isInvitationOpen]);

  useEffect(() => {
    return () => {
      if (programmaticScrollTimeoutRef.current) {
        clearTimeout(programmaticScrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden app-shell">
      {!isInvitationOpen && (
        <div className="invitation-overlay fixed inset-0 z-[100] flex items-center justify-center bg-[#fdfaf6] px-4 py-[max(1rem,env(safe-area-inset-top))] transition-opacity duration-1000">
          {/* Lớp nền mờ ảo phía sau */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#800020] via-[#5f0018] to-[#2f000c]" />

          <div className="relative w-full max-w-[430px] overflow-hidden rounded-[2rem] border border-[#d4af37]/40 bg-[#6d001b] p-6 text-center text-white shadow-[0_30px_90px_rgba(0,0,0,0.45)] sm:rounded-[2.5rem] sm:p-8 md:p-12">
            <div className="absolute -left-10 -top-16 font-script text-[13rem] leading-none text-white/[0.035]">D</div>
            <div className="absolute -bottom-20 -right-5 font-script text-[13rem] leading-none text-white/[0.035]">C</div>
            <div className="absolute inset-3 rounded-[1.8rem] border border-[#d4af37]/20" />

            <p className="relative text-[9px] uppercase tracking-[0.55em] text-[#e4ca77]">Private invitation</p>
            <div className="relative mx-auto my-5 flex h-20 w-20 items-center justify-center rounded-full border border-[#d4af37]/60 sm:my-8 sm:h-24 sm:w-24">
              <WeddingMonogram className="text-5xl text-[#f7e5a8]" />
            </div>
            <h1 className="relative font-script text-4xl leading-tight text-[#fff8e6] sm:text-5xl md:text-6xl">{COUPLE.groomName}</h1>
            <p className="relative my-1 font-script text-2xl text-[#d4af37]">and</p>
            <h1 className="relative font-script text-4xl leading-tight text-[#fff8e6] sm:text-5xl md:text-6xl">{COUPLE.brideName}</h1>
            <div className="relative mx-auto my-5 h-px w-24 bg-[#d4af37]/50 sm:my-8" />
            <p className="relative text-xs uppercase tracking-[0.3em] text-white/65">XX · 11 · 2026</p>
            <p className="relative mt-3 text-xs font-light text-white/45">Trân trọng mời bạn đến chung vui</p>
            <button
              type="button"
              className="group relative mt-6 min-h-12 overflow-hidden rounded-full bg-[#f7e5a8] px-9 py-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#800020] transition hover:-translate-y-0.5 hover:bg-white sm:mt-8"
              onClick={() => setIsInvitationOpen(true)}
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Mở lời mời</span>
            </button>
          </div>
        </div>
      )}

      {isInvitationOpen && (
        <>
          <MusicToggle
            audioUrl="https://res.cloudinary.com/dvglujyon/video/upload/v1776915359/leduong_pys4qs.mp3"
            shouldAutoPlay={isInvitationOpen}
          />
          {currentPage === 0 && <PetalFall />}
          {currentPage === 0 && <Confetti />}
        </>
      )}

      {/* Main container */}
      <div
        ref={containerRef}
        className={`relative h-[100dvh] w-full overflow-x-hidden overflow-y-auto transition-opacity duration-700 ${
          isInvitationOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          scrollBehavior: "smooth",
          msOverflowStyle: "none", // Hide scrollbar for IE and Edge
          scrollbarWidth: "none", // Hide scrollbar for Firefox
        }}
      >
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className="flex flex-col w-full h-full">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="section w-full flex-shrink-0"
            >
              {section}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
