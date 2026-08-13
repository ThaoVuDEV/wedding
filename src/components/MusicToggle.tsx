import React, { useState, useRef, useEffect } from "react";

interface MusicToggleProps {
  audioUrl: string;
  shouldAutoPlay?: boolean;
}

export const MusicToggle: React.FC<MusicToggleProps> = ({
  audioUrl,
  shouldAutoPlay = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleToggle = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying && !isMuted) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else if (isPlaying && isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      } else {
        audioRef.current.muted = false;
        setIsMuted(false);
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Lỗi phát nhạc:", err);
    }
  };

  // Try to autoplay when shouldAutoPlay is true
  useEffect(() => {
    if (!shouldAutoPlay || !audioRef.current) return;

    const tryAutoplay = async () => {
      if (!audioRef.current) return;
      try {
        audioRef.current.muted = false;
        await audioRef.current.play();
        setIsMuted(false);
        setIsPlaying(true);
      } catch (err) {
        // If unmuted autoplay fails, try muted
        try {
          audioRef.current.muted = true;
          await audioRef.current.play();
          setIsMuted(true);
          setIsPlaying(true);
        } catch (err2) {
          setIsPlaying(false);
        }
      }
    };

    const handleFirstInteraction = async (event: Event) => {
      if (!audioRef.current) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest(".music-button")) return;
      try {
        audioRef.current.muted = false;
        await audioRef.current.play();
        setIsMuted(false);
        setIsPlaying(true);
        window.removeEventListener("pointerdown", handleFirstInteraction);
      } catch (err) {
        // ignore
      }
    };

    // Delay autoplay slightly to ensure browser readiness
    const timer = setTimeout(tryAutoplay, 500);
    window.addEventListener("pointerdown", handleFirstInteraction);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("pointerdown", handleFirstInteraction);
    };
  }, [shouldAutoPlay]);

  return (
    <>
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => {
          setIsPlaying(false);
          setIsMuted(false);
        }}
      />
      <button
        onClick={handleToggle}
        className={`music-button fixed right-3 top-[max(0.75rem,env(safe-area-inset-top))] z-50 flex h-11 w-11 items-center justify-center rounded-full transition-all transform hover:scale-105 md:right-6 md:top-6 md:h-12 md:w-12 ${
          isPlaying && !isMuted
            ? "playing bg-burgundy text-white shadow-lg"
            : "paused bg-white text-burgundy shadow-lg border-2 border-burgundy"
        }`}
        title={isPlaying && !isMuted ? "Tắt nhạc" : "Bật nhạc"}
        aria-pressed={isPlaying && !isMuted}
      >
        <svg
          className="note w-4 h-4"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
        </svg>
      </button>
    </>
  );
};
