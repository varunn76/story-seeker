  const FilmReel = ({ transform }: { transform?: string }) => (
    <g transform={transform}>
      <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="32" cy="20" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="20" cy="32" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8" cy="20" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </g>
  );

  export default FilmReel;