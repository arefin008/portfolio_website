type IconName =
  | "menu"
  | "fingerprint"
  | "terminal"
  | "cpu"
  | "lightbulb"
  | "grid"
  | "globe"
  | "server"
  | "database"
  | "code2"
  | "palette"
  | "smartphone"
  | "layers"
  | "zap"
  | "arrowUpRight"
  | "arrowRight"
  | "externalLink"
  | "github"
  | "linkedin"
  | "facebook"
  | "phone"
  | "mail"
  | "arrowUp"
  | "graduationCap"
  | "search"
  | "penTool"
  | "rocket"
  | "calendar"
  | "chevronDown";

const iconPaths: Record<IconName, React.ReactNode> = {
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  fingerprint: (
    <>
      <path d="M12 4a6 6 0 0 0-6 6c0 4 2 8 5 10" />
      <path d="M12 7a3 3 0 0 0-3 3c0 2 1 5 3 7" />
      <path d="M12 4a6 6 0 0 1 6 6c0 4-2 8-5 10" />
      <path d="M12 7a3 3 0 0 1 3 3c0 2-1 5-3 7" />
    </>
  ),
  terminal: (
    <>
      <path d="m5 7 5 5-5 5" />
      <path d="M13 17h6" />
    </>
  ),
  cpu: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M8 14a6 6 0 1 1 8 0c-1 1-2 2-2 4h-4c0-2-1-3-2-4Z" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18" />
      <path d="M12 3a15 15 0 0 0 0 18" />
    </>
  ),
  server: (
    <>
      <rect x="4" y="4" width="16" height="6" rx="1" />
      <rect x="4" y="14" width="16" height="6" rx="1" />
      <path d="M8 7h.01M8 17h.01M12 7h5M12 17h5" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="7" ry="3" />
      <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
      <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </>
  ),
  code2: (
    <>
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
      <path d="m14 4-4 16" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18h1a3 3 0 0 0 0-6h-1a2 2 0 0 1 0-4h2a4 4 0 0 0 0-8h-2Z" />
      <path d="M7.5 10h.01M8 6h.01M12 5h.01M16 8h.01" />
    </>
  ),
  smartphone: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 16 9 5 9-5" />
    </>
  ),
  zap: (
    <>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </>
  ),
  arrowUpRight: (
    <>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  externalLink: (
    <>
      <path d="M14 5h5v5" />
      <path d="M10 14 19 5" />
      <path d="M19 14v5H5V5h5" />
    </>
  ),
  github: (
    <>
      <path d="M9 19c-5 1.5-5-2.5-7-3" />
      <path d="M15 22v-3.9a3.4 3.4 0 0 0-.9-2.6c3 0 6-1.8 6-6.4A5 5 0 0 0 18.7 6 4.6 4.6 0 0 0 18.6 2S17 1.5 15 3.1a13.4 13.4 0 0 0-6 0C7 1.5 5.4 2 5.4 2A4.6 4.6 0 0 0 5.3 6 5 5 0 0 0 4 9.1c0 4.6 3 6.4 6 6.4a3.4 3.4 0 0 0-1 2.6V22" />
    </>
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-12h4v2" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  facebook: (
    <>
      <path d="M14 8h3V4h-3c-2.2 0-4 1.8-4 4v3H7v4h3v7h4v-7h3l1-4h-4V8c0-.6.4-1 1-1Z" />
    </>
  ),
  phone: (
    <>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.9 19.9 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.9 19.9 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.8l-1.3 1.3a16 16 0 0 0 6.4 6.4l1.3-1.3a2 2 0 0 1 1.8-.6l3 .5a2 2 0 0 1 1.7 2Z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  arrowUp: (
    <>
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </>
  ),
  graduationCap: (
    <>
      <path d="m3 9 9-5 9 5-9 5-9-5Z" />
      <path d="M7 11v4c0 1.7 2.2 3 5 3s5-1.3 5-3v-4" />
      <path d="M21 10v6" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  penTool: (
    <>
      <path d="m12 19 7-7 2 2-7 7-4 1 1-4Z" />
      <path d="m18 6 2-2 2 2-2 2-2-2Z" />
      <path d="M2 22h20" />
    </>
  ),
  rocket: (
    <>
      <path d="M4.5 19.5 9 15" />
      <path d="M14 10 9 15" />
      <path d="M15 9c1-4 5-6 7-6 0 2-2 6-6 7" />
      <path d="M9 15c-4 1-6 5-6 7 2 0 6-2 7-6" />
      <path d="M12 12 7 7c2-3 5-5 10-5 0 5-2 8-5 10Z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </>
  ),
  chevronDown: (
    <>
      <path d="m6 9 6 6 6-6" />
    </>
  ),
};

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
}
