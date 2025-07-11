
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const TeamNew = () => {
  const navigate = useNavigate();

  const teams = [
    {
      id: 'tech-team',
      name: 'Tech Team',
      description: 'Development and engineering team',
      color: 'bg-blue-500',
      members: 8
    },
    {
      id: 'marketing-team',
      name: 'Marketing Team',
      description: 'Marketing and growth team',
      color: 'bg-green-500',
      members: 5
    },
    {
      id: 'design-team',
      name: 'Design Team',
      description: 'UI/UX and design team',
      color: 'bg-purple-500',
      members: 3
    }
  ];

  const handleTeamClick = (teamId: string) => {
    navigate(`/settings/teams/${teamId}/profile`);
  };

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="p-8 max-w-4xl w-full">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold mb-2">Teams</h1>
          <p className="text-muted-foreground">Manage your teams and team settings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <div
              key={team.id}
              onClick={() => handleTeamClick(team.id)}
              className="border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-16 h-16 ${team.color} rounded-lg flex items-center justify-center text-white font-semibold text-xl`}>
                  {team.name.split(' ').map(word => word[0]).join('')}
                </div>
                <div>
                  <h3 className="font-medium text-lg">{team.name}</h3>
                  <p className="text-sm text-muted-foreground">{team.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{team.members} members</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
