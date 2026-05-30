import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Calendar,
  Clock,
  Database,
  ExternalLink,
  Loader2,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { SOCIAL_LINKS } from "../constants";

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

const FEATURED_POST: BlogPost = {
  title: "Building a Construction Analytics Pipeline, A to Z",
  pubDate: "Sat, 30 May 2026 06:13:20 GMT",
  link: "https://medium.com/@karthikakhil.in/building-a-construction-analytics-pipeline-a-to-z-4301cbd5f350",
  guid: "featured-construction-analytics-pipeline",
  author: "Akhil Karthik",
  thumbnail: "https://cdn-images-1.medium.com/max/1000/1*Qi2wqkzL0vC-1Fz1YbQhmQ.jpeg",
  description:
    "A complete walkthrough from raw ERP data to a live, client-ready Power BI dashboard with full Earned Value Management for enterprise construction clients.",
  content: "",
  categories: ["Power BI", "EVM", "Construction Analytics"],
};

const READING_PATH = [
  { label: "Data sources", value: "ERP, P6, Excel", icon: Database },
  { label: "Core method", value: "Earned Value", icon: TrendingUp },
  { label: "Delivery layer", value: "Power BI + RLS", icon: ShieldCheck },
];

function decodeHtmlEntities(value = "") {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'");
}

function getExcerpt(html: string) {
  const text = decodeHtmlEntities(html.replace(/<[^>]*>?/gm, "").replace(/\s+/g, " ").trim());
  return text.length > 170 ? `${text.slice(0, 170)}...` : text;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function normalizePost(post: BlogPost): BlogPost {
  return {
    ...post,
    title: decodeHtmlEntities(post.title),
    description: decodeHtmlEntities(post.description),
    categories: post.categories.map(decodeHtmlEntities),
  };
}

export default function Blogs() {
  const [posts, setPosts] = useState<BlogPost[]>([FEATURED_POST]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) throw new Error("Failed to fetch blog posts");

        const data = await response.json();
        if (Array.isArray(data.posts)) {
          setPosts(data.posts.map(normalizePost));
        }
      } catch (err) {
        console.error("Error fetching Medium posts:", err);
        setPosts([FEATURED_POST]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const featuredPost = useMemo(() => {
    return (
      posts.find((post) => post.title.toLowerCase().includes("construction analytics pipeline")) ||
      FEATURED_POST
    );
  }, [posts]);

  const otherPosts = useMemo(() => {
    return posts.filter((post) => post.guid !== featuredPost.guid && post.title !== featuredPost.title);
  }, [featuredPost, posts]);

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-ink">
      <section className="pt-24 md:pt-32 px-4 sm:px-8 md:px-12 lg:px-24">
        <div className="grid min-h-[calc(100vh-7rem)] grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-center pb-12 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 border border-ink/15 bg-white/70 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
                <BookOpen className="h-3.5 w-3.5" />
                Featured essay
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink/45">
                Power BI / EVM / Construction
              </span>
            </div>

            <h1 className="max-w-5xl text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display leading-[0.88] tracking-normal">
              Read the build behind the dashboard.
            </h1>

            <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-ink/65">
              A practical, end-to-end construction analytics article that shows how raw ERP, Primavera P6,
              and cost data become a client-ready Power BI command center.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href={featuredPost.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 bg-ink px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-accent"
              >
                Start reading
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              <a
                href={SOCIAL_LINKS.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 border border-ink/15 bg-white/70 px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-ink transition-colors hover:border-accent hover:text-accent"
              >
                All Medium posts
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <motion.a
            href={featuredPost.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="group block overflow-hidden border border-ink/10 bg-white shadow-sm transition-transform hover:-translate-y-1"
          >
            <div className="aspect-[4/3] overflow-hidden bg-ink">
              <img
                src={featuredPost.thumbnail || FEATURED_POST.thumbnail}
                alt={featuredPost.title}
                className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6 md:p-8">
              <div className="mb-5 flex flex-wrap gap-2">
                {featuredPost.categories.slice(0, 3).map((category) => (
                  <span
                    key={category}
                    className="bg-[#e8f0fb] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#1b4f8a]"
                  >
                    {category}
                  </span>
                ))}
              </div>
              <h2 className="text-3xl md:text-4xl font-display leading-tight group-hover:text-accent">
                {featuredPost.title}
              </h2>
              <p className="mt-4 text-sm md:text-base leading-relaxed text-ink/60">
                {getExcerpt(featuredPost.description)}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-ink/10 pt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-ink/50">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(featuredPost.pubDate)}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  18 min read
                </span>
              </div>
            </div>
          </motion.a>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-[#1a1a18] px-4 py-8 text-white sm:px-8 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {READING_PATH.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-4 border border-white/10 bg-white/[0.04] p-5">
                <div className="flex h-11 w-11 items-center justify-center bg-[#b87d2a] text-[#1a1a18]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                    {item.label}
                  </div>
                  <div className="mt-1 text-lg font-display">{item.value}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8 md:px-12 lg:px-24">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
              Latest thinking
            </span>
            <h2 className="mt-3 text-4xl md:text-6xl font-display leading-none">Keep reading</h2>
          </div>
          {isLoading && otherPosts.length > 0 && (
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-ink/45">
              <Loader2 className="h-4 w-4 animate-spin" />
              Syncing Medium
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[featuredPost, ...otherPosts].map((post, index) => (
            <motion.a
              key={`${post.guid}-${index}`}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group flex min-h-[28rem] flex-col border border-ink/10 bg-white transition-colors hover:border-accent/50"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#1a1a18]">
                <img
                  src={post.thumbnail || FEATURED_POST.thumbnail}
                  alt={post.title}
                  className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-5 flex flex-wrap gap-2">
                  {post.categories.slice(0, 2).map((category) => (
                    <span
                      key={category}
                      className="bg-accent/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-accent"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl md:text-3xl font-display leading-tight group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/60">
                  {getExcerpt(post.description)}
                </p>
                <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/45">
                    {formatDate(post.pubDate)}
                  </span>
                  <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
                    Read
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-16 border border-ink/10 bg-white p-6 md:p-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div>
              <BarChart3 className="mb-5 h-8 w-8 text-accent" />
              <h2 className="text-3xl md:text-5xl font-display leading-tight">
                The point is not more posts. It is sharper proof.
              </h2>
            </div>
            <p className="text-base md:text-lg leading-relaxed text-ink/65">
              This page now leads with the work that best proves your construction analytics,
              planning, and BI skill set. Visitors land on a clear promise, see the practical
              architecture, and have one obvious action: start reading.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
