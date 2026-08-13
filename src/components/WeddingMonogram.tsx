interface WeddingMonogramProps {
  className?: string;
}

export const WeddingMonogram = ({ className = "" }: WeddingMonogramProps) => (
  <span
    className={`inline-flex aspect-square w-[1em] items-center justify-center leading-none ${className}`}
    aria-label="D C"
  >
    <svg viewBox="0 0 240 240" className="h-full w-full overflow-visible" aria-hidden="true">
      <g fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        {/* Tall, interlocking initials */}
        <text
          x="83"
          y="165"
          fontFamily="Cormorant Garamond, Georgia, serif"
          fontSize="139"
          fontStyle="italic"
          fontWeight="700"
        >D</text>
        <text
          x="111"
          y="166"
          fontFamily="Cormorant Garamond, Georgia, serif"
          fontSize="139"
          fontStyle="italic"
          fontWeight="700"
        >C</text>

        {/* Calligraphic swashes */}
        <path d="M91 77c-26 8-34 28-24 42 6 8 16 10 24 5-13 13-30 13-38 2-15-20 2-46 38-55Z" fill="none" strokeWidth="3.2" />
        <path d="M77 174c-18 15-31 19-45 12 15 2 25-5 35-20" fill="none" strokeWidth="2.2" />
        <path d="M89 187c24 17 63 16 86-5-14 20-45 31-72 20-8-3-13-8-14-15Z" fill="none" strokeWidth="2.3" />
        <path d="M144 174c16 5 32 2 43-10-8 16-28 24-45 19" fill="none" strokeWidth="2" />

        {/* Fine floral stem */}
        <path d="M67 188c-25-18-33-47-19-72 10-18 18-30 10-51" fill="none" strokeWidth="2.2" />
        <path d="M49 145c-12-9-18-19-18-31M47 126c-1-15 4-25 13-34M52 160c-13-2-22-8-28-17" fill="none" strokeWidth="1.4" />

        {/* Leaves */}
        <path d="M43 117c-13-1-18-8-18-17 10 0 17 5 18 17ZM51 106c-8-9-8-17-3-24 8 6 9 14 3 24ZM39 143c-12 3-20-1-24-8 9-4 17-1 24 8ZM53 151c-10-5-14-12-12-20 9 3 13 10 12 20ZM47 91c-9-5-12-12-10-19 8 3 12 9 10 19Z" strokeWidth="0.8" />

        {/* Small flowers */}
        <g fill="none" strokeWidth="1.4">
          <circle cx="40" cy="119" r="5" />
          <path d="M40 114c-7-10 4-14 6-4 8-7 14 2 4 6 8 7-1 13-6 5-5 9-14 2-5-4-9-4-6-13 1-7Z" />
          <circle cx="49" cy="151" r="4" />
          <path d="M49 147c-6-8 3-11 5-3 7-5 11 3 4 6 5 7-3 10-6 4-4 7-11 1-4-4-7-3-5-10 1-6Z" />
          <circle cx="36" cy="169" r="3.5" />
          <path d="M36 165c-5-7 2-10 5-3 6-4 9 3 3 5 4 6-3 8-5 3-4 6-9 1-3-3-6-3-4-8 0-5Z" />
        </g>

        {/* Four-point stars */}
        <path d="m39 42 3 13 13 3-13 3-3 13-3-13-13-3 13-3 3-13Z" fill="none" strokeWidth="1.3" opacity="0.9" />
        <path d="m189 49 3 12 12 3-12 3-3 12-3-12-12-3 12-3 3-12Z" fill="none" strokeWidth="1.4" />
        <path d="m205 122 2 9 9 2-9 2-2 9-2-9-9-2 9-2 2-9Z" fill="none" strokeWidth="1.1" opacity="0.75" />
        <path d="m104 91 2 8 8 2-8 2-2 8-2-8-8-2 8-2 2-8Z" fill="none" strokeWidth="1" opacity="0.8" />
      </g>
    </svg>
  </span>
);
