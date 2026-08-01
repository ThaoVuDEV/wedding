interface WeddingMonogramProps {
  className?: string;
}

export const WeddingMonogram = ({ className = "" }: WeddingMonogramProps) => (
  <span
    className={`inline-flex items-center justify-center font-script leading-none ${className}`}
    aria-label="D C"
  >
    <span className="relative z-10 translate-x-[0.12em]">D</span>
    <span className="relative z-20 -ml-[0.34em] translate-y-[0.08em]">C</span>
  </span>
);
