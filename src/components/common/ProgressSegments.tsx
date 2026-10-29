import React from 'react';

interface ProgressSegmentsProps {
  currentStep: number;
  totalSteps?: number;
}

export const ProgressSegments: React.FC<ProgressSegmentsProps> = ({
  currentStep,
  totalSteps = 3,
}) => {
  return (
    <div style={{ display: 'flex', gap: '8px', width: '100%', margin: '14px 0 20px 0' }}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNum = index + 1;
        const isFilled = stepNum <= currentStep;
        return (
          <div
            key={index}
            style={{
              flex: 1,
              height: '4px',
              borderRadius: '2px',
              background: isFilled ? 'var(--color-accent-green)' : '#DCE8E0',
              transition: 'background 0.3s ease',
            }}
          />
        );
      })}
    </div>
  );
};
