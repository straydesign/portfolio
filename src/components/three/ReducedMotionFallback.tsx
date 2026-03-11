interface ReducedMotionFallbackProps {
  isDark?: boolean;
}

export function ReducedMotionFallback({ isDark = true }: ReducedMotionFallbackProps) {
  return (
    <div
      className="fixed inset-0 z-0"
      style={{
        background: isDark
          ? "linear-gradient(180deg, #1a1412 0%, #0d0a08 50%, #1a1412 100%)"
          : "linear-gradient(180deg, #f0ede8 0%, #e5e0da 50%, #f0ede8 100%)",
      }}
    />
  );
}
