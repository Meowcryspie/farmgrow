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
        <Link to="/admin/devices" style={{ color: 'var(--color-accent-green)', fontWeight: 600 }}>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
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
            borderRadius: '14px',
            background: 'var(--color-accent-glow)',
            border: '1px solid var(--color-accent-green)',
            color: 'var(--color-accent-green)',
            fontSize: '14px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 4px 16px var(--color-accent-glow)',
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
            style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)' }}
          >
            ×
          </button>
        </div>
      )}

      {/* Top 4 Spec Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <div className="glass-card" style={{ padding: '16px' }}>
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>Claim Code</span>
          <span className="mono-val" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)' }}>{deviceId}</span>
        </div>
        <div className="glass-card" style={{ padding: '16px' }}>
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>Firmware</span>
          <span className="mono-val" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)' }}>1.3.1</span>
        </div>
        <div className="glass-card" style={{ padding: '16px' }}>
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>WiFi Signal</span>
          <span className="mono-val" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-accent-green)' }}>-62 dBm (Strong)</span>
        </div>
        <div className="glass-card" style={{ padding: '16px' }}>
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>Last Telemetry</span>
          <span className="mono-val" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)' }}>12s ago</span>
        </div>
      </div>

      {/* Historical Telemetry Chart */}
      <div className="glass-card" style={{ padding: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-text-main)' }}>
              Telemetry Trend (24h)
            </h2>
            <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
              Interactive scrubber showing EC drift vs configured setpoint
            </span>
          </div>
          <span className="pill pill-red">
            Peak 2.31 mS/cm
          </span>
        </div>

        <HistoryChart
          dataPoints={DEVICE_DETAIL_24H_EC}
          target={2.0}
          lowLimit={1.4}
          highLimit={2.2}
          timeRange="24h"
          highlightRedAboveLimit={true}
        />
      </div>

      {/* Controller Event & Diagnostic Log */}
      <div className="glass-card" style={{ padding: '20px' }}>
        <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '14px' }}>
          Event & Packet Log
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {DEVICE_MESSAGE_LOG.map((log, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '10px',
                background: 'var(--color-surface-elevated)',
                border: '1px solid var(--color-border-subtle)',
                fontSize: '13px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: log.isRefused
                      ? 'var(--color-red)'
                      : log.direction.startsWith('App')
                      ? 'var(--color-amber-tick)'
                      : 'var(--color-accent-green)',
                  }}
                />
                <span className="mono-val" style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>{log.topic}</span>
                <span style={{ color: 'var(--color-text-muted)' }}>—</span>
                <span style={{ color: log.isRefused ? 'var(--color-red)' : 'var(--color-text-main)' }}>{log.payload}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="pill pill-grey" style={{ fontSize: '11px' }}>{log.direction}</span>
                <span className="mono-val" style={{ color: 'var(--color-text-muted)', fontSize: '12px' }}>
                  {log.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
