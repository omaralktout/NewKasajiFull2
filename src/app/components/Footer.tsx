import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowUpRight, Bot, CalendarDays, MessageCircle } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import kasajiFullLogo from "../../imports/logos/kasaji-and-full.png";

export function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const { T, isAr } = useLang();
  const TF = T.footer;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.05 }
    );
    const el = document.getElementById("footer");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const platformLinks = [
    { label: TF.links.ai, href: "#kasaji-ai" },
    { label: TF.links.xm, href: "#kasaji-xm" },
    { label: TF.links.academy, href: "#kasaji-academy" },
  ];

  const companyLinks = [
    { label: TF.links.aboutUs, href: "#" },
    { label: TF.links.leadership, href: "#" },
    { label: TF.links.careers, href: "#" },
    { label: TF.links.news, href: "#" },
  ];

  const resourceLinks = [
    { label: TF.links.insights, href: "#" },
    { label: TF.links.events, href: "#" },
    { label: TF.links.customerStories, href: "#" },
    { label: TF.links.tryDiscover, href: "#" },
  ];

  const columnVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay } }),
  };

  return (
    <footer id="footer" className="relative overflow-hidden" style={{ background: "#070b18" }} dir={isAr ? "rtl" : "ltr"}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 82% 10%, rgba(0,195,225,0.13), transparent 32%), radial-gradient(circle at 12% 70%, rgba(100,80,160,0.18), transparent 34%), linear-gradient(180deg,#07101f,#070b18)",
        }}
      />
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg,transparent,rgba(100,80,160,0.7),rgba(0,195,225,0.75),rgba(75,195,175,0.6),transparent)" }} />

      <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-16 sm:px-8">
        <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl sm:p-8"
          >
            <img src={kasajiFullLogo} alt="Kasaji&" className="mb-6 h-12 w-auto object-contain" />
            <h3 className="max-w-3xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
              {T.hero.titleLine1} {T.hero.titleLine2}
            </h3>
            <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-300/80">
              {TF.desc}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <motion.a
                href="#"
                whileHover={{ scale: 1.02, y: -1 }}
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-black text-white"
                style={{ background: "linear-gradient(135deg,#6450A0,#00C3E1,#4BC3AF)" }}
              >
                <CalendarDays className="h-4 w-4" />
                {TF.links.meeting}
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.02, y: -1 }}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.08] px-5 py-3 text-sm font-black text-white"
              >
                <Bot className="h-4 w-4" />
                {TF.links.chatbot}
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl sm:p-8"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: "rgba(0,195,225,0.12)", color: "#00C3E1" }}>
              <MessageCircle className="h-6 w-6" />
            </div>
            <h4 className="text-2xl font-black text-white">{TF.links.chatbot}</h4>
            <p className="mt-3 text-sm font-medium leading-7 text-slate-300/80">{TF.chatbotText}</p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.08] p-3">
              <div className="mb-3 flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-black text-slate-700">
                <span className="h-8 w-8 rounded-full" style={{ background: "radial-gradient(circle,#00C3E1,#6450A0)" }} />
                Speak now
              </div>
              <div className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-500">
                Ask Kasaji& a question →
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div custom={0.05} variants={columnVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"}>
            <h4 className="mb-5 text-xs font-black uppercase tracking-[0.16em] text-white/80">{TF.cols.platform}</h4>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-white">
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div custom={0.12} variants={columnVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"}>
            <h4 className="mb-5 text-xs font-black uppercase tracking-[0.16em] text-white/80">{TF.cols.company}</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm font-semibold text-slate-400 transition hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div custom={0.19} variants={columnVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"}>
            <h4 className="mb-5 text-xs font-black uppercase tracking-[0.16em] text-white/80">{TF.cols.resources}</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm font-semibold text-slate-400 transition hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div custom={0.26} variants={columnVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"}>
            <h4 className="mb-5 text-xs font-black uppercase tracking-[0.16em] text-white/80">{TF.cols.contact}</h4>
            <div className="space-y-3">
              <a href="#" className="block rounded-2xl bg-white/[0.08] px-4 py-3 text-sm font-black text-white transition hover:bg-white/[0.12]">
                {T.nav.speakExpert}
              </a>
              <a href="#" className="block rounded-2xl px-4 py-3 text-sm font-black text-white" style={{ background: "linear-gradient(135deg,#6450A0,#00C3E1)" }}>
                {T.nav.explore}
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.42 }}
          className="flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <span className="text-sm font-medium text-slate-500">{TF.copyright}</span>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {[TF.privacy, TF.terms, TF.cookies].map((label) => (
              <a key={label} href="#" className="text-xs font-semibold text-slate-500 transition hover:text-slate-300">
                {label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
