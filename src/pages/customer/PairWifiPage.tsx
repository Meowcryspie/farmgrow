import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressSegments } from '../../components/common/ProgressSegments';
import { SignalBars } from '../../components/common/SignalBars';
import { ECMiniDrawing } from '../../components/graphics/ECMiniDrawing';
import { WIFI_NETWORKS } from '../../mockData';
import { useApp } from '../../context/AppContext';

export const PairWifiPage: React.FC = () => {
  const navigate = useNavigate();
  const { pairingState, updatePairingState } = useApp();

  return (
    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between' }}>
      <div>
        {/* Navigation Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => navigate('/pair/scan')}
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
            Step 2 of 3
          </span>

          <div style={{ width: '38px' }} />
        </div>

        {/* 3 Progress Segments (2 filled) */}
        <ProgressSegments currentStep={2} totalSteps={3} />

        {/* Heading */}
        <h1
          style={{
            fontSize: '30px',
            fontWeight: 700,
            color: 'var(--color-text-main)',
            letterSpacing: '-0.5px',
            marginBottom: '20px',
          }}
        >
          Connect it to WiFi
        </h1>

        {/* Instruction Card with EC Mini Drawing */}
        <div
          className="glass-card"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '16px',
            marginBottom: '24px',
          }}
        >
          <div style={{ width: '90px', flexShrink: 0 }}>
            <ECMiniDrawing />
          </div>
          <p style={{ fontSize: '14px', lineHeight: 1.45, color: 'var(--color-text-main)' }}>
            Hold the <strong>Setup</strong> button for 5 seconds, until the WiFi light blinks.
          </p>
        </div>

        {/* WiFi Networks List */}
        <div style={{ marginBottom: '20px' }}>
          <label className="field-label" style={{ display: 'block', marginBottom: '8px' }}>
            Choose your network
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {WIFI_NETWORKS.map((net) => {
              const isSelected = pairingState.selectedWifi === net.ssid;
              return (
                <div
                  key={net.ssid}
                  onClick={() => updatePairingState({ selectedWifi: net.ssid })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-input)',
                    background: isSelected ? 'rgba(230, 246, 238, 0.7)' : 'rgba(255, 255, 255, 0.85)',
                    border: isSelected
                      ? '2px solid var(--color-accent-green)'
                      : '1px solid var(--color-border-input)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <SignalBars bars={net.bars} showText={false} />
                    <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-main)' }}>
                      {net.ssid}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {net.locked && (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#52645A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    )}
                    {isSelected && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-green)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* WiFi Password Field */}
        <div className="field-group">
          <label className="field-label" htmlFor="wifi-pass">
            WiFi password
          </label>
          <input
            id="wifi-pass"
            type="password"
            className="field-input"
            value={pairingState.wifiPassword}
            onChange={(e) => updatePairingState({ wifiPassword: e.target.value })}
          />
          <span className="field-helper" style={{ marginTop: '4px' }}>
            EC Mini works on 2.4 GHz WiFi only.
          </span>
        </div>
      </div>

      {/* Primary Action Button */}
      <div style={{ paddingBottom: '24px', marginTop: '20px' }}>
        <button
          onClick={() => navigate('/pair/done')}
          className="btn-primary"
        >
          Connect device
        </button>
      </div>
    </div>
  );
};
