
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover';
import { Bold, Italic, Link, Strikethrough, Trash2 } from 'lucide-react';

export const TeamProfile = () => {
  const { teamId } = useParams();
  const [teamName, setTeamName] = useState('Testing Cal ID');
  const [teamUrl, setTeamUrl] = useState('testing-cal-id');
  const [about, setAbout] = useState('');
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.getElementById('team-about') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = textarea.value.substring(start, end);
      const newText = textarea.value.substring(0, start) + before + selectedText + after + textarea.value.substring(end);
      setAbout(newText);
      
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + before.length, end + before.length);
      }, 0);
    }
  };

  const handleAddLink = () => {
    if (linkUrl) {
      insertMarkdown('[', `](${linkUrl})`);
      setLinkUrl('');
      setShowLinkDialog(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="p-8 max-w-4xl w-full">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold mb-2">Profile</h1>
          <p className="text-muted-foreground">Manage settings for your team profile</p>
        </div>

        <div className="space-y-8 mb-12">
          {/* Team Logo */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Team Logo</Label>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center text-white font-bold text-xl">
                TI
              </div>
              <Button variant="outline">Upload logo</Button>
            </div>
          </div>

          {/* Team Name */}
          <div className="space-y-2">
            <Label htmlFor="teamName">Team Name</Label>
            <Input 
              id="teamName" 
              value={teamName} 
              onChange={(e) => setTeamName(e.target.value)} 
            />
          </div>

          {/* Team URL */}
          <div className="space-y-2">
            <Label htmlFor="teamUrl">Team URL</Label>
            <div className="flex">
              <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md text-sm text-muted-foreground">
                cal.id/team/
              </div>
              <Input 
                id="teamUrl" 
                value={teamUrl} 
                onChange={(e) => setTeamUrl(e.target.value)}
                className="rounded-l-none" 
              />
            </div>
          </div>

          {/* About */}
          <div className="space-y-2">
            <Label htmlFor="team-about">About</Label>
            <div className="border rounded-md">
              <div className="flex items-center space-x-2 p-2 border-b">
                <Button variant="ghost" size="sm" onClick={() => insertMarkdown('**', '**')}>
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => insertMarkdown('*', '*')}>
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => insertMarkdown('~~', '~~')}>
                  <Strikethrough className="h-4 w-4" />
                </Button>
                <Popover open={showLinkDialog} onOpenChange={setShowLinkDialog}>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Link className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <Label htmlFor="linkUrl">Enter URL:</Label>
                      <Input
                        id="linkUrl"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="https://example.com"
                      />
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={handleAddLink}>Add Link</Button>
                        <Button size="sm" variant="outline" onClick={() => setShowLinkDialog(false)}>Cancel</Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <Textarea
                id="team-about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="border-none resize-none"
                rows={4}
                placeholder="A few sentences about your team. This will appear on your team's url page."
              />
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="border border-destructive/30 rounded-lg p-6 bg-destructive/5">
          <div className="mb-4">
            <h2 className="text-lg font-medium mb-2 text-destructive">Danger zone</h2>
            <p className="text-sm text-muted-foreground">Be careful. Team deletion cannot be undone.</p>
          </div>
          <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
            <Trash2 className="h-4 w-4 mr-2" />
            Disband Team
          </Button>
        </div>
      </div>
    </div>
  );
};
