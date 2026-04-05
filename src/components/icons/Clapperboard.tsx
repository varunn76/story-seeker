  const Clapperboard = ({ transform }: { transform?: string }) => (
    <g transform={transform}>
      <rect x="0" y="8" width="40" height="32" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M0 8 L40 0 L40 8 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 6 L10 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 4 L20 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M25 2 L30 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );

  export default Clapperboard;