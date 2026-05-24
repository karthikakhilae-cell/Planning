import { motion } from "motion/react";
import { SKILLS, PROFILE_PIC } from "../constants";

export default function About() {
  return (
    <main className="pt-24 md:pt-32 pb-20 px-4 sm:px-8 md:px-12 lg:px-24 min-h-screen bg-ink text-white">
      <div className="grid lg:grid-cols-2 gap-12 md:gap-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold opacity-50 mb-4 md:mb-6 block">
            The Person Behind The Lens
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl leading-[0.9] mb-8 md:mb-12 font-display">
            I believe in the beauty of <span className="text-accent">subtraction.</span>
          </h1>
          <div className="space-y-6 md:space-y-8 opacity-70 leading-relaxed text-base md:text-lg font-light">
            <p>
              As a Planning Engineer and Database Architect, I approach every schedule and schema with absolute operational rigor. My work focuses on building stable, highly performant systems and automated scheduling processes.
            </p>
            <p>
              I specialize in creating high-end Data Science integrations, Microsoft Fabric data platforms, and AI-driven automation pipelines. My background in operations engineering and database architecture allows me to bridge the gap between complex planning controls and scalable data infrastructures.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 mt-12 md:mt-16">
            {SKILLS.map(skill => (
              <div key={skill.name} className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-2 text-accent">
                  {skill.icon}
                  <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold">{skill.name}</span>
                </div>
                <ul className="space-y-1 md:space-y-2">
                  {skill.items.map(item => (
                    <li key={item} className="text-xs md:text-sm opacity-50">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mt-12 lg:mt-0"
        >
          <img 
            src={PROFILE_PIC} 
            alt="Portrait" 
            className="w-full aspect-[3/4] object-cover rounded-2xl md:rounded-3xl grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -top-6 -right-6 sm:top-12 sm:-left-12 bg-accent p-6 sm:p-12 rounded-2xl sm:rounded-3xl shadow-2xl">
            <div className="text-2xl sm:text-4xl font-display mb-2 sm:mb-4">5+</div>
            <div className="text-[8px] sm:text-[10px] uppercase tracking-widest font-bold opacity-70">Years of Experience</div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
