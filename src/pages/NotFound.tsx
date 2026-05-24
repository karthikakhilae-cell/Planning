import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="h-screen flex flex-col items-center justify-center px-6 bg-bg">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <h1 className="text-8xl md:text-[12rem] font-display text-accent/10 leading-none mb-8">404</h1>
        <h2 className="text-4xl md:text-6xl font-display mb-8">Lost in the <span className="text-accent">void.</span></h2>
        <p className="text-muted mb-12 max-w-md mx-auto">
          The page you are looking for has been moved, deleted, or never existed in this digital monograph.
        </p>
        <Link 
          to="/home" 
          className="inline-flex items-center gap-3 bg-ink text-white px-12 py-6 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-accent transition-all duration-500"
        >
          <ArrowLeft className="w-4 h-4" /> Return Home
        </Link>
      </motion.div>
    </main>
  );
}
