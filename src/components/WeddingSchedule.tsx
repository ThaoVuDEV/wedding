import { useEffect, useRef, useState } from "react";

interface WeddingScheduleProps {
  groomName: string;
  brideName: string;
}

const ceremonyEvents = [
  {
    side: "Nhà trai",
    title: "Lễ Thành Hôn",
    time: "XX:XX",
    venue: "Tư gia nhà chú rể",
    address: "Quỳnh Phụ, Hưng Yên",
    mapQuery: "Quỳnh Phụ, Hưng Yên",
  },
  {
    side: "Nhà gái",
    title: "Lễ Vu Quy",
    time: "XX:XX",
    venue: "Tư gia nhà cô dâu",
    address: "Quỳnh Phụ, Hưng Yên",
    mapQuery: "Quỳnh Phụ, Hưng Yên",
  },
];

export const WeddingSchedule = ({
  groomName,
  brideName,
}: WeddingScheduleProps) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#fbf7f1] px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#800020] via-[#d4af37] to-[#800020]" />
      <div className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-[#d4af37]/15" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 rounded-full border border-[#800020]/10" />

      <div className="mx-auto w-full max-w-5xl">
        <header
          className={`mb-9 text-center transition-all duration-1000 sm:mb-14 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <p className="mb-3 text-[9px] uppercase tracking-[0.5em] text-[#a8872b]">Ngày cưới</p>
          <h2 className="font-script text-5xl text-[#800020] sm:text-6xl md:text-8xl">Hẹn Một Ngày</h2>
        </header>

        <div className={`relative overflow-hidden rounded-[2rem] border border-[#d4af37]/35 bg-white p-2 shadow-[0_30px_90px_rgba(92,35,45,0.12)] transition-all duration-1000 sm:rounded-[2.5rem] sm:p-3 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <div className="grid overflow-hidden rounded-[1.6rem] bg-[#800020] lg:grid-cols-[0.85fr_1.15fr] sm:rounded-[2rem]">
            <div className="flex min-h-[300px] flex-col items-center justify-center p-6 text-center text-white sm:min-h-[380px] sm:p-10">
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#d4af37]">Tháng Mười Một</p>
              <p className="my-3 font-script text-[7rem] leading-none text-[#f7e5a8] sm:text-[9rem]">XX</p>
              <p className="text-2xl font-light tracking-[0.35em]">2026</p>
              <div className="my-7 h-px w-20 bg-[#d4af37]/50" />
              <p className="font-script text-2xl text-white/90">{groomName} & {brideName}</p>
            </div>

            <div className="bg-[#fffdf9] p-5 sm:p-8 md:p-10">
              <p className="mb-6 text-center font-script text-3xl text-[#800020]">Trân trọng kính mời</p>
              <div className="space-y-4">
              {ceremonyEvents.map((event, index) => (
                <div
                  key={event.title}
                  className={`rounded-[1.25rem] border border-[#800020]/10 bg-white p-4 shadow-[0_10px_30px_rgba(92,35,45,0.06)] transition-all duration-700 sm:p-5 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-5 opacity-0"
                  }`}
                  style={{ transitionDelay: `${250 + index * 160}ms` }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.35em] text-[#a8872b]">{event.side}</p>
                      <p className="mt-1 font-script text-3xl text-[#800020]">{event.title}</p>
                    </div>
                    <span className="text-2xl text-[#d4af37]">♡</span>
                  </div>
                  <div className="mt-4 grid gap-3 border-t border-[#800020]/10 pt-4 sm:grid-cols-2">
                    <div>
                      <p className="text-[8px] uppercase tracking-[0.25em] text-gray-400">Thời gian</p>
                      <p className="mt-1 font-script text-lg text-[#800020]">{event.time}</p>
                    </div>
                    <div>
                      <p className="text-[8px] uppercase tracking-[0.25em] text-gray-400">Địa điểm</p>
                      <p className="mt-1 text-xs font-light text-gray-500">{event.venue}</p>
                      <p className="mt-1 text-[11px] font-light text-gray-400">{event.address}</p>
                    </div>
                  </div>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.mapQuery)}`} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#800020]/15 px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-[#800020] transition hover:border-[#d4af37] hover:bg-[#d4af37]/10">
                    <span aria-hidden="true">⌖</span> Chỉ đường
                  </a>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
