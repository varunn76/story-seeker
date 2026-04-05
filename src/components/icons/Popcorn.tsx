  const Popcorn = ({ transform }: { transform?: string }) => (
    <g transform={transform}>
      <path d="M5 30 L35 30 L38 10 L2 10 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 10 Q10 2 15 5 Q20 0 25 5 Q30 2 30 10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="10" x2="14" y2="30" stroke="currentColor" strokeWidth="1" />
      <line x1="20" y1="10" x2="20" y2="30" stroke="currentColor" strokeWidth="1" />
      <line x1="28" y1="10" x2="26" y2="30" stroke="currentColor" strokeWidth="1" />
    </g>
  );

  export default Popcorn;