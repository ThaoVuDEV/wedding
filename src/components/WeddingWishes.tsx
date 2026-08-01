import { FormEvent, useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { createPortal } from "react-dom";

interface Wish {
  id: string;
  name: string;
  message: string;
}

const suggestedWishes = [
  "Trăm năm hạnh phúc, mãi mãi bên nhau!",
  "Chúc hai bạn một đời bình an và ngập tràn yêu thương.",
  "Chúc mừng hạnh phúc! Sớm có thêm thật nhiều tin vui nhé!",
  "Mong hành trình mới của hai bạn luôn rực rỡ và dịu dàng.",
];

export const WeddingWishes = () => {
  const rootRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const wishesQuery = query(
      collection(db, "wishes"),
      orderBy("createdAt", "desc"),
      limit(12),
    );

    return onSnapshot(
      wishesQuery,
      (snapshot) => {
        setWishes(
          snapshot.docs.map((document) => ({
            id: document.id,
            name: String(document.data().name ?? "Khách mời"),
            message: String(document.data().message ?? ""),
          })),
        );
        setErrorMessage("");
        setIsLoading(false);
      },
      () => {
        setErrorMessage(
          "Chưa thể tải lời chúc. Vui lòng kiểm tra Firestore và Security Rules.",
        );
        setIsLoading(false);
      },
    );
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const guestName = name.trim();
    const wishMessage = message.trim();
    if (!guestName || !wishMessage || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await addDoc(collection(db, "wishes"), {
        name: guestName,
        message: wishMessage,
        createdAt: serverTimestamp(),
      });
      setName("");
      setMessage("");
      setIsSent(true);
    } catch {
      setErrorMessage(
        "Không gửi được lời chúc. Hãy kiểm tra Firestore và Security Rules.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isSent) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsSent(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isSent]);

  return (
    <section
      ref={rootRef}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#f6eee7] py-14 sm:py-20"
    >
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#800020]/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#d4af37]/15 blur-3xl" />
      <div className="absolute inset-3 rounded-[2rem] border border-[#d4af37]/20 pointer-events-none sm:inset-5 sm:rounded-[2.5rem]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
        <header
          className={`mb-8 text-center transition-all duration-1000 sm:mb-12 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="mb-3 text-xs uppercase tracking-[0.45em] text-[#d4af37]">
            Send us some love
          </p>
          <h2 className="font-script text-4xl text-[#800020] min-[380px]:text-5xl md:text-7xl">
            Sổ Lời Chúc
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm font-light leading-relaxed text-gray-500 md:text-base">
            Một vài dòng thương mến của bạn sẽ là món quà thật đẹp trong ngày
            đặc biệt của Bùi Diễn và Ngọc Chinh.
          </p>
        </header>

        <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div
            className={`rounded-[1.75rem] border border-white/80 bg-white/75 p-5 shadow-[0_25px_70px_rgba(92,35,45,0.12)] backdrop-blur transition-all duration-1000 delay-200 sm:rounded-[2rem] sm:p-6 md:p-9 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#800020] text-xl text-[#f2d77b]">
                ♡
              </span>
              <div>
                <p className="font-script text-2xl text-[#800020]">
                  Gửi lời thương
                </p>
                <p className="text-xs text-gray-400">Chọn nhanh hoặc tự viết lời chúc</p>
              </div>
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
              {suggestedWishes.map((wish) => (
                <button
                  key={wish}
                  type="button"
                  onClick={() => setMessage(wish)}
                  className="rounded-full border border-[#800020]/10 bg-[#800020]/5 px-4 py-2 text-left text-xs text-[#800020]/75 transition hover:border-[#d4af37] hover:bg-[#d4af37]/10"
                >
                  {wish}
                </button>
              ))}
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-gray-400">
                  Tên của bạn
                </span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  maxLength={50}
                  required
                  placeholder="Ví dụ: Gia đình ...."
                  className="w-full rounded-2xl border border-[#800020]/10 bg-white px-4 py-3.5 text-base text-gray-700 outline-none transition placeholder:text-gray-300 focus:border-[#d4af37] focus:ring-4 focus:ring-[#d4af37]/10 sm:px-5 sm:text-sm"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-gray-400">
                  Lời chúc
                </span>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  maxLength={300}
                  required
                  rows={5}
                  placeholder="Viết điều bạn muốn gửi đến cô dâu và chú rể..."
                  className="w-full resize-none rounded-2xl border border-[#800020]/10 bg-white px-4 py-4 text-base leading-relaxed text-gray-700 outline-none transition placeholder:text-gray-300 focus:border-[#d4af37] focus:ring-4 focus:ring-[#d4af37]/10 sm:px-5 sm:text-sm"
                />
                <span className="mt-1 block text-right text-[10px] text-gray-300">
                  {message.length}/300
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full overflow-hidden rounded-full bg-[#800020] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.25em] text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 disabled:cursor-wait disabled:opacity-60"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">
                  {isSubmitting
                    ? "Đang gửi..."
                    : isSent
                      ? "Đã gửi lời chúc ✓"
                      : "Gửi lời chúc"}
                </span>
              </button>
              {errorMessage && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-center text-xs leading-5 text-red-700">
                  {errorMessage}
                </p>
              )}
            </form>
          </div>

          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
          >
            <div className="mb-5 flex flex-col items-start gap-3 px-2 min-[390px]:flex-row min-[390px]:items-end min-[390px]:justify-between">
              <div>
                <p className="font-script text-3xl text-[#800020]">Những lời yêu thương</p>
                <p className="text-xs text-gray-400">Đồng bộ cho tất cả khách mời</p>
              </div>
              <span className="rounded-full bg-white/70 px-3 py-1 text-xs text-[#800020]">
                {wishes.length} lời chúc
              </span>
            </div>

            <div className="max-h-[560px] space-y-4 overflow-y-auto pr-2">
              {isLoading ? (
                <div className="rounded-[2rem] border border-white bg-white/45 p-12 text-center">
                  <span className="mb-4 block animate-pulse text-4xl text-[#d4af37]">♡</span>
                  <p className="font-script text-2xl text-[#800020]/75">
                    Đang tải lời chúc...
                  </p>
                </div>
              ) : wishes.length === 0 ? (
                <div className="rounded-[2rem] border border-dashed border-[#d4af37]/50 bg-white/45 p-12 text-center">
                  <span className="mb-4 block text-4xl text-[#d4af37]">✦</span>
                  <p className="font-script text-2xl text-[#800020]/75">
                    Hãy là người đầu tiên gửi lời chúc
                  </p>
                  <p className="mt-2 text-xs text-gray-400">
                    Lời nhắn của bạn sẽ xuất hiện tại đây.
                  </p>
                </div>
              ) : (
                wishes.map((wish, index) => (
                  <article
                    key={wish.id}
                    className="relative overflow-hidden rounded-[1.6rem] border border-white bg-white/70 p-6 shadow-sm"
                  >
                    <span className="absolute -right-2 -top-5 font-serif text-7xl text-[#d4af37]/10">“</span>
                    <p className="relative text-sm font-light italic leading-relaxed text-gray-600">
                      “{wish.message}”
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <span className="h-px w-8 bg-[#d4af37]" />
                      <p className="font-script text-lg text-[#800020]">{wish.name}</p>
                      {index === 0 && (
                        <span className="rounded-full bg-[#d4af37]/10 px-2 py-0.5 text-[9px] uppercase tracking-wider text-[#9b791c]">
                          Mới nhất
                        </span>
                      )}
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {isSent &&
        createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="wish-success-title"
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#210008]/75 p-3 backdrop-blur-md sm:p-6"
          onClick={() => setIsSent(false)}
        >
          <div
            className="relative flex h-[78dvh] w-full max-w-xl animate-fadeUp flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-[#d4af37]/40 bg-[#800020] px-7 py-10 text-center text-white shadow-[0_30px_100px_rgba(0,0,0,0.55)] sm:h-auto sm:min-h-[520px] sm:rounded-[2.5rem] sm:px-14"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute -left-14 -top-20 h-56 w-56 rounded-full border border-[#d4af37]/15" />
            <div className="absolute -bottom-20 -right-14 h-60 w-60 rounded-full border border-[#d4af37]/15" />
            <button
              type="button"
              aria-label="Đóng thông báo"
              onClick={() => setIsSent(false)}
              className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-2xl text-white/60 transition active:scale-95 sm:right-6 sm:top-6"
            >
              ×
            </button>

            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-[#d4af37]/50 bg-[#6b001a] shadow-[0_0_50px_rgba(212,175,55,0.2)] sm:h-32 sm:w-32">
              <span className="text-6xl text-[#f7e5a8]">♡</span>
            </div>
            <p className="mt-7 text-[9px] uppercase tracking-[0.45em] text-[#d4af37]">
              Lời chúc đã được gửi
            </p>
            <h3
              id="wish-success-title"
              className="mt-3 font-script text-5xl text-[#fff8e6] sm:text-6xl"
            >
              Cảm ơn bạn!
            </h3>
            <p className="mt-5 max-w-sm text-sm font-light leading-7 text-white/65 sm:text-base">
              Lời thương của bạn đã được lưu lại và gửi đến Bùi Diễn & Ngọc
              Chinh.
            </p>
            <button
              type="button"
              onClick={() => setIsSent(false)}
              className="mt-9 min-h-12 w-full max-w-xs rounded-full bg-[#f7e5a8] px-7 py-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#800020] transition active:scale-95"
            >
              Tiếp tục xem thiệp
            </button>
            <p className="mt-4 text-[10px] text-white/35">
              Chạm bên ngoài để đóng
            </p>
          </div>
        </div>,
          document.body,
        )}
    </section>
  );
};
