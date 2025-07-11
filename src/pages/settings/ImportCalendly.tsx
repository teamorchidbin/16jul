
import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Checkbox } from '../../components/ui/checkbox';
import { Plus } from 'lucide-react';

export const ImportCalendly = () => {
  const [notifyBookers, setNotifyBookers] = useState(true);

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Calendly</h1>
          <p className="text-muted-foreground">Import configuration from third-party services</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Import
        </Button>
      </div>

      <div className="border rounded-lg p-6">
        <div className="flex items-center space-x-2">
          <Checkbox 
            checked={notifyBookers}
            onCheckedChange={setNotifyBookers}
          />
          <span className="text-sm">Notify past bookers about your migration</span>
        </div>
      </div>
    </div>
  );
};
