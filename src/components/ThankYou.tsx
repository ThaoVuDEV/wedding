import { useEffect, useRef, useState } from "react";
import { WeddingMonogram } from "./WeddingMonogram";
import { createPortal } from "react-dom";
import qrChinh from "../../images/qr-chinh.png";
import qrDien from "../../images/qr-dien.png";

interface ThankYouProps {
  weddingDate: string;
  message?: string;
}

const giftRecipients = [
  {
    id: "groom",
    role: "Chú rể",
    name: "Bùi Diễn",
    accountName: "BUI TRUNG DIEN",
    accountNumber: "101887885128",
    bank: "VietinBank",
    qr: qrDien,
  },
  {
    id: "bride",
    role: "Cô dâu",
    name: "Ngọc Chinh",
    accountName: "TONG THI CHINH",
    accountNumber: "0341007148670",
    bank: "Vietcombank",
    qr: qrChinh,
  },
] as const;

export const ThankYou = ({
  weddingDate,
  message = "Cảm ơn bạn đã dành thời gian chung vui cùng chúng mình.",
}: ThankYouProps) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [selectedRecipientId, setSelectedRecipientId] = useState<string | null>(null);
  const selectedRecipient = giftRecipients.find(
    (recipient) => recipient.id === selectedRecipientId,
  );

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
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
        <p className="font-serif text-lg tracking-[0.18em] text-[#e4c98f] sm:text-xl">Bùi Diễn <span className="px-1 text-[#d8b777]">&</span> Ngọc Chinh</p>
        <div className="mx-auto my-7 flex h-28 w-28 items-center justify-center rounded-full border border-[#d8b777]/65 bg-[#741d35]/45 p-2 shadow-[0_14px_40px_rgba(0,0,0,0.18)] sm:my-9 sm:h-32 sm:w-32">
          <div className="flex h-full w-full items-center justify-center rounded-full border border-[#d8b777]/25">
            <WeddingMonogram className="text-[4.5rem] text-[#f7e5a8]" />
          </div>
        </div>
        <h2 className="font-script text-[3.4rem] leading-tight text-[#fff8e6] sm:text-6xl md:text-8xl">Cảm Ơn Bạn</h2>
        <p className="mx-auto mt-5 max-w-xl text-sm font-light leading-7 text-white/60 sm:mt-7 sm:leading-8 md:text-base">{message}</p>
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-[#d4af37]/75 sm:mt-8 sm:tracking-[0.35em]">{weddingDate}</p>

        <button
          type="button"
          onClick={() => {
            setSelectedRecipientId(null);
            setIsGiftModalOpen(true);
          }}
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
        <div
          className="fixed inset-0 z-[1000] flex items-start justify-center overflow-y-auto bg-black/70 p-3 backdrop-blur-md sm:items-center sm:p-4"
          onClick={() => {
            setIsGiftModalOpen(false);
            setSelectedRecipientId(null);
          }}
        >
          <div
            className="relative my-auto w-full max-w-2xl rounded-[2rem] border border-[#d4af37]/30 bg-[#6b001a] p-5 shadow-2xl sm:rounded-[2.5rem] sm:p-7 md:p-10"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Đóng hộp mừng cưới"
              onClick={() => {
                setIsGiftModalOpen(false);
                setSelectedRecipientId(null);
              }}
              className="absolute right-4 top-3 flex h-11 w-11 items-center justify-center rounded-full text-3xl text-white/50 transition hover:text-white sm:right-6 sm:top-5"
            >
              ×
            </button>

            {!selectedRecipient ? (
              <>
                <div className="mb-5 text-center sm:mb-8">
                  <p className="text-[9px] uppercase tracking-[0.45em] text-[#d8b777]">Mừng cưới</p>
                  <h3 className="mt-3 font-script text-4xl text-[#fff8e6]">Hộp Mừng Cưới</h3>
                  <p className="mt-3 text-xs text-white/50">Chọn cô dâu hoặc chú rể để xem thông tin chuyển khoản</p>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  {giftRecipients.map((recipient) => (
                    <button
                      key={recipient.id}
                      type="button"
                      onClick={() => setSelectedRecipientId(recipient.id)}
                      className="rounded-[1.25rem] border border-white/10 bg-white/5 p-3 text-center transition hover:border-[#d4af37]/60 hover:bg-white/10 sm:rounded-[1.75rem] sm:p-6"
                    >
                      <p className="text-[9px] uppercase tracking-[0.35em] text-[#d4af37]/70">{recipient.role}</p>
                      <p className="mt-2 font-script text-2xl text-white">{recipient.name}</p>
                      {recipient.qr ? (
                        <img
                          src={recipient.qr}
                          alt={`Mã QR chuyển khoản ${recipient.name}`}
                          className="mx-auto my-4 aspect-square w-24 rounded-xl bg-white p-1 object-contain sm:my-5 sm:w-32 sm:rounded-2xl sm:p-2"
                        />
                      ) : (
                        <div className="mx-auto my-4 flex aspect-square w-24 items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/5 px-2 text-[8px] uppercase leading-4 tracking-[0.15em] text-white/35 sm:my-5 sm:w-32 sm:rounded-2xl sm:px-4 sm:text-[9px] sm:leading-5 sm:tracking-[0.2em]">Mã QR</div>
                      )}
                      <div className="space-y-3 border-t border-white/10 pt-4 text-xs">
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.2em] text-[#d8b777]/80">STK</p>
                          <p className="mt-1 font-bold tracking-[0.08em] text-[#f7e5a8]">{recipient.accountNumber || "Đang cập nhật"}</p>
                        </div>
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.2em] text-[#d8b777]/80">Tên tài khoản</p>
                          <p className="mt-1 break-words font-bold text-white">{recipient.accountName || "Đang cập nhật"}</p>
                        </div>
                        <p className="font-semibold text-white/65">{recipient.bank}</p>
                      </div>
                      <p className="mt-4 text-[9px] uppercase tracking-[0.2em] text-[#d8b777]">Nhấn để phóng to</p>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center text-center">
                <button
                  type="button"
                  onClick={() => setSelectedRecipientId(null)}
                  className="self-start text-xs uppercase tracking-[0.2em] text-[#d8b777] transition hover:text-white"
                >
                  ← Chọn người nhận khác
                </button>
                <p className="mt-5 text-[9px] uppercase tracking-[0.45em] text-[#d8b777]">{selectedRecipient.role}</p>
                <h3 className="mt-3 font-script text-5xl text-[#fff8e6]">{selectedRecipient.name}</h3>
                {selectedRecipient.qr ? (
                  <img
                    src={selectedRecipient.qr}
                    alt={`Mã QR chuyển khoản ${selectedRecipient.name}`}
                    className="my-7 w-full max-w-[360px] rounded-2xl bg-white p-3 shadow-2xl sm:my-8 sm:p-4"
                  />
                ) : (
                  <div className="my-7 flex aspect-square w-full max-w-[360px] items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/5 text-xs uppercase tracking-[0.2em] text-white/40 sm:my-8">Mã QR đang cập nhật</div>
                )}
                {selectedRecipient.accountNumber ? (
                  <div className="w-full max-w-[360px] space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/75">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#d8b777]">Thông tin chuyển khoản</p>
                    <div className="pt-2">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#d8b777]/80">STK</p>
                      <p className="mt-1 text-xl font-bold tracking-[0.12em] text-[#f7e5a8]">{selectedRecipient.accountNumber}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#d8b777]/80">Tên tài khoản</p>
                      <p className="mt-1 break-words font-bold text-white">{selectedRecipient.accountName}</p>
                    </div>
                    <p className="font-semibold text-white/70">{selectedRecipient.bank}</p>
                  </div>
                ) : (
                  <p className="text-sm text-white/50">Thông tin chuyển khoản đang cập nhật</p>
                )}
              </div>
            )}
          </div>
        </div>,
          document.body,
        )}
    </section>
  );
};
