
import React from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowLeft, Users, Settings, Calendar, Palette, Clock } from 'lucide-react';

export const TeamDetail = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();

  const teamData = {
    'tech-team': {
      name: 'Tech Team',
      description: 'Engineering and development team',
      color: 'bg-blue-500'
    },
    'marketing-team': {
      name: 'Marketing Team',
      description: 'Growth and marketing team',
      color: 'bg-green-500'
    },
    'sales-team': {
      name: 'Sales Team',
      description: 'Sales and business development',
      color: 'bg-purple-500'
    }
  };

  const team = teamData[teamId as keyof typeof teamData];

  const navigation = [
    { name: 'Profile', href: `/settings/teams/${teamId}/profile`, icon: Users },
    { name: 'Members', href: `/settings/teams/${teamId}/members`, icon: Users },
    { name: 'Event Types', href: `/settings/teams/${teamId}/event-types`, icon: Calendar },
    { name: 'Appearance', href: `/settings/teams/${teamId}/appearance`, icon: Palette },
    { name: 'Booking Limits', href: `/settings/teams/${teamId}/booking-limits`, icon: Clock },
  ];

  if (!team) {
    return <div>Team not found</div>;
  }

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="p-8 max-w-4xl w-full">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/settings/teams/new')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Teams
            </Button>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className={`w-16 h-16 ${team.color} rounded-lg flex items-center justify-center`}>
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold">{team.name}</h1>
                <p className="text-muted-foreground">{team.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg">
          <div className="grid grid-cols-1 divide-y">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className="flex items-center space-x-4 p-6 hover:bg-muted/50 transition-colors"
              >
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{item.name}</span>
                <div className="ml-auto">
                  <ArrowLeft className="h-5 w-5 rotate-180 text-muted-foreground" />
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
