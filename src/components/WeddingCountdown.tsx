import { useEffect, useMemo, useState } from "react";
import { WEDDING } from "../config/wedding";

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const targetDate = new Date(2026, 10, 29, 7, 0, 0);
const weekDays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

const getCountdown = (): CountdownValues => {
  const difference = Math.max(0, targetDate.getTime() - Date.now());
  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  };
};

export const WeddingCountdown = () => {
  const [countdown, setCountdown] = useState<CountdownValues>(getCountdown);

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getCountdown()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(2026, 10, 1).getDay();
    const leadingDays = (firstDay + 6) % 7;
    return [
      ...Array.from({ length: leadingDays }, () => null),
      ...Array.from({ length: 30 }, (_, index) => index + 1),
    ];
  }, []);

  const countdownItems = [
    { value: countdown.days, label: "Ngày" },
    { value: countdown.hours, label: "Giờ" },
    { value: countdown.minutes, label: "Phút" },
    { value: countdown.seconds, label: "Giây" },
  ];

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#fbf7f1] px-5 py-16 sm:px-6 sm:py-20">
      <div className="absolute -left-32 bottom-10 h-72 w-72 rounded-full bg-[#e9cbd0]/30 blur-3xl" />
      <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-[#d4af37]/10 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <p className="text-[9px] uppercase tracking-[0.5em] text-[#a37d49]">Ngày trọng đại</p>
        <h2 className="mt-3 font-script text-5xl text-[#741d35] sm:text-7xl">Countdown Time</h2>
        <p className="mt-1 font-script text-2xl text-[#d4af37]">Until we say I do</p>

        <p className="mt-10 font-serif text-6xl font-semibold tracking-[0.08em] text-[#741d35] sm:text-8xl">
          {WEDDING.timeDisplay}
        </p>
        <div className="mx-auto mt-4 flex max-w-md items-center justify-center gap-4 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8d6a43] sm:gap-8 sm:text-xs">
          <span>Chủ Nhật</span>
          <span className="h-7 w-px bg-[#b89258]/35" />
          <span>Ngày 29</span>
          <span className="h-7 w-px bg-[#b89258]/35" />
          <span>Tháng 11</span>
        </div>
        <p className="mt-3 font-serif text-3xl text-[#625355]">2026</p>

        <div className="mx-auto mt-10 max-w-sm rounded-[2rem] border border-[#d4af37]/30 bg-white/70 p-6 shadow-[0_18px_50px_rgba(92,35,45,0.08)] sm:mt-14 sm:p-8">
          <h3 className="border-b border-[#741d35]/10 pb-3 font-script text-3xl text-[#741d35]">Tháng 11 / 2026</h3>
          <div className="mt-5 grid grid-cols-7 gap-y-4 text-[10px] text-[#9d8c85]">
            {weekDays.map((day) => <span key={day} className={day === "CN" ? "text-[#741d35]" : ""}>{day}</span>)}
            {calendarDays.map((day, index) => day === 29 ? (
              <span key={`${day}-${index}`} className="flex min-h-12 flex-col items-center justify-start">
                <span className="relative flex h-9 w-10 items-center justify-center">
                  <span className="absolute text-[3.1rem] leading-none text-[#a3264c] drop-shadow-[0_4px_8px_rgba(163,38,76,0.35)]" aria-hidden="true">♥</span>
                  <span className="relative z-10 pt-1 font-sans text-[12px] font-bold text-white">{day}</span>
                </span>
                <span className="mt-1 text-[8px] font-semibold text-[#a3264c]">Ngày cưới</span>
              </span>
            ) : (
              <span key={`${day ?? "empty"}-${index}`} className={`flex min-h-7 items-center justify-center ${day ? "text-[#625355]" : ""}`}>
                {day}
              </span>
            ))}
          </div>
          <p className="mt-5 text-xs text-[#8d6a43]">Âm lịch: {WEDDING.lunarDateDisplay}</p>
        </div>

        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-4 gap-3 sm:mt-10 sm:gap-5">
          {countdownItems.map((item) => (
            <div key={item.label} className="rounded-2xl border border-[#d4af37]/20 bg-white/85 px-2 py-4 shadow-[0_12px_30px_rgba(92,35,45,0.08)] sm:rounded-3xl sm:px-4 sm:py-6">
              <p className="font-sans text-2xl font-bold text-[#741d35] sm:text-4xl">{String(item.value).padStart(2, "0")}</p>
              <div className="mx-auto my-2 h-px w-5 bg-[#d4af37]" />
              <p className="text-[9px] uppercase tracking-[0.18em] text-[#8d6a43] sm:text-[10px]">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
