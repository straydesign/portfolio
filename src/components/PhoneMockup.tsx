'use client';

interface PhoneMockupProps {
  screenshot: string;
  gradientFrom?: string;
  gradientTo?: string;
  title?: string;
  description?: string;
  alt?: string;
  textColor?: string;
  onClick?: () => void;
}

export default function PhoneMockup({
  screenshot,
  gradientFrom = '#0066FF',
  gradientTo = '#000000',
  title,
  description,
  alt = 'App screenshot',
  textColor,
  onClick,
}: PhoneMockupProps) {
  return (
    <div
      className={`flex flex-col items-center ${onClick ? 'cursor-pointer transition-opacity hover:opacity-90' : ''}`}
      onClick={onClick}
      role={onClick ? 'link' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
    >
      {/* Image on gradient */}
      <div
        className="w-full rounded-2xl overflow-hidden aspect-square max-h-[600px] flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        }}
      >
        <img
          src={screenshot}
          alt={alt}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          loading="lazy"
        />
      </div>

      {/* Title & description */}
      {(title || description) && (
        <div className="w-full mt-4" style={textColor ? { color: textColor } : undefined}>
          {title && (
            <p className="text-base md:text-lg font-bold">{title}</p>
          )}
          {description && (
            <p className="text-sm mt-1 opacity-70">{description}</p>
          )}
        </div>
      )}
    </div>
  );
}
