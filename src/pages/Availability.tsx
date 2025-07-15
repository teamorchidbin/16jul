
import React, { useState } from 'react';
import { Plus, MoreHorizontal, Copy, Trash2, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Schedule {
  id: string;
  title: string;
  description: string;
  hours: string;
  timezone: string;
  isDefault: boolean;
}

export const Availability = () => {
  const [selectedTab, setSelectedTab] = useState('my-availability');
  const [showMoreOptions, setShowMoreOptions] = useState<string | null>(null);
  const navigate = useNavigate();

  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: 'working-hours',
      title: 'Working Hours',
      description: 'Default',
      hours: 'Mon - Fri, 9:00 AM - 5:00 PM',
      timezone: 'Asia/Calcutta',
      isDefault: true
    },
    {
      id: 'additional-hours',
      title: 'Additional hours',
      description: '',
      hours: 'Mon - Fri, 9:00 AM - 5:00 PM\nSun, Sat, 9:00 AM - 4:00 PM',
      timezone: 'Asia/Calcutta',
      isDefault: false
    }
  ]);

  const handleScheduleClick = (scheduleId: string) => {
    navigate(`/availability/${scheduleId}`);
  };

  const handleSetAsDefault = (scheduleId: string) => {
    setSchedules(prev => prev.map(schedule => ({
      ...schedule,
      isDefault: schedule.id === scheduleId
    })));
    setShowMoreOptions(null);
  };

  const handleMenuAction = (action: string, scheduleId: string) => {
    setShowMoreOptions(null);
    switch (action) {
      case 'setDefault':
        handleSetAsDefault(scheduleId);
        break;
      case 'duplicate':
        console.log('Duplicating schedule', scheduleId);
        break;
      case 'delete':
        console.log('Deleting schedule', scheduleId);
        break;
    }
  };

  // Sort schedules to show default first
  const sortedSchedules = [...schedules].sort((a, b) => {
    if (a.isDefault && !b.isDefault) return -1;
    if (!a.isDefault && b.isDefault) return 1;
    return 0;
  });

  return (
    <div className="px-6 pt-3 pb-6 space-y-6 w-full max-w-full">
      {/* Tab Selector with New Schedule Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center bg-muted/50 rounded-lg p-1">
          <button
            onClick={() => setSelectedTab('my-availability')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              selectedTab === 'my-availability'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            My availability
          </button>
          <button
            onClick={() => setSelectedTab('team-availability')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              selectedTab === 'team-availability'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Team Availability
          </button>
        </div>

        <button className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          New schedule
        </button>
      </div>

      {/* Schedules List */}
      <div className="space-y-4">
        {sortedSchedules.map(schedule => (
          <div
            key={schedule.id}
            onClick={() => handleScheduleClick(schedule.id)}
            className="bg-card rounded-lg p-6 hover:shadow-md transition-all cursor-pointer border border-border/50 hover:border-border"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center mb-3 space-x-3">
                  <h3 className="font-semibold text-foreground text-lg">
                    {schedule.title}
                  </h3>
                  {schedule.isDefault && (
                    <span 
                      className="inline-flex items-center px-2 py-1 text-xs rounded font-medium text-white"
                      style={{ backgroundColor: '#008c44' }}
                    >
                      Default
                    </span>
                  )}
                </div>
                <div className="text-muted-foreground text-sm mb-3 leading-relaxed">
                  {schedule.hours.split('\n').map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="mr-2">🌍</span>
                  <span>{schedule.timezone}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4" onClick={e => e.stopPropagation()}>
                <div className="relative">
                  <button
                    onClick={() => setShowMoreOptions(showMoreOptions === schedule.id ? null : schedule.id)}
                    className="p-2 hover:bg-muted rounded-md transition-colors"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                  
                  {showMoreOptions === schedule.id && (
                    <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-lg animate-scale-in z-10">
                      <div className="py-1">
                        {!schedule.isDefault && (
                          <button
                            onClick={() => handleMenuAction('setDefault', schedule.id)}
                            className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                          >
                            <Star className="h-4 w-4 mr-2 text-muted-foreground" />
                            Set as default
                          </button>
                        )}
                        <button
                          onClick={() => handleMenuAction('duplicate', schedule.id)}
                          className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                        >
                          <Copy className="h-4 w-4 mr-2 text-muted-foreground" />
                          Duplicate
                        </button>
                        <button
                          onClick={() => handleMenuAction('delete', schedule.id)}
                          className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
