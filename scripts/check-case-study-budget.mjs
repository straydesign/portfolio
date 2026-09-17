#!/usr/bin/env node
/* Word budget and evidence gate for case studies.
 *
 * The reference deck holds one short lead and three tight sub-items per
 * topic. Prose drifts longer every time it is edited, so the shape is a
 * check rather than a note in a comment.
 *
 * The second half is the harder rule: every line of copy in a topic names a
 * capture, that capture exists on disk, and it carries a measured annotation
 * box. A sentence with no picture of the thing it claims does not ship.
 * Run: npm run check:budget
 *
 * Node strips the types; the data files are copied to a temp dir first so
 * their extensionless imports resolve under --experimental-strip-types.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const SRC = path.resolve('src/data/caseStudies');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'csbudget-'));
for (const f of fs.readdirSync(SRC)) {
  if (!f.endsWith('.ts')) continue; // shots/ holds the manifests, read directly below
  fs.writeFileSync(
    path.join(tmp, f),
    fs
      .readFileSync(path.join(SRC, f), 'utf8')
      .replace(/^export \* from '\.\/shots';$/m, '')
      .replace(/from '\.\/(\w+)'/g, "from './$1.ts'"),
  );
}
const { CASE_STUDIES } = await import(pathToFileURL(path.join(tmp, 'index.ts')).href);
fs.rmSync(tmp, { recursive: true, force: true });

const words = (s) => s.trim().split(/\s+/).length;
const BUDGET = {
  lead: [15, 37],
  heading: [2, 8],
  body: [9, 29],
  headline: [3, 9],
};

const fails = [];
const check = (where, kind, text) => {
  const [lo, hi] = BUDGET[kind];
  const n = words(text);
  if (n < lo || n > hi) fails.push(`${where} — ${kind} is ${n} words (want ${lo}–${hi}): "${text}"`);
};

// A study still on the old shape reports as one failure rather than throwing,
// so a run during the rewrite still shows every other study's real problems.
const CONVERTED = CASE_STUDIES.filter((s) => {
  const ok = Array.isArray(s.cover) && s.topics.every((t) => t.items.every((i) => i.shot));
  if (!ok) fails.push(`${s.slug} — still on the pre-annotation shape (cover ids + a shot per item)`);
  return ok;
});

for (const s of CONVERTED) {
  check(`${s.slug}/context`, 'headline', s.context.headline);
  check(`${s.slug}/context`, 'lead', s.context.lead);
  if (s.cover.length < 3 || s.cover.length > 4) {
    fails.push(`${s.slug}/cover — ${s.cover.length} phones (want 3–4)`);
  }

  // A flow block is a section in its own right, so a study whose source
  // material is six screenshots can carry two topics and still hold three.
  const sections = s.topics.length + (s.flow ? 1 : 0);
  if (sections < 3) fails.push(`${s.slug} — only ${sections} sections (want 3+)`);
  for (const t of s.topics) {
    check(`${s.slug}/${t.label}`, 'lead', t.lead);
    if (t.items.length !== 3) fails.push(`${s.slug}/${t.label} — ${t.items.length} items (want exactly 3)`);
    t.items.forEach((i) => {
      check(`${s.slug}/${t.label}/${i.heading}`, 'heading', i.heading);
      check(`${s.slug}/${t.label}/${i.heading}`, 'body', i.body);
    });
  }

  check(`${s.slug}/impact`, 'lead', s.impact.lead);
  if (s.impact.metrics.length !== 3) fails.push(`${s.slug}/impact — ${s.impact.metrics.length} metrics (want 3)`);
  s.learnings.forEach((l) => {
    check(`${s.slug}/learnings/${l.heading}`, 'heading', l.heading);
    check(`${s.slug}/learnings/${l.heading}`, 'body', l.body);
  });

}

// Every shot id resolves, its file is on disk, and — for a topic item — it
// carries the measured box that points at what the sentence describes. A
// cover shot is the title wall and deliberately carries none.
const manifest = {};
for (const f of fs.readdirSync(path.join(SRC, 'shots'))) {
  const study = path.basename(f, '.json');
  const entries = JSON.parse(fs.readFileSync(path.join(SRC, 'shots', f), 'utf8'));
  for (const [id, entry] of Object.entries(entries)) manifest[`${study}/${id}`] = entry;
}
const seen = new Set();
const resolve = (slug, where, id, needsBox) => {
  const entry = manifest[id];
  if (!entry) {
    fails.push(`${slug}/${where} — no capture named "${id}" in shots.generated.json`);
    return;
  }
  if (!fs.existsSync(path.join('public', entry.src))) {
    fails.push(`${slug}/${where} — missing file ${entry.src}`);
  }
  if (needsBox && !entry.box) {
    fails.push(`${slug}/${where} — "${id}" has no annotation box; nothing on it points at the copy`);
  }
  if (needsBox && !entry.note) fails.push(`${slug}/${where} — "${id}" has no marker note`);
  seen.add(entry.src);
};
for (const s of CONVERTED) {
  s.cover.forEach((id) => resolve(s.slug, 'cover', id, false));
  for (const t of s.topics) t.items.forEach((i) => resolve(s.slug, t.label, i.shot, true));
}

// One capture per line of copy. A shot reused across two sentences means one
// of them is illustrated by a picture of something else.
for (const s of CONVERTED) {
  const ids = s.topics.flatMap((t) => t.items.map((i) => i.shot));
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupes.length) fails.push(`${s.slug} — capture reused across lines: ${[...new Set(dupes)].join(', ')}`);
}

// A phone frame must be fed a phone capture. A desktop shot object-covered
// into a 390x844 frame crops to a sliver of its own hero, which is what the
// More Work row shipped until 2026-09-16.
const projects = fs.readFileSync('src/data/projects.ts', 'utf8');
for (const [, id, shot] of projects.matchAll(/id: '([\w-]+)',[\s\S]{0,900}?screenshot: '([^']+)'/g)) {
  if (!shot.includes('/case-studies/')) continue;
  const block = projects.slice(projects.indexOf(`id: '${id}'`), projects.indexOf(`id: '${id}'`) + 1400);
  const m = block.match(/phoneScreenshot: '([^']+)'/);
  if (!m) fails.push(`${id} — a case-study project with no phoneScreenshot; phone frames will crop the desktop shot`);
  else if (!m[1].endsWith('-mobile.webp')) fails.push(`${id} — phoneScreenshot is not a mobile capture: ${m[1]}`);
  else if (!fs.existsSync(path.join('public', m[1]))) fails.push(`${id} — missing file ${m[1]}`);
}

if (fails.length) {
  console.error(`${fails.length} over budget:\n` + fails.map((f) => `  ${f}`).join('\n'));
  process.exit(1);
}
console.log(`${CONVERTED.length} case studies, ${seen.size} images — all within budget.`);
