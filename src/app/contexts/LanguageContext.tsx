import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { en, ar, Translations } from "../i18n";

export type Lang = "en" | "ar";

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  isAr: boolean;
  T: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  toggleLang: () => {},
  isAr: false,
  T: en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const isAr = lang === "ar";
  const T = isAr ? ar : en;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? "rtl" : "ltr";
    document.documentElement.classList.toggle("is-rtl", isAr);
  }, [lang, isAr]);

  const toggleLang = () => setLang((l) => (l === "en" ? "ar" : "en"));

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, isAr, T }}>
      <div dir={isAr ? "rtl" : "ltr"} className="transition-all duration-300">
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
