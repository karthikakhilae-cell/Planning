/**
 * AIAssistant.tsx
 * ============================================================
 * DROP-IN REPLACEMENT: src/components/ai/AIAssistant.tsx
 *
 * Fully intelligent AI assistant — NO external API.
 * Features:
 *  ✅ Semantic intent matching (TF-IDF cosine similarity)
 *  ✅ Fuzzy / typo tolerance (Levenshtein)
 *  ✅ Multi-turn conversation memory
 *  ✅ User name personalisation
 *  ✅ Sentiment-aware responses
 *  ✅ Voice input (Web Speech API — microphone)
 *  ✅ Voice output (SpeechSynthesis — text-to-speech)
 *  ✅ Realistic typing animation
 *  ✅ Confidence indicator
 *  ✅ Idle nudge with smart prompts
 *  ✅ Time-based greeting
 *  ✅ Copy-to-clipboard actions
 *  ✅ Markdown rendering
 *  ✅ Keyboard shortcuts (Ctrl/Cmd + K to toggle)
 * ============================================================
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X, Send, Bot, User, Mic, MicOff,
  Volume2, VolumeX, Copy, Check, Loader2,
  Sparkles, ChevronDown,
} from "lucide-react";
import Markdown from "react-markdown";
import { SOCIAL_LINKS } from "../../constants";
import { AIBrain } from "./AIBrain";
import type { BrainResponse } from "./AIBrain";
import { BRAIN_CONFIG } from "./knowledge";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Message {
  role: "user" | "model";
  text: string;
  suggestions?: string[];
  confidence?: number;
  intentId?: string;
  id: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const CV_LINK = (SOCIAL_LINKS as any).cv ?? SOCIAL_LINKS.linkedin;

function uid() {
  return Math.random().toString(36).slice(2);
}

function timeGreeting(): string {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "Good morning! ☀️";
  if (h >= 12 && h < 17) return "Good afternoon! ☕";
  if (h >= 17 && h < 21) return "Good evening! 🌙";
  return "Burning the midnight oil? 😴";
}

// ─── Singleton brain (persists across re-renders) ─────────────────────────────
const brain = new AIBrain(BRAIN_CONFIG);

// ─── Component ───────────────────────────────────────────────────────────────

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uid(),
      role: "model",
      text: "Hi there! 👋 I'm **Laura**, Akhil's AI assistant. Ask me anything about his projects, skills, or how to get in touch!",
      suggestions: ["Tell me about Akhil", "Show me his projects", "What are his skills?", "How to contact him"],
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isTypingOut, setIsTypingOut] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [showHello, setShowHello] = useState(false);
  const [greeting, setGreeting] = useState(timeGreeting());
  const [isMuted, setIsMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceSupport, setVoiceSupport] = useState(false);
  const [ttsSupport, setTtsSupport] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // ── Speech setup ─────────────────────────────────────────────────────────
  useEffect(() => {
    // Voice input
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setVoiceSupport(true);
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "en-US";
      rec.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      rec.onerror = () => setIsListening(false);
      rec.onend = () => setIsListening(false);
      recognitionRef.current = rec;
    }

    // Voice output
    if ("speechSynthesis" in window) {
      setTtsSupport(true);
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // ── Keyboard shortcut ─────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  // ── Idle nudge ────────────────────────────────────────────────────────────
  const resetIdleTimer = useCallback(() => {
    if (idleRef.current) clearTimeout(idleRef.current);
    if (!isOpen) {
      idleRef.current = setTimeout(() => {
        const prompts = [
          "Still there? I'm ready to chat! 🤖",
          "Want to see Akhil's latest projects? 🚀",
          "I can tell you about his SQL expertise! 📊",
          "Ask me about Microsoft Fabric! 🔷",
          "Need help navigating Akhil's portfolio? 🗺️",
        ];
        setGreeting(prompts[Math.floor(Math.random() * prompts.length)]);
        setShowHello(true);
        setTimeout(() => setShowHello(false), 8_000);
      }, 30_000);
    }
  }, [isOpen]);

  useEffect(() => {
    resetIdleTimer();
    return () => { if (idleRef.current) clearTimeout(idleRef.current); };
  }, [isOpen, resetIdleTimer]);

  // ── Initial greeting bubble ───────────────────────────────────────────────
  useEffect(() => {
    const t1 = setTimeout(() => setShowHello(true), 2_000);
    const t2 = setTimeout(() => setShowHello(false), 10_000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // ── Auto-scroll ───────────────────────────────────────────────────────────
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    if (atBottom) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    else setShowScrollDown(true);
  }, [messages, typingText]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowScrollDown(el.scrollHeight - el.scrollTop - el.clientHeight > 80);
  };

  // ── Focus input when chat opens ───────────────────────────────────────────
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 200);
  }, [isOpen]);

  // ── TTS helper ────────────────────────────────────────────────────────────
  const speak = (text: string) => {
    if (!ttsSupport || isMuted || !synthRef.current) return;
    synthRef.current.cancel();
    // Strip markdown
    const plain = text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/[_*#`[\]()]/g, "").slice(0, 300);
    const utt = new SpeechSynthesisUtterance(plain);
    utt.rate = 1.05;
    utt.pitch = 1.1;
    const voices = synthRef.current.getVoices();
    const preferred = voices.find(v => v.name.toLowerCase().includes("female") || v.name.includes("Samantha") || v.name.includes("Karen"));
    if (preferred) utt.voice = preferred;
    synthRef.current.speak(utt);
  };

  // ── Typewriter effect ─────────────────────────────────────────────────────
  const typeOut = (fullText: string, onDone: () => void) => {
    setIsTypingOut(true);
    setTypingText("");
    let i = 0;
    const CHAR_DELAY = 14; // ms per char — fast but visible
    const interval = setInterval(() => {
      i++;
      setTypingText(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(interval);
        setIsTypingOut(false);
        setTypingText("");
        onDone();
      }
    }, CHAR_DELAY);
    return () => clearInterval(interval);
  };

  // ── Handle copy CV action ─────────────────────────────────────────────────
  const handleCopyCV = async () => {
    try {
      await navigator.clipboard.writeText(CV_LINK);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2_500);
    } catch (_) {}
  };

  // ── Main send ─────────────────────────────────────────────────────────────
  const handleSend = async (customMessage?: string) => {
    const messageToSend = (customMessage ?? input).trim();
    if (!messageToSend || isThinking || isTypingOut) return;
    setInput("");

    // Add user message
    setMessages(prev => [...prev, { id: uid(), role: "user", text: messageToSend }]);
    setIsThinking(true);
    resetIdleTimer();

    // Handle "copy cv" shortcut before brain (no delay needed)
    if (messageToSend.toLowerCase() === "copy cv link") {
      await handleCopyCV();
      const res: Partial<BrainResponse> = {
        text: "I've copied Akhil's CV link to your clipboard! 📋 Paste it anywhere you need. What else can I help you with?",
        suggestions: ["Show Projects", "Contact Akhil", "Who is Akhil?"],
        confidence: 1,
        intentId: "copy_cv",
        typingMs: 400,
      };
      setTimeout(() => finishResponse(res as BrainResponse), 400);
      return;
    }

    // Get response from brain
    const brainRes = brain.respond(messageToSend);

    // Handle copy action
    if (brainRes.action === "copy" && brainRes.actionPayload === "cv") {
      await handleCopyCV();
    }

    // Simulate thinking delay (realistic)
    const thinkDelay = Math.min(1_200, Math.max(400, brainRes.typingMs * 0.4));
    setTimeout(() => {
      setIsThinking(false);
      finishResponse(brainRes);
    }, thinkDelay);
  };

  const finishResponse = (res: BrainResponse) => {
    speak(res.text);
    // Typewriter then commit
    typeOut(res.text, () => {
      setMessages(prev => [
        ...prev,
        {
          id: uid(),
          role: "model",
          text: res.text,
          suggestions: res.suggestions,
          confidence: res.confidence,
          intentId: res.intentId,
        },
      ]);
    });
  };

  // ── Voice input ───────────────────────────────────────────────────────────
  const toggleListen = () => {
    if (!voiceSupport) return;
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  // ── Confidence badge ──────────────────────────────────────────────────────
  const confidenceBadge = (c?: number) => {
    if (!c || c > 0.5) return null;
    return (
      <span className="text-[9px] uppercase tracking-widest font-bold text-amber-400/70 ml-1">
        ~uncertain
      </span>
    );
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Floating button ─────────────────────────────────────────────── */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100]">
        {/* Hello bubble */}
        <AnimatePresence>
          {showHello && !isOpen && (
            <motion.div
              key="hello-bubble"
              initial={{ opacity: 0, y: 10, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.85 }}
              className="absolute bottom-24 md:bottom-28 right-0"
            >
              <div className="bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-2xl border border-line/10 text-[11px] font-bold uppercase tracking-widest text-ink/60 whitespace-nowrap relative">
                {greeting}
                <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white/95 rotate-45 border-r border-b border-line/10" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ground shadow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.1, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-ink/20 rounded-full blur-md"
        />

        {/* Float + button */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.button
            id="ai-assistant-toggle"
            title="Open Laura (Ctrl+K)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(o => !o)}
            className="relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-b from-white to-bg text-ink rounded-[1.5rem] md:rounded-[2rem] flex flex-col items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-white/50 overflow-hidden group"
          >
            {/* Doll face */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex gap-2">
                {["l-eye", "r-eye"].map(k => (
                  <motion.div
                    key={k}
                    animate={{ scaleY: [1, 0.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, delay: k === "r-eye" ? 0.1 : 0 }}
                    className="w-2 h-2 bg-ink rounded-full"
                  />
                ))}
              </div>
              <motion.div
                animate={{ width: isOpen ? 12 : 8 }}
                className="h-1 bg-ink/20 rounded-full"
              />
            </div>

            {/* Thinking pulse */}
            {isThinking && (
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full"
              />
            )}

            {/* Shine */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </motion.button>
        </motion.div>
      </div>

      {/* ── Chat window ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-assistant-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-20 right-4 md:bottom-28 md:right-8 z-[100] w-[calc(100vw-2rem)] sm:w-[420px] h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)] max-h-[640px] bg-white rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.18)] border border-line/10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-line/5 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-bg rounded-full flex flex-col items-center justify-center text-ink border border-line/5 relative">
                  <div className="flex gap-1 mb-0.5">
                    {["l", "r"].map(k => (
                      <motion.div
                        key={k}
                        animate={{ scaleY: [1, 0.1, 1] }}
                        transition={{ duration: 4, repeat: Infinity, repeatDelay: 4 }}
                        className="w-1 h-1 bg-ink rounded-full"
                      />
                    ))}
                  </div>
                  <Bot className="w-3 h-3 opacity-30" />
                  {/* Online dot */}
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold uppercase tracking-widest text-ink">Laura</span>
                    <Sparkles className="w-3 h-3 text-accent" />
                  </div>
                  <div className="text-[10px] text-ink/40 font-bold uppercase tracking-widest">
                    AI · No API · Always learning
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Mute TTS */}
                {ttsSupport && (
                  <button
                    onClick={() => { setIsMuted(m => !m); synthRef.current?.cancel(); }}
                    title={isMuted ? "Unmute voice" : "Mute voice"}
                    className="p-1.5 text-muted hover:text-ink transition-colors rounded-lg hover:bg-bg"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-muted hover:text-ink transition-colors rounded-lg hover:bg-bg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-hide"
            >
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, x: m.role === "user" ? 20 : -20, y: 5 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="space-y-2.5 max-w-[88%]">
                    <div className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      {/* Avatar */}
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${m.role === "user" ? "bg-ink text-white" : "bg-bg text-ink border border-line/5"}`}>
                        {m.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                      </div>

                      {/* Bubble */}
                      <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "bg-ink text-white rounded-tr-none" : "bg-bg text-ink rounded-tl-none border border-line/5"}`}>
                        <div className="markdown-body">
                          <Markdown>{m.text}</Markdown>
                        </div>
                        {m.role === "model" && confidenceBadge(m.confidence)}
                      </div>
                    </div>

                    {/* Suggestion chips — only on last model message */}
                    {m.role === "model" &&
                      m.suggestions &&
                      m.id === messages[messages.length - 1].id &&
                      !isThinking && !isTypingOut && (
                        <div className="flex flex-wrap gap-1.5 ml-10">
                          {m.suggestions.map((s, idx) => (
                            <motion.button
                              key={idx}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.08 * idx }}
                              onClick={() => handleSend(s)}
                              className="px-3 py-1.5 bg-white border border-line/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-ink/60 hover:bg-ink hover:text-white hover:border-ink transition-all shadow-sm"
                            >
                              {s}
                            </motion.button>
                          ))}
                        </div>
                      )}
                  </div>
                </motion.div>
              ))}

              {/* Thinking dots */}
              {isThinking && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 bg-bg text-ink rounded-full flex items-center justify-center border border-line/5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="bg-bg px-4 py-3 rounded-2xl rounded-tl-none border border-line/5 flex items-center gap-2">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          animate={{ scale: [1, 1.6, 1], opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
                          className="w-1.5 h-1.5 bg-ink/40 rounded-full"
                        />
                      ))}
                      <span className="text-[9px] uppercase tracking-widest font-bold text-ink/30 ml-1">
                        Thinking
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Live typewriter */}
              {isTypingOut && typingText && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-2.5 max-w-[88%]">
                    <div className="w-7 h-7 bg-bg text-ink rounded-full flex items-center justify-center border border-line/5 flex-shrink-0">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="bg-bg px-4 py-3 rounded-2xl rounded-tl-none border border-line/5 text-sm leading-relaxed">
                      <div className="markdown-body">
                        <Markdown>{typingText}</Markdown>
                      </div>
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        className="inline-block w-1 h-4 bg-accent ml-0.5 translate-y-0.5 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Scroll-down indicator */}
            <AnimatePresence>
              {showScrollDown && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })}
                  className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-ink text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-lg"
                >
                  <ChevronDown className="w-3 h-3" /> Scroll down
                </motion.button>
              )}
            </AnimatePresence>

            {/* Input bar */}
            <div className="px-5 py-4 border-t border-line/5 flex-shrink-0">
              <div className="relative flex items-center gap-2">
                {/* Voice input button */}
                {voiceSupport && (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleListen}
                    title={isListening ? "Stop listening" : "Voice input"}
                    className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      isListening
                        ? "bg-red-500 text-white animate-pulse"
                        : "bg-bg border border-line/10 text-muted hover:text-ink"
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </motion.button>
                )}

                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
                  placeholder="Ask Laura anything…"
                  disabled={isThinking || isTypingOut}
                  className="flex-1 bg-bg border border-line/10 rounded-xl py-3 px-4 pr-12 text-sm focus:border-ink outline-none transition-all font-sans disabled:opacity-50"
                />

                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isThinking || isTypingOut}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-ink text-white rounded-lg flex items-center justify-center hover:bg-ink/90 transition-colors disabled:opacity-40"
                >
                  {isThinking
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : <Send className="w-4 h-4" />
                  }
                </button>
              </div>

              {/* Footer labels */}
              <div className="mt-2.5 flex items-center justify-between px-1">
                <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-muted/40">
                  Ctrl+K to toggle · No API · On-device AI
                </span>
                {isListening && (
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-[8px] uppercase tracking-widest font-bold text-red-400"
                  >
                    🎙 Listening…
                  </motion.span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
