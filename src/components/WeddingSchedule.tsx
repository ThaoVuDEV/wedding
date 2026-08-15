import { useEffect, useRef, useState } from "react";
import { WeddingMonogram } from "./WeddingMonogram";
import { WEDDING } from "../config/wedding";

interface WeddingScheduleProps {
  groomName: string;
  brideName: string;
}

const DetailIcon = ({ type }: { type: "time" | "place" }) => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4 text-[#b89258]"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {type === "time" ? (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5v5l3.2 2" />
      </>
    ) : (
      <>
        <path d="M19 10.4c0 4.8-7 9.1-7 9.1s-7-4.3-7-9.1a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10.4" r="2.2" />
      </>
    )}
  </svg>
);

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
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-0 items-center overflow-hidden bg-[#f6f0ea] px-4 py-14 md:min-h-[100svh] sm:px-6 sm:py-20"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#741d35] via-[#b89258] to-[#741d35]" />
      <div className="pointer-events-none absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full border border-[#b89258]/15" />
      <div className="pointer-events-none absolute -right-40 top-16 h-96 w-96 rounded-full border border-[#741d35]/10" />

      <div className="relative mx-auto w-full max-w-5xl">
        <header
          className={`mb-8 text-center transition-all duration-1000 sm:mb-11 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <p className="mb-3 text-[9px] uppercase tracking-[0.5em] text-[#a37d49]">
            Ngày chung đôi
          </p>
          <h2 className="font-script text-6xl leading-none text-[#741d35] sm:text-7xl md:text-8xl">
            Hẹn Một Ngày
          </h2>
        </header>

        <div
          className={`rounded-[2rem] border border-[#b89258]/45 bg-[#fffdf9] p-2 shadow-[0_28px_80px_rgba(73,37,45,0.12)] transition-all duration-1000 sm:rounded-[2.5rem] sm:p-3 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="overflow-hidden rounded-[1.55rem] border border-[#741d35]/10 sm:rounded-[2rem]">
            <div className="relative bg-[#741d35] px-6 py-10 text-center text-[#fff8ed] sm:px-10 sm:py-12">
              <div className="absolute left-5 top-5 h-14 w-14 rounded-full border border-[#d8b777]/20 sm:left-8 sm:top-8 sm:h-20 sm:w-20" />
              <div className="absolute bottom-5 right-5 h-14 w-14 rounded-full border border-[#d8b777]/20 sm:bottom-8 sm:right-8 sm:h-20 sm:w-20" />

              <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#d8b777]/60 bg-[#5a1629] text-[#f7e5a8] shadow-[0_12px_28px_rgba(0,0,0,0.14)] sm:h-24 sm:w-24">
                <WeddingMonogram className="text-6xl sm:text-7xl" />
              </div>
              <p className="relative mt-5 text-[9px] uppercase tracking-[0.5em] text-[#e7c98e]">
                Thiệp cưới
              </p>
              <p className="relative mt-3 font-sans text-4xl font-semibold tracking-[0.12em] text-[#fff1cf] sm:text-5xl">
                {WEDDING.dateDisplay}
              </p>
              <p className="relative mt-4 font-script text-2xl text-white/85 sm:text-3xl">
                {groomName} & {brideName}
              </p>
            </div>

            <div className="bg-[#fffdf9] px-4 py-6 sm:px-8 sm:py-9 md:px-10">
              <div className="mx-auto mb-7 flex max-w-sm items-center justify-center gap-3 text-[#b89258]">
                <span className="h-px flex-1 bg-[#b89258]/35" />
                <span className="font-serif text-sm italic tracking-wide text-[#8d6a43]">
                  Trân trọng kính mời
                </span>
                <span className="h-px flex-1 bg-[#b89258]/35" />
              </div>

              <div className="grid gap-4 md:grid-cols-2 md:gap-5">
                {WEDDING.ceremonyEvents.map((event, index) => {
                  const isGroom = event.side === "Nhà trai";
                  const accentColor = isGroom ? "text-[#741d35]" : "text-[#a37d49]";
                  const titleColor = isGroom ? "text-[#741d35]" : "text-[#965064]";
                  const cardStyle = isGroom
                    ? "border-[#741d35]/20 bg-[#fff7f7]"
                    : "border-[#b89258]/40 bg-[#fffaf0]";

                  return (
                    <article
                      key={event.title}
                      className={`relative rounded-[1.35rem] border p-5 transition-all duration-700 sm:p-6 ${cardStyle} ${
                        isVisible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-5 opacity-0"
                      }`}
                      style={{ transitionDelay: `${250 + index * 150}ms` }}
                    >
                      <span className={`absolute right-5 top-5 font-serif text-3xl ${isGroom ? "text-[#741d35]/25" : "text-[#b89258]/45"}`}>
                        0{index + 1}
                      </span>
                      <p className={`font-sans text-[10px] font-semibold uppercase tracking-[0.25em] ${accentColor}`}>
                        {event.side}
                      </p>
                      <h3 className={`mt-2 font-serif text-3xl font-semibold italic sm:text-4xl ${titleColor}`}>
                        {event.title}
                      </h3>

                      <div className={`my-5 h-px ${isGroom ? "bg-[#741d35]/10" : "bg-[#b89258]/20"}`} />

                      <dl className="space-y-4">
                        <div className="flex items-start gap-3">
                          <DetailIcon type="time" />
                          <div>
                            <dt className={`font-sans text-[10px] font-semibold uppercase tracking-[0.2em] ${accentColor}`}>
                              Thời gian
                            </dt>
                            <dd className={`mt-1 font-sans text-base font-bold sm:text-lg ${titleColor}`}>
                              {event.date}
                            </dd>
                            <dd className="mt-1 font-sans text-xs font-medium text-[#756568]">
                              Âm lịch: {WEDDING.lunarDateDisplay}
                            </dd>
                            <dd className={`mt-0.5 font-sans text-sm font-semibold sm:text-base ${titleColor}`}>
                              {event.time}
                            </dd>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <DetailIcon type="place" />
                          <div>
                            <dt className={`font-sans text-[10px] font-semibold uppercase tracking-[0.2em] ${accentColor}`}>
                              Địa điểm
                            </dt>
                            <dd className="mt-1 font-sans text-sm font-medium text-[#4f4043]">
                              {event.venue}
                            </dd>
                            <dd className="mt-0.5 font-sans text-xs text-[#756568]">
                              {event.address}
                            </dd>
                          </div>
                        </div>
                      </dl>

                      <a
                        href={event.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`mt-5 inline-flex min-h-10 items-center gap-2 rounded-full border px-4 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] transition hover:bg-[#b89258]/10 ${isGroom ? "border-[#741d35]/20 text-[#741d35] hover:border-[#741d35]/40" : "border-[#b89258]/40 text-[#965064] hover:border-[#b89258]"}`}
                      >
                        <span aria-hidden="true">⌖</span>
                        Chỉ đường
                      </a>
                    </article>
                  );
                })}
              </div>

              <p className="mt-7 text-center font-script text-xl text-[#741d35]/65 sm:text-2xl">
                Rất vui được đón tiếp bạn
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
