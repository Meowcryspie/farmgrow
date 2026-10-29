import React from 'react';

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
  const width = 310;
  const height = 142;
  const plotLeft = 34;
  const plotRight = 300;
  const plotTop = 10;
  const plotBottom = 120;

  const yMin = 1.2;
  const yMax = 2.6;

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

  // Build SVG path for line and area
  const points = dataPoints.map((val, i) => ({ x: getX(i), y: getY(val), val }));
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${plotRight} ${plotBottom} L ${plotLeft} ${plotBottom} Z`;

  const yTarget = getY(target);
  const yHigh = getY(highLimit);
  const yLow = getY(lowLimit);

  const lastPoint = points[points.length - 1] || { x: plotRight, y: plotBottom, val: 0 };
  const isAlarm = lastPoint.val > highLimit || lastPoint.val < lowLimit;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      style={{ overflow: 'visible' }}
      role="img"
      aria-label={`EC history chart over ${timeRange}`}
    >
      <defs>
        <linearGradient id="chartAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#12804F" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#12804F" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Grid Lines */}
      {/* High Limit Line */}
      <line
        x1={plotLeft}
        y1={yHigh}
        x2={plotRight}
        y2={yHigh}
        stroke="#E39A2D"
        strokeWidth="1.2"
        strokeDasharray="2 2"
      />
      {/* Target Line */}
      <line
        x1={plotLeft}
        y1={yTarget}
        x2={plotRight}
        y2={yTarget}
        stroke="#52645A"
        strokeWidth="1.2"
        strokeDasharray="4 3"
      />
      {/* Low Limit Line */}
      <line
        x1={plotLeft}
        y1={yLow}
        x2={plotRight}
        y2={yLow}
        stroke="#E39A2D"
        strokeWidth="1.2"
        strokeDasharray="2 2"
      />

      {/* Y Axis Labels */}
      <text x={plotLeft - 6} y={getY(2.6) + 3} textAnchor="end" fill="#52645A" fontSize="9.5" fontFamily="'IBM Plex Mono', monospace">
        2.6
      </text>
      <text x={plotLeft - 6} y={yHigh + 3} textAnchor="end" fill="#E39A2D" fontSize="9.5" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">
        {highLimit.toFixed(1)}
      </text>
      <text x={plotLeft - 6} y={yTarget + 3} textAnchor="end" fill="#14201A" fontSize="9.5" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">
        {target.toFixed(1)}
      </text>
      <text x={plotLeft - 6} y={yLow + 3} textAnchor="end" fill="#E39A2D" fontSize="9.5" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">
        {lowLimit.toFixed(1)}
      </text>

      {/* Filled Area */}
      <path d={areaPath} fill="url(#chartAreaGrad)" />

      {/* Main Curve Line */}
      <path
        d={linePath}
        fill="none"
        stroke={highlightRedAboveLimit && isAlarm ? '#C23B32' : '#12804F'}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Latest Point Indicator */}
      <circle
        cx={lastPoint.x}
        cy={lastPoint.y}
        r="4.5"
        fill={isAlarm ? '#C23B32' : '#12804F'}
        stroke="#FFFFFF"
        strokeWidth="1.8"
      />

      {/* X Axis Baseline */}
      <line x1={plotLeft} y1={plotBottom} x2={plotRight} y2={plotBottom} stroke="#DCE8E0" strokeWidth="1" />

      {/* X Axis Time Labels */}
      <text x={plotLeft} y={height - 6} textAnchor="start" fill="#52645A" fontSize="10" fontFamily="'IBM Plex Mono', monospace">
        {timeRange === '24h' ? '-24h' : '-7d'}
      </text>
      <text x={(plotLeft + plotRight) / 2} y={height - 6} textAnchor="middle" fill="#52645A" fontSize="10" fontFamily="'IBM Plex Mono', monospace">
        {timeRange === '24h' ? '-12h' : '-3.5d'}
      </text>
      <text x={plotRight} y={height - 6} textAnchor="end" fill="#52645A" fontSize="10" fontFamily="'IBM Plex Mono', monospace">
        Now
      </text>
    </svg>
  );
};
