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
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleToggle = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Reset to beginning if needed
        audioRef.current.currentTime = 0;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
        }
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
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
        }
      } catch (err) {
        // If unmuted autoplay fails, try muted
        try {
          audioRef.current.muted = true;
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            await playPromise;
            setIsPlaying(true);
          }
        } catch (err2) {
          setIsPlaying(false);
        }
      }
    };

    const handleFirstInteraction = async () => {
      if (!audioRef.current) return;
      try {
        audioRef.current.muted = false;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
        }
      } catch (err) {
        // ignore
      }
    };

    // Delay autoplay slightly to ensure browser readiness
    const timer = setTimeout(tryAutoplay, 500);
    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, {
      once: true,
    });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [shouldAutoPlay]);

  return (
    <>
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button
        onClick={handleToggle}
        className={`music-button fixed right-3 top-[max(0.75rem,env(safe-area-inset-top))] z-50 flex h-11 w-11 items-center justify-center rounded-full transition-all transform hover:scale-105 md:right-6 md:top-6 md:h-12 md:w-12 ${
          isPlaying
            ? "playing bg-burgundy text-white shadow-lg"
            : "paused bg-white text-burgundy shadow-lg border-2 border-burgundy"
        }`}
        title={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
        aria-pressed={isPlaying}
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
