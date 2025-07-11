
import React, { useState } from 'react';
import { ChevronDown, Moon, HelpCircle, MapPin, LogOut, User, Bell, Copy, Eye } from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';
import { Switch } from './ui/switch';

interface HeaderProps {
  showEventTypesHeader?: boolean;
  eventData?: {
    title: string;
    url: string;
    enabled: boolean;
    onTitleChange: (title: string) => void;
    onUrlChange: (url: string) => void;
    onEnabledChange: (enabled: boolean) => void;
  };
}

export const Header = ({ showEventTypesHeader = false, eventData }: HeaderProps) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-20 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="h-full px-8 flex items-center justify-between w-full">
        {showEventTypesHeader && !eventData && (
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-foreground">Event Types</h1>
            <p className="text-sm text-muted-foreground mt-1">Create events to share for people to book on your calendar.</p>
          </div>
        )}
        
        {eventData && (
          <div className="flex-1 space-y-3">
            {/* Event Title */}
            <div>
              <input
                type="text"
                value={eventData.title}
                onChange={(e) => eventData.onTitleChange(e.target.value)}
                className="text-xl font-semibold text-foreground bg-transparent border-none outline-none focus:ring-0 p-0 w-full"
                placeholder="Event Title"
              />
            </div>
            
            {/* URL and Toggle Row */}
            <div className="flex items-center space-x-4">
              {/* Event URL */}
              <div className="flex items-center space-x-2 flex-1">
                <div className="flex flex-1 max-w-md">
                  <span className="inline-flex items-center px-3 py-1.5 border border-r-0 border-border bg-muted text-muted-foreground text-sm rounded-l-lg">
                    cal.id/sanskar/
                  </span>
                  <input
                    type="text"
                    value={eventData.url}
                    onChange={(e) => eventData.onUrlChange(e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-border rounded-r-lg focus:ring-1 focus:ring-ring focus:border-transparent bg-background text-sm"
                  />
                </div>
                <div className="flex items-center space-x-1">
                  <button className="p-1.5 bg-muted/70 text-muted-foreground text-sm rounded hover:bg-muted transition-colors">
                    <Copy className="h-3 w-3" />
                  </button>
                  <button className="p-1.5 text-primary hover:text-primary/80 transition-colors">
                    <Eye className="h-3 w-3" />
                  </button>
                </div>
              </div>
              
              {/* Toggle */}
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={eventData.enabled} 
                  onCheckedChange={eventData.onEnabledChange} 
                />
                <span className="text-sm font-medium text-foreground whitespace-nowrap">
                  {eventData.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex items-center space-x-4 ml-auto">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-muted rounded-lg transition-colors relative"
            >
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>
            
            {showNotifications && (
              <NotificationDropdown onClose={() => setShowNotifications(false)} />
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-3 px-4 py-2 hover:bg-muted rounded-lg transition-colors w-full"
            >
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">SY</span>
              </div>
              <span className="text-sm font-medium text-foreground">Sanskar Yadav</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
            
            {showProfileDropdown && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-lg animate-scale-in z-10">
                <div className="py-1">
                  <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors">
                    <User className="h-4 w-4 mr-2" />
                    My Profile
                  </button>
                  <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors">
                    <Moon className="h-4 w-4 mr-2" />
                    Out of Office
                  </button>
                  <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors">
                    <MapPin className="h-4 w-4 mr-2" />
                    RoadMap
                  </button>
                  <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Help
                  </button>
                  <div className="border-t border-border my-1"></div>
                  <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
