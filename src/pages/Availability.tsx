
import React, { useState } from 'react';
import { Plus, MoreHorizontal, Copy, Trash2, Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Schedule {
  id: string;
  name: string;
  description: string;
  timezone: string;
  isDefault: boolean;
}

export const Availability = () => {
  const [selectedTeam, setSelectedTeam] = useState('my-availability');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMoreOptions, setShowMoreOptions] = useState<string | null>(null);
  const navigate = useNavigate();

  const schedules: Schedule[] = [
    {
      id: 'working-hours',
      name: 'Working Hours',
      description: 'Mon - Fri, 9:00 AM - 5:00 PM',
      timezone: 'Asia/Calcutta',
      isDefault: true
    },
    {
      id: 'additional-hours',
      name: 'Additional hours',
      description: 'Mon - Fri, 9:00 AM - 5:00 PM, Sun, Sat, 9:00 AM - 4:00 PM',
      timezone: 'Asia/Calcutta',
      isDefault: false
    }
  ];

  const filteredSchedules = schedules.filter(schedule =>
    schedule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    schedule.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleScheduleClick = (scheduleId: string) => {
    navigate(`/availability/${scheduleId}`);
  };

  const handleMenuAction = (action: string, scheduleId: string) => {
    setShowMoreOptions(null);
    switch (action) {
      case 'duplicate':
        console.log('Duplicating schedule', scheduleId);
        break;
      case 'delete':
        console.log('Deleting schedule', scheduleId);
        break;
    }
  };

  return (
    <div className="px-6 pt-3 pb-6 space-y-4 w-full max-w-full">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Availability</h1>
        <p className="text-muted-foreground">Configure times when you are available for bookings.</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4 flex-1 min-w-0 rounded-md">
          <div className="flex items-center bg-muted/50 rounded-lg p-1 flex-shrink-0">
            <button
              onClick={() => setSelectedTeam('my-availability')}
              className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                selectedTeam === 'my-availability'
                  ? 'bg-muted text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="truncate">My availability</span>
            </button>
          </div>
          
          <div className="w-px h-5 bg-border flex-shrink-0"></div>
          
          <div className="flex space-x-2 flex-1 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setSelectedTeam('team-availability')}
              className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-all flex-shrink-0 min-w-fit ${
                selectedTeam === 'team-availability'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <span className="truncate">Team Availability</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar and New Button */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search schedules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-sm"
            />
          </div>
        </div>
        
        <Button className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          New
        </Button>
      </div>

      {/* Schedules List */}
      <div className="space-y-2">
        {filteredSchedules.map((schedule) => (
          <div
            key={schedule.id}
            onClick={() => handleScheduleClick(schedule.id)}
            className="bg-card border border-border rounded-lg p-4 hover:border-border/60 transition-all hover:shadow-sm cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center mb-2 space-x-3">
                  <h3 className="font-semibold text-foreground text-base">
                    {schedule.name}
                  </h3>
                  {schedule.isDefault && (
                    <span className="inline-flex items-center px-2 py-1 bg-muted text-foreground text-sm rounded">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{schedule.description}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="mr-2">🌍</span>
                  <span>{schedule.timezone}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4" onClick={(e) => e.stopPropagation()}>
                <div className="relative">
                  <button
                    onClick={() => setShowMoreOptions(showMoreOptions === schedule.id ? null : schedule.id)}
                    className="p-1.5 hover:bg-muted rounded-md transition-colors"
                  >
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </button>
                  
                  {showMoreOptions === schedule.id && (
                    <div className="absolute right-0 top-full mt-1 w-40 bg-popover border border-border rounded-lg shadow-lg animate-scale-in z-10">
                      <div className="py-1">
                        <button
                          onClick={() => handleMenuAction('duplicate', schedule.id)}
                          className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                        >
                          <Copy className="h-4 w-4 mr-2" />
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
