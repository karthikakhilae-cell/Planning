import { motion } from "motion/react";
import { PROJECTS as STATIC_PROJECTS, SOCIAL_LINKS } from "../constants";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function Work() {
  const [projects, setProjects] = useState(STATIC_PROJECTS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (response.ok) {
          const githubProjects = await response.json();
          // Merge static projects with github projects, avoiding duplicates by ID/Link
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <main className="pt-24 md:pt-32 pb-20 px-4 sm:px-8 md:px-12 lg:px-24 min-h-screen bg-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mb-12 md:mb-24"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-accent mb-4 md:mb-6 block">
          Selected Archive
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-display leading-[0.9] mb-6 md:mb-8">
          Featured <br /> Projects
        </h1>
        <p className="text-muted text-base md:text-lg leading-relaxed max-w-2xl font-light">
          A deep dive into my professional work, case studies, and successful project implementations.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
          <p className="text-xs uppercase tracking-widest font-bold text-muted">Syncing with GitHub...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16">
          {projects.map((project) => (
            <motion.a 
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer block"
            >
              <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/3]">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-500" />
                <div className="absolute top-6 right-6 text-white/50 font-display text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  {project.year}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[8px] uppercase tracking-[0.2em] font-bold text-accent bg-accent/5 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-medium group-hover:text-accent transition-colors">{project.title}</h3>
                <p className="text-xs text-muted leading-relaxed line-clamp-2">{project.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      )}

      <div className="mt-32 text-center">
        <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest border-b border-ink pb-2 hover:text-accent hover:border-accent transition-all">
          Explore All Case Studies on GitHub
        </a>
      </div>
    </main>
  );
}
