import { motion, useScroll } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7C3AED] via-purple-500 to-[#0EA5E9] origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
