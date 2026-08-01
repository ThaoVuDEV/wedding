import { useEffect, useRef, useState } from "react";
import { WeddingMonogram } from "./WeddingMonogram";

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
    <section ref={rootRef} className="relative flex min-h-screen items-center overflow-hidden bg-[#2c000b] px-6 py-20 text-white">
      <div className="absolute left-1/2 top-1/2 h-[70vw] max-h-[700px] w-[70vw] max-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4af37]/10" />
      <div className="absolute left-1/2 top-1/2 h-[55vw] max-h-[550px] w-[55vw] max-w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4af37]/10" />

      <div className={`relative mx-auto max-w-3xl text-center transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
        <p className="text-[10px] uppercase tracking-[0.55em] text-[#d4af37]">From Diễn & Chinh</p>
        <div className="mx-auto my-9 flex h-28 w-28 items-center justify-center rounded-full border border-[#d4af37]/50 bg-[#800020]/40">
          <WeddingMonogram className="text-6xl text-[#f7e5a8]" />
        </div>
        <h2 className="font-script text-6xl text-[#fff8e6] md:text-8xl">Cảm Ơn Bạn</h2>
        <p className="mx-auto mt-7 max-w-xl text-sm font-light leading-8 text-white/60 md:text-base">{message}</p>
        <p className="mt-8 text-xs uppercase tracking-[0.35em] text-[#d4af37]/75">{weddingDate}</p>

        <button
          type="button"
          onClick={() => setIsGiftModalOpen(true)}
          className="gift-cta mt-10 inline-flex items-center gap-3 rounded-full border border-[#f7e5a8] bg-[#d4af37] px-8 py-3.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#2c000b] transition hover:scale-105 hover:bg-[#f7e5a8]"
        >
          <span className="text-base" aria-hidden="true">🎁</span>
          <span>Nhấn mở hộp mừng cưới</span>
        </button>

        <div className="mt-16 flex items-center justify-center gap-4 text-white/25">
          <span className="h-px w-12 bg-current" />
          <span className="font-script text-lg">Bùi Diễn · Ngọc Chinh</span>
          <span className="h-px w-12 bg-current" />
        </div>
      </div>

      {isGiftModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md" onClick={() => setIsGiftModalOpen(false)}>
          <div className="relative w-full max-w-2xl rounded-[2.5rem] border border-[#d4af37]/30 bg-[#6b001a] p-7 shadow-2xl md:p-10" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setIsGiftModalOpen(false)} className="absolute right-6 top-5 text-3xl text-white/50 transition hover:text-white">×</button>
            <div className="mb-8 text-center">
              <p className="text-[9px] uppercase tracking-[0.45em] text-[#d4af37]">Wedding gift</p>
              <h3 className="mt-3 font-script text-4xl text-[#fff8e6]">Hộp Mừng Cưới</h3>
              <p className="mt-2 text-xs text-white/45">Thông tin sẽ được cập nhật sau</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {giftRecipients.map((recipient) => (
                <div key={recipient.role} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-center">
                  <p className="text-[9px] uppercase tracking-[0.35em] text-[#d4af37]/70">{recipient.role}</p>
                  <p className="mt-2 font-script text-2xl text-white">{recipient.name}</p>
                  <div className="mx-auto my-5 flex aspect-square w-32 items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/5 px-4 text-[9px] uppercase leading-5 tracking-[0.2em] text-white/35">QR đang cập nhật</div>
                  <div className="space-y-2 border-t border-white/10 pt-4 text-xs text-white/40">
                    <p>Ngân hàng: Đang cập nhật</p>
                    <p>Số tài khoản: Đang cập nhật</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
