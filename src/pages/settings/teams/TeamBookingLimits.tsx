
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Switch } from '../../../components/ui/switch';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Plus } from 'lucide-react';

export const TeamBookingLimits = () => {
  const { teamId } = useParams();
  const [enableLimits, setEnableLimits] = useState(false);

  const handleSave = () => {
    console.log('Saving booking limits:', { enableLimits });
  };

  return (
    <div className="min-h-screen bg-background flex justify-center animate-fade-in">
      <div className="p-8 max-w-2xl w-full">
        <div className="mb-8">
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
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Booking Limits</h3>
                <Button variant="outline" size="sm" className="hover:scale-105 transition-transform duration-200">
                  <Plus className="h-4 w-4 mr-2" />
                  Add limit
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 p-4 border rounded-lg">
                  <div className="space-y-2">
                    <Label>Limit</Label>
                    <Input
                      type="number"
                      defaultValue="5"
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Per</Label>
                    <Select defaultValue="day">
                      <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hour">Hour</SelectItem>
                        <SelectItem value="day">Day</SelectItem>
                        <SelectItem value="week">Week</SelectItem>
                        <SelectItem value="month">Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Action</Label>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-destructive hover:text-destructive">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
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
