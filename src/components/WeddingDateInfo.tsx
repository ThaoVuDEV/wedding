import { WEDDING } from "../config/wedding";

interface WeddingDateInfoProps {
  groomName: string;
  brideName: string;
}

const ContactCard = ({
  role,
  name,
  phone,
}: {
  role: string;
  name: string;
  phone: string;
}) => (
  <article className="rounded-[1.75rem] border border-white/80 border-t-4 border-t-[#741d35] bg-white/80 p-5 text-center shadow-[0_20px_55px_rgba(92,35,45,0.1)] backdrop-blur sm:p-7">
    <p className="font-serif text-xl italic text-[#b89258]">{role}</p>
    <h3 className="mt-2 font-script text-4xl text-[#741d35]">{name}</h3>

    <div className="my-5 h-px bg-[#741d35]/10" />

    <a
      href={`tel:${phone.replace(/\s/g, "")}`}
      className="inline-flex items-center gap-2 rounded-full bg-[#fceff1] px-5 py-2.5 font-sans text-sm font-semibold text-[#b52d4c] transition hover:bg-[#f8dfe5]"
    >
      <span aria-hidden="true">☎</span>
      <span>{phone}</span>
    </a>
  </article>
);

export const WeddingDateInfo = ({
  groomName,
  brideName,
}: WeddingDateInfoProps) => (
  <section className="relative flex min-h-[70svh] items-center overflow-hidden bg-[#f8f1eb] px-5 py-14 sm:px-6 sm:py-20">
    <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-[#e9cbd0]/35 blur-3xl" />
    <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#d4af37]/10 blur-3xl" />

    <div className="relative z-10 mx-auto w-full max-w-4xl">
      <div className="grid gap-5 md:grid-cols-2 md:gap-8">
        <ContactCard role="Chú rể" name={groomName} phone={WEDDING.groomPhone} />
        <ContactCard role="Cô dâu" name={brideName} phone={WEDDING.bridePhone} />
      </div>
    </div>
  </section>
);
