import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { AppSwitcher } from '../common/AppSwitcher';

export const AdminLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      <AppSwitcher />

      {/* Frosted Sidebar (248px) */}
      <aside
        style={{
          width: '248px',
          minWidth: '248px',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.85), rgba(214, 240, 226, 0.45))',
          borderRight: '1px solid rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px 16px',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 20,
        }}
      >
        <div>
          {/* Logo & Admin console label */}
          <div style={{ padding: '0 8px 24px 8px' }}>
            <Logo wordmarkSubtext="Admin console" />
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {/* Overview */}
            <NavLink
              to="/admin"
              end
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '12px',
                fontSize: '14.5px',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--color-accent-green)' : 'var(--color-text-main)',
                background: isActive ? '#FFFFFF' : 'transparent',
                boxShadow: isActive ? '0 2px 8px rgba(20, 70, 45, 0.06)' : 'none',
              })}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              Overview
            </NavLink>

            {/* Devices */}
            <NavLink
              to="/admin/devices"
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '12px',
                fontSize: '14.5px',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--color-accent-green)' : 'var(--color-text-main)',
                background: isActive ? '#FFFFFF' : 'transparent',
                boxShadow: isActive ? '0 2px 8px rgba(20, 70, 45, 0.06)' : 'none',
              })}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                <line x1="6" y1="6" x2="6.01" y2="6" />
                <line x1="6" y1="18" x2="6.01" y2="18" />
              </svg>
              Devices
            </NavLink>

            {/* Provisioning */}
            <NavLink
              to="/admin/provisioning"
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '12px',
                fontSize: '14.5px',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--color-accent-green)' : 'var(--color-text-main)',
                background: isActive ? '#FFFFFF' : 'transparent',
                boxShadow: isActive ? '0 2px 8px rgba(20, 70, 45, 0.06)' : 'none',
              })}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1" />
                <path d="M18 8h4a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-4" />
                <circle cx="8" cy="12" r="2" />
              </svg>
              Provisioning
            </NavLink>
          </nav>
        </div>

        {/* User Chip at bottom */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 8px',
            borderTop: '1px solid rgba(20, 60, 40, 0.08)',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#A8D5C0',
              color: 'var(--color-accent-dark)',
              fontWeight: 700,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            SR
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-text-main)', lineHeight: 1.2 }}>
              Siti Rahman
            </span>
            <span style={{ fontSize: '11.5px', color: 'var(--color-text-muted)' }}>
              Support admin
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content Area (Max width 1440px) */}
      <main
        style={{
          flex: 1,
          maxWidth: '1440px',
          padding: '30px 40px',
          minWidth: 0,
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};
