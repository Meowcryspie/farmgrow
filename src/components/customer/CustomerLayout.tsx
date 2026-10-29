import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppSwitcher } from '../common/AppSwitcher';

export const CustomerLayout: React.FC = () => {
  return (
    <div className="mobile-viewport-shell">
      <AppSwitcher />
      <Outlet />
    </div>
  );
};
