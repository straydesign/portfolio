#!/usr/bin/env node
// Reads Claude Code session logs over multiple windows (yesterday/week/month/all-time),
// attributes each session to its dominant project via keyword scan, and writes
// per-project stats to public/activity/<period>.json. Deterministic — no LLM call.

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { gunzipSync } from 'node:zlib';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(__dirname);
const PROJECTS_DIR = `${process.env.HOME}/.claude/projects`;
const OUT_DIR = join(ROOT, 'public/activity');

// Days (America/New_York, YYYY-MM-DD) to drop from the ALL-TIME view only — for anomaly
// days that skew lifetime totals. Yesterday/Week/Month windows are left untouched.
const EXCLUDED_ALLTIME_DAYS = new Set([
  // e.g. '2026-05-12',
]);

function nyDayString(tms) {
  return new Date(tms).toLocaleDateString('en-CA', { timeZone: 'America/New_York' });
}

// Returns midnight (start of day) in America/New_York for `now`, expressed as a UTC Date.
function startOfTodayNY(now = new Date()) {
  const ny = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const offsetMs = now.getTime() - ny.getTime();
  const startNY = new Date(ny);
  startNY.setHours(0, 0, 0, 0);
  return new Date(startNY.getTime() + offsetMs);
}

function periodBounds(name) {
  const startOfToday = startOfTodayNY();
  const endOfYesterday = startOfToday;
  const startOfYesterday = new Date(endOfYesterday.getTime() - 24 * 3600 * 1000);
  const yLabel = new Date(startOfYesterday).toISOString().slice(0, 10);

  if (name === 'yesterday') {
    return { start: startOfYesterday, end: endOfYesterday, label: yLabel, span: 'yesterday' };
  }
  if (name === 'week') {
    return {
      start: new Date(endOfYesterday.getTime() - 7 * 24 * 3600 * 1000),
      end: endOfYesterday,
      label: `7 days ending ${yLabel}`,
      span: 'week',
    };
  }
  if (name === 'month') {
    return {
      start: new Date(endOfYesterday.getTime() - 30 * 24 * 3600 * 1000),
      end: endOfYesterday,
      label: `30 days ending ${yLabel}`,
      span: 'month',
    };
  }
  if (name === 'alltime') {
    const excludedNote = EXCLUDED_ALLTIME_DAYS.size ? ` (excl. ${EXCLUDED_ALLTIME_DAYS.size} anomaly day${EXCLUDED_ALLTIME_DAYS.size > 1 ? 's' : ''})` : '';
    return {
      start: new Date(0),
      end: endOfYesterday,
      label: `through ${yLabel}${excludedNote}`,
      span: 'alltime',
    };
  }
  throw new Error(`Unknown period: ${name}`);
}

// Skip subagent logs and the claude-mem observer plugin's session dir.
// These fire thousands of synthetic prompts per main-session tool call and
// don't represent prompts the user actually typed.
function isExcludedPath(p) {
  if (p.includes('/subagents/')) return true;
  if (p.includes('claude-mem-observer-sessions')) return true;
  return false;
}

async function* walkJsonl(dir) {
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); }
  catch { return; }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      if (isExcludedPath(p)) continue;
      yield* walkJsonl(p);
      continue;
    }
    if (e.isFile() && (e.name.endsWith('.jsonl') || e.name.endsWith('.jsonl.gz'))) {
      if (isExcludedPath(p)) continue;
      yield p;
    }
  }
}

async function readJsonlText(file) {
  if (file.endsWith('.gz')) {
    const buf = await readFile(file);
    return gunzipSync(buf).toString('utf8');
  }
  return readFile(file, 'utf8');
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

// Project keyword map. First match wins per prompt; session is attributed to the
// project with the most matching prompts.
const PROJECT_KEYWORDS = [
  { keys: ['erie-carbonic', 'erie carbonic', 'carbonic'], name: 'CO2 supplier pitch site' },
  { keys: ['sea-cave', 'sea cave', 'reef-lab', 'aquarium', 'saltwater'], name: 'Aquarium store website' },
  { keys: ['portfolio', 'straydesign', 'yesterdaystrip', 'generate-activity', 'generate-yesterday'], name: 'This portfolio site' },
  { keys: ["andy's", 'andys'], name: 'Bar & grill pitch site' },
  { keys: ['1000-beers', '1000 beers'], name: 'Craft beer bar pitch site' },
  { keys: ['goldcrown', 'gold crown'], name: 'Billiards bar pitch site' },
  { keys: ['bullfrog'], name: 'Neighborhood bar pitch site' },
  { keys: ['rolling-meadows', 'rolling meadows'], name: 'Bowling alley pitch site' },
  { keys: ['peach-street'], name: 'Multi-venue pitch site' },
  { keys: ['ironink', 'iron ink'], name: 'Tattoo shop pitch site' },
  { keys: ['warhorse', 'war horse'], name: 'Multi-location tattoo pitch site' },
  { keys: ['first-day', 'first day', 'firstday'], name: 'Goal-tracking app' },
  { keys: ['afraid-of-deer', 'afraid of deer', 'unreal', 'ue 5', 'ue5', 'pixelstream'], name: 'Horror video game' },
  { keys: ['stray-crm', 'stray crm'], name: 'Freelance lead tool' },
  { keys: ['straywebdesign'], name: 'Web design business site' },
  { keys: ['middleman'], name: 'Beer distribution tracker' },
  { keys: ['buzznbs', "buzz n' b", 'buzz n b', 'buzznb'], name: 'Pet shop site' },
  { keys: ['techxrev'], name: 'IT services pitch site' },
  { keys: ['stray.run', 'stray run'], name: 'Clothing brand site' },
  { keys: ['tomsesler'], name: 'Personal brand site' },
  { keys: ['racknroll', 'rack-n-roll', 'karaoke'], name: 'Karaoke bar pitch site' },
  { keys: ['greenline'], name: 'Lawn care site demo' },
  { keys: ['messenger-bot'], name: "Dad's Messenger bot" },
  { keys: ['wiki', 'megamem', 'karpathy'], name: 'Personal knowledge wiki' },
];

function classifyPrompt(text) {
  const t = text.toLowerCase();
  for (const p of PROJECT_KEYWORDS) {
    if (p.keys.some(k => t.includes(k))) return p.name;
  }
  return null;
}

// Walk every JSONL once. For each event, bucket into the periods whose window contains its
// timestamp. Track per-(period, sessionId) stats: prompts, tokens, time window, project hits.
async function collectAll(periods) {
  const buckets = new Map();
  for (const p of periods) {
    buckets.set(p.name, { meta: p, sessions: new Map() });
  }

  function ensureSession(bucket, sid) {
    let s = bucket.sessions.get(sid);
    if (!s) {
      s = {
        first: Infinity, last: -Infinity,
        prompts: 0,
        inputTokens: 0, outputTokens: 0, cacheCreate: 0, cacheRead: 0,
        projectHits: new Map(),
      };
      bucket.sessions.set(sid, s);
    }
    return s;
  }

  for await (const file of walkJsonl(PROJECTS_DIR)) {
    let raw;
    try { raw = await readJsonlText(file); } catch { continue; }
    for (const line of raw.split('\n')) {
      if (!line) continue;
      let obj;
      try { obj = JSON.parse(line); } catch { continue; }
      const ts = obj.timestamp ? new Date(obj.timestamp) : null;
      if (!ts) continue;
      const tms = ts.getTime();
      const sid = obj.sessionId || file;

      const isUser = obj.type === 'user';
      const isAssistant = obj.type === 'assistant';
      let text = null, usage = null;
      if (isUser) {
        text = extractUserText(obj.message);
        if (text && isInjectedReminder(text)) text = null;
      } else if (isAssistant) {
        usage = obj.message?.usage || null;
      }

      // Cache the NY day string lazily; only the all-time bucket needs it.
      let dayStr = null;

      for (const b of buckets.values()) {
        if (tms < b.meta.start.getTime() || tms >= b.meta.end.getTime()) continue;
        if (b.meta.span === 'alltime' && EXCLUDED_ALLTIME_DAYS.size) {
          if (dayStr === null) dayStr = nyDayString(tms);
          if (EXCLUDED_ALLTIME_DAYS.has(dayStr)) continue;
        }
        const s = ensureSession(b, sid);
        if (tms < s.first) s.first = tms;
        if (tms > s.last) s.last = tms;
        if (text) {
          s.prompts += 1;
          const proj = classifyPrompt(text);
          if (proj) s.projectHits.set(proj, (s.projectHits.get(proj) || 0) + 1);
        }
        if (usage) {
          s.inputTokens += usage.input_tokens || 0;
          s.outputTokens += usage.output_tokens || 0;
          s.cacheCreate += usage.cache_creation_input_tokens || 0;
          s.cacheRead += usage.cache_read_input_tokens || 0;
        }
      }
    }
  }

  return buckets;
}

function dominantProject(session) {
  if (!session.projectHits.size) return 'Other';
  let best = null, max = 0;
  for (const [k, v] of session.projectHits) {
    if (v > max) { max = v; best = k; }
  }
  return best;
}

function aggregateBucket(bucket) {
  const totals = { prompts: 0, hoursMs: 0, tokens: 0, sessions: 0 };
  const projects = new Map(); // name -> { prompts, hoursMs, tokens, sessions }

  for (const session of bucket.sessions.values()) {
    const proj = dominantProject(session);
    if (!projects.has(proj)) {
      projects.set(proj, { prompts: 0, hoursMs: 0, tokens: 0, sessions: 0 });
    }
    const p = projects.get(proj);
    const sessionMs = Math.max(0, Math.min(session.last - session.first, 14 * 3600 * 1000));
    const sessionTokens = session.inputTokens + session.outputTokens + session.cacheCreate + session.cacheRead;

    p.prompts += session.prompts;
    p.hoursMs += sessionMs;
    p.tokens += sessionTokens;
    p.sessions += 1;

    totals.prompts += session.prompts;
    totals.hoursMs += sessionMs;
    totals.tokens += sessionTokens;
    totals.sessions += 1;
  }

  const projectList = [...projects.entries()]
    .map(([name, p]) => ({
      name,
      prompts: p.prompts,
      hours: +(p.hoursMs / 3600000).toFixed(1),
      tokens: p.tokens,
      sessions: p.sessions,
    }))
    .sort((a, b) => b.hours - a.hours || b.prompts - a.prompts);

  return {
    totals: {
      prompts: totals.prompts,
      hours: +(totals.hoursMs / 3600000).toFixed(1),
      tokens: totals.tokens,
      sessions: totals.sessions,
    },
    projects: projectList,
  };
}

async function main() {
  const argPeriods = process.argv.slice(2);
  const all = ['yesterday', 'week', 'month', 'alltime'];
  const requested = argPeriods.length ? argPeriods : all;
  const invalid = requested.filter(p => !all.includes(p));
  if (invalid.length) {
    console.error(`Unknown periods: ${invalid.join(', ')}. Valid: ${all.join(', ')}`);
    process.exit(2);
  }

  const periods = requested.map(name => ({ name, ...periodBounds(name) }));
  const buckets = await collectAll(periods);
  await mkdir(OUT_DIR, { recursive: true });

  for (const name of requested) {
    const b = buckets.get(name);
    const { totals, projects } = aggregateBucket(b);
    const out = {
      span: b.meta.span,
      label: b.meta.label,
      totals,
      projects,
      windowStart: b.meta.start.toISOString(),
      windowEnd: b.meta.end.toISOString(),
      generatedAt: new Date().toISOString(),
    };
    const outPath = join(OUT_DIR, `${name}.json`);
    await writeFile(outPath, JSON.stringify(out, null, 2) + '\n', 'utf8');
    console.log(`Wrote ${outPath}  (${projects.length} projects, ${totals.prompts} prompts, ${totals.hours}h)`);
  }
}

main().catch(err => { console.error(err); process.exit(1); });
