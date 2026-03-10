'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

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
  onPrimaryColor?: string;
  className?: string;
  onCtaClick?: () => void;
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
  onPrimaryColor = '#ffffff',
  className,
  onCtaClick,
}: PricingCardProps) {
  const cardBg = theme === 'dark' ? 'rgba(10, 10, 10, 0.8)' : 'rgba(250, 250, 250, 0.9)';
  const cardBorder = featured
    ? primaryColor
    : theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const hoverBorder = featured
    ? primaryColor
    : theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)';

  const featureDot = theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)';

  return (
    <motion.section
      aria-label={`${name} plan`}
      className={cn('relative group cursor-pointer', className)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Featured badge */}
      {featured && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
          style={{
            backgroundColor: primaryColor,
            color: onPrimaryColor,
            boxShadow: `0 4px 20px ${primaryColor}40`,
          }}
        >
          <Sparkles className="w-3 h-3" />
          Most Popular
        </div>
      )}

      <div
        className="rounded-2xl px-7 pb-7 pt-9 transition-all duration-300 relative overflow-hidden"
        style={{
          backgroundColor: cardBg,
          border: `1px solid ${cardBorder}`,
          backdropFilter: 'blur(20px)',
          boxShadow: featured
            ? `0 0 40px ${primaryColor}15, 0 8px 32px rgba(0,0,0,0.12)`
            : '0 4px 24px rgba(0,0,0,0.06)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = hoverBorder;
          if (!featured) {
            e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.12)`;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = cardBorder;
          if (!featured) {
            e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)';
          }
        }}
      >
        {/* Accent line at top */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
          style={{
            background: featured
              ? primaryColor
              : `linear-gradient(90deg, transparent, ${primaryColor}60, transparent)`,
            opacity: featured ? 1 : 0.5,
          }}
        />

        <h3
          className="text-center text-sm font-bold uppercase tracking-widest"
          style={{ color: featured ? primaryColor : secondaryTextColor }}
        >
          {name}
        </h3>

        <div className="mt-5 text-center">
          <span
            className="text-5xl font-black leading-none tracking-tight"
            style={{ color: textColor }}
          >
            {price}
          </span>
          {periodLabel && (
            <span
              className="ml-1 text-base font-medium"
              style={{ color: secondaryTextColor }}
            >
              {periodLabel}
            </span>
          )}
        </div>

        {subtitle && (
          <p
            className="mt-3 text-center text-sm leading-relaxed"
            style={{ color: secondaryTextColor }}
          >
            {subtitle}
          </p>
        )}

        <div
          className="mt-6 mb-6"
          style={{ borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}` }}
        />

        <ul className="space-y-3">
          {features.map((f, i) => {
            const ok = f.included !== false;
            return (
              <li
                key={i}
                className="flex items-center gap-3"
                style={{ color: ok ? textColor : secondaryTextColor }}
              >
                <span
                  className="inline-grid h-5 w-5 shrink-0 place-items-center rounded-full"
                  style={{
                    backgroundColor: ok ? `${primaryColor}18` : featureDot,
                  }}
                  aria-hidden
                >
                  <Check
                    className="h-3 w-3"
                    style={{ color: ok ? primaryColor : secondaryTextColor }}
                    strokeWidth={3}
                  />
                </span>
                <span className="text-sm">{f.label}</span>
              </li>
            );
          })}
        </ul>

        {/* CTA button */}
        <button
          onClick={onCtaClick}
          className="mt-7 w-full py-3 rounded-xl text-sm font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer"
          style={{
            backgroundColor: featured ? primaryColor : 'transparent',
            color: featured ? onPrimaryColor : textColor,
            border: featured ? 'none' : `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}`,
          }}
          onMouseEnter={(e) => {
            if (!featured) {
              e.currentTarget.style.borderColor = primaryColor;
              e.currentTarget.style.color = primaryColor;
            } else {
              e.currentTarget.style.opacity = '0.9';
            }
          }}
          onMouseLeave={(e) => {
            if (!featured) {
              e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)';
              e.currentTarget.style.color = textColor;
            } else {
              e.currentTarget.style.opacity = '1';
            }
          }}
        >
          Start My Project
        </button>
      </div>
    </motion.section>
  );
}
