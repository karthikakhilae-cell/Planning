import { motion } from "motion/react";
import { PenTool, Palette, BookOpen, Sparkles } from "lucide-react";

const CREATIVE_WORKS = [
  {
    title: "Essays on Data Ethics",
    description: "A series of long-form essays exploring the ethical implications of data collection and AI.",
    icon: <PenTool className="w-8 h-8" />,
    category: "Writing"
  },
  {
    title: "Digital Art Collection",
    description: "Experimental digital art pieces created using generative algorithms and manual touch.",
    icon: <Palette className="w-8 h-8" />,
    category: "Visual Arts"
  },
  {
    title: "Short Stories",
    description: "Exploring human connection and digital isolation through speculative fiction.",
    icon: <BookOpen className="w-8 h-8" />,
    category: "Fiction"
  },
  {
    title: "Creative Coding",
    description: "Using code as a medium for artistic expression and interactive experiences.",
    icon: <Sparkles className="w-8 h-8" />,
    category: "Code Art"
  }
];

export default function Arts() {
  return (
    <main className="pt-24 md:pt-32 pb-20 px-4 sm:px-8 md:px-12 lg:px-24 min-h-screen bg-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mb-12 md:mb-24"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-accent mb-4 md:mb-6 block">
          Creative Work
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-display leading-[0.9] mb-6 md:mb-8">
          Arts <br /> & Writing
        </h1>
        <p className="text-muted text-base md:text-lg leading-relaxed max-w-2xl font-light">
          A space for my creative pursuits, from long-form writing to digital art and creative coding experiments.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
        {CREATIVE_WORKS.map((work, i) => (
          <motion.div
            key={work.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 md:p-12 rounded-[2rem] md:rounded-3xl border border-line/5 hover:border-accent/20 transition-all group"
          >
            <div className="text-accent mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500">
              {work.icon}
            </div>
            <div className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-muted mb-3 md:mb-4">
              {work.category}
            </div>
            <h3 className="text-xl md:text-2xl mb-3 md:mb-4 group-hover:text-accent transition-colors font-display">{work.title}</h3>
            <p className="text-muted text-xs md:text-sm leading-relaxed">{work.description}</p>
            <button className="mt-6 md:mt-8 text-[9px] md:text-[10px] uppercase tracking-widest font-bold border-b border-ink pb-1 hover:text-accent hover:border-accent transition-all">
              Explore Work
            </button>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
