import React, { useState, useRef, useEffect } from 'react';
import { Filter, Download, Search, Calendar, MapPin, Video, MoreHorizontal, Edit, UserPlus, Clock, X, Bold, Italic, Underline, Strikethrough, List, ListOrdered, Undo, Redo, Check, Copy, Eye, ChevronDown, ChevronUp, Mail, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Switch } from '../components/ui/switch';
import { Button } from '../components/ui/button';
import { Calendar as CalendarComponent } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Checkbox } from '../components/ui/checkbox';
import { AddGuestsModal } from '../components/AddGuestsModal';
import { useToast } from '../hooks/use-toast';
import type { DateRange } from 'react-day-picker';

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
  recurringDates?: string[];
}

const mockMeetings: Meeting[] = [
{
  id: '1',
  title: 'Product Hunt Chats',
  date: 'Mon, 14 Jul',
  time: '9:00am',
  endTime: '9:30am',
  duration: '30 minutes',
  attendees: [{
    name: 'Sanskar Yadav',
    email: 'sanskar@example.com',
    timezone: 'Asia/Calcutta'
  }],
  location: {
    type: 'online',
    name: 'Google Meet',
    logo: '📹'
  },
  eventType: 'Product Hunt Chats',
  status: 'upcoming',
  isToday: true
}, {
  id: '2',
  title: 'Discovery Call',
  date: 'Mon, 14 Jul',
  time: '2:00pm',
  endTime: '2:15pm',
  duration: '15 minutes',
  attendees: [{
    name: 'Emily Rodriguez',
    email: 'emily.r@techcorp.com',
    timezone: 'America/New_York'
  }],
  location: {
    type: 'online',
    name: 'Zoom',
    logo: '📹'
  },
  eventType: 'Discovery Call',
  status: 'upcoming',
  isToday: true
}, {
  id: '3',
  title: 'Strategy Session',
  date: 'Tue, 15 Jul',
  time: '10:00am',
  endTime: '10:30am',
  duration: '30 minutes',
  attendees: [{
    name: 'Alex Chen',
    email: 'alex.chen@startup.io',
    timezone: 'Asia/Singapore'
  }, {
    name: 'Maria Garcia',
    email: 'maria.garcia@consulting.com',
    timezone: 'Europe/Madrid'
  }],
  location: {
    type: 'online',
    name: 'Teams',
    logo: '📹'
  },
  eventType: 'Strategy Session',
  status: 'upcoming',
  isToday: false
}, {
  id: '4',
  title: 'Product Demo',
  date: 'Wed, 16 Jul',
  time: '3:00pm',
  endTime: '4:00pm',
  duration: '60 minutes',
  attendees: [{
    name: 'David Kim',
    email: 'david.kim@enterprise.com',
    timezone: 'Asia/Seoul'
  }, {
    name: 'Sarah Wilson',
    email: 'sarah.w@agency.co',
    timezone: 'America/Los_Angeles'
  }, {
    name: 'Jennifer Lee',
    email: 'jennifer.lee@sales.com',
    timezone: 'America/Los_Angeles'
  }],
  location: {
    type: 'online',
    name: 'Google Meet',
    logo: '📹'
  },
  eventType: 'Product Demo',
  status: 'upcoming',
  isToday: false
}, {
  id: '5',
  title: 'Design Review',
  date: 'Thu, 17 Jul',
  time: '11:00am',
  endTime: '12:00pm',
  duration: '60 minutes',
  attendees: [{
    name: 'James Thompson',
    email: 'james.t@design.studio',
    timezone: 'Europe/London'
  }, {
    name: 'Lisa Park',
    email: 'lisa.park@creative.com',
    timezone: 'America/Chicago'
  }, {
    name: 'Carlos Rodriguez',
    email: 'carlos.r@marketing.co',
    timezone: 'America/Mexico_City'
  }],
  location: {
    type: 'online',
    name: 'Zoom',
    logo: '📹'
  },
  eventType: 'Design Review',
  status: 'upcoming',
  isToday: false
}];

const generateMeetingsForStatus = (status: Meeting['status'], count: number = 5): Meeting[] => {
  const baseData = [
    { title: 'Team Standup', attendee: 'Robert Johnson', email: 'robert.j@techteam.com', timezone: 'America/New_York' },
    { title: 'Client Check-in', attendee: 'Anna Martinez', email: 'anna.m@client.com', timezone: 'Europe/Berlin' },
    { title: 'Project Review', attendee: 'Michael Wong', email: 'michael.wong@project.net', timezone: 'Asia/Hong_Kong' },
    { title: 'Budget Planning', attendee: 'Sophie Brown', email: 'sophie.brown@finance.com', timezone: 'Europe/Paris' },
    { title: 'Marketing Sync', attendee: 'Kevin Wu', email: 'kevin.wu@marketing.io', timezone: 'Asia/Shanghai' }
  ];
  
  return Array.from({ length: count }, (_, i) => {
    const base = baseData[i % baseData.length];
    return {
      ...mockMeetings[0],
      id: `${status}-${i + 1}`,
      title: base.title,
      status,
      isToday: i < 2,
      attendees: [{
        name: base.attendee,
        email: base.email,
        timezone: base.timezone
      }],
      recurringDates: status === 'recurring' ? [
        'Mon, 14 Jul • 9:00am - 9:30am',
        'Tue, 15 Jul • 9:00am - 9:30am', 
        'Wed, 16 Jul • 9:00am - 9:30am',
        'Thu, 17 Jul • 9:00am - 9:30am',
        'Fri, 18 Jul • 9:00am - 9:30am'
      ] : undefined
    };
  });
};

const allMeetings = [
  ...mockMeetings,
  ...generateMeetingsForStatus('unconfirmed'),
  ...generateMeetingsForStatus('recurring'), 
  ...generateMeetingsForStatus('past'),
  ...generateMeetingsForStatus('canceled')
];

const teamNames = ['Personal', 'Development Team', 'Design Team', 'Marketing Team', 'Sales Team', 'Engineering Team', 'Product Team', 'Customer Success'];

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
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [showEditDropdown, setShowEditDropdown] = useState<string | null>(null);
  const [showAttendeesDropdown, setShowAttendeesDropdown] = useState<string | null>(null);
  const [showAttendeeDetails, setShowAttendeeDetails] = useState<string | null>(null);
  const [selectedRecurringDates, setSelectedRecurringDates] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      setShowEditDropdown(null);
      setShowAttendeesDropdown(null);
      setShowAttendeeDetails(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const todayMeetings = allMeetings.filter(m => m.status === activeTab && m.isToday);
  const otherMeetings = allMeetings.filter(m => m.status === activeTab && !m.isToday);

  const handleExport = () => {
    toast({
      description: "Export successful: Your bookings will be sent to your email shortly.",
      duration: 3000
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
    const attendees = meeting.attendees;
    if (attendees.length === 0) return null;
    if (attendees.length === 1) return attendees[0].name.split(' ')[0];
    if (attendees.length === 2) return `${attendees[0].name.split(' ')[0]}, ${attendees[1].name.split(' ')[0]}`;
    return {
      display: `${attendees[0].name.split(' ')[0]}, ${attendees[1].name.split(' ')[0]}`,
      moreCount: attendees.length - 2
    };
  };

  const getAllAttendees = () => {
    const allAttendees = new Set<string>();
    allMeetings.forEach(meeting => {
      meeting.attendees.forEach(attendee => {
        allAttendees.add(attendee.name);
      });
    });
    return Array.from(allAttendees);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: "Email copied to clipboard",
      duration: 2000
    });
  };

  const MeetingCard = ({ meeting }: { meeting: Meeting }) => {
    const isExpanded = expandedMeeting === meeting.id;
    const attendeeDisplay = getAttendeeDisplay(meeting);
    const showActionButtons = meeting.status !== 'past' && meeting.status !== 'canceled';
    const showExpandedActions = meeting.status !== 'past' && meeting.status !== 'canceled';

    return (
      <div className="bg-card border border-border rounded-lg overflow-visible shadow-sm hover:shadow-md transition-all duration-200 dark:bg-card dark:border-border">
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1 cursor-pointer" onClick={() => setExpandedMeeting(isExpanded ? null : meeting.id)}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="text-sm text-muted-foreground">
                    {meeting.isToday ? 'Today' : meeting.date} • {meeting.time} - {meeting.endTime}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <h3 className={`text-base font-medium ${meeting.status === 'canceled' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                  {meeting.title}
                </h3>
                <span className="text-muted-foreground">•</span>
                <div className="flex items-center gap-1">
                  {attendeeDisplay && (
                    <div className="relative">
                      {typeof attendeeDisplay === 'object' ? (
                        <div className="flex items-center gap-1">
                          <button
                            className="text-sm text-muted-foreground hover:text-foreground font-medium"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(meeting.attendees[0].email);
                            }}
                          >
                            {attendeeDisplay.display.split(',')[0]}
                          </button>
                          <span className="text-sm text-muted-foreground">,</span>
                          <button
                            className="text-sm text-muted-foreground hover:text-foreground font-medium"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(meeting.attendees[1].email);
                            }}
                          >
                            {attendeeDisplay.display.split(', ')[1]}
                          </button>
                          <button
                            className="text-sm text-muted-foreground hover:text-foreground font-medium"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowAttendeesDropdown(showAttendeesDropdown === meeting.id ? null : meeting.id);
                            }}
                          >
                            + {attendeeDisplay.moreCount} More
                          </button>
                        </div>
                      ) : (
                        <button
                          className="text-sm text-muted-foreground hover:text-foreground font-medium"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(meeting.attendees[0].email);
                          }}
                        >
                          {attendeeDisplay}
                        </button>
                      )}
                      
                      {showAttendeesDropdown === meeting.id && typeof attendeeDisplay === 'object' && (
                        <div className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50 min-w-48">
                          <div className="p-2">
                            <div className="text-xs font-medium text-muted-foreground mb-2">All Attendees</div>
                            {meeting.attendees.map((attendee, index) => (
                              <button
                                key={index}
                                className="w-full text-left text-sm text-muted-foreground hover:text-foreground hover:bg-muted py-1 px-2 rounded"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyToClipboard(attendee.email);
                                  setShowAttendeesDropdown(null);
                                }}
                              >
                                {attendee.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {meeting.location.type === 'online' ? (
                    <button className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors">
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
              </div>
            </div>

            <div className="flex flex-col items-end space-y-2 ml-4">
              {showActionButtons && (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    handleReschedule();
                  }}>
                    Reschedule
                  </Button>
                  <Button variant="outline" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    handleCancelEvent(meeting);
                  }}>
                    Cancel
                  </Button>
                  <div className="relative">
                    <Button variant="outline" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      setShowEditDropdown(showEditDropdown === meeting.id ? null : meeting.id);
                    }}>
                      Edit
                    </Button>
                    {showEditDropdown === meeting.id && (
                      <div className="absolute top-full right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50 min-w-48">
                        <button
                          className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
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
                          className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
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
              )}
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer" onClick={() => setExpandedMeeting(isExpanded ? null : meeting.id)}>
                <span>Details</span>
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </div>
          </div>

          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-border animate-fade-in">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-foreground mb-1">Duration</div>
                    <div className="text-sm text-muted-foreground">{meeting.duration}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-foreground mb-2">Invitee Details</div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{meeting.attendees[0]?.name}</span>
                      <span>•</span>
                      <span>{meeting.attendees[0]?.timezone}</span>
                      <span>•</span>
                      <a href={`mailto:${meeting.attendees[0]?.email}`} className="text-muted-foreground hover:text-foreground">
                        {meeting.attendees[0]?.email}
                      </a>
                      <button onClick={() => copyToClipboard(meeting.attendees[0]?.email)} className="ml-1 text-muted-foreground hover:text-foreground">
                        <Copy className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {meeting.attendees.length > 1 && (
                    <div>
                      <div className="text-sm font-medium text-foreground mb-2">Attendees</div>
                      <div className="flex flex-wrap gap-2">
                        {meeting.attendees.slice(1).map((attendee, index) => (
                          <div key={index} className="relative">
                            <button
                              className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full hover:bg-muted/80 hover:shadow-sm transition-all"
                              onClick={() => setShowAttendeeDetails(showAttendeeDetails === `${meeting.id}-${index}` ? null : `${meeting.id}-${index}`)}
                            >
                              {attendee.name.split(' ')[0]}
                            </button>
                            {showAttendeeDetails === `${meeting.id}-${index}` && (
                              <div className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50 min-w-64">
                                <div className="p-3 space-y-2">
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">{attendee.email}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">{attendee.timezone}</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {showExpandedActions && (
                  <div className="flex flex-col items-end space-y-2">
                    <Button variant="outline" size="sm" className="w-32" onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMeeting(meeting);
                      setShowMeetingNotes(true);
                    }}>
                      Meeting Notes
                    </Button>
                    {meeting.isToday && isCurrentTime(meeting.time) && (
                      <Button variant="outline" size="sm" className="w-32" onClick={(e) => {
                        e.stopPropagation();
                        handleMarkNoShow(meeting);
                      }}>
                        Mark as No-Show
                      </Button>
                    )}
                  </div>
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
      {(showMeetingNotes || showCancelConfirm || showNoShow || showEditLocation || showAddGuests) && (
        <div className="fixed inset-0 bg-black/50 z-40" />
      )}

      <div className="flex items-center justify-between">
        <div className="flex border-b border-border">
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
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab.value
                  ? 'text-primary border-primary'
                  : 'text-muted-foreground border-transparent hover:text-foreground hover:border-muted-foreground/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
          <Button variant="outline" onClick={handleExport} className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export All</span>
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg transition-all duration-300 ease-in-out animate-fade-in">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">Attendee: All</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 max-h-60 overflow-auto scrollbar-hide" align="start">
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-md text-sm bg-background"
                  />
                </div>
                {getAllAttendees().map((attendee, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{attendee}</span>
                    <Checkbox />
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">Host: All</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 max-h-60 overflow-auto scrollbar-hide" align="start">
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
            <PopoverContent className="w-80 max-h-60 overflow-auto scrollbar-hide" align="start">
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
            <PopoverContent className="w-80 max-h-60 overflow-auto scrollbar-hide" align="start">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">All</span>
                  <Checkbox />
                </div>
                {teamNames.map((team, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{team}</span>
                    <Checkbox />
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                {dateRange?.from
                  ? dateRange.to
                    ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
                    : dateRange.from.toLocaleDateString()
                  : "Pick a date range"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                className="rounded-md border pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          <Button variant="ghost" size="sm">Clear all filters</Button>
        </div>
      )}

      <div className="space-y-2">
        {todayMeetings.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">TODAY</h3>
            <div className="space-y-2">
              {todayMeetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))}
            </div>
          </div>
        )}
        
        {otherMeetings.length > 0 && (
          <div className={`space-y-2 ${todayMeetings.length > 0 ? 'mt-6' : ''}`}>
            {otherMeetings.length > 0 && (
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{activeTab.toUpperCase()}</h3>
            )}
            <div className="space-y-2">
              {otherMeetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))}
            </div>
          </div>
        )}

        {todayMeetings.length === 0 && otherMeetings.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No {activeTab} bookings
          </div>
        )}
      </div>

      <AddGuestsModal
        isOpen={showAddGuests}
        onClose={() => setShowAddGuests(false)}
        onAdd={(emails) => console.log('Add guests:', emails)}
      />

      {showMeetingNotes && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-popover rounded-lg p-6 w-full max-w-2xl shadow-xl">
            <h2 className="text-xl font-semibold mb-2">Meeting Notes</h2>
            <p className="text-sm text-muted-foreground mb-6">Add notes to your meeting</p>
            
            <div className="mb-6">
              <div className="flex items-center space-x-1 mb-3 p-3 border border-border rounded-t-md bg-muted/50">
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
                className="w-full h-32 p-4 border border-border rounded-b-md border-t-0 resize-none focus:outline-none focus:ring-2 focus:ring-ring bg-background"
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

      {showCancelConfirm && selectedMeeting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-popover rounded-lg p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-6 text-foreground">Cancel Event</h2>
            
            {selectedMeeting.status === 'recurring' && selectedMeeting.recurringDates ? (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3 text-foreground">Select the meetings you want to cancel</label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <span className="text-sm font-medium">Select All</span>
                    <Checkbox
                      checked={selectedRecurringDates.length === selectedMeeting.recurringDates.length}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedRecurringDates(selectedMeeting.recurringDates || []);
                        } else {
                          setSelectedRecurringDates([]);
                        }
                      }}
                    />
                  </div>
                  {selectedMeeting.recurringDates.map((date, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded">
                      <span className="text-sm">{date}</span>
                      <Checkbox
                        checked={selectedRecurringDates.includes(date)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedRecurringDates([...selectedRecurringDates, date]);
                          } else {
                            setSelectedRecurringDates(selectedRecurringDates.filter((d) => d !== date));
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3 mb-6 p-4 bg-muted/50 rounded-lg">
                <div className="flex gap-3">
                  <span className="font-medium text-muted-foreground min-w-16">Event:</span>
                  <span className="text-foreground">{selectedMeeting.eventType}</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-medium text-muted-foreground min-w-16">When:</span>
                  <span className="text-foreground">{selectedMeeting.date} {selectedMeeting.time} - {selectedMeeting.endTime}</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-medium text-muted-foreground min-w-16">With:</span>
                  <span className="text-foreground">{selectedMeeting.attendees.map((a) => a.name).join(', ')}</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-medium text-muted-foreground min-w-16">Where:</span>
                  <span className="text-foreground">{selectedMeeting.location.name}</span>
                </div>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium mb-3 text-foreground">Reason for cancellation (optional)</label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full h-24 p-3 border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                placeholder="Why are you cancelling?"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => {
                setShowCancelConfirm(false);
                setSelectedMeeting(null);
                setCancelReason('');
                setSelectedRecurringDates([]);
              }}>
                Keep Event
              </Button>
              <Button variant="destructive" onClick={() => {
                setShowCancelConfirm(false);
                setSelectedMeeting(null);
                setCancelReason('');
                setSelectedRecurringDates([]);
                toast({
                  description: "Event cancelled successfully.",
                  duration: 3000
                });
              }}>
                Cancel Event
              </Button>
            </div>
          </div>
        </div>
      )}

      {showNoShow && selectedMeeting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-popover rounded-lg p-6 w-full max-w-md shadow-xl">
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

      {showEditLocation && selectedMeeting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-popover rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-2">Edit Location</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Current Location: {selectedMeeting.location.logo} {selectedMeeting.location.name}
            </p>
            
            <div className="mb-6">
              <select className="w-full p-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background">
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
