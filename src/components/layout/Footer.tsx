import { ArrowRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { SOCIAL_LINKS } from "../../constants";

export default function Footer() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  if (isLandingPage) return null;

  return (
    <footer className="py-12 md:py-20 px-4 sm:px-8 md:px-24 border-t border-line bg-white">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
        <div className="space-y-4">
          <div className="text-xl md:text-2xl font-display text-ink">Akhil Karthik</div>
          <p className="text-[10px] text-muted max-w-xs uppercase tracking-widest leading-relaxed">
            Curating clarity and purpose through data science and strategic design.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 md:gap-8 md:justify-end text-[10px] uppercase tracking-[0.2em] font-bold text-muted">
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">LinkedIn</a>
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">GitHub</a>
          <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Instagram</a>
          <a href={SOCIAL_LINKS.medium} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Medium</a>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-line/50 text-[10px] uppercase tracking-widest font-bold text-muted/50 text-center md:text-left">
        <div>© 2026 Akhil Karthik. All Rights Reserved.</div>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 hover:text-accent transition-colors group"
        >
          Back to top <ArrowRight className="w-3 h-3 -rotate-90 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
