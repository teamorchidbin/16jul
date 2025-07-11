
import React, { useState } from 'react';
import { ChevronDown, Moon, HelpCircle, MapPin, LogOut, User, Bell } from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';

interface HeaderProps {
  showEventTypesHeader?: boolean;
}

export const Header = ({ showEventTypesHeader = false }: HeaderProps) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-20 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="h-full px-8 flex items-center justify-between w-full">
        {showEventTypesHeader && (
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-foreground">Event Types</h1>
            <p className="text-sm text-muted-foreground mt-1">Create events to share for people to book on your calendar.</p>
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
