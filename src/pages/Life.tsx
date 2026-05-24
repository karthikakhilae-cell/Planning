import { motion } from "motion/react";
import { Camera, MapPin, Music, Coffee } from "lucide-react";

const LIFE_MOMENTS = [
  {
    title: "Travel Chronicles",
    description: "Capturing moments from my journeys across different cultures and landscapes.",
    icon: <MapPin className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Photography",
    description: "Finding beauty in the mundane through the lens of my camera.",
    icon: <Camera className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1452784444945-3f422708fe5e?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Musical Pursuits",
    description: "Exploring the intersection of sound, rhythm, and emotion.",
    icon: <Music className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Daily Rituals",
    description: "The small habits and moments of reflection that ground me.",
    icon: <Coffee className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop"
  }
];

export default function Life() {
  return (
    <main className="pt-24 md:pt-32 pb-20 px-6 md:px-24 min-h-screen bg-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mb-16 md:mb-24"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-accent mb-6 block">
          Personal Journey
        </span>
        <h1 className="text-4xl md:text-8xl font-display leading-tight mb-8">
          Life <br /> Moments
        </h1>
        <p className="text-muted text-base md:text-lg leading-relaxed max-w-2xl">
          A glimpse into my life outside of data and projects. Travel, photography, and the things that inspire me.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {LIFE_MOMENTS.map((moment, i) => (
          <motion.div
            key={moment.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl mb-6 md:mb-8 aspect-video">
              <img 
                src={moment.image} 
                alt={moment.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md p-4 rounded-2xl text-white">
                {moment.icon}
              </div>
            </div>
            <h3 className="text-2xl mb-4 group-hover:text-accent transition-colors">{moment.title}</h3>
            <p className="text-muted leading-relaxed">{moment.description}</p>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
