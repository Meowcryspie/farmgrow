import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AppSwitcher } from '../common/AppSwitcher';
import { useApp } from '../../context/AppContext';

export const CustomerLayout: React.FC = () => {
  const { deviceFrame, activeToast, dismissToast } = useApp();
  const [currentTime, setCurrentTime] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <AppSwitcher />

      {/* Global Modern Toast Notifications */}
      {activeToast && (
        <div className="toast-layer" role="status" aria-live="polite">
          <div className="toast-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor:
                    activeToast.type === 'success'
                      ? 'rgba(0, 229, 117, 0.18)'
                      : activeToast.type === 'warning'
                      ? 'rgba(255, 179, 64, 0.18)'
                      : 'rgba(30, 144, 255, 0.18)',
                  color:
                    activeToast.type === 'success'
                      ? 'var(--color-accent-green)'
                      : activeToast.type === 'warning'
                      ? 'var(--color-amber)'
                      : '#1E90FF',
                  flexShrink: 0,
                }}
              >
                {activeToast.type === 'success' ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : activeToast.type === 'warning' ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                )}
              </span>

              <div>
                <strong style={{ fontSize: '13.5px', color: 'var(--color-text-main)', display: 'block' }}>
                  {activeToast.title}
                </strong>
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                  {activeToast.message}
                </span>
              </div>
            </div>

            <button
              onClick={dismissToast}
              aria-label="Close notification"
              style={{
                color: 'var(--color-text-muted)',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {deviceFrame ? (
        <div className="simulator-outer-wrap">
          <div className="device-frame">
            <div className="device-screen">
              {/* iPhone 16 Pro Dynamic Island & Status Bar */}
              <div className="dynamic-island-status-bar">
                <span className="mono-val" style={{ fontSize: '13.5px', fontWeight: 600 }}>
                  {currentTime}
                </span>

                <div className="dynamic-island-pill">
                  <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#1C2621' }} />
                  <div style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#0D1410', border: '1px solid #23342B' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="15" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="1" y="16" width="3.5" height="6" rx="1" />
                    <rect x="7" y="12" width="3.5" height="10" rx="1" />
                    <rect x="13" y="7" width="3.5" height="15" rx="1" />
                    <rect x="19" y="2" width="3.5" height="20" rx="1" />
                  </svg>
                  <svg width="15" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
                  </svg>
                  <svg width="19" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="5" width="17" height="14" rx="3" />
                    <rect x="4" y="7" width="10" height="10" rx="1.5" fill="currentColor" />
                    <path d="M21 10v4" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Main App Content Viewport */}
              <div style={{ flex: 1, position: 'relative', overflowY: 'auto', overflowX: 'hidden' }}>
                <Outlet />
              </div>

              {/* iPhone Home Swipe Bar */}
              <div className="device-home-bar" />
            </div>
          </div>
        </div>
      ) : (
        <div className="mobile-viewport-shell">
          <Outlet />
        </div>
      )}
    </>
  );
};
