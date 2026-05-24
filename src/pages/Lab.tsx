import { motion } from "motion/react";
import { Beaker, Lightbulb, FlaskConical, Rocket } from "lucide-react";

const EXPERIMENTS = [
  {
    title: "Real-time Data Streams",
    description: "Exploring WebSocket integrations for live data visualization in React.",
    icon: <Beaker className="w-8 h-8" />,
    status: "In Progress"
  },
  {
    title: "AI-Driven Insights",
    description: "Integrating LLMs to automate data storytelling and report generation.",
    icon: <Lightbulb className="w-8 h-8" />,
    status: "Experimental"
  },
  {
    title: "Custom D3 Visuals",
    description: "Building a library of reusable, high-fidelity D3 components for React.",
    icon: <FlaskConical className="w-8 h-8" />,
    status: "Beta"
  },
  {
    title: "Edge Computing for Analytics",
    description: "Testing performance gains of running analytical models on edge devices.",
    icon: <Rocket className="w-8 h-8" />,
    status: "Concept"
  }
];

export default function Lab() {
  return (
    <main className="pt-24 md:pt-32 pb-20 px-6 md:px-24 min-h-screen bg-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mb-16 md:mb-24"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-accent mb-6 block">
          Experiments & Ideas
        </span>
        <h1 className="text-4xl md:text-8xl font-display leading-tight mb-8">
          The Lab <br /> (Projects/Lab)
        </h1>
        <p className="text-muted text-base md:text-lg leading-relaxed max-w-2xl">
          A space for exploration, technical experiments, and raw ideas that push the boundaries of data and design.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {EXPERIMENTS.map((exp, i) => (
          <motion.div
            key={exp.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 md:p-12 rounded-2xl md:rounded-3xl border border-line/5 hover:border-accent/20 transition-all group"
          >
            <div className="text-accent mb-8 group-hover:scale-110 transition-transform duration-500">
              {exp.icon}
            </div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-accent mb-4">
              {exp.status}
            </div>
            <h3 className="text-2xl mb-4 group-hover:text-accent transition-colors">{exp.title}</h3>
            <p className="text-muted leading-relaxed">{exp.description}</p>
            <button className="mt-8 text-[10px] uppercase tracking-widest font-bold border-b border-ink pb-1 hover:text-accent hover:border-accent transition-all">
              View Prototype
            </button>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
