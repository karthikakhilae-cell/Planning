import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Github, Linkedin, Instagram, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PROFILE_PIC, SOCIAL_LINKS } from "../../constants";

const NAV_LINKS = [
  { name: "Home", path: "/home" },
  { name: "Work", path: "/work" },
  { name: "Hire Me", path: "/hire-me" },
  { name: "Lab", path: "/lab" },
  { name: "Thinking", path: "/thinking" },
  { name: "Blogs", path: "/blogs" },
  { name: "Life", path: "/life" },
  { name: "Arts", path: "/arts" },
  { name: "Journal", path: "/journal" },
  { name: "Store", path: "/store" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLandingPage) return null;

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 px-4 sm:px-8 md:px-12 lg:px-24 py-4 md:py-6 flex justify-between items-center transition-all duration-500 ${scrolled ? "bg-white/80 backdrop-blur-md py-3 md:py-4 shadow-sm" : "bg-transparent"}`}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 md:gap-4 group cursor-pointer"
          onClick={() => navigate('/about')}
        >
          <div className="relative">
            <img 
              src={PROFILE_PIC} 
              alt="Akhil" 
              className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border border-ink/10 group-hover:border-accent transition-colors"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-bg rounded-full" />
          </div>
          <div className="text-lg md:text-xl font-display tracking-tight text-ink">
            Akhil Karthik
          </div>
        </motion.div>
        
        <div className="hidden lg:flex gap-6 xl:gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-ink/60">
          {NAV_LINKS.slice(0, 7).map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`hover:text-accent transition-colors relative group ${location.pathname === link.path ? "text-accent" : ""}`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-px bg-accent transition-all ${location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"}`} />
            </Link>
          ))}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="text-accent hover:text-ink transition-colors relative group"
          >
            More +
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-ink transition-all group-hover:w-full" />
          </button>
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-ink"
          aria-label="Toggle Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink text-white p-6 md:p-24 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <div className="text-2xl font-display">Index</div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-4 hover:scale-110 transition-transform"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 md:gap-x-24 gap-y-6 md:gap-y-8 my-8 md:my-12 overflow-y-auto max-h-[70vh] pr-4 scrollbar-hide">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link 
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="group flex items-end gap-3 md:gap-4"
                  >
                    <span className="text-[9px] md:text-[10px] font-bold opacity-20 group-hover:opacity-100 transition-opacity mb-1 md:mb-2">0{i + 1}</span>
                    <span className="text-3xl sm:text-4xl md:text-6xl font-display hover:text-accent transition-all duration-500 group-hover:pl-2 md:group-hover:pl-4">
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-end gap-12 pt-12 border-t border-white/10">
              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-widest font-bold opacity-30">Get in touch</div>
                <a href={SOCIAL_LINKS.email} className="text-2xl md:text-4xl font-display hover:text-accent transition-colors">{SOCIAL_LINKS.email.replace('mailto:', '')}</a>
              </div>
              <div className="flex gap-8">
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors"><Github className="w-6 h-6" /></a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors"><Linkedin className="w-6 h-6" /></a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors"><Instagram className="w-6 h-6" /></a>
                <a href={SOCIAL_LINKS.medium} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors"><ExternalLink className="w-6 h-6" /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
