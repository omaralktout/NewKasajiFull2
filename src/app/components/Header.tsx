import { motion, AnimatePresence } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import type { MouseEvent } from "react";
import {
  Globe,
  Menu,
  X,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import { useLang } from "../contexts/LanguageContext";

import kasajiFullLogo from "../../imports/logos/kasaji-and-full.png";
import aiLogo from "../../imports/logos/kasaji-ai-full.png";
import xmLogo from "../../imports/logos/kasaji-xm-full.png";
import academyLogo from "../../imports/logos/kasaji-academy-full.png";

type ServiceTheme = {
  image: string;
  accent: string;
  soft: string;
  gradient: string;
};

const SERVICE_THEMES: ServiceTheme[] = [
  {
    image: aiLogo,
    accent: "#6450A0",
    soft: "rgba(100,80,160,0.10)",
    gradient: "linear-gradient(135deg,#6450A0 0%,#4B5596 55%,#00C3E1 100%)",
  },
  {
    image: xmLogo,
    accent: "#00A8D7",
    soft: "rgba(0,195,225,0.11)",
    gradient: "linear-gradient(135deg,#00C3E1 0%,#46A0C8 100%)",
  },
  {
    image: academyLogo,
    accent: "#4BC3AF",
    soft: "rgba(75,195,175,0.12)",
    gradient: "linear-gradient(135deg,#4BC3AF 0%,#00C3E1 100%)",
  },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeMega, setActiveMega] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { toggleLang, isAr, T } = useLang();

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const services = useMemo(
    () =>
      T.platform.services.map((item, index) => ({
        ...item,
        ...SERVICE_THEMES[index],
      })),
    [T]
  );

  const activeService = services[activeMega];
  const isScrolledOrOpen = scrolled || mobileOpen || megaOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1280) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = (id: string, e?: MouseEvent<HTMLElement>) => {
    e?.preventDefault();
    setActiveId(id);
    setMobileOpen(false);
    setMegaOpen(false);

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navLinks = [
    { label: T.nav.company, href: "#footer" },
    { label: T.nav.why, href: "#integration" },
    { label: T.nav.resources, href: "#footer" },
    { label: T.nav.tryDiscover, href: "#footer" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.38, ease: "easeOut" }}
        className="fixed left-0 right-0 top-0 z-50 px-3 sm:px-5 pt-3 transition-all duration-300"
        dir={isAr ? "rtl" : "ltr"}
      >
        <div
          className="mx-auto flex h-[72px] max-w-[1450px] items-center justify-between gap-3 rounded-full px-3 sm:px-5 transition-all duration-300"
          style={{
            background: isScrolledOrOpen ? "rgba(255,255,255,0.91)" : "rgba(255,255,255,0.72)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: isScrolledOrOpen
              ? "1px solid rgba(226,232,240,0.95)"
              : "1px solid rgba(255,255,255,0.65)",
            boxShadow: isScrolledOrOpen
              ? "0 22px 70px rgba(15,23,42,0.12)"
              : "0 12px 42px rgba(15,23,42,0.06)",
          }}
        >
          <a
            href="#"
            onClick={(e) => handleNavClick("top", e)}
            className="flex min-w-0 shrink-0 items-center gap-2"
            aria-label="Kasaji& home"
          >
            <img
              src={kasajiFullLogo}
              alt="Kasaji&"
              className="h-9 w-auto sm:h-10 lg:h-11 object-contain"
              draggable={false}
            />
          </a>

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Main navigation">
            <div className="relative" onMouseEnter={() => setMegaOpen(true)}>
              <button
                onClick={() => setMegaOpen((v) => !v)}
                className="group flex items-center gap-2 rounded-full px-4 py-2.5 text-[0.92rem] font-black transition"
                style={{
                  color: megaOpen ? "#0f172a" : "#334155",
                  background: megaOpen
                    ? "linear-gradient(135deg,rgba(100,80,160,0.11),rgba(0,195,225,0.10))"
                    : "transparent",
                }}
              >
                {T.nav.platform}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
                  style={{ color: "#00A8D7" }}
                />
              </button>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full px-4 py-2.5 text-[0.92rem] font-bold text-slate-700 transition hover:bg-slate-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 xl:flex">
            <motion.button
              onClick={toggleLang}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-black"
              style={{
                color: "#334155",
                border: "1.4px solid rgba(226,232,240,0.95)",
                background: "rgba(255,255,255,0.74)",
              }}
            >
              <Globe className="h-3.5 w-3.5" />
              {T.nav.languageShort}
            </motion.button>

            <button className="rounded-full px-3.5 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-100">
              {T.nav.login}
            </button>

            <motion.a
              href="#footer"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full px-4 py-2.5 text-sm font-black text-slate-900 transition"
              style={{
                border: "1.4px solid rgba(15,187,211,0.30)",
                background: "linear-gradient(135deg,rgba(255,255,255,0.96),rgba(240,253,255,0.95))",
              }}
            >
              {T.nav.speakExpert}
            </motion.a>

            <motion.a
              href="#kasaji-ai"
              onClick={(e) => handleNavClick("kasaji-ai", e)}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex items-center gap-1.5 overflow-hidden rounded-full px-5 py-2.5 text-sm font-black text-white"
              style={{
                background: "linear-gradient(135deg,#6450A0 0%,#00C3E1 52%,#4BC3AF 100%)",
                boxShadow: "0 10px 28px rgba(0,195,225,0.28)",
              }}
            >
              <span>{T.nav.explore}</span>
              <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </motion.a>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-black"
              style={{
                color: "#6450A0",
                border: "1.4px solid rgba(100,80,160,0.26)",
                background: "rgba(100,80,160,0.06)",
              }}
            >
              <Globe className="h-3 w-3" />
              {T.nav.languageShort}
            </button>

            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="rounded-full p-2.5"
              style={{ color: "#0f172a", background: "rgba(248,250,252,0.95)" }}
              aria-label={T.nav.mobileMenu}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {megaOpen && (
            <motion.div
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
              initial={{ opacity: 0, y: 10, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.985 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="absolute left-1/2 top-[92px] hidden w-[min(1360px,calc(100vw-40px))] -translate-x-1/2 overflow-hidden rounded-[2rem] xl:block"
              style={{
                background: "rgba(255,255,255,0.98)",
                border: "1px solid rgba(226,232,240,0.95)",
                boxShadow: "0 34px 110px rgba(15,23,42,0.19)",
                backdropFilter: "blur(22px)",
              }}
            >
              <div className="grid min-h-[520px] grid-cols-[330px_1fr] bg-white">
                <aside className="relative p-7">
                  <div
                    className="absolute bottom-8 top-8 w-px ltr:right-0 rtl:left-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent, rgba(148,163,184,0.35), transparent)",
                    }}
                  />

                  <div className="mb-7">
                    <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.18em] text-slate-500">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#00A8D7" }} />
                      {T.nav.serviceLines}
                    </p>
                    <h3 className="text-[1.72rem] font-black leading-tight tracking-tight text-slate-950">
                      {T.platform.megaTitle}
                    </h3>
                    <p className="mt-2.5 text-[0.83rem] font-medium leading-6 text-slate-500">
                      {T.platform.megaSubtitle}
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {services.map((item, index) => {
                      const active = activeMega === index;

                      return (
                        <button
                          key={item.id}
                          onMouseEnter={() => setActiveMega(index)}
                          onFocus={() => setActiveMega(index)}
                          onClick={() => setActiveMega(index)}
                          className="group flex w-full items-center gap-3 rounded-[1.35rem] px-3.5 py-3 text-start"
                          style={{
                            background: active ? item.soft : "rgba(248,250,252,0.58)",
                            border: active ? `1px solid ${item.accent}32` : "1px solid rgba(226,232,240,0.72)",
                            boxShadow: active ? `0 14px 34px ${item.accent}12` : "none",
                            transition: "background 140ms ease, border-color 140ms ease, box-shadow 140ms ease, transform 140ms ease",
                          }}
                        >
                          <span className="flex h-12 w-[116px] shrink-0 items-center justify-center rounded-2xl border border-slate-200/80 bg-white px-2.5">
                            <img
                              src={item.image}
                              alt={item.label}
                              className="max-h-9 w-auto max-w-[100px] object-contain"
                              draggable={false}
                            />
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="line-clamp-2 block text-[0.78rem] font-extrabold leading-5 text-slate-600">
                              {item.eyebrow}
                            </span>
                          </span>

                          <ArrowIcon
                            className={`h-4 w-4 shrink-0 transition-all duration-150 ${
                              active ? "opacity-100" : "opacity-0"
                            }`}
                            style={{ color: item.accent }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </aside>

                <main className="relative overflow-hidden p-8">
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 86% 8%, ${activeService.accent}12, transparent 30%), radial-gradient(circle at 10% 90%, rgba(75,195,175,0.10), transparent 34%)`,
                    }}
                  />

                  <motion.div
                    key={activeService.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="relative"
                  >
                    <div className="mb-6 flex items-start justify-between gap-8">
                      <div className="min-w-0 pt-2">
                        <h2 className="max-w-4xl text-[2.05rem] font-black leading-[1.08] tracking-tight text-slate-950 lg:text-[2.35rem]">
                          {activeService.headline}
                        </h2>

                        <p className="mt-3.5 max-w-4xl text-[0.94rem] font-medium leading-7 text-slate-600">
                          {activeService.description}
                        </p>
                      </div>

                      <a
                        href={`#${activeService.id}`}
                        onClick={(e) => handleNavClick(activeService.id, e)}
                        className="group flex shrink-0 items-center gap-3 rounded-[1.4rem] border border-slate-200/90 bg-white/85 px-4 py-3 shadow-sm transition hover:bg-white hover:shadow-md"
                        aria-label={`Open ${activeService.label}`}
                      >
                        <img
                          src={activeService.image}
                          alt={activeService.label}
                          className="h-14 w-auto max-w-[170px] object-contain"
                          draggable={false}
                        />
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5"
                          style={{ color: activeService.accent, background: activeService.soft }}
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </a>
                    </div>

                    <div className="mb-3 grid grid-cols-[1.05fr_0.95fr] gap-8">
                      <div>
                        <p className="mb-3 text-[0.68rem] font-black uppercase tracking-[0.18em] text-slate-400">
                          {activeService.productsTitle}
                        </p>

                        <div className="grid grid-cols-1 gap-2">
                          {activeService.products.map((item) => (
                            <a
                              key={item}
                              href={`#${activeService.id}`}
                              onClick={(e) => handleNavClick(activeService.id, e)}
                              className="group flex items-center justify-between rounded-[1.05rem] bg-slate-50/82 px-4 py-2.5 text-[0.82rem] font-black leading-5 transition hover:bg-white hover:shadow-sm"
                              style={{ color: activeService.accent }}
                            >
                              <span className="pe-3">{item}</span>
                              <ArrowIcon className="h-3.5 w-3.5 shrink-0 opacity-45 transition-transform duration-150 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                            </a>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="mb-3 text-[0.68rem] font-black uppercase tracking-[0.18em] text-slate-400">
                          {activeService.outcomesTitle}
                        </p>

                        <div className="space-y-2.5">
                          {activeService.outcomes.map((item) => (
                            <div key={item} className="flex items-start gap-3 text-[0.93rem] font-bold leading-6 text-slate-700">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: activeService.accent }} />
                              {item}
                            </div>
                          ))}
                        </div>

                        <div
                          className="mt-6 overflow-hidden rounded-[1.55rem] p-6 text-white"
                          style={{
                            background: activeService.gradient,
                            boxShadow: `0 24px 64px ${activeService.accent}22`,
                          }}
                        >
                          <div className="absolute opacity-10" />
                          <p className="text-xs font-black uppercase tracking-[0.18em] text-white/70">
                            {T.platform.overviewTitle}
                          </p>
                          <h3 className="mt-2.5 text-[1.9rem] font-black leading-none tracking-tight">
                            {activeService.label}
                          </h3>
                          <p className="mt-3.5 max-w-[430px] text-[0.82rem] font-medium leading-6 text-white/78">
                            {T.platform.overviewText}
                          </p>
                          <a
                            href={`#${activeService.id}`}
                            onClick={(e) => handleNavClick(activeService.id, e)}
                            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[0.82rem] font-black"
                            style={{ color: activeService.accent }}
                          >
                            {T.platform.openPlatform}
                            <ArrowIcon className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </main>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-x-3 top-[92px] z-40 max-h-[calc(100vh-104px)] overflow-hidden rounded-[2rem] xl:hidden"
            style={{
              background: "rgba(255,255,255,0.98)",
              border: "1px solid rgba(226,232,240,0.95)",
              boxShadow: "0 24px 80px rgba(15,23,42,0.18)",
              backdropFilter: "blur(24px)",
            }}
            dir={isAr ? "rtl" : "ltr"}
          >
            <div
              className="h-1"
              style={{ background: "linear-gradient(90deg,#6450A0,#AF64AF,#00C3E1,#4BC3AF)" }}
            />

            <div className="max-h-[calc(100vh-108px)] overflow-y-auto p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                    {T.nav.serviceLines}
                  </p>
                  <h3 className="mt-1 text-xl font-black text-slate-950">
                    {T.platform.megaTitle}
                  </h3>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full bg-slate-100 p-2 text-slate-600"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-3">
                {services.map((item, i) => {
                  const active = activeId === item.id;
                  return (
                    <motion.a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => handleNavClick(item.id, e)}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.18 }}
                      className="relative overflow-hidden rounded-[1.35rem] border bg-white p-4"
                      style={{ borderColor: active ? `${item.accent}36` : "rgba(226,232,240,0.86)", boxShadow: active ? `0 16px 38px ${item.accent}12` : "none" }}
                    >
                      <div className="relative flex items-center gap-3">
                        <span className="flex h-12 w-32 shrink-0 items-center justify-center rounded-2xl bg-slate-50 px-3">
                          <img
                            src={item.image}
                            alt={item.label}
                            className="max-h-9 w-auto max-w-[112px] object-contain"
                            draggable={false}
                          />
                        </span>
                        <span className="min-w-0">
                          <span className="line-clamp-1 block text-xs font-bold text-slate-500">{item.eyebrow}</span>
                        </span>
                        <ArrowIcon className="ms-auto h-5 w-5" style={{ color: item.accent }} />
                      </div>
                      <p className="relative mt-3 line-clamp-2 text-sm font-medium leading-6 text-slate-600">
                        {item.headline}
                      </p>
                      {active && <span className="absolute bottom-3 end-4 h-2 w-2 rounded-full" style={{ background: item.accent }} />}
                    </motion.a>
                  );
                })}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-2xl bg-slate-50 px-4 py-3 text-center text-sm font-black text-slate-700"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="mt-4 grid gap-2 border-t border-slate-200 pt-4">
                <button className="rounded-2xl bg-slate-50 py-3 text-sm font-black text-slate-800">
                  {T.nav.login}
                </button>
                <a
                  href="#footer"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl py-3 text-center text-sm font-black text-slate-950"
                  style={{ background: "linear-gradient(135deg,rgba(0,195,225,0.12),rgba(75,195,175,0.14))" }}
                >
                  {T.nav.requestDemo}
                </a>
                <a
                  href="#kasaji-ai"
                  onClick={(e) => handleNavClick("kasaji-ai", e)}
                  className="rounded-2xl py-3 text-center text-sm font-black text-white"
                  style={{ background: "linear-gradient(135deg,#6450A0,#00C3E1,#4BC3AF)" }}
                >
                  {T.nav.explore}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
