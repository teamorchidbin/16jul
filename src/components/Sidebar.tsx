
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Calendar, CalendarCheck, Clock, Settings, Zap } from 'lucide-react';

const navigation = [
  { name: 'Event Types', href: '/event-types', icon: Calendar },
  { name: 'Bookings', href: '/bookings', icon: CalendarCheck },
  { name: 'Availability', href: '/availability', icon: Clock },
  { name: 'Workflows', href: '/workflows', icon: Zap },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r border-border">
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive: linkActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    linkActive || isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`
                }
              >
                <item.icon
                  className="mr-3 h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
        
        <div className="flex-shrink-0 px-2 py-4 border-t border-border">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`
            }
          >
            <Settings
              className="mr-3 h-5 w-5 flex-shrink-0"
              aria-hidden="true"
            />
            Settings
          </NavLink>
        </div>
      </div>
    </div>
  );
};
