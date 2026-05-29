#!/usr/bin/env node
// Walk ~/.claude/projects and gzip every .jsonl older than COMPRESS_AFTER_DAYS.
// Skips files actively being written (mtime within the window) and any already-compressed.
// Verifies the gzip is readable before deleting the source.

import { readdir, stat, readFile, writeFile, unlink, rename } from 'node:fs/promises';
import { gzipSync, gunzipSync } from 'node:zlib';
import { join, dirname } from 'node:path';

const PROJECTS = `${process.env.HOME}/.claude/projects`;
const COMPRESS_AFTER_DAYS = 7;
const cutoffMs = Date.now() - COMPRESS_AFTER_DAYS * 24 * 3600 * 1000;

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

let compressed = 0, skipped = 0, savedBytes = 0, failures = 0;

for await (const file of walkJsonl(PROJECTS)) {
  let st;
  try { st = await stat(file); } catch { continue; }
  if (st.mtimeMs > cutoffMs) { skipped++; continue; }

  const gzPath = `${file}.gz`;
  try { await stat(gzPath); skipped++; continue; } catch { /* not present, proceed */ }

  let raw;
  try { raw = await readFile(file); } catch { failures++; continue; }
  const gz = gzipSync(raw, { level: 9 });

  // Verify roundtrip before deleting source.
  let ok = false;
  try {
    const back = gunzipSync(gz);
    ok = back.length === raw.length;
  } catch { ok = false; }
  if (!ok) { failures++; continue; }

  const tmp = `${gzPath}.tmp`;
  await writeFile(tmp, gz);
  await rename(tmp, gzPath);
  await unlink(file);

  savedBytes += raw.length - gz.length;
  compressed++;
  if (compressed % 100 === 0) console.log(`  ...${compressed} files compressed`);
}

const mb = (n) => (n / 1024 / 1024).toFixed(1);
console.log(`\nCompressed: ${compressed}`);
console.log(`Skipped (recent or already gz): ${skipped}`);
console.log(`Failures: ${failures}`);
console.log(`Saved: ${mb(savedBytes)} MB`);
