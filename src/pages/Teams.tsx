
import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Users } from 'lucide-react';
import { CreateTeamModal } from '../components/CreateTeamModal';

export const Teams = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [teams, setTeams] = useState<any[]>([]);

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
        // Teams list (for future use)
        <div>
          <h1 className="text-2xl font-semibold mb-2">Teams</h1>
          <p className="text-muted-foreground mb-8">Create and manage teams to use collaborative features.</p>
          {/* Teams list would go here */}
        </div>
      )}

      <CreateTeamModal 
        open={showCreateModal} 
        onClose={() => setShowCreateModal(false)}
        onTeamCreated={(team) => {
          setTeams([...teams, team]);
          setShowCreateModal(false);
        }}
      />
    </div>
  );
};
