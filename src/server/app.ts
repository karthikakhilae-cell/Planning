import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { XMLParser } from "fast-xml-parser";

dotenv.config();

const MEDIUM_FEED_URL = "https://medium.com/feed/@karthikakhil.in";
const MEDIUM_PROXY_FEED_URL = `https://api.allorigins.win/raw?url=${encodeURIComponent(MEDIUM_FEED_URL)}`;
const MEDIUM_RSS_JSON_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_FEED_URL)}`;
const BLOG_CACHE_TTL_MS = 15 * 60 * 1000;

let blogCache: { posts: ReturnType<typeof normalizeMediumItem>[]; source: string; updatedAt: number } | null = null;

type MediumRssItem = {
  title?: string | { "#text"?: string; "__cdata"?: string };
  link?: string;
  guid?: string | { "#text"?: string };
  pubDate?: string;
  "dc:creator"?: string | { "#text"?: string; "__cdata"?: string };
  category?: string | { "#text"?: string; "__cdata"?: string } | Array<string | { "#text"?: string; "__cdata"?: string }>;
  description?: string | { "#text"?: string; "__cdata"?: string };
  "content:encoded"?: string | { "#text"?: string; "__cdata"?: string };
  "media:thumbnail"?: { "@_url"?: string };
};

type RssJsonItem = {
  title?: string;
  pubDate?: string;
  link?: string;
  guid?: string;
  author?: string;
  thumbnail?: string;
  description?: string;
  content?: string;
  categories?: string[];
};

function rssText(value?: string | { "#text"?: string; "__cdata"?: string }) {
  if (!value) return "";
  return typeof value === "string" ? value : value.__cdata || value["#text"] || "";
}

function decodeHtmlEntities(value = "") {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'");
}

function stripHtml(html = "") {
  return decodeHtmlEntities(html.replace(/<[^>]*>?/gm, "").replace(/\s+/g, " ").trim());
}

function getThumbnail(item: MediumRssItem) {
  if (item["media:thumbnail"]?.["@_url"]) {
    return item["media:thumbnail"]["@_url"];
  }

  const content = rssText(item["content:encoded"]) || rssText(item.description);
  const imageMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  return imageMatch?.[1] || "";
}

function normalizeMediumItem(item: MediumRssItem) {
  const title = decodeHtmlEntities(rssText(item.title) || "Untitled");
  const content = rssText(item["content:encoded"]) || rssText(item.description);
  const description = rssText(item.description) || stripHtml(content).slice(0, 180);
  const categories = Array.isArray(item.category)
    ? item.category.map(rssText).filter(Boolean)
    : item.category
      ? [rssText(item.category)].filter(Boolean)
      : [];

  return {
    title,
    pubDate: item.pubDate || "",
    link: item.link || "",
    guid: typeof item.guid === "string" ? item.guid : item.guid?.["#text"] || item.link || title,
    author: rssText(item["dc:creator"]) || "Akhil Karthik",
    thumbnail: getThumbnail(item),
    description,
    content,
    categories,
  };
}

function normalizeRssJsonItem(item: RssJsonItem) {
  const content = item.content || item.description || "";

  return {
    title: decodeHtmlEntities(item.title || "Untitled"),
    pubDate: item.pubDate || "",
    link: item.link || "",
    guid: item.guid || item.link || item.title || "",
    author: item.author || "Akhil Karthik",
    thumbnail: item.thumbnail || "",
    description: item.description || stripHtml(content).slice(0, 180),
    content,
    categories: item.categories || [],
  };
}

async function fetchMediumPostsFromFeed() {
  return fetchMediumPostsFromXmlUrl(MEDIUM_FEED_URL, "Medium feed returned");
}

async function fetchMediumPostsFromProxiedFeed() {
  return fetchMediumPostsFromXmlUrl(MEDIUM_PROXY_FEED_URL, "Medium proxy feed returned");
}

async function fetchMediumPostsFromXmlUrl(url: string, errorPrefix: string) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/rss+xml, application/xml, text/xml",
      "User-Agent": "Mozilla/5.0 Akhil-Karthik-Portfolio/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`${errorPrefix} ${response.status}`);
  }

  const xml = await response.text();
  const parser = new XMLParser({
    ignoreAttributes: false,
    cdataPropName: "__cdata",
  });
  const parsed = parser.parse(xml);
  const items = parsed?.rss?.channel?.item;
  return (Array.isArray(items) ? items : items ? [items] : []).map(normalizeMediumItem);
}

async function fetchMediumPostsFromRssJson() {
  const response = await fetch(MEDIUM_RSS_JSON_URL);

  if (!response.ok) {
    throw new Error(`RSS JSON fallback returned ${response.status}`);
  }

  const data = await response.json();
  if (data.status !== "ok" || !Array.isArray(data.items)) {
    throw new Error("RSS JSON fallback returned an invalid response");
  }

  return data.items.map(normalizeRssJsonItem);
}

export function createExpressApp() {
  const app = express();
  const router = express.Router();

  app.use(express.json());
  app.use(cors());

  // API Route for Inquiry Form (Proxy to Google Apps Script)
  router.post("/inquiry", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

    if (!scriptUrl) {
      return res.status(500).json({ error: "Google Apps Script URL is not configured" });
    }

    try {
      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });

      if (response.ok) {
        res.status(200).json({ success: true, message: "Inquiry submitted successfully!" });
      } else {
        const errorText = await response.text();
        console.error("Apps Script Error:", errorText);
        res.status(500).json({ error: "Failed to submit to Apps Script" });
      }
    } catch (error) {
      console.error("Error submitting to Google Apps Script:", error);
      res.status(500).json({ error: "Failed to submit inquiry. Please try again later." });
    }
  });

  // API Route to fetch data from Google Sheets (via Apps Script)
  router.get("/data", async (req, res) => {
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

    if (!scriptUrl) {
      return res.status(500).json({ error: "Google Apps Script URL is not configured" });
    }

    try {
      const response = await fetch(`${scriptUrl}?action=getData`);

      if (response.ok) {
        const data = await response.json();
        res.status(200).json(data);
      } else {
        const errorText = await response.text();
        console.error("Apps Script Fetch Error:", errorText);
        res.status(500).json({ error: "Failed to fetch data from Apps Script" });
      }
    } catch (error) {
      console.error("Error fetching from Google Apps Script:", error);
      res.status(500).json({ error: "Failed to fetch data. Please try again later." });
    }
  });

  // API Route for Projects (Static for now, can be expanded to GitHub API)
  router.get("/projects", async (req, res) => {
    // For now, we return an empty array or you could return static projects.
    // The frontend merges this with STATIC_PROJECTS from constants.
    res.status(200).json([]);
  });

  router.get("/blogs", async (req, res) => {
    if (blogCache && Date.now() - blogCache.updatedAt < BLOG_CACHE_TTL_MS) {
      return res.status(200).json({
        posts: blogCache.posts,
        source: blogCache.source,
        cached: true,
      });
    }

    const providers = [
      { source: "medium-rss", fetchPosts: fetchMediumPostsFromFeed },
      { source: "proxied-medium-rss", fetchPosts: fetchMediumPostsFromProxiedFeed },
      { source: "rss2json", fetchPosts: fetchMediumPostsFromRssJson },
    ];

    const errors: string[] = [];

    for (const provider of providers) {
      try {
        const posts = await provider.fetchPosts();

        if (posts.length > 0) {
          blogCache = { posts, source: provider.source, updatedAt: Date.now() };
          return res.status(200).json({ posts, source: provider.source, cached: false });
        }

        errors.push(`${provider.source}: no posts returned`);
      } catch (error) {
        console.warn(`Medium blog provider failed (${provider.source}):`, error);
        errors.push(`${provider.source}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    if (blogCache) {
      return res.status(200).json({
        posts: blogCache.posts,
        source: blogCache.source,
        cached: true,
        stale: true,
      });
    }

    console.error("Error fetching Medium posts:", errors);
    res.status(500).json({ error: "Failed to load Medium posts" });
  });

  // Mount the router at both paths to support local dev and Netlify functions
  app.use("/api", router);
  app.use("/.netlify/functions/api", router);

  return app;
}
