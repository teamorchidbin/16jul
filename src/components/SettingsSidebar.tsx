
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, User, Settings, Calendar, Video, Palette, Clock, Shield, Lock, Users, Download, Code, Webhook, Key } from 'lucide-react';

export const SettingsSidebar = () => {
  const navigation = [
    {
      title: 'Sanskar Yadav',
      items: [
        { name: 'Profile', href: '/settings/profile', icon: User },
        { name: 'General', href: '/settings/general', icon: Settings },
        { name: 'Calendars', href: '/settings/calendars', icon: Calendar },
        { name: 'Conferencing', href: '/settings/conferencing', icon: Video },
        { name: 'Appearance', href: '/settings/appearance', icon: Palette },
        { name: 'Out of office', href: '/settings/out-of-office', icon: Clock },
      ]
    },
    {
      title: 'Security',
      items: [
        { name: 'Password', href: '/settings/security/password', icon: Lock },
        { name: 'Impersonation', href: '/settings/security/impersonation', icon: Shield },
      ]
    },
    {
      title: 'Import',
      items: [
        { name: 'Calendly', href: '/settings/import/calendly', icon: Download },
      ]
    },
    {
      title: 'Developer',
      items: [
        { name: 'Webhooks', href: '/settings/developer/webhooks', icon: Webhook },
        { name: 'API keys', href: '/settings/developer/api-keys', icon: Key },
      ]
    },
    {
      title: 'Teams',
      items: [
        { name: 'Add a team', href: '/settings/teams/new', icon: Users },
      ]
    }
  ];

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col">
      <div className="flex h-20 items-center px-6 border-b border-border">
        <NavLink
          to="/"
          className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </NavLink>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        {navigation.map((section) => (
          <div key={section.title}>
            <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`
                  }
                >
                  <item.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
};
