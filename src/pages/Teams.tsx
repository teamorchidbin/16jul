
import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Users } from 'lucide-react';
import { CreateTeamModal } from '../components/CreateTeamModal';
import { TeamCard } from '../components/TeamCard';

export const Teams = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [teams, setTeams] = useState<any[]>([]);

  // Load teams from localStorage on component mount
  useEffect(() => {
    const loadTeams = () => {
      const savedTeams = localStorage.getItem('teams');
      if (savedTeams) {
        try {
          const parsedTeams = JSON.parse(savedTeams);
          setTeams(parsedTeams);
        } catch (error) {
          console.error('Error loading teams:', error);
        }
      }
    };

    loadTeams();

    // Listen for storage changes to update teams in real-time
    const handleStorageChange = () => {
      loadTeams();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('teamsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('teamsUpdated', handleStorageChange);
    };
  }, []);

  const handleTeamUpdate = (teamId: string, completedActions: string[]) => {
    const updatedTeams = teams.map(team => 
      team.id === teamId 
        ? { ...team, completedActions }
        : team
    );
    setTeams(updatedTeams);
    
    // Save to localStorage
    localStorage.setItem('teams', JSON.stringify(updatedTeams));
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('teamsUpdated'));
  };

  const handleTeamDelete = (teamId: string) => {
    const updatedTeams = teams.filter(team => team.id !== teamId);
    setTeams(updatedTeams);
    
    // Save to localStorage
    localStorage.setItem('teams', JSON.stringify(updatedTeams));
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('teamsUpdated'));
  };

  const handleTeamCreated = (team: any) => {
    const newTeam = { ...team, completedActions: [] };
    const updatedTeams = [...teams, newTeam];
    setTeams(updatedTeams);
    
    // Save to localStorage
    localStorage.setItem('teams', JSON.stringify(updatedTeams));
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('teamsUpdated'));
  };

  return (
    <div className="p-8">
      {teams.length === 0 ? (
        // Empty state
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mb-8">
            <Users className="h-16 w-16 text-muted-foreground" />
          </div>
          
          <h1 className="text-2xl font-semibold mb-4">Create a team to get started</h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            Create your first team and invite other users to work together.
          </p>
          
          <Button onClick={() => setShowCreateModal(true)}>
            Create a new team
          </Button>
        </div>
      ) : (
        // Teams display
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold mb-2">Teams</h1>
            <p className="text-muted-foreground">Create and manage teams to use collaborative features.</p>
          </div>

          <div className="space-y-8">
            {teams.map((team, index) => (
              <TeamCard
                key={team.id}
                team={team}
                isOnlyTeam={teams.length === 1}
                onTeamUpdate={handleTeamUpdate}
                onTeamDelete={handleTeamDelete}
              />
            ))}
          </div>

          {/* Add new team button */}
          <div className="mt-8 text-center">
            <Button onClick={() => setShowCreateModal(true)} variant="outline">
              Create another team
            </Button>
          </div>
        </div>
      )}

      <CreateTeamModal 
        open={showCreateModal} 
        onClose={() => setShowCreateModal(false)}
        onTeamCreated={handleTeamCreated}
      />
    </div>
  );
};
