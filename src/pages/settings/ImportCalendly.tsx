
import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Checkbox } from '../../components/ui/checkbox';
import { Plus, ExternalLink } from 'lucide-react';

export const ImportCalendly = () => {
  const [notifyBookers, setNotifyBookers] = useState(true);

  const handleImport = () => {
    window.open('https://calendly.com/app/login', '_blank');
  };

  const handleNotifyBookersChange = (checked: boolean | "indeterminate") => {
    setNotifyBookers(checked === true);
  };

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="p-8 max-w-4xl w-full">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold mb-2">Calendly</h1>
          <p className="text-muted-foreground">Import configuration from third-party services</p>
        </div>

        <div className="border rounded-lg p-6 space-y-6">
          <div className="flex items-center space-x-2">
            <Checkbox 
              checked={notifyBookers}
              onCheckedChange={handleNotifyBookersChange}
            />
            <span className="text-sm">Notify past bookers about your migration</span>
          </div>

          <Button onClick={handleImport} className="bg-blue-600 hover:bg-blue-700">
            <ExternalLink className="h-4 w-4 mr-2" />
            Import
          </Button>
        </div>
      </div>
    </div>
  );
};
