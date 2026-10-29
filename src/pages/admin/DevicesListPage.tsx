import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_DEVICES } from '../../mockData';
import { SignalBars } from '../../components/common/SignalBars';

export const DevicesListPage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'All' | 'Online' | 'Alarm' | 'Offline'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter logic
  const filteredDevices = ADMIN_DEVICES.filter((d) => {
    // Status filter
    if (filter === 'Online') {
      // In the specification: Online includes alarm devices, but excludes offline
      if (d.status === 'Offline') return false;
    } else if (filter === 'Alarm') {
      if (d.status !== 'Alarm') return false;
    } else if (filter === 'Offline') {
      if (d.status !== 'Offline') return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = d.id.toLowerCase().includes(q);
      const matchCustomer = d.customer.toLowerCase().includes(q);
      const matchFarm = d.farmName.toLowerCase().includes(q);
      const matchTank = d.tankName.toLowerCase().includes(q);
      if (!matchId && !matchCustomer && !matchFarm && !matchTank) return false;
    }

    return true;
  });

  const filterTotals: Record<string, number> = {
    All: 239,
    Online: 228,
    Alarm: 6,
    Offline: 11,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '30px', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.5px' }}>
            Devices
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
            Every paired EC Mini, with its connection health. Sample data.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn-secondary" onClick={() => alert('Exporting devices CSV...')}>
            Export CSV
          </button>
          <button
            onClick={() => navigate('/admin/provisioning')}
            className="btn-primary"
            style={{ width: 'auto', height: '44px', padding: '0 20px' }}
          >
            Register devices
          </button>
        </div>
      </div>

      {/* Filter Chips & Search Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        {/* Filter Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {(['All', 'Online', 'Alarm', 'Offline'] as const).map((tab) => {
            const count = filterTotals[tab];
            const isSelected = filter === tab;

            return (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                style={{
                  padding: '7px 16px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: isSelected
                    ? 'linear-gradient(135deg, var(--color-accent-dark), var(--color-accent-green))'
                    : 'rgba(255, 255, 255, 0.85)',
                  color: isSelected ? '#FFFFFF' : 'var(--color-text-main)',
                  border: isSelected ? 'none' : '1px solid var(--color-border-subtle)',
                  boxShadow: isSelected ? '0 4px 12px rgba(18, 128, 79, 0.25)' : 'none',
                }}
              >
                <span>{tab}</span>
                <span style={{ opacity: isSelected ? 0.9 : 0.65, fontFamily: 'var(--font-mono)' }}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search by ID, customer or farm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '280px',
            height: '40px',
            padding: '0 16px',
            borderRadius: '12px',
            border: '1px solid var(--color-border-input)',
            background: 'rgba(255, 255, 255, 0.85)',
            fontSize: '13.5px',
            outline: 'none',
          }}
        />
      </div>

      {/* Devices Table Card */}
      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', minWidth: '900px' }}>
            <thead>
              <tr style={{ background: 'rgba(255, 255, 255, 0.4)', borderBottom: '1px solid rgba(20, 60, 40, 0.08)', textAlign: 'left', color: 'var(--color-text-muted)' }}>
                <th style={{ padding: '14px 16px', fontWeight: 600 }}>Device</th>
                <th style={{ padding: '14px 16px', fontWeight: 600 }}>Tank</th>
                <th style={{ padding: '14px 16px', fontWeight: 600 }}>Customer</th>
                <th style={{ padding: '14px 16px', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '14px 16px', fontWeight: 600 }}>EC</th>
                <th style={{ padding: '14px 16px', fontWeight: 600 }}>WiFi signal</th>
                <th style={{ padding: '14px 16px', fontWeight: 600 }}>Firmware</th>
                <th style={{ padding: '14px 16px', fontWeight: 600 }}>Last seen</th>
              </tr>
            </thead>
            <tbody>
              {filteredDevices.map((dev) => {
                const isOutdated = dev.firmware !== '1.4.0';

                return (
                  <tr
                    key={dev.id}
                    onClick={() => navigate(`/admin/devices/${dev.id}`)}
                    style={{
                      borderBottom: '1px solid rgba(20, 60, 40, 0.06)',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.65)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    {/* Device ID */}
                    <td style={{ padding: '14px 16px' }}>
                      <span className="mono-val" style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>
                        {dev.id}
                      </span>
                    </td>

                    {/* Tank & Farm */}
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontWeight: 600, display: 'block', color: 'var(--color-text-main)' }}>
                        {dev.tankName}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                        {dev.farmName}
                      </span>
                    </td>

                    {/* Customer */}
                    <td style={{ padding: '14px 16px', color: 'var(--color-text-main)' }}>
                      {dev.customer}
                    </td>

                    {/* Status Pill */}
                    <td style={{ padding: '14px 16px' }}>
                      <span className={`pill ${dev.status === 'Alarm' ? 'pill-red' : dev.status === 'Offline' ? 'pill-grey' : 'pill-green'}`}>
                        {dev.status}
                      </span>
                    </td>

                    {/* EC Reading */}
                    <td style={{ padding: '14px 16px' }}>
                      <span
                        className="mono-val"
                        style={{
                          fontWeight: 700,
                          fontSize: '14.5px',
                          color: dev.status === 'Alarm' ? 'var(--color-red)' : 'var(--color-text-main)',
                        }}
                      >
                        {dev.ec.toFixed(2)}
                      </span>
                    </td>

                    {/* WiFi Signal */}
                    <td style={{ padding: '14px 16px' }}>
                      <SignalBars dbm={dev.wifiDbm} />
                    </td>

                    {/* Firmware */}
                    <td style={{ padding: '14px 16px' }}>
                      <span className="mono-val" style={{ display: 'block', fontWeight: 600 }}>
                        {dev.firmware}
                      </span>
                      {isOutdated && (
                        <span style={{ fontSize: '11.5px', color: 'var(--color-amber)', fontWeight: 500 }}>
                          Update available
                        </span>
                      )}
                    </td>

                    {/* Last seen */}
                    <td style={{ padding: '14px 16px', color: 'var(--color-text-muted)' }}>
                      {dev.lastSeen}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div
          style={{
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(20, 60, 40, 0.08)',
            fontSize: '13px',
            color: 'var(--color-text-muted)',
          }}
        >
          <span>
            Showing {filteredDevices.length} of {filterTotals[filter]} devices
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid var(--color-border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Previous page"
            >
              ‹
            </button>
            <span style={{ fontWeight: 500 }}>Page 1 of 24</span>
            <button
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid var(--color-border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
