import React from 'react';

export const ECMiniDrawing: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 100 70"
      className={className}
      role="img"
      aria-label="Illustration of EC Mini controller front panel with Setup button highlighted"
    >
      <defs>
        <linearGradient id="controllerBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="100%" stop-color="#EFF6F1" />
        </linearGradient>
        <filter id="miniShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(20,60,40,0.15)" />
        </filter>
      </defs>

      {/* Main Bezel */}
      <rect
        x="3"
        y="3"
        width="94"
        height="64"
        rx="10"
        fill="url(#controllerBody)"
        stroke="rgba(20, 60, 40, 0.2)"
        strokeWidth="1.2"
        filter="url(#miniShadow)"
      />

      {/* LCD Screen Display */}
      <rect
        x="10"
        y="12"
        width="46"
        height="26"
        rx="5"
        fill="#0F2B1D"
        stroke="#12804F"
        strokeWidth="0.8"
      />
      {/* EC Reading text on LCD */}
      <text
        x="33"
        y="29"
        textAnchor="middle"
        fill="#55EBB0"
        fontSize="13"
        fontWeight="600"
        fontFamily="'IBM Plex Mono', monospace"
      >
        1.72
      </text>

      {/* WiFi Indicator LED */}
      <circle cx="68" cy="18" r="3.2" fill="#E39A2D" />
      <text
        x="74"
        y="20"
        fill="#52645A"
        fontSize="6.5"
        fontWeight="600"
        fontFamily="'IBM Plex Sans', sans-serif"
      >
        WiFi
      </text>

      {/* Keypad Buttons */}
      {/* Button 1 */}
      <circle cx="18" cy="49" r="4.2" fill="#E2EBE5" stroke="#CAD7D0" strokeWidth="0.8" />
      {/* Button 2 */}
      <circle cx="32" cy="49" r="4.2" fill="#E2EBE5" stroke="#CAD7D0" strokeWidth="0.8" />

      {/* Button 3: Setup Button (Circled in green) */}
      <circle cx="48" cy="49" r="6.2" fill="none" stroke="#12804F" strokeWidth="1.8" />
      <circle cx="48" cy="49" r="4.2" fill="#FFFFFF" stroke="#12804F" strokeWidth="0.8" />
      <text
        x="48"
        y="62"
        textAnchor="middle"
        fill="#12804F"
        fontSize="6.5"
        fontWeight="700"
        fontFamily="'IBM Plex Sans', sans-serif"
      >
        Setup
      </text>
    </svg>
  );
};
