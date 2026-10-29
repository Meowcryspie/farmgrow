import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  DEVICE_DETAIL_24H_EC,
  DEVICE_MESSAGE_LOG,
} from '../../mockData';
import { HistoryChart } from '../../components/graphics/HistoryChart';

export const DeviceDetailPage: React.FC = () => {
  const { deviceId = 'ECM-4F2A-91C7' } = useParams<{ deviceId: string }>();
  const [actionBanner, setActionBanner] = useState<string | null>(null);

  const handleAction = (msg: string) => {
    setActionBanner(msg);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: '13.5px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Link to="/admin/devices" style={{ color: 'var(--color-accent-green)', fontWeight: 500 }}>
          Devices
        </Link>
        <span>/</span>
        <span className="mono-val" style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>
          {deviceId}
        </span>
      </div>

      {/* Header and Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.4px' }}>
              Tank 2, Farm One
            </h1>
            <span className="pill pill-red">
              Alarm: above high limit
            </span>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
            GreenLeaf Agro, Cameron Highlands. Sample data.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            className="btn-secondary"
            onClick={() => handleAction('Test command sent. Waiting for the device to acknowledge.')}
          >
            Send test command
          </button>
          <button
            className="btn-secondary"
            onClick={() => handleAction('Restart requested. The device should reconnect in about 30 seconds.')}
          >
            Restart device
          </button>
          <button
            className="btn-danger-outline"
            onClick={() => handleAction('Revoking access needs a second confirmation in the real console.')}
          >
            Revoke access
          </button>
        </div>
      </div>

      {/* Action Banner Feedback */}
      {actionBanner && (
        <div
          style={{
            padding: '12px 18px',
            borderRadius: '12px',
            background: 'rgba(230, 246, 238, 0.95)',
            border: '1px solid var(--color-accent-green)',
            color: 'var(--color-accent-dark)',
            fontSize: '14px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 4px 12px rgba(18, 128, 79, 0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span>{actionBanner}</span>
          </div>
          <button
            onClick={() => setActionBanner(null)}
            style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-accent-dark)' }}
          >
            ×
          </button>
        </div>
      )}

      {/* 2x2 Grid of Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
        {/* Card 1: Live reading */}
        <div className="glass-card" style={{ padding: '22px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '12px' }}>
            Live reading
          </h2>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block' }}>
                EC (mS/cm)
              </span>
              <span className="mono-val" style={{ fontSize: '38px', fontWeight: 700, color: 'var(--color-red)', lineHeight: 1 }}>
                2.31
              </span>
            </div>

            <div style={{ display: 'flex', gap: '20px', fontSize: '13px' }}>
              <div>
                <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Target</span>
                <span className="mono-val" style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>2.0</span>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Alarm limits</span>
                <span className="mono-val" style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>1.4 to 2.2</span>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Temperature</span>
                <span className="mono-val" style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>23.1°C</span>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Doses per hour</span>
                <span className="mono-val" style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>5</span>
              </div>
            </div>
          </div>

          {/* 24-hour EC Graph with high limit violation highlight */}
          <HistoryChart
            dataPoints={DEVICE_DETAIL_24H_EC}
            target={2.0}
            lowLimit={1.4}
            highLimit={2.2}
            timeRange="24h"
            highlightRedAboveLimit={true}
          />
        </div>

        {/* Card 2: Connection */}
        <div className="glass-card" style={{ padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '16px' }}>
              Connection
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Status</span>
                <span className="pill pill-green" style={{ padding: '2px 10px' }}>Online</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Last message</span>
                <span style={{ color: 'var(--color-text-main)', fontWeight: 500 }}>8 seconds ago</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>WiFi network</span>
                <span style={{ color: 'var(--color-text-main)', fontWeight: 600 }}>GreenLeaf-2.4G</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Signal</span>
                <span style={{ color: 'var(--color-text-main)', fontWeight: 500 }}>
                  <strong className="mono-val">-61 dBm</strong>, good
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Server link</span>
                <span style={{ color: 'var(--color-text-main)', fontWeight: 500 }}>Encrypted, up 3 d 4 h</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Firmware</span>
                <span style={{ color: 'var(--color-amber)', fontWeight: 600 }}>
                  <span className="mono-val">1.3.1</span>, update available
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Hardware</span>
                <span style={{ color: 'var(--color-text-main)', fontWeight: 500 }}>EC Mini, rev B</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleAction('Firmware 1.4.0 queued. It installs when the pump is idle.')}
            className="btn-secondary"
            style={{ width: '100%', marginTop: '20px', justifyContent: 'center' }}
          >
            Update firmware to 1.4.0
          </button>
        </div>

        {/* Card 3: Message log */}
        <div className="glass-card" style={{ padding: '22px' }}>
          <div style={{ marginBottom: '14px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)' }}>
              Message log
            </h2>
            <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
              What the device and the app sent through the server. The controller refuses unsafe values.
            </span>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(20, 60, 40, 0.1)', textAlign: 'left', color: 'var(--color-text-muted)' }}>
                <th style={{ padding: '8px 10px 8px 0', fontWeight: 600 }}>Time</th>
                <th style={{ padding: '8px 10px', fontWeight: 600 }}>Direction</th>
                <th style={{ padding: '8px 10px', fontWeight: 600 }}>Topic</th>
                <th style={{ padding: '8px 0 8px 10px', fontWeight: 600 }}>Payload</th>
              </tr>
            </thead>
            <tbody>
              {DEVICE_MESSAGE_LOG.map((msg, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(20, 60, 40, 0.06)' }}>
                  <td className="mono-val" style={{ padding: '10px 10px 10px 0', color: 'var(--color-text-muted)' }}>
                    {msg.time}
                  </td>
                  <td style={{ padding: '10px 10px', color: 'var(--color-text-main)' }}>
                    {msg.direction}
                  </td>
                  <td className="mono-val" style={{ padding: '10px 10px', color: 'var(--color-accent-green)', fontWeight: 600 }}>
                    {msg.topic}
                  </td>
                  <td
                    className="mono-val"
                    style={{
                      padding: '10px 0 10px 10px',
                      color: msg.isRefused ? 'var(--color-red)' : 'var(--color-text-main)',
                      fontWeight: msg.isRefused ? 600 : 400,
                    }}
                  >
                    {msg.payload}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card 4: Ownership and access */}
        <div className="glass-card" style={{ padding: '22px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '16px' }}>
            Ownership and access
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13.5px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Customer</span>
              <span style={{ color: 'var(--color-text-main)', fontWeight: 600 }}>GreenLeaf Agro Sdn. Bhd.</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Farm</span>
              <span style={{ color: 'var(--color-text-main)', fontWeight: 600 }}>Farm One, Cameron Highlands</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Owner</span>
              <span style={{ color: 'var(--color-text-main)' }}>Amir Hakim</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Paired on</span>
              <span style={{ color: 'var(--color-text-main)' }}>14 Sep 2026</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Also has access</span>
              <span style={{ color: 'var(--color-text-main)' }}>Farah N. (viewer)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
