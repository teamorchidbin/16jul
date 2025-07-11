
import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Switch } from '../../components/ui/switch';
import { Plus, Trash2 } from 'lucide-react';

export const Calendars = () => {
  const [addingEvents, setAddingEvents] = useState(true);
  const [syncCalendar, setSyncCalendar] = useState(true);

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Calendars</h1>
          <p className="text-muted-foreground">Configure how your event types interact with your calendars</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Calendar
        </Button>
      </div>

      <div className="space-y-8">
        {/* Add to calendar */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Add to calendar</h2>
          <p className="text-muted-foreground">Select where to add events when you're booked.</p>
          
          <div className="border-t pt-6">
            <div className="space-y-2">
              <Label>Add events to</Label>
              <Select defaultValue="google-sanskar">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="google-sanskar">sanskarix@gmail.com (Google - sanskarix@gmail.com)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                You can override this on a per-event basis in Advanced settings in each event type.
              </p>
            </div>
          </div>
        </div>

        {/* Check for conflicts */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Check for conflicts</h2>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
          <p className="text-muted-foreground">
            Select which calendars you want to check for conflicts to prevent double bookings.
          </p>

          <div className="border rounded-lg p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-medium text-sm">31</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Google Calendar</h3>
                <p className="text-sm text-muted-foreground">sanskarix@gmail.com</p>
              </div>
              <Button variant="ghost" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Toggle the calendars you want to check for conflicts to prevent double bookings.
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={addingEvents}
                    onCheckedChange={setAddingEvents}
                  />
                  <span className="text-sm">sanskarix@gmail.com</span>
                </div>
                <span className="text-sm text-muted-foreground">← Adding events to</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={syncCalendar}
                    onCheckedChange={setSyncCalendar}
                  />
                  <span className="text-sm">Sync this Google Calendar to display external bookings made outside Cal ID.</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch checked={false} />
                  <span className="text-sm text-muted-foreground">Holidays in India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
