import React from 'react';

interface SignalBarsProps {
  dbm?: number | null;
  bars?: number;
  showText?: boolean;
}

export const SignalBars: React.FC<SignalBarsProps> = ({ dbm, bars: directBars, showText = true }) => {
  let activeBars = 0;
  let text = 'No signal';

  if (directBars !== undefined) {
    activeBars = directBars;
  } else if (dbm !== null && dbm !== undefined) {
    if (dbm >= -60) activeBars = 4;
    else if (dbm >= -70) activeBars = 3;
    else if (dbm >= -80) activeBars = 2;
    else activeBars = 1;

    text = `${dbm} dBm`;
  }

  const heights = [4, 7, 10, 13];

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
      <svg width="18" height="14" viewBox="0 0 18 14" fill="none" role="img" aria-label={`Signal strength: ${activeBars} of 4 bars`}>
        {heights.map((h, i) => {
          const isFilled = i < activeBars;
          return (
            <rect
              key={i}
              x={i * 4.5}
              y={14 - h}
              width="3"
              height={h}
              rx="1.2"
              fill={isFilled ? 'var(--color-accent-green)' : '#DCE8E0'}
            />
          );
        })}
      </svg>
      {showText && (
        <span
          style={{
            fontSize: '13px',
            color: activeBars === 0 ? 'var(--color-text-muted)' : 'var(--color-text-main)',
            fontFamily: activeBars > 0 ? 'var(--font-mono)' : 'var(--font-sans)',
          }}
        >
          {activeBars === 0 ? 'No signal' : text}
        </span>
      )}
    </div>
  );
};
