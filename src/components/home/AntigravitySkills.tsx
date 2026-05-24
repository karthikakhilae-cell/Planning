import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { SKILLS } from "../../constants";

export default function AntigravitySkills() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Flatten all skill items from the constants
  const allSkills = SKILLS.flatMap(category => category.items);

  // Function to generate random floating animations
  const getRandomAnimation = (index: number) => {
    // Stable pseudo-randomness based on index so it doesn't jump on re-renders
    const random1 = Math.sin(index * 1.1) * 20;
    const random2 = Math.cos(index * 1.3) * 20;

    return {
      y: [0, random1, 0],
      x: [0, random2, 0],
      rotate: [0, random1 / 2, 0],
    };
  };

  return (
    <section className="py-24 px-4 sm:px-8 md:px-12 lg:px-24 overflow-hidden relative">
      <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-4 block">
          The Stack
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-display leading-tight">
          Tools & <span className="text-accent">Technologies</span>
        </h2>
      </div>

      <div className="relative max-w-5xl mx-auto flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 min-h-[300px] items-center content-center">
        {allSkills.map((skill, i) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.05 }}
            className="z-10"
          >
            <motion.div
              animate={mounted ? getRandomAnimation(i) : {}}
              transition={
                mounted
                  ? {
                    duration: 5 + Math.abs(Math.sin(i)) * 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }
                  : {}
              }
              whileHover={{ scale: 1.1 }}
              className="bg-white/90 backdrop-blur-md border border-line/10 text-ink px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-2xl shadow-ink/5 flex items-center justify-center cursor-default hover:bg-accent hover:text-white hover:border-accent hover:shadow-accent/20 transition-colors duration-300"
            >
              <span className="text-sm md:text-base font-bold tracking-widest uppercase">
                {skill}
              </span>
            </motion.div>
          </motion.div>
        ))}

        {/* Ambient background blur elements for the antigravity zone */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl -z-10 opacity-50 pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-accent/10 blur-[80px] rounded-full animate-pulse" />
          <div className="absolute bottom-[20%] right-[10%] w-64 h-64 bg-accent/10 blur-[80px] rounded-full animate-pulse" style={{ animationDelay: "2s" }} />
        </div>
      </div>
    </section>
  );
}
