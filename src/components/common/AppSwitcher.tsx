import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export const AppSwitcher: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <Link
      to={isAdmin ? '/app' : '/admin'}
      className="global-view-switcher"
      title={isAdmin ? 'Switch to Customer Mobile PWA' : 'Switch to Admin Console'}
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
  );
};
