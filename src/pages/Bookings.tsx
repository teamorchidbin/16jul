
import React, { useState, useRef, useEffect } from 'react';
import { Filter, Download, Search, Calendar, MapPin, Video, MoreHorizontal, Edit, UserPlus, Clock, X, Bold, Italic, Underline, Strikethrough, List, ListOrdered, Undo, Redo, Check, Copy, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Switch } from '../components/ui/switch';
import { Button } from '../components/ui/button';
import { Calendar as CalendarComponent } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Checkbox } from '../components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { AddGuestsModal } from '../components/AddGuestsModal';
import { useToast } from '../hooks/use-toast';

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  endTime: string;
  attendees: Array<{
    name: string;
    email: string;
    avatar?: string;
  }>;
  location: {
    type: 'online' | 'physical';
    name: string;
    address?: string;
    logo?: string;
  };
  notes?: string;
  eventType: string;
  status: 'upcoming' | 'unconfirmed' | 'recurring' | 'past' | 'canceled';
  recurringInfo?: string;
  isToday?: boolean;
}

const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Product Hunt Chats between Sanskar Yadav and Sanskar Yadav',
    date: 'Mon, 14 Jul',
    time: '1:45pm',
    endTime: '2:00pm',
    attendees: [
      { name: 'You', email: 'sanskarix@gmail.com' },
      { name: 'Sanskar Yadav', email: 'sanskar@example.com' }
    ],
    location: {
      type: 'online',
      name: 'Google Meet',
      logo: '📹'
    },
    eventType: '15 Min Meeting',
    status: 'upcoming',
    isToday: true
  },
  {
    id: '2',
    title: 'Product Hunt Chats between Sanskar Yadav and yo',
    date: 'Mon, 14 Jul',
    time: '2:00pm',
    endTime: '2:15pm',
    attendees: [
      { name: 'You', email: 'sanskarix@gmail.com' },
      { name: 'yo', email: 'yo@example.com' }
    ],
    location: {
      type: 'online',
      name: 'Google Meet',
      logo: '📹'
    },
    eventType: '15 Min Meeting',
    status: 'upcoming',
    isToday: true
  },
  {
    id: '3',
    title: 'Product Hunt Chats between Sanskar Yadav and Sanskar Yadav',
    date: 'Tue, 15 Jul',
    time: '10:00am',
    endTime: '10:15am',
    attendees: [
      { name: 'You', email: 'sanskarix@gmail.com' },
      { name: 'Sanskar Yadav', email: 'sanskar@example.com' }
    ],
    location: {
      type: 'online',
      name: 'Google Meet',
      logo: '📹'
    },
    eventType: '15 Min Meeting',
    status: 'upcoming',
    isToday: false
  }
];

export default function Bookings() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedMeeting, setExpandedMeeting] = useState<string | null>(null);
  const [showAddGuests, setShowAddGuests] = useState(false);
  const [showMeetingNotes, setShowMeetingNotes] = useState(false);
  const [showNoShow, setShowNoShow] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showEditLocation, setShowEditLocation] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [meetingNotes, setMeetingNotes] = useState('');
  const [cancelReason, setCancelReason] = useState('');
  const [dateRange, setDateRange] = useState<Date | undefined>(undefined);
  const navigate = useNavigate();
  const { toast } = useToast();

  const todayMeetings = mockMeetings.filter(m => m.status === activeTab && m.isToday);
  const otherMeetings = mockMeetings.filter(m => m.status === activeTab && !m.isToday);

  const handleExport = () => {
    toast({
      description: "Export successful: Your bookings will be sent to your email shortly.",
      duration: 3000,
    });
  };

  const handleReschedule = () => {
    navigate('/scheduling-coming-soon');
  };

  const handleCancelEvent = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setShowCancelConfirm(true);
  };

  const handleMarkNoShow = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setShowNoShow(true);
  };

  const isCurrentTime = (time: string) => {
    const currentHour = new Date().getHours();
    const meetingHour = parseInt(time.split(':')[0]);
    return currentHour > meetingHour;
  };

  const MeetingCard = ({ meeting }: { meeting: Meeting }) => {
    const isExpanded = expandedMeeting === meeting.id;
    
    return (
      <div className="bg-card border border-border rounded-lg overflow-hidden animate-fade-in">
        <div
          onClick={() => setExpandedMeeting(isExpanded ? null : meeting.id)}
          className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm text-muted-foreground">{meeting.date}</span>
                <span className="text-sm text-muted-foreground">{meeting.time} - {meeting.endTime}</span>
              </div>
              <h3 className="font-medium text-foreground mb-1">{meeting.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {meeting.attendees.map(a => a.name).join(' and ')}
              </p>
              <div className="flex items-center space-x-2">
                {meeting.location.type === 'online' ? (
                  <button className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800">
                    <span>{meeting.location.logo}</span>
                    <span>Join {meeting.location.name}</span>
                  </button>
                ) : (
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{meeting.location.address}</span>
                  </div>
                )}
              </div>
            </div>
            <button className="p-1 hover:bg-muted rounded">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="border-t border-border p-4 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleReschedule}>
                  <Clock className="h-4 w-4 mr-2" />
                  Reschedule booking
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleCancelEvent(meeting)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel event
                </Button>
                <div className="relative">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>

            {meeting.notes && (
              <div>
                <h4 className="font-medium mb-2">Additional Notes</h4>
                <p className="text-sm text-muted-foreground">{meeting.notes}</p>
              </div>
            )}

            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setSelectedMeeting(meeting);
                  setShowMeetingNotes(true);
                }}
              >
                Meeting notes
              </Button>
              {meeting.isToday && isCurrentTime(meeting.time) && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleMarkNoShow(meeting)}
                >
                  Mark as No-Show
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="px-6 pt-3 pb-6 space-y-4 w-full max-w-full">
      {/* Tabs and Action Buttons */}
      <div className="flex items-center justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="upcoming" className="px-4 py-2">Upcoming</TabsTrigger>
            <TabsTrigger value="unconfirmed" className="px-4 py-2">Unconfirmed</TabsTrigger>
            <TabsTrigger value="recurring" className="px-4 py-2">Recurring</TabsTrigger>
            <TabsTrigger value="past" className="px-4 py-2">Past</TabsTrigger>
            <TabsTrigger value="canceled" className="px-4 py-2">Canceled</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center space-x-3 ml-4">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
          <Button
            variant="outline"
            onClick={handleExport}
            className="flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export All</span>
          </Button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg animate-fade-in">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">Attendee: All</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-md text-sm"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-foreground">SY</span>
                    </div>
                    <span className="text-sm">Sanskar Yadav</span>
                  </div>
                  <Checkbox />
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">Host: All</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">All Users</span>
                  <Checkbox defaultChecked />
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">Event Type: All</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">All event types</span>
                  <Checkbox />
                </div>
                <hr />
                <div>
                  <p className="text-sm font-medium mb-2">Personal</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">15 Min Meeting</span>
                    <Checkbox />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">Teams: All</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">All</span>
                  <Checkbox />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Personal</span>
                  <Checkbox />
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Jul 14, 2025
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={dateRange}
                onSelect={setDateRange}
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>

          <Button variant="ghost" size="sm">Clear all filters</Button>
        </div>
      )}

      {/* Meetings List */}
      <div className="space-y-6">
        <TabsContent value="upcoming" className="mt-0">
          {todayMeetings.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">TODAY</h3>
              <div className="space-y-2">
                {todayMeetings.map((meeting) => (
                  <MeetingCard key={meeting.id} meeting={meeting} />
                ))}
              </div>
            </div>
          )}
          
          {otherMeetings.length > 0 && (
            <div className={`space-y-2 ${todayMeetings.length > 0 ? 'mt-8' : ''}`}>
              {otherMeetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="unconfirmed" className="mt-0">
          <div className="text-center py-8 text-muted-foreground">
            No unconfirmed bookings
          </div>
        </TabsContent>

        <TabsContent value="recurring" className="mt-0">
          <div className="text-center py-8 text-muted-foreground">
            No recurring bookings
          </div>
        </TabsContent>

        <TabsContent value="past" className="mt-0">
          <div className="text-center py-8 text-muted-foreground">
            No past bookings
          </div>
        </TabsContent>

        <TabsContent value="canceled" className="mt-0">
          <div className="text-center py-8 text-muted-foreground">
            No canceled bookings
          </div>
        </TabsContent>
      </div>

      {/* Add Guests Modal */}
      <AddGuestsModal
        isOpen={showAddGuests}
        onClose={() => setShowAddGuests(false)}
        onAdd={(emails) => console.log('Add guests:', emails)}
      />

      {/* Meeting Notes Modal */}
      {showMeetingNotes && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-lg font-semibold mb-2">Meeting Notes</h2>
            <p className="text-sm text-muted-foreground mb-4">Add notes to your meeting</p>
            
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2 p-2 border border-border rounded-t-md">
                <Button variant="ghost" size="sm"><Bold className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm"><Italic className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm"><Underline className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm"><Strikethrough className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm"><List className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm"><ListOrdered className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm"><Undo className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm"><Redo className="h-4 w-4" /></Button>
              </div>
              <textarea
                value={meetingNotes}
                onChange={(e) => setMeetingNotes(e.target.value)}
                className="w-full h-32 p-3 border border-border rounded-b-md border-t-0 resize-none"
                placeholder="Add your meeting notes here..."
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowMeetingNotes(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowMeetingNotes(false)}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Event Modal */}
      {showCancelConfirm && selectedMeeting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to cancel the event?</h2>
            
            <div className="space-y-3 mb-4">
              <div>
                <span className="font-medium">What:</span> {selectedMeeting.title}
              </div>
              <div>
                <span className="font-medium">When:</span> {selectedMeeting.date} {selectedMeeting.time} - {selectedMeeting.endTime}
              </div>
              <div>
                <span className="font-medium">Who:</span> {selectedMeeting.attendees.map(a => `${a.name} (${a.email})`).join(', ')}
              </div>
              <div>
                <span className="font-medium">Where:</span> {selectedMeeting.location.name}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Reason for cancellation (optional)</label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full h-20 p-3 border border-border rounded-md resize-none"
                placeholder="Why are you cancelling?"
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCancelConfirm(false)}>
                Nevermind
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => {
                  setShowCancelConfirm(false);
                  setSelectedMeeting(null);
                }}
              >
                Cancel event
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* No Show Modal */}
      {showNoShow && selectedMeeting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Mark as No-Show</h2>
            <p className="text-sm text-muted-foreground mb-4">Select attendees to mark as no-show</p>
            
            <div className="space-y-3 mb-4">
              {selectedMeeting.attendees.map((attendee, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-foreground">
                        {attendee.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm">{attendee.name}</span>
                  </div>
                  <Checkbox />
                </div>
              ))}
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowNoShow(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowNoShow(false)}>
                Mark as No-Show
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
