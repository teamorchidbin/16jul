
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Switch } from '../../../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Checkbox } from '../../../components/ui/checkbox';
import { Plus } from 'lucide-react';

export const TeamBookingLimits = () => {
  const { teamId } = useParams();
  const [limitBookingFrequency, setLimitBookingFrequency] = useState(true);
  const [includeManagedEvents, setIncludeManagedEvents] = useState(false);
  const [limitValue, setLimitValue] = useState('1');
  const [limitPeriod, setLimitPeriod] = useState('Per day');

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="p-8 max-w-4xl w-full">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold mb-2">Booking Limits</h1>
          <p className="text-muted-foreground">Booking limits for team members across all team event types</p>
        </div>

        <div className="space-y-8">
          {/* Limit booking frequency */}
          <div className="border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-medium">Limit booking frequency</h2>
                <p className="text-sm text-muted-foreground">Limit how many times members can be booked across all team event types</p>
              </div>
              <Switch 
                checked={limitBookingFrequency}
                onCheckedChange={setLimitBookingFrequency}
              />
            </div>

            {limitBookingFrequency && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="include-managed"
                    checked={includeManagedEvents}
                    onCheckedChange={(checked) => setIncludeManagedEvents(checked === true)}
                  />
                  <Label htmlFor="include-managed" className="text-sm">
                    Include booking counts from managed event types
                  </Label>
                </div>

                <div className="flex items-center space-x-4">
                  <Input
                    value={limitValue}
                    onChange={(e) => setLimitValue(e.target.value)}
                    className="w-20"
                  />
                  <Select value={limitPeriod} onValueChange={setLimitPeriod}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Per day">Per day</SelectItem>
                      <SelectItem value="Per week">Per week</SelectItem>
                      <SelectItem value="Per month">Per month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" size="sm" className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Limit
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
