import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { FarmOneDrawing } from '../../components/graphics/FarmOneDrawing';
import { FarmTwoDrawing } from '../../components/graphics/FarmTwoDrawing';

export const FarmDetailPage: React.FC = () => {
  const { farmId } = useParams<{ farmId: string }>();
  const navigate = useNavigate();
  const { farms, getTankStatus, isLiveTelemetry } = useApp();

  const farm = farms.find((f) => f.id === farmId) || farms[0];

  return (
    <div style={{ padding: '16px 20px 80px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Bar with Back Button */}
      <div>
        <button
          onClick={() => navigate('/app')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--color-accent-green)',
            marginBottom: '12px',
            padding: '4px 0',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          All farms
        </button>

        <h1
          style={{
            fontSize: '30px',
            fontWeight: 700,
            color: 'var(--color-text-main)',
            letterSpacing: '-0.5px',
            lineHeight: 1.1,
          }}
        >
          {farm.name}
        </h1>
        <span style={{ fontSize: '13.5px', color: 'var(--color-text-muted)', fontWeight: 500 }}>
          {farm.location}
        </span>
      </div>

      {/* Farm Drawing in Glass Card */}
      <div className="glass-card" style={{ padding: '16px' }}>
        <div style={{ width: '100%', maxWidth: '300px', margin: '0 auto', filter: 'drop-shadow(0 10px 22px rgba(0, 0, 0, 0.15))' }}>
          {farm.id === 'farm-1' ? <FarmOneDrawing /> : <FarmTwoDrawing />}
        </div>
      </div>

      {/* Tanks Section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--color-text-main)',
            }}
          >
            Tanks ({farm.tanks.length})
          </h2>
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
            Tap tank to inspect telemetry & dosing
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {farm.tanks.map((tank) => {
            const status = getTankStatus(tank);
            const isOffline = tank.isOffline;

            return (
              <div
                key={tank.id}
                onClick={() => navigate(`/app/tank/${tank.id}`)}
                className="glass-card"
                style={{
                  padding: '16px 18px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Left Side: Name, Sub label, Status */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                      {tank.name}
                    </span>
                    <span className={`pill pill-${status.color}`}>
                      {!isOffline && isLiveTelemetry && (
                        <span className="beacon-wrap" style={{ width: '10px', height: '10px' }}>
                          <span className="beacon-dot" style={{ width: '6px', height: '6px' }} />
                        </span>
                      )}
                      {status.label}
                    </span>
                  </div>

                  <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                    {tank.subLabel}
                    {isOffline && `, last seen ${tank.lastSeen || '2 h ago'}`}
                  </span>

                  <span style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                    Target <strong className="mono-val">{tank.target.toFixed(1)}</strong>
                    <span style={{ margin: '0 5px' }}>·</span>
                    <span className="mono-val">{tank.temp.toFixed(1)}°C</span>
                  </span>
                </div>

                {/* Right Side: Big EC Reading */}
                <div style={{ textAlign: 'right' }}>
                  <span
                    className="mono-val"
                    style={{
                      fontSize: '28px',
                      fontWeight: 700,
                      color: isOffline ? 'var(--color-text-muted)' : 'var(--color-text-main)',
                      display: 'block',
                      lineHeight: 1,
                    }}
                  >
                    {tank.ec.toFixed(2)}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                    mS/cm
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
