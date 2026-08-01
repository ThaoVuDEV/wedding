import { useEffect, useRef, useState } from "react";

interface WeddingScheduleProps {
  groomName: string;
  brideName: string;
}

const pendingDetails = [
  { label: "Ngày tổ chức", value: "XX · 11 · 2026", icon: "01" },
  { label: "Thời gian", value: "Sẽ thông báo", icon: "02" },
  { label: "Địa điểm", value: "Sẽ thông báo", icon: "03" },
];

const ceremonyEvents = [
  {
    side: "Nhà gái",
    title: "Lễ Ăn Hỏi",
    host: "Gia đình cô dâu · Ngọc Chinh",
    date: "Đang cập nhật",
    time: "Đang cập nhật",
    venue: "Tư gia nhà cô dâu",
    address: "Địa chỉ đang cập nhật",
  },
  {
    side: "Nhà trai",
    title: "Lễ Thành Hôn",
    host: "Gia đình chú rể · Bùi Diễn",
    date: "XX/11/2026",
    time: "Đang cập nhật",
    venue: "Tư gia nhà chú rể",
    address: "Địa chỉ đang cập nhật",
  },
];

export const WeddingSchedule = ({ groomName, brideName }: WeddingScheduleProps) => {
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
    <section ref={rootRef} className="relative min-h-screen overflow-hidden bg-[#fbf7f1] px-6 py-20">
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#800020] via-[#d4af37] to-[#800020]" />
      <div className="mx-auto w-full max-w-6xl">
        <div className={`mb-14 flex flex-col justify-between gap-6 transition-all duration-1000 md:flex-row md:items-end ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <div>
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#a8872b]">Mark your calendar</p>
            <h2 className="mt-3 font-script text-6xl text-[#800020] md:text-8xl">Hẹn Một Ngày</h2>
          </div>
          <p className="max-w-sm text-sm font-light leading-7 text-gray-500">
            Ngày giờ và địa điểm chính thức sẽ được chúng mình cập nhật ngay khi hoàn tất. Bạn nhớ quay lại nhé.
          </p>
        </div>

        <div className="grid overflow-hidden rounded-[2.5rem] border border-[#800020]/10 bg-white shadow-[0_30px_90px_rgba(92,35,45,0.1)] lg:grid-cols-[1fr_1.15fr]">
          <div className="flex min-h-[420px] flex-col items-center justify-center bg-[#800020] p-10 text-center text-white">
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#d4af37]">November</p>
            <p className="my-3 font-script text-[9rem] leading-none text-[#f7e5a8]">XX</p>
            <p className="text-2xl font-light tracking-[0.35em]">2026</p>
            <div className="my-8 h-px w-24 bg-[#d4af37]/50" />
            <p className="font-script text-2xl text-white/85">{groomName} & {brideName}</p>
          </div>

          <div className="flex flex-col justify-center p-7 md:p-12">
            {pendingDetails.map((detail, index) => (
              <div key={detail.label} className={`grid grid-cols-[3rem_1fr] gap-5 border-b border-[#800020]/10 py-7 transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`} style={{ transitionDelay: `${250 + index * 160}ms` }}>
                <span className="text-xs text-[#d4af37]">{detail.icon}</span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">{detail.label}</p>
                  <p className="mt-2 font-script text-2xl text-[#800020]">{detail.value}</p>
                </div>
              </div>
            ))}
            <p className="mt-8 rounded-2xl bg-[#f7f0e8] px-5 py-4 text-xs leading-6 text-[#800020]/60">
              ✦ Thiệp sẽ tự động hoàn thiện khi có thông tin chính thức.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {ceremonyEvents.map((event, index) => (
            <article
              key={event.title}
              className={`relative overflow-hidden rounded-[2rem] border border-[#800020]/10 bg-white p-7 shadow-[0_18px_55px_rgba(92,35,45,0.08)] transition-all duration-1000 md:p-9 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${500 + index * 180}ms` }}
            >
              <span className="absolute -right-4 -top-12 font-script text-[10rem] leading-none text-[#800020]/[0.035]">
                {index + 1}
              </span>
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.4em] text-[#a8872b]">
                      {event.side}
                    </p>
                    <h3 className="mt-2 font-script text-4xl text-[#800020] md:text-5xl">
                      {event.title}
                    </h3>
                    <p className="mt-2 text-xs text-gray-400">{event.host}</p>
                  </div>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/40 text-xl text-[#d4af37]">
                    ♡
                  </span>
                </div>

                <div className="my-7 h-px bg-[#800020]/10" />

                <dl className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <dt className="text-[9px] uppercase tracking-[0.3em] text-gray-400">
                      Ngày tổ chức
                    </dt>
                    <dd className="mt-2 font-script text-xl text-[#800020]">
                      {event.date}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[9px] uppercase tracking-[0.3em] text-gray-400">
                      Thời gian
                    </dt>
                    <dd className="mt-2 font-script text-xl text-[#800020]">
                      {event.time}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-[9px] uppercase tracking-[0.3em] text-gray-400">
                      Địa điểm
                    </dt>
                    <dd className="mt-2 font-script text-xl text-[#800020]">
                      {event.venue}
                    </dd>
                    <p className="mt-1 text-sm font-light text-gray-400">
                      {event.address}
                    </p>
                  </div>
                </dl>

                <button
                  type="button"
                  disabled
                  className="mt-7 w-full cursor-not-allowed rounded-full border border-dashed border-[#800020]/20 px-5 py-3 text-[9px] uppercase tracking-[0.3em] text-[#800020]/35"
                >
                  Bản đồ sẽ được cập nhật
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
