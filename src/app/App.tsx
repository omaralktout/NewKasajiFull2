import { LanguageProvider } from "./contexts/LanguageContext";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Products } from "./components/Products";
import { Integration } from "./components/Integration";
import { Principles } from "./components/Principles";

import { Footer } from "./components/Footer";
import { ScrollProgress } from "./components/ScrollProgress";

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white relative">
        <ScrollProgress />
        <Header />
        <Hero />
        <Marquee />
        <Integration />
        <Products />
        <Principles />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
