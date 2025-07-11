
import React, { useState } from 'react';
import { Switch } from '../../components/ui/switch';

export const Impersonation = () => {
  const [userImpersonation, setUserImpersonation] = useState(false);

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="p-8 max-w-4xl w-full">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold mb-2">Impersonation</h1>
          <p className="text-muted-foreground">Settings to manage user impersonation</p>
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium mb-2">User Impersonation</h3>
              <p className="text-sm text-muted-foreground">
                Allows our support team to temporarily sign in as you to help us quickly resolve any issues you report to us.
              </p>
            </div>
            <Switch 
              checked={userImpersonation}
              onCheckedChange={setUserImpersonation}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
