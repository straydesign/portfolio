import TextCard from '../TextCard';

// Shared section header — small mono kicker over a calm display heading.
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
        className="text-[15px] md:text-base italic mb-2"
        style={{ color: 'var(--ink-2)', fontFamily: 'var(--font-display)' }}
      >
        {kicker}
      </p>
      <h2
        className="leading-none tracking-wide font-black"
        style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--ink)',
          fontSize: 'clamp(1.6rem, 3.4vw, 2.5rem)',
        }}
      >
        {title}
      </h2>
    </TextCard>
  );
}
