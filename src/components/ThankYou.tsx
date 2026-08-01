import { useEffect, useRef, useState } from "react";
import { WeddingMonogram } from "./WeddingMonogram";
import { createPortal } from "react-dom";

interface ThankYouProps {
  weddingDate: string;
  message?: string;
}

const giftRecipients = [
  { role: "Chú rể", name: "Bùi Diễn" },
  { role: "Cô dâu", name: "Ngọc Chinh" },
];

export const ThankYou = ({
  weddingDate,
  message = "Cảm ơn bạn đã dành thời gian chung vui cùng chúng mình.",
}: ThankYouProps) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={rootRef} className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#2c000b] px-5 py-14 text-white sm:px-6 sm:py-20">
      <div className="absolute left-1/2 top-1/2 h-[70vw] max-h-[700px] w-[70vw] max-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4af37]/10" />
      <div className="absolute left-1/2 top-1/2 h-[55vw] max-h-[550px] w-[55vw] max-w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4af37]/10" />

      <div className={`relative mx-auto max-w-3xl text-center transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
        <p className="text-[10px] uppercase tracking-[0.55em] text-[#d4af37]">From Diễn & Chinh</p>
        <div className="mx-auto my-6 flex h-24 w-24 items-center justify-center rounded-full border border-[#d4af37]/50 bg-[#800020]/40 sm:my-9 sm:h-28 sm:w-28">
          <WeddingMonogram className="text-6xl text-[#f7e5a8]" />
        </div>
        <h2 className="font-script text-5xl text-[#fff8e6] sm:text-6xl md:text-8xl">Cảm Ơn Bạn</h2>
        <p className="mx-auto mt-5 max-w-xl text-sm font-light leading-7 text-white/60 sm:mt-7 sm:leading-8 md:text-base">{message}</p>
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-[#d4af37]/75 sm:mt-8 sm:tracking-[0.35em]">{weddingDate}</p>

        <button
          type="button"
          onClick={() => setIsGiftModalOpen(true)}
          className="gift-cta mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border border-[#f7e5a8] bg-[#d4af37] px-5 py-3 text-[9px] font-bold uppercase tracking-[0.2em] text-[#2c000b] transition hover:scale-105 hover:bg-[#f7e5a8] sm:mt-10 sm:gap-3 sm:px-8 sm:py-3.5 sm:text-[10px] sm:tracking-[0.3em]"
        >
          <span className="text-base" aria-hidden="true">🎁</span>
          <span>Nhấn mở hộp mừng cưới</span>
        </button>

        <div className="mt-10 flex items-center justify-center gap-3 text-white/25 sm:mt-16 sm:gap-4">
          <span className="h-px w-12 bg-current" />
          <span className="font-script text-lg">Bùi Diễn · Ngọc Chinh</span>
          <span className="h-px w-12 bg-current" />
        </div>
      </div>

      {isGiftModalOpen &&
        createPortal(
        <div className="fixed inset-0 z-[1000] flex items-start justify-center overflow-y-auto bg-black/70 p-3 backdrop-blur-md sm:items-center sm:p-4" onClick={() => setIsGiftModalOpen(false)}>
          <div className="relative my-auto w-full max-w-2xl rounded-[2rem] border border-[#d4af37]/30 bg-[#6b001a] p-5 shadow-2xl sm:rounded-[2.5rem] sm:p-7 md:p-10" onClick={(event) => event.stopPropagation()}>
            <button type="button" aria-label="Đóng hộp mừng cưới" onClick={() => setIsGiftModalOpen(false)} className="absolute right-4 top-3 flex h-11 w-11 items-center justify-center rounded-full text-3xl text-white/50 transition hover:text-white sm:right-6 sm:top-5">×</button>
            <div className="mb-5 text-center sm:mb-8">
              <p className="text-[9px] uppercase tracking-[0.45em] text-[#d4af37]">Wedding gift</p>
              <h3 className="mt-3 font-script text-4xl text-[#fff8e6]">Hộp Mừng Cưới</h3>
              <p className="mt-2 text-xs text-white/45">Thông tin sẽ được cập nhật sau</p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              {giftRecipients.map((recipient) => (
                <div key={recipient.role} className="rounded-[1.25rem] border border-white/10 bg-white/5 p-3 text-center sm:rounded-[1.75rem] sm:p-6">
                  <p className="text-[9px] uppercase tracking-[0.35em] text-[#d4af37]/70">{recipient.role}</p>
                  <p className="mt-2 font-script text-2xl text-white">{recipient.name}</p>
                  <div className="mx-auto my-4 flex aspect-square w-24 items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/5 px-2 text-[8px] uppercase leading-4 tracking-[0.15em] text-white/35 sm:my-5 sm:w-32 sm:rounded-2xl sm:px-4 sm:text-[9px] sm:leading-5 sm:tracking-[0.2em]">QR đang cập nhật</div>
                  <div className="space-y-2 border-t border-white/10 pt-4 text-xs text-white/40">
                    <p>Ngân hàng: Đang cập nhật</p>
                    <p>Số tài khoản: Đang cập nhật</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>,
          document.body,
        )}
    </section>
  );
};
