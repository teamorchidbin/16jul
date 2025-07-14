
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Moon, HelpCircle, MapPin, LogOut, User, Bell, Copy, Eye } from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';
import { Switch } from './ui/switch';

interface HeaderProps {
  showEventTypesHeader?: boolean;
  eventData?: {
    title: string;
    url: string;
    enabled: boolean;
    onEnabledChange: (enabled: boolean) => void;
  };
}

export const Header = ({
  showEventTypesHeader = false,
  eventData
}: HeaderProps) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown]);

  return (
    <div className="bg-background border-b border-border px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showEventTypesHeader && eventData && (
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold text-sm">
                  {eventData.title.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h1 className="text-lg font-semibold text-foreground">{eventData.title}</h1>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Copy className="h-4 w-4" />
                  <span>{eventData.url}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={eventData.enabled}
                  onCheckedChange={eventData.onEnabledChange}
                />
                <Eye className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-muted rounded-lg relative"
            >
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </button>
            {showNotifications && (
              <NotificationDropdown onClose={() => setShowNotifications(false)} />
            )}
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-2 p-2 hover:bg-muted rounded-lg"
            >
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white text-sm font-medium">SY</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b border-border">
                  <p className="font-medium text-foreground">Sanskar Yadav</p>
                  <p className="text-sm text-muted-foreground">sanskar@onehash.ai</p>
                </div>
                
                <div className="py-1">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted">
                    <User className="h-4 w-4 mr-3" />
                    Profile
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted">
                    <Moon className="h-4 w-4 mr-3" />
                    Dark mode
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted">
                    <HelpCircle className="h-4 w-4 mr-3" />
                    Help & support
                  </button>
                </div>
                
                <div className="border-t border-border pt-1">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted">
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
