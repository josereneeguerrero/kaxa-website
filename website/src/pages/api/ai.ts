import type { APIRoute } from 'astro';

export const prerender = false;

// Proxy for the Kaxa app's AI parsing (voice + receipts). Keeps the Groq key
// server-side so it never ships inside the APK. Model and limits are fixed here.
const MODEL = 'llama-3.1-8b-instant';
const MAX_TOKENS = 500;
const MAX_CHARS = 12000;
const MAX_MESSAGES = 2;

// ponytail: per-instance in-memory limiter (best effort on serverless);
// move to Upstash/Vercel KV if abuse shows up.
const hits = new Map<string, number[]>();
const LIMIT = 20;
const WINDOW_MS = 60_000;

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const key = process.env.GROQ_API_KEY ?? import.meta.env.GROQ_API_KEY;
  if (!key) return json({ error: 'not configured' }, 500);
  if (limited(clientAddress)) return json({ error: 'rate limited' }, 429);

  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'bad request' }, 400);
  }

  const messages = body?.messages;
  const valid =
    Array.isArray(messages) &&
    messages.length > 0 &&
    messages.length <= MAX_MESSAGES &&
    messages.every(
      (m: any) =>
        (m?.role === 'system' || m?.role === 'user') && typeof m?.content === 'string',
    ) &&
    messages.reduce((n: number, m: any) => n + m.content.length, 0) <= MAX_CHARS;
  if (!valid) return json({ error: 'bad request' }, 400);

  const upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0,
      max_tokens: Math.min(Number(body.max_tokens) || MAX_TOKENS, MAX_TOKENS),
      messages: messages.map((m: any) => ({ role: m.role, content: m.content })),
    }),
  });

  return new Response(await upstream.text(), {
    status: upstream.status,
    headers: { 'content-type': 'application/json' },
  });
};
