import { motion } from "motion/react";
import { useLang } from "../contexts/LanguageContext";
import googleAILogo from "../../imports/3.png";
import openAILogo    from "../../imports/6.png";
import nvidiaLogo    from "../../imports/7.jpeg";

const LOGOS = [
  { src: googleAILogo, alt: "Google AI",              bg: "#ffffff" },
  { src: openAILogo,   alt: "OpenAI",                 bg: "#ffffff" },
  { src: nvidiaLogo,   alt: "NVIDIA Inception Program", bg: "#ffffff" },
];

// Triple for a seamless 3-copy loop
const ALL = [...LOGOS, ...LOGOS, ...LOGOS];

export function Marquee() {
  const { isAr, T } = useLang();

  const label = isAr
    ? "شركاؤنا التقنيون"
    : "Trusted Technology Partners";

  // Direction: RTL moves from -33% → 0 (rightward), LTR moves 0 → -33% (leftward)
  const fromX = isAr ? "-33.33%" : "0%";
  const toX   = isAr ? "0%"      : "-33.33%";

  return (
    <div
      className="relative py-10"
      style={{
        background: "linear-gradient(180deg,#faf7ff 0%,#f4f8ff 100%)",
        borderTop:    "1px solid rgba(124,58,237,0.08)",
        borderBottom: "1px solid rgba(14,165,233,0.08)",
      }}
    >
      {/* Section label */}
      <p
        className="text-center text-xs mb-7 tracking-widest uppercase"
        style={{ color: "rgba(100,116,139,0.6)", fontWeight: 600, letterSpacing: "0.14em" }}
      >
        {label}
      </p>

      {/* Scrolling row */}
      <div className="relative overflow-hidden">
        {/* Fade left */}
        <div
          className="absolute inset-y-0 left-0 w-28 pointer-events-none z-10"
          style={{ background: "linear-gradient(90deg,#faf7ff 0%,transparent 100%)" }}
        />
        {/* Fade right */}
        <div
          className="absolute inset-y-0 right-0 w-28 pointer-events-none z-10"
          style={{ background: "linear-gradient(270deg,#f4f8ff 0%,transparent 100%)" }}
        />

        <motion.div
          className="flex items-center"
          animate={{ x: [fromX, toX] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {ALL.map((logo, i) => (
            <LogoCard key={i} logo={logo} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function LogoCard({ logo }: { logo: typeof LOGOS[number] }) {
  return (
    <div
      className="group mx-8 flex-shrink-0"
      style={{ width: 180 }}
    >
      <div
        className="flex items-center justify-center h-16 rounded-xl px-4 py-2 transition-all duration-300"
        style={{
          background: "#ffffff",
          border: "1.5px solid rgba(226,232,240,0.7)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
          transition: "filter 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease",
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.boxShadow = "0 6px 24px rgba(124,58,237,0.12)";
          el.style.borderColor = "rgba(124,58,237,0.2)";
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.boxShadow = "0 2px 10px rgba(0,0,0,0.04)";
          el.style.borderColor = "rgba(226,232,240,0.7)";
        }}
      >
        <img
          src={logo.src}
          alt={logo.alt}
          className="h-12 w-auto object-contain select-none"
          draggable={false}
        />
      </div>
    </div>
  );
}