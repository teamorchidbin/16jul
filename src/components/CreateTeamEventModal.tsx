
import React, { useState } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';

interface CreateTeamEventModalProps {
  open: boolean;
  onClose: () => void;
  teamId?: string;
  teamName?: string;
}

export const CreateTeamEventModal = ({ open, onClose, teamId, teamName }: CreateTeamEventModalProps) => {
  const [title, setTitle] = useState('');
  const [assignment, setAssignment] = useState('collective');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    if (!title.trim()) {
      toast({
        title: "Please fill in this field",
        variant: "destructive"
      });
      return;
    }

    // Generate a random event ID (in real app, this would come from backend)
    const eventId = Math.floor(Math.random() * 1000) + 1;
    
    toast({
      title: "Event created successfully",
      description: `${title} has been created for ${teamName || 'the team'}.`,
    });
    
    onClose();
    navigate(`/event/${eventId}/setup`);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Add a new team event type</h2>
            <p className="text-muted-foreground">Create a new event type for people to book times with.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Quick Chat"
                className={!title.trim() && title !== '' ? 'border-red-500' : ''}
              />
              {!title.trim() && title !== '' && (
                <p className="text-sm text-red-500">Please fill in this field.</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={`https://cal.id/team/${teamId || 'team'}/`}
                readOnly
                className="bg-muted"
              />
            </div>

            <div className="space-y-3">
              <Label>Assignment</Label>
              
              <div className="space-y-3">
                <div className="border rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <input 
                      type="radio" 
                      name="assignment" 
                      value="collective"
                      checked={assignment === 'collective'}
                      onChange={(e) => setAssignment(e.target.value)}
                      className="mt-1" 
                    />
                    <div>
                      <h4 className="font-medium">Collective</h4>
                      <p className="text-sm text-muted-foreground">Schedule meetings when all selected team members are available.</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <input 
                      type="radio" 
                      name="assignment" 
                      value="round-robin"
                      checked={assignment === 'round-robin'}
                      onChange={(e) => setAssignment(e.target.value)}
                      className="mt-1" 
                    />
                    <div>
                      <h4 className="font-medium">Round Robin</h4>
                      <p className="text-sm text-muted-foreground">Cycle meetings between multiple team members.</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <input 
                      type="radio" 
                      name="assignment" 
                      value="managed"
                      checked={assignment === 'managed'}
                      onChange={(e) => setAssignment(e.target.value)}
                      className="mt-1" 
                    />
                    <div>
                      <h4 className="font-medium">Managed Event</h4>
                      <p className="text-sm text-muted-foreground">Create & distribute event types in bulk to team members</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button onClick={handleContinue} className="flex-1">
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
