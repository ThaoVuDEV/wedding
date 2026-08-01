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
import "./index.css";

const COUPLE = {
  groomName: "Bùi Diễn",
  brideName: "Ngọc Chinh",
} as const;

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

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

  // Handle scroll to section
  useEffect(() => {
    if (containerRef.current) {
      setIsScrolling(true);
      const container = containerRef.current;
      const children = Array.from(container.children) as HTMLElement[];
      const target = children[currentPage]?.offsetTop ?? 0;
      container.scrollTo({ top: target, behavior: "smooth" });

      // Allow scroll detection after animation completes
      const timer = setTimeout(() => {
        setIsScrolling(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  // Handle native scroll with better throttle
  useEffect(() => {
    const handleScroll = () => {
      // Ignore scroll events triggered by programmatic scrollTo
      if (isScrolling) return;

      if (containerRef.current) {
        const container = containerRef.current;
        const scrollPosition = container.scrollTop;

        const children = Array.from(container.children) as HTMLElement[];
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
          }, 150);
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
  }, [currentPage, sections.length, isScrolling]);

  // Handle arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isInvitationOpen) return;
      if (e.key === "ArrowDown" && currentPage < sections.length - 1) {
        setCurrentPage(currentPage + 1);
      } else if (e.key === "ArrowUp" && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, sections.length, isInvitationOpen]);

  return (
    <div className="relative w-screen h-screen overflow-hidden app-shell">
      {!isInvitationOpen && (
        <div className="invitation-overlay fixed inset-0 z-[100] flex items-center justify-center bg-[#fdfaf6] transition-opacity duration-1000">
          {/* Lớp nền mờ ảo phía sau */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#800020] via-[#5f0018] to-[#2f000c]" />

          <div className="relative w-[88%] max-w-[430px] overflow-hidden rounded-[2.5rem] border border-[#d4af37]/40 bg-[#6d001b] p-8 text-center text-white shadow-[0_30px_90px_rgba(0,0,0,0.45)] md:p-12">
            <div className="absolute -left-10 -top-16 font-script text-[13rem] leading-none text-white/[0.035]">D</div>
            <div className="absolute -bottom-20 -right-5 font-script text-[13rem] leading-none text-white/[0.035]">C</div>
            <div className="absolute inset-3 rounded-[1.8rem] border border-[#d4af37]/20" />

            <p className="relative text-[9px] uppercase tracking-[0.55em] text-[#e4ca77]">Private invitation</p>
            <div className="relative mx-auto my-8 flex h-24 w-24 items-center justify-center rounded-full border border-[#d4af37]/60">
              <WeddingMonogram className="text-5xl text-[#f7e5a8]" />
            </div>
            <h1 className="relative font-script text-5xl leading-tight text-[#fff8e6] md:text-6xl">{COUPLE.groomName}</h1>
            <p className="relative my-1 font-script text-2xl text-[#d4af37]">and</p>
            <h1 className="relative font-script text-5xl leading-tight text-[#fff8e6] md:text-6xl">{COUPLE.brideName}</h1>
            <div className="relative mx-auto my-8 h-px w-24 bg-[#d4af37]/50" />
            <p className="relative text-xs uppercase tracking-[0.3em] text-white/65">XX · 11 · 2026</p>
            <p className="relative mt-3 text-xs font-light text-white/45">Trân trọng mời bạn đến chung vui</p>
            <button
              type="button"
              className="group relative mt-8 overflow-hidden rounded-full bg-[#f7e5a8] px-10 py-3.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#800020] transition hover:-translate-y-0.5 hover:bg-white"
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
        className={`relative w-full h-screen overflow-y-scroll transition-opacity duration-700 ${
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
              className={`section w-full flex-shrink-0 section-fade ${
                currentPage === idx ? "is-active" : ""
              }`}
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
