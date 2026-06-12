import { motion } from "motion/react";
import { Compass, DatabaseZap, HeartHandshake, Infinity } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";

const ICONS = [HeartHandshake, Compass, DatabaseZap, Infinity];

export function Principles() {
  const { T, isAr } = useLang();

  return (
    <section id="principles" className="relative overflow-hidden bg-white px-5 py-20 sm:px-8" dir={isAr ? "rtl" : "ltr"}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 15% 10%, rgba(100,80,160,0.08), transparent 30%), radial-gradient(circle at 82% 72%, rgba(0,195,225,0.08), transparent 34%)" }} />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 inline-flex rounded-full px-4 py-1.5 text-sm font-black"
              style={{ background: "rgba(100,80,160,0.08)", color: "#6450A0", border: "1px solid rgba(100,80,160,0.16)" }}
            >
              {T.values.badge}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl"
            >
              {T.values.title}
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="max-w-3xl text-lg font-medium leading-8 text-slate-600"
          >
            {T.values.subtitle}
          </motion.p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {T.values.items.map((item, index) => {
            const Icon = ICONS[index];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ background: index % 2 === 0 ? "linear-gradient(90deg,#6450A0,#00C3E1)" : "linear-gradient(90deg,#00C3E1,#4BC3AF)" }}
                />
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: "rgba(0,195,225,0.09)", color: index % 2 === 0 ? "#6450A0" : "#08799A" }}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-black text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
