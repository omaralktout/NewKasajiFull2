import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Brain,
  BookOpen,
  HeartHandshake,
  LineChart,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { useLang } from "../contexts/LanguageContext";

import kasajiAiLogo from "../../imports/logos/kasaji-ai-full.png";
import kasajiXmLogo from "../../imports/logos/kasaji-xm-full.png";
import kasajiAcademyLogo from "../../imports/logos/kasaji-academy-full.png";

import prAiImage from "../../imports/logos/PR-AI.png";
import prXmImage from "../../imports/logos/PR-XM.png";
import prAkImage from "../../imports/logos/PR-AK.png";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

const CONFIGS = [
  {
    id: "kasaji-ai",
    image: prAiImage,
    logo: kasajiAiLogo,
    accent: "#6450A0",
    darkAccent: "#4B3E8F",
    gradient: "linear-gradient(135deg,#6450A0,#4B5596,#00C3E1)",
    icons: [Brain, Sparkles],
  },
  {
    id: "kasaji-xm",
    image: prXmImage,
    logo: kasajiXmLogo,
    accent: "#00A8D7",
    darkAccent: "#08799A",
    gradient: "linear-gradient(135deg,#00C3E1,#46A0C8)",
    icons: [HeartHandshake, MessageSquare],
  },
  {
    id: "kasaji-academy",
    image: prAkImage,
    logo: kasajiAcademyLogo,
    accent: "#4BC3AF",
    darkAccent: "#147A70",
    gradient: "linear-gradient(135deg,#4BC3AF,#00C3E1)",
    icons: [BookOpen, LineChart],
  },
] as const;

type CfgIdx = 0 | 1 | 2;

type ProductItem = {
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  miniFeatures: { title: string; text: string }[];
  footerWords: string[];
  buttonText: string;
  secondLink: string;
};

function ProductShowcase({
  idx,
  item,
  isAr,
  isMobile,
}: {
  idx: CfgIdx;
  item: ProductItem;
  isAr: boolean;
  isMobile: boolean;
}) {
  const cfg = CONFIGS[idx];
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [imageReady, setImageReady] = useState(false);

  useEffect(() => {
    setImageReady(false);
  }, [cfg.image]);

  const desktopOverlay = isAr
    ? "linear-gradient(270deg, rgba(15,23,42,0.66) 0%, rgba(15,23,42,0.22) 44%, rgba(15,23,42,0.04) 100%)"
    : "linear-gradient(90deg, rgba(15,23,42,0.66) 0%, rgba(15,23,42,0.22) 44%, rgba(15,23,42,0.04) 100%)";

  return (
    <section
      ref={ref}
      id={cfg.id}
      className="relative px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-14 xl:px-14"
      dir={isAr ? "rtl" : "ltr"}
    >
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-[1680px]"
      >
        <div className="relative min-h-[590px] overflow-hidden rounded-[30px] bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.14)] sm:rounded-[38px] lg:min-h-[680px] lg:rounded-[46px]">
          {/* Placeholder بدل ما الصورة تبين وهي بتحمل جزء جزء */}
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: imageReady ? 0 : 1,
            }}
            transition={{ duration: 0.45 }}
            style={{
              background: `${cfg.gradient}, radial-gradient(circle at 30% 20%, rgba(255,255,255,0.22), transparent 34%), #0f172a`,
            }}
          />

          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: imageReady ? 0 : 0.18,
            }}
            transition={{ duration: 0.45 }}
            style={{
              background:
                "linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.18) 45%, transparent 70%)",
              backgroundSize: "220% 100%",
            }}
          />

          <motion.img
            src={cfg.image}
            alt={item.name}
            loading={idx === 0 ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
            onLoad={() => setImageReady(true)}
            initial={{ opacity: 0, scale: 1.025 }}
            animate={
              imageReady && inView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 1.025 }
            }
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div
            className="absolute inset-0"
            style={{
              background: isMobile
                ? "linear-gradient(180deg, rgba(15,23,42,0.08) 0%, rgba(15,23,42,0.62) 100%)"
                : desktopOverlay,
            }}
          />

          <div
            className={`relative z-10 flex min-h-[590px] items-center p-4 sm:p-7 lg:min-h-[680px] lg:p-10 xl:p-12 ${
              isAr ? "justify-end" : "justify-start"
            }`}
          >
            <motion.div
              initial={{
                opacity: 0,
                x: isMobile ? 0 : isAr ? 36 : -36,
                y: isMobile ? 24 : 0,
              }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : undefined}
              transition={{
                duration: 0.75,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-full max-w-[720px] rounded-[28px] bg-white/95 px-6 py-7 sm:rounded-[36px] sm:px-9 sm:py-9 lg:px-12 lg:py-11"
              style={{
                boxShadow:
                  "0 30px 90px rgba(15,23,42,0.22), inset 0 1px 0 rgba(255,255,255,0.95)",
                backdropFilter: "blur(24px) saturate(150%)",
                WebkitBackdropFilter: "blur(24px) saturate(150%)",
              }}
            >
              <div className="mb-8">
                <img
                  src={cfg.logo}
                  alt={item.name}
                  loading="eager"
                  decoding="async"
                  draggable={false}
                  className="h-11 w-auto object-contain sm:h-12 lg:h-16"
                />

                <h2 className="mt-6 text-4xl font-black leading-[1.02] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                  {item.name}
                </h2>

                <p
                  className="mt-3 text-lg font-bold sm:text-xl lg:text-2xl"
                  style={{ color: cfg.darkAccent }}
                >
                  {item.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 border-y border-slate-200/80 py-7 sm:grid-cols-2 sm:gap-6">
                {item.miniFeatures.map((feature, featureIndex) => {
                  const FeatureIcon = cfg.icons[featureIndex];

                  return (
                    <div
                      key={feature.title}
                      className={`${
                        featureIndex === 1
                          ? isAr
                            ? "sm:border-r sm:pr-6"
                            : "sm:border-l sm:pl-6"
                          : ""
                      } border-slate-200/90`}
                    >
                      <div
                        className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full"
                        style={{
                          background: `${cfg.accent}14`,
                          color: cfg.darkAccent,
                        }}
                      >
                        <FeatureIcon className="h-8 w-8" strokeWidth={1.9} />
                      </div>

                      <h3 className="text-center text-lg font-black text-slate-950 sm:text-xl">
                        {feature.title}
                      </h3>

                      <p className="mx-auto mt-3 max-w-[250px] text-center text-sm font-medium leading-relaxed text-slate-700 sm:text-base">
                        {feature.text}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="pt-7">
                <p className="max-w-[590px] text-xl font-black leading-snug text-slate-950 sm:text-2xl lg:text-[1.7rem]">
                  {item.tagline}
                </p>

                <p className="mt-4 max-w-[590px] text-base font-medium leading-relaxed text-slate-700 sm:text-lg">
                  {item.description}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                  {item.footerWords.map((word, wordIndex) => (
                    <div key={word} className="flex items-center gap-5">
                      <span
                        className="text-base font-black sm:text-lg"
                        style={{ color: cfg.darkAccent }}
                      >
                        {word}
                      </span>

                      {wordIndex < item.footerWords.length - 1 && (
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: cfg.darkAccent }}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
                  <a
                    href={`#${cfg.id}`}
                    className="inline-flex min-h-[56px] items-center justify-center rounded-xl px-7 text-base font-black text-white transition-transform hover:-translate-y-0.5 sm:text-lg"
                    style={{
                      background: cfg.gradient,
                      boxShadow: `0 18px 34px -18px ${cfg.darkAccent}`,
                    }}
                  >
                    {item.buttonText}
                  </a>

                  <a
                    href={`#${cfg.id}`}
                    className="inline-flex min-h-[56px] items-center justify-center gap-3 text-base font-black sm:text-lg"
                    style={{ color: cfg.darkAccent }}
                  >
                    {item.secondLink}
                    <ArrowIcon className="h-5 w-5" strokeWidth={2.4} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export function Products() {
  const { T, isAr } = useLang();
  const isMobile = useIsMobile();

  useEffect(() => {
    CONFIGS.forEach((cfg) => {
      const img = new Image();
      img.src = cfg.image;
    });
  }, []);

  return (
    <div className="relative bg-white py-8 sm:py-12">
      <div
        className="mx-auto max-w-5xl px-5 text-center"
        dir={isAr ? "rtl" : "ltr"}
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 inline-flex rounded-full px-4 py-1.5 text-sm font-black"
          style={{
            background: "rgba(0,195,225,0.08)",
            color: "#08799A",
            border: "1px solid rgba(0,195,225,0.18)",
          }}
        >
          {T.products.badge}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.06 }}
          className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
        >
          {T.products.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12 }}
          className="mx-auto mt-5 max-w-3xl text-lg font-medium leading-8 text-slate-600"
        >
          {T.products.subtitle}
        </motion.p>
      </div>

      {CONFIGS.map((cfg, index) => (
        <ProductShowcase
          key={cfg.id}
          idx={index as CfgIdx}
          item={T.products.items[index]}
          isAr={isAr}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
} 