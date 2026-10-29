import React from 'react';

interface LogoProps {
  showWordmark?: boolean;
  wordmarkSubtext?: string;
}

export const Logo: React.FC<LogoProps> = ({ showWordmark = true, wordmarkSubtext }) => {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
        <defs>
          <linearGradient id="logoMarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F6B42" />
            <stop offset="100%" stopColor="#12804F" />
          </linearGradient>
        </defs>
        <rect width="38" height="38" rx="12" fill="url(#logoMarkGrad)" />
        <path
          d="M19 10c3.5 4.5 6 7.2 6 10.2A6 6 0 0 1 13 20.2C13 17.2 15.5 14.5 19 10z"
          fill="#FFFFFF"
        />
      </svg>
      {showWordmark && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--color-text-main)',
              letterSpacing: '-0.3px',
              lineHeight: 1.1,
            }}
          >
            EC Link
          </span>
          {wordmarkSubtext && (
            <span
              style={{
                fontSize: '12px',
                color: 'var(--color-text-muted)',
                fontWeight: 500,
              }}
            >
              {wordmarkSubtext}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
