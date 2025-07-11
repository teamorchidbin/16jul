
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowLeft, Users, Calendar, Palette, Clock, User } from 'lucide-react';

export const TeamDetail = () => {
  const { teamId, section } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(section || 'profile');

  const teams = {
    'tech-team': {
      name: 'Tech Team',
      description: 'Development and engineering team',
      color: 'bg-blue-500'
    },
    'marketing-team': {
      name: 'Marketing Team',
      description: 'Marketing and growth team',
      color: 'bg-green-500'
    },
    'design-team': {
      name: 'Design Team',
      description: 'UI/UX and design team',
      color: 'bg-purple-500'
    }
  };

  const team = teams[teamId as keyof typeof teams];

  const sections = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'members', name: 'Members', icon: Users },
    { id: 'event-types', name: 'Event Types', icon: Calendar },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'booking-limits', name: 'Booking Limits', icon: Clock },
  ];

  if (!team) {
    return <div>Team not found</div>;
  }

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Team Profile</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 ${team.color} rounded-lg flex items-center justify-center text-white font-semibold text-xl`}>
                  {team.name.split(' ').map(word => word[0]).join('')}
                </div>
                <div>
                  <h4 className="font-medium">{team.name}</h4>
                  <p className="text-sm text-muted-foreground">{team.description}</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'members':
        return (
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Team Members</h3>
            <p className="text-muted-foreground">Manage team members and their permissions.</p>
          </div>
        );
      case 'event-types':
        return (
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Event Types</h3>
            <p className="text-muted-foreground">Configure team event types and scheduling.</p>
          </div>
        );
      case 'appearance':
        return (
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Appearance</h3>
            <p className="text-muted-foreground">Customize the team's appearance and branding.</p>
          </div>
        );
      case 'booking-limits':
        return (
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Booking Limits</h3>
            <p className="text-muted-foreground">Set booking limits and availability for the team.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="p-8 max-w-4xl w-full">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/settings/teams/new')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Teams
          </Button>
          
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-2">{team.name}</h1>
            <p className="text-muted-foreground">{team.description}</p>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="border rounded-lg p-2 mb-8">
          <div className="flex space-x-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{section.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Content */}
        {renderSectionContent()}
      </div>
    </div>
  );
};
