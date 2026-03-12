'use client';

import { StaggerContainer, StaggerItem } from './AnimateIn';

const CURRENT_STEPS = [
  'Open menu',
  'Find "Unassign"',
  'Tap "Unassign"',
  'Confirmation modal',
  'Tap "Yes, unassign"',
  '"Why?" prompt',
  'Select reason',
  'Tap "Submit"',
  'Survey prompt',
  'Rate experience',
  'Add comment',
  'Tap "Done"',
];

const PROPOSED_STEPS = [
  { label: 'Tap "Cancel Order"', note: 'Single visible button — no menu diving' },
  { label: 'Select reason', note: 'One required field, no free-text' },
  { label: 'Confirm', note: 'Single confirmation tap' },
  { label: 'Done', note: 'Survey moves to post-shift' },
];

export default function CancellationFlowDiagram() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      {/* CURRENT FLOW */}
      <div>
        <p
          className="text-xs font-bold tracking-widest mb-6 uppercase text-center"
          style={{ color: '#a1a1a6' }}
        >
          Current — 12 steps
        </p>
        <StaggerContainer className="flex flex-col items-center gap-0" staggerDelay={0.04}>
          {CURRENT_STEPS.map((step, i) => (
            <StaggerItem key={step}>
              <div className="flex flex-col items-center">
                <div
                  className="px-5 py-3 text-sm font-medium text-center w-56"
                  style={{
                    backgroundColor: '#000000',
                    color: 'rgba(255,255,255,0.35)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {step}
                </div>
                {i < CURRENT_STEPS.length - 1 && (
                  <div
                    className="w-px h-4"
                    style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                  />
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* PROPOSED FLOW */}
      <div>
        <p
          className="text-xs font-bold tracking-widest mb-6 uppercase text-center"
          style={{ color: '#ffffff' }}
        >
          Proposed — 4 steps
        </p>
        <StaggerContainer className="flex flex-col items-center gap-0" staggerDelay={0.08}>
          {PROPOSED_STEPS.map((step, i) => (
            <StaggerItem key={step.label}>
              <div className="flex flex-col items-center">
                <div className="flex items-start gap-4 w-full max-w-sm">
                  <div
                    className="px-5 py-3 text-sm font-bold text-center w-56 flex-shrink-0"
                    style={{
                      backgroundColor: '#000000',
                      color: '#ffffff',
                      border: '2px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    {step.label}
                  </div>
                  <p
                    className="text-xs pt-3 hidden md:block"
                    style={{ color: '#a1a1a6' }}
                  >
                    {step.note}
                  </p>
                </div>
                {i < PROPOSED_STEPS.length - 1 && (
                  <div
                    className="w-px h-4"
                    style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                  />
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
