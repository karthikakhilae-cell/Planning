import { motion } from "motion/react";
import { Book, Calendar, Clock } from "lucide-react";

const JOURNAL_ENTRIES = [
  {
    title: "Reflections on 2025",
    excerpt: "A look back at the challenges and breakthroughs of the past year.",
    date: "Dec 31, 2025",
    readTime: "5 min"
  },
  {
    title: "The Future of Data Analytics",
    excerpt: "My thoughts on how AI is reshaping the landscape of data storytelling.",
    date: "Nov 15, 2025",
    readTime: "8 min"
  },
  {
    title: "Lessons in Project Management",
    excerpt: "Key takeaways from managing complex, cross-functional projects.",
    date: "Oct 20, 2025",
    readTime: "6 min"
  },
  {
    title: "Digital Minimalism",
    excerpt: "Finding focus in an increasingly noisy digital world.",
    date: "Sep 5, 2025",
    readTime: "4 min"
  }
];

export default function Journal() {
  return (
    <main className="pt-24 md:pt-32 pb-20 px-6 md:px-24 min-h-screen bg-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mb-16 md:mb-24"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-accent mb-6 block">
          Personal Journal
        </span>
        <h1 className="text-4xl md:text-8xl font-display leading-tight mb-8">
          Weekly <br /> Journal
        </h1>
        <p className="text-muted text-base md:text-lg leading-relaxed max-w-2xl">
          A space for more personal reflections, daily learnings, and the small insights that come from my professional and personal life.
        </p>
      </motion.div>

      <div className="space-y-8 md:space-y-12">
        {JOURNAL_ENTRIES.map((entry, i) => (
          <motion.div
            key={entry.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group cursor-pointer border-b border-line/10 pb-8 md:pb-12 hover:border-accent/30 transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-6">
              <div className="flex items-center gap-4 md:gap-6 text-[10px] uppercase tracking-widest font-bold text-muted">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  {entry.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  {entry.readTime}
                </div>
              </div>
              <Book className="w-6 h-6 text-accent opacity-0 group-hover:opacity-100 transition-opacity hidden md:block" />
            </div>
            <h3 className="text-2xl md:text-4xl mb-4 group-hover:text-accent transition-colors">{entry.title}</h3>
            <p className="text-muted leading-relaxed max-w-3xl text-sm md:text-base">{entry.excerpt}</p>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
