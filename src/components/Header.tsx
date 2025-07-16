
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Moon, HelpCircle, MapPin, LogOut, User, Settings, ExternalLink } from 'lucide-react';
import { Switch } from './ui/switch';
import { useLocation } from 'react-router-dom';

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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

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

  const isHomeRoute = location.pathname === '/';
  const isEventTypesPage = location.pathname === '/event-types';
  const isBookingsPage = location.pathname === '/bookings';
  const isAvailabilityPage = location.pathname === '/availability';
  const isEditAvailabilityPage = location.pathname.startsWith('/availability/');
  const isTeamsPage = location.pathname === '/teams';
  const isRoutingFormsPage = location.pathname === '/routing-forms';

  const getPageDescription = () => {
    if (isHomeRoute) return 'Welcome to your scheduling dashboard';
    if (isEventTypesPage) return 'Manage your booking links and event configurations';
    if (isBookingsPage) return 'View and manage all your scheduled appointments';
    if (isAvailabilityPage) return 'Set your available hours for bookings';
    if (isTeamsPage) return 'Collaborate with your team members on scheduling';
    if (isRoutingFormsPage) return 'Direct attendees to the right destinations with smart forms';
    return '';
  };

  return (
    <header className="h-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="h-full px-8 flex items-center justify-between w-full">
        {isHomeRoute && (
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">{getPageDescription()}</p>
          </div>
        )}

        {showEventTypesHeader && !eventData && (
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-foreground">Event Types</h1>
            <p className="text-sm text-muted-foreground mt-1">{getPageDescription()}</p>
          </div>
        )}
        
        {isBookingsPage && (
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-foreground">Bookings</h1>
            <p className="text-sm text-muted-foreground mt-1">{getPageDescription()}</p>
          </div>
        )}

        {isAvailabilityPage && (
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-foreground">Availability</h1>
            <p className="text-sm text-muted-foreground mt-1">{getPageDescription()}</p>
          </div>
        )}

        {isTeamsPage && (
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-foreground">Teams</h1>
            <p className="text-sm text-muted-foreground mt-1">{getPageDescription()}</p>
          </div>
        )}

        {isRoutingFormsPage && (
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-foreground">Routing Forms</h1>
            <p className="text-sm text-muted-foreground mt-1">{getPageDescription()}</p>
          </div>
        )}
        
        {eventData && (
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-1">
              <h1 className="text-xl font-semibold text-foreground">
                {eventData.title}
              </h1>
            </div>
          </div>
        )}
        
        <div className="flex items-center space-x-4 ml-auto">
          {eventData && (
            <div className="flex items-center space-x-2">
              <Switch checked={eventData.enabled} onCheckedChange={eventData.onEnabledChange} />
              <span className="text-sm text-muted-foreground">
                {eventData.enabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          )}

          {/* Profile */}
          <div className="relative" ref={dropdownRef}>
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
                  <button 
                    onClick={() => {
                      window.location.href = '/settings/profile';
                      setShowProfileDropdown(false);
                    }} 
                    className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                    title="My Profile"
                  >
                    <User className="h-4 w-4 mr-2" />
                    My Profile
                  </button>
                  <button 
                    onClick={() => {
                      window.location.href = '/settings/out-of-office';
                      setShowProfileDropdown(false);
                    }} 
                    className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                    title="Out of Office"
                  >
                    <Moon className="h-4 w-4 mr-2" />
                    Out of Office
                  </button>
                  <button 
                    className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                    title="Roadmap"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Roadmap
                  </button>
                  <button 
                    className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                    title="Help"
                  >
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Help
                  </button>
                  <div className="border-t border-border my-1"></div>
                  <button 
                    onClick={() => {
                      window.location.href = '/settings';
                      setShowProfileDropdown(false);
                    }} 
                    className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                    title="Settings"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </button>
                  <button 
                    className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors text-destructive"
                    title="Sign Out"
                  >
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
