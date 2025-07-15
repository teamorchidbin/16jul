import React, { useState, useRef, useEffect } from 'react';
import { Filter, Download, Search, Calendar, MapPin, Video, MoreHorizontal, Edit, UserPlus, Clock, X, Bold, Italic, Underline, Strikethrough, List, ListOrdered, Undo, Redo, Check, Copy, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Switch } from '../components/ui/switch';
import { Button } from '../components/ui/button';
import { Calendar as CalendarComponent } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Checkbox } from '../components/ui/checkbox';
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
    timezone?: string;
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
  duration?: string;
}

const mockMeetings: Meeting[] = [
  // Upcoming meetings
  {
    id: '1',
    title: '30 Minute Meeting',
    date: 'Mon, 14 Jul',
    time: '9:00am',
    endTime: '9:30am',
    duration: '30 minutes',
    attendees: [
      { name: 'You', email: 'sanskarix@gmail.com', timezone: 'GMT+5:30' },
      { name: 'Sanskar Yadav', email: 'sanskar@example.com', timezone: 'GMT+5:30' }
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
    duration: '15 minutes',
    attendees: [
      { name: 'You', email: 'sanskarix@gmail.com', timezone: 'GMT+5:30' },
      { name: 'yo', email: 'yo@example.com', timezone: 'GMT+5:30' }
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
    duration: '15 minutes',
    attendees: [
      { name: 'You', email: 'sanskarix@gmail.com', timezone: 'GMT+5:30' },
      { name: 'Sanskar Yadav', email: 'sanskar@example.com', timezone: 'GMT+5:30' }
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
    duration: '60 minutes',
    attendees: [
      { name: 'You', email: 'sanskarix@gmail.com', timezone: 'GMT+5:30' },
      { name: 'Team Lead', email: 'lead@example.com', timezone: 'GMT+5:30' }
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
  {
    id: '5',
    title: 'Client Onboarding Call',
    date: 'Thu, 17 Jul',
    time: '11:00am',
    endTime: '12:00pm',
    duration: '60 minutes',
    attendees: [
      { name: 'You', email: 'sanskarix@gmail.com', timezone: 'GMT+5:30' },
      { name: 'New Client', email: 'client@newcompany.com', timezone: 'GMT+0:00' }
    ],
    location: {
      type: 'online',
      name: 'Teams',
      logo: '📹'
    },
    eventType: '60 Min Meeting',
    status: 'unconfirmed',
    isToday: false
  },
  // Recurring meetings
  {
    id: '6',
    title: 'Daily Standup',
    date: 'Every Day',
    time: '9:00am',
    endTime: '9:15am',
    duration: '15 minutes',
    attendees: [
      { name: 'You', email: 'sanskarix@gmail.com', timezone: 'GMT+5:30' },
      { name: 'Development Team', email: 'dev@example.com', timezone: 'GMT+5:30' }
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
  {
    id: '7',
    title: 'Weekly Review',
    date: 'Every Friday',
    time: '4:00pm',
    endTime: '5:00pm',
    duration: '60 minutes',
    attendees: [
      { name: 'You', email: 'sanskarix@gmail.com', timezone: 'GMT+5:30' },
      { name: 'Manager', email: 'manager@example.com', timezone: 'GMT+5:30' }
    ],
    location: {
      type: 'online',
      name: 'Google Meet',
      logo: '📹'
    },
    eventType: '60 Min Meeting',
    status: 'recurring',
    recurringInfo: 'Weekly on Fridays',
    isToday: false
  },
  // Past meetings
  {
    id: '8',
    title: 'Client Presentation',
    date: 'Fri, 12 Jul',
    time: '2:00pm',
    endTime: '3:00pm',
    duration: '60 minutes',
    attendees: [
      { name: 'You', email: 'sanskarix@gmail.com', timezone: 'GMT+5:30' },
      { name: 'Client', email: 'client@example.com', timezone: 'GMT+0:00' }
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
  {
    id: '9',
    title: 'Strategy Meeting',
    date: 'Thu, 11 Jul',
    time: '10:00am',
    endTime: '11:30am',
    duration: '90 minutes',
    attendees: [
      { name: 'You', email: 'sanskarix@gmail.com', timezone: 'GMT+5:30' },
      { name: 'Strategy Team', email: 'strategy@example.com', timezone: 'GMT+5:30' }
    ],
    location: {
      type: 'online',
      name: 'Zoom',
      logo: '📹'
    },
    eventType: '90 Min Meeting',
    status: 'past',
    isToday: false
  },
  // Canceled meetings
  {
    id: '10',
    title: 'Project Review',
    date: 'Thu, 11 Jul',
    time: '11:00am',
    endTime: '12:00pm',
    duration: '60 minutes',
    attendees: [
      { name: 'You', email: 'sanskarix@gmail.com', timezone: 'GMT+5:30' },
      { name: 'Manager', email: 'manager@example.com', timezone: 'GMT+5:30' }
    ],
    location: {
      type: 'online',
      name: 'Teams',
      logo: '📹'
    },
    eventType: '60 Min Meeting',
    status: 'canceled',
    isToday: false
  },
  {
    id: '11',
    title: 'Training Session',
    date: 'Wed, 10 Jul',
    time: '3:00pm',
    endTime: '4:30pm',
    duration: '90 minutes',
    attendees: [
      { name: 'You', email: 'sanskarix@gmail.com', timezone: 'GMT+5:30' },
      { name: 'Trainer', email: 'trainer@example.com', timezone: 'GMT+5:30' }
    ],
    location: {
      type: 'online',
      name: 'Google Meet',
      logo: '📹'
    },
    eventType: '90 Min Meeting',
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
  const [showAttendeesDropdown, setShowAttendeesDropdown] = useState<string | null>(null);
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

  const getAttendeeDisplay = (meeting: Meeting) => {
    const attendees = meeting.attendees.filter(a => a.name !== 'You');
    if (attendees.length === 0) return null;
    if (attendees.length === 1) return attendees[0].name.split(' ')[0];
    if (attendees.length === 2) return `${attendees[0].name.split(' ')[0]} & ${attendees[1].name.split(' ')[0]}`;
    return `${attendees[0].name.split(' ')[0]}, ${attendees[1].name.split(' ')[0]} + ${attendees.length - 2} More`;
  };

  const MeetingCard = ({ meeting }: { meeting: Meeting }) => {
    const isExpanded = expandedMeeting === meeting.id;
    const attendeeDisplay = getAttendeeDisplay(meeting);
    const otherAttendees = meeting.attendees.filter(a => a.name !== 'You');
    
    return (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div 
              className="flex-1 cursor-pointer"
              onClick={() => setExpandedMeeting(isExpanded ? null : meeting.id)}
            >
              {/* Date/Time and Title Row */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {meeting.isToday ? 'Today' : meeting.date} • {meeting.time} - {meeting.endTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg text-gray-900">{meeting.eventType}</h3>
                    {attendeeDisplay && (
                      <div className="flex items-center gap-1">
                        <span className="text-gray-400">•</span>
                        <div className="relative">
                          {otherAttendees.length > 2 ? (
                            <button
                              className="text-sm text-gray-600 hover:text-gray-800"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowAttendeesDropdown(showAttendeesDropdown === meeting.id ? null : meeting.id);
                              }}
                            >
                              {attendeeDisplay}
                            </button>
                          ) : (
                            <span className="text-sm text-gray-600">{attendeeDisplay}</span>
                          )}
                          
                          {showAttendeesDropdown === meeting.id && otherAttendees.length > 2 && (
                            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 min-w-48">
                              <div className="p-2">
                                <div className="text-xs font-medium text-gray-500 mb-2">Attendees</div>
                                {otherAttendees.map((attendee, index) => (
                                  <div key={index} className="text-sm text-gray-700 py-1">
                                    {attendee.name}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Location Row */}
              <div className="flex items-center space-x-2">
                {meeting.location.type === 'online' ? (
                  <button className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                    <Video className="h-4 w-4" />
                    <span>Join {meeting.location.name}</span>
                  </button>
                ) : (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{meeting.location.address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 ml-4">
              <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); handleReschedule(); }}>
                Reschedule
              </Button>
              <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); handleCancelEvent(meeting); }}>
                Cancel
              </Button>
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowEditDropdown(showEditDropdown === meeting.id ? null : meeting.id);
                  }}
                >
                  Edit
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
                {showEditDropdown === meeting.id && (
                  <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-48">
                    <button 
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMeeting(meeting);
                        setShowEditLocation(true);
                        setShowEditDropdown(null);
                      }}
                    >
                      <MapPin className="h-4 w-4" />
                      Edit location
                    </button>
                    <button 
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
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
          </div>

          {/* Expanded Details */}
          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-gray-200 animate-fade-in">
              {/* Invitees */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Invitees</h4>
                <div className="space-y-2">
                  {meeting.attendees.map((attendee, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{attendee.name}</div>
                        <div className="text-sm text-gray-500">{attendee.email}</div>
                      </div>
                      <div className="text-sm text-gray-500">{attendee.timezone}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-1">Duration</h4>
                <p className="text-sm text-gray-600">{meeting.duration}</p>
              </div>

              {/* Action Buttons for Expanded View */}
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMeeting(meeting);
                    setShowMeetingNotes(true);
                  }}
                >
                  Meeting Notes
                </Button>
                {meeting.isToday && isCurrentTime(meeting.time) && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkNoShow(meeting);
                    }}
                  >
                    Mark as No-Show
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="px-6 pt-3 pb-6 space-y-4 w-full max-w-full">
      {/* Header with Tabs and Action Buttons */}
      <div className="flex items-center justify-between">
        {/* Tabs - matching event types style exactly */}
        <div className="flex space-x-1">
          {[
            { value: 'upcoming', label: 'Upcoming' },
            { value: 'unconfirmed', label: 'Unconfirmed' },
            { value: 'recurring', label: 'Recurring' },
            { value: 'past', label: 'Past' },
            { value: 'canceled', label: 'Canceled' }
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.value
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
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
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg transition-all duration-300 ease-in-out animate-fade-in">
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
        {todayMeetings.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">TODAY</h3>
            <div className="space-y-3">
              {todayMeetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))}
            </div>
          </div>
        )}
        
        {otherMeetings.length > 0 && (
          <div className={`space-y-3 ${todayMeetings.length > 0 ? 'mt-6' : ''}`}>
            <div className="space-y-3">
              {otherMeetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))}
            </div>
          </div>
        )}

        {todayMeetings.length === 0 && otherMeetings.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No {activeTab} bookings
          </div>
        )}
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
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-xl">
            <h2 className="text-xl font-semibold mb-2">Meeting Notes</h2>
            <p className="text-sm text-gray-600 mb-6">Add notes to your meeting</p>
            
            <div className="mb-6">
              <div className="flex items-center space-x-1 mb-3 p-3 border border-gray-200 rounded-t-md bg-gray-50">
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
                className="w-full h-32 p-4 border border-gray-200 rounded-b-md border-t-0 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">Are you sure you want to cancel the event?</h2>
            
            <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex gap-3">
                <span className="font-medium text-gray-600 min-w-16">What:</span>
                <span className="text-gray-900">{selectedMeeting.title}</span>
              </div>
              <div className="flex gap-3">
                <span className="font-medium text-gray-600 min-w-16">When:</span>
                <span className="text-gray-900">{selectedMeeting.date} {selectedMeeting.time} - {selectedMeeting.endTime}</span>
              </div>
              <div className="flex gap-3">
                <span className="font-medium text-gray-600 min-w-16">Who:</span>
                <span className="text-gray-900">{selectedMeeting.attendees.map(a => `${a.name} (${a.email})`).join(', ')}</span>
              </div>
              <div className="flex gap-3">
                <span className="font-medium text-gray-600 min-w-16">Where:</span>
                <span className="text-gray-900">{selectedMeeting.location.name}</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-3 text-gray-900">Reason for cancellation (optional)</label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full h-24 p-3 border border-gray-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  toast({
                    description: "Event cancelled successfully.",
                    duration: 3000,
                  });
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
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-2">Mark as No-Show</h2>
            <p className="text-sm text-gray-600 mb-6">Select attendees to mark as no-show</p>
            
            <div className="space-y-4 mb-6">
              {selectedMeeting.attendees.map((attendee, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
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
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-2">Edit Location</h2>
            <p className="text-sm text-gray-600 mb-6">
              Current Location: {selectedMeeting.location.logo} {selectedMeeting.location.name}
            </p>
            
            <div className="mb-6">
              <select className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
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
