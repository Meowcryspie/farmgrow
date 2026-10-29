import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FLEET_KPI,
  FLEET_ONLINE_24H_POINTS,
  FLEET_LOCATIONS,
  ATTENTION_LIST,
  RECENT_ACTIVITY,
} from '../../mockData';

export const FleetOverviewPage: React.FC = () => {
  const navigate = useNavigate();

  // Draw 24h Area Graph
  const renderOnlineGraph = () => {
    const width = 500;
    const height = 150;
    const plotLeft = 45;
    const plotRight = 480;
    const plotTop = 20;
    const plotBottom = 125;

    const yMin = 90;
    const yMax = 100;

    const getY = (val: number) => {
      const ratio = (val - yMin) / (yMax - yMin);
      return plotBottom - ratio * (plotBottom - plotTop);
    };

    const getX = (idx: number) => {
      const ratio = idx / (FLEET_ONLINE_24H_POINTS.length - 1);
      return plotLeft + ratio * (plotRight - plotLeft);
    };

    const points = FLEET_ONLINE_24H_POINTS.map((val, idx) => ({ x: getX(idx), y: getY(val), val }));
    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaPath = `${linePath} L ${plotRight} ${plotBottom} L ${plotLeft} ${plotBottom} Z`;

    const dipPoint = points[7]; // 92.1% at -12h

    return (
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" role="img" aria-label="Share of paired devices online line chart">
        <defs>
          <linearGradient id="adminAreaGrad" x1="0%" y1="0%" x2="0%" y2="1">
            <stop offset="0%" stopColor="#12804F" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#12804F" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        <line x1={plotLeft} y1={getY(100)} x2={plotRight} y2={getY(100)} stroke="rgba(20, 60, 40, 0.08)" strokeWidth="1" />
        <line x1={plotLeft} y1={getY(95)} x2={plotRight} y2={getY(95)} stroke="rgba(20, 60, 40, 0.08)" strokeWidth="1" />
        <line x1={plotLeft} y1={getY(90)} x2={plotRight} y2={getY(90)} stroke="rgba(20, 60, 40, 0.08)" strokeWidth="1" />

        {/* Y Axis labels */}
        <text x={plotLeft - 8} y={getY(100) + 4} textAnchor="end" fill="#52645A" fontSize="10" fontFamily="'IBM Plex Mono', monospace">100%</text>
        <text x={plotLeft - 8} y={getY(95) + 4} textAnchor="end" fill="#52645A" fontSize="10" fontFamily="'IBM Plex Mono', monospace">95%</text>
        <text x={plotLeft - 8} y={getY(90) + 4} textAnchor="end" fill="#52645A" fontSize="10" fontFamily="'IBM Plex Mono', monospace">90%</text>

        {/* Filled Area */}
        <path d={areaPath} fill="url(#adminAreaGrad)" />

        {/* Line Curve */}
        <path d={linePath} fill="none" stroke="#12804F" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

        {/* Dip marker at 92.1% */}
        <circle cx={dipPoint.x} cy={dipPoint.y} r="4" fill="#C23B32" stroke="#FFFFFF" strokeWidth="1.8" />
        <text x={dipPoint.x} y={dipPoint.y - 8} textAnchor="middle" fill="#C23B32" fontSize="10.5" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">
          92.1%
        </text>

        {/* X Axis baseline */}
        <line x1={plotLeft} y1={plotBottom} x2={plotRight} y2={plotBottom} stroke="#DCE8E0" strokeWidth="1" />

        {/* X Axis labels */}
        <text x={plotLeft} y={height - 6} textAnchor="start" fill="#52645A" fontSize="10" fontFamily="'IBM Plex Mono', monospace">-24h</text>
        <text x={getX(3)} y={height - 6} textAnchor="middle" fill="#52645A" fontSize="10" fontFamily="'IBM Plex Mono', monospace">-18h</text>
        <text x={getX(6)} y={height - 6} textAnchor="middle" fill="#52645A" fontSize="10" fontFamily="'IBM Plex Mono', monospace">-12h</text>
        <text x={getX(9)} y={height - 6} textAnchor="middle" fill="#52645A" fontSize="10" fontFamily="'IBM Plex Mono', monospace">-6h</text>
        <text x={plotRight} y={height - 6} textAnchor="end" fill="#52645A" fontSize="10" fontFamily="'IBM Plex Mono', monospace">Now</text>
      </svg>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '30px', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.5px' }}>
            Fleet overview
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
            All customers and locations. Sample data.
          </p>
        </div>

        {/* Search & Notification Bell */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search devices or customers"
              style={{
                width: '280px',
                height: '42px',
                padding: '0 16px',
                borderRadius: '12px',
                border: '1px solid var(--color-border-input)',
                background: 'rgba(255, 255, 255, 0.85)',
                fontSize: '13.5px',
                outline: 'none',
              }}
            />
          </div>

          <button
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.85)',
              border: '1px solid var(--color-border-input)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
            aria-label="Notifications"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span
              style={{
                position: 'absolute',
                top: '9px',
                right: '9px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-red)',
              }}
            />
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {/* Card 1: Registered */}
        <div className="glass-card" style={{ padding: '18px 20px' }}>
          <span style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
            Registered devices
          </span>
          <span className="mono-val" style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-text-main)', display: 'block', lineHeight: 1 }}>
            {FLEET_KPI.registered}
          </span>
          <span style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', marginTop: '8px', display: 'block' }}>
            {FLEET_KPI.registeredSubtitle}
          </span>
        </div>

        {/* Card 2: Online now */}
        <div className="glass-card" style={{ padding: '18px 20px' }}>
          <span style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
            Online now
          </span>
          <span className="mono-val" style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-accent-green)', display: 'block', lineHeight: 1 }}>
            {FLEET_KPI.onlineNow}
          </span>
          <span style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', marginTop: '8px', display: 'block' }}>
            {FLEET_KPI.onlineNowSubtitle}
          </span>
        </div>

        {/* Card 3: Need attention */}
        <div className="glass-card" style={{ padding: '18px 20px' }}>
          <span style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
            Need attention
          </span>
          <span className="mono-val" style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-red)', display: 'block', lineHeight: 1 }}>
            {FLEET_KPI.needAttention}
          </span>
          <span style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', marginTop: '8px', display: 'block' }}>
            {FLEET_KPI.needAttentionSubtitle}
          </span>
        </div>

        {/* Card 4: Waiting to be paired */}
        <div className="glass-card" style={{ padding: '18px 20px' }}>
          <span style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
            Waiting to be paired
          </span>
          <span className="mono-val" style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-amber)', display: 'block', lineHeight: 1 }}>
            {FLEET_KPI.waitingPair}
          </span>
          <span style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', marginTop: '8px', display: 'block' }}>
            {FLEET_KPI.waitingPairSubtitle}
          </span>
        </div>
      </div>

      {/* Middle Row: Online 24h & Locations */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
        {/* Card: Devices online, last 24 hours */}
        <div className="glass-card" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div>
              <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                Devices online, last 24 hours
              </h2>
              <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                Share of paired devices sending data
              </span>
            </div>
            <span className="mono-val" style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-accent-green)' }}>
              95.4%
            </span>
          </div>

          {renderOnlineGraph()}
        </div>

        {/* Card: Locations */}
        <div className="glass-card" style={{ padding: '22px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px' }}>
            Locations
          </h2>
          <span style={{ fontSize: '13px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '18px' }}>
            Devices online per site
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {FLEET_LOCATIONS.map((loc) => {
              const pct = (loc.online / loc.total) * 100;
              let barColor = 'var(--color-accent-green)';
              if (pct < 90) barColor = 'var(--color-red)';
              else if (pct < 95) barColor = 'var(--color-amber-tick)';

              return (
                <div key={loc.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '5px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>{loc.name}</span>
                    <span style={{ color: 'var(--color-text-muted)' }}>
                      <strong className="mono-val" style={{ color: 'var(--color-text-main)' }}>{loc.online}</strong> of {loc.total} online
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#DCE8E0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', backgroundColor: barColor, borderRadius: '3px' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Row: Needs attention & Recent activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
        {/* Needs attention Table */}
        <div className="glass-card" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-text-main)' }}>
              Needs attention
            </h2>
            <Link
              to="/admin/devices"
              style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-accent-green)' }}
            >
              View all devices
            </Link>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(20, 60, 40, 0.1)', textAlign: 'left', color: 'var(--color-text-muted)' }}>
                <th style={{ padding: '8px 10px 10px 0', fontWeight: 600 }}>Device</th>
                <th style={{ padding: '8px 10px 10px 10px', fontWeight: 600 }}>Customer</th>
                <th style={{ padding: '8px 10px 10px 10px', fontWeight: 600 }}>Issue</th>
                <th style={{ padding: '8px 10px 10px 10px', fontWeight: 600 }}>Since</th>
                <th style={{ padding: '8px 0 10px 10px', fontWeight: 600, textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {ATTENTION_LIST.map((item) => {
                let statusClass = 'pill-amber';
                if (item.status === 'Alarm') statusClass = 'pill-red';
                else if (item.status === 'Offline') statusClass = 'pill-grey';

                return (
                  <tr
                    key={item.deviceId}
                    onClick={() => navigate(`/admin/devices/${item.deviceId}`)}
                    style={{
                      borderBottom: '1px solid rgba(20, 60, 40, 0.06)',
                      cursor: 'pointer',
                    }}
                  >
                    <td style={{ padding: '12px 10px 12px 0' }}>
                      <span className="mono-val" style={{ fontWeight: 600, display: 'block', color: 'var(--color-text-main)' }}>
                        {item.deviceId}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                        {item.tankAndFarm}
                      </span>
                    </td>
                    <td style={{ padding: '12px 10px' }}>{item.customer}</td>
                    <td style={{ padding: '12px 10px', color: 'var(--color-text-main)' }}>{item.issue}</td>
                    <td style={{ padding: '12px 10px', color: 'var(--color-text-muted)' }}>{item.since}</td>
                    <td style={{ padding: '12px 0 12px 10px', textAlign: 'right' }}>
                      <span className={`pill ${statusClass}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Recent activity Card */}
        <div className="glass-card" style={{ padding: '22px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '18px' }}>
            Recent activity
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {RECENT_ACTIVITY.map((act) => {
              const dotColorMap = {
                green: 'var(--color-accent-green)',
                red: 'var(--color-red)',
                grey: '#889890',
                amber: 'var(--color-amber-tick)',
              };

              return (
                <div key={act.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: dotColorMap[act.dotColor],
                      marginTop: '6px',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontSize: '13.5px', color: 'var(--color-text-main)', lineHeight: 1.35 }}>
                      {act.text}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                      {act.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
