import React, { useState } from 'react';
import { Plus, MoreHorizontal, Copy, Trash2, Search } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [showMoreOptions, setShowMoreOptions] = useState<string | null>(null);
  const navigate = useNavigate();
  const schedules: Schedule[] = [{
    id: 'working-hours',
    title: 'Working Hours',
    description: 'Default',
    hours: 'Mon - Fri, 9:00 AM - 5:00 PM',
    timezone: 'Asia/Calcutta',
    isDefault: true
  }, {
    id: 'additional-hours',
    title: 'Additional hours',
    description: '',
    hours: 'Mon - Fri, 9:00 AM - 5:00 PM\nSun, Sat, 9:00 AM - 4:00 PM',
    timezone: 'Asia/Calcutta',
    isDefault: false
  }];
  const filteredSchedules = schedules.filter(schedule => schedule.title.toLowerCase().includes(searchQuery.toLowerCase()) || schedule.description.toLowerCase().includes(searchQuery.toLowerCase()));
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
  return <div className="px-6 pt-3 pb-6 space-y-4 w-full max-w-full">
      {/* Tab Selector */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center bg-muted/50 rounded-lg p-1">
          <button onClick={() => setSelectedTab('my-availability')} className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${selectedTab === 'my-availability' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
            My availability
          </button>
          <button onClick={() => setSelectedTab('team-availability')} className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${selectedTab === 'team-availability' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
            Team Availability
          </button>
        </div>
      </div>

      {/* Search Bar and New Button */}
      <div className="flex items-center justify-between space-x-4">
        <div className="relative w-80">
          
          
        </div>
        
        <button className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          New schedule
        </button>
      </div>

      {/* Schedules List */}
      <div className="space-y-3">
        {filteredSchedules.map(schedule => <div key={schedule.id} onClick={() => handleScheduleClick(schedule.id)} className="bg-card border border-border rounded-lg p-4 hover:border-border/60 transition-all hover:shadow-sm cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center mb-2 space-x-2">
                  <h3 className="font-semibold text-foreground text-base">
                    {schedule.title}
                  </h3>
                  {schedule.isDefault && <span className="inline-flex items-center px-2 py-1 bg-muted text-foreground text-xs rounded font-medium">
                      Default
                    </span>}
                </div>
                <div className="text-muted-foreground text-sm mb-2">
                  {schedule.hours.split('\n').map((line, index) => <div key={index}>{line}</div>)}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="mr-2">🌍</span>
                  <span>{schedule.timezone}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4" onClick={e => e.stopPropagation()}>
                <div className="relative">
                  <button onClick={() => setShowMoreOptions(showMoreOptions === schedule.id ? null : schedule.id)} className="p-1.5 hover:bg-muted rounded-md transition-colors">
                    
                  </button>
                  
                  {showMoreOptions === schedule.id && <div className="absolute right-0 top-full mt-1 w-36 bg-popover border border-border rounded-lg shadow-lg animate-scale-in z-10">
                      <div className="py-1">
                        <button onClick={() => handleMenuAction('duplicate', schedule.id)} className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors">
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </button>
                        <button onClick={() => handleMenuAction('delete', schedule.id)} className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </button>
                      </div>
                    </div>}
                </div>
              </div>
            </div>
          </div>)}
      </div>
    </div>;
};