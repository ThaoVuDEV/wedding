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

      <div className="mx-auto w-full max-w-5xl">
        <header
          className={`mb-9 text-center transition-all duration-1000 sm:mb-14 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="font-script text-5xl text-[#800020] sm:text-6xl md:text-8xl">
            Hẹn Một Ngày
          </h2>
        </header>

        <div
          className={`grid overflow-hidden rounded-[2rem] border border-[#800020]/10 bg-white shadow-[0_30px_90px_rgba(92,35,45,0.1)] transition-all duration-1000 sm:rounded-[2.5rem] lg:grid-cols-[0.9fr_1.1fr] ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex min-h-[340px] flex-col items-center justify-center bg-[#800020] p-6 text-center text-white sm:min-h-[430px] sm:p-10">
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#d4af37]">
              November
            </p>
            <p className="my-3 font-script text-[7rem] leading-none text-[#f7e5a8] sm:text-[9rem]">
              XX
            </p>
            <p className="text-2xl font-light tracking-[0.35em]">2026</p>
            <div className="my-8 h-px w-24 bg-[#d4af37]/50" />
            <p className="font-script text-2xl text-white/85">
              {groomName} & {brideName}
            </p>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-9 md:p-12">
            <p className="mb-6 text-center text-[10px] uppercase tracking-[0.35em] text-[#a8872b]">
              Ngày vui của chúng mình
            </p>

            <div className="space-y-6">
              {ceremonyEvents.map((event, index) => (
                <div
                  key={event.title}
                  className={`flex items-center gap-4 border-b border-[#800020]/10 pb-6 last:border-0 last:pb-0 transition-all duration-700 ${
                    isVisible
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${250 + index * 160}ms` }}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/50 text-lg text-[#d4af37]">
                    ♡
                  </span>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.35em] text-[#a8872b]">
                      {event.side}
                    </p>
                    <p className="mt-1 font-script text-3xl text-[#800020]">
                      {event.title}
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-3">
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
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.mapQuery)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#800020]/15 px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-[#800020] transition hover:border-[#d4af37] hover:bg-[#d4af37]/10"
                    >
                      <span aria-hidden="true">⌖</span>
                      Google Maps
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
