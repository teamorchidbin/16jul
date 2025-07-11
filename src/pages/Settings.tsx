
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SettingsSidebar } from '../components/SettingsSidebar';
import { SettingsHeader } from '../components/SettingsHeader';

export const Settings = () => {
  const location = useLocation();
  const isRootSettings = location.pathname === '/settings';

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <SettingsSidebar />
      <div className="flex-1 ml-64">
        <SettingsHeader />
        <main className="relative z-0">
          {isRootSettings ? (
            <div className="p-8">
              <h1 className="text-2xl font-semibold mb-4">Settings</h1>
              <p className="text-muted-foreground">Select a category from the sidebar to manage your settings.</p>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};
