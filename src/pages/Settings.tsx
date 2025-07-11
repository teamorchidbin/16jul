
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { SettingsSidebar } from '../components/SettingsSidebar';
import { SettingsHeader } from '../components/SettingsHeader';

export const Settings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isRootSettings = location.pathname === '/settings';

  useEffect(() => {
    if (isRootSettings) {
      navigate('/settings/profile', { replace: true });
    }
  }, [isRootSettings, navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <SettingsSidebar />
      <div className="flex-1 ml-64">
        <SettingsHeader />
        <main className="relative z-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
