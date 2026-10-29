import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const AppSwitcher: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const {
    theme,
    setTheme,
    deviceFrame,
    setDeviceFrame,
    isLiveTelemetry,
    setIsLiveTelemetry,
  } = useApp();

  const isDarkMode =
    theme === 'dark' ||
    (theme === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <div className="top-control-bar">
      {/* Live Stream Telemetry Indicator */}
      <button
        onClick={() => setIsLiveTelemetry(!isLiveTelemetry)}
        className="control-pill-btn"
        title={isLiveTelemetry ? 'Live telemetry stream active (click to pause)' : 'Telemetry paused (click to resume)'}
        style={{
          opacity: isLiveTelemetry ? 1 : 0.65,
        }}
      >
        <span className="beacon-wrap">
          <span
            className="beacon-dot"
            style={{
              backgroundColor: isLiveTelemetry ? 'var(--color-accent-green)' : 'var(--color-text-muted)',
              boxShadow: isLiveTelemetry ? '0 0 8px var(--color-accent-green)' : 'none',
            }}
          />
          {isLiveTelemetry && <span className="beacon-ripple" />}
        </span>
        <span style={{ fontSize: '11px', fontWeight: 600 }}>
          {isLiveTelemetry ? 'Live' : 'Paused'}
        </span>
      </button>

      {/* Frame Toggle (only in customer mobile view) */}
      {!isAdmin && (
        <button
          onClick={() => setDeviceFrame(!deviceFrame)}
          className="control-pill-btn"
          title={deviceFrame ? 'Switch to Full Screen layout' : 'Switch to Phone Mockup frame'}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
          <span style={{ fontSize: '11.5px' }}>{deviceFrame ? 'Frame' : 'Expand'}</span>
        </button>
      )}

      {/* Theme Toggle (Daylight / Emerald Noir) */}
      <button
        onClick={toggleTheme}
        className="control-pill-btn"
        title={isDarkMode ? 'Switch to Daylight Botany theme' : 'Switch to Emerald Noir OLED theme'}
      >
        {isDarkMode ? (
          <>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FFB340" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            <span style={{ fontSize: '11.5px' }}>Light</span>
          </>
        ) : (
          <>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
            <span style={{ fontSize: '11.5px' }}>Dark</span>
          </>
        )}
      </button>

      {/* App / Admin View Switcher */}
      <Link
        to={isAdmin ? '/app' : '/admin'}
        className="control-pill-btn"
        title={isAdmin ? 'Switch to Customer Mobile PWA' : 'Switch to Admin Console'}
        style={{
          color: isAdmin ? 'var(--color-amber)' : 'var(--color-accent-green)',
          borderColor: isAdmin ? 'rgba(255, 179, 64, 0.3)' : 'var(--color-border-subtle)',
        }}
      >
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: isAdmin ? 'var(--color-amber-tick)' : 'var(--color-accent-green)',
          }}
        />
        <span>{isAdmin ? 'View Customer App' : 'Admin Console'}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
};
