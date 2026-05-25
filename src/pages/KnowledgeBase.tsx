import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus, Trash2, Copy, Download, Save, Database,
  ChevronRight, X, Check, AlertCircle, Sparkles
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────
interface KnowledgeField {
  id: string;
  key: string;
  value: string;
}

interface KnowledgeSection {
  id: string;
  title: string;
  icon: string;
  fields: KnowledgeField[];
}

interface KnowledgeDB {
  sections: KnowledgeSection[];
  lastSaved?: string;
}

// ─── Constants ───────────────────────────────────────────────
const STORAGE_KEY = "laura_knowledge_db";

const SECTION_ICONS = ["👤", "⚡", "🚀", "📬", "🤖", "📊", "🎯", "📁", "🔗", "💡", "🛠", "🌐"];

const DEFAULT_DB: KnowledgeDB = {
  sections: [
    {
      id: "s1", title: "Personal Info", icon: "👤",
      fields: [
        { id: "f1", key: "full_name", value: "Akhil Karthik" },
        { id: "f2", key: "role", value: "Planning Engineer & Database Architect" },
        { id: "f3", key: "experience", value: "5+ years" },
        { id: "f4", key: "location", value: "UAE" },
        { id: "f5", key: "tagline", value: "Bridging operational planning controls with state-of-the-art data pipelines" },
      ],
    },
    {
      id: "s2", title: "Core Skills", icon: "⚡",
      fields: [
        { id: "f6", key: "planning_tools", value: "Primavera P6, Microsoft Project" },
        { id: "f7", key: "data_platform", value: "Microsoft Fabric, Synapse Spark, Delta Lake" },
        { id: "f8", key: "database", value: "SQL Server query optimization, partitioning, indexing" },
        { id: "f9", key: "ai_ml", value: "Python, LangChain, Gemini API, LLMs" },
        { id: "f10", key: "visualization", value: "Power BI, DirectLake semantic models, DENEB" },
      ],
    },
    {
      id: "s3", title: "Featured Projects", icon: "🚀",
      fields: [
        { id: "f11", key: "project_1", value: "Enterprise Fabric Data Lakehouse — End-to-end operational analytics in Microsoft Fabric using Synapse Spark pipelines, Delta tables, DirectLake Power BI reports." },
        { id: "f12", key: "project_2", value: "AI-Powered Primavera P6 Audit Automation — Python + LangChain + Gemini API to auto-audit P6 schedules and generate risk assessments." },
        { id: "f13", key: "project_3", value: "Database Architecture & Query Optimization — Optimized high-throughput SQL Server schemas, improved response times by 65%." },
      ],
    },
    {
      id: "s4", title: "Contact & Socials", icon: "📬",
      fields: [
        { id: "f14", key: "email", value: "karthikakhil.ae@gmail.com" },
        { id: "f15", key: "linkedin", value: "linkedin.com/in/akhilkarthikk" },
        { id: "f16", key: "github", value: "github.com/akhilkarthik" },
        { id: "f17", key: "response_time", value: "Usually replies within 24-48 hours" },
      ],
    },
    {
      id: "s5", title: "Assistant Personality", icon: "🤖",
      fields: [
        { id: "f18", key: "assistant_name", value: "Laura" },
        { id: "f19", key: "tone", value: "Warm, enthusiastic, conversational. Short punchy sentences. Always end with a follow-up question." },
        { id: "f20", key: "greeting", value: "Hi there! I'm Laura, Akhil's digital assistant. How can I help you explore his work today?" },
        { id: "f21", key: "fallback", value: "That's a bit outside my knowledge! But I can tell you about Akhil's database work or Microsoft Fabric projects. What interests you?" },
      ],
    },
  ],
};

// ─── Helpers ─────────────────────────────────────────────────
function uid() {
  return "id_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function loadDB(): KnowledgeDB {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return JSON.parse(JSON.stringify(DEFAULT_DB));
}

function saveDB(db: KnowledgeDB) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...db, lastSaved: new Date().toISOString() }));
  } catch (_) {}
}

export function buildKnowledgeObject(db: KnowledgeDB): Record<string, Record<string, string>> {
  const obj: Record<string, Record<string, string>> = {};
  db.sections.forEach((s) => {
    obj[s.title] = {};
    s.fields.forEach((f) => {
      if (f.key.trim() && f.value.trim()) obj[s.title][f.key] = f.value;
    });
  });
  return obj;
}

export function buildSystemPrompt(db: KnowledgeDB): string {
  const k = buildKnowledgeObject(db);
  const personality = k["Assistant Personality"] || {};
  let prompt = `You are "${personality.assistant_name || "Laura"}", a digital assistant for a portfolio website.\n\n`;
  prompt += `TONE: ${personality.tone || "Warm, enthusiastic, and conversational."}\n\n`;
  prompt += `YOUR KNOWLEDGE BASE:\n`;
  Object.entries(k).forEach(([section, fields]) => {
    if (section === "Assistant Personality") return;
    prompt += `\n[${section}]\n`;
    Object.entries(fields).forEach(([key, val]) => {
      prompt += `${key}: ${val}\n`;
    });
  });
  prompt += `\nKeep responses brief (2-4 sentences). Always end with a relevant follow-up question.`;
  prompt += `\nFallback for unknown questions: "${personality.fallback || "I'm not sure about that, but I can help with something else!"}"`;
  return prompt;
}

// ─── Component ───────────────────────────────────────────────
export default function KnowledgeBase() {
  const [db, setDB] = useState<KnowledgeDB>(loadDB);
  const [activeId, setActiveId] = useState<string>(DEFAULT_DB.sections[0].id);
  const [isDirty, setIsDirty] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [showJSON, setShowJSON] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-save on change after 2s
  useEffect(() => {
    if (!isDirty) return;
    const t = setTimeout(() => {
      saveDB(db);
      setIsDirty(false);
      showToast("Auto-saved", "success");
    }, 2000);
    return () => clearTimeout(t);
  }, [db, isDirty]);

  function showToast(msg: string, type: "success" | "error" = "success") {
    clearTimeout(toastTimer.current);
    setToast({ msg, type });
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  }

  function mutate(updater: (draft: KnowledgeDB) => void) {
    setDB((prev) => {
      const next = JSON.parse(JSON.stringify(prev)) as KnowledgeDB;
      updater(next);
      return next;
    });
    setIsDirty(true);
  }

  const activeSection = db.sections.find((s) => s.id === activeId) ?? db.sections[0];

  // Section actions
  function addSection() {
    const id = uid();
    mutate((d) => {
      d.sections.push({ id, title: "New Section", icon: SECTION_ICONS[d.sections.length % SECTION_ICONS.length], fields: [] });
    });
    setActiveId(id);
  }

  function deleteSection(id: string) {
    if (db.sections.length <= 1) { showToast("Keep at least one section", "error"); return; }
    mutate((d) => { d.sections = d.sections.filter((s) => s.id !== id); });
    setActiveId(db.sections.find((s) => s.id !== id)?.id ?? db.sections[0].id);
  }

  function updateSectionTitle(id: string, title: string) {
    mutate((d) => { const s = d.sections.find((s) => s.id === id); if (s) s.title = title; });
  }

  // Field actions
  function addField() {
    mutate((d) => {
      const s = d.sections.find((s) => s.id === activeId);
      if (s) s.fields.push({ id: uid(), key: "new_field", value: "" });
    });
  }

  function updateField(fid: string, prop: "key" | "value", val: string) {
    mutate((d) => {
      const s = d.sections.find((s) => s.id === activeId);
      const f = s?.fields.find((f) => f.id === fid);
      if (f) f[prop] = val;
    });
  }

  function deleteField(fid: string) {
    mutate((d) => {
      const s = d.sections.find((s) => s.id === activeId);
      if (s) s.fields = s.fields.filter((f) => f.id !== fid);
    });
  }

  function saveNow() {
    saveDB(db);
    setIsDirty(false);
    showToast("Knowledge base saved & synced ✓", "success");
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify(buildKnowledgeObject(db), null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "laura_knowledge.json";
    a.click();
    showToast("Exported laura_knowledge.json", "success");
  }

  function copyPrompt() {
    navigator.clipboard.writeText(buildSystemPrompt(db)).then(() => showToast("System prompt copied!", "success"));
  }

  const knowledgeJSON = JSON.stringify(buildKnowledgeObject(db), null, 2);

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* ── Top bar ── */}
      <div className="sticky top-0 z-50 bg-bg/90 backdrop-blur-md border-b border-line">
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-ink rounded-lg flex items-center justify-center">
              <Database className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-ink font-display">Laura · Knowledge Base</p>
              <p className="text-[10px] text-muted font-mono">
                {isDirty ? "Unsaved changes…" : db.lastSaved
                  ? `Last saved ${new Date(db.lastSaved).toLocaleTimeString()}`
                  : "Ready"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className={`w-2 h-2 rounded-full ${isDirty ? "bg-amber-400" : "bg-green-500"}`}
              animate={{ scale: isDirty ? [1, 1.4, 1] : 1 }}
              transition={{ repeat: isDirty ? Infinity : 0, duration: 1.2 }}
            />
            <button onClick={() => setShowJSON(!showJSON)}
              className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider border border-line rounded-full hover:bg-ink hover:text-white transition-all">
              {showJSON ? "Editor" : "JSON Preview"}
            </button>
            <button onClick={copyPrompt}
              className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider border border-line rounded-full hover:bg-ink hover:text-white transition-all flex items-center gap-1.5">
              <Copy className="w-3 h-3" /> Copy Prompt
            </button>
            <button onClick={exportJSON}
              className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider border border-line rounded-full hover:bg-ink hover:text-white transition-all flex items-center gap-1.5">
              <Download className="w-3 h-3" /> Export
            </button>
            <button onClick={saveNow}
              className="px-5 py-2 text-[11px] font-bold uppercase tracking-wider bg-ink text-white rounded-full hover:bg-ink/80 transition-all flex items-center gap-1.5">
              <Save className="w-3 h-3" /> Save & Sync
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden max-w-screen-xl mx-auto w-full">
        {/* ── Sidebar ── */}
        <aside className="w-64 border-r border-line flex flex-col py-4 overflow-y-auto">
          <p className="px-5 pb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-muted">Sections</p>
          <div className="flex-1 px-3 space-y-1">
            {db.sections.map((sec) => (
              <motion.button key={sec.id} layout
                onClick={() => setActiveId(sec.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all group ${
                  sec.id === activeId ? "bg-ink text-white" : "hover:bg-line/40 text-ink"
                }`}>
                <span className="text-base">{sec.icon}</span>
                <span className="text-[13px] font-semibold flex-1 truncate">{sec.title}</span>
                <span className={`text-[10px] font-mono ${sec.id === activeId ? "text-white/50" : "text-muted"}`}>
                  {sec.fields.length}
                </span>
              </motion.button>
            ))}
          </div>
          <div className="px-3 pt-3 border-t border-line mt-3">
            <button onClick={addSection}
              className="w-full py-2.5 border border-dashed border-line rounded-xl text-[12px] font-bold text-muted hover:border-ink hover:text-ink transition-all flex items-center justify-center gap-1.5">
              <Plus className="w-3.5 h-3.5" /> New Section
            </button>
          </div>
        </aside>

        {/* ── Main Editor / JSON ── */}
        <main className="flex-1 overflow-y-auto">
          {showJSON ? (
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted">Generated Knowledge Object</p>
                <div className="flex items-center gap-2 text-[10px] font-mono text-muted">
                  <Sparkles className="w-3 h-3" />
                  This is what Laura reads
                </div>
              </div>
              <pre className="bg-ink text-green-400 font-mono text-xs leading-relaxed p-6 rounded-2xl overflow-x-auto whitespace-pre-wrap">
                {knowledgeJSON}
              </pre>
              <div className="mt-6">
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted mb-3">System Prompt Preview</p>
                <pre className="bg-white border border-line font-mono text-[11px] leading-relaxed p-6 rounded-2xl overflow-x-auto whitespace-pre-wrap text-ink/80">
                  {buildSystemPrompt(db)}
                </pre>
              </div>
            </div>
          ) : (
            <div className="p-8">
              {/* Section header */}
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-line">
                <div className="text-3xl">{activeSection?.icon}</div>
                <div className="flex-1">
                  <input
                    className="font-display text-2xl font-bold bg-transparent border-none outline-none text-ink w-full"
                    value={activeSection?.title ?? ""}
                    onChange={(e) => updateSectionTitle(activeId, e.target.value)}
                    placeholder="Section name…"
                  />
                  <p className="text-[11px] text-muted mt-0.5 font-mono">{activeSection?.fields.length} fields · auto-saved</p>
                </div>
                <button onClick={() => deleteSection(activeId)}
                  className="p-2 rounded-lg hover:bg-red-50 hover:text-red-500 text-muted transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Fields */}
              <div className="space-y-3">
                <AnimatePresence initial={false}>
                  {activeSection?.fields.map((field) => (
                    <motion.div key={field.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-white border border-line rounded-xl overflow-hidden focus-within:border-ink/40 transition-colors">
                      {/* Field key row */}
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-bg border-b border-line">
                        <ChevronRight className="w-3 h-3 text-muted flex-shrink-0" />
                        <input
                          className="font-mono text-[12px] font-medium text-ink/70 flex-1 bg-transparent outline-none"
                          value={field.key}
                          onChange={(e) => updateField(field.id, "key", e.target.value)}
                          placeholder="field_name"
                        />
                        <span className="text-[9px] font-mono text-muted bg-line/60 px-2 py-0.5 rounded-full">string</span>
                        <button onClick={() => deleteField(field.id)}
                          className="w-5 h-5 flex items-center justify-center rounded text-muted hover:text-red-500 hover:bg-red-50 transition-all">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                      {/* Field value */}
                      <textarea
                        className="w-full px-4 py-3 font-mono text-[12.5px] leading-relaxed text-ink bg-transparent outline-none resize-none"
                        rows={2}
                        value={field.value}
                        onChange={(e) => {
                          updateField(field.id, "value", e.target.value);
                          e.target.style.height = "auto";
                          e.target.style.height = Math.max(56, e.target.scrollHeight) + "px";
                        }}
                        placeholder="Enter value…"
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Add field */}
                <motion.button onClick={addField} layout
                  className="w-full py-3 border border-dashed border-line rounded-xl text-[12px] font-bold text-muted hover:border-ink hover:text-ink transition-all flex items-center justify-center gap-2">
                  <Plus className="w-3.5 h-3.5" /> Add Field
                </motion.button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ── Toast ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-3 rounded-full text-[12px] font-bold uppercase tracking-wider shadow-xl z-50 ${
              toast.type === "success" ? "bg-ink text-white" : "bg-red-600 text-white"
            }`}>
            {toast.type === "success" ? <Check className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
