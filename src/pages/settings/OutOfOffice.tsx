import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Switch } from '../../components/ui/switch';
import { Textarea } from '../../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { Calendar } from '../../components/ui/calendar';
import { Plus, Calendar as CalendarIcon, Search, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';

export const OutOfOffice = () => {
  const [showOOODialog, setShowOOODialog] = useState(false);
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [provideTeamMember, setProvideTeamMember] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState('');
  const [oooSchedules, setOOOSchedules] = useState<Array<{
    id: string;
    dateRange: string;
    reason: string;
    notes: string;
    teamMember?: string;
    emoji: string;
  }>>([]);

  const teamMembers = [
    { id: '1', name: 'John Doe', email: 'john@company.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@company.com' },
    { id: '3', name: 'Mike Johnson', email: 'mike@company.com' },
  ];

  const reasonOptions = [
    { value: 'unspecified', label: 'Unspecified', emoji: '🤷' },
    { value: 'vacation', label: 'Vacation', emoji: '🏖️' },
    { value: 'travel', label: 'Travel', emoji: '✈️' },
    { value: 'sick', label: 'Sick leave', emoji: '🤒' },
    { value: 'holiday', label: 'Public holiday', emoji: '🎉' },
  ];

  const handleAddOOO = () => {
    if (dateRange.from) {
      const selectedReason = reasonOptions.find(r => r.value === reason);
      const newOOO = {
        id: Date.now().toString(),
        dateRange: dateRange.to 
          ? `${format(dateRange.from, 'MMM dd')} - ${format(dateRange.to, 'MMM dd, yyyy')}`
          : format(dateRange.from, 'MMM dd, yyyy'),
        reason: selectedReason?.label || 'Unspecified',
        emoji: selectedReason?.emoji || '🤷',
        notes,
        teamMember: provideTeamMember ? selectedTeamMember : undefined
      };
      setOOOSchedules([...oooSchedules, newOOO]);
      setDateRange({});
      setReason('');
      setNotes('');
      setProvideTeamMember(false);
      setSelectedTeamMember('');
      setShowOOODialog(false);
    }
  };

  const handleDeleteOOO = (id: string) => {
    setOOOSchedules(oooSchedules.filter(schedule => schedule.id !== id));
  };

  const selectedRange = dateRange.from && dateRange.to ? { from: dateRange.from, to: dateRange.to } : dateRange.from ? { from: dateRange.from, to: dateRange.from } : undefined;

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="p-8 max-w-4xl w-full">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold mb-2">Out of office</h1>
          <p className="text-muted-foreground mb-8">
            Communicate to your bookers when you're not available to take bookings. 
            They can still book you upon your return or you can forward them to a team member.
          </p>
        </div>

        <div className="space-y-6">
          {/* Existing OOO Schedules */}
          {oooSchedules.map((schedule) => (
            <div key={schedule.id} className="border rounded-lg p-6 bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{schedule.emoji}</div>
                  <div>
                    <h3 className="font-medium text-lg">{schedule.dateRange}</h3>
                    <p className="text-sm text-muted-foreground">
                      {schedule.teamMember ? `Forwarding to ${schedule.teamMember}` : 'No forwarding'}
                    </p>
                    {schedule.notes && (
                      <p className="text-sm text-muted-foreground mt-1">{schedule.notes}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeleteOOO(schedule.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {/* Vertical dotted line (only show if there are schedules) */}
          {oooSchedules.length > 0 && (
            <div className="flex justify-center my-8">
              <div className="w-px h-16 border-l-4 border-dotted border-gray-300"></div>
            </div>
          )}

          {/* Add button */}
          <div className="text-center">
            <Dialog open={showOOODialog} onOpenChange={setShowOOODialog}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Go Out of Office</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Dates</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.from ? (
                            dateRange.to ? (
                              `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`
                            ) : (
                              format(dateRange.from, 'MMM dd, yyyy')
                            )
                          ) : (
                            'Select date range'
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          selected={selectedRange}
                          onSelect={(range) => setDateRange(range || {})}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Reason</Label>
                    <Select value={reason} onValueChange={setReason}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                      <SelectContent>
                        {reasonOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <span className="flex items-center space-x-2">
                              <span>{option.emoji}</span>
                              <span>{option.label}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Notes</Label>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Additional notes..."
                      rows={3}
                    />
                  </div>

                  <div className="border rounded-lg p-4 bg-muted/20">
                    <div className="flex items-center justify-between mb-4">
                      <Label>Provide a link to a team member when OOO</Label>
                      <Switch 
                        checked={provideTeamMember}
                        onCheckedChange={setProvideTeamMember}
                      />
                    </div>

                    {provideTeamMember && (
                      <div className="space-y-2">
                        <Label>Select team member</Label>
                        <div className="border rounded-lg p-2 max-h-32 overflow-y-auto">
                          <div className="relative mb-2">
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search team members..." className="pl-8" />
                          </div>
                          <div className="space-y-1">
                            {teamMembers.map((member) => (
                              <div
                                key={member.id}
                                className={`p-2 rounded cursor-pointer hover:bg-muted ${
                                  selectedTeamMember === member.name ? 'bg-muted' : ''
                                }`}
                                onClick={() => setSelectedTeamMember(member.name)}
                              >
                                <div className="font-medium text-sm">{member.name}</div>
                                <div className="text-xs text-muted-foreground">{member.email}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => setShowOOODialog(false)}>
                      Close
                    </Button>
                    <Button onClick={handleAddOOO}>
                      Create
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};
