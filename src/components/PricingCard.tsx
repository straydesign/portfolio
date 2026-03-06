'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export type PricingFeature = {
  label: React.ReactNode;
  included?: boolean;
};

export type PricingCardProps = {
  name: string;
  subtitle?: string;
  price: string;
  periodLabel?: string;
  features: PricingFeature[];
  featured?: boolean;
  primaryColor: string;
  textColor: string;
  secondaryTextColor: string;
  theme: 'light' | 'dark';
  className?: string;
};

export default function PricingCard({
  name,
  subtitle,
  price,
  periodLabel,
  features,
  featured = false,
  primaryColor,
  textColor,
  secondaryTextColor,
  theme,
  className,
}: PricingCardProps) {
  const cardBg = theme === 'dark' ? '#0a0a0a' : '#fafafa';
  const cardBorder = theme === 'dark' ? '#222222' : '#e4e4e7';
  const frameBg = featured
    ? primaryColor
    : theme === 'dark' ? '#333333' : '#d4d4d8';
  const okBg = theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)';
  const okBorder = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
  const noBg = theme === 'dark' ? 'rgba(255,180,0,0.08)' : 'rgba(255,180,0,0.06)';
  const noBorder = theme === 'dark' ? 'rgba(255,180,0,0.15)' : 'rgba(255,180,0,0.12)';

  return (
    <section aria-label={`${name} plan`} className={cn('relative', className)}>
      <div
        className="rounded-3xl p-[3px]"
        style={{ background: frameBg }}
      >
        <div
          className="rounded-[22px] px-8 pb-8 pt-10 shadow-sm"
          style={{
            backgroundColor: cardBg,
            border: `1px solid ${cardBorder}`,
          }}
        >
          <h3
            className="text-center text-xl font-semibold"
            style={{ color: textColor }}
          >
            {name}
          </h3>
          {subtitle && (
            <p
              className="mt-1 text-center text-sm"
              style={{ color: secondaryTextColor }}
            >
              {subtitle}
            </p>
          )}

          <div className="mt-6 text-center">
            <span
              className="text-5xl font-bold leading-none"
              style={{ color: primaryColor }}
            >
              {price}
            </span>
            {periodLabel && (
              <span
                className="ml-1 text-sm"
                style={{ color: secondaryTextColor }}
              >
                {periodLabel}
              </span>
            )}
          </div>

          <ul className="mt-8 space-y-4">
            {features.map((f, i) => {
              const ok = f.included !== false;
              return (
                <li
                  key={i}
                  className="flex items-start gap-3"
                  style={{ color: textColor }}
                >
                  <span
                    className="mt-0.5 inline-grid h-6 w-6 shrink-0 place-items-center rounded-full"
                    style={{
                      backgroundColor: ok ? okBg : noBg,
                      boxShadow: `inset 0 0 0 1px ${ok ? okBorder : noBorder}`,
                    }}
                    aria-hidden
                  >
                    {ok ? (
                      <svg
                        viewBox="0 0 20 20"
                        className="h-3.5 w-3.5"
                        fill={primaryColor}
                      >
                        <path d="M16.7 6.3a1 1 0 0 0-1.4-1.4L8 12.2 4.7 8.9a1 1 0 1 0-1.4 1.4L7.3 14a1 1 0 0 0 1.4 0l8-8Z" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 20 20"
                        className="h-3.5 w-3.5"
                        fill="#f59e0b"
                      >
                        <path d="M6.2 5 5 6.2 8.8 10 5 13.8 6.2 15 10 11.2 13.8 15 15 13.8 11.2 10 15 6.2 13.8 5 10 8.8z" />
                      </svg>
                    )}
                  </span>
                  <span className="text-sm">{f.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
