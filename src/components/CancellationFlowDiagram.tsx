'use client';

import { StaggerContainer, StaggerItem } from './AnimateIn';

const CURRENT_STEPS = [
  'Open menu',
  'Find "Unassign"',
  'Tap "Unassign"',
  'Confirm modal',
  'Tap "Yes"',
  '"Why?" prompt',
  'Select reason',
  'Tap "Submit"',
  'Survey prompt',
  'Rate experience',
  'Add comment',
  'Tap "Done"',
];

const PROPOSED_STEPS = [
  { label: 'Tap "Cancel"', note: 'Single visible button' },
  { label: 'Select reason', note: 'One required field' },
  { label: 'Confirm', note: 'One tap' },
  { label: 'Done', note: 'Survey moves to post-shift' },
];

export default function CancellationFlowDiagram() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
      {/* CURRENT FLOW */}
      <div>
        <p className="text-[11px] font-bold tracking-widest mb-3 uppercase" style={{ color: 'var(--ink-2)' }}>
          Current — 12 steps
        </p>
        <StaggerContainer className="grid grid-cols-3 gap-1.5" staggerDelay={0.025}>
          {CURRENT_STEPS.map((step, i) => (
            <StaggerItem key={step}>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold w-4 text-right" style={{ color: 'rgba(var(--hairline),0.3)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div
                  className="px-2 py-1.5 text-[11px] font-medium flex-1 truncate"
                  style={{
                    backgroundColor: 'var(--chip)',
                    color: 'rgba(var(--hairline),0.4)',
                    border: '1px solid rgba(var(--hairline),0.08)',
                  }}
                  title={step}
                >
                  {step}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* PROPOSED FLOW */}
      <div>
        <p className="text-[11px] font-bold tracking-widest mb-3 uppercase" style={{ color: 'var(--ink)' }}>
          Proposed — 4 steps
        </p>
        <StaggerContainer className="flex flex-col gap-1.5" staggerDelay={0.06}>
          {PROPOSED_STEPS.map((step, i) => (
            <StaggerItem key={step.label}>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold w-4 text-right" style={{ color: 'var(--ink)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div
                  className="px-3 py-1.5 text-xs font-bold flex-shrink-0 w-32"
                  style={{
                    backgroundColor: 'var(--ink)',
                    color: 'var(--paper)',
                    border: '2px solid rgba(var(--hairline),0.2)',
                  }}
                >
                  {step.label}
                </div>
                <p className="text-[11px] hidden md:block" style={{ color: 'var(--ink-2)' }}>
                  {step.note}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
