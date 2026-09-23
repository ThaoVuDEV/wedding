import { useState, useRef, useEffect, useMemo } from "react";
import { Welcome } from "./components/Welcome";
import { OurStory } from "./components/OurStory";
import { WeddingWishes } from "./components/WeddingWishes";
import { WeddingSchedule } from "./components/WeddingSchedule";
import { ThankYou } from "./components/ThankYou";
import { MusicToggle } from "./components/MusicToggle";
import { WeddingMonogram } from "./components/WeddingMonogram";
import { WeddingGallery } from "./components/WeddingGallery";
import { WeddingDateInfo } from "./components/WeddingDateInfo";
import { WeddingCountdown } from "./components/WeddingCountdown";
import featuredPhoto from "../images/new/2.jpg";
import galleryPhoto3 from "../images/new/3.jpg";
import galleryPhoto4 from "../images/new/4.jpg";
import galleryPhoto6 from "../images/new/6.jpg";
import galleryPhoto7 from "../images/new/7.jpg";
import galleryPhoto8 from "../images/new/8.jpg";
import galleryPhoto9 from "../images/new/9.jpg";
import galleryPhoto10 from "../images/new/10.jpg";
import galleryPhoto11 from "../images/new/11.jpg";
import galleryPhoto12 from "../images/new/12.jpg";
import galleryPhoto13 from "../images/new/13.jpg";
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
    <OurStory
      key="story"
      title="Lời Ngỏ"
      image={featuredPhoto}
      story="Giữa những ngày bình thường, chúng mình gặp nhau, rồi nhận ra hạnh phúc đôi khi bắt đầu từ một người khiến ta muốn sẻ chia mọi điều. Từ hôm nay, chúng mình chọn cùng nhau đi qua những niềm vui, những thử thách và những ngày bình dị phía trước."
      quote="Bùi Diễn & Ngọc Chinh"
      highlights={[
        {
          title: "Tình yêu...",
          text: "Là khi hai trái tim tìm thấy nhau giữa cuộc đời rộng lớn, cùng lắng nghe, cùng sẻ chia và cùng lớn lên mỗi ngày.",
        },
        {
          title: "Chúng mình tin rằng...",
          text: "Hạnh phúc không nằm ở những điều quá lớn lao, mà ở việc luôn có một người để trở về và nắm tay nhau đi tiếp.",
        },
      ]}
    />,
    <WeddingGallery
      key="gallery"
      images={[
        { src: galleryPhoto3, alt: "Khoảnh khắc cưới 3" },
        { src: galleryPhoto4, alt: "Chú rể" },
        { src: galleryPhoto13, alt: "Cô dâu" },
        { src: galleryPhoto6, alt: "Khoảnh khắc cưới 6" },
        { src: galleryPhoto7, alt: "Khoảnh khắc cưới 7" },
        { src: galleryPhoto8, alt: "Khoảnh khắc cưới 8" },
        { src: galleryPhoto9, alt: "Khoảnh khắc cưới 9" },
        { src: galleryPhoto10, alt: "Khoảnh khắc cưới 10" },
        { src: galleryPhoto11, alt: "Cô dâu trên xe" },
        { src: galleryPhoto12, alt: "Khoảnh khắc cưới 12" },
      ]}
    />,
    <WeddingSchedule
      key="schedule"
      groomName={COUPLE.groomName}
      brideName={COUPLE.brideName}
    />,
    <WeddingCountdown key="countdown" />,
    <WeddingWishes key="wishes" />,
    <WeddingDateInfo
      key="date-info"
      groomName={COUPLE.groomName}
      brideName={COUPLE.brideName}
    />,
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
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center blur-[2px]"
            style={{ backgroundImage: `url(${featuredPhoto})` }}
          />
          <div className="absolute inset-0 bg-[#17070c]/65" />

          <div className="invitation-card relative w-full max-w-[410px] overflow-hidden rounded-[2rem] border border-[#d8b777]/45 bg-[#fffdfb] p-7 text-center text-[#741d35] shadow-[0_30px_90px_rgba(0,0,0,0.4)] sm:rounded-[2.5rem] sm:p-10">
            <p className="relative text-[9px] uppercase tracking-[0.48em] text-[#a37d49]">Thiệp cưới</p>
            <div className="relative mx-auto my-5 flex h-28 w-28 items-center justify-center rounded-full border border-[#b89258]/60 bg-[#741d35] text-[#f7e5a8] shadow-[0_14px_30px_rgba(116,29,53,0.2)] sm:my-7 sm:h-32 sm:w-32">
              <WeddingMonogram className="text-[7.5rem] sm:text-[8.5rem]" />
            </div>
            <h1 className="relative font-script text-5xl leading-none text-[#741d35] sm:text-6xl">{COUPLE.groomName}</h1>
            <p className="relative my-1 font-script text-2xl text-[#b89258]">&</p>
            <h1 className="relative font-script text-5xl leading-none text-[#741d35] sm:text-6xl">{COUPLE.brideName}</h1>
            <div className="relative mx-auto my-6 h-px w-16 bg-[#b89258]/60 sm:my-8" />
            <p className="relative font-serif text-lg font-semibold tracking-[0.16em] text-[#741d35] sm:text-xl">
              {WEDDING.dateDisplay}
            </p>
            <p className="relative mt-3 text-[9px] uppercase tracking-[0.45em] text-[#a37d49]">
              Thân mời
            </p>
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
