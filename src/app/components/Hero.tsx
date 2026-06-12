import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, ArrowLeft, ChevronRight, ChevronLeft } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";

import heroImage from "../../imports/logos/hero.png";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { T, isAr } = useLang();
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const ChevronIcon = isAr ? ChevronLeft : ChevronRight;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const orb1Y = useTransform(scrollYProgress, [0, 1], ["0px", "120px"]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ["0px", "80px"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0px", "50px"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0px", "80px"]);

  const gradientText = {
    background: "linear-gradient(135deg,#6450A0 0%,#AF64AF 38%,#00C3E1 72%,#4BC3AF 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const titleWords = T.hero.titleLine2.split(" ");
  const firstGradientWord = titleWords[0];
  const restGradientWords = titleWords.slice(1).join(" ");

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden bg-white pt-24 sm:pt-28"
      dir={isAr ? "rtl" : "ltr"}
    >
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(100,80,160,0.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,195,225,0.035) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        <motion.div
          className="absolute"
          style={{
            top: "-10%",
            left: "-8%",
            width: "55vw",
            height: "55vw",
            maxWidth: 700,
            background: "radial-gradient(circle, rgba(100,80,160,0.12) 0%, transparent 65%)",
            y: orb1Y,
          }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute"
          style={{
            top: "5%",
            right: "-5%",
            width: "45vw",
            height: "45vw",
            maxWidth: 580,
            background: "radial-gradient(circle, rgba(0,195,225,0.10) 0%, transparent 65%)",
            y: orb2Y,
          }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />

        <div
          className="absolute left-1/2 top-0 h-[60vh] w-full -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 50% 0%, rgba(0,195,225,0.08) 0%, transparent 100%)",
          }}
        />

        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{ background: "linear-gradient(0deg, white 0%, transparent 100%)" }}
        />
      </motion.div>

      <div className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <motion.div
            style={{ y: contentY }}
            className={isAr ? "text-center lg:text-right" : "text-center lg:text-left"}
          >
            <motion.h1
              initial={{ y: 70, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl font-black leading-[1.03] tracking-tight text-slate-950 sm:text-6xl md:text-7xl"
            >
              {T.hero.titleLine1}{" "}
              <span style={gradientText}>{firstGradientWord}</span>
              <br />
              <span style={gradientText}>{restGradientWords}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="mx-auto mb-9 mt-7 max-w-2xl text-lg leading-relaxed text-slate-500 sm:text-xl lg:mx-0"
            >
              {T.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34 }}
              className="flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
            >
              <motion.a
                href="#footer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="group relative flex items-center gap-2 overflow-hidden rounded-xl px-7 py-3.5 text-white"
                style={{
                  background: "linear-gradient(135deg,#6450A0,#00C3E1,#4BC3AF)",
                  fontWeight: 900,
                  fontSize: "0.95rem",
                  boxShadow: "0 16px 34px rgba(0,195,225,0.24)",
                }}
              >
                <span className="relative">{T.hero.cta1}</span>
                <ArrowIcon className="relative h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </motion.a>

              <motion.a
                href="#integration"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="group flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 transition-all hover:bg-slate-50"
                style={{
                  border: "1.5px solid #e2e8f0",
                  color: "#1e293b",
                  fontWeight: 900,
                  fontSize: "0.95rem",
                }}
              >
                {T.hero.cta2}
                <ChevronIcon className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isAr ? -40 : 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: imageY }}
            className="relative"
          >
            <div
              className="absolute -inset-6 rounded-[3rem] opacity-70 blur-2xl"
              style={{
                background:
                  "linear-gradient(135deg,rgba(100,80,160,0.22),rgba(0,195,225,0.18),rgba(75,195,175,0.20))",
              }}
            />

            <div className="relative mx-auto w-full max-w-[580px] overflow-hidden rounded-[2.5rem] bg-slate-950 drop-shadow-2xl">
              <img
                src={heroImage}
                alt="Kasaji healthcare team collaboration"
                className="block h-auto w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}