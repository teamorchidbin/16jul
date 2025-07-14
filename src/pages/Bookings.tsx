
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
  // Upcoming meetings
  {
    id: '1',
    title: '30 Minute Meeting',
    date: 'Mon, 14 Jul',
    time: '9:00am',
    endTime: '9:30am',
    attendees: [
      { name: 'You', email: 'sanskarix@gmail.com' },
      { name: 'Sanskar Yadav', email: 'sanskar@example.com' }
    ],
    location: {
      type: 'online',
      name: 'Google Meet',
      logo: '📹'
    },
    notes: 'Discussion about project requirements and timeline. Please come prepared with your questions.',
    eventType: '30 Min Meeting',
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
  },
  // Unconfirmed meetings
  {
    id: '4',
    title: 'Weekly Team Sync',
    date: 'Wed, 16 Jul',
    time: '3:00pm',
    endTime: '4:00pm',
    attendees: [
      { name: 'You', email: 'sanskarix@gmail.com' },
      { name: 'Team Lead', email: 'lead@example.com' }
    ],
    location: {
      type: 'online',
      name: 'Zoom',
      logo: '📹'
    },
    eventType: '60 Min Meeting',
    status: 'unconfirmed',
    isToday: false
  },
  // Recurring meetings
  {
    id: '5',
    title: 'Daily Standup',
    date: 'Every Day',
    time: '9:00am',
    endTime: '9:15am',
    attendees: [
      { name: 'You', email: 'sanskarix@gmail.com' },
      { name: 'Development Team', email: 'dev@example.com' }
    ],
    location: {
      type: 'online',
      name: 'Jitsi Meet',
      logo: '📹'
    },
    eventType: '15 Min Meeting',
    status: 'recurring',
    recurringInfo: 'Daily at 9:00 AM',
    isToday: false
  },
  // Past meetings
  {
    id: '6',
    title: 'Client Presentation',
    date: 'Fri, 12 Jul',
    time: '2:00pm',
    endTime: '3:00pm',
    attendees: [
      { name: 'You', email: 'sanskarix@gmail.com' },
      { name: 'Client', email: 'client@example.com' }
    ],
    location: {
      type: 'physical',
      name: 'Conference Room A',
      address: '123 Business St, City'
    },
    eventType: '60 Min Meeting',
    status: 'past',
    isToday: false
  },
  // Canceled meetings
  {
    id: '7',
    title: 'Project Review',
    date: 'Thu, 11 Jul',
    time: '11:00am',
    endTime: '12:00pm',
    attendees: [
      { name: 'You', email: 'sanskarix@gmail.com' },
      { name: 'Manager', email: 'manager@example.com' }
    ],
    location: {
      type: 'online',
      name: 'Teams',
      logo: '📹'
    },
    eventType: '60 Min Meeting',
    status: 'canceled',
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
  const [showEditDropdown, setShowEditDropdown] = useState<string | null>(null);
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
      <div className="bg-card border border-border rounded-lg overflow-hidden animate-fade-in shadow-sm hover:shadow-md transition-all duration-200">
        <div className="p-6">
          {/* Header with title and status */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-lg text-foreground">{meeting.title}</h3>
                {meeting.status === 'upcoming' && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    confirmed
                  </span>
                )}
              </div>
              
              {/* Attendee */}
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-xs font-medium text-primary-foreground">
                    {meeting.attendees[1]?.name.charAt(0) || 'U'}
                  </span>
                </div>
                <span className="text-sm">{meeting.attendees[1]?.name || 'Unknown'}</span>
              </div>

              {/* Time */}
              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{meeting.isToday ? 'Today' : meeting.date} • {meeting.time} - {meeting.endTime}</span>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-2 mb-4">
                {meeting.location.type === 'online' ? (
                  <button className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                    <Video className="h-4 w-4" />
                    <span>Join {meeting.location.name}</span>
                  </button>
                ) : (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{meeting.location.address}</span>
                  </div>
                )}
              </div>

              {/* Notes */}
              {meeting.notes && (
                <div className="bg-muted/30 rounded-lg p-3 mb-4">
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded bg-muted-foreground/20 mt-0.5 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">{meeting.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleReschedule} className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Reschedule
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleCancelEvent(meeting)} className="flex items-center gap-2">
                <X className="h-4 w-4" />
                Cancel
              </Button>
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowEditDropdown(showEditDropdown === meeting.id ? null : meeting.id)}
                  className="flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                {showEditDropdown === meeting.id && (
                  <div className="absolute top-full left-0 mt-1 bg-background border border-border rounded-md shadow-lg z-10 min-w-48">
                    <button 
                      className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
                      onClick={() => {
                        setSelectedMeeting(meeting);
                        setShowEditLocation(true);
                        setShowEditDropdown(null);
                      }}
                    >
                      <MapPin className="h-4 w-4" />
                      Edit location
                    </button>
                    <button 
                      className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
                      onClick={() => {
                        setSelectedMeeting(meeting);
                        setShowAddGuests(true);
                        setShowEditDropdown(null);
                      }}
                    >
                      <UserPlus className="h-4 w-4" />
                      Add guests
                    </button>
                  </div>
                )}
              </div>
            </div>
            
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
        </div>
      </div>
    );
  };

  return (
    <div className="px-6 pt-3 pb-6 space-y-4 w-full max-w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Tabs and Action Buttons */}
        <div className="flex items-center justify-between">
          <TabsList className="grid w-full max-w-md grid-cols-5">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="unconfirmed">Unconfirmed</TabsTrigger>
            <TabsTrigger value="recurring">Recurring</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="canceled">Canceled</TabsTrigger>
          </TabsList>
          
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

        {/* Filters with slide animation */}
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
          <TabsContent value="upcoming" className="mt-6">
            {todayMeetings.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">TODAY</h3>
                <div className="space-y-4">
                  {todayMeetings.map((meeting) => (
                    <MeetingCard key={meeting.id} meeting={meeting} />
                  ))}
                </div>
              </div>
            )}
            
            {otherMeetings.length > 0 && (
              <div className={`space-y-4 ${todayMeetings.length > 0 ? 'mt-8' : ''}`}>
                {otherMeetings.map((meeting) => (
                  <MeetingCard key={meeting.id} meeting={meeting} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="unconfirmed" className="mt-6">
            {mockMeetings.filter(m => m.status === 'unconfirmed').length > 0 ? (
              <div className="space-y-4">
                {mockMeetings.filter(m => m.status === 'unconfirmed').map((meeting) => (
                  <MeetingCard key={meeting.id} meeting={meeting} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No unconfirmed bookings
              </div>
            )}
          </TabsContent>

          <TabsContent value="recurring" className="mt-6">
            {mockMeetings.filter(m => m.status === 'recurring').length > 0 ? (
              <div className="space-y-4">
                {mockMeetings.filter(m => m.status === 'recurring').map((meeting) => (
                  <MeetingCard key={meeting.id} meeting={meeting} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No recurring bookings
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            {mockMeetings.filter(m => m.status === 'past').length > 0 ? (
              <div className="space-y-4">
                {mockMeetings.filter(m => m.status === 'past').map((meeting) => (
                  <MeetingCard key={meeting.id} meeting={meeting} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No past bookings
              </div>
            )}
          </TabsContent>

          <TabsContent value="canceled" className="mt-6">
            {mockMeetings.filter(m => m.status === 'canceled').length > 0 ? (
              <div className="space-y-4">
                {mockMeetings.filter(m => m.status === 'canceled').map((meeting) => (
                  <MeetingCard key={meeting.id} meeting={meeting} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No canceled bookings
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>

      {/* Add Guests Modal */}
      <AddGuestsModal
        isOpen={showAddGuests}
        onClose={() => setShowAddGuests(false)}
        onAdd={(emails) => console.log('Add guests:', emails)}
      />

      {/* Meeting Notes Modal */}
      {showMeetingNotes && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 w-full max-w-2xl shadow-xl">
            <h2 className="text-xl font-semibold mb-2">Meeting Notes</h2>
            <p className="text-sm text-muted-foreground mb-6">Add notes to your meeting</p>
            
            <div className="mb-6">
              <div className="flex items-center space-x-1 mb-3 p-3 border border-border rounded-t-md bg-muted/30">
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
                className="w-full h-32 p-4 border border-border rounded-b-md border-t-0 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Add your meeting notes here..."
              />
            </div>
            
            <div className="flex justify-end space-x-3">
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
          <div className="bg-background rounded-lg p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-6">Are you sure you want to cancel the event?</h2>
            
            <div className="space-y-4 mb-6 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="font-medium text-muted-foreground min-w-16">What:</span>
                <span>{selectedMeeting.title}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-medium text-muted-foreground min-w-16">When:</span>
                <span>{selectedMeeting.date} {selectedMeeting.time} - {selectedMeeting.endTime}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-medium text-muted-foreground min-w-16">Who:</span>
                <span>{selectedMeeting.attendees.map(a => `${a.name} (${a.email})`).join(', ')}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-medium text-muted-foreground min-w-16">Where:</span>
                <span>{selectedMeeting.location.name}</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">Reason for cancellation (optional)</label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full h-24 p-3 border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Why are you cancelling?"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowCancelConfirm(false)}>
                Nevermind
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => {
                  setShowCancelConfirm(false);
                  setSelectedMeeting(null);
                  setCancelReason('');
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
          <div className="bg-background rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-2">Mark as No-Show</h2>
            <p className="text-sm text-muted-foreground mb-6">Select attendees to mark as no-show</p>
            
            <div className="space-y-4 mb-6">
              {selectedMeeting.attendees.map((attendee, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-foreground">
                        {attendee.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{attendee.name}</span>
                  </div>
                  <Checkbox />
                </div>
              ))}
            </div>
            
            <div className="flex justify-end space-x-3">
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

      {/* Edit Location Modal */}
      {showEditLocation && selectedMeeting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-2">Edit Location</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Current Location: {selectedMeeting.location.logo} {selectedMeeting.location.name}
            </p>
            
            <div className="mb-6">
              <select className="w-full p-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="google-meet">📹 Google Meet</option>
                <option value="zoom">📹 Zoom</option>
                <option value="teams">📹 Microsoft Teams</option>
                <option value="jitsi">📹 Jitsi Meet</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowEditLocation(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowEditLocation(false)}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
