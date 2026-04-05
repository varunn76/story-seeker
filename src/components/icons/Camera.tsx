  const Camera = ({ transform }: { transform?: string }) => (
    <g transform={transform}>
      <rect x="5" y="10" width="20" height="15" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="5" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="22" cy="5" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M25 12 L32 8 L32 22 L25 18 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </g>
  );

  export default Camera;