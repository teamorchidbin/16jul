
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Switch } from '../../../components/ui/switch';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';

export const TeamBookingLimits = () => {
  const { teamId } = useParams();
  const [enableLimits, setEnableLimits] = useState(false);
  const [limitType, setLimitType] = useState('per_day');
  const [limitValue, setLimitValue] = useState('5');
  const [advancedLimits, setAdvancedLimits] = useState(false);

  const handleSave = () => {
    console.log('Saving booking limits:', { enableLimits, limitType, limitValue, advancedLimits });
  };

  return (
    <div className="min-h-screen bg-background flex justify-center animate-fade-in">
      <div className="p-8 max-w-2xl w-full">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold mb-2">Booking Limits</h1>
          <p className="text-muted-foreground">Control how many bookings can be made for your team</p>
        </div>

        <div className="space-y-6">
          {/* Enable Booking Limits */}
          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/20 transition-colors duration-200">
            <div>
              <Label htmlFor="enable-limits" className="text-base font-medium">Enable booking limits</Label>
              <p className="text-sm text-muted-foreground">Limit the number of bookings that can be made</p>
            </div>
            <Switch
              id="enable-limits"
              checked={enableLimits}
              onCheckedChange={setEnableLimits}
              className="transition-all duration-200"
            />
          </div>

          {/* Booking Limits Configuration */}
          {enableLimits && (
            <div className="space-y-6 p-4 border rounded-lg bg-muted/10 animate-scale-in">
              <h3 className="text-lg font-semibold">Limit Configuration</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="limit-value">Maximum bookings</Label>
                  <Input
                    id="limit-value"
                    type="number"
                    value={limitValue}
                    onChange={(e) => setLimitValue(e.target.value)}
                    min="1"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="limit-type">Time period</Label>
                  <Select value={limitType} onValueChange={setLimitType}>
                    <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="per_hour">Per hour</SelectItem>
                      <SelectItem value="per_day">Per day</SelectItem>
                      <SelectItem value="per_week">Per week</SelectItem>
                      <SelectItem value="per_month">Per month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Advanced Limits Toggle */}
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/20 transition-colors duration-200">
                <div>
                  <Label htmlFor="advanced-limits" className="text-base font-medium">Advanced limits</Label>
                  <p className="text-sm text-muted-foreground">Configure different limits for different time periods</p>
                </div>
                <Switch
                  id="advanced-limits"
                  checked={advancedLimits}
                  onCheckedChange={setAdvancedLimits}
                  className="transition-all duration-200"
                />
              </div>

              {/* Advanced Configuration */}
              {advancedLimits && (
                <div className="space-y-4 p-4 border rounded-lg bg-muted/20 animate-scale-in">
                  <h4 className="font-medium">Advanced Configuration</h4>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Per Hour</Label>
                        <Input type="number" defaultValue="2" className="transition-all duration-200 focus:ring-2 focus:ring-primary/20" />
                      </div>
                      <div className="space-y-2">
                        <Label>Per Day</Label>
                        <Input type="number" defaultValue="10" className="transition-all duration-200 focus:ring-2 focus:ring-primary/20" />
                      </div>
                      <div className="space-y-2">
                        <Label>Per Week</Label>
                        <Input type="number" defaultValue="50" className="transition-all duration-200 focus:ring-2 focus:ring-primary/20" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Per Month</Label>
                        <Input type="number" defaultValue="200" className="transition-all duration-200 focus:ring-2 focus:ring-primary/20" />
                      </div>
                      <div className="space-y-2">
                        <Label>Per Year</Label>
                        <Input type="number" defaultValue="2000" className="transition-all duration-200 focus:ring-2 focus:ring-primary/20" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end pt-6">
            <Button 
              onClick={handleSave}
              className="hover:scale-105 transition-transform duration-200"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
