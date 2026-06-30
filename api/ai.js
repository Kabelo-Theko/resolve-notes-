// resolve-notes — KB-article generator (Vercel serverless function).
// Model can be toggled per request: "flash" (DeepSeek v4 Flash, default),
// "pro" (DeepSeek v4 Pro), or "minimax" (MiniMax M3). One NVIDIA_API_KEY env var
// powers all three; optional per-model overrides (NVIDIA_API_KEY_PRO, etc.).
// The key lives ONLY in the environment, never in the repo or the client.

const ENDPOINT = "https://integrate.api.nvidia.com/v1/chat/completions";
const MODELS = {
  flash:   { id: "deepseek-ai/deepseek-v4-flash", keys: ["NVIDIA_API_KEY_FLASH", "NVIDIA_API_KEY"], extra: { chat_template_kwargs: { thinking: false } } },
  pro:     { id: "deepseek-ai/deepseek-v4-pro",   keys: ["NVIDIA_API_KEY_PRO", "NVIDIA_API_KEY"],   extra: { chat_template_kwargs: { thinking: false } } },
  minimax: { id: "minimaxai/minimax-m3",          keys: ["NVIDIA_API_KEY_MINIMAX", "NVIDIA_API_KEY"], extra: {} },
};
const cfgFor = (m) => MODELS[m] || MODELS.flash;
const keyFor = (c) => { for (const e of c.keys) { if (process.env[e]) return process.env[e]; } return null; };
async function readBody(req) {
  let b = req.body;
  if (typeof b === "string") { try { b = JSON.parse(b); } catch { b = {}; } }
  if (!b) { b = await new Promise((res) => { let raw = ""; req.on("data", c => raw += c); req.on("end", () => { try { res(JSON.parse(raw || "{}")); } catch { res({}); } }); }); }
  return b || {};
}
const jsonFrom = (t) => { const m = t.match(/\{[\s\S]*\}/); if (!m) return null; try { return JSON.parse(m[0]); } catch { return null; } };

const SYSTEM = `You are a senior IT support engineer writing a concise internal knowledge base article from a resolved ticket. Respond ONLY with compact JSON:
{"title":"<short specific title>","symptoms":"<what the user saw, 1-2 sentences>","root_cause":"<the actual cause, 1-2 sentences>","fix_steps":["<step>","<step>"],"prevention":"<one sentence on preventing recurrence>","tags":["<lowercase-tag>","..."]}
Be factual and concise. No fluff, no marketing words, no em dashes. 3 to 6 fix_steps, 3 to 6 tags.`;

module.exports = async (req, res) => {
  if (req.method !== "POST") { res.status(405).json({ error: "POST only" }); return; }
  const body = await readBody(req);
  const cfg = cfgFor(body.model);
  const key = keyFor(cfg);
  if (!key) { res.status(503).json({ error: "AI backend not configured" }); return; }

  const issue = (body.issue || "").toString().slice(0, 600).trim();
  const tried = (body.tried || "").toString().slice(0, 600).trim();
  const fixed = (body.fixed || "").toString().slice(0, 600).trim();
  const category = (body.category || "").toString().slice(0, 60).trim();
  if (!issue && !fixed) { res.status(400).json({ error: "need at least the issue and the fix" }); return; }
  const user = `Category: ${category}\nIssue reported: ${issue}\nWhat was tried: ${tried}\nWhat fixed it: ${fixed}`;

  const payload = { model: cfg.id, messages: [{ role: "system", content: SYSTEM }, { role: "user", content: user }], max_tokens: 800, temperature: 0.3, top_p: 0.95, stream: false, ...cfg.extra };
  const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 55000);
  try {
    const r = await fetch(ENDPOINT, { method: "POST", headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" }, body: JSON.stringify(payload), signal: ctrl.signal });
    clearTimeout(to);
    if (!r.ok) { res.status(502).json({ error: "upstream " + r.status }); return; }
    const d = await r.json();
    const j = jsonFrom((d.choices?.[0]?.message?.content || "").trim());
    if (!j) { res.status(502).json({ error: "could not parse model output" }); return; }
    res.status(200).json({
      title: j.title || "Untitled article", symptoms: j.symptoms || "", root_cause: j.root_cause || "",
      fix_steps: Array.isArray(j.fix_steps) ? j.fix_steps : [], prevention: j.prevention || "",
      tags: Array.isArray(j.tags) ? j.tags : [], model: cfg.id,
    });
  } catch (e) { clearTimeout(to); res.status(502).json({ error: "request failed" }); }
};
