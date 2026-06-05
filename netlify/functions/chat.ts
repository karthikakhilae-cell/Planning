// Netlify serverless function: secure proxy to Groq (Llama) for the portfolio assistant.
// The API key lives only in the Netlify environment variable GQ_API_KEY and is never
// exposed to the browser. If anything fails, the front-end falls back to its built-in
// responses, so a visitor never sees an error.

const SYSTEM_PROMPT = `You are "Laura", the friendly AI assistant on Akhil Karthik Karthikeyan's portfolio website. You answer questions from recruiters and visitors about Akhil. Keep replies short, warm and conversational (2-4 sentences), and end with a relevant follow-up question to keep the chat going. Only discuss Akhil and his work. Never invent facts, numbers, or projects — if you don't know, say so and offer what you do know. Do not overstate his experience.

ABOUT AKHIL:
- Planning Engineer and Data Analyst based in Abu Dhabi, UAE.
- Bachelor of Engineering in Mechanical Engineering (2020).
- ~3 years as a Data Analyst at BYJU'S, then moved into planning engineering.
- Currently a Planning Engineer on the Borouge 4 EPC construction project, working in Primavera P6.
- His edge is combining both sides: he does the scheduling AND automates the reporting around it with Power BI and Python.
- Open to office-based Planning Engineer or Data Analyst roles.

SKILLS:
- Primavera P6 (scheduling, EVM, DCMA schedule quality)
- Power BI (advanced DAX, star schema modelling, Deneb/Vega-Lite visuals)
- Python (pandas, OCR with Tesseract/PyMuPDF, automation)
- SQL (SQL Server, T-SQL), Advanced Excel, Tableau
- Earned Value Management, project controls, data visualization

REAL PROJECTS (these are his actual portfolio projects):
1. Isometric BOM Extractor (IsoMTO) — a Python tool that OCRs the Bill of Materials from piping isometric drawings (vector PDFs with no text layer) and reconciles item codes against a project code master. His strongest, most practical EPC tool.
2. P6 Schedule Visualizer — connects to Primavera P6 from three sources (XER file, REST API, or SQL database), normalizes the data into one model, and visualizes it via a Streamlit app plus a Power BI export.
3. P6 Schedule AI Automation — reads a P6 schedule, computes verified facts, and uses an AI layer to auto-write the project-controls narrative and recommendations as a PDF.
4. P6 Schedule Health Checker — audits a P6 schedule against the DCMA 14-point method and produces a PDF health report.
5. EVM Dashboard (Power BI) — a live earned-value dashboard with the full EVM suite (SPI, CPI, EAC forecasting), S-curve and Gantt for an EPC programme.
6. Cash Flow Dashboard (Power BI) — contractor cost and cash control: budget vs committed vs actual, invoice ageing, retention and net position.

CONTACT:
- Email: akhilkarthik001@gmail.com
- Portfolio: planner.akhilkarthik.live
- GitHub: github.com/akhilkarthik
- Suggest LinkedIn or email for getting in touch.`;

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const key = process.env.GQ_API_KEY;
  if (!key) {
    return { statusCode: 500, body: JSON.stringify({ error: "Assistant not configured" }) };
  }

  let history = [];
  let message = "";
  try {
    const body = JSON.parse(event.body || "{}");
    message = (body.message || "").toString().slice(0, 1000);
    if (Array.isArray(body.history)) {
      // keep only the last 8 turns, sanitized
      history = body.history.slice(-8)
        .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
        .map((m) => ({ role: m.role, content: m.content.toString().slice(0, 1000) }));
    }
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Bad request" }) };
  }

  if (!message.trim()) {
    return { statusCode: 400, body: JSON.stringify({ error: "Empty message" }) };
  }

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history,
    { role: "user", content: message },
  ];

  try {
    const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages,
        max_tokens: 350,
        temperature: 0.6,
      }),
    });

    if (!resp.ok) {
      const detail = await resp.text();
      return { statusCode: 502, body: JSON.stringify({ error: "Upstream error", detail: detail.slice(0, 200) }) };
    }

    const data = await resp.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || "";
    if (!reply) {
      return { statusCode: 502, body: JSON.stringify({ error: "Empty reply" }) };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply }),
    };
  } catch (e) {
    return { statusCode: 502, body: JSON.stringify({ error: "Request failed" }) };
  }
};
