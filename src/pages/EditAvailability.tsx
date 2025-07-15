
import React, { useState } from 'react';
import { ArrowLeft, Plus, ChevronDown } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Switch } from '../components/ui/switch';

export const EditAvailability = () => {
  const navigate = useNavigate();
  const { scheduleId } = useParams();
  const [isSetToDefault, setIsSetToDefault] = useState(true);
  const [timezone, setTimezone] = useState('Asia/Kolkata');

  const scheduleTitle = scheduleId === 'working-hours' ? 'Working Hours' : 'Additional hours';

  const weekDays = [
    { day: 'Monday', enabled: true, startTime: '9:00am', endTime: '5:00pm' },
    { day: 'Tuesday', enabled: true, startTime: '9:00am', endTime: '5:00pm' },
    { day: 'Wednesday', enabled: true, startTime: '9:00am', endTime: '5:00pm' },
    { day: 'Thursday', enabled: true, startTime: '9:00am', endTime: '5:00pm' },
    { day: 'Friday', enabled: true, startTime: '9:00am', endTime: '5:00pm' },
    { day: 'Saturday', enabled: false, startTime: '', endTime: '' },
    { day: 'Sunday', enabled: false, startTime: '', endTime: '' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/availability')}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold">{scheduleTitle}</h1>
                <p className="text-sm text-muted-foreground">Mon - Fri, 9:00 AM - 5:00 PM</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-muted-foreground">Set to Default</span>
                <Switch checked={isSetToDefault} onCheckedChange={setIsSetToDefault} />
              </div>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="space-y-6">
              {/* Days Schedule */}
              <div className="space-y-4">
                {weekDays.map((daySchedule, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-4">
                      <Switch 
                        checked={daySchedule.enabled} 
                        onCheckedChange={() => {}} 
                        size="sm"
                      />
                    </div>
                    <div className="w-24 text-sm font-medium">
                      {daySchedule.day}
                    </div>
                    {daySchedule.enabled ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="time"
                          value={daySchedule.startTime.replace('am', '').replace('pm', '')}
                          className="px-3 py-2 border border-border rounded-md text-sm bg-background"
                        />
                        <span className="text-muted-foreground">-</span>
                        <input
                          type="time"
                          value={daySchedule.endTime.replace('am', '').replace('pm', '')}
                          className="px-3 py-2 border border-border rounded-md text-sm bg-background"
                        />
                        <button className="p-2 hover:bg-muted rounded-md transition-colors">
                          <Plus className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">Unavailable</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Timezone Section */}
              <div className="pt-6 border-t border-border">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Timezone</h3>
                  <div className="relative">
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent appearance-none bg-background"
                    >
                      <option value="Asia/Kolkata">Asia/Kolkata</option>
                      <option value="America/New_York">America/New_York</option>
                      <option value="Europe/London">Europe/London</option>
                      <option value="Asia/Tokyo">Asia/Tokyo</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                {/* Date Overrides Section */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-2">Date overrides</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add dates when your availability changes from your daily hours.
                  </p>
                  <button className="flex items-center px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                    <Plus className="h-4 w-4 mr-2" />
                    Add an override
                  </button>
                </div>

                {/* Troubleshooter Section */}
                <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Something doesn't look right?</h4>
                  <button className="px-4 py-2 bg-background border border-border rounded-lg hover:bg-muted transition-colors text-sm">
                    Launch Troubleshooter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
