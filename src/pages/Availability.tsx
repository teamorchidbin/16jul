
import React, { useState } from 'react';
import { Plus, MoreHorizontal, Copy2, Trash2, Search, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

interface Schedule {
  id: string;
  name: string;
  description: string;
  timezone: string;
  isDefault: boolean;
}

const mockSchedules: Schedule[] = [
  {
    id: '1',
    name: 'Working Hours',
    description: 'Mon - Fri, 9:00 AM - 5:00 PM',
    timezone: 'Asia/Calcutta',
    isDefault: true
  },
  {
    id: '2',
    name: 'Additional hours',
    description: 'Mon - Fri, 9:00 AM - 5:00 PM\nSun, Sat, 9:00 AM - 4:00 PM',
    timezone: 'Asia/Calcutta',
    isDefault: false
  }
];

export const Availability = () => {
  const [activeTab, setActiveTab] = useState('my-availability');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMoreOptions, setShowMoreOptions] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const navigate = useNavigate();

  const filteredSchedules = mockSchedules.filter(schedule =>
    schedule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    schedule.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleScheduleClick = (scheduleId: string, scheduleName: string) => {
    navigate(`/availability/${scheduleId}`, { state: { scheduleName } });
  };

  const handleCopyPublicLink = () => {
    navigator.clipboard.writeText('https://cal.id/sanskar');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 1500);
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
        <h1 className="text-2xl font-bold text-foreground">Availability</h1>
        <p className="text-muted-foreground">Configure times when you are available for bookings.</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4 flex-1 min-w-0 rounded-md">
          <div className="flex items-center bg-muted/50 rounded-lg p-1 flex-shrink-0">
            <button
              onClick={() => setActiveTab('my-availability')}
              className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                activeTab === 'my-availability'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              My Availability
            </button>
            <button
              onClick={() => setActiveTab('team-availability')}
              className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                activeTab === 'team-availability'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Team Availability
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar and Actions */}
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
          
          <div className="relative">
            <button
              onClick={handleCopyPublicLink}
              className="flex items-center space-x-2 px-3 py-1.5 bg-muted/70 text-muted-foreground text-sm rounded-md hover:bg-muted transition-colors"
            >
              <span className="text-sm">cal.id/sanskar</span>
              <Copy className="h-4 w-4" />
            </button>
            {copiedLink && (
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-foreground text-background text-xs rounded animate-fade-in whitespace-nowrap">
                Copied
              </div>
            )}
          </div>
        </div>
        
        <Button className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          New Schedule
        </Button>
      </div>

      {/* Schedule Cards */}
      <div className="space-y-2">
        {filteredSchedules.map((schedule) => (
          <div
            key={schedule.id}
            className="relative group animate-fade-in"
          >
            <div
              onClick={() => handleScheduleClick(schedule.id, schedule.name)}
              className="bg-card border border-border rounded-lg p-4 hover:border-border/60 transition-all hover:shadow-sm cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center mb-2 space-x-3">
                    <h3 className="font-semibold text-foreground text-base">
                      {schedule.name}
                    </h3>
                    {schedule.isDefault && (
                      <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm mb-3 whitespace-pre-line">
                    {schedule.description}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>🌐 {schedule.timezone}</span>
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
                      <div className="absolute right-0 top-full mt-1 w-40 bg-background border border-border rounded-lg shadow-lg animate-scale-in z-10">
                        <div className="py-1">
                          <button
                            onClick={() => handleMenuAction('duplicate', schedule.id)}
                            className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                          >
                            <Copy2 className="h-4 w-4 mr-2" />
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
          </div>
        ))}

        {filteredSchedules.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No schedules found
          </div>
        )}
      </div>
    </div>
  );
};
