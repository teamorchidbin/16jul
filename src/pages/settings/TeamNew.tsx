
import React from 'react';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const TeamNew = () => {
  const navigate = useNavigate();

  const teams = [
    {
      id: 'tech-team',
      name: 'Tech Team',
      description: 'Development and engineering team',
      members: 8,
      color: 'bg-blue-500'
    },
    {
      id: 'marketing-team',
      name: 'Marketing Team',
      description: 'Marketing and growth team',
      members: 5,
      color: 'bg-green-500'
    },
    {
      id: 'design-team',
      name: 'Design Team',
      description: 'UI/UX and design team',
      members: 3,
      color: 'bg-purple-500'
    }
  ];

  const handleTeamClick = (teamId: string) => {
    navigate(`/settings/teams/${teamId}`);
  };

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="p-8 max-w-4xl w-full">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold mb-2">Teams</h1>
          <p className="text-muted-foreground">Manage your teams and team members</p>
        </div>

        <div className="space-y-4">
          {teams.map((team) => (
            <div
              key={team.id}
              className="border rounded-lg p-6 hover:bg-muted/20 cursor-pointer transition-colors"
              onClick={() => handleTeamClick(team.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${team.color} rounded-lg flex items-center justify-center text-white font-semibold`}>
                    {team.name.split(' ').map(word => word[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-medium">{team.name}</h3>
                    <p className="text-sm text-muted-foreground">{team.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{team.members} members</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Create New Team
          </Button>
        </div>
      </div>
    </div>
  );
};
