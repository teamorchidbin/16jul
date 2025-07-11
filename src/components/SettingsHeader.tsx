import React from 'react';
export const SettingsHeader = () => {
  return <header className="h-20 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="h-full px-8 flex items-center justify-between w-full">
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your account and app preferences.</p>
        </div>
      </div>
    </header>;
};