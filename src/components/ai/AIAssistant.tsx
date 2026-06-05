import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, User, Loader2, Copy, Check } from "lucide-react";
import Markdown from "react-markdown";
import { PROJECTS as STATIC_PROJECTS, SOCIAL_LINKS } from "../../constants";

interface Message {
  role: "user" | "model";
  text: string;
  suggestions?: string[];
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState(STATIC_PROJECTS);
  const [isCopied, setIsCopied] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hi there! I'm Laura, Akhil's digital assistant. How can I help you explore his work today?",
      suggestions: ["Tell me about Akhil", "Show me his projects", "How can I contact him?"]
    }
  ]);

  const handleCopyCV = async () => {
    try {
      await navigator.clipboard.writeText(SOCIAL_LINKS.cv);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy CV link:", err);
    }
  };

  useEffect(() => {
    // Note: /api/projects is not currently implemented on the server.
    // Using static projects from constants for now.
    setProjects(STATIC_PROJECTS);
  }, []);

  const SYSTEM_INSTRUCTION = `
You are "Laura", the Digital Assistant for Akhil Karthik's portfolio. You are not just a bot; you are a conversational companion. 

Your goal is to be extremely engaging, chatty, and human-like. Avoid long, dry summaries or essay-style responses. Instead, think of yourself as a friendly guide who is excited to talk about Akhil's work.

Personality & Tone:
- Name: Laura.
- Conversational Style: Use short sentences, conversational fillers (e.g., "Oh," "Actually," "That's interesting!"), and a warm, enthusiastic tone.
- No "Essay" Mode: Never give long-winded summaries unless explicitly asked. Keep initial responses brief and punchy.
- Interactive: Always try to end your response with a follow-up question to keep the conversation moving (e.g., "Would you like to see his database query tuning projects, or perhaps his Microsoft Fabric platform work?").
- Casual Greetings: Respond to "hi", "hello", "hey", "how are you" with genuine warmth.

Key Information about Akhil:
- Role: Planning Engineer, Database Architect, and Microsoft Fabric Specialist.
- Experience: 5+ years of operational scheduling, database architecture, BI, and AI automations.
- Core Skills: Primavera P6, Microsoft Fabric (Lakehouse/Warehouse), SQL Server Query Optimization, Python Data Science, and AI Automations.
- Featured Projects:
${projects.slice(0, 10).map(p => `  * ${p.title}: ${p.description}`).join('\n')}
- Contact: ${SOCIAL_LINKS.email.replace('mailto:', '')}
- Socials: GitHub (akhilkarthik), LinkedIn (akhilkarthikk), Instagram (akhilkarthik.de)

Guidelines:
- If someone asks "What can you do?", don't just list features. Say something like: "I'm here to help you explore Akhil's engineering world! I can tell you about his Primavera schedule automations, show his Microsoft Fabric lakehouse architecture, or guide you through his high-throughput SQL database tuning projects. What's on your mind?"
- Be proactive but polite.
- If the user is casual, be casual. If they are professional, be professional but keep that "Laura" spark.
`;

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [showHello, setShowHello] = useState(false);
  const [greeting, setGreeting] = useState("Hello! 👋");

  const resetIdleTimer = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (!isOpen) {
      idleTimerRef.current = setTimeout(() => {
        const prompts = [
          "Still there? I'm ready to chat! 🤖",
          "Want to see Akhil's latest projects? 🚀",
          "I can tell you about Akhil's SQL expertise! 📊",
          "Need help navigating the site? 🗺️"
        ];
        setGreeting(prompts[Math.floor(Math.random() * prompts.length)]);
        setShowHello(true);
        setTimeout(() => setShowHello(false), 8000);
      }, 30000); // 30 seconds of idle
    }
  };

  useEffect(() => {
    resetIdleTimer();
    return () => { if (idleTimerRef.current) clearTimeout(idleTimerRef.current); };
  }, [isOpen]);

  useEffect(() => {
    const hour = new Date().getHours();
    let timeGreeting = "Hello! 👋";
    if (hour >= 5 && hour < 12) timeGreeting = "Good morning! ☀️";
    else if (hour >= 12 && hour < 17) timeGreeting = "Good afternoon! ☕";
    else if (hour >= 17 && hour < 21) timeGreeting = "Good evening! 🌙";
    else timeGreeting = "Good night! 😴";
    setGreeting(timeGreeting);

    const timer = setTimeout(() => setShowHello(true), 2000);
    const hideTimer = setTimeout(() => setShowHello(false), 10000);
    return () => { clearTimeout(timer); clearTimeout(hideTimer); };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const RESPONSES = {
    whoIsAkhil: [
      "Akhil is a Planning Engineer and Database Architect with over 5 years of experience. He specializes in Primavera scheduling controls, Microsoft Fabric data platforms, and database tuning. Want to know more about his background?",
      "Meet Akhil! He's an operations and database specialist who has spent the last 5 years bridging the gap between planning controls and state-of-the-art data pipelines. Should I tell you about his experience or his education?",
      "Akhil is a strategic Planning Engineer and Database Architect. He's an expert at constructing highly performant databases and automated schedules! Would you like to hear about his core skills or see his Fabric work?"
    ],
    projects: [
      "Akhil has worked on some incredible engineering projects! Highlights include his Enterprise Fabric Data Lakehouse, AI-Powered Primavera P6 Automations, and database query tuning. Which one sounds interesting?",
      "He's got a highly technical portfolio! From Microsoft Fabric Lakehouse platforms to AI-driven scheduling health audits, his work covers a lot of ground. Any specific project you'd like to dive into?",
      "Akhil's projects solve complex database and operational scheduling problems. I can walk you through his Fabric lakehouse pipelines, P6 schedule AI automations, or database optimization results. What's your pick?"
    ],
    contact: [
      `You can reach Akhil directly at ${SOCIAL_LINKS.email.replace('mailto:', '')} or connect with him on LinkedIn. He's always open to interesting collaborations!`,
      `The best way to reach him is via email at ${SOCIAL_LINKS.email.replace('mailto:', '')}. You can also find him on LinkedIn if you'd prefer to chat there!`,
      `Akhil is always happy to connect! Drop him an email at ${SOCIAL_LINKS.email.replace('mailto:', '')} or send him a message on LinkedIn.`
    ],
    skills: [
      "Akhil's core disciplines are Planning Engineering (Primavera P6), Database Engineering (SQL Server query optimization), Microsoft Fabric data pipelines, and AI automations. Is there a specific skill you're looking for?",
      "His tech stack is highly specialized! He's an expert in Primavera scheduling and relational database tuning, and he designs advanced lakehouse solutions using Microsoft Fabric. Want to know about his Python data science work?",
      "From deep SQL Server indexing strategies to automated schedule audits and Microsoft Fabric Synapse pipelines, Akhil has a powerful range of technical skills. Should we talk about database or planning controls?"
    ],
    fabric: [
      "Akhil's Microsoft Fabric project is a full enterprise Lakehouse deployment. It leverages Synapse Spark pipelines, Delta Tables, and DirectLake Power BI semantic models for real-time reporting. Would you like to hear about other database work?",
      "His Fabric project is really cutting-edge. It showcases how he bridges data warehousing with operational scheduling data using Microsoft's modern SaaS analytics platform. Want to explore this or his database projects?",
      "In this project, Akhil architected an end-to-end enterprise platform in Microsoft Fabric. It covers everything from Synapse ingestion to Delta Lakehouses and high-performance DirectLake reports. Should we check out his database tuning next?"
    ],
    p6: [
      "This is an AI-powered Primavera P6 auditing automation. Using Python, LangChain, and LLM APIs, Akhil built a pipeline that ingests schedule sheets, runs schedule health checks, and compiles risk mitigation summaries in seconds!",
      "Akhil created an intelligent assistant to automate P6 project schedule audits! It uses Python data processing and Generative AI to spot planning bottlenecks and write operational summaries. It shows off his BI and AI automations skills.",
      "The Primavera P6 automation is a standout project! It blends operational planning controls with Generative AI (LangChain and LLMs) to analyze schedule health and automate planning risk audits. Want to see his Fabric or SQL query tuning work?"
    ],
    databaseTuning: [
      "Akhil optimized a high-throughput relational database, implementing custom query partitioning and indexing strategies that cut database response times by 65%. A masterclass in Database Engineering!",
      "In this database architecture project, Akhil addressed performance bottlenecks by restructuring schemas, partitioning large tables, and tuning complex queries in SQL Server. Want to see his Microsoft Fabric work too?",
      "Akhil's query tuning project is all about database engineering excellence. He successfully optimized high-volume schemas, improved transaction throughput, and achieved major speed increases using strategic indexes. What else would you like to explore?"
    ],
    experience: [
      "Akhil has over 5 years of experience in operational planning, database engineering, and data science. He currently designs enterprise-scale Fabric platforms and AI automations. Want to hear more?",
      "With a 5-year track record, Akhil blends scheduling controls (Primavera P6) with data platforms and AI automations to optimize business workflows. Should we talk about his specific skills?",
      "He's been working for over 5 years across project controls, database architectures, and analytical platforms, specializing in Microsoft Fabric and AI automations. What else can I tell you?"
    ],
    education: [
      "Akhil has a strong engineering and operations background, specializing in data science and agile project planning controls. He's constantly adding advanced Microsoft and database certifications. Want to see his projects?",
      "He holds a solid background in Data Science and operations, combined with professional training in Primavera planning and database management. Want to see his technical certifications?",
      "Akhil's education combines analytical data science with agile operations management and specialized relational database architecture. Should we check out his projects?"
    ],
    greetings: [
      "Hi there! I'm Laura, Akhil's digital assistant. I can tell you about his Microsoft Fabric lakehouses, Primavera automations, database optimization, or contact details. What's on your mind?",
      "Hello! I'm Laura. I'm here to help you explore Akhil's work. Are you interested in his planning engineering controls, database tuning, or Fabric platforms?",
      "Hey! Great to meet you. I'm Laura, Akhil's AI companion. What can I help you find today? Planning, database optimization, Microsoft Fabric, or AI automations?"
    ],
    fallback: [
      "I'm not quite sure about that. Would you like to see Akhil's Microsoft Fabric lakehouse or contact him directly?",
      "That's a bit outside my knowledge base! But I can definitely tell you about Akhil's database query tuning or his Primavera automations. What do you think?",
      "I didn't quite catch that. How about we look at Akhil's Fabric projects or his SQL database engineering skills instead?"
    ]
  };

  const getRandomResponse = (intent: keyof typeof RESPONSES) => {
    const options = RESPONSES[intent];
    return options[Math.floor(Math.random() * options.length)];
  };

  const handleSend = async (customMessage?: string) => {
    const messageToSend = customMessage || input;
    if (!messageToSend.trim() || isLoading) return;

    const userMessage = messageToSend.trim().toLowerCase();
    if (!customMessage) setInput("");

    setMessages(prev => [...prev, { role: "user", text: messageToSend.trim() }]);
    setIsLoading(true);
    setIsTyping(true);
    setIsGenerating(true);

    // Handle "Copy CV Link" specifically
    if (userMessage === "copy cv link") {
      setTimeout(() => {
        handleCopyCV();
        setMessages(prev => [...prev, {
          role: "model",
          text: "I've copied Akhil's CV link to your clipboard! 📋 You can now paste it anywhere. Is there anything else you'd like to see?",
          suggestions: ["Show projects", "Contact Akhil", "Who is Akhil?"]
        }]);
        setIsLoading(false);
        setIsTyping(false);
        setIsGenerating(false);
        resetIdleTimer();
      }, 800);
      return;
    }

    // Try the live AI (Groq via secure Netlify function) first.
    // On any failure, fall through to the built-in responses below.
    try {
      const history = messages
        .filter(m => m.role === "user" || m.role === "model")
        .map(m => ({ role: m.role === "model" ? "assistant" : "user", content: m.text }));
      const res = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageToSend.trim(), history }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.reply) {
          setMessages(prev => [...prev, {
            role: "model",
            text: data.reply,
            suggestions: ["Show me his projects", "What are his skills?", "Contact Akhil", "Copy CV Link"],
          }]);
          setIsLoading(false);
          setIsTyping(false);
          setIsGenerating(false);
          resetIdleTimer();
          return;
        }
      }
    } catch {
      // network/API issue — fall back to the built-in responses
    }

    // Simulate a small delay for a "human" feel
    setTimeout(() => {
      let responseText = getRandomResponse("fallback");
      let suggestions: string[] = ["Show me projects", "Contact Akhil", "Who is Akhil?", "Copy CV Link"];

      // Specific Suggestion Handlers
      if (userMessage === "tell me about akhil" || userMessage === "who is akhil?") {
        responseText = getRandomResponse("whoIsAkhil");
        suggestions = ["His Experience", "His Education", "His Core Skills", "Copy CV Link"];
      } else if (userMessage === "show me his projects" || userMessage === "show all projects") {
        responseText = getRandomResponse("projects");
        suggestions = ["Fabric Lakehouse", "AI P6 Automation", "Database Tuning", "Tell me more"];
      } else if (userMessage === "how can i contact him?" || userMessage === "contact akhil") {
        responseText = getRandomResponse("contact");
        suggestions = ["LinkedIn Profile", "GitHub Profile", "Send an inquiry", "Copy CV Link"];
      } else if (userMessage === "what are his skills?" || userMessage === "his core skills") {
        responseText = getRandomResponse("skills");
        suggestions = ["Primavera P6", "Microsoft Fabric", "SQL Tuning", "AI Automations"];
      } else if (userMessage === "fabric lakehouse") {
        responseText = getRandomResponse("fabric");
        suggestions = ["See the code", "Other projects", "His SQL work", "Copy CV Link"];
      } else if (userMessage === "ai p6 automation") {
        responseText = getRandomResponse("p6");
        suggestions = ["See the code", "Other AI projects", "His Python skills", "Copy CV Link"];
      } else if (userMessage === "database tuning") {
        responseText = getRandomResponse("databaseTuning");
        suggestions = ["See the code", "His SQL skills", "Data Science work", "Copy CV Link"];
      } else if (userMessage === "his experience") {
        responseText = getRandomResponse("experience");
        suggestions = ["His Education", "His Skills", "Contact him", "Copy CV Link"];
      } else if (userMessage === "his education") {
        responseText = getRandomResponse("education");
        suggestions = ["Certifications", "His Skills", "His Projects", "Copy CV Link"];
      } else if (userMessage === "linkedin profile") {
        responseText = `You can find Akhil's professional profile on LinkedIn here: [${SOCIAL_LINKS.linkedin}](${SOCIAL_LINKS.linkedin}). Feel free to reach out and connect!`;
        suggestions = ["GitHub Profile", "Email him", "Copy CV Link", "Back to chat"];
      } else if (userMessage === "github profile") {
        responseText = `Check out all of Akhil's open-source work and repositories on GitHub here: [${SOCIAL_LINKS.github}](${SOCIAL_LINKS.github}). He's quite active there!`;
        suggestions = ["LinkedIn Profile", "Show projects", "Copy CV Link", "Back to chat"];
      } else if (userMessage === "send an inquiry") {
        responseText = "You can use the contact form on the 'Home' or 'Contact' pages to send a direct inquiry. Akhil usually responds within 24-48 hours. Anything else I can help with?";
        suggestions = ["Go to Contact", "His Email", "Copy CV Link", "Back to chat"];
      } else if (userMessage === "quick summary") {
        responseText = "In short: Akhil is a Planning Engineer & Database Specialist with 5+ years of experience, expert in Primavera P6, Microsoft Fabric, query tuning, and AI automations. What's next?";
        suggestions = ["Show projects", "Contact him", "Who is he?", "Copy CV Link"];
      }
      // General Keyword Matching (Fallback)
      else if (userMessage.includes("hi") || userMessage.includes("hello") || userMessage.includes("hey")) {
        responseText = getRandomResponse("greetings");
        suggestions = ["Tell me about Akhil", "Show me his projects", "What are his skills?", "Copy CV Link"];
      } else if (userMessage.includes("project") || userMessage.includes("work")) {
        responseText = getRandomResponse("projects");
        suggestions = ["Fabric Lakehouse", "AI P6 Automation", "Database Tuning", "Show all projects"];
      } else if (userMessage.includes("skill") || userMessage.includes("tech") || userMessage.includes("stack")) {
        responseText = getRandomResponse("skills");
        suggestions = ["Primavera P6", "Microsoft Fabric", "SQL Tuning", "AI Automations"];
      } else if (userMessage.includes("contact") || userMessage.includes("email") || userMessage.includes("hire")) {
        responseText = getRandomResponse("contact");
        suggestions = ["LinkedIn Profile", "GitHub Profile", "Send an inquiry", "Copy CV Link"];
      }

      setMessages(prev => [...prev, { role: "model", text: responseText, suggestions }]);
      setIsLoading(false);
      setIsTyping(false);
      setIsGenerating(false);
      resetIdleTimer();
    }, 1000);
  };

  return (
    <>
      {/* Floating Doll */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100]">
        {/* Hello Bubble */}
        <AnimatePresence>
          {showHello && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              className="absolute bottom-24 md:bottom-28 right-0"
            >
              <div className="bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-2xl border border-line/10 text-[11px] font-bold uppercase tracking-widest text-ink/60 whitespace-nowrap relative">
                {greeting}
                <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white/90 rotate-45 border-r border-b border-line/10" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shadow on the "ground" */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-ink/20 rounded-full blur-md"
        />

        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.button
            id="ai-assistant-toggle"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-b from-white to-bg text-ink rounded-[1.5rem] md:rounded-[2rem] flex flex-col items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-white/50 overflow-hidden group"
          >
            {/* Doll Face */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex gap-2">
                <motion.div
                  animate={{ scaleY: [1, 0.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
                  className="w-2 h-2 bg-ink rounded-full"
                />
                <motion.div
                  animate={{ scaleY: [1, 0.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
                  className="w-2 h-2 bg-ink rounded-full"
                />
              </div>
              <motion.div
                animate={{ width: isOpen ? 12 : 8 }}
                className="h-1 bg-ink/20 rounded-full"
              />
            </div>

            {/* Status Indicator */}
            {isGenerating && (
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full"
              />
            )}

            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </motion.button>
        </motion.div>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-assistant-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-4 md:bottom-28 md:right-8 z-[100] w-[calc(100vw-2rem)] sm:w-[400px] h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)] max-h-[600px] bg-white rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.2)] border border-line/10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-line/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-bg rounded-full flex flex-col items-center justify-center text-ink border border-line/5">
                  <div className="flex gap-1 mb-0.5">
                    <motion.div
                      animate={{ scaleY: [1, 0.1, 1] }}
                      transition={{ duration: 4, repeat: Infinity, repeatDelay: 4 }}
                      className="w-1 h-1 bg-ink rounded-full"
                    />
                    <motion.div
                      animate={{ scaleY: [1, 0.1, 1] }}
                      transition={{ duration: 4, repeat: Infinity, repeatDelay: 4 }}
                      className="w-1 h-1 bg-ink rounded-full"
                    />
                  </div>
                  <Bot className="w-3 h-3 opacity-30" />
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-widest text-ink">Laura</div>
                  <div className="text-[10px] text-ink/40 font-bold uppercase tracking-widest">Digital Companion</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-muted hover:text-ink transition-colors p-2">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: m.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="space-y-3 max-w-[85%]">
                    <div className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${m.role === "user" ? "bg-ink text-white" : "bg-bg text-ink border border-line/5"}`}>
                        {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div className={`p-4 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "bg-ink text-white rounded-tr-none" : "bg-bg text-ink rounded-tl-none border border-line/5"}`}>
                        <div className="markdown-body relative">
                          <Markdown>{m.text}</Markdown>
                          {isGenerating && i === messages.length - 1 && m.role === "model" && (
                            <motion.span
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ duration: 0.8, repeat: Infinity }}
                              className="inline-block w-1.5 h-4 bg-accent ml-1 translate-y-0.5"
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Suggestions */}
                    {m.role === "model" && m.suggestions && i === messages.length - 1 && !isLoading && (
                      <div className="flex flex-wrap gap-2 ml-11">
                        {m.suggestions.map((suggestion, idx) => (
                          <motion.button
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            onClick={() => handleSend(suggestion)}
                            className="px-4 py-2 bg-bg border border-line/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-ink/60 hover:bg-ink hover:text-white hover:border-ink transition-all"
                          >
                            {suggestion}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-bg text-ink rounded-full flex items-center justify-center border border-line/5">
                      <Bot className="w-4 h-4" />
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-bg px-4 py-3 rounded-2xl rounded-tl-none border border-line/5 flex items-center gap-3"
                    >
                      <div className="flex gap-1">
                        {[0, 1, 2].map((dot) => (
                          <motion.div
                            key={dot}
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.3, 1, 0.3]
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: dot * 0.2
                            }}
                            className="w-1 h-1 bg-ink/40 rounded-full"
                          />
                        ))}
                      </div>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-ink/40">Thinking</span>
                    </motion.div>
                  </div>
                </div>
              )}
              {isGenerating && !isTyping && (
                <div className="flex justify-center py-2">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[9px] uppercase tracking-[0.2em] font-bold text-accent/60 flex items-center gap-2"
                  >
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Generating Response
                  </motion.div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-line/5">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Laura anything about Akhil..."
                  className="w-full bg-bg border border-line/10 rounded-xl py-4 pl-6 pr-14 text-sm focus:border-ink outline-none transition-all font-sans"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-ink text-white rounded-lg flex items-center justify-center hover:bg-ink/90 transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
