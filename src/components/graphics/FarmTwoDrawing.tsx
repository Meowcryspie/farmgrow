import React from 'react';
import { project, ptStr } from './isoUtils';

export const FarmTwoDrawing: React.FC<{ className?: string }> = ({ className = '' }) => {
  // 1. Ground slab (6x5, thickness 7)
  const gTop0 = project(0, 0, 7);
  const gTop1 = project(6, 0, 7);
  const gTop2 = project(6, 5, 7);
  const gTop3 = project(0, 5, 7);

  const gBot1 = project(6, 0, 0);
  const gBot2 = project(6, 5, 0);
  const gBot3 = project(0, 5, 0);

  // Helper to render rectangular boxes (beds, shed)
  const renderBox = (
    a0: number,
    b0: number,
    a1: number,
    b1: number,
    h: number,
    frontColor: string,
    sideColor: string,
    topColor: string,
    key: string
  ) => {
    const baseZ = 7;
    const topZ = baseZ + h;

    const p1Bot = project(a1, b0, baseZ);
    const p2Bot = project(a1, b1, baseZ);
    const p3Bot = project(a0, b1, baseZ);

    const p0Top = project(a0, b0, topZ);
    const p1Top = project(a1, b0, topZ);
    const p2Top = project(a1, b1, topZ);
    const p3Top = project(a0, b1, topZ);

    return (
      <g key={key}>
        {/* Front-left face (along b at a = a1) */}
        <polygon
          points={`${ptStr(p1Bot)} ${ptStr(p2Bot)} ${ptStr(p2Top)} ${ptStr(p1Top)}`}
          fill={frontColor}
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="0.6"
        />
        {/* Right face (along a at b = b1) */}
        <polygon
          points={`${ptStr(p3Bot)} ${ptStr(p2Bot)} ${ptStr(p2Top)} ${ptStr(p3Top)}`}
          fill={sideColor}
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="0.6"
        />
        {/* Top face */}
        <polygon
          points={`${ptStr(p0Top)} ${ptStr(p1Top)} ${ptStr(p2Top)} ${ptStr(p3Top)}`}
          fill={topColor}
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="0.6"
        />
      </g>
    );
  };

  // Render cylinder tank
  const renderTank = (a: number, b: number, key: string) => {
    const baseZ = 7;
    const height = 16;
    const r = 9;
    const ry = r / 2;

    const [cx, cyBase] = project(a, b, baseZ);
    const cyTop = cyBase - height;

    return (
      <g key={key}>
        {/* Body */}
        <path
          d={`M ${cx - r} ${cyTop} L ${cx - r} ${cyBase} A ${r} ${ry} 0 0 0 ${cx + r} ${cyBase} L ${cx + r} ${cyTop} Z`}
          fill="#3F9C9A"
          stroke="#2C7574"
          strokeWidth="0.8"
        />
        {/* Rim / Top ellipse */}
        <ellipse
          cx={cx}
          cy={cyTop}
          rx={r}
          ry={ry}
          fill="#9ADAD6"
          stroke="#2C7574"
          strokeWidth="0.8"
        />
        {/* Water ellipse */}
        <ellipse
          cx={cx}
          cy={cyTop + 2.2}
          rx={r - 1.5}
          ry={ry - 0.75}
          fill="#58BDB8"
        />
      </g>
    );
  };

  return (
    <svg
      viewBox="0 0 340 180"
      className={className}
      role="img"
      aria-label="2.5D Isometric drawing of Farm Two with four long crop beds, storage shed, and four tanks"
    >
      {/* Ground Slab Left Side */}
      <polygon
        points={`${ptStr(gTop1)} ${ptStr(gTop2)} ${ptStr(gBot2)} ${ptStr(gBot1)}`}
        fill="#3A4A29"
      />
      {/* Ground Slab Right Side */}
      <polygon
        points={`${ptStr(gTop2)} ${ptStr(gTop3)} ${ptStr(gBot3)} ${ptStr(gBot2)}`}
        fill="#2E3B20"
      />
      {/* Ground Slab Top (Earth-green) */}
      <polygon
        points={`${ptStr(gTop0)} ${ptStr(gTop1)} ${ptStr(gTop2)} ${ptStr(gTop3)}`}
        fill="#4A5C34"
      />

      {/* Bed 1: b from 0.5 to 1.0 */}
      {renderBox(0.6, 0.5, 4.2, 1.0, 6, '#7A5A3A', '#5E4329', '#5FB36A', 'bed-1')}

      {/* Bed 2: b from 1.4 to 1.9 */}
      {renderBox(0.6, 1.4, 4.2, 1.9, 6, '#7A5A3A', '#5E4329', '#5FB36A', 'bed-2')}

      {/* Shed: (4.5, 0.5 to 5.6, 2.0), height 24 */}
      {renderBox(4.5, 0.5, 5.6, 2.0, 24, '#DAD5C7', '#B7B1A1', '#EFECE2', 'shed')}

      {/* Bed 3: b from 2.3 to 2.8 */}
      {renderBox(0.6, 2.3, 4.2, 2.8, 6, '#7A5A3A', '#5E4329', '#5FB36A', 'bed-3')}

      {/* Bed 4: b from 3.2 to 3.7 */}
      {renderBox(0.6, 3.2, 4.2, 3.7, 6, '#7A5A3A', '#5E4329', '#5FB36A', 'bed-4')}

      {/* Four cylinder tanks at a = 1, 2, 3, 4 and b = 4.4 */}
      {renderTank(1, 4.4, 'tank-1')}
      {renderTank(2, 4.4, 'tank-2')}
      {renderTank(3, 4.4, 'tank-3')}
      {renderTank(4, 4.4, 'tank-4')}
    </svg>
  );
};
