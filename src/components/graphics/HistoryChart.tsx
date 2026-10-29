import React, { useState, useRef } from 'react';

interface HistoryChartProps {
  dataPoints: number[];
  target: number;
  lowLimit?: number;
  highLimit?: number;
  timeRange: '24h' | '7d';
  highlightRedAboveLimit?: boolean;
}

export const HistoryChart: React.FC<HistoryChartProps> = ({
  dataPoints,
  target,
  lowLimit = 1.4,
  highLimit = 2.2,
  timeRange,
  highlightRedAboveLimit = false,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const width = 320;
  const height = 154;
  const plotLeft = 34;
  const plotRight = 308;
  const plotTop = 16;
  const plotBottom = 126;

  const yMin = 1.1;
  const yMax = 2.7;

  const getY = (val: number) => {
    const clamped = Math.max(yMin, Math.min(yMax, val));
    const ratio = (clamped - yMin) / (yMax - yMin);
    return plotBottom - ratio * (plotBottom - plotTop);
  };

  const getX = (index: number) => {
    if (dataPoints.length <= 1) return plotLeft;
    const ratio = index / (dataPoints.length - 1);
    return plotLeft + ratio * (plotRight - plotLeft);
  };

  // Build SVG path points
  const points = dataPoints.map((val, i) => ({ x: getX(i), y: getY(val), val, index: i }));
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const areaPath = `${linePath} L ${plotRight} ${plotBottom} L ${plotLeft} ${plotBottom} Z`;

  const yTarget = getY(target);
  const yHigh = getY(highLimit);
  const yLow = getY(lowLimit);

  // Safe corridor rect
  const safeZoneHeight = Math.abs(yLow - yHigh);
  const safeZoneTop = Math.min(yLow, yHigh);

  const activePoint = hoverIndex !== null && points[hoverIndex] ? points[hoverIndex] : points[points.length - 1];
  const isAlarm = activePoint ? activePoint.val > highLimit || activePoint.val < lowLimit : false;
  const deltaFromTarget = activePoint ? activePoint.val - target : 0;

  // Pointer interactions for the scrubber
  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!svgRef.current || dataPoints.length === 0) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const svgX = (clientX / rect.width) * width;

    // Find nearest point
    let closestIdx = 0;
    let minDistance = Infinity;
    points.forEach((pt, i) => {
      const dist = Math.abs(pt.x - svgX);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = i;
      }
    });
    setHoverIndex(closestIdx);
  };

  const handlePointerLeave = () => {
    setHoverIndex(null);
  };

  const getTimeLabelForIndex = (idx: number) => {
    if (idx === dataPoints.length - 1) return 'Just now';
    const totalHours = timeRange === '24h' ? 24 : 168;
    const hoursAgo = Math.round(((dataPoints.length - 1 - idx) / (dataPoints.length - 1)) * totalHours * 10) / 10;
    return `${hoursAgo}h ago`;
  };

  return (
    <div style={{ position: 'relative', width: '100%', userSelect: 'none' }}>
      {/* Floating HUD Scrubber Tooltip */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 10px',
          borderRadius: '10px',
          background: 'rgba(255, 255, 255, 0.45)',
          border: '1px solid var(--color-border-subtle)',
          marginBottom: '8px',
          fontSize: '12.5px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: 'var(--color-text-muted)' }}>
            {hoverIndex !== null ? getTimeLabelForIndex(hoverIndex) : 'Latest reading'}:
          </span>
          <strong
            className="mono-val"
            style={{
              fontSize: '14.5px',
              color: isAlarm ? 'var(--color-red)' : 'var(--color-text-main)',
            }}
          >
            {activePoint ? activePoint.val.toFixed(2) : '0.00'} mS/cm
          </strong>
        </div>

        <span
          className="mono-val"
          style={{
            fontSize: '11px',
            fontWeight: 600,
            color:
              Math.abs(deltaFromTarget) <= 0.1
                ? 'var(--color-accent-green)'
                : isAlarm
                ? 'var(--color-red)'
                : 'var(--color-amber)',
          }}
        >
          {deltaFromTarget >= 0 ? `+${deltaFromTarget.toFixed(2)}` : deltaFromTarget.toFixed(2)} vs target
        </span>
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        style={{ overflow: 'visible', cursor: 'crosshair', touchAction: 'none' }}
        role="img"
        aria-label={`Interactive EC history chart over ${timeRange}`}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <defs>
          {/* Glowing Area Gradient */}
          <linearGradient id="modernChartAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent-green)" stopOpacity="0.32" />
            <stop offset="65%" stopColor="var(--color-accent-green)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--color-accent-green)" stopOpacity="0.0" />
          </linearGradient>

          {/* Safe Corridor Tolerance Pattern/Gradient */}
          <linearGradient id="safeCorridorGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent-green)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--color-accent-green)" stopOpacity="0.03" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="var(--color-accent-green)" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* Shaded Target Safe Zone Band (Low Limit to High Limit) */}
        <rect
          x={plotLeft}
          y={safeZoneTop}
          width={plotRight - plotLeft}
          height={safeZoneHeight}
          fill="url(#safeCorridorGrad)"
          rx="4"
        />

        {/* High Alarm Limit Line */}
        <line
          x1={plotLeft}
          y1={yHigh}
          x2={plotRight}
          y2={yHigh}
          stroke="var(--color-amber-tick)"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          opacity="0.85"
        />

        {/* Target Line */}
        <line
          x1={plotLeft}
          y1={yTarget}
          x2={plotRight}
          y2={yTarget}
          stroke="var(--color-accent-green)"
          strokeWidth="1.2"
          strokeDasharray="4 3"
          opacity="0.75"
        />

        {/* Low Alarm Limit Line */}
        <line
          x1={plotLeft}
          y1={yLow}
          x2={plotRight}
          y2={yLow}
          stroke="var(--color-amber-tick)"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          opacity="0.85"
        />

        {/* Y Axis Labels */}
        <text x={plotLeft - 6} y={getY(2.6) + 3} textAnchor="end" fill="var(--color-text-muted)" fontSize="9.5" fontFamily="var(--font-mono)">
          2.6
        </text>
        <text x={plotLeft - 6} y={yHigh + 3} textAnchor="end" fill="var(--color-amber-tick)" fontSize="9.5" fontWeight="600" fontFamily="var(--font-mono)">
          {highLimit.toFixed(1)}
        </text>
        <text x={plotLeft - 6} y={yTarget + 3} textAnchor="end" fill="var(--color-accent-green)" fontSize="9.5" fontWeight="600" fontFamily="var(--font-mono)">
          {target.toFixed(1)}
        </text>
        <text x={plotLeft - 6} y={yLow + 3} textAnchor="end" fill="var(--color-amber-tick)" fontSize="9.5" fontWeight="600" fontFamily="var(--font-mono)">
          {lowLimit.toFixed(1)}
        </text>

        {/* Filled Curve Area */}
        <path d={areaPath} fill="url(#modernChartAreaGrad)" />

        {/* Main Telemetry Curve Line */}
        <path
          d={linePath}
          fill="none"
          stroke={highlightRedAboveLimit && isAlarm ? 'var(--color-red)' : 'var(--color-accent-green)'}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#lineGlow)"
        />

        {/* Scrubber Cursor Vertical Line */}
        {activePoint && (
          <g>
            <line
              x1={activePoint.x}
              y1={plotTop}
              x2={activePoint.x}
              y2={plotBottom}
              stroke="var(--color-accent-green)"
              strokeWidth="1.5"
              strokeDasharray="3 2"
              opacity="0.7"
            />
            {/* Outer halo */}
            <circle
              cx={activePoint.x}
              cy={activePoint.y}
              r="7.5"
              fill="none"
              stroke={isAlarm ? 'var(--color-red)' : 'var(--color-accent-green)'}
              strokeWidth="1.5"
              opacity="0.5"
            />
            {/* Inner dot */}
            <circle
              cx={activePoint.x}
              cy={activePoint.y}
              r="4.5"
              fill={isAlarm ? 'var(--color-red)' : 'var(--color-accent-green)'}
              stroke="#FFFFFF"
              strokeWidth="2"
            />
          </g>
        )}

        {/* X Axis Baseline */}
        <line x1={plotLeft} y1={plotBottom} x2={plotRight} y2={plotBottom} stroke="var(--color-border-subtle)" strokeWidth="1" />

        {/* X Axis Time Labels */}
        <text x={plotLeft} y={height - 6} textAnchor="start" fill="var(--color-text-muted)" fontSize="10" fontFamily="var(--font-mono)">
          {timeRange === '24h' ? '-24h' : '-7d'}
        </text>
        <text x={(plotLeft + plotRight) / 2} y={height - 6} textAnchor="middle" fill="var(--color-text-muted)" fontSize="10" fontFamily="var(--font-mono)">
          {timeRange === '24h' ? '-12h' : '-3.5d'}
        </text>
        <text x={plotRight} y={height - 6} textAnchor="end" fill="var(--color-text-muted)" fontSize="10" fontFamily="var(--font-mono)">
          Now
        </text>
      </svg>
    </div>
  );
};
