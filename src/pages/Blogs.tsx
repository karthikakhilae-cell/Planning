import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MessageSquare, Calendar, Clock, ExternalLink, Loader2 } from "lucide-react";

interface BlogPost {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  categories: string[];
}

export default function Blogs() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@akhilkarthik`
        );
        const data = await response.json();
        if (data.status === "ok") {
          setPosts(data.items);
        } else {
          throw new Error("Failed to fetch blog posts");
        }
      } catch (err) {
        console.error("Error fetching Medium posts:", err);
        setError("Could not load blog posts. Please visit Medium directly.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getExcerpt = (html: string) => {
    const text = html.replace(/<[^>]*>?/gm, '');
    return text.slice(0, 160) + "...";
  };

  return (
    <main className="pt-24 md:pt-32 pb-20 px-4 sm:px-8 md:px-12 lg:px-24 min-h-screen bg-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mb-12 md:mb-24"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-accent mb-4 md:mb-6 block">
              Editorial Content
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-display leading-[0.9] mb-6 md:mb-8">
              The Blog <br /> (Editorial)
            </h1>
            <p className="text-muted text-base md:text-lg leading-relaxed max-w-2xl font-light">
              A collection of long-form articles, technical deep-dives, and editorial pieces on data, design, and project management, mirrored from my Medium profile.
            </p>
          </div>
          <a 
            href="https://akhilkarthik.medium.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-ink text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-accent transition-colors group w-fit"
          >
            Visit Medium
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <Loader2 className="w-12 h-12 text-accent animate-spin" />
          <p className="text-[10px] uppercase tracking-widest font-bold text-muted">Fetching latest articles...</p>
        </div>
      ) : error ? (
        <div className="text-center py-40">
          <p className="text-muted mb-8">{error}</p>
          <a 
            href="https://akhilkarthik.medium.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-accent font-bold uppercase tracking-widest text-sm border-b border-accent pb-2"
          >
            Go to Medium Profile
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {posts.map((post, i) => (
            <motion.a
              key={post.guid}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer bg-white p-8 md:p-12 rounded-2xl md:rounded-3xl border border-line/5 hover:border-accent/20 transition-all flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex flex-wrap gap-2">
                  {post.categories.slice(0, 2).map(cat => (
                    <div key={cat} className="text-[10px] uppercase tracking-widest font-bold text-accent bg-accent/5 px-4 py-2 rounded-full">
                      {cat}
                    </div>
                  ))}
                </div>
                <ExternalLink className="w-6 h-6 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-3xl mb-6 group-hover:text-accent transition-colors leading-tight font-display">{post.title}</h3>
              <p className="text-muted leading-relaxed mb-12 flex-1">{getExcerpt(post.description)}</p>
              <div className="flex items-center gap-8 text-[10px] uppercase tracking-widest font-bold text-muted pt-8 border-t border-line/10">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.pubDate)}
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Read on Medium
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </main>
  );
}
