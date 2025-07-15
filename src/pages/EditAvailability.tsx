
import React, { useState } from 'react';
import { ArrowLeft, Plus, Copy, Trash2, Info } from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';

const EditAvailability = () => {
  const navigate = useNavigate();
  const { scheduleId } = useParams();
  const location = useLocation();
  const scheduleName = location.state?.scheduleName || 'Schedule';

  const [isDefaultSchedule, setIsDefaultSchedule] = useState(true);
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [weekDays, setWeekDays] = useState([
    { day: 'Monday', enabled: true, times: [{ start: '9:00am', end: '5:00pm' }] },
    { day: 'Tuesday', enabled: true, times: [{ start: '9:00am', end: '5:00pm' }] },
    { day: 'Wednesday', enabled: true, times: [{ start: '9:00am', end: '5:00pm' }] },
    { day: 'Thursday', enabled: true, times: [{ start: '9:00am', end: '5:00pm' }] },
    { day: 'Friday', enabled: true, times: [{ start: '9:00am', end: '5:00pm' }] },
    { day: 'Saturday', enabled: false, times: [{ start: '9:00am', end: '5:00pm' }] },
    { day: 'Sunday', enabled: false, times: [{ start: '9:00am', end: '5:00pm' }] }
  ]);

  const handleDayToggle = (dayIndex: number) => {
    setWeekDays(prev => prev.map((day, index) => 
      index === dayIndex ? { ...day, enabled: !day.enabled } : day
    ));
  };

  const handleTimeChange = (dayIndex: number, timeIndex: number, field: 'start' | 'end', value: string) => {
    setWeekDays(prev => prev.map((day, dIndex) => 
      dIndex === dayIndex 
        ? {
            ...day,
            times: day.times.map((time, tIndex) => 
              tIndex === timeIndex ? { ...time, [field]: value } : time
            )
          }
        : day
    ));
  };

  const addTimeSlot = (dayIndex: number) => {
    setWeekDays(prev => prev.map((day, index) => 
      index === dayIndex 
        ? { ...day, times: [...day.times, { start: '9:00am', end: '5:00pm' }] }
        : day
    ));
  };

  const removeTimeSlot = (dayIndex: number, timeIndex: number) => {
    setWeekDays(prev => prev.map((day, dIndex) => 
      dIndex === dayIndex 
        ? { ...day, times: day.times.filter((_, tIndex) => tIndex !== timeIndex) }
        : day
    ));
  };

  const copyTimeSlot = (dayIndex: number, timeIndex: number) => {
    const timeSlot = weekDays[dayIndex].times[timeIndex];
    setWeekDays(prev => prev.map((day, dIndex) => 
      dIndex === dayIndex 
        ? { ...day, times: [...day.times, { ...timeSlot }] }
        : day
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/availability')}
                className="p-2 hover:bg-muted rounded-md transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-foreground">{scheduleName}</h1>
                <p className="text-sm text-muted-foreground">Mon - Fri, 9:00 AM - 5:00 PM</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Set to Default</span>
                <Switch
                  checked={isDefaultSchedule}
                  onCheckedChange={setIsDefaultSchedule}
                />
              </div>
              <Button>Save</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 max-w-4xl">
        {/* Timezone Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-foreground">Timezone</h2>
          </div>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-80 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
          >
            <option value="Asia/Kolkata">Asia/Kolkata</option>
            <option value="America/New_York">America/New_York</option>
            <option value="Europe/London">Europe/London</option>
            <option value="Asia/Tokyo">Asia/Tokyo</option>
          </select>
        </div>

        {/* Weekly Schedule */}
        <div className="space-y-4">
          {weekDays.map((day, dayIndex) => (
            <div key={day.day} className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 w-32">
                <Switch
                  checked={day.enabled}
                  onCheckedChange={() => handleDayToggle(dayIndex)}
                />
                <span className="text-sm font-medium text-foreground">{day.day}</span>
              </div>

              <div className="flex-1">
                {day.enabled ? (
                  <div className="space-y-2">
                    {day.times.map((timeSlot, timeIndex) => (
                      <div key={timeIndex} className="flex items-center space-x-2">
                        <input
                          type="time"
                          value={timeSlot.start.replace('am', '').replace('pm', '')}
                          onChange={(e) => handleTimeChange(dayIndex, timeIndex, 'start', e.target.value)}
                          className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
                        />
                        <span className="text-muted-foreground">-</span>
                        <input
                          type="time"
                          value={timeSlot.end.replace('am', '').replace('pm', '')}
                          onChange={(e) => handleTimeChange(dayIndex, timeIndex, 'end', e.target.value)}
                          className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
                        />
                        
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => addTimeSlot(dayIndex)}
                            className="p-1 hover:bg-muted rounded transition-colors"
                            title="Add time slot"
                          >
                            <Plus className="h-4 w-4 text-muted-foreground" />
                          </button>
                          <button
                            onClick={() => copyTimeSlot(dayIndex, timeIndex)}
                            className="p-1 hover:bg-muted rounded transition-colors"
                            title="Copy time slot"
                          >
                            <Copy className="h-4 w-4 text-muted-foreground" />
                          </button>
                          {day.times.length > 1 && (
                            <button
                              onClick={() => removeTimeSlot(dayIndex, timeIndex)}
                              className="p-1 hover:bg-muted rounded transition-colors"
                              title="Remove time slot"
                            >
                              <Trash2 className="h-4 w-4 text-muted-foreground" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">Unavailable</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Date Overrides Section */}
        <div className="mt-12">
          <div className="flex items-center space-x-2 mb-4">
            <h2 className="text-lg font-medium text-foreground">Date overrides</h2>
            <Info className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Add dates when your availability changes from your daily hours.
          </p>
          <Button variant="outline" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add an override</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditAvailability;
