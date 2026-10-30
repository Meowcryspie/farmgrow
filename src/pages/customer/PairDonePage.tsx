import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressSegments } from '../../components/common/ProgressSegments';
import { useApp } from '../../context/AppContext';

export const PairDonePage: React.FC = () => {
  const navigate = useNavigate();
  const { pairingState, updatePairingState, showToast } = useApp();

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Device Paired Successfully', `${pairingState.tankName} has been attached to ${pairingState.farmChoice}`, 'success');
    navigate('/app');
  };

  return (
    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between' }}>
      <div>
        {/* Navigation Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => navigate('/pair/wifi')}
            aria-label="Back"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'var(--color-surface-elevated)',
              border: '1px solid var(--color-border-subtle)',
              color: 'var(--color-text-main)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <span style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--color-text-main)' }}>
            Step 3 of 3
          </span>

          <div style={{ width: '38px' }} />
        </div>

        {/* 3 Progress Segments (all filled) */}
        <ProgressSegments currentStep={3} totalSteps={3} />

        {/* Heading */}
        <h1
          style={{
            fontSize: '30px',
            fontWeight: 700,
            color: 'var(--color-text-main)',
            letterSpacing: '-0.5px',
            marginBottom: '6px',
          }}
        >
          EC Mini connected
        </h1>
        <p
          style={{
            fontSize: '14.5px',
            color: 'var(--color-text-muted)',
            marginBottom: '20px',
          }}
        >
          Device securely paired. Assign it to a farm and crop area.
        </p>

        {/* Glass Checklist with 4 Green Checks */}
        <div
          className="glass-card"
          style={{
            padding: '16px 18px',
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {/* Check 1 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'var(--color-accent-green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 10px var(--color-accent-glow)',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <span style={{ fontSize: '14.5px', color: 'var(--color-text-main)' }}>
                Device found
              </span>
            </div>
            <span className="mono-val" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>
              {pairingState.claimCode}
            </span>
          </div>

          {/* Check 2 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'var(--color-accent-green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 10px var(--color-accent-glow)',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <span style={{ fontSize: '14.5px', color: 'var(--color-text-main)' }}>
                Joined WiFi
              </span>
            </div>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>
              {pairingState.selectedWifi}
            </span>
          </div>

          {/* Check 3 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'var(--color-accent-green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 10px var(--color-accent-glow)',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <span style={{ fontSize: '14.5px', color: 'var(--color-text-main)' }}>
                Encrypted cloud sync
              </span>
            </div>
            <span style={{ fontSize: '13.5px', color: 'var(--color-accent-green)', fontWeight: 600 }}>
              TLS 1.3 Active
            </span>
          </div>

          {/* Check 4 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'var(--color-accent-green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 10px var(--color-accent-glow)',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <span style={{ fontSize: '14.5px', color: 'var(--color-text-main)' }}>
                First telemetry packet
              </span>
            </div>
            <span className="mono-val" style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--color-text-main)' }}>
              1.72 mS/cm
            </span>
          </div>
        </div>

        {/* Location & Naming Form */}
        <form onSubmit={handleFinish} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="field-group">
            <label className="field-label" htmlFor="farm-select">
              Farm
            </label>
            <select
              id="farm-select"
              className="field-select"
              value={pairingState.farmChoice}
              onChange={(e) => updatePairingState({ farmChoice: e.target.value })}
            >
              <option value="Farm One, Cameron Highlands">Farm One, Cameron Highlands</option>
              <option value="Farm Two, Kuala Selangor">Farm Two, Kuala Selangor</option>
              <option value="Add a new farm">+ Add a new farm</option>
            </select>
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="tank-name">
              Tank name
            </label>
            <input
              id="tank-name"
              type="text"
              className="field-input"
              value={pairingState.tankName}
              onChange={(e) => updatePairingState({ tankName: e.target.value })}
            />
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="crop-area">
              Crop or area
            </label>
            <input
              id="crop-area"
              type="text"
              className="field-input"
              value={pairingState.cropArea}
              onChange={(e) => updatePairingState({ cropArea: e.target.value })}
            />
          </div>

          <div style={{ paddingBottom: '24px', marginTop: '16px' }}>
            <button type="submit" className="btn-primary">
              Add to my farm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
