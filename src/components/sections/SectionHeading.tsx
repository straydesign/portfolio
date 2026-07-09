import TextCard from '../TextCard';

// Shared section header — small mono kicker over a calm Bungee heading,
// on a paper panel so it reads over the brick wall.
export default function SectionHeading({
  kicker,
  title,
  className = '',
}: {
  kicker: string;
  title: string;
  className?: string;
}) {
  return (
    <TextCard padding="md" className={`inline-block ${className}`}>
      <p
        className="font-mono text-[11px] uppercase tracking-[0.18em] mb-2"
        style={{ color: 'var(--ink-2)' }}
      >
        {kicker}
      </p>
      <h2
        className="leading-none tracking-wide font-black"
        style={{
          fontFamily: 'var(--font-family-bungee), sans-serif',
          color: 'var(--ink)',
          fontSize: 'clamp(1.6rem, 3.4vw, 2.5rem)',
        }}
      >
        {title}
      </h2>
    </TextCard>
  );
}
