import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { FarmOneDrawing } from '../../components/graphics/FarmOneDrawing';
import { FarmTwoDrawing } from '../../components/graphics/FarmTwoDrawing';

export const FarmDetailPage: React.FC = () => {
  const { farmId } = useParams<{ farmId: string }>();
  const navigate = useNavigate();
  const { farms, getTankStatus } = useApp();

  const farm = farms.find((f) => f.id === farmId) || farms[0];

  return (
    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Bar with Back Button */}
      <div>
        <button
          onClick={() => navigate('/app')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '14.5px',
            fontWeight: 600,
            color: 'var(--color-accent-green)',
            marginBottom: '14px',
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
        <span style={{ fontSize: '14px', color: 'var(--color-text-muted)', fontWeight: 500 }}>
          {farm.location}
        </span>
      </div>

      {/* Farm Drawing in Glass Card */}
      <div className="glass-card" style={{ padding: '16px' }}>
        <div style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}>
          {farm.id === 'farm-1' ? <FarmOneDrawing /> : <FarmTwoDrawing />}
        </div>
      </div>

      {/* Tanks Section */}
      <div>
        <h2
          style={{
            fontSize: '18px',
            fontWeight: 700,
            color: 'var(--color-text-main)',
            marginBottom: '12px',
          }}
        >
          Tanks
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
                  transition: 'transform 0.15s ease',
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
