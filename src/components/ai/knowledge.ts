/**
 * knowledge.ts
 * ============================================================
 * DROP-IN REPLACEMENT: src/components/ai/knowledge.ts
 *
 * Complete knowledge base for Laura (Akhil's AI assistant).
 * All intents are matched by AIBrain using semantic + fuzzy NLP.
 * No API required.
 * ============================================================
 */

import type { BrainConfig } from "./AIBrain";
import { PROJECTS, SOCIAL_LINKS } from "../../constants";

const EMAIL = SOCIAL_LINKS.email.replace("mailto:", "");

export const BRAIN_CONFIG: BrainConfig = {
  ownerName: "Akhil Karthik",
  ownerRole: "Planning Engineer & Database Architect",
  ownerEmail: EMAIL,
  ownerLinkedIn: SOCIAL_LINKS.linkedin,
  ownerGitHub: SOCIAL_LINKS.github,
  ownerCV: (SOCIAL_LINKS as any).cv ?? "",

  intents: [
    // ── GREETINGS ──────────────────────────────────────────────────────────
    {
      id: "greeting",
      weight: 1.5,
      tags: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "howdy", "what's up", "sup", "greetings", "hiya"],
      response: [
        "Hey there! 👋 I'm **Laura**, Akhil's AI assistant. I can walk you through his engineering projects, database expertise, or help you get in touch. What's on your mind?",
        "Hello! Great to see you here 😊 I'm Laura — your guide to Akhil Karthik's portfolio. Want to explore his Microsoft Fabric work, AI automations, or something else?",
        "Hi! Welcome to Akhil's world 🚀 I'm Laura. Ask me anything — about his projects, skills, or how to collaborate with him!",
      ],
      followUp: ["Tell me about Akhil", "Show me his projects", "What are his skills?", "How to contact him"],
    },

    // ── WHO IS AKHIL ───────────────────────────────────────────────────────
    {
      id: "who_is_akhil",
      weight: 1.5,
      tags: ["who is akhil", "tell me about akhil", "who is he", "about akhil", "introduce akhil", "akhil background", "who are you talking about"],
      response: [
        "**Akhil Karthik** is a Planning Engineer & Database Architect with **5+ years** of experience. He specialises in:\n- 📊 Microsoft Fabric (Lakehouse / Warehouse)\n- 🗓️ Primavera P6 scheduling controls\n- ⚡ SQL Server query optimisation\n- 🤖 AI & GenAI automations\n\nWant to dive into a specific area?",
        "Meet **Akhil Karthik** — an operations and data specialist who bridges complex project scheduling controls with state-of-the-art data pipelines. Over 5 years he's built enterprise platforms on Microsoft Fabric, automated scheduling audits with AI, and tuned massive SQL databases for peak performance. Where would you like to start?",
      ],
      followUp: ["His Experience", "His Education", "His Core Skills", "Show Projects"],
    },

    // ── EXPERIENCE ─────────────────────────────────────────────────────────
    {
      id: "experience",
      tags: ["experience", "background", "career", "years", "work history", "how long", "professional"],
      response: [
        "Akhil has **5+ years** of hands-on experience across:\n- **Operational scheduling** (Primavera P6 controls)\n- **Enterprise data platforms** (Microsoft Fabric, SQL Server)\n- **AI/ML automations** (Python, LangChain, GenAI)\n- **Business intelligence** (Power BI, DirectLake)\n\nHe currently designs end-to-end enterprise analytics systems. Want to know about a specific role?",
      ],
      followUp: ["His Education", "His Skills", "Featured Projects", "Contact him"],
    },

    // ── EDUCATION ──────────────────────────────────────────────────────────
    {
      id: "education",
      tags: ["education", "degree", "university", "college", "study", "qualification", "academic", "certifications"],
      response: [
        "Akhil has a strong academic foundation in **Data Science & Engineering**, combined with professional certifications in:\n- Microsoft Fabric & Azure Data platforms\n- Primavera P6 Planning Controls\n- Relational Database Architecture\n- Agile Project Management\n\nHe's a continuous learner — always adding new skills to his stack. Check his LinkedIn for the full list!",
      ],
      followUp: ["LinkedIn Profile", "His Skills", "His Projects", "Back to chat"],
    },

    // ── SKILLS ─────────────────────────────────────────────────────────────
    {
      id: "skills",
      tags: ["skills", "tech stack", "what does he know", "technologies", "tools", "expertise", "abilities", "what can he do", "core skills", "technical"],
      response: [
        "Akhil's technical superpowers:\n\n🏗️ **Planning Controls** — Primavera P6, schedule health auditing, WBS/OBS\n🔷 **Microsoft Fabric** — Synapse Spark, Delta Lakehouse, DirectLake Power BI\n🗄️ **Database Engineering** — SQL Server, query optimisation, partitioning, indexing\n🤖 **AI & Automations** — Python, LangChain, GenAI, data pipelines\n📊 **BI & Analytics** — Power BI, Tableau, DENEB visuals\n\nWhich area would you like to explore?",
      ],
      followUp: ["Primavera P6", "Microsoft Fabric", "SQL Tuning", "AI Automations"],
    },

    // ── PROJECTS OVERVIEW ──────────────────────────────────────────────────
    {
      id: "projects_overview",
      weight: 1.3,
      tags: ["projects", "portfolio", "work", "show projects", "what has he built", "his work", "case studies", "show me his projects"],
      response: [
        `Akhil's portfolio spans 4 core domains:\n\n1. 🔷 **Enterprise Fabric Data Lakehouse** — end-to-end Synapse + DirectLake platform\n2. 🤖 **AI-Powered P6 Audit Automation** — GenAI scheduling risk assistant\n3. ⚡ **Database Architecture & Optimisation** — 65% speed gains on high-volume schemas\n4. 📊 **SpaceX / Spotify / Grocery Analytics** — data science deep dives\n\nWhich one interests you?`,
      ],
      followUp: ["Fabric Lakehouse", "AI P6 Automation", "Database Tuning", "Data Science Projects"],
    },

    // ── FABRIC LAKEHOUSE ──────────────────────────────────────────────────
    {
      id: "fabric_lakehouse",
      tags: ["fabric", "lakehouse", "synapse", "delta", "microsoft fabric", "directlake", "power bi semantic", "synapse spark", "warehouse"],
      response: [
        "The **Enterprise Fabric Data Lakehouse** is one of Akhil's flagship projects 🔷\n\nHe designed and deployed a **full enterprise analytics platform** in Microsoft Fabric:\n- 🔄 Synapse Spark pipelines for data ingestion & transformation\n- 🗂️ Delta Lake tables with medallion architecture (Bronze → Silver → Gold)\n- 📈 DirectLake Power BI semantic models for zero-import real-time reporting\n- 🔒 Row-level security & workspace governance\n\nThis replaced a legacy SQL Server DWH and cut reporting latency by **~80%**. Want to see his other database work?",
      ],
      followUp: ["Database Tuning", "AI P6 Automation", "Data Science Projects", "Contact Akhil"],
    },

    // ── P6 AI AUTOMATION ──────────────────────────────────────────────────
    {
      id: "p6_automation",
      tags: ["primavera", "p6", "ai automation", "langchain", "schedule audit", "schedule health", "risk assessment", "genai", "llm automation", "planning automation"],
      response: [
        "The **AI-Powered Primavera P6 Audit Automation** is a standout project 🤖\n\nAkhil built a Python + LangChain pipeline that:\n- 📂 Ingests P6 XER schedule exports automatically\n- 🔍 Runs **schedule health checks** (logic, float, critical path)\n- ⚠️ Identifies planning risks and bottlenecks\n- 📝 Generates **AI-written risk mitigation summaries** in seconds\n\nThis slashed manual audit time from days to minutes. Want to explore his Microsoft Fabric or database work next?",
      ],
      followUp: ["Fabric Lakehouse", "Database Tuning", "His Python Skills", "Contact Akhil"],
    },

    // ── DATABASE TUNING ────────────────────────────────────────────────────
    {
      id: "db_tuning",
      tags: ["database", "sql", "query optimisation", "query optimization", "indexing", "partitioning", "performance", "sql server", "tuning", "schema"],
      response: [
        "Akhil's **Database Architecture & Query Optimisation** project is a masterclass in SQL engineering ⚡\n\nHe tackled a high-throughput enterprise schema that was grinding to a halt:\n- 🗂️ Restructured schemas and split hot/cold data\n- 🔑 Designed covering indexes and filtered indexes for critical queries\n- 📊 Implemented table partitioning on date columns\n- 🔄 Rewrote N+1 queries as set-based operations\n\n**Result: 65% reduction in query response time.** Want to see his Fabric or AI work?",
      ],
      followUp: ["Fabric Lakehouse", "AI P6 Automation", "His SQL Skills", "Contact Akhil"],
    },

    // ── SPOTIFY ANALYSIS ──────────────────────────────────────────────────
    {
      id: "spotify_project",
      tags: ["spotify", "power bi", "deneb", "glassmorphism", "music analysis", "advanced dashboard"],
      response: [
        "The **Spotify Power BI Analysis** is one of Akhil's most visually stunning projects 🎵\n\nHe used Python for advanced data enrichment (audio features, tempo, valence) and built a **glass-morphism dashboard** with DENEB custom visuals. The result is a beautiful, interactive analytics experience that feels nothing like a typical BI report. Want to check out his other analytics work?",
      ],
      followUp: ["SpaceX Prediction", "Grocery Analytics", "Show all Projects", "Contact Akhil"],
    },

    // ── SPACEX PROJECT ─────────────────────────────────────────────────────
    {
      id: "spacex_project",
      tags: ["spacex", "falcon 9", "landing prediction", "machine learning", "rocket", "prediction model"],
      response: [
        "The **SpaceX Falcon-9 Landing Prediction** is a machine learning gem 🚀\n\nAkhil built a classification model that predicts successful first-stage booster landings using historical launch data. The pipeline covers:\n- 🔄 Data collection via SpaceX REST API\n- 🧹 Feature engineering & EDA\n- 🤖 Multiple ML models (Logistic, SVM, Decision Tree, KNN) with GridSearchCV\n\nA great showcase of his end-to-end data science skills. Want to see more?",
      ],
      followUp: ["Spotify Analysis", "Grocery Analytics", "His Python Skills", "Show all Projects"],
    },

    // ── CONTACT ────────────────────────────────────────────────────────────
    {
      id: "contact",
      weight: 1.4,
      tags: ["contact", "reach", "email", "hire", "get in touch", "connect", "collaborate", "work with akhil", "how can i contact", "inquiry"],
      response: [
        `You can reach Akhil through multiple channels:\n\n📧 **Email:** [${EMAIL}](mailto:${EMAIL})\n💼 **LinkedIn:** [akhilkarthikk](${SOCIAL_LINKS.linkedin})\n🐙 **GitHub:** [akhilkarthik](${SOCIAL_LINKS.github})\n\nHe typically responds within **24-48 hours**. He's always open to interesting collaborations! 🤝`,
      ],
      followUp: ["LinkedIn Profile", "GitHub Profile", "Send an Inquiry", "Copy CV Link"],
    },

    // ── LINKEDIN ───────────────────────────────────────────────────────────
    {
      id: "linkedin",
      tags: ["linkedin", "linkedin profile", "professional profile", "connect on linkedin"],
      response: [
        `You can find Akhil's full professional profile on LinkedIn here: [linkedin.com/in/akhilkarthikk](${SOCIAL_LINKS.linkedin})\n\nHe shares updates on his Fabric, AI, and database engineering work there. Feel free to connect! 🤝`,
      ],
      followUp: ["GitHub Profile", "Email him", "Copy CV Link", "Back to chat"],
    },

    // ── GITHUB ─────────────────────────────────────────────────────────────
    {
      id: "github",
      tags: ["github", "github profile", "code", "repositories", "open source", "repo", "source code"],
      response: [
        `Check out all of Akhil's repositories on GitHub: [github.com/akhilkarthik](${SOCIAL_LINKS.github})\n\nHis projects include Fabric pipelines, ML models, and P6 automation scripts — all with clean, documented code. He's quite active there! 🐙`,
      ],
      followUp: ["LinkedIn Profile", "Show Projects", "Copy CV Link", "Back to chat"],
    },

    // ── CV / RESUME ────────────────────────────────────────────────────────
    {
      id: "copy_cv",
      tags: ["cv", "resume", "copy cv", "cv link", "download resume", "get resume", "copy resume link"],
      response: ["I've copied Akhil's CV link to your clipboard! 📋 You can paste it anywhere you need. Anything else I can help with?"],
      followUp: ["Show Projects", "Contact Akhil", "Who is Akhil?"],
      action: "copy",
      actionPayload: "cv",
    },

    // ── WHAT CAN YOU DO ───────────────────────────────────────────────────
    {
      id: "capabilities",
      tags: ["what can you do", "help", "how can you help", "what are you", "abilities", "features", "what do you know"],
      response: [
        "I'm **Laura** — Akhil's intelligent portfolio assistant 🤖\n\nHere's what I can do:\n- 📋 Tell you about Akhil's projects, skills & experience\n- 🔍 Answer questions about specific technologies (Fabric, SQL, P6, AI)\n- 📬 Help you get in touch with him\n- 💡 Suggest the most relevant parts of his portfolio for your needs\n\nJust ask me anything — in plain English (typos are fine, I'm fuzzy like that 😄). What would you like to know?",
      ],
      followUp: ["Show me projects", "His Skills", "Who is Akhil?", "Contact him"],
    },

    // ── NAME INTRODUCTION ─────────────────────────────────────────────────
    {
      id: "user_name",
      tags: ["my name is", "i am", "i'm", "call me", "you can call me"],
      response: [
        "Nice to meet you, {userName}! 😊 I'll remember that. So, what brings you here today — are you looking to explore Akhil's engineering projects, check out his skills, or perhaps discuss a collaboration?",
      ],
      followUp: ["Show me projects", "His Skills", "Contact Akhil", "What can you do?"],
    },

    // ── THANKS ─────────────────────────────────────────────────────────────
    {
      id: "thanks",
      tags: ["thank you", "thanks", "thx", "ty", "cheers", "appreciate", "that helps"],
      response: [
        "You're welcome! 😊 It's what I'm here for. Anything else you'd like to know about Akhil?",
        "Anytime! Happy to help. Is there anything else about Akhil's work I can tell you about?",
        "Glad I could help! 🙌 Want to explore more of Akhil's portfolio?",
      ],
      followUp: ["Show me projects", "His Skills", "Contact Akhil"],
    },

    // ── GOODBYE ────────────────────────────────────────────────────────────
    {
      id: "goodbye",
      tags: ["bye", "goodbye", "see you", "cya", "later", "take care", "farewell"],
      response: [
        "Take care! 👋 Come back anytime — I'll be right here. Good luck with everything!",
        "Bye! 😊 It was great chatting. Don't hesitate to reach out if you have more questions about Akhil's work!",
      ],
      followUp: [],
    },

    // ── PYTHON / DATA SCIENCE ──────────────────────────────────────────────
    {
      id: "python_skills",
      tags: ["python", "data science", "pandas", "numpy", "scikit-learn", "matplotlib", "machine learning", "ml", "ai"],
      response: [
        "Python is central to Akhil's work 🐍\n\nHe uses it for:\n- **Data Science:** Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn\n- **AI Automations:** LangChain, OpenAI/Gemini APIs, prompt engineering\n- **Data Engineering:** PySpark (in Fabric Synapse), ETL pipelines\n- **Scheduling Automation:** XER file parsing, P6 schedule health audits\n\nWant to see a specific Python project?",
      ],
      followUp: ["SpaceX Prediction", "AI P6 Automation", "Other Projects", "Contact Akhil"],
    },

    // ── POWER BI ───────────────────────────────────────────────────────────
    {
      id: "power_bi",
      tags: ["power bi", "tableau", "visualization", "dashboard", "report", "bi", "business intelligence", "deneb"],
      response: [
        "Akhil's BI work stands out for its **visual polish and analytical depth** 📊\n\nHe builds:\n- DirectLake Power BI models on Fabric (zero-import, real-time)\n- Advanced custom visuals with **DENEB** (Vega-Lite)\n- Glass-morphism UI dashboards (Spotify project)\n- Sales forecasting & KPI tracking dashboards\n\nHis dashboards don't just look good — they drive real decisions. Want to see examples?",
      ],
      followUp: ["Spotify Analysis", "Fabric Lakehouse", "Grocery Analytics", "Contact Akhil"],
    },

    // ── CURRENT FOCUS ──────────────────────────────────────────────────────
    {
      id: "current_focus",
      tags: ["current focus", "what is he working on", "latest project", "currently", "right now", "newest"],
      response: [
        "Right now, Akhil is focused on **enterprise-grade AI automation and Microsoft Fabric platforms** 🔥\n\nHe's exploring:\n- Agentic AI systems with LangChain for operational planning\n- DirectLake semantic models with real-time streaming data\n- Database architecture patterns for high-concurrency workloads\n\nAlways building something interesting. Want to collaborate? Reach out!",
      ],
      followUp: ["Fabric Lakehouse", "AI P6 Automation", "Contact Akhil", "Show Projects"],
    },

    // ── QUICK SUMMARY ──────────────────────────────────────────────────────
    {
      id: "quick_summary",
      tags: ["quick summary", "tldr", "tl;dr", "brief", "overview", "in short", "summarise", "summarize"],
      response: [
        "**TL;DR:** Akhil Karthik is a Planning Engineer & Database Architect with 5+ years of experience, expert in Microsoft Fabric, Primavera P6, SQL Server query optimisation, and AI automations. He turns complex operational and data problems into elegant engineered solutions. 🚀",
      ],
      followUp: ["Show Projects", "Contact him", "Who is Akhil?", "His Skills"],
    },
  ],
};
