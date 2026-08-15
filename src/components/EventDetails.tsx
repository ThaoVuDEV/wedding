import React, { useEffect, useState, useRef } from "react";

interface EventDetailsProps {
  weddingDate: string;
  weddingTime: string;
  venue: string;
  address: string;
  groomPhone: string;
  groomName: string;
  bridePhone: string;
  brideName: string;
  mapUrl?: string;
  mapEmbed?: string;
  story?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface WeddingTimelineItem {
  time: string;
  label: string;
  icon: React.ReactNode;
}

// --- Icons Components ---
const TimelineIconSvg = ({ children }: { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    className="h-7 w-7"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    {children}
  </svg>
);

const TimelineGuestIcon = () => (
  <TimelineIconSvg>
    <ellipse
      cx="8.5"
      cy="4"
      rx="2.2"
      ry="0.75"
      fill="currentColor"
      stroke="none"
    />
    <path
      d="M6.5 4v6.2c0 1.6 1 2.9 2.5 3.2V17H5.5v1.5h4"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path d="M6.5 4v6.2c0 1.6 1 2.9 2.5 3.2V17H5.5v1.5h4" />
    <ellipse
      cx="15.5"
      cy="4"
      rx="2.2"
      ry="0.75"
      fill="currentColor"
      stroke="none"
    />
    <path
      d="M17.5 4v6.2c0 1.6-1 2.9-2.5 3.2V17H19v1.5h-4"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path d="M17.5 4v6.2c0 1.6-1 2.9-2.5 3.2V17H19v1.5h-4" />
    <path d="M10 11.8c.8.5 1.7.8 2.5.8s1.7-.3 2.5-.8" />
  </TimelineIconSvg>
);

const TimelineFeastIcon = () => (
  <TimelineIconSvg>
    <path d="M6 20h12M8 20v-2.5M16 20v-2.5" strokeWidth="1.1" />
    <path
      d="M5 17.5h14a1 1 0 0 0 1-.9l-1.2-4.5H5.2L4 16.6a1 1 0 0 0 1 1z"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path d="M5 17.5h14a1 1 0 0 0 1-.9l-1.2-4.5H5.2L4 16.6a1 1 0 0 0 1 1z" />
    <path d="M7.5 13h9l.8-3H6.7l.8 3z" fill="currentColor" fillOpacity="0.14" />
    <path d="M7.5 13h9l.8-3H6.7l.8 3z" />
    <path
      d="M9 9.5h6l.6-2.2H8.4l.6 2.2z"
      fill="currentColor"
      fillOpacity="0.18"
    />
    <circle cx="12" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </TimelineIconSvg>
);

const TimelineRingsIcon = () => (
  <TimelineIconSvg>
    <circle cx="8.5" cy="15" r="3.2" />
    <circle cx="15.5" cy="15" r="3.2" />
    <path d="M11.7 15.2c.6.5 1.5.5 2.1 0" />
    <path
      d="M12 4.2c-.3-.9-1.4-1.5-2.4-1.1-.9.4-1.3 1.5-.8 2.4.3.6 1 1 1.7 1l.1.1c.2-.5.6-.9 1.1-1.1.9-.4 2-.2 2.4.7.3.7 0 1.5-.7 1.9"
      fill="currentColor"
      fillOpacity="0.2"
    />
  </TimelineIconSvg>
);

const TimelineCameraIcon = () => (
  <TimelineIconSvg>
    <rect
      x="5"
      y="4"
      width="11"
      height="14"
      rx="1"
      fill="currentColor"
      fillOpacity="0.08"
    />
    <rect x="5" y="4" width="11" height="14" rx="1" />
    <circle cx="10.5" cy="11" r="2.5" fill="currentColor" fillOpacity="0.12" />
    <path d="M17.5 9.5h2.5v6a1 1 0 0 1-1 1h-1.5" />
  </TimelineIconSvg>
);

// --- Data ---
const engagementTimeline: WeddingTimelineItem[] = [
  // {
  //   time: "08:30",
  //   label: "Lễ dạm hỏi &",
  //   icon: <TimelineGuestIcon />,
  // },
  // {
  //   time: "09:30",
  //   label: "Đón tiếp khách mời",
  //   icon: <TimelineRingsIcon />,
  // },
  { time: "XXX", label: "Khai tiệc", icon: <TimelineFeastIcon /> },
  {
    time: "XXX",
    label: "Chụp hình lưu niệm",
    icon: <TimelineCameraIcon />,
  },
];

const weddingTimelineData: WeddingTimelineItem[] = [
  { time: "XXX", label: "Đón tiếp khách mời", icon: <TimelineGuestIcon /> },
  { time: "XXX", label: "Hôn lễ chính thức", icon: <TimelineRingsIcon /> },
  { time: "XXX", label: "Khai tiệc mừng", icon: <TimelineFeastIcon /> },
  {
    time: "XXX",
    label: "Cảm ơn & Chụp hình lưu niệm",
    icon: <TimelineCameraIcon />,
  },
];

// --- Sub-component: Popup Modal ---
const TimelinePopup = ({
  isOpen,
  onClose,
  title,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: WeddingTimelineItem[];
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[1000] flex items-center p-4 justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        style={{ marginTop: "160vh" }}
        className="relative bg-[#fbf7f1] w-full max-w-md rounded-[2.5rem] p-8 md:p-10 shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-[#800020] transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h3 className="font-['Cormorant_Garamond'] italic text-4xl text-[#800020] text-center mb-10 border-b border-[#800020]/10 pb-4">
          {title}
        </h3>

        <div className="space-y-8">
          {data.map((item, index) => (
            <div key={index} className="flex items-start gap-6">
              <div className="relative flex flex-col items-center">
                <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/40 bg-white text-[#800020] shadow-sm">
                  {item.icon}
                </div>
                {index < data.length - 1 && (
                  <div className="absolute top-12 w-[1px] h-10 bg-gradient-to-b from-[#d4af37]/40 to-transparent" />
                )}
              </div>
              <div className="pt-1">
                <p className="font-serif font-bold text-[#800020] text-xl">
                  {item.time}
                </p>
                <p className="font-['Cormorant_Garamond'] italic text-gray-700 text-lg leading-tight">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-10 py-3 bg-[#800020] text-white rounded-full font-['Cormorant_Garamond'] italic text-xl tracking-widest hover:bg-[#600018] transition-all"
        >
          Đóng
        </button>
      </div>
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
};

export const EventDetails: React.FC<EventDetailsProps> = ({
  weddingDate,
  groomPhone,
  groomName,
  bridePhone,
  brideName,
}) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeModal, setActiveModal] = useState<
    "engagement" | "wedding" | null
  >(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const invitationCards = [
    {
      title: "TIỆC CƯỚI NHÀ GÁI",
      schedule: "THỜI GIAN ĐANG CẬP NHẬT",
      date: "29 . 11 . 2026",
      lunarDate: "Ngày âm lịch: XXX",
      locationTitle: "TẠI TƯ GIA NHÀ GÁI",
      locationAddress: "XXX - Đang cập nhật",
      mapLink: "",
    },
    {
      title: "TIỆC CƯỚI NHÀ TRAI",
      schedule: "THỜI GIAN ĐANG CẬP NHẬT",
      date: "29 . 11 . 2026",
      lunarDate: "Ngày âm lịch: XXX",
      locationTitle: "TẠI TƯ GIA NHÀ TRAI",
      locationAddress: "XXX - Đang cập nhật",
      mapLink: "",
    },
  ];

  const hasExactWeddingDate = /^\d{4}-\d{2}-\d{2}$/.test(weddingDate);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasExactWeddingDate) return;

    const timer = setInterval(() => {
      const weddingDateObj = new Date(weddingDate);
      const targetDate = new Date(
        weddingDateObj.getFullYear(),
        weddingDateObj.getMonth(),
        weddingDateObj.getDate(),
        7,
        0,
        0,
      ).getTime();
      const now = new Date().getTime();
      const diff = targetDate - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [hasExactWeddingDate, weddingDate]);

  return (
    <section
      ref={rootRef}
      className="relative w-full flex flex-col items-center py-20 overflow-hidden"
      style={{ background: "#fbf7f1" }}
    >
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

      <div className="relative z-10 w-full max-w-4xl px-6 space-y-24">
        {/* 1. SECTION: INVITATION CARDS */}
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-16">
            {/* font-['Cormorant_Garamond'] */}
            <p className="font-script italic text-3xl text-[#d4af37] mb-2">
              Save the date
            </p>
            <h2 className="font-script italic text-5xl md:text-7xl text-[#800020] leading-tight">
              Wedding Invitation
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {invitationCards.map((card, index) => (
              <article
                key={index}
                className="relative group overflow-hidden rounded-[2.5rem] bg-[#800020] p-8 text-center border border-[#d4af37]/30 shadow-2xl transition-transform hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-[200%] animate-[shimmer_5s_infinite]" />
                <div className="relative z-10 space-y-4">
                  <h3 className="font-['Cormorant_Garamond'] text-3xl text-[#f8f4e1] italic">
                    {card.title}
                  </h3>
                  <p className="font-['Cormorant_Garamond'] italic text-[12px] tracking-[0.3em] text-[#d4af37] uppercase">
                    {card.schedule}
                  </p>
                  <div className="py-4 border-y border-[#d4af37]/20 mx-4">
                    <p className="font-serif italic text-3xl font-bold text-white">
                      {card.date}
                    </p>
                    <p className="font-['Cormorant_Garamond'] italic text-sm text-[#d4af37]/80 mt-1">
                      {card.lunarDate}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-['Cormorant_Garamond'] italic text-2xl text-[#f8f4e1]">
                      {card.locationTitle}
                    </p>
                    <p className="font-['Cormorant_Garamond'] italic text-sm font-light text-white/70 leading-relaxed">
                      {card.locationAddress}
                    </p>
                  </div>
                  {card.mapLink ? (
                    <a
                      href={card.mapLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 mt-4 px-8 py-2 rounded-full border border-[#d4af37]/40 text-[#d4af37] text-xs uppercase tracking-widest hover:bg-[#d4af37] hover:text-[#800020] transition-all"
                    >
                      📍 Xem bản đồ
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 mt-4 px-8 py-2 rounded-full border border-white/20 text-white/50 text-xs uppercase tracking-widest">
                      📍 Đang cập nhật
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* 2. SECTION: COUNTDOWN & CALENDAR */}
        <div
          className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="absolute bottom-10 left-10 w-40 h-40 opacity-5 pointer-events-none grayscale">
            <img
              src="https://res.cloudinary.com/dvglujyon/image/upload/v1776937337/pngegg_2_kre1q3.png"
              alt="pattern"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-center mb-12">
            <h2 className="font-script italic text-5xl md:text-6xl text-[#800020] leading-tight">
              Countdown Time
            </h2>
            <p className="font-script italic text-2xl text-[#d4af37] mt-1">
              Until we say I do
            </p>
          </div>
          <div className="flex flex-col items-center text-center mb-16">
            <p className="text-6xl md:text-7xl font-script font-bold text-[#800020] mb-6">
              29/11/2026
            </p>
            <div className="flex items-center gap-4 md:gap-8 mb-4 font-script text-lg md:text-xl text-gray-600 uppercase tracking-widest">
              <span>Thứ: CN</span>
              <div className="h-8 w-[1px] bg-gray-300" />
              <span>Ngày 29</span>
              <div className="h-8 w-[1px] bg-gray-300" />
              <span>Tháng 11</span>
            </div>
            <p className="text-4xl font-script text-gray-700 mb-8">2026</p>

            {/* Calendar */}
            <div className="relative bg-white/50 backdrop-blur-sm border border-[#d4af37]/30 rounded-[2rem] p-8 shadow-sm w-full max-w-sm">
              <div className="font-script italic text-3xl text-[#800020] mb-6 border-b border-[#800020]/10 pb-2">
                Tháng 11 / 2026
              </div>
              <div className="font-script grid grid-cols-7 text-[10px] text-gray-400 mb-4 uppercase tracking-widest">
                <span>T2</span>
                <span>T3</span>
                <span>T4</span>
                <span>T5</span>
                <span>T6</span>
                <span>T7</span>
                <span className="text-[#800020]">CN</span>
              </div>
              <div className="grid grid-cols-7 gap-y-4 text-sm font-serif text-gray-700">
                {[26, 27, 28, 29, 30, 31].map((d) => (
                  <span key={`p-${d}`} className="text-gray-300">
                    {d}
                  </span>
                ))}
                {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                  <div
                    key={day}
                    className="relative flex items-center justify-center min-h-[50px]"
                  >
                    <span className="text-gray-700">{day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Countdown Boxes */}
          <div className="font-script grid grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto">
            {[
              { v: hasExactWeddingDate ? timeLeft.days : "--", l: "Ngày" },
              { v: hasExactWeddingDate ? timeLeft.hours : "--", l: "Giờ" },
              { v: hasExactWeddingDate ? timeLeft.minutes : "--", l: "Phút" },
              { v: hasExactWeddingDate ? timeLeft.seconds : "--", l: "Giây" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 md:p-6 shadow-xl border border-[#d4af37]/20 text-center"
              >
                <p className="text-3xl md:text-4xl font-serif font-bold text-[#800020]">
                  {item.v}
                </p>
                <div className="w-4 h-[1px] bg-[#d4af37] mx-auto my-2" />
                <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-[0.2em]">
                  {item.l}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. SECTION: TIMELINE POPUP TRIGGERS */}
        <div
          className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-center font-script italic text-4xl md:text-5xl text-[#800020] mb-12">
            Wedding Program
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-8 px-4">
            {/* Trigger Card 1 */}
            <div
              onClick={() => setActiveModal("engagement")}
              className="cursor-pointer group relative overflow-hidden bg-white rounded-[2rem] p-10 text-center border border-[#d4af37]/30 shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1 w-full md:w-72"
            >
              <div className="mb-6 flex justify-center text-[#800020] group-hover:scale-110 transition-transform">
                <TimelineGuestIcon />
              </div>
              <h4 className="font-script italic text-3xl text-[#800020]">
                Lễ Ăn Hỏi
              </h4>
              <div className="font-script mt-4 inline-block text-[#d4af37] text-xs tracking-[0.2em] uppercase border-b border-[#d4af37]/30">
                Xem lịch trình
              </div>
            </div>

            {/* Trigger Card 2 */}
            <div
              onClick={() => setActiveModal("wedding")}
              className="cursor-pointer group relative overflow-hidden bg-[#800020] rounded-[2rem] p-10 text-center border border-[#800020] shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1 w-full md:w-72"
            >
              <div className="mb-6 flex justify-center text-[#d4af37] group-hover:scale-110 transition-transform">
                <TimelineRingsIcon />
              </div>
              <h4 className="font-script italic text-3xl text-white">
                Lễ Cưới
              </h4>
              <div className="font-script mt-4 inline-block text-[#d4af37] text-xs tracking-[0.2em] uppercase border-b border-[#d4af37]/30">
                Xem lịch trình
              </div>
            </div>
          </div>
        </div>

        {/* 4. SECTION: CONTACT */}
        <div
          className={`transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex flex-col md:flex-row justify-center items-center gap-12">
            <div className="bg-white p-8 w-72 shadow-xl border-t-4 border-[#800020] rounded-b-2xl text-center">
              <p className="font-['Cormorant_Garamond'] italic text-2xl text-[#d4af37] mb-1">
                Groom
              </p>
              <h4 className="font-script text-2xl text-[#800020] mb-6">
                {groomName}
              </h4>
              <span className="inline-flex items-center gap-3 px-6 py-2 bg-red-50 rounded-full text-[#800020]">
                <span className="text-sm font-bold">📞 {groomPhone}</span>
              </span>
            </div>
            <div className="bg-white p-8 w-72 shadow-xl border-t-4 border-[#800020] rounded-b-2xl text-center">
              <p className="font-['Cormorant_Garamond'] italic text-2xl text-[#d4af37] mb-1">
                Bride
              </p>
              <h4 className="font-script text-2xl text-[#800020] mb-6">
                {brideName}
              </h4>
              <span className="inline-flex items-center gap-3 px-6 py-2 bg-red-50 rounded-full text-[#800020]">
                <span className="text-sm font-bold">📞 {bridePhone}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TimelinePopup
        isOpen={activeModal === "engagement"}
        onClose={() => setActiveModal(null)}
        title="Lễ Ăn Hỏi"
        data={engagementTimeline}
      />
      <TimelinePopup
        isOpen={activeModal === "wedding"}
        onClose={() => setActiveModal(null)}
        title="Lễ Cưới"
        data={weddingTimelineData}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&display=swap');
        @keyframes shimmer { 0% { transform: translateX(-200%); } 100% { transform: translateX(200%); } }
        .animate-in { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `,
        }}
      />
    </section>
  );
};
