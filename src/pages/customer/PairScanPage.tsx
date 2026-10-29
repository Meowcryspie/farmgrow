import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressSegments } from '../../components/common/ProgressSegments';
import { QrCodeGraphic } from '../../components/graphics/QrCodeGraphic';
import { useApp } from '../../context/AppContext';

export const PairScanPage: React.FC = () => {
  const navigate = useNavigate();
  const { pairingState, updatePairingState } = useApp();

  return (
    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between' }}>
      <div>
        {/* Navigation Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => navigate('/signup')}
            aria-label="Back"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.7)',
              border: '1px solid var(--color-border-subtle)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <span style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--color-text-main)' }}>
            Step 1 of 3
          </span>

          <button
            onClick={() => navigate('/app')}
            style={{
              fontSize: '14.5px',
              fontWeight: 600,
              color: 'var(--color-accent-green)',
            }}
          >
            Skip
          </button>
        </div>

        {/* 3 Progress Segments (1 filled) */}
        <ProgressSegments currentStep={1} totalSteps={3} />

        {/* Heading */}
        <h1
          style={{
            fontSize: '30px',
            fontWeight: 700,
            color: 'var(--color-text-main)',
            letterSpacing: '-0.5px',
            marginBottom: '8px',
          }}
        >
          Add your EC Mini
        </h1>
        <p
          style={{
            fontSize: '14.5px',
            color: 'var(--color-text-muted)',
            lineHeight: 1.45,
            marginBottom: '24px',
          }}
        >
          Point the camera at the QR code on the label, on the side of the controller.
        </p>

        {/* Camera Viewport Graphic */}
        <div style={{ margin: '0 auto 28px auto' }}>
          <QrCodeGraphic size={260} showScanAnimation={true} />
        </div>

        {/* Manual Input Code */}
        <div className="field-group">
          <label className="field-label" htmlFor="code-input">
            Cannot scan? Type the code
          </label>
          <input
            id="code-input"
            type="text"
            className="field-input mono-val"
            style={{ letterSpacing: '1px', fontWeight: 600 }}
            value={pairingState.claimCode}
            onChange={(e) => updatePairingState({ claimCode: e.target.value })}
          />
        </div>
      </div>

      {/* Action Button */}
      <div style={{ paddingBottom: '24px', marginTop: '20px' }}>
        <button
          onClick={() => navigate('/pair/wifi')}
          className="btn-primary"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
