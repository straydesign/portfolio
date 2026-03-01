interface MiddlemanLogoProps {
  color?: string;
  className?: string;
}

export default function MiddlemanLogo({ color = 'currentColor', className = '' }: MiddlemanLogoProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 210" width="900" height="630" className={className} style={{ color }}>
      <g fill="currentColor">
        <rect x="24" y="10" width="84" height="150" rx="4"/>
        <rect x="16" y="164" width="108" height="14" rx="2"/>
        <rect x="118" y="150" width="20" height="26" rx="3"/>
      </g>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M128 158 L168 104" strokeWidth="10"/>
        <path d="M152 104 H184" strokeWidth="10"/>
      </g>
      <g fill="currentColor">
        <circle cx="30" cy="182" r="7"/>
        <circle cx="124" cy="182" r="7"/>
      </g>
      <g fill="currentColor">
        <circle cx="210" cy="34" r="14"/>
        <rect x="196" y="50" width="28" height="62" rx="14"/>
      </g>
      <polyline points="198,112 174,140 166,182" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="220,112 198,140 216,182" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="202,60 180,82 152,104" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="222,60 208,84 184,104" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
