#!/usr/bin/env node
// Reads yesterday's Claude Code session logs, scrubs names/businesses,
// asks Claude to summarize, writes public/activity/yesterday.json.

import { readdir, readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(__dirname);
const PROJECTS_DIR = `${process.env.HOME}/.claude/projects`;
const OUT_PATH = join(ROOT, 'public/activity/yesterday.json');

// Yesterday in America/New_York, returned as UTC bounds.
function yesterdayBoundsUTC() {
  const now = new Date();
  const ny = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const offsetMs = now.getTime() - ny.getTime();
  const startNY = new Date(ny);
  startNY.setHours(0, 0, 0, 0);
  startNY.setDate(startNY.getDate() - 1);
  const endNY = new Date(startNY);
  endNY.setDate(endNY.getDate() + 1);
  return {
    start: new Date(startNY.getTime() + offsetMs),
    end: new Date(endNY.getTime() + offsetMs),
    label: startNY.toISOString().slice(0, 10),
  };
}

async function* walkJsonl(dir) {
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); }
  catch { return; }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) { yield* walkJsonl(p); continue; }
    if (e.isFile() && e.name.endsWith('.jsonl')) yield p;
  }
}

function extractUserText(msg) {
  if (!msg) return null;
  const c = msg.content;
  if (typeof c === 'string') return c;
  if (Array.isArray(c)) {
    for (const it of c) {
      if (it && it.type === 'text' && typeof it.text === 'string') return it.text;
    }
  }
  return null;
}

function isInjectedReminder(text) {
  if (!text) return true;
  const t = text.trim();
  if (t.startsWith('<system-reminder>')) return true;
  if (t.startsWith('<command-name>')) return true;
  if (t.startsWith('<command-message>')) return true;
  if (t.startsWith('Caveat:')) return true;
  if (t.startsWith('<local-command-stdout>')) return true;
  return false;
}

async function collectYesterday() {
  const { start, end, label } = yesterdayBoundsUTC();
  const prompts = [];
  let inputTokens = 0, outputTokens = 0, cacheCreate = 0, cacheRead = 0;
  // Per-session windows summed = "agent-hours" (parallel sessions counted in parallel).
  const sessionWindows = new Map(); // sessionId -> { first, last }

  for await (const file of walkJsonl(PROJECTS_DIR)) {
    let raw;
    try { raw = await readFile(file, 'utf8'); } catch { continue; }
    for (const line of raw.split('\n')) {
      if (!line) continue;
      let obj;
      try { obj = JSON.parse(line); } catch { continue; }
      const ts = obj.timestamp ? new Date(obj.timestamp) : null;
      if (!ts || ts < start || ts >= end) continue;

      const sid = obj.sessionId || file;
      const w = sessionWindows.get(sid);
      if (!w) sessionWindows.set(sid, { first: ts.getTime(), last: ts.getTime() });
      else {
        if (ts.getTime() < w.first) w.first = ts.getTime();
        if (ts.getTime() > w.last) w.last = ts.getTime();
      }

      if (obj.type === 'user') {
        const text = extractUserText(obj.message);
        if (text && !isInjectedReminder(text)) prompts.push(text);
      } else if (obj.type === 'assistant') {
        const u = obj.message?.usage;
        if (u) {
          inputTokens += u.input_tokens || 0;
          outputTokens += u.output_tokens || 0;
          cacheCreate += u.cache_creation_input_tokens || 0;
          cacheRead += u.cache_read_input_tokens || 0;
        }
      }
    }
  }

  // Sum each session's wall-clock span, capped at 14h to discard idle-then-resume sessions.
  let agentHoursMs = 0;
  for (const w of sessionWindows.values()) {
    const span = Math.min(w.last - w.first, 14 * 3600 * 1000);
    agentHoursMs += span;
  }

  return {
    label,
    prompts,
    metrics: {
      prompts: prompts.length,
      hours: +(agentHoursMs / 3600000).toFixed(1),
      tokens: inputTokens + outputTokens + cacheCreate + cacheRead,
    },
  };
}

function getApiKey() {
  if (process.env.ANTHROPIC_API_KEY) return process.env.ANTHROPIC_API_KEY;
  try {
    return execSync(
      `security find-generic-password -s "anthropic" -a "api-key" -w`,
      { encoding: 'utf8' }
    ).trim();
  } catch {
    throw new Error('ANTHROPIC_API_KEY not found in env or Keychain');
  }
}

async function summarize(prompts) {
  if (prompts.length === 0) {
    return 'Quiet day — no logged sessions.';
  }
  // Cap to last ~120 prompts to keep request small.
  const sample = prompts.slice(-120).map(p => p.slice(0, 600)).join('\n---\n');

  const system = `You write a 2-3 sentence summary of what a designer/developer worked on yesterday based on his prompts to Claude Code. Strict rules:
- Never use proper nouns: no person names, no business names, no client names, no brand names, no specific project codenames (no "MIDDLEMAN", "Erie Carbonic", "Andy's", "Sea Cave", "TechxRev", "First Day", etc).
- Convert specifics to generic categories: "a CO2 supplier site" not "Erie Carbonic"; "a portfolio resume page" not "Resume.tsx"; "a tattoo shop pitch" not the shop name.
- No dollar figures, no client counts that could identify clients, no email or handles.
- Use active verbs and present-perfect tense ("Shipped", "Refactored", "Wired up").
- Tone: dry, factual, builder-log. No marketing fluff.
- Output is 2-3 sentences max. No preamble, no list, no "Yesterday I..." opener — just the sentences.`;

  const body = {
    model: 'claude-sonnet-4-6',
    max_tokens: 400,
    system,
    messages: [{ role: 'user', content: sample }],
  };

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': getApiKey(),
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Anthropic API ${res.status}: ${await res.text()}`);
  const json = await res.json();
  const text = json.content?.[0]?.text?.trim();
  if (!text) throw new Error('No summary text in API response');
  return text;
}

async function main() {
  const data = await collectYesterday();
  const summary = await summarize(data.prompts);
  const out = {
    date: data.label,
    summary,
    prompts: data.metrics.prompts,
    hours: data.metrics.hours,
    tokens: data.metrics.tokens,
    generatedAt: new Date().toISOString(),
  };
  await mkdir(dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, JSON.stringify(out, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${OUT_PATH}`);
  console.log(out);
}

main().catch(err => { console.error(err); process.exit(1); });
