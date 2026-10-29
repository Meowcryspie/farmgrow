import React from 'react';
import { project, ptStr } from './isoUtils';

export const FarmOneDrawing: React.FC<{ className?: string }> = ({ className = '' }) => {
  // 1. Ground slab (6x5, thickness 7)
  const gTop0 = project(0, 0, 7);
  const gTop1 = project(6, 0, 7);
  const gTop2 = project(6, 5, 7);
  const gTop3 = project(0, 5, 7);

  const gBot1 = project(6, 0, 0);
  const gBot2 = project(6, 5, 0);
  const gBot3 = project(0, 5, 0);

  // Helper for greenhouse with peaked roof along `a`
  const renderGreenhouse = (a0: number, b0: number, a1: number, b1: number, key: string) => {
    const bMid = (b0 + b1) / 2;
    const wallH = 14 + 7; // height above ground (base is z=7)
    const ridgeH = 26 + 7;
    const baseZ = 7;

    // Walls
    const w1Bot = project(a1, b0, baseZ);
    const w2Bot = project(a1, b1, baseZ);
    const w3Bot = project(a0, b1, baseZ);

    const w0Top = project(a0, b0, wallH);
    const w1Top = project(a1, b0, wallH);
    const w2Top = project(a1, b1, wallH);
    const w3Top = project(a0, b1, wallH);

    // Ridge
    const rStart = project(a0, bMid, ridgeH);
    const rEnd = project(a1, bMid, ridgeH);

    return (
      <g key={key}>
        {/* Front-left wall (along b, at a = a1) */}
        <polygon
          points={`${ptStr(w1Bot)} ${ptStr(w2Bot)} ${ptStr(w2Top)} ${ptStr(w1Top)}`}
          fill="#8CBFA0"
          stroke="#2A5640"
          strokeWidth="0.8"
        />
        {/* Front gable triangle */}
        <polygon
          points={`${ptStr(w1Top)} ${ptStr(rEnd)} ${ptStr(w2Top)}`}
          fill="#8CBFA0"
          stroke="#2A5640"
          strokeWidth="0.8"
        />
        {/* Right side wall (along a, at b = b1) */}
        <polygon
          points={`${ptStr(w3Bot)} ${ptStr(w2Bot)} ${ptStr(w2Top)} ${ptStr(w3Top)}`}
          fill="#5E9477"
          stroke="#2A5640"
          strokeWidth="0.8"
        />
        {/* Roof slope (visible right side facing viewer) */}
        <polygon
          points={`${ptStr(rStart)} ${ptStr(rEnd)} ${ptStr(w2Top)} ${ptStr(w3Top)}`}
          fill="#BFE3CC"
          stroke="#2A5640"
          strokeWidth="0.8"
        />
        {/* Roof slope (left side) */}
        <polygon
          points={`${ptStr(rStart)} ${ptStr(rEnd)} ${ptStr(w1Top)} ${ptStr(w0Top)}`}
          fill="#CFEFE0"
          stroke="#2A5640"
          strokeWidth="0.8"
        />
      </g>
    );
  };

  // Cylinder tank
  const renderTank = (a: number, b: number, key: string) => {
    const baseZ = 7;
    const height = 20;
    const r = 10;
    const ry = r / 2;

    const [cx, cyBase] = project(a, b, baseZ);
    const cyTop = cyBase - height;

    return (
      <g key={key}>
        {/* Tank Body */}
        <path
          d={`M ${cx - r} ${cyTop} L ${cx - r} ${cyBase} A ${r} ${ry} 0 0 0 ${cx + r} ${cyBase} L ${cx + r} ${cyTop} Z`}
          fill="#4E8DB5"
          stroke="#33698A"
          strokeWidth="0.8"
        />
        {/* Tank Rim / Outer Top Ellipse */}
        <ellipse
          cx={cx}
          cy={cyTop}
          rx={r}
          ry={ry}
          fill="#A9D4F0"
          stroke="#33698A"
          strokeWidth="0.8"
        />
        {/* Water Level Inner Ellipse */}
        <ellipse
          cx={cx}
          cy={cyTop + 2.5}
          rx={r - 1.8}
          ry={ry - 0.9}
          fill="#6FB0DA"
        />
      </g>
    );
  };

  return (
    <svg
      viewBox="0 0 340 180"
      className={className}
      role="img"
      aria-label="2.5D Isometric drawing of Farm One with three greenhouses and two nutrient tanks"
    >
      {/* Ground Slab Left Side */}
      <polygon
        points={`${ptStr(gTop1)} ${ptStr(gTop2)} ${ptStr(gBot2)} ${ptStr(gBot1)}`}
        fill="#234632"
      />
      {/* Ground Slab Right Side */}
      <polygon
        points={`${ptStr(gTop2)} ${ptStr(gTop3)} ${ptStr(gBot3)} ${ptStr(gBot2)}`}
        fill="#1B3827"
      />
      {/* Ground Slab Top (Grass) */}
      <polygon
        points={`${ptStr(gTop0)} ${ptStr(gTop1)} ${ptStr(gTop2)} ${ptStr(gTop3)}`}
        fill="#2E5A3F"
      />

      {/* Greenhouses ordered back to front (a + b) */}
      {/* GH 1: (0.5, 0.5 to 2.3, 2.1) -> a+b ~ 1.0 to 4.4 */}
      {renderGreenhouse(0.5, 0.5, 2.3, 2.1, 'gh-1')}

      {/* GH 2: (3.0, 0.5 to 4.8, 2.1) -> a+b ~ 3.5 to 6.9 */}
      {renderGreenhouse(3.0, 0.5, 4.8, 2.1, 'gh-2')}

      {/* GH 3: (0.5, 2.9 to 2.3, 4.5) -> a+b ~ 3.4 to 6.8 */}
      {renderGreenhouse(0.5, 2.9, 2.3, 4.5, 'gh-3')}

      {/* Two Tanks at (4.1, 3.3) and (4.1, 4.3) */}
      {renderTank(4.1, 3.3, 'tank-1')}
      {renderTank(4.1, 4.3, 'tank-2')}
    </svg>
  );
};
