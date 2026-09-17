/* Slop-guard scores prose, and a `.ts` file is not prose: adjacent string
 * literals with no terminal punctuation get concatenated into one "sentence",
 * which reported a 179-word run-on inside a list of seven three-word steps.
 * Scoring the source measured the file. This writes what a reader actually
 * sees, in reading order, so the score is of the copy that ships.
 * Run: node scripts/render-copy.mjs && slop-guard each file it names.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const SRC = path.resolve('src/data/caseStudies');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'csrender-'));
for (const f of fs.readdirSync(SRC)) {
  if (!f.endsWith('.ts')) continue;
  fs.writeFileSync(
    path.join(tmp, f),
    fs.readFileSync(path.join(SRC, f), 'utf8')
      .replace(/^export \* from '\.\/shots';$/m, '')
      .replace(/from '\.\/(\w+)'/g, "from './$1.ts'"),
  );
}
const { CASE_STUDIES } = await import(pathToFileURL(path.join(tmp, 'index.ts')).href);
fs.rmSync(tmp, { recursive: true, force: true });

const OUT = process.argv[2] ?? '.copy';
fs.mkdirSync(OUT, { recursive: true });
for (const s of CASE_STUDIES) {
  const L = [s.client, s.title, s.summary, s.meta, ''];
  for (const t of s.topics) {
    L.push(t.label, t.gloss, t.lead);
    for (const i of t.items) L.push(i.heading, i.body);
    L.push('');
  }
  if (s.flow) {
    const f = s.flow;
    L.push(f.label, f.gloss, f.lead, f.beforeLabel, f.beforeNote, f.afterLabel, f.afterNote);
    for (const st of f.steps) L.push(`${st.before}. ${st.after}.`);
    L.push(f.screenNote, '');
  }
  L.push('Impact', s.impact.lead, ...s.impact.metrics.map((m) => `${m.value}. ${m.label}.`));
  if (s.impact.note) L.push(s.impact.note);
  L.push('', 'Learnings', ...s.learnings.flatMap((l) => [l.heading, l.body]));
  /* One blank line between every block. On the page each heading, body, lead
     and step is its own element with air around it; gluing a topic into one
     run of text made six identical "paragraphs" and the balance rules scored
     the extractor rather than the copy. */
  fs.writeFileSync(path.join(OUT, `${s.slug}.md`), L.filter(Boolean).join('\n\n') + '\n');
  console.log(path.join(OUT, `${s.slug}.md`));
}
