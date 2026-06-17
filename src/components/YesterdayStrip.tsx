'use client';

import { useEffect, useState } from 'react';
import { m, useReducedMotion, AnimatePresence } from 'framer-motion';

type Span = 'yesterday' | 'week' | 'month' | 'alltime';

interface ProjectRow {
  name: string;
  prompts: number;
  hours: number;
  tokens: number;
  sessions: number;
}

interface ActivityData {
  span: Span;
  label: string;
  totals: { prompts: number; hours: number; tokens: number; sessions: number };
  projects: ProjectRow[];
  generatedAt: string;
}

const TABS: { key: Span; label: string }[] = [
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
  { key: 'alltime', label: 'All-time' },
];

// Public Vercel Blob store for the daily activity data (portfolio-activity store).
// Stable per store — only changes if the Blob store is recreated.
const BLOB_BASE =
  process.env.NEXT_PUBLIC_ACTIVITY_BLOB_BASE ||
  'https://iyn3vk3wnsbjmbf2.public.blob.vercel-storage.com';

function formatTokens(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function formatHours(n: number): string {
  if (n >= 100) return Math.round(n).toLocaleString();
  return n.toFixed(1);
}

interface Props {
  delay?: number;
}

export default function YesterdayStrip({ delay = 0 }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const [data, setData] = useState<Partial<Record<Span, ActivityData>>>({});
  const [active, setActive] = useState<Span>('yesterday');
  const [error, setError] = useState(false);

  useEffect(() => {
    // Live data lives in Vercel Blob, refreshed daily by the local cron job — so the
    // numbers update without a redeploy. The bundled /activity/*.json is the fallback
    // (last-deployed snapshot) if Blob is unreachable.
    const fetchSpan = async (key: Span): Promise<readonly [Span, ActivityData | null]> => {
      try {
        const r = await fetch(`${BLOB_BASE}/activity/${key}.json`, { cache: 'no-store' });
        if (r.ok) return [key, await r.json()];
      } catch { /* fall through to bundled snapshot */ }
      try {
        const r = await fetch(`/activity/${key}.json`, { cache: 'no-store' });
        if (r.ok) return [key, await r.json()];
      } catch { /* ignore */ }
      return [key, null];
    };

    Promise.all(TABS.map((t) => fetchSpan(t.key))).then((entries) => {
      const next: Partial<Record<Span, ActivityData>> = {};
      let any = false;
      for (const [k, v] of entries) {
        if (v) { next[k] = v; any = true; }
      }
      if (!any) setError(true);
      setData(next);
      // Default to the most recent span that actually has activity, so a quiet
      // "yesterday" (0 prompts) doesn't render an empty strip on first paint.
      const order: Span[] = ['yesterday', 'week', 'month', 'alltime'];
      const firstWithData = order.find((k) => (next[k]?.totals.prompts ?? 0) > 0);
      if (firstWithData) setActive(firstWithData);
    });
  }, []);

  if (error) return null;
  const current = data[active];

  return (
    <m.div
      className="mt-6 md:mt-8 border border-[rgba(var(--hairline),0.15)] p-4 md:p-5"
      style={{ backgroundColor: 'var(--paper)' }}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span
          className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shrink-0"
          style={{ backgroundColor: '#34d399', color: '#000', borderRadius: 0 }}
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          Live activity
        </span>

        <div role="tablist" aria-label="Activity period" className="flex flex-wrap gap-1">
          {TABS.map((t) => {
            const isActive = active === t.key;
            const disabled = !data[t.key] || (data[t.key]?.totals.prompts ?? 0) === 0;
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={isActive}
                disabled={disabled}
                onClick={() => setActive(t.key)}
                className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: isActive ? 'var(--ink)' : 'transparent',
                  color: isActive ? 'var(--paper)' : 'var(--ink)',
                  border: '1px solid var(--ink)',
                  borderRadius: 0,
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <span className="text-[11px] uppercase tracking-wider basis-full md:basis-auto md:ml-auto" style={{ color: 'var(--ink-2)' }}>
          Auto-tracked daily from my Claude Code session logs
        </span>
      </div>

      <AnimatePresence mode="wait">
        <m.div
          key={active}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
        >
          {!current ? (
            <p className="text-[13px]" style={{ color: 'var(--ink-2)' }}>Loading…</p>
          ) : (
            <>
              <div className="flex items-baseline justify-between gap-3 mb-3">
                <div className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--ink-2)' }}>
                  {current.label}
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono uppercase tracking-wider justify-end" style={{ color: 'var(--ink-2)' }}>
                  <span><strong style={{ color: 'var(--ink)' }}>{current.totals.prompts.toLocaleString()}</strong> prompts</span>
                  <span aria-hidden>·</span>
                  <span><strong style={{ color: 'var(--ink)' }}>{formatHours(current.totals.hours)}</strong> agent-hours</span>
                  <span aria-hidden>·</span>
                  <span><strong style={{ color: 'var(--ink)' }}>{formatTokens(current.totals.tokens)}</strong> tokens</span>
                  <span aria-hidden>·</span>
                  <span><strong style={{ color: 'var(--ink)' }}>{current.totals.sessions.toLocaleString()}</strong> sessions</span>
                </div>
              </div>

              <ul className="space-y-1">
                {current.projects.map((p) => (
                  <li
                    key={p.name}
                    className="grid grid-cols-[1fr_auto] items-baseline gap-3 py-1 border-t border-[rgba(var(--hairline),0.05)] first:border-t-0"
                  >
                    <span className="text-[13px] md:text-[14px] truncate" style={{ color: 'var(--ink)' }}>
                      {p.name}
                    </span>
                    <span className="text-[10px] md:text-[11px] font-mono uppercase tracking-wider tabular-nums" style={{ color: 'var(--ink-2)' }}>
                      <strong style={{ color: 'var(--ink)' }}>{p.prompts.toLocaleString()}</strong> prompts
                      <span aria-hidden> · </span>
                      <strong style={{ color: 'var(--ink)' }}>{formatHours(p.hours)}</strong>h
                      <span aria-hidden> · </span>
                      <strong style={{ color: 'var(--ink)' }}>{formatTokens(p.tokens)}</strong>
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-3 text-[10px] uppercase tracking-wider" style={{ color: 'var(--ink-2)' }}>
                Parallel sessions counted in parallel
              </p>
            </>
          )}
        </m.div>
      </AnimatePresence>
    </m.div>
  );
}
