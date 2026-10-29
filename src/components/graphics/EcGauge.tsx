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
  const r = 120;
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

  // Value Arc
  const currentAngle = getAngle(ec);
  const endVal = getPoint(currentAngle, r);
  const valPath = `M ${startBg.x} ${startBg.y} A ${r} ${r} 0 0 1 ${endVal.x} ${endVal.y}`;

  // Tick generator
  const renderTick = (val: number, stroke: string, strokeWidth = 3, length = 14) => {
    const angle = getAngle(val);
    const pOuter = getPoint(angle, r + 4);
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
    green: '#12804F',
    amber: '#E39A2D',
    red: '#C23B32',
    grey: '#9EAEAA',
  };

  const activeColor = colorMap[statusColor];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg
        viewBox="0 0 300 175"
        width="100%"
        style={{ maxWidth: '300px', overflow: 'visible' }}
        role="img"
        aria-label={`EC Gauge: current reading ${ec.toFixed(2)} mS/cm, target ${target.toFixed(1)}`}
      >
        {/* Background Track Arc */}
        <path
          d={bgPath}
          fill="none"
          stroke="#DCE8E0"
          strokeWidth="14"
          strokeLinecap="round"
        />

        {/* Active Reading Arc */}
        <path
          d={valPath}
          fill="none"
          stroke={activeColor}
          strokeWidth="14"
          strokeLinecap="round"
        />

        {/* Low Alarm Tick */}
        {renderTick(lowLimit, '#E39A2D', 3.5, 14)}

        {/* High Alarm Tick */}
        {renderTick(highLimit, '#E39A2D', 3.5, 14)}

        {/* Target Tick (White / Contrasting) */}
        {renderTick(target, '#14201A', 4, 16)}

        {/* Scale Numbers at edges */}
        <text
          x="18"
          y="166"
          fill="#52645A"
          fontSize="11"
          fontWeight="500"
          fontFamily="'IBM Plex Mono', monospace"
        >
          1.0
        </text>
        <text
          x="272"
          y="166"
          fill="#52645A"
          fontSize="11"
          fontWeight="500"
          fontFamily="'IBM Plex Mono', monospace"
        >
          2.6
        </text>

        {/* Large EC Center Number */}
        <text
          x={cx}
          y={cy - 12}
          textAnchor="middle"
          fill={isOffline ? '#52645A' : '#14201A'}
          fontSize="44"
          fontWeight="600"
          fontFamily="'IBM Plex Mono', monospace"
        >
          {ec.toFixed(2)}
        </text>
        <text
          x={cx}
          y={cy + 8}
          textAnchor="middle"
          fill="#52645A"
          fontSize="13"
          fontWeight="500"
          fontFamily="'IBM Plex Sans', sans-serif"
        >
          mS/cm
        </text>
      </svg>
    </div>
  );
};
