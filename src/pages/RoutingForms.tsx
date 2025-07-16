
import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Route, Plus, ChevronDown } from 'lucide-react';
import { CreateRoutingFormModal } from '../components/CreateRoutingFormModal';

export const RoutingForms = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);
  const [selectedTeamFilter, setSelectedTeamFilter] = useState('all');
  const [routingForms, setRoutingForms] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);

  // Load teams from localStorage
  useEffect(() => {
    const personalTeam = {
      id: 'personal',
      name: 'Your account',
      avatar: 'S'
    };

    const savedTeams = localStorage.getItem('teams');
    const loadedTeams = savedTeams ? JSON.parse(savedTeams) : [];
    
    setTeams([
      { ...personalTeam, name: 'Your account' },
      ...loadedTeams.map((team: any) => ({
        ...team,
        name: team.name
      }))
    ]);
  }, []);

  const handleFormCreated = (form: any) => {
    const newForm = {
      ...form,
      id: `form-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setRoutingForms(prev => [...prev, newForm]);
  };

  const getFilteredTeams = () => {
    const allOption = { id: 'all', name: 'All', avatar: '', checked: selectedTeamFilter === 'all' };
    const personalOption = { 
      id: 'personal', 
      name: 'Your account', 
      avatar: 'S', 
      checked: selectedTeamFilter === 'personal' 
    };
    
    const teamOptions = teams.slice(1).map(team => ({
      ...team,
      checked: selectedTeamFilter === team.id
    }));

    return [allOption, personalOption, ...teamOptions];
  };

  return (
    <div className="p-8">
      {routingForms.length === 0 ? (
        // Empty state
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold mb-2">Routing Forms</h1>
            <p className="text-muted-foreground">Create forms to direct attendees to the correct destinations.</p>
          </div>

          {/* Teams Filter Dropdown */}
          <div className="mb-8">
            <div className="relative inline-block">
              <button
                onClick={() => setShowTeamDropdown(!showTeamDropdown)}
                className="flex items-center space-x-2 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm"
              >
                <span>Teams: All</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {showTeamDropdown && (
                <div className="absolute top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-lg z-10">
                  <div className="py-2">
                    {getFilteredTeams().map((team) => (
                      <button
                        key={team.id}
                        onClick={() => {
                          setSelectedTeamFilter(team.id);
                          setShowTeamDropdown(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center">
                          {team.id === 'all' ? (
                            <div className="h-5 w-5 mr-2" />
                          ) : (
                            <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-xs font-medium mr-2">
                              {team.avatar}
                            </div>
                          )}
                          <span>{team.name}</span>
                        </div>
                        {team.checked && (
                          <div className="h-2 w-2 bg-primary rounded-full" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Empty State Content */}
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
            <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mb-8">
              <Route className="h-16 w-16 text-muted-foreground" />
            </div>
            
            <h2 className="text-xl font-semibold mb-4">Create your first form</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              With Routing Forms you can ask qualifying questions and route to the correct person or event type.
            </p>
            
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New
            </Button>
          </div>
        </div>
      ) : (
        // Forms display (for when we have forms)
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold mb-2">Routing Forms</h1>
            <p className="text-muted-foreground">Create forms to direct attendees to the correct destinations.</p>
          </div>

          {/* Teams Filter and New Button */}
          <div className="flex items-center justify-between mb-8">
            <div className="relative">
              <button
                onClick={() => setShowTeamDropdown(!showTeamDropdown)}
                className="flex items-center space-x-2 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm"
              >
                <span>Teams: All</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {showTeamDropdown && (
                <div className="absolute top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-lg z-10">
                  <div className="py-2">
                    {getFilteredTeams().map((team) => (
                      <button
                        key={team.id}
                        onClick={() => {
                          setSelectedTeamFilter(team.id);
                          setShowTeamDropdown(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center">
                          {team.id === 'all' ? (
                            <div className="h-5 w-5 mr-2" />
                          ) : (
                            <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-xs font-medium mr-2">
                              {team.avatar}
                            </div>
                          )}
                          <span>{team.name}</span>
                        </div>
                        {team.checked && (
                          <div className="h-2 w-2 bg-primary rounded-full" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New
            </Button>
          </div>

          {/* Forms list would go here */}
          <div className="space-y-4">
            {routingForms.map((form) => (
              <div key={form.id} className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold">{form.title}</h3>
                <p className="text-muted-foreground text-sm">{form.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <CreateRoutingFormModal 
        open={showCreateModal} 
        onClose={() => setShowCreateModal(false)}
        onFormCreated={handleFormCreated}
        teams={teams}
      />
    </div>
  );
};
