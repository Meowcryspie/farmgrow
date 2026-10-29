import React from 'react';

interface EcGaugeProps {
  ec: number;
  target: number;
  lowLimit: number;
  highLimit: number;
  statusColor: 'green' | 'amber' | 'red' | 'grey';
  isOffline?: boolean;
}

export const EcGauge: React.FC<EcGaugeProps> = ({
  ec,
  target,
  lowLimit,
  highLimit,
  statusColor,
  isOffline = false,
}) => {
  const cx = 150;
  const cy = 150;
  const r = 118;
  const minVal = 1.0;
  const maxVal = 2.6;
  const range = maxVal - minVal;

  const getAngle = (val: number) => {
    const clamped = Math.max(minVal, Math.min(maxVal, val));
    return Math.PI * (1 - (clamped - minVal) / range);
  };

  const getPoint = (angle: number, radius: number) => {
    return {
      x: cx + radius * Math.cos(angle),
      y: cy - radius * Math.sin(angle),
    };
  };

  // Base background arc (from 1.0 to 2.6)
  const startBg = getPoint(Math.PI, r);
  const endBg = getPoint(0, r);
  const bgPath = `M ${startBg.x} ${startBg.y} A ${r} ${r} 0 0 1 ${endBg.x} ${endBg.y}`;

  // Safe corridor arc (from lowLimit to highLimit)
  const angleLow = getAngle(lowLimit);
  const angleHigh = getAngle(highLimit);
  const pSafeStart = getPoint(angleLow, r);
  const pSafeEnd = getPoint(angleHigh, r);
  const safeArc = `M ${pSafeStart.x} ${pSafeStart.y} A ${r} ${r} 0 0 1 ${pSafeEnd.x} ${pSafeEnd.y}`;

  // Current reading arc
  const currentAngle = getAngle(ec);
  const endVal = getPoint(currentAngle, r);
  const valPath = `M ${startBg.x} ${startBg.y} A ${r} ${r} 0 0 1 ${endVal.x} ${endVal.y}`;

  // Tick generator
  const renderTick = (val: number, stroke: string, strokeWidth = 3, length = 14) => {
    const angle = getAngle(val);
    const pOuter = getPoint(angle, r + 5);
    const pInner = getPoint(angle, r - length);
    return (
      <line
        x1={pInner.x}
        y1={pInner.y}
        x2={pOuter.x}
        y2={pOuter.y}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    );
  };

  const colorMap = {
    green: 'var(--color-accent-green)',
    amber: 'var(--color-amber-tick)',
    red: 'var(--color-red)',
    grey: 'var(--color-track-grey)',
  };

  const activeColor = colorMap[statusColor];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      <svg
        viewBox="0 0 300 178"
        width="100%"
        style={{ maxWidth: '300px', overflow: 'visible' }}
        role="img"
        aria-label={`EC Gauge: current reading ${ec.toFixed(2)} mS/cm, target ${target.toFixed(1)}`}
      >
        <defs>
          <filter id="gaugeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor={activeColor} floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Outer subtle glow track */}
        <path
          d={bgPath}
          fill="none"
          stroke="var(--color-track-grey)"
          strokeWidth="15"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Shaded Safe Operating Corridor Arc Segment */}
        <path
          d={safeArc}
          fill="none"
          stroke="var(--color-accent-green)"
          strokeWidth="15"
          opacity="0.22"
        />

        {/* Active Reading Arc with Glow */}
        <path
          d={valPath}
          fill="none"
          stroke={activeColor}
          strokeWidth="15"
          strokeLinecap="round"
          filter="url(#gaugeGlow)"
          style={{ transition: 'all 0.4s ease-out' }}
        />

        {/* Low Alarm Tick */}
        {renderTick(lowLimit, 'var(--color-amber-tick)', 3.5, 14)}

        {/* High Alarm Tick */}
        {renderTick(highLimit, 'var(--color-amber-tick)', 3.5, 14)}

        {/* Target Tick (Prominent Notch) */}
        {renderTick(target, 'var(--color-text-main)', 4.5, 18)}

        {/* Scale Numbers at edges */}
        <text
          x="18"
          y="166"
          fill="var(--color-text-muted)"
          fontSize="11"
          fontWeight="600"
          fontFamily="var(--font-mono)"
        >
          1.0
        </text>
        <text
          x="272"
          y="166"
          fill="var(--color-text-muted)"
          fontSize="11"
          fontWeight="600"
          fontFamily="var(--font-mono)"
        >
          2.6
        </text>

        {/* Large EC Center Number with Telemetry Glow */}
        <text
          x={cx}
          y={cy - 12}
          textAnchor="middle"
          fill={isOffline ? 'var(--color-text-muted)' : 'var(--color-text-main)'}
          fontSize="46"
          fontWeight="700"
          fontFamily="var(--font-mono)"
          letterSpacing="-1px"
          style={{ transition: 'all 0.3s ease' }}
        >
          {ec.toFixed(2)}
        </text>

        <text
          x={cx}
          y={cy + 10}
          textAnchor="middle"
          fill="var(--color-text-muted)"
          fontSize="13"
          fontWeight="600"
          fontFamily="var(--font-sans)"
        >
          mS/cm
        </text>
      </svg>
    </div>
  );
};
