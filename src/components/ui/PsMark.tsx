export function PsMark({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" role="img" aria-label="Pull Syndicate mark">
      <title>Pull Syndicate</title>
      <defs>
        <linearGradient id="ps-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#d8d8dc" />
          <stop offset="100%" stopColor="#8a8a92" />
        </linearGradient>
        <linearGradient id="ps-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f3d56a" />
          <stop offset="100%" stopColor="#d4af37" />
        </linearGradient>
      </defs>
      <path
        fill="url(#ps-gold)"
        d="M46 10 60 4l14 6 8-4 2 10-10 3 4 8-12-2-6 8-6-8-12 2 4-8-10-3 2-10z"
      />
      <path
        fill="url(#ps-metal)"
        d="M28 38h40c16 0 28 10 28 26 0 11-6 20-16 24l18 26H78L62 86H48v28H28V38zm20 32h16c8 0 12-4 12-10s-4-10-12-10H48v20z"
      />
    </svg>
  )
}
