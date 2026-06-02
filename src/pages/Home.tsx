import { motion } from "motion/react";
import { ArrowRight, Mail, Linkedin, Github, Instagram, ExternalLink, Loader2, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, FormEvent, useEffect } from "react";
import { PROJECTS as STATIC_PROJECTS, PROFILE_PIC, SOCIAL_LINKS } from "../constants";
import AntigravitySkills from "../components/home/AntigravitySkills";
import AnalyticsVisuals from "../components/home/AnalyticsVisuals";

export default function Home() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [projects, setProjects] = useState(STATIC_PROJECTS);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (response.ok) {
          const githubProjects = await response.json();
          const merged = [...STATIC_PROJECTS];
          githubProjects.forEach((gp: any) => {
            if (!merged.find(p => p.link === gp.link || p.id === gp.id)) {
              merged.push(gp);
            }
          });
          setProjects(merged);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formState, type: "inquiry" }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: "success", message: "Thank you! Your inquiry has been submitted." });
        setFormState({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus({ type: "error", message: data.error || "Something went wrong. Please try again." });
      }
    } catch (error) {
      setSubmitStatus({ type: "error", message: "Failed to connect to the server. Please check your connection." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-bg">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-24 py-32 md:py-0 overflow-hidden">
        {/* Soft Background Elements */}
        <div className="absolute top-0 right-0 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[80%] bg-accent/5 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] bg-white blur-[100px] rounded-full" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-6 md:mb-8 block">
            Portfolio 2026 — Planning & Database Architect
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[110px] leading-[0.85] tracking-tighter mb-12 md:mb-16 font-display">
            Architecting <span className="text-accent">data</span> <br /> 
            <span className="text-ink/20">&</span> schedules <br /> 
            with intelligence.
          </h1>
          
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Link 
                to="/work"
                className="bg-ink text-white px-8 sm:px-12 py-4 sm:py-6 rounded-full flex items-center justify-center sm:justify-start gap-4 text-xs font-bold uppercase tracking-widest hover:bg-accent transition-all duration-500 shadow-xl shadow-ink/10"
              >
                View Projects <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/hire-me"
                className="bg-white text-ink border border-line/20 px-8 sm:px-12 py-4 sm:py-6 rounded-full flex items-center justify-center sm:justify-start gap-4 text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-white hover:border-accent transition-all duration-500 shadow-xl shadow-ink/5"
              >
                Hire Me <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/blogs"
                className="bg-accent text-white px-8 sm:px-12 py-4 sm:py-6 rounded-full flex items-center justify-center sm:justify-start gap-4 text-xs font-bold uppercase tracking-widest hover:bg-ink transition-all duration-500 shadow-xl shadow-accent/10"
              >
                <BookOpen className="w-4 h-4" />
                Latest Blogs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            
            <p className="max-w-sm text-sm text-muted/80 leading-relaxed font-light">
              Highly strategic Planning Engineer and Data Analyst with 4+ years of experience blending scheduling operations with modern Data Science, Microsoft Fabric, BI Intelligence, and AI automations.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 1.05, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-4 sm:right-8 md:right-12 lg:right-24 bottom-12 sm:bottom-24 w-32 h-44 sm:w-48 sm:h-64 md:w-72 md:h-96 hidden xs:block"
        >
          <div className="relative w-full h-full">
            <img 
              src={PROFILE_PIC} 
              alt="Akhil Karthik" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 bg-white/80 backdrop-blur-md p-4 sm:p-8 shadow-2xl rounded-2xl sm:rounded-3xl max-w-[140px] sm:max-w-[220px] border border-white/20">
              <p className="text-[9px] sm:text-[11px] text-ink/60 leading-relaxed font-sans">
                "Data is not just numbers; it's the narrative of progress."
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Work — surfaced immediately after the hero */}
      <section className="px-4 sm:px-8 md:px-12 lg:px-24 pt-16 md:pt-24 pb-8">
        <div className="max-w-4xl mb-10 md:mb-14">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-4 block">Featured Work</span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display leading-tight">Live dashboards &amp; tools.</h2>
          <p className="mt-4 text-sm text-muted/70 max-w-xl leading-relaxed font-light">
            Interactive project-controls work built on Primavera P6, Power BI and Python — covering schedule, cost and automation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[
            {
              to: "/dashboard", external: false,
              tag: "Power BI · EVM",
              title: "EPC EVM Dashboard",
              desc: "Live earned-value dashboard — S-curve, SPI/CPI, EAC forecasting and discipline progress for an AED 6B EPC programme."
            },
            {
              to: "/dashboard", external: false,
              tag: "Power BI · Cost",
              title: "Cash Flow Dashboard",
              desc: "Contractor cash-flow and cost control — budget vs committed vs actual, invoice ageing, retention and net position."
            },
            {
              to: "https://github.com/akhilkarthik/p6-schedule-health-checker", external: true,
              tag: "Python · DCMA",
              title: "P6 Health Checker",
              desc: "A Python CLI that audits Primavera P6 .xer schedules against the DCMA 14-Point method and outputs a PDF report."
            }
          ].map((p, i) => {
            const inner = (
              <>
                <div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-accent mb-6">{p.tag}</div>
                  <h3 className="text-2xl md:text-3xl mb-3 font-display group-hover:text-accent transition-colors">{p.title}</h3>
                  <p className="text-sm text-muted/60 leading-relaxed">{p.desc}</p>
                </div>
                <div className="flex justify-end mt-8">
                  <div className="w-12 h-12 rounded-full border border-line/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </>
            );
            const cls = "group p-8 md:p-10 bg-white rounded-[2rem] md:rounded-[2.5rem] border border-line/5 hover:border-accent/20 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-700 flex flex-col justify-between min-h-[280px]";
            return p.external ? (
              <a key={i} href={p.to} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
            ) : (
              <Link key={i} to={p.to} className={cls}>{inner}</Link>
            );
          })}
        </div>
      </section>

      <AnalyticsVisuals projectCount={projects.length} />

      <AntigravitySkills />

      {/* Quick Links Grid - Refined */}
      <section className="py-24 md:py-40 px-4 sm:px-8 md:px-12 lg:px-24">
        <div className="max-w-4xl mb-16 md:mb-24">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-4 md:mb-6 block">The Index</span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display leading-tight">Explore the <br /> digital monograph.</h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[
            { to: "/work", title: "Work", desc: "Selected professional projects and case studies." },
            { to: "/dashboard", title: "Dashboards", desc: "Live, interactive Power BI dashboards." },
            { to: "/blogs", title: "Blogs", desc: "Long-form articles and technical deep-dives." },
            { to: "/lab", title: "Lab", desc: "Experiments, technical ideas, and raw prototypes." },
            { to: "/thinking", title: "Thinking", desc: "Strategic insights and technical deep-dives." },
            { to: "/arts", title: "Arts", desc: "Creative writing, digital art, and visual works." },
            { to: "/journal", title: "Journal", desc: "Weekly reflections and personal learnings." }
          ].map((link, i) => (
            <Link 
              key={link.to} 
              to={link.to} 
              className="group p-8 sm:p-12 bg-white rounded-[2.5rem] md:rounded-[3rem] border border-line/5 hover:border-accent/20 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-700 flex flex-col justify-between aspect-square"
            >
              <div>
                <div className="text-[10px] font-bold text-accent/30 mb-8">0{i + 1}</div>
                <h3 className="text-4xl mb-4 font-display group-hover:text-accent transition-colors">{link.title}</h3>
                <p className="text-sm text-muted/60 leading-relaxed">{link.desc}</p>
              </div>
              <div className="flex justify-end">
                <div className="w-12 h-12 rounded-full border border-line/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-500">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Inquiry Form Section - New & Sophisticated */}
      <section className="py-24 md:py-40 px-4 sm:px-8 md:px-12 lg:px-24 bg-white rounded-[2.5rem] md:rounded-[4rem] mx-2 sm:mx-4 md:mx-12 mb-12 shadow-2xl shadow-ink/5">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-start">
          <div className="space-y-12 md:space-y-16">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-6 md:mb-8 block">Collaborate</span>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-display leading-[0.9] mb-8 md:mb-12">
                Let's build <br /> something <span className="text-accent">meaningful.</span>
              </h2>
              <p className="text-muted leading-relaxed text-base md:text-lg max-w-md font-light">
                Open to new opportunities in Planning Engineering and Data Analytics roles. Particularly interested in office-based PMO, project controls, and enterprise data platform positions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-12">
              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-widest font-bold text-accent">Contact</div>
                <a href={SOCIAL_LINKS.email} className="text-sm hover:text-accent transition-colors block">{SOCIAL_LINKS.email.replace('mailto:', '')}</a>
              </div>
              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-widest font-bold text-accent">Social</div>
                <div className="flex gap-6">
                  <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Linkedin className="w-4 h-4" /></a>
                  <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Github className="w-4 h-4" /></a>
                  <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Instagram className="w-4 h-4" /></a>
                  <a href={SOCIAL_LINKS.medium} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><ExternalLink className="w-4 h-4" /></a>
                </div>
              </div>
            </div>
          </div>

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleFormSubmit} 
            className="space-y-8 md:space-y-12 bg-bg p-8 sm:p-12 md:p-16 rounded-[2.5rem] md:rounded-[3rem] border border-line/5"
          >
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted/60">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full border-b border-line/20 py-4 focus:border-accent outline-none transition-colors bg-transparent text-lg font-sans" 
                  placeholder="John Doe" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted/60">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full border-b border-line/20 py-4 focus:border-accent outline-none transition-colors bg-transparent text-lg font-sans" 
                  placeholder="john@example.com" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted/60">Your Inquiry</label>
                <textarea 
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full border-b border-line/20 py-4 focus:border-accent outline-none transition-colors bg-transparent h-32 resize-none text-lg font-sans" 
                  placeholder="Tell me about your project..." 
                />
              </div>
            </div>
            
            {submitStatus && (
              <div className={`text-xs font-bold uppercase tracking-widest p-6 rounded-2xl ${submitStatus.type === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                {submitStatus.message}
              </div>
            )}

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-ink text-white py-6 rounded-2xl flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-widest hover:bg-accent transition-all duration-500 disabled:opacity-50 shadow-xl shadow-ink/10"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Inquiry <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </section>
    </main>
  );
}
