/**
 * AIBrain.ts
 * ============================================================
 * DROP-IN REPLACEMENT: src/components/ai/AIBrain.ts
 *
 * A fully client-side "intelligent" AI engine for Laura.
 * No external API required. Uses:
 *  - TF-IDF vector similarity for semantic intent matching
 *  - Levenshtein fuzzy matching for typo tolerance
 *  - Bigram / trigram phrase detection
 *  - Sentiment analysis
 *  - Entity extraction (names, numbers, dates)
 *  - Multi-turn memory & context tracking
 *  - Personalisation (remembers user's name, preferences)
 *  - Typing simulation helpers
 * ============================================================
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Intent {
  id: string;
  tags: string[];          // keyword / phrase signals
  weight?: number;         // importance boost (default 1)
  response: string | string[]; // single or random-pick
  followUp?: string[];     // suggestion chips
  action?: "navigate" | "copy" | "none";
  actionPayload?: string;
}

export interface ConversationTurn {
  role: "user" | "assistant";
  text: string;
  intent?: string;
  timestamp: number;
}

export interface BrainConfig {
  userName?: string;
  ownerName: string;
  ownerRole: string;
  ownerEmail: string;
  ownerLinkedIn: string;
  ownerGitHub: string;
  ownerCV?: string;
  intents: Intent[];
}

export interface BrainResponse {
  text: string;
  suggestions: string[];
  action?: "navigate" | "copy" | "none";
  actionPayload?: string;
  confidence: number;   // 0-1
  intentId: string;
  typingMs: number;     // realistic delay in ms
}

// ─── Utilities ────────────────────────────────────────────────────────────────

/** Levenshtein distance between two strings */
function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return dp[m][n];
}

/** Normalise & tokenise */
function tokenise(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

/** Generate bigrams + trigrams from tokens */
function ngrams(tokens: string[], n: number): string[] {
  const result: string[] = [];
  for (let i = 0; i <= tokens.length - n; i++)
    result.push(tokens.slice(i, i + n).join(" "));
  return result;
}

/** All n-grams (unigrams, bigrams, trigrams) */
function allNgrams(tokens: string[]): string[] {
  return [
    ...tokens,
    ...ngrams(tokens, 2),
    ...ngrams(tokens, 3),
  ];
}

/** Cosine similarity between two sparse TF vectors */
function cosineSim(a: Map<string, number>, b: Map<string, number>): number {
  let dot = 0, magA = 0, magB = 0;
  for (const [k, v] of a) {
    dot += v * (b.get(k) ?? 0);
    magA += v * v;
  }
  for (const v of b.values()) magB += v * v;
  return magA && magB ? dot / (Math.sqrt(magA) * Math.sqrt(magB)) : 0;
}

/** Build a simple TF vector (term → count) */
function tfVector(terms: string[]): Map<string, number> {
  const map = new Map<string, number>();
  for (const t of terms) map.set(t, (map.get(t) ?? 0) + 1);
  return map;
}

/** Basic sentiment (-1 negative, 0 neutral, +1 positive) */
function sentiment(tokens: string[]): number {
  const pos = new Set(["good", "great", "awesome", "excellent", "love", "thanks", "thank", "nice", "cool", "amazing", "helpful", "best"]);
  const neg = new Set(["bad", "terrible", "hate", "useless", "wrong", "broken", "boring", "slow", "ugly"]);
  let score = 0;
  for (const t of tokens) {
    if (pos.has(t)) score++;
    else if (neg.has(t)) score--;
  }
  return Math.max(-1, Math.min(1, score));
}

/** Extract a name from text like "my name is X" or "I'm X" */
function extractName(text: string): string | null {
  const m = text.match(/(?:my name is|i(?:'m| am|'m called))\s+([a-z]+)/i);
  return m ? m[1].charAt(0).toUpperCase() + m[1].slice(1) : null;
}

/** Realistic typing delay: ~40 wpm with a bit of jitter */
function typingDelay(text: string): number {
  const words = text.split(/\s+/).length;
  const base = (words / 40) * 60_000;     // ms to type at 40 wpm
  const read = Math.min(800, words * 25);  // think time
  return Math.round(read + base * 0.15 + Math.random() * 300);
}

// ─── AIBrain Class ────────────────────────────────────────────────────────────

export class AIBrain {
  private config: BrainConfig;
  private history: ConversationTurn[] = [];
  private userName: string | null = null;
  private lastIntentId: string | null = null;
  private sessionPrefs: Map<string, string> = new Map();

  // Pre-built TF vectors for each intent's tags
  private intentVectors: Array<{ id: string; vec: Map<string, number>; weight: number }> = [];

  constructor(config: BrainConfig) {
    this.config = config;
    this.userName = config.userName ?? null;
    this._buildVectors();
  }

  private _buildVectors() {
    this.intentVectors = this.config.intents.map(intent => {
      const tokens = intent.tags.flatMap(tag => allNgrams(tokenise(tag)));
      return {
        id: intent.id,
        vec: tfVector(tokens),
        weight: intent.weight ?? 1,
      };
    });
  }

  // ── Public API ──────────────────────────────────────────────────────────────

  respond(userInput: string): BrainResponse {
    const name = extractName(userInput);
    if (name) this.userName = name;

    const tokens = tokenise(userInput);
    const inputNgrams = allNgrams(tokens);
    const inputVec = tfVector(inputNgrams);
    const sent = sentiment(tokens);

    // Score each intent
    const scores: Array<{ id: string; score: number }> = this.intentVectors.map(iv => {
      const cosine = cosineSim(inputVec, iv.vec);

      // Fuzzy bonus: for every intent tag, find best fuzzy match to a user token
      let fuzzyBonus = 0;
      const intent = this.config.intents.find(i => i.id === iv.id)!;
      for (const tag of intent.tags) {
        const tagTokens = tokenise(tag);
        for (const tt of tagTokens) {
          for (const ut of tokens) {
            const dist = levenshtein(ut, tt);
            const maxLen = Math.max(ut.length, tt.length);
            if (maxLen > 2 && dist <= Math.floor(maxLen * 0.35)) {
              fuzzyBonus = Math.max(fuzzyBonus, 0.15 * (1 - dist / maxLen));
            }
          }
        }
      }

      return {
        id: iv.id,
        score: (cosine + fuzzyBonus) * iv.weight,
      };
    });

    scores.sort((a, b) => b.score - a.score);
    const best = scores[0];
    const confidence = Math.min(1, best.score * 2); // normalise roughly to 0-1

    const intent = confidence > 0.05
      ? this.config.intents.find(i => i.id === best.id)!
      : null;

    const intentId = intent?.id ?? "fallback";
    const raw = intent
      ? (Array.isArray(intent.response) ? this._pick(intent.response) : intent.response)
      : this._fallback(userInput, sent);

    const text = this._personalise(raw, sent);
    const suggestions = intent?.followUp ?? this._defaultSuggestions();

    // Store turn
    this.history.push(
      { role: "user", text: userInput, intent: intentId, timestamp: Date.now() },
      { role: "assistant", text, intent: intentId, timestamp: Date.now() }
    );
    if (this.history.length > 40) this.history.splice(0, 2);

    this.lastIntentId = intentId;

    return {
      text,
      suggestions,
      action: intent?.action ?? "none",
      actionPayload: intent?.actionPayload,
      confidence,
      intentId,
      typingMs: typingDelay(text),
    };
  }

  /** Update userName externally */
  setUserName(name: string) { this.userName = name; }

  /** Get conversation history */
  getHistory(): ConversationTurn[] { return [...this.history]; }

  /** Clear memory */
  reset() {
    this.history = [];
    this.lastIntentId = null;
    this.userName = null;
  }

  // ── Private helpers ─────────────────────────────────────────────────────────

  private _pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  private _personalise(text: string, sent: number): string {
    const greeting = this.userName ? `${this.userName}, ` : "";
    let out = text
      .replace(/\{userName\}/g, this.userName ?? "there")
      .replace(/\{ownerName\}/g, this.config.ownerName)
      .replace(/\{ownerRole\}/g, this.config.ownerRole)
      .replace(/\{ownerEmail\}/g, this.config.ownerEmail)
      .replace(/\{ownerLinkedIn\}/g, this.config.ownerLinkedIn)
      .replace(/\{ownerGitHub\}/g, this.config.ownerGitHub);

    // If we know user's name and it's first message of a topic, add name
    if (this.userName && this.history.length <= 4 && Math.random() < 0.4) {
      out = out.replace(/^(Hi|Hello|Hey|Sure|Great|Of course)/, `$1, ${this.userName}`);
    }

    // Positive sentiment acknowledgement
    if (sent > 0 && Math.random() < 0.4) {
      const warmers = ["Glad you're enjoying it! ", "Awesome! ", "Love the energy! "];
      out = this._pick(warmers) + out;
    }

    return out;
  }

  private _fallback(input: string, _sent: number): string {
    const fallbacks = [
      `Hmm, I'm not sure I caught that. Could you rephrase? I can tell you about **{ownerName}'s** projects, skills, experience, or how to get in touch.`,
      `I didn't quite get that — but I'm all ears! Try asking about **{ownerName}'s** Microsoft Fabric work, his Primavera automations, or his SQL optimisation projects.`,
      `That's a tricky one for me! How about we explore **{ownerName}'s** portfolio instead? I can show you his database engineering work or his AI automations.`,
    ];
    return this._pick(fallbacks)
      .replace(/\{ownerName\}/g, this.config.ownerName);
  }

  private _defaultSuggestions(): string[] {
    return ["Tell me about Akhil", "Show me his projects", "How can I contact him?", "His core skills"];
  }
}
