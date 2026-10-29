import React from 'react';

interface QrProps {
  size?: number;
  showScanAnimation?: boolean;
}

export const QrCodeGraphic: React.FC<QrProps> = ({
  size = 260,
  showScanAnimation = true,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        margin: '0 auto',
      }}
    >
      <svg
        viewBox="0 0 260 260"
        width="100%"
        height="100%"
        role="img"
        aria-label="QR scanner frame with code"
      >
        <defs>
          <linearGradient id="scanBeam" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#12804F" stopOpacity="0" />
            <stop offset="100%" stopColor="#1FA66A" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Dark rounded container */}
        <rect x="0" y="0" width="260" height="260" rx="28" fill="#14201A" />

        {/* QR Code Matrix Elements */}
        {/* Top-Left Finder */}
        <rect x="36" y="36" width="56" height="56" rx="8" fill="#FFFFFF" />
        <rect x="44" y="44" width="40" height="40" rx="4" fill="#14201A" />
        <rect x="52" y="52" width="24" height="24" rx="2" fill="#FFFFFF" />

        {/* Top-Right Finder */}
        <rect x="168" y="36" width="56" height="56" rx="8" fill="#FFFFFF" />
        <rect x="176" y="44" width="40" height="40" rx="4" fill="#14201A" />
        <rect x="184" y="52" width="24" height="24" rx="2" fill="#FFFFFF" />

        {/* Bottom-Left Finder */}
        <rect x="36" y="168" width="56" height="56" rx="8" fill="#FFFFFF" />
        <rect x="44" y="176" width="40" height="40" rx="4" fill="#14201A" />
        <rect x="52" y="184" width="24" height="24" rx="2" fill="#FFFFFF" />

        {/* Scattered Modules */}
        <g fill="#FFFFFF">
          {/* Top row between finders */}
          <rect x="104" y="42" width="10" height="10" rx="2" />
          <rect x="120" y="42" width="10" height="10" rx="2" />
          <rect x="136" y="42" width="10" height="10" rx="2" />
          <rect x="104" y="62" width="10" height="10" rx="2" />
          <rect x="136" y="62" width="10" height="10" rx="2" />
          <rect x="120" y="76" width="10" height="10" rx="2" />

          {/* Center cluster */}
          <rect x="100" y="100" width="12" height="12" rx="2" />
          <rect x="120" y="100" width="12" height="12" rx="2" />
          <rect x="148" y="100" width="12" height="12" rx="2" />
          <rect x="46" y="104" width="10" height="10" rx="2" />
          <rect x="70" y="112" width="10" height="10" rx="2" />
          <rect x="180" y="108" width="12" height="12" rx="2" />
          <rect x="204" y="116" width="10" height="10" rx="2" />

          <rect x="108" y="124" width="10" height="10" rx="2" />
          <rect x="132" y="124" width="10" height="10" rx="2" />
          <rect x="120" y="144" width="12" height="12" rx="2" />
          <rect x="144" y="144" width="12" height="12" rx="2" />

          {/* Bottom right cluster */}
          <rect x="168" y="168" width="12" height="12" rx="2" />
          <rect x="188" y="168" width="10" height="10" rx="2" />
          <rect x="208" y="168" width="12" height="12" rx="2" />
          <rect x="168" y="188" width="10" height="10" rx="2" />
          <rect x="196" y="188" width="10" height="10" rx="2" />
          <rect x="180" y="208" width="12" height="12" rx="2" />
          <rect x="204" y="208" width="12" height="12" rx="2" />
          <rect x="108" y="196" width="10" height="10" rx="2" />
          <rect x="128" y="180" width="10" height="10" rx="2" />
        </g>

        {/* Green Corner Brackets */}
        <g stroke="#1FA66A" strokeWidth="4" strokeLinecap="round" fill="none">
          {/* Top-Left */}
          <path d="M 32 16 L 16 16 A 12 12 0 0 0 4 28 L 4 44" />
          {/* Top-Right */}
          <path d="M 228 16 L 244 16 A 12 12 0 0 1 256 28 L 256 44" />
          {/* Bottom-Left */}
          <path d="M 4 216 L 4 232 A 12 12 0 0 0 16 244 L 32 244" />
          {/* Bottom-Right */}
          <path d="M 256 216 L 256 232 A 12 12 0 0 1 244 244 L 228 244" />
        </g>

        {/* Center Green Scan Line */}
        <line
          x1="20"
          y1="130"
          x2="240"
          y2="130"
          stroke="#1FA66A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="4 0"
        />
      </svg>

      {/* Optional CSS pulsing scan line */}
      {showScanAnimation && (
        <div
          style={{
            position: 'absolute',
            left: '20px',
            right: '20px',
            top: '40px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #55EBB0, transparent)',
            boxShadow: '0 0 12px #55EBB0',
            animation: 'scanMove 2.6s infinite ease-in-out alternate',
          }}
        />
      )}

      <style>{`
        @keyframes scanMove {
          0% { top: 36px; opacity: 0.6; }
          50% { opacity: 1; }
          100% { top: 220px; opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};
