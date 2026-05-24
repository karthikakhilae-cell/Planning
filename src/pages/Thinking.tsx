import { motion } from "motion/react";
import { BarChart3, TrendingUp, PieChart, Activity } from "lucide-react";

const THOUGHTS = [
  {
    title: "The Power of Visualization",
    description: "How data storytelling can transform complex datasets into actionable business strategies.",
    icon: <BarChart3 className="w-8 h-8" />,
    date: "March 2026"
  },
  {
    title: "Predictive Analytics in Retail",
    description: "Leveraging historical sales data to forecast future trends and optimize inventory management.",
    icon: <TrendingUp className="w-8 h-8" />,
    date: "February 2026"
  },
  {
    title: "SQL Optimization Techniques",
    description: "Best practices for writing efficient queries to handle large-scale data processing.",
    icon: <Activity className="w-8 h-8" />,
    date: "January 2026"
  },
  {
    title: "Machine Learning for Everyone",
    description: "Breaking down complex ML algorithms into understandable concepts for non-technical stakeholders.",
    icon: <PieChart className="w-8 h-8" />,
    date: "December 2025"
  }
];

export default function Thinking() {
  return (
    <main className="pt-24 md:pt-32 pb-20 px-6 md:px-24 min-h-screen bg-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mb-16 md:mb-24"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-accent mb-6 block">
          Strategic Thinking
        </span>
        <h1 className="text-4xl md:text-8xl font-display leading-tight mb-8">
          Thinking <br /> (Insights)
        </h1>
        <p className="text-muted text-base md:text-lg leading-relaxed max-w-2xl">
          A collection of thoughts, case studies, and technical deep-dives into the world of data analytics, project management, and digital systems.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {THOUGHTS.map((thought, i) => (
          <motion.div
            key={thought.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 md:p-12 rounded-2xl md:rounded-3xl border border-line/5 hover:border-accent/20 transition-all group"
          >
            <div className="text-accent mb-8 group-hover:scale-110 transition-transform duration-500">
              {thought.icon}
            </div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-muted mb-4">
              {thought.date}
            </div>
            <h3 className="text-2xl mb-4 group-hover:text-accent transition-colors">{thought.title}</h3>
            <p className="text-muted leading-relaxed">{thought.description}</p>
            <button className="mt-8 text-[10px] uppercase tracking-widest font-bold border-b border-ink pb-1 hover:text-accent hover:border-accent transition-all">
              Read Article
            </button>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
