
import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Switch } from './ui/switch';

export const RecurringEvent = () => {
  const [isRecurringEnabled, setIsRecurringEnabled] = useState(false);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="space-y-6">
        {/* Warning */}
        <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-yellow-800">
              <strong>Experimental:</strong> Recurring Events are currently experimental and cause some issues sometimes when checking for availability. We are working on fixing this.
            </p>
          </div>
        </div>

        {/* Recurring Event Card */}
        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Switch 
                id="enable-recurring" 
                checked={isRecurringEnabled} 
                onCheckedChange={setIsRecurringEnabled} 
              />
              <label htmlFor="enable-recurring" className="text-sm font-medium">
                Enable Recurring Events
              </label>
            </div>
            
            {isRecurringEnabled && (
              <div className="space-y-4 pl-6 border-l-2 border-muted animate-fade-in">
                <div>
                  <label className="block text-sm font-medium mb-2">Frequency</label>
                  <select className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background">
                    <option>Does not repeat</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Yearly</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">End date</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="never" name="endType" className="rounded" defaultChecked />
                      <label htmlFor="never" className="text-sm">Never</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="date" name="endType" className="rounded" />
                      <label htmlFor="date" className="text-sm">On date</label>
                      <input type="date" className="ml-2 px-2 py-1 border border-border rounded text-sm bg-background" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="occurrences" name="endType" className="rounded" />
                      <label htmlFor="occurrences" className="text-sm">After</label>
                      <input type="number" className="w-16 ml-2 px-2 py-1 border border-border rounded text-sm bg-background" placeholder="1" />
                      <span className="text-sm">occurrences</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
