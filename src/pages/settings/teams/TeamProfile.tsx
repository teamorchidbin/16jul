
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
    let classes = 'min-h-[120px] resize-none';
    if (isDescriptionBold) classes += ' font-bold';
    if (isDescriptionItalic) classes += ' italic';
    if (isDescriptionStrike) classes += ' line-through';
    return classes;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Team Profile</h3>
        <p className="text-sm text-muted-foreground">
          Manage your team's basic information and settings
        </p>
      </div>

      <Separator />

      <div className="space-y-6">
        {/* Team Avatar */}
        <div className="space-y-2">
          <Label>Team Avatar</Label>
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold">
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
              className="rounded-l-none"
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
                className="h-8 w-8 p-0"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant={isDescriptionItalic ? "default" : "ghost"}
                size="sm"
                onClick={toggleItalic}
                className="h-8 w-8 p-0"
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant={isDescriptionStrike ? "default" : "ghost"}
                size="sm"
                onClick={toggleStrike}
                className="h-8 w-8 p-0"
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
        <div className="flex justify-end">
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>

        <Separator />

        {/* Danger Zone */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Irreversible and destructive actions
            </p>
          </div>
          <div className="rounded-lg border border-destructive/50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Delete Team</h4>
                <p className="text-sm text-muted-foreground">
                  Permanently delete this team and all its data. This action cannot be undone.
                </p>
              </div>
              <Button variant="destructive" onClick={handleDelete}>
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
