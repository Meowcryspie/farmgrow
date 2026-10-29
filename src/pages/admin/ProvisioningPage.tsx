import React, { useState } from 'react';
import { PROVISIONING_WAITING } from '../../mockData';
import { QrCodeGraphic } from '../../components/graphics/QrCodeGraphic';
import { useApp } from '../../context/AppContext';

export const ProvisioningPage: React.FC = () => {
  const { batchNotice, registerBatch, clearBatchNotice } = useApp();

  const [hardwareModel, setHardwareModel] = useState('EC Mini, rev B');
  const [unitCount, setUnitCount] = useState(24);
  const [firmware, setFirmware] = useState('1.4.0 (latest)');
  const [distributor, setDistributor] = useState('');

  const handleInputChange = () => {
    if (batchNotice) {
      clearBatchNotice();
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const fwVersion = firmware.includes('1.4.0') ? '1.4.0' : '1.3.1';
    registerBatch(unitCount, fwVersion);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '30px', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.5px' }}>
          Provisioning
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
          Register new EC Mini units and print their pairing labels. Sample data.
        </p>
      </div>

      {/* 4 Process Step Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
        {/* Step 1 */}
        <div className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <span
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-accent-dark)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            1
          </span>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '3px' }}>
              Register
            </h3>
            <p style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', lineHeight: 1.35 }}>
              Create the device IDs and claim codes here.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <span
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-accent-dark)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            2
          </span>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '3px' }}>
              Label
            </h3>
            <p style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', lineHeight: 1.35 }}>
              Print the QR labels and stick one on each unit.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <span
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-accent-dark)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            3
          </span>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '3px' }}>
              Customer pairs
            </h3>
            <p style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', lineHeight: 1.35 }}>
              The customer scans the label and joins WiFi in the app.
            </p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <span
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-accent-dark)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            4
          </span>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '3px' }}>
              It appears
            </h3>
            <p style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', lineHeight: 1.35 }}>
              The device shows up in their farm and in your Devices list.
            </p>
          </div>
        </div>
      </div>

      {/* Main Provisioning Layout: 2 Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Left Column: Form and Sticker Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Register a batch Card */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '18px' }}>
              Register a batch
            </h2>

            {batchNotice && (
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(230, 246, 238, 0.95)',
                  border: '1px solid var(--color-accent-green)',
                  color: 'var(--color-accent-dark)',
                  fontSize: '13.5px',
                  fontWeight: 500,
                  marginBottom: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>
                  <strong>{batchNotice.count} devices</strong> registered in batch <strong>{batchNotice.batchId}</strong> with firmware <strong>{batchNotice.firmware}</strong>. The label sheet is ready to print.
                </span>
              </div>
            )}

            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="field-group">
                <label className="field-label" htmlFor="model-select">Hardware model</label>
                <select
                  id="model-select"
                  className="field-select"
                  value={hardwareModel}
                  onChange={(e) => {
                    setHardwareModel(e.target.value);
                    handleInputChange();
                  }}
                >
                  <option value="EC Mini, rev B">EC Mini, rev B</option>
                  <option value="EC Mini, rev A">EC Mini, rev A</option>
                </select>
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="units-count">Number of units</label>
                <input
                  id="units-count"
                  type="number"
                  className="field-input mono-val"
                  value={unitCount}
                  onChange={(e) => {
                    setUnitCount(parseInt(e.target.value) || 0);
                    handleInputChange();
                  }}
                  min="1"
                  max="1000"
                  required
                />
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="fw-select">Firmware to install</label>
                <select
                  id="fw-select"
                  className="field-select"
                  value={firmware}
                  onChange={(e) => {
                    setFirmware(e.target.value);
                    handleInputChange();
                  }}
                >
                  <option value="1.4.0 (latest)">1.4.0 (latest)</option>
                  <option value="1.3.1">1.3.1</option>
                </select>
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="distributor-input">Distributor (optional)</label>
                <input
                  id="distributor-input"
                  type="text"
                  className="field-input"
                  placeholder="Leave empty if not assigned"
                  value={distributor}
                  onChange={(e) => {
                    setDistributor(e.target.value);
                    handleInputChange();
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ height: '48px', marginTop: '10px' }}
              >
                Generate IDs and claim codes
              </button>
            </form>
          </div>

          {/* Label Preview Card */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '16px' }}>
              Label preview (example)
            </h2>

            {/* Sticker Graphic Container */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid rgba(20, 60, 40, 0.15)',
                padding: '20px',
                boxShadow: '0 8px 24px rgba(20, 60, 40, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <div style={{ width: '100px', height: '100px', flexShrink: 0 }}>
                <QrCodeGraphic size={100} showScanAnimation={false} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                  EC Mini
                </span>
                <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                  Device ID
                </span>
                <span className="mono-val" style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '0.5px' }}>
                  ECM-4F2A-91C7
                </span>
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px', lineHeight: 1.35 }}>
                  Scan with the EC Link app to pair this controller.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Waiting to be paired table */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)' }}>
              Waiting to be paired (9)
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.4, marginTop: '4px' }}>
              Registered units that no customer has claimed yet. A unit stuck after the scan usually has a WiFi problem.
            </p>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(20, 60, 40, 0.1)', textAlign: 'left', color: 'var(--color-text-muted)' }}>
                <th style={{ padding: '10px 8px 10px 0', fontWeight: 600 }}>Device ID</th>
                <th style={{ padding: '10px 8px', fontWeight: 600 }}>Registered</th>
                <th style={{ padding: '10px 8px', fontWeight: 600 }}>Waiting</th>
                <th style={{ padding: '10px 8px', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '10px 0 10px 8px', fontWeight: 600, textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {PROVISIONING_WAITING.map((w) => {
                const isWaitingWifi = w.status.includes('waiting for WiFi');

                return (
                  <tr key={w.deviceId} style={{ borderBottom: '1px solid rgba(20, 60, 40, 0.06)' }}>
                    <td className="mono-val" style={{ padding: '12px 8px 12px 0', fontWeight: 600, color: 'var(--color-text-main)' }}>
                      {w.deviceId}
                    </td>
                    <td style={{ padding: '12px 8px', color: 'var(--color-text-main)' }}>
                      {w.registered}
                    </td>
                    <td style={{ padding: '12px 8px', color: 'var(--color-text-muted)' }}>
                      {w.waiting}
                    </td>
                    <td style={{ padding: '12px 8px' }}>
                      <span className={`pill ${isWaitingWifi ? 'pill-amber' : 'pill-grey'}`} style={{ padding: '3px 8px', fontSize: '12px' }}>
                        {w.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 0 12px 8px', textAlign: 'right' }}>
                      <button
                        onClick={() => alert(`Reprinting label for ${w.deviceId}...`)}
                        style={{
                          fontSize: '13px',
                          fontWeight: 600,
                          color: 'var(--color-accent-green)',
                          padding: '4px 8px',
                        }}
                      >
                        Reprint
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div style={{ marginTop: '18px', fontSize: '13px', color: 'var(--color-text-muted)' }}>
            Showing 6 of 9 waiting units.
          </div>
        </div>
      </div>
    </div>
  );
};
