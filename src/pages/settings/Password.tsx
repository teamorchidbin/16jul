import React from 'react';
import { Button } from '../../components/ui/button';
import { ExternalLink } from 'lucide-react';

export const Password = () => {
  const handleRedirect = () => {
    window.open('https://sso.onehash.ai/realms/OneHash/account/#/security/signingin', '_blank');
  };

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="p-8 max-w-4xl w-full">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold mb-2">Password</h1>
        </div>

        <div className="text-center py-16">
          <div className="max-w-2xl mx-auto mb-6">
            <p className="text-lg font-semibold mb-4">Your Cal ID is managed by OneHash</p>
            <p className="text-muted-foreground">
              To change your email, password, enable two-factor authentication and more, please visit your OneHash account settings.
            </p>
          </div>
          
          <Button onClick={handleRedirect} className="bg-blue-600 hover:bg-blue-700">
            <ExternalLink className="h-4 w-4 mr-2" />
            Security Settings
          </Button>
        </div>
      </div>
    </div>
  );
};