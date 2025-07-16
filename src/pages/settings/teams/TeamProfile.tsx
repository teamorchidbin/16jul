
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Label } from '../../../components/ui/label';
import { Separator } from '../../../components/ui/separator';
import { Trash2, Bold, Italic, Strikethrough } from 'lucide-react';
import { mockTeams } from '../../../data/mockData';

export const TeamProfile = () => {
  const { teamId } = useParams();
  const [teamName, setTeamName] = useState('');
  const [teamUrl, setTeamUrl] = useState('');
  const [teamBio, setTeamBio] = useState('');
  const [isDescriptionBold, setIsDescriptionBold] = useState(false);
  const [isDescriptionItalic, setIsDescriptionItalic] = useState(false);
  const [isDescriptionStrike, setIsDescriptionStrike] = useState(false);

  // Find current team data
  const currentTeam = mockTeams.find(team => team.id === teamId);

  React.useEffect(() => {
    if (currentTeam) {
      setTeamName(currentTeam.name);
      setTeamUrl(currentTeam.url);
    }
  }, [currentTeam]);

  const handleSave = () => {
    console.log('Saving team profile:', { teamName, teamUrl, teamBio });
  };

  const handleDelete = () => {
    console.log('Deleting team');
  };

  const toggleBold = () => setIsDescriptionBold(!isDescriptionBold);
  const toggleItalic = () => setIsDescriptionItalic(!isDescriptionItalic);
  const toggleStrike = () => setIsDescriptionStrike(!isDescriptionStrike);

  const getDescriptionClasses = () => {
    let classes = 'min-h-[120px] resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/20';
    if (isDescriptionBold) classes += ' font-bold';
    if (isDescriptionItalic) classes += ' italic';
    if (isDescriptionStrike) classes += ' line-through';
    return classes;
  };

  return (
    <div className="min-h-screen bg-background flex justify-center animate-fade-in">
      <div className="p-8 max-w-2xl w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Team Profile</h1>
          <p className="text-muted-foreground">Manage your team's basic information and settings</p>
        </div>

        <div className="space-y-6">
          {/* Team Avatar */}
          <div className="space-y-2">
            <Label>Team Avatar</Label>
            <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/20 transition-colors duration-200">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold transition-transform duration-200 hover:scale-105">
                {currentTeam?.avatar || 'T'}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This will be shown as your team's avatar</p>
              </div>
            </div>
          </div>

          {/* Team Name */}
          <div className="space-y-2">
            <Label htmlFor="team-name">Team Name</Label>
            <Input
              id="team-name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter team name"
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Team URL */}
          <div className="space-y-2">
            <Label htmlFor="team-url">Team URL</Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 border border-r-0 border-input bg-muted text-muted-foreground text-sm rounded-l-md">
                cal.id/team/
              </span>
              <Input
                id="team-url"
                value={teamUrl}
                onChange={(e) => setTeamUrl(e.target.value)}
                placeholder="team-url"
                className="rounded-l-none transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <p className="text-xs text-muted-foreground">This is your team's public URL</p>
          </div>

          {/* Team Bio */}
          <div className="space-y-2">
            <Label htmlFor="team-bio">About</Label>
            <div className="border rounded-lg">
              {/* Rich text toolbar */}
              <div className="flex items-center space-x-1 p-2 border-b bg-muted/20">
                <Button
                  type="button"
                  variant={isDescriptionBold ? "default" : "ghost"}
                  size="sm"
                  onClick={toggleBold}
                  className="h-8 w-8 p-0 transition-all duration-200"
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant={isDescriptionItalic ? "default" : "ghost"}
                  size="sm"
                  onClick={toggleItalic}
                  className="h-8 w-8 p-0 transition-all duration-200"
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant={isDescriptionStrike ? "default" : "ghost"}
                  size="sm"
                  onClick={toggleStrike}
                  className="h-8 w-8 p-0 transition-all duration-200"
                >
                  <Strikethrough className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                id="team-bio"
                value={teamBio}
                onChange={(e) => setTeamBio(e.target.value)}
                placeholder="Tell people about your team..."
                className={getDescriptionClasses()}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end pt-6">
            <Button 
              onClick={handleSave} 
              className="hover:scale-105 transition-transform duration-200"
            >
              Save Changes
            </Button>
          </div>

          <Separator className="my-8" />

          {/* Danger Zone */}
          <div className="space-y-4 p-4 border border-destructive/20 rounded-lg bg-destructive/5 animate-fade-in">
            <h3 className="text-lg font-semibold text-destructive">Danger Zone</h3>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Delete Team</h4>
                <p className="text-sm text-muted-foreground">
                  Permanently delete this team and all its data. This action cannot be undone.
                </p>
              </div>
              <Button 
                variant="destructive" 
                onClick={handleDelete}
                className="hover:scale-105 transition-transform duration-200"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Team
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
