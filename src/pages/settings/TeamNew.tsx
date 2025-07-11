
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowLeft, Users, Settings, Calendar, Palette, Clock } from 'lucide-react';

export const TeamNew = () => {
  const navigate = useNavigate();

  const teams = [
    {
      id: 'tech-team',
      name: 'Tech Team',
      description: 'Engineering and development team',
      members: 5,
      color: 'bg-blue-500'
    },
    {
      id: 'marketing-team',
      name: 'Marketing Team',
      description: 'Growth and marketing team',
      members: 3,
      color: 'bg-green-500'
    },
    {
      id: 'sales-team',
      name: 'Sales Team',
      description: 'Sales and business development',
      members: 4,
      color: 'bg-purple-500'
    }
  ];

  const handleTeamClick = (teamId: string) => {
    navigate(`/settings/teams/${teamId}`);
  };

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="p-8 max-w-4xl w-full">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/settings')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Settings
            </Button>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-2">Teams</h1>
            <p className="text-muted-foreground">Manage your teams and team settings</p>
          </div>
        </div>

        <div className="space-y-4">
          {teams.map((team) => (
            <div
              key={team.id}
              className="border rounded-lg p-6 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => handleTeamClick(team.id)}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${team.color} rounded-lg flex items-center justify-center`}>
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{team.name}</h3>
                  <p className="text-sm text-muted-foreground">{team.description}</p>
                  <p className="text-sm text-muted-foreground mt-1">{team.members} members</p>
                </div>
                <div className="text-muted-foreground">
                  <ArrowLeft className="h-5 w-5 rotate-180" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Users className="h-4 w-4 mr-2" />
            Create New Team
          </Button>
        </div>
      </div>
    </div>
  );
};
