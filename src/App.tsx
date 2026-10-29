import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { CustomerLayout } from './components/customer/CustomerLayout';
import { AdminLayout } from './components/admin/AdminLayout';

// Customer Pages
import { LoginPage } from './pages/customer/LoginPage';
import { SignUpPage } from './pages/customer/SignUpPage';
import { PairScanPage } from './pages/customer/PairScanPage';
import { PairWifiPage } from './pages/customer/PairWifiPage';
import { PairDonePage } from './pages/customer/PairDonePage';
import { MyFarmsPage } from './pages/customer/MyFarmsPage';
import { FarmDetailPage } from './pages/customer/FarmDetailPage';
import { TankDetailPage } from './pages/customer/TankDetailPage';

// Admin Pages
import { FleetOverviewPage } from './pages/admin/FleetOverviewPage';
import { DevicesListPage } from './pages/admin/DevicesListPage';
import { DeviceDetailPage } from './pages/admin/DeviceDetailPage';
import { ProvisioningPage } from './pages/admin/ProvisioningPage';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          {/* Public Auth & Onboarding Flow */}
          <Route path="/login" element={<CustomerLayout />}>
            <Route index element={<LoginPage />} />
          </Route>
          <Route path="/signup" element={<CustomerLayout />}>
            <Route index element={<SignUpPage />} />
          </Route>
          <Route path="/pair/scan" element={<CustomerLayout />}>
            <Route index element={<PairScanPage />} />
          </Route>
          <Route path="/pair/wifi" element={<CustomerLayout />}>
            <Route index element={<PairWifiPage />} />
          </Route>
          <Route path="/pair/done" element={<CustomerLayout />}>
            <Route index element={<PairDonePage />} />
          </Route>

          {/* Customer App Views */}
          <Route path="/app" element={<CustomerLayout />}>
            <Route index element={<MyFarmsPage />} />
            <Route path="farm/:farmId" element={<FarmDetailPage />} />
            <Route path="tank/:tankId" element={<TankDetailPage />} />
          </Route>

          {/* Admin Console Views */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<FleetOverviewPage />} />
            <Route path="devices" element={<DevicesListPage />} />
            <Route path="devices/:deviceId" element={<DeviceDetailPage />} />
            <Route path="provisioning" element={<ProvisioningPage />} />
          </Route>

          {/* Default fallback */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/app" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
