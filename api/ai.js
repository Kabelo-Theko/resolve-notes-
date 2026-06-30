// resolve-notes — AI serverless harness (Vercel function). Tasks:
//   "article" (default): from issue / tried / fixed -> structured KB article
//   "thread": from a pasted email/chat thread -> the same structured KB article
// Model toggle: flash (default) / pro / minimax. One NVIDIA_API_KEY powers all.

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
async function callModel(cfg, key, messages, max_tokens, temperature) {
  const payload = { model: cfg.id, messages, max_tokens, temperature, top_p: 0.95, stream: false, ...cfg.extra };
  const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 55000);
  try {
    const r = await fetch(ENDPOINT, { method: "POST", headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" }, body: JSON.stringify(payload), signal: ctrl.signal });
    clearTimeout(to);
    if (!r.ok) return { error: "upstream " + r.status };
    const d = await r.json();
    return { text: (d.choices?.[0]?.message?.content || "").trim() };
  } catch (e) { clearTimeout(to); return { error: "request failed" }; }
}
const SHAPE = `{"title":"<short specific title>","symptoms":"<what the user saw, 1-2 sentences>","root_cause":"<the actual cause, 1-2 sentences>","fix_steps":["<step>","<step>"],"prevention":"<one sentence>","tags":["<lowercase-tag>"]}`;
const SYS_ARTICLE = `You are a senior IT support engineer writing a concise internal knowledge base article from a resolved ticket. Respond ONLY with compact JSON:
${SHAPE}
Be factual and concise. No fluff, no marketing words, no em dashes. 3 to 6 fix_steps, 3 to 6 tags.`;
const SYS_THREAD = `You are a senior IT support engineer. From the support conversation below (an email or chat thread), infer the issue the user reported, what was tried, and what finally resolved it, then write a knowledge base article. Respond ONLY with compact JSON:
${SHAPE}
Base it only on the thread. Be factual and concise. No fluff, no em dashes. 3 to 6 fix_steps, 3 to 6 tags.`;

function shape(j, cfgId) {
  return {
    title: j.title || "Untitled article", symptoms: j.symptoms || "", root_cause: j.root_cause || "",
    fix_steps: Array.isArray(j.fix_steps) ? j.fix_steps : [], prevention: j.prevention || "",
    tags: Array.isArray(j.tags) ? j.tags : [], model: cfgId,
  };
}

module.exports = async (req, res) => {
  if (req.method !== "POST") { res.status(405).json({ error: "POST only" }); return; }
  const body = await readBody(req);
  const cfg = cfgFor(body.model);
  const key = keyFor(cfg);
  if (!key) { res.status(503).json({ error: "AI backend not configured" }); return; }

  if (body.task === "thread") {
    const thread = (body.thread || "").toString().slice(0, 4000).trim();
    if (!thread) { res.status(400).json({ error: "no thread" }); return; }
    const out = await callModel(cfg, key, [{ role: "system", content: SYS_THREAD }, { role: "user", content: thread }], 800, 0.3);
    if (out.error) { res.status(502).json({ error: out.error }); return; }
    const j = jsonFrom(out.text); if (!j) { res.status(502).json({ error: "could not parse model output" }); return; }
    res.status(200).json(shape(j, cfg.id));
    return;
  }
  // default: article from structured fields
  const issue = (body.issue || "").toString().slice(0, 600).trim();
  const tried = (body.tried || "").toString().slice(0, 600).trim();
  const fixed = (body.fixed || "").toString().slice(0, 600).trim();
  const category = (body.category || "").toString().slice(0, 60).trim();
  if (!issue && !fixed) { res.status(400).json({ error: "need at least the issue and the fix" }); return; }
  const user = `Category: ${category}\nIssue reported: ${issue}\nWhat was tried: ${tried}\nWhat fixed it: ${fixed}`;
  const out = await callModel(cfg, key, [{ role: "system", content: SYS_ARTICLE }, { role: "user", content: user }], 800, 0.3);
  if (out.error) { res.status(502).json({ error: out.error }); return; }
  const j = jsonFrom(out.text); if (!j) { res.status(502).json({ error: "could not parse model output" }); return; }
  res.status(200).json(shape(j, cfg.id));
};
