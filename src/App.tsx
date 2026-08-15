import { useState, useRef, useEffect, useMemo } from "react";
import { Welcome } from "./components/Welcome";
import { OurStory } from "./components/OurStory";
import { WeddingWishes } from "./components/WeddingWishes";
import { WeddingSchedule } from "./components/WeddingSchedule";
import { ThankYou } from "./components/ThankYou";
import { MusicToggle } from "./components/MusicToggle";
import { WeddingMonogram } from "./components/WeddingMonogram";
import { WeddingGallery } from "./components/WeddingGallery";
import weddingPhoto1 from "./assets/wedding/1.webp";
import weddingPhoto2 from "./assets/wedding/2.webp";
import weddingPhoto3 from "./assets/wedding/3.webp";
import weddingPhoto4 from "./assets/wedding/4.webp";
import weddingPhoto5 from "./assets/wedding/5.webp";
import { WEDDING } from "./config/wedding";
import "./index.css";

const COUPLE = {
  groomName: WEDDING.groomName,
  brideName: WEDDING.brideName,
} as const;

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const programmaticScrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const isProgrammaticScrollingRef = useRef(false);
  const scrollFrameRef = useRef<number | null>(null);
  const currentPageRef = useRef(0);

  const sections = useMemo(() => [
    <Welcome
      key="welcome"
      groomName={COUPLE.groomName}
      brideName={COUPLE.brideName}
      groomAlias="Chú rể"
      brideAlias="Cô dâu"
      weddingDate={WEDDING.dateDisplay}
    />,
    <WeddingSchedule
      key="schedule"
      groomName={COUPLE.groomName}
      brideName={COUPLE.brideName}
    />,
    <OurStory
      key="story"
      title="Lời Ngỏ"
      story="Chúng mình gặp nhau giữa những điều giản dị, rồi chọn cùng nhau đi qua những ngày bình thường. Cảm ơn bạn đã ở đây để chứng kiến chương mới của chúng mình."
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
    <WeddingWishes key="wishes" />,
    <ThankYou
      key="thankyou"
      weddingDate={WEDDING.dateSlash}
      message="Chúng mình rất mong được đón bạn đến chung vui và sẻ chia những khoảnh khắc ý nghĩa trong ngày trọng đại. Sự hiện diện của bạn sẽ là niềm vui và là món quà quý giá đối với chúng mình."
    />,
  ], []);

  // Track the visible section without starting another smooth scroll.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sectionElements = Array.from(
      container.querySelectorAll<HTMLElement>(".section"),
    );
    let sectionOffsets = sectionElements.map((section) => section.offsetTop);

    const updateOffsets = () => {
      sectionOffsets = sectionElements.map((section) => section.offsetTop);
    };

    const updateCurrentPage = () => {
      scrollFrameRef.current = null;
      if (isProgrammaticScrollingRef.current) return;

      const anchor = container.scrollTop + container.clientHeight * 0.35;
      let nearest = 0;
      for (let index = 1; index < sectionOffsets.length; index += 1) {
        if (sectionOffsets[index] <= anchor) nearest = index;
        else break;
      }

      if (nearest !== currentPageRef.current) {
        currentPageRef.current = nearest;
        setCurrentPage(nearest);
      }
    };

    const handleScroll = () => {
      if (scrollFrameRef.current === null) {
        scrollFrameRef.current = window.requestAnimationFrame(updateCurrentPage);
      }
    };

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateOffsets)
        : null;
    sectionElements.forEach((section) => resizeObserver?.observe(section));
    window.addEventListener("resize", updateOffsets, { passive: true });
    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateOffsets);
      resizeObserver?.disconnect();
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
        scrollFrameRef.current = null;
      }
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [isInvitationOpen, sections.length]);

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
      currentPageRef.current = nextPage;
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
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden app-shell">
      {!isInvitationOpen && (
        <div className="invitation-overlay fixed inset-0 z-[100] flex items-center justify-center px-4 py-[max(1rem,env(safe-area-inset-top))] transition-opacity duration-700">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,#6f2943_0%,#3b1827_42%,#21131a_100%)]" />

          <div className="invitation-card relative w-full max-w-[410px] overflow-hidden rounded-[2rem] border border-[#d8b777]/45 bg-[#fffdfb] p-7 text-center text-[#741d35] shadow-[0_30px_90px_rgba(0,0,0,0.4)] sm:rounded-[2.5rem] sm:p-10">
            <p className="relative text-[9px] uppercase tracking-[0.48em] text-[#a37d49]">Thiệp cưới</p>
            <div className="relative mx-auto my-5 flex h-28 w-28 items-center justify-center rounded-full border border-[#b89258]/60 bg-[#741d35] text-[#f7e5a8] shadow-[0_14px_30px_rgba(116,29,53,0.2)] sm:my-7 sm:h-32 sm:w-32">
              <WeddingMonogram className="text-[7.5rem] sm:text-[8.5rem]" />
            </div>
            <h1 className="relative font-script text-5xl leading-none text-[#741d35] sm:text-6xl">{COUPLE.groomName}</h1>
            <p className="relative my-1 font-script text-2xl text-[#b89258]">&</p>
            <h1 className="relative font-script text-5xl leading-none text-[#741d35] sm:text-6xl">{COUPLE.brideName}</h1>
            <div className="relative mx-auto my-6 h-px w-16 bg-[#b89258]/60 sm:my-8" />
            <button
              type="button"
              className="group relative min-h-12 overflow-hidden rounded-full bg-[#741d35] px-9 py-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#fffaf3] shadow-[0_10px_22px_rgba(116,29,53,0.2)] transition hover:-translate-y-0.5 hover:bg-[#5a1629]"
              onClick={() => setIsInvitationOpen(true)}
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Mở thiệp</span>
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
