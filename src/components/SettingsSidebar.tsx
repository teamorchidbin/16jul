
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ArrowLeft, User, Settings, Calendar, Video, Palette, Clock, Shield, Lock, Users, Download, Code, Webhook, Key, ChevronDown, ChevronRight } from 'lucide-react';

export const SettingsSidebar = () => {
  const location = useLocation();
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  
  const teams = [
    {
      id: 'tech-team',
      name: 'Tech Team',
      href: '/settings/teams/tech-team',
      subItems: [
        { name: 'Profile', href: '/settings/teams/tech-team/profile' },
        { name: 'Members', href: '/settings/teams/tech-team/members' },
        { name: 'Event Types', href: '/settings/teams/tech-team/event-types' },
        { name: 'Appearance', href: '/settings/teams/tech-team/appearance' },
        { name: 'Booking Limits', href: '/settings/teams/tech-team/booking-limits' },
      ]
    },
    {
      id: 'design-team',
      name: 'Design Team',
      href: '/settings/teams/design-team',
      subItems: [
        { name: 'Profile', href: '/settings/teams/design-team/profile' },
        { name: 'Members', href: '/settings/teams/design-team/members' },
        { name: 'Event Types', href: '/settings/teams/design-team/event-types' },
        { name: 'Appearance', href: '/settings/teams/design-team/appearance' },
        { name: 'Booking Limits', href: '/settings/teams/design-team/booking-limits' },
      ]
    },
    {
      id: 'marketing-team',
      name: 'Marketing Team',
      href: '/settings/teams/marketing-team',
      subItems: [
        { name: 'Profile', href: '/settings/teams/marketing-team/profile' },
        { name: 'Members', href: '/settings/teams/marketing-team/members' },
        { name: 'Event Types', href: '/settings/teams/marketing-team/event-types' },
        { name: 'Appearance', href: '/settings/teams/marketing-team/appearance' },
        { name: 'Booking Limits', href: '/settings/teams/marketing-team/booking-limits' },
      ]
    }
  ];

  const navigation = [
    {
      title: '',
      items: [
        { name: 'Back', href: '/', icon: ArrowLeft },
      ]
    },
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
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col overflow-hidden">
      {/* Logo */}
      <div className="flex h-20 items-center px-6 border-b border-border">
        <img 
          src="https://cdn.prod.website-files.com/5e53d34464688e6f5960a338/682f1bb36cedcb0cd39a7027_Onehash-CalId-logo%20icon.svg" 
          alt="Cal ID" 
          className="h-8 w-8" 
        />
        <span className="ml-3 text-xl font-semibold">Cal ID</span>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto scrollbar-none">
        {navigation.map((section) => (
          <div key={section.title}>
            {section.title && (
              <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`
                  }
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </NavLink>
              ))}
            </div>
            
            {/* Teams sub-navigation */}
            {section.title === 'Teams' && (
              <div className="mt-2 space-y-1">
                {teams.map((team) => {
                  const isTeamActive = location.pathname.includes(team.id);
                  const isExpanded = expandedTeam === team.id || isTeamActive;
                  
                  return (
                    <div key={team.id}>
                      <button
                        onClick={() => setExpandedTeam(isExpanded ? null : team.id)}
                        className={`w-full group flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                          isTeamActive
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        <div className="flex items-center">
                          <Users className="mr-3 h-5 w-5 flex-shrink-0" />
                          {team.name}
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      
                      {isExpanded && (
                        <div className="ml-8 mt-1 space-y-1">
                          {team.subItems.map((subItem) => (
                            <NavLink
                              key={subItem.name}
                              to={subItem.href}
                              className={({ isActive }) =>
                                `block px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                                  isActive
                                    ? 'bg-primary/10 text-primary font-medium'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                }`
                              }
                            >
                              {subItem.name}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};
