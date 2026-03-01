'use client';

import { useTheme } from '@/context/ThemeContext';
import * as cardStyles from '@/utils/cardStyles';
import type { AccentColor } from '@/utils/cardStyles';
import { Star } from 'lucide-react';

const ACCENT_NAMES: Record<AccentColor, string> = {
  blue: 'Blue', purple: 'Purple', pink: 'Pink', red: 'Red',
  orange: 'Orange', yellow: 'Yellow', green: 'Green', bw: 'B/W', tan: 'Tan',
};

export default function DesignSystem() {
  const { theme, accentColor, setAccentColor, toggleTheme } = useTheme();
  const primaryColor = cardStyles.getPrimaryColor(accentColor, theme);
  const buttonPrimaryColor = cardStyles.getButtonPrimaryColor(accentColor, theme);
  const textColor = cardStyles.getTextColor(theme);
  const secondaryTextColor = cardStyles.getSecondaryTextColor(theme);
  const backgroundColor = cardStyles.getBackgroundColor(theme);
  const badgeBg = cardStyles.getBadgeBackground(accentColor, theme);
  const badgeText = cardStyles.getBadgeTextColor(accentColor, theme);
  const chipBg = cardStyles.getChipBackground(theme);
  const dividerColor = cardStyles.getDividerColor(theme);

  const cardBg = theme === 'dark' ? '#1a1a1a' : '#ffffff';
  const cardBorder = `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'}`;
  const cardShadow = theme === 'dark' ? '0 4px 16px 0 rgba(0, 0, 0, 0.3)' : '0 4px 16px 0 rgba(0, 0, 0, 0.12)';
  const chromeShadow = theme === 'dark' ? '0 2px 8px rgba(0, 0, 0, 0.5)' : '0 2px 8px rgba(0, 0, 0, 0.08)';

  const buttonTextColor = (accentColor === 'bw' && theme === 'dark') ? '#ffffff'
    : (accentColor === 'bw' && theme === 'light') ? '#000000'
    : (accentColor === 'yellow' || accentColor === 'tan') ? '#000000'
    : '#ffffff';

  const sectionCard = (children: React.ReactNode, title: string) => (
    <div className="rounded-[48px] p-6 md:p-10 w-full" style={{ background: cardBg, border: cardBorder, boxShadow: cardShadow }}>
      <h2 className="text-2xl md:text-3xl mb-6 font-bold" style={{ color: textColor }}>{title}</h2>
      {children}
    </div>
  );

  const tokenRow = (label: string, value: string, preview?: React.ReactNode) => (
    <div className="flex items-center gap-4 py-2" style={{ borderBottom: `1px solid ${dividerColor}` }}>
      <span className="text-sm font-medium w-40 shrink-0" style={{ color: textColor }}>{label}</span>
      <code className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: chipBg, color: secondaryTextColor }}>{value}</code>
      {preview && <div className="ml-auto">{preview}</div>}
    </div>
  );

  return (
    <div className="px-6 md:px-16 py-8 md:py-12 min-h-[calc(100vh-90px)] md:min-h-[calc(100vh-72px)]" style={{ backgroundColor }}>
      <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">

        {/* ─── HERO ─── */}
        <div className="rounded-[48px] p-6 md:p-10 w-full" style={{ background: cardBg, border: cardBorder, boxShadow: cardShadow }}>
          <h1 className="text-[48px] sm:text-[60px] md:text-[72px] leading-none tracking-wider font-black mb-4"
            style={{ fontFamily: "var(--font-family-bungee), sans-serif", WebkitTextStroke: `4px ${primaryColor}`, WebkitTextFillColor: 'transparent', color: 'transparent', paintOrder: 'stroke fill' }}>
            DESIGN SYSTEM
          </h1>
          <p className="text-[15px] md:text-[17px] leading-relaxed" style={{ color: textColor }}>
            A living reference of every color, type style, component, and pattern used across this portfolio.
            Everything on this page responds to the active theme and accent color.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-full text-sm font-bold transition-all hover:scale-105"
              style={{ backgroundColor: buttonPrimaryColor, color: buttonTextColor }}
            >
              {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
            </button>
            <span className="text-sm" style={{ color: secondaryTextColor }}>
              Current: {theme === 'dark' ? 'Dark' : 'Light'} mode + {ACCENT_NAMES[accentColor]}
            </span>
          </div>
        </div>

        {/* ─── COLOR PALETTE ─── */}
        {sectionCard(
          <>
            {/* Accent Colors */}
            <h3 className="text-lg font-semibold mb-3" style={{ color: primaryColor }}>Accent Colors</h3>
            <p className="text-sm mb-4" style={{ color: secondaryTextColor }}>
              9 accent colors. Click any swatch to apply it site-wide.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {(Object.keys(cardStyles.colorMap) as AccentColor[]).map((color) => (
                <button
                  key={color}
                  onClick={() => setAccentColor(color)}
                  className="flex flex-col items-center gap-1.5 group"
                  aria-label={`Set accent color to ${ACCENT_NAMES[color]}`}
                >
                  <div
                    className="w-12 h-12 rounded-full transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: cardStyles.colorMap[color],
                      border: accentColor === color ? `3px solid ${textColor}` : '3px solid transparent',
                      boxShadow: accentColor === color ? `0 0 0 2px ${cardStyles.colorMap[color]}` : 'none',
                    }}
                  />
                  <span className="text-[11px] font-medium" style={{ color: accentColor === color ? textColor : secondaryTextColor }}>
                    {ACCENT_NAMES[color]}
                  </span>
                </button>
              ))}
            </div>

            {/* Semantic Colors */}
            <h3 className="text-lg font-semibold mb-3" style={{ color: primaryColor }}>Semantic Colors</h3>
            <div className="space-y-0">
              {tokenRow('Primary Text', textColor,
                <div className="w-6 h-6 rounded" style={{ backgroundColor: textColor }} />
              )}
              {tokenRow('Secondary Text', secondaryTextColor,
                <div className="w-6 h-6 rounded" style={{ backgroundColor: secondaryTextColor }} />
              )}
              {tokenRow('Background', backgroundColor,
                <div className="w-6 h-6 rounded border" style={{ backgroundColor, borderColor: dividerColor }} />
              )}
              {tokenRow('Card Surface', cardBg,
                <div className="w-6 h-6 rounded" style={{ backgroundColor: cardBg, border: cardBorder }} />
              )}
              {tokenRow('Chrome (Header/Footer)', theme === 'dark' ? '#1a1a1a' : '#ffffff',
                <div className="w-6 h-6 rounded" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff', border: cardBorder }} />
              )}
              {tokenRow('Divider', theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
                <div className="w-full h-px" style={{ backgroundColor: dividerColor, width: 48 }} />
              )}
              {tokenRow('Chip Background', theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: chipBg }} />
              )}
              {tokenRow('Badge Background', accentColor === 'bw' && theme === 'dark' ? '#404040' : cardStyles.colorMap[accentColor],
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: badgeBg }} />
              )}
            </div>
          </>,
          'Color Palette'
        )}

        {/* ─── TYPOGRAPHY ─── */}
        {sectionCard(
          <>
            {/* Font Families */}
            <h3 className="text-lg font-semibold mb-4" style={{ color: primaryColor }}>Font Families</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-4 rounded-2xl" style={{ backgroundColor: chipBg }}>
                <p className="text-[11px] uppercase tracking-wider mb-2 font-medium" style={{ color: secondaryTextColor }}>Headings</p>
                <p className="text-3xl" style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: textColor }}>
                  Bungee Regular
                </p>
                <p className="text-xs mt-2" style={{ color: secondaryTextColor }}>Used for hero headings, section titles, and the footer CTA.</p>
              </div>
              <div className="p-4 rounded-2xl" style={{ backgroundColor: chipBg }}>
                <p className="text-[11px] uppercase tracking-wider mb-2 font-medium" style={{ color: secondaryTextColor }}>Body</p>
                <p className="text-3xl font-light" style={{ color: textColor }}>
                  Inter Variable
                </p>
                <p className="text-xs mt-2" style={{ color: secondaryTextColor }}>Used for body text, buttons, tags, navigation, and all UI elements.</p>
              </div>
            </div>

            {/* Type Scale */}
            <h3 className="text-lg font-semibold mb-2" style={{ color: primaryColor }}>Type Scale</h3>
            <p className="text-sm mb-4" style={{ color: secondaryTextColor }}>
              Every size has a mobile and desktop value. The site uses the <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: chipBg }}>md:</code> breakpoint (768px) to step up.
            </p>
            <div className="space-y-0 overflow-hidden">
              {/* Column headers */}
              <div className="flex items-center gap-4 pb-2 mb-1" style={{ borderBottom: `2px solid ${dividerColor}` }}>
                <span className="text-[11px] uppercase tracking-wider font-semibold w-36 shrink-0" style={{ color: secondaryTextColor }}>Role</span>
                <span className="text-[11px] uppercase tracking-wider font-semibold w-16 shrink-0 text-center" style={{ color: secondaryTextColor }}>Mobile</span>
                <span className="text-[11px] uppercase tracking-wider font-semibold w-16 shrink-0 text-center" style={{ color: secondaryTextColor }}>Desktop</span>
                <span className="text-[11px] uppercase tracking-wider font-semibold hidden md:block" style={{ color: secondaryTextColor }}>Preview</span>
              </div>
              {[
                { role: 'Hero heading', mobile: '48px', desktop: '72px', font: 'bungee' },
                { role: 'Section heading', mobile: '48px', desktop: '80px', font: 'bungee' },
                { role: 'Case study title', mobile: '36px', desktop: '48px', font: 'bungee' },
                { role: 'Card title', mobile: '24px', desktop: '30px', font: 'inter-bold' },
                { role: 'Subtitle', mobile: '20px', desktop: '24px', font: 'inter' },
                { role: 'Footer heading', mobile: '18px', desktop: '24px', font: 'bungee' },
                { role: 'Body', mobile: '16px', desktop: '18px', font: 'inter' },
                { role: 'Body (custom)', mobile: '15px', desktop: '17px', font: 'inter' },
                { role: 'Small / caption', mobile: '13px', desktop: '15px', font: 'inter' },
                { role: 'Button text', mobile: '14px', desktop: '14px', font: 'inter-bold' },
                { role: 'Tags & chips', mobile: '14px', desktop: '14px', font: 'inter' },
                { role: 'Badge / label', mobile: '12px', desktop: '12px', font: 'inter-bold' },
              ].map((item) => (
                <div key={item.role} className="flex items-center gap-4 py-2" style={{ borderBottom: `1px solid ${dividerColor}` }}>
                  <span className="text-sm font-medium w-36 shrink-0" style={{ color: textColor }}>{item.role}</span>
                  <code className="text-[11px] px-1.5 py-0.5 rounded w-16 shrink-0 text-center" style={{ backgroundColor: chipBg, color: secondaryTextColor }}>
                    {item.mobile}
                  </code>
                  <code className="text-[11px] px-1.5 py-0.5 rounded w-16 shrink-0 text-center" style={{ backgroundColor: item.mobile !== item.desktop ? `${primaryColor}22` : chipBg, color: item.mobile !== item.desktop ? primaryColor : secondaryTextColor }}>
                    {item.desktop}
                  </code>
                  <span
                    className="truncate hidden md:block"
                    style={{
                      fontSize: Math.min(parseInt(item.desktop), 32) + 'px',
                      fontFamily: item.font === 'bungee' ? "var(--font-family-bungee), sans-serif" : 'inherit',
                      fontWeight: item.font === 'inter-bold' ? 700 : 400,
                      color: textColor,
                      lineHeight: 1.2,
                    }}
                  >
                    Aa
                  </span>
                </div>
              ))}
            </div>
          </>,
          'Typography'
        )}

        {/* ─── COMPONENTS ─── */}
        {sectionCard(
          <>
            {/* Nav Buttons */}
            <h3 className="text-lg font-semibold mb-3" style={{ color: primaryColor }}>Navigation Buttons</h3>
            <p className="text-sm mb-4" style={{ color: secondaryTextColor }}>Pill-shaped with 2px border. Active state shows border, inactive hides it.</p>
            <div className="flex flex-wrap gap-3 mb-8">
              <button className="px-3 py-1 border-2 rounded-full text-sm" style={{ borderColor: primaryColor, color: primaryColor }}>
                ACTIVE
              </button>
              <button className="px-3 py-1 border-2 rounded-full text-sm" style={{ borderColor: 'transparent', color: `${primaryColor}cc` }}>
                INACTIVE
              </button>
            </div>

            {/* CTA Buttons */}
            <h3 className="text-lg font-semibold mb-3" style={{ color: primaryColor }}>CTA Buttons</h3>
            <div className="flex flex-wrap gap-3 mb-8">
              <button className="px-4 py-2.5 rounded-full text-sm transition-all hover:scale-105 font-bold"
                style={{ backgroundColor: '#000000', color: '#ffffff', border: '2px solid #ffffff' }}>
                View Project
              </button>
              <button className="px-4 py-2.5 rounded-full text-sm transition-all hover:scale-105 font-bold"
                style={{ backgroundColor: buttonPrimaryColor, color: buttonTextColor }}>
                Accent CTA
              </button>
              <button className="px-4 py-2 rounded-full text-sm transition-all hover:scale-105 flex items-center gap-2"
                style={{ backgroundColor: chipBg, color: textColor }}>
                Secondary Action
              </button>
            </div>

            {/* Tags / Chips */}
            <h3 className="text-lg font-semibold mb-3" style={{ color: primaryColor }}>Tags &amp; Chips</h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {['UX Design', 'Prototyping', 'Systems', 'AI', 'Mobile'].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: chipBg, color: textColor }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Featured Badge */}
            <h3 className="text-lg font-semibold mb-3" style={{ color: primaryColor }}>Featured Badge</h3>
            <div className="mb-8">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
                style={{ backgroundColor: buttonPrimaryColor, color: buttonTextColor, border: `2px solid ${buttonPrimaryColor}` }}>
                <Star className="w-3 h-3" style={{ fill: buttonTextColor }} /> FEATURED
              </span>
            </div>

            {/* Contact Badges */}
            <h3 className="text-lg font-semibold mb-3" style={{ color: primaryColor }}>Contact Badges</h3>
            <div className="flex flex-wrap gap-2">
              {['Phone', 'LinkedIn', 'Email'].map((label) => (
                <span key={label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                  style={{ backgroundColor: chipBg, color: textColor }}>
                  {label}
                </span>
              ))}
            </div>
          </>,
          'Components'
        )}

        {/* ─── BORDER RADIUS ─── */}
        {sectionCard(
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { radius: '48px', label: 'Cards', className: 'rounded-[48px]' },
              { radius: '9999px', label: 'Buttons / Chips', className: 'rounded-full' },
              { radius: '24px', label: 'Mobile Menu', className: 'rounded-3xl' },
              { radius: '16px', label: 'Skeleton / Inner', className: 'rounded-2xl' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <div
                  className={`w-20 h-20 ${item.className}`}
                  style={{ backgroundColor: chipBg, border: `2px solid ${primaryColor}` }}
                />
                <span className="text-sm font-medium" style={{ color: textColor }}>{item.label}</span>
                <code className="text-[11px] px-1.5 py-0.5 rounded" style={{ backgroundColor: chipBg, color: secondaryTextColor }}>
                  {item.radius}
                </code>
              </div>
            ))}
          </div>,
          'Border Radius'
        )}

        {/* ─── SPACING & LAYOUT ─── */}
        {sectionCard(
          <>
            <h3 className="text-lg font-semibold mb-3" style={{ color: primaryColor }}>Page Structure</h3>
            <div className="space-y-0 mb-8">
              {tokenRow('Page padding', 'px-6 md:px-12 or md:px-16')}
              {tokenRow('Section padding', 'py-8 md:py-12')}
              {tokenRow('Max content width', 'max-w-7xl (80rem)')}
              {tokenRow('Card width', 'w-full md:w-[60%]')}
              {tokenRow('Card layout', 'Alternating justify-start / justify-end')}
            </div>

            <h3 className="text-lg font-semibold mb-3" style={{ color: primaryColor }}>Spacing Scale</h3>
            <p className="text-sm mb-4" style={{ color: secondaryTextColor }}>Tailwind default scale — values actually used in the codebase.</p>
            <div className="space-y-2">
              {[
                { name: 'gap-2', value: '0.5rem / 8px' },
                { name: 'gap-3', value: '0.75rem / 12px' },
                { name: 'gap-4', value: '1rem / 16px' },
                { name: 'gap-6', value: '1.5rem / 24px' },
                { name: 'mb-8 / gap-8', value: '2rem / 32px' },
                { name: 'mb-12 / space-y-12', value: '3rem / 48px' },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-3" style={{ borderBottom: `1px solid ${dividerColor}`, paddingBottom: 4 }}>
                  <code className="text-xs px-2 py-0.5 rounded w-36 shrink-0" style={{ backgroundColor: chipBg, color: secondaryTextColor }}>
                    {item.name}
                  </code>
                  <div className="h-3 rounded-full" style={{ backgroundColor: primaryColor, width: item.value.split(' / ')[0] }} />
                  <span className="text-xs" style={{ color: secondaryTextColor }}>{item.value}</span>
                </div>
              ))}
            </div>
          </>,
          'Spacing & Layout'
        )}

        {/* ─── SHADOWS & ELEVATION ─── */}
        {sectionCard(
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center gap-3">
              <div className="w-full h-24 rounded-[48px]" style={{ backgroundColor: cardBg, border: cardBorder, boxShadow: cardShadow }} />
              <span className="text-sm font-medium" style={{ color: textColor }}>Card Elevation</span>
              <code className="text-[11px] px-1.5 py-0.5 rounded text-center" style={{ backgroundColor: chipBg, color: secondaryTextColor }}>
                {cardShadow}
              </code>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-full h-24 rounded-2xl" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff', boxShadow: chromeShadow }} />
              <span className="text-sm font-medium" style={{ color: textColor }}>Chrome Elevation (Header/Footer)</span>
              <code className="text-[11px] px-1.5 py-0.5 rounded text-center" style={{ backgroundColor: chipBg, color: secondaryTextColor }}>
                {chromeShadow}
              </code>
            </div>
          </div>,
          'Shadows & Elevation'
        )}

        {/* ─── ACCESSIBILITY & MOTION ─── */}
        {sectionCard(
          <>
            <h3 className="text-lg font-semibold mb-3" style={{ color: primaryColor }}>Focus Indicators</h3>
            <p className="text-sm mb-3" style={{ color: secondaryTextColor }}>
              All interactive elements show a visible focus ring on keyboard navigation (WCAG 2.4.7).
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <button
                className="px-4 py-2 rounded-full text-sm font-bold"
                style={{ backgroundColor: buttonPrimaryColor, color: buttonTextColor }}
              >
                Tab to me
              </button>
              <code className="text-xs px-2 py-0.5 rounded self-center" style={{ backgroundColor: chipBg, color: secondaryTextColor }}>
                outline: 2px solid #4A90D9; outline-offset: 2px
              </code>
            </div>

            <h3 className="text-lg font-semibold mb-3" style={{ color: primaryColor }}>Hover Transitions</h3>
            <div className="space-y-0 mb-8">
              {tokenRow('Cards', 'hover:scale-[1.02]')}
              {tokenRow('Buttons', 'hover:scale-105')}
              {tokenRow('Icons', 'hover:scale-110')}
              {tokenRow('Theme change', 'transition-colors duration-500')}
            </div>

            <h3 className="text-lg font-semibold mb-3" style={{ color: primaryColor }}>Loading States</h3>
            <p className="text-sm mb-3" style={{ color: secondaryTextColor }}>
              Skeleton shimmer placeholders appear while images load, then fade in.
            </p>
            <div className="flex gap-4 mb-8">
              <div className="w-24 h-16 skeleton rounded-2xl" />
              <div className="flex flex-col justify-center gap-1">
                <code className="text-[11px] px-1.5 py-0.5 rounded" style={{ backgroundColor: chipBg, color: secondaryTextColor }}>
                  .skeleton — shimmer 1.5s infinite
                </code>
                <code className="text-[11px] px-1.5 py-0.5 rounded" style={{ backgroundColor: chipBg, color: secondaryTextColor }}>
                  .img-fade — opacity 0.3s ease
                </code>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-3" style={{ color: primaryColor }}>Reduced Motion</h3>
            <p className="text-sm" style={{ color: secondaryTextColor }}>
              All animations and transitions are disabled when <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: chipBg }}>prefers-reduced-motion: reduce</code> is active (WCAG 2.3.3).
            </p>
          </>,
          'Accessibility & Motion'
        )}

      </div>

      {/* Bottom spacer for Waves visibility */}
      <div className="h-[calc(60vh+50px)] md:h-[calc(70vh+50px)]" />
    </div>
  );
}
