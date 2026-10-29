import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { FarmOneDrawing } from '../../components/graphics/FarmOneDrawing';
import { FarmTwoDrawing } from '../../components/graphics/FarmTwoDrawing';

export const MyFarmsPage: React.FC = () => {
  const navigate = useNavigate();
  const { farms, getFarmChip, getDashboardTotals, isLiveTelemetry } = useApp();
  const totals = getDashboardTotals();
  const [filter, setFilter] = useState<'all' | 'attention' | 'online'>('all');

  // Compute average EC of online tanks for a farm
  const getAverageEc = (farmId: string) => {
    const farm = farms.find((f) => f.id === farmId);
    if (!farm) return '0.00';
    const onlineTanks = farm.tanks.filter((t) => !t.isOffline);
    if (onlineTanks.length === 0) return '0.00';
    const sum = onlineTanks.reduce((acc, t) => acc + t.ec, 0);
    return (sum / onlineTanks.length).toFixed(2);
  };

  const filteredFarms = farms.filter((f) => {
    if (filter === 'attention') {
      const chip = getFarmChip(f);
      return chip.color === 'red' || chip.color === 'amber';
    }
    if (filter === 'online') {
      return f.tanks.some((t) => !t.isOffline);
    }
    return true;
  });

  return (
    <div style={{ padding: '20px 20px 80px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h1
              style={{
                fontSize: '32px',
                fontWeight: 700,
                color: 'var(--color-text-main)',
                letterSpacing: '-0.5px',
                lineHeight: 1.1,
              }}
            >
              My farms
            </h1>
            <span style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 500 }}>
              {isLiveTelemetry ? 'Live telemetry active' : 'Telemetry paused'}
            </span>
          </div>

          <div
            className="pill"
            style={{
              padding: '6px 12px',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            <span className="beacon-wrap">
              <span
                className="beacon-dot"
                style={{
                  backgroundColor: 'var(--color-accent-green)',
                  boxShadow: isLiveTelemetry ? '0 0 8px var(--color-accent-green)' : 'none',
                }}
              />
              {isLiveTelemetry && <span className="beacon-ripple" />}
            </span>
            <span>{`${totals.onlineCount} of ${totals.totalTanks} online`}</span>
          </div>
        </div>

        {/* Add a device Button */}
        <button
          onClick={() => navigate('/pair/scan')}
          className="btn-primary"
          style={{ marginTop: '16px', height: '50px' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add a device
        </button>
      </div>

      {/* 3 Summary KPI Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {/* Tanks Card */}
        <div className="glass-card-sm" style={{ padding: '14px 12px', textAlign: 'left' }}>
          <span style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', fontWeight: 500, display: 'block', marginBottom: '6px' }}>
            Tanks
          </span>
          <span className="mono-val" style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-text-main)' }}>
            {totals.totalTanks}
          </span>
        </div>

        {/* Alarms Card */}
        <div className="glass-card-sm" style={{ padding: '14px 12px', textAlign: 'left' }}>
          <span style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', fontWeight: 500, display: 'block', marginBottom: '6px' }}>
            Alarms
          </span>
          <span
            className="mono-val"
            style={{
              fontSize: '26px',
              fontWeight: 700,
              color: totals.alarmCount > 0 ? 'var(--color-red)' : 'var(--color-text-main)',
            }}
          >
            {totals.alarmCount}
          </span>
        </div>

        {/* Offline Card */}
        <div className="glass-card-sm" style={{ padding: '14px 12px', textAlign: 'left' }}>
          <span style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', fontWeight: 500, display: 'block', marginBottom: '6px' }}>
            Offline
          </span>
          <span className="mono-val" style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-text-main)' }}>
            {totals.offlineCount}
          </span>
        </div>
      </div>

      {/* Quick Filter Bar */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => setFilter('all')}
          className={`preset-chip ${filter === 'all' ? 'active' : ''}`}
        >
          All ({farms.length})
        </button>
        <button
          onClick={() => setFilter('attention')}
          className={`preset-chip ${filter === 'attention' ? 'active' : ''}`}
        >
          Needs Attention ({totals.alarmCount})
        </button>
        <button
          onClick={() => setFilter('online')}
          className={`preset-chip ${filter === 'online' ? 'active' : ''}`}
        >
          Online ({totals.onlineCount})
        </button>
      </div>

      {/* Farm Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {filteredFarms.map((farm) => {
          const chip = getFarmChip(farm);
          const avgEc = getAverageEc(farm.id);

          return (
            <div
              key={farm.id}
              className="glass-card"
              onClick={() => navigate(`/app/farm/${farm.id}`)}
              style={{
                cursor: 'pointer',
                padding: '18px 20px',
                transition: 'transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Isometric 2.5D Farm Drawing */}
              <div
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  margin: '0 auto 12px auto',
                  filter: 'drop-shadow(0 10px 22px rgba(0, 0, 0, 0.15))',
                }}
              >
                {farm.id === 'farm-1' ? <FarmOneDrawing /> : <FarmTwoDrawing />}
              </div>

              {/* Farm Name, Location & Status Chip */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div>
                  <h2
                    style={{
                      fontSize: '20px',
                      fontWeight: 700,
                      color: 'var(--color-text-main)',
                      lineHeight: 1.2,
                    }}
                  >
                    {farm.name}
                  </h2>
                  <span style={{ fontSize: '13.5px', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                    {farm.location}
                  </span>
                </div>

                <span className={`pill pill-${chip.color}`}>
                  {chip.text}
                </span>
              </div>

              {/* Tanks count and Average EC */}
              <div style={{ fontSize: '13.5px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                <span>{farm.tanks.length} tanks</span>
                <span style={{ margin: '0 6px' }}>·</span>
                <span>
                  Average EC <strong className="mono-val" style={{ color: 'var(--color-text-main)' }}>{avgEc}</strong>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
