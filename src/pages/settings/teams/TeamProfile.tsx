
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';

export const TeamProfile = () => {
  const { teamId } = useParams();
  const [teamName, setTeamName] = useState('Test1');
  const [teamUrl, setTeamUrl] = useState('test1');
  const [bio, setBio] = useState('');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Team Profile</CardTitle>
          <CardDescription>
            Manage your team's public profile information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="team-name">Team Name</Label>
            <Input
              id="team-name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter team name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="team-url">Team URL</Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                cal.id/team/
              </span>
              <Input
                id="team-url"
                value={teamUrl}
                onChange={(e) => setTeamUrl(e.target.value)}
                className="rounded-l-none"
                placeholder="team-url"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="A little something about your team"
              rows={4}
            />
          </div>

          <Button>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
};
