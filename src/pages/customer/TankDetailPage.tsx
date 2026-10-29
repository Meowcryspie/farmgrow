import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { EcGauge } from '../../components/graphics/EcGauge';
import { HistoryChart } from '../../components/graphics/HistoryChart';
import { BASE_HISTORY_24H, BASE_HISTORY_7D, RECENT_DOSES } from '../../mockData';

export const TankDetailPage: React.FC = () => {
  const { tankId } = useParams<{ tankId: string }>();
  const navigate = useNavigate();
  const {
    farms,
    alarmLimits,
    dosingModes,
    pendingTargets,
    setTankTarget,
    setAlarmLimits,
    setDosingMode,
    doseOnce,
    getTankStatus,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'reading' | 'control' | 'history'>('reading');
  const [historyRange, setHistoryRange] = useState<'24h' | '7d'>('24h');

  // Find farm and tank
  let currentFarm = farms[0];
  let currentTank = farms[0].tanks[0];

  for (const f of farms) {
    const t = f.tanks.find((tank) => tank.id === tankId);
    if (t) {
      currentFarm = f;
      currentTank = t;
      break;
    }
  }

  const isOffline = !!currentTank.isOffline;
  const currentMode = dosingModes[currentTank.id] || 'Auto';
  const tankStatus = getTankStatus(currentTank, true);
  const pending = pendingTargets[currentTank.id];

  // Target Stepper
  const handleTargetChange = (delta: number) => {
    const nextVal = Math.min(4.0, Math.max(0.5, currentTank.target + delta));
    setTankTarget(currentFarm.id, currentTank.id, nextVal);
  };

  // Alarm Limit Steppers
  const handleLowLimitChange = (delta: number) => {
    const newLow = Math.min(alarmLimits.high - 0.2, Math.max(0.8, alarmLimits.low + delta));
    setAlarmLimits({ low: newLow, high: alarmLimits.high });
  };

  const handleHighLimitChange = (delta: number) => {
    const newHigh = Math.min(3.0, Math.max(alarmLimits.low + 0.2, alarmLimits.high + delta));
    setAlarmLimits({ low: alarmLimits.low, high: newHigh });
  };

  // Compute shifted history points
  const baseHistory = historyRange === '24h' ? BASE_HISTORY_24H : BASE_HISTORY_7D;
  const shift = currentTank.ec - 1.72;
  const shiftedPoints = baseHistory.map((val) => Math.round((val + shift) * 100) / 100);

  // Compute stats
  const lowest = Math.min(...shiftedPoints);
  const highest = Math.max(...shiftedPoints);
  const average = shiftedPoints.reduce((a, b) => a + b, 0) / shiftedPoints.length;

  return (
    <div style={{ padding: '16px 20px 80px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Top Bar with Back Button */}
      <div>
        <button
          onClick={() => navigate(`/app/farm/${currentFarm.id}`)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '14.5px',
            fontWeight: 600,
            color: 'var(--color-accent-green)',
            marginBottom: '10px',
            padding: '4px 0',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          {currentFarm.name}
        </button>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h1
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: 'var(--color-text-main)',
                letterSpacing: '-0.4px',
                lineHeight: 1.15,
              }}
            >
              {currentTank.name}
            </h1>
            <span style={{ fontSize: '14px', color: 'var(--color-text-muted)', fontWeight: 500 }}>
              {currentTank.subLabel}
            </span>
          </div>

          <span className={`pill ${isOffline ? 'pill-grey' : 'pill-green'}`}>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: isOffline ? '#889890' : 'var(--color-accent-green)',
              }}
            />
            {isOffline ? 'Offline' : 'Online'}
          </span>
        </div>
      </div>

      {/* TAB 1: READING */}
      {activeTab === 'reading' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Gauge Card */}
          <div
            className="glass-card"
            style={{
              padding: '24px 20px 20px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <EcGauge
              ec={currentTank.ec}
              target={currentTank.target}
              lowLimit={alarmLimits.low}
              highLimit={alarmLimits.high}
              statusColor={tankStatus.color}
              isOffline={isOffline}
            />

            {/* Status Pill & Target under gauge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
              <span className={`pill pill-${tankStatus.color}`}>
                {tankStatus.label}
              </span>
              <span style={{ fontSize: '14px', color: 'var(--color-text-main)', fontWeight: 500 }}>
                Target <strong className="mono-val">{currentTank.target.toFixed(1)}</strong>
              </span>
            </div>
          </div>

          {/* 3 Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {/* Temperature */}
            <div className="glass-card-sm" style={{ padding: '14px 10px', textAlign: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 500, display: 'block', marginBottom: '4px' }}>
                Temperature
              </span>
              <span className="mono-val" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                {currentTank.temp.toFixed(1)}°C
              </span>
            </div>

            {/* Doses / hour */}
            <div className="glass-card-sm" style={{ padding: '14px 10px', textAlign: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 500, display: 'block', marginBottom: '4px' }}>
                Doses / hour
              </span>
              <span className="mono-val" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                {currentTank.dosesPerHour}
              </span>
            </div>

            {/* Total doses */}
            <div className="glass-card-sm" style={{ padding: '14px 10px', textAlign: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 500, display: 'block', marginBottom: '4px' }}>
                Total doses
              </span>
              <span className="mono-val" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                {currentTank.totalDoses}
              </span>
            </div>
          </div>

          {/* Footer Line */}
          <div style={{ textAlign: 'center', padding: '6px 0' }}>
            <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
              {isOffline
                ? 'No signal from this tank since 2 h ago.'
                : 'Sample data. Updated 12 s ago.'}
            </span>
          </div>
        </div>
      )}

      {/* TAB 2: CONTROL */}
      {activeTab === 'control' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Target EC Card */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <span style={{ fontSize: '13.5px', color: 'var(--color-text-muted)', fontWeight: 600, display: 'block', marginBottom: '14px' }}>
              Target EC (mS/cm)
            </span>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <button
                className="stepper-btn-lg"
                onClick={() => handleTargetChange(-0.1)}
                aria-label="Decrease target"
              >
                −
              </button>

              <span className="mono-val" style={{ fontSize: '46px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                {currentTank.target.toFixed(1)}
              </span>

              <button
                className="stepper-btn-lg"
                onClick={() => handleTargetChange(0.1)}
                aria-label="Increase target"
              >
                +
              </button>
            </div>

            {/* Confirmation status feedback */}
            <div style={{ minHeight: '22px', textAlign: 'center' }}>
              {pending?.isPending && (
                <span style={{ fontSize: '13px', color: 'var(--color-amber)', fontWeight: 600 }}>
                  Sent, waiting for the controller...
                </span>
              )}
              {pending?.isConfirmed && (
                <span style={{ fontSize: '13px', color: 'var(--color-accent-green)', fontWeight: 600 }}>
                  Controller confirmed {pending.value.toFixed(1)}
                </span>
              )}
              {!pending && (
                <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                  Tap + or − to adjust controller setpoint
                </span>
              )}
            </div>
          </div>

          {/* Dosing Card */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <span style={{ fontSize: '13.5px', color: 'var(--color-text-muted)', fontWeight: 600, display: 'block', marginBottom: '12px' }}>
              Dosing mode
            </span>

            {/* Auto / Pause Segmented Control */}
            <div className="segmented-control" style={{ marginBottom: '16px' }}>
              <button
                type="button"
                className={`segment-btn ${currentMode === 'Auto' ? 'active' : ''}`}
                onClick={() => setDosingMode(currentTank.id, 'Auto')}
              >
                Auto
              </button>
              <button
                type="button"
                className={`segment-btn ${currentMode === 'Pause' ? 'active' : ''}`}
                onClick={() => setDosingMode(currentTank.id, 'Pause')}
              >
                Pause
              </button>
            </div>

            {/* Dose once button */}
            <button
              onClick={() => doseOnce(currentFarm.id, currentTank.id)}
              className="btn-secondary"
              style={{ width: '100%', height: '48px', justifyContent: 'center' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              Dose once (adds 1 to total doses)
            </button>
          </div>

          {/* Alarm Limits Card */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <span style={{ fontSize: '13.5px', color: 'var(--color-text-muted)', fontWeight: 600, display: 'block', marginBottom: '16px' }}>
              Alarm limits (shared)
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Low Stepper */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', display: 'block' }}>
                    Low limit
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Min 0.8 EC</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <button
                    className="stepper-btn-sm"
                    onClick={() => handleLowLimitChange(-0.1)}
                    aria-label="Decrease low limit"
                  >
                    −
                  </button>
                  <span className="mono-val" style={{ fontSize: '24px', fontWeight: 700, width: '45px', textAlign: 'center' }}>
                    {alarmLimits.low.toFixed(1)}
                  </span>
                  <button
                    className="stepper-btn-sm"
                    onClick={() => handleLowLimitChange(0.1)}
                    aria-label="Increase low limit"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* High Stepper */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', display: 'block' }}>
                    High limit
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Max 3.0 EC</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <button
                    className="stepper-btn-sm"
                    onClick={() => handleHighLimitChange(-0.1)}
                    aria-label="Decrease high limit"
                  >
                    −
                  </button>
                  <span className="mono-val" style={{ fontSize: '24px', fontWeight: 700, width: '45px', textAlign: 'center' }}>
                    {alarmLimits.high.toFixed(1)}
                  </span>
                  <button
                    className="stepper-btn-sm"
                    onClick={() => handleHighLimitChange(0.1)}
                    aria-label="Increase high limit"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '16px', lineHeight: 1.4 }}>
              The controller checks every change and refuses values outside its safe range.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: HISTORY */}
      {activeTab === 'history' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Segmented Control 24h / 7d */}
          <div className="segmented-control">
            <button
              type="button"
              className={`segment-btn ${historyRange === '24h' ? 'active' : ''}`}
              onClick={() => setHistoryRange('24h')}
            >
              24 hours
            </button>
            <button
              type="button"
              className={`segment-btn ${historyRange === '7d' ? 'active' : ''}`}
              onClick={() => setHistoryRange('7d')}
            >
              7 days
            </button>
          </div>

          {/* History Chart Card */}
          <div className="glass-card" style={{ padding: '16px 14px' }}>
            <HistoryChart
              dataPoints={shiftedPoints}
              target={currentTank.target}
              lowLimit={alarmLimits.low}
              highLimit={alarmLimits.high}
              timeRange={historyRange}
            />

            {/* Stats Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                borderTop: '1px solid var(--color-border-subtle)',
                marginTop: '16px',
                paddingTop: '14px',
                textAlign: 'center',
              }}
            >
              <div>
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block' }}>Lowest</span>
                <span className="mono-val" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                  {lowest.toFixed(2)}
                </span>
              </div>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block' }}>Average</span>
                <span className="mono-val" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                  {average.toFixed(2)}
                </span>
              </div>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block' }}>Highest</span>
                <span className="mono-val" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                  {highest.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Doses Card */}
          <div className="glass-card" style={{ padding: '18px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', display: 'block', marginBottom: '12px' }}>
              Recent doses
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {RECENT_DOSES.map((dose, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: idx < RECENT_DOSES.length - 1 ? '10px' : 0,
                    borderBottom: idx < RECENT_DOSES.length - 1 ? '1px solid rgba(20, 60, 40, 0.08)' : 'none',
                  }}
                >
                  <span style={{ fontSize: '14px', color: 'var(--color-text-main)' }}>
                    {dose.description}
                  </span>
                  <span className="mono-val" style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                    {dose.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FIXED BOTTOM TAB BAR */}
      <div className="bottom-tab-bar">
        {/* Tab 1: Reading */}
        <button
          onClick={() => setActiveTab('reading')}
          className={`tab-btn ${activeTab === 'reading' ? 'active' : ''}`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M2 12h20" opacity="0.3" />
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 3" />
          </svg>
          Reading
        </button>

        {/* Tab 2: Control */}
        <button
          onClick={() => setActiveTab('control')}
          className={`tab-btn ${activeTab === 'control' ? 'active' : ''}`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          Control
        </button>

        {/* Tab 3: History */}
        <button
          onClick={() => setActiveTab('history')}
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18" />
            <path d="M19 9l-5 5-4-4-3 3" />
          </svg>
          History
        </button>
      </div>
    </div>
  );
};
