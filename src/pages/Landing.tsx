import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PROFILE_PIC } from "../constants";

export default function Landing() {
  return (
    <main className="h-screen bg-ink text-white flex flex-col items-center justify-center px-6 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="text-center z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12 inline-block"
        >
          <img 
            src={PROFILE_PIC} 
            alt="Akhil Karthik" 
            className="w-32 h-32 rounded-full object-cover border-2 border-accent/30 p-1 grayscale hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-4xl sm:text-6xl md:text-8xl font-display mb-6 tracking-tighter"
        >
          Akhil Karthik
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-white/50 text-[10px] sm:text-xs md:text-base uppercase tracking-[0.2em] sm:tracking-[0.4em] mb-12 sm:mb-16 font-light max-w-[280px] sm:max-w-none mx-auto"
        >
          Planning Engineer • Data Scientist • Microsoft Fabric Specialist • Database Architect • AI Automations
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <Link 
            to="/home"
            className="group relative inline-flex items-center gap-4 px-8 sm:px-12 py-4 sm:py-6 border border-white/20 rounded-full hover:bg-white hover:text-ink transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10 text-xs sm:text-sm font-bold uppercase tracking-widest">Dive In</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.5em] text-white/20 font-bold"
      >
        Portfolio 2026
      </motion.div>
    </main>
  );
}
