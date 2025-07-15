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
// Upcoming meetings - 15 total
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
}, {
  id: '6',
  title: 'Team Standup',
  date: 'Fri, 18 Jul',
  time: '9:00am',
  endTime: '9:15am',
  duration: '15 minutes',
  attendees: [{
    name: 'Robert Johnson',
    email: 'robert.j@techteam.com',
    timezone: 'America/New_York'
  }, {
    name: 'Anna Martinez',
    email: 'anna.m@devops.io',
    timezone: 'Europe/Berlin'
  }, {
    name: 'Michael Wong',
    email: 'michael.wong@cloud.net',
    timezone: 'Asia/Hong_Kong'
  }, {
    name: 'Sophie Brown',
    email: 'sophie.brown@remote.com',
    timezone: 'Europe/Paris'
  }],
  location: {
    type: 'online',
    name: 'Teams',
    logo: '📹'
  },
  eventType: 'Team Standup',
  status: 'upcoming',
  isToday: false
}, {
  id: '7',
  title: 'Client Presentation',
  date: 'Mon, 21 Jul',
  time: '2:00pm',
  endTime: '3:00pm',
  duration: '60 minutes',
  attendees: [{
    name: 'Kevin Wu',
    email: 'kevin.wu@distributed.io',
    timezone: 'Asia/Shanghai'
  }, {
    name: 'Rachel Green',
    email: 'rachel.green@global.net',
    timezone: 'Australia/Sydney'
  }, {
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@mena.co',
    timezone: 'Africa/Cairo'
  }, {
    name: 'Elena Volkov',
    email: 'elena.volkov@eastern.com',
    timezone: 'Europe/Moscow'
  }],
  location: {
    type: 'online',
    name: 'Google Meet',
    logo: '📹'
  },
  eventType: 'Client Presentation',
  status: 'upcoming',
  isToday: false
}, {
  id: '8',
  title: 'Weekly Sync',
  date: 'Tue, 22 Jul',
  time: '4:00pm',
  endTime: '5:00pm',
  duration: '60 minutes',
  attendees: [{
    name: 'Mark Davis',
    email: 'mark.davis@tech.com',
    timezone: 'America/New_York'
  }, {
    name: 'Julia Schmidt',
    email: 'julia.schmidt@engineering.de',
    timezone: 'Europe/Berlin'
  }, {
    name: 'Yuki Tanaka',
    email: 'yuki.tanaka@innovation.jp',
    timezone: 'Asia/Tokyo'
  }, {
    name: 'Lucas Silva',
    email: 'lucas.silva@startup.br',
    timezone: 'America/Sao_Paulo'
  }, {
    name: 'Fatima Al-Zahra',
    email: 'fatima.alzahra@tech.ae',
    timezone: 'Asia/Dubai'
  }],
  location: {
    type: 'online',
    name: 'Zoom',
    logo: '📹'
  },
  eventType: 'Weekly Sync',
  status: 'upcoming',
  isToday: false
}, {
  id: '9',
  title: 'Tech Discussion',
  date: 'Wed, 23 Jul',
  time: '1:00pm',
  endTime: '2:00pm',
  duration: '60 minutes',
  attendees: [{
    name: 'Chris Miller',
    email: 'chris.miller@software.ca',
    timezone: 'America/Toronto'
  }, {
    name: 'Isabella Rossi',
    email: 'isabella.rossi@strategy.it',
    timezone: 'Europe/Rome'
  }, {
    name: 'Oliver Smith',
    email: 'oliver.smith@consulting.uk',
    timezone: 'Europe/London'
  }, {
    name: 'Nina Petrov',
    email: 'nina.petrov@advisory.ru',
    timezone: 'Europe/Moscow'
  }, {
    name: 'Diego Lopez',
    email: 'diego.lopez@planning.es',
    timezone: 'Europe/Madrid'
  }],
  location: {
    type: 'online',
    name: 'Teams',
    logo: '📹'
  },
  eventType: 'Tech Discussion',
  status: 'upcoming',
  isToday: false
}, {
  id: '10',
  title: 'Strategy Planning',
  date: 'Thu, 24 Jul',
  time: '10:00am',
  endTime: '11:30am',
  duration: '90 minutes',
  attendees: [{
    name: 'Amara Johnson',
    email: 'amara.johnson@insights.us',
    timezone: 'America/Chicago'
  }, {
    name: 'Victoria Chang',
    email: 'victoria.chang@corp.com',
    timezone: 'Asia/Hong_Kong'
  }, {
    name: 'Gabriel Santos',
    email: 'gabriel.santos@enterprise.br',
    timezone: 'America/Sao_Paulo'
  }, {
    name: 'Zara Ahmed',
    email: 'zara.ahmed@business.ae',
    timezone: 'Asia/Dubai'
  }, {
    name: 'Ethan Taylor',
    email: 'ethan.taylor@company.au',
    timezone: 'Australia/Melbourne'
  }],
  location: {
    type: 'online',
    name: 'Google Meet',
    logo: '📹'
  },
  eventType: 'Strategy Planning',
  status: 'upcoming',
  isToday: false
}, {
  id: '11',
  title: 'Product Roadmap',
  date: 'Fri, 25 Jul',
  time: '3:00pm',
  endTime: '4:00pm',
  duration: '60 minutes',
  attendees: [{
    name: 'Harrison Ford',
    email: 'harrison.ford@product.com',
    timezone: 'America/Los_Angeles'
  }, {
    name: 'Mei Zhang',
    email: 'mei.zhang@roadmap.cn',
    timezone: 'Asia/Shanghai'
  }, {
    name: 'Sebastian Mueller',
    email: 'sebastian.mueller@planning.de',
    timezone: 'Europe/Berlin'
  }, {
    name: 'Aria Nakamura',
    email: 'aria.nakamura@strategy.jp',
    timezone: 'Asia/Tokyo'
  }, {
    name: 'Phoenix Williams',
    email: 'phoenix.williams@vision.ca',
    timezone: 'America/Vancouver'
  }],
  location: {
    type: 'online',
    name: 'Zoom',
    logo: '📹'
  },
  eventType: 'Product Roadmap',
  status: 'upcoming',
  isToday: false
}, {
  id: '12',
  title: 'Marketing Review',
  date: 'Mon, 28 Jul',
  time: '11:00am',
  endTime: '12:30pm',
  duration: '90 minutes',
  attendees: [{
    name: 'Luna Martinez',
    email: 'luna.martinez@future.mx',
    timezone: 'America/Mexico_City'
  }, {
    name: 'River Johnson',
    email: 'river.johnson@innovation.us',
    timezone: 'America/Denver'
  }, {
    name: 'Skyler Davis',
    email: 'skyler.davis@marketing.com',
    timezone: 'America/Chicago'
  }, {
    name: 'Ravi Sharma',
    email: 'ravi.sharma@growth.in',
    timezone: 'Asia/Mumbai'
  }, {
    name: 'Chloe Brown',
    email: 'chloe.brown@brand.uk',
    timezone: 'Europe/London'
  }],
  location: {
    type: 'online',
    name: 'Teams',
    logo: '📹'
  },
  eventType: 'Marketing Review',
  status: 'upcoming',
  isToday: false
}, {
  id: '13',
  title: 'Engineering Sync',
  date: 'Tue, 29 Jul',
  time: '2:00pm',
  endTime: '3:30pm',
  duration: '90 minutes',
  attendees: [{
    name: 'Mason Lee',
    email: 'mason.lee@campaign.kr',
    timezone: 'Asia/Seoul'
  }, {
    name: 'Zoe Taylor',
    email: 'zoe.taylor@digital.au',
    timezone: 'Australia/Sydney'
  }, {
    name: 'Atlas Rodriguez',
    email: 'atlas.rodriguez@engineering.com',
    timezone: 'America/Los_Angeles'
  }, {
    name: 'Nova Kim',
    email: 'nova.kim@development.kr',
    timezone: 'Asia/Seoul'
  }, {
    name: 'Sage Wilson',
    email: 'sage.wilson@code.ca',
    timezone: 'America/Toronto'
  }],
  location: {
    type: 'online',
    name: 'Google Meet',
    logo: '📹'
  },
  eventType: 'Engineering Sync',
  status: 'upcoming',
  isToday: false
}, {
  id: '14',
  title: 'Design Workshop',
  date: 'Wed, 30 Jul',
  time: '4:00pm',
  endTime: '5:00pm',
  duration: '60 minutes',
  attendees: [{
    name: 'Echo Martinez',
    email: 'echo.martinez@software.mx',
    timezone: 'America/Mexico_City'
  }, {
    name: 'Orion Chen',
    email: 'orion.chen@tech.tw',
    timezone: 'Asia/Taipei'
  }, {
    name: 'Indigo Patel',
    email: 'indigo.patel@systems.in',
    timezone: 'Asia/Mumbai'
  }, {
    name: 'Sterling Thompson',
    email: 'sterling.thompson@design.com',
    timezone: 'America/New_York'
  }, {
    name: 'Jade Wang',
    email: 'jade.wang@creative.cn',
    timezone: 'Asia/Shanghai'
  }, {
    name: 'Rowan Anderson',
    email: 'rowan.anderson@studio.se',
    timezone: 'Europe/Stockholm'
  }],
  location: {
    type: 'online',
    name: 'Zoom',
    logo: '📹'
  },
  eventType: 'Design Workshop',
  status: 'upcoming',
  isToday: false
}, {
  id: '15',
  title: 'Final Review',
  date: 'Thu, 31 Jul',
  time: '1:00pm',
  endTime: '3:00pm',
  duration: '120 minutes',
  attendees: [{
    name: 'Sage Murphy',
    email: 'sage.murphy@visual.ie',
    timezone: 'Europe/Dublin'
  }, {
    name: 'Cedar Jones',
    email: 'cedar.jones@ux.nz',
    timezone: 'Pacific/Auckland'
  }, {
    name: 'Aspen Garcia',
    email: 'aspen.garcia@interface.es',
    timezone: 'Europe/Madrid'
  }, {
    name: 'Willow Lee',
    email: 'willow.lee@experience.ca',
    timezone: 'America/Vancouver'
  }, {
    name: 'Ocean Smith',
    email: 'ocean.smith@ui.us',
    timezone: 'America/Los_Angeles'
  }],
  location: {
    type: 'online',
    name: 'Teams',
    logo: '📹'
  },
  eventType: 'Final Review',
  status: 'upcoming',
  isToday: false
}];

// Generate similar meetings for other statuses
const generateMeetingsForStatus = (status: Meeting['status'], count: number = 15): Meeting[] => {
  return Array.from({
    length: count
  }, (_, i) => ({
    ...mockMeetings[i % mockMeetings.length],
    id: `${status}-${i + 1}`,
    status,
    isToday: status === 'upcoming' && i < 2,
    title: status === 'canceled' ? mockMeetings[i % mockMeetings.length].title : mockMeetings[i % mockMeetings.length].title,
    recurringDates: status === 'recurring' ? ['Mon, 14 Jul • 9:00am - 9:30am', 'Tue, 15 Jul • 9:00am - 9:30am', 'Wed, 16 Jul • 9:00am - 9:30am', 'Thu, 17 Jul • 9:00am - 9:30am', 'Fri, 18 Jul • 9:00am - 9:30am'] : undefined
  }));
};
const allMeetings = [...mockMeetings, ...generateMeetingsForStatus('unconfirmed'), ...generateMeetingsForStatus('recurring'), ...generateMeetingsForStatus('past'), ...generateMeetingsForStatus('canceled')];
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
  const {
    toast
  } = useToast();
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
  const MeetingCard = ({
    meeting
  }: {
    meeting: Meeting;
  }) => {
    const isExpanded = expandedMeeting === meeting.id;
    const attendeeDisplay = getAttendeeDisplay(meeting);
    const showActionButtons = meeting.status !== 'past' && meeting.status !== 'canceled';
    const showExpandedActions = meeting.status !== 'past' && meeting.status !== 'canceled';
    return <div className="bg-white border border-gray-200 rounded-lg overflow-visible shadow-sm hover:shadow-md transition-all duration-200">
        <div className="p-4">
          {/* Default Card View */}
          <div className="flex justify-between items-start">
            <div className="flex-1 cursor-pointer" onClick={() => setExpandedMeeting(isExpanded ? null : meeting.id)}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="text-sm text-gray-600">
                    {meeting.isToday ? 'Today' : meeting.date} • {meeting.time} - {meeting.endTime}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <h3 className={`text-lg font-medium ${meeting.status === 'canceled' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {meeting.title}
                </h3>
                <span className="text-gray-400">•</span>
                <div className="flex items-center gap-1">
                  {attendeeDisplay && <div className="relative">
                      {typeof attendeeDisplay === 'object' ? <div className="flex items-center gap-1">
                          <span className="text-sm text-gray-600">{attendeeDisplay.display}</span>
                          <button className="text-sm text-gray-600 hover:text-gray-800 font-medium" onClick={e => {
                      e.stopPropagation();
                      setShowAttendeesDropdown(showAttendeesDropdown === meeting.id ? null : meeting.id);
                    }}>
                            + {attendeeDisplay.moreCount} More
                          </button>
                        </div> : <button className="text-sm text-gray-600 hover:text-gray-800 font-medium" onClick={e => {
                    e.stopPropagation();
                    copyToClipboard(meeting.attendees[0].email);
                  }}>
                          {attendeeDisplay}
                        </button>}
                      
                      {showAttendeesDropdown === meeting.id && typeof attendeeDisplay === 'object' && <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-48">
                          <div className="p-2">
                            <div className="text-xs font-medium text-gray-500 mb-2">All Attendees</div>
                            {meeting.attendees.map((attendee, index) => <button key={index} className="w-full text-left text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 py-1 px-2 rounded" onClick={e => {
                        e.stopPropagation();
                        copyToClipboard(attendee.email);
                        setShowAttendeesDropdown(null);
                      }}>
                                {attendee.name}
                              </button>)}
                          </div>
                        </div>}
                    </div>}
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {meeting.location.type === 'online' ? <button className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                      <Video className="h-4 w-4" />
                      <span>Join {meeting.location.name}</span>
                    </button> : <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{meeting.location.address}</span>
                    </div>}
                </div>
                
                {/* Details button moved to bottom right */}
                <div className="flex items-center gap-2 text-sm text-gray-500 px-0 py-0 my-0 mx-0">
                  <span>Details</span>
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 ml-4">
              {showActionButtons && <>
                  <Button variant="outline" size="sm" onClick={e => {
                e.stopPropagation();
                handleReschedule();
              }}>
                    Reschedule
                  </Button>
                  <Button variant="outline" size="sm" onClick={e => {
                e.stopPropagation();
                handleCancelEvent(meeting);
              }}>
                    Cancel
                  </Button>
                  <div className="relative">
                    <Button variant="outline" size="sm" onClick={e => {
                  e.stopPropagation();
                  setShowEditDropdown(showEditDropdown === meeting.id ? null : meeting.id);
                }}>
                      Edit
                    </Button>
                    {showEditDropdown === meeting.id && <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-48">
                        <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2" onClick={e => {
                    e.stopPropagation();
                    setSelectedMeeting(meeting);
                    setShowEditLocation(true);
                    setShowEditDropdown(null);
                  }}>
                          <MapPin className="h-4 w-4" />
                          Edit location
                        </button>
                        <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2" onClick={e => {
                    e.stopPropagation();
                    setSelectedMeeting(meeting);
                    setShowAddGuests(true);
                    setShowEditDropdown(null);
                  }}>
                          <UserPlus className="h-4 w-4" />
                          Add guests
                        </button>
                      </div>}
                  </div>
                </>}
            </div>
          </div>

          {/* Expanded Details */}
          {isExpanded && <div className="mt-4 pt-4 border-t border-gray-200 animate-fade-in">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  
                  
                  <div>
                    <div className="text-sm font-medium text-gray-900 mb-1">Duration</div>
                    <div className="text-sm text-gray-600">{meeting.duration}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-900 mb-2">Invitee Details</div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{meeting.attendees[0]?.name}</span>
                      <span>•</span>
                      <span>{meeting.attendees[0]?.timezone}</span>
                      <span>•</span>
                      <span>{meeting.attendees[0]?.email}</span>
                      <button onClick={() => copyToClipboard(meeting.attendees[0]?.email)} className="ml-1 text-gray-400 hover:text-gray-600">
                        <Copy className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {meeting.attendees.length > 1 && <div>
                      <div className="text-sm font-medium text-gray-900 mb-2">Attendees</div>
                      <div className="flex flex-wrap gap-2">
                        {meeting.attendees.slice(1).map((attendee, index) => <div key={index} className="relative">
                            <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 hover:shadow-sm transition-all" onClick={() => setShowAttendeeDetails(showAttendeeDetails === `${meeting.id}-${index}` ? null : `${meeting.id}-${index}`)}>
                              {attendee.name.split(' ')[0]}
                            </button>
                            {showAttendeeDetails === `${meeting.id}-${index}` && <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-64">
                                <div className="p-3 space-y-2">
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm text-gray-600">{attendee.email}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm text-gray-600">{attendee.timezone}</span>
                                  </div>
                                </div>
                              </div>}
                          </div>)}
                      </div>
                    </div>}
                </div>

                {/* Action Buttons for Expanded View */}
                {showExpandedActions && <div className="flex flex-col items-end space-y-2">
                    <Button variant="outline" size="sm" className="w-32" onClick={e => {
                e.stopPropagation();
                setSelectedMeeting(meeting);
                setShowMeetingNotes(true);
              }}>
                      Meeting Notes
                    </Button>
                    {meeting.isToday && isCurrentTime(meeting.time) && <Button variant="outline" size="sm" className="w-32" onClick={e => {
                e.stopPropagation();
                handleMarkNoShow(meeting);
              }}>
                        Mark as No-Show
                      </Button>}
                  </div>}
              </div>
            </div>}
        </div>
      </div>;
  };
  return <div className="px-6 pt-3 pb-6 space-y-4 w-full max-w-full">
      {/* Overlay for popups */}
      {(showMeetingNotes || showCancelConfirm || showNoShow || showEditLocation || showAddGuests) && <div className="fixed inset-0 bg-black/50 z-40" />}

      {/* Header with Tabs and Action Buttons */}
      <div className="flex items-center justify-between">
        {/* Tabs */}
        <div className="flex">
          {[{
          value: 'upcoming',
          label: 'Upcoming'
        }, {
          value: 'unconfirmed',
          label: 'Unconfirmed'
        }, {
          value: 'recurring',
          label: 'Recurring'
        }, {
          value: 'past',
          label: 'Past'
        }, {
          value: 'canceled',
          label: 'Canceled'
        }].map(tab => <button key={tab.value} onClick={() => setActiveTab(tab.value)} className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab.value ? 'text-primary border-b-2 border-primary' : 'text-gray-700 hover:text-gray-900'}`}>
              {tab.label}
            </button>)}
        </div>
        
        {/* Action Buttons */}
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

      {/* Filters */}
      {showFilters && <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg transition-all duration-300 ease-in-out animate-fade-in">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">Attendee: All</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 max-h-60 overflow-auto scrollbar-hide" align="start">
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type="text" placeholder="Search" className="w-full pl-10 pr-4 py-2 border border-border rounded-md text-sm" />
                </div>
                {getAllAttendees().map((attendee, index) => <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{attendee}</span>
                    <Checkbox />
                  </div>)}
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
                {teamNames.map((team, index) => <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{team}</span>
                    <Checkbox />
                  </div>)}
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                {dateRange?.from ? dateRange.to ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}` : dateRange.from.toLocaleDateString() : "Pick a date range"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent mode="range" selected={dateRange} onSelect={setDateRange} className="rounded-md border pointer-events-auto" />
            </PopoverContent>
          </Popover>

          <Button variant="ghost" size="sm">Clear all filters</Button>
        </div>}

      {/* Meetings List */}
      <div className="space-y-6">
        {todayMeetings.length > 0 && <div className="space-y-3">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">TODAY</h3>
            <div className="space-y-3">
              {todayMeetings.map(meeting => <MeetingCard key={meeting.id} meeting={meeting} />)}
            </div>
          </div>}
        
        {otherMeetings.length > 0 && <div className={`space-y-3 ${todayMeetings.length > 0 ? 'mt-6' : ''}`}>
            {activeTab === 'recurring' && otherMeetings.length > 0}
            {activeTab === 'past' && otherMeetings.length > 0 && <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                {otherMeetings.some(m => m.isToday) ? 'TODAY' : 'PAST'}
              </h3>}
            {activeTab === 'canceled' && otherMeetings.length > 0 && <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                {otherMeetings.some(m => m.isToday) ? 'TODAY' : 'CANCELED'}
              </h3>}
            {activeTab === 'unconfirmed' && otherMeetings.length > 0 && <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                {otherMeetings.some(m => m.isToday) ? 'TODAY' : 'UNCONFIRMED'}
              </h3>}
            <div className="space-y-3">
              {otherMeetings.map(meeting => <MeetingCard key={meeting.id} meeting={meeting} />)}
            </div>
          </div>}

        {todayMeetings.length === 0 && otherMeetings.length === 0 && <div className="text-center py-8 text-gray-500">
            No {activeTab} bookings
          </div>}
      </div>

      {/* Add Guests Modal */}
      <AddGuestsModal isOpen={showAddGuests} onClose={() => setShowAddGuests(false)} onAdd={emails => console.log('Add guests:', emails)} />

      {/* Meeting Notes Modal */}
      {showMeetingNotes && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
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
              <textarea value={meetingNotes} onChange={e => setMeetingNotes(e.target.value)} className="w-full h-32 p-4 border border-gray-200 rounded-b-md border-t-0 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Add your meeting notes here..." />
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
        </div>}

      {/* Cancel Event Modal */}
      {showCancelConfirm && selectedMeeting && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">Cancel Event</h2>
            
            {selectedMeeting.status === 'recurring' && selectedMeeting.recurringDates ? <div className="mb-6">
                <label className="block text-sm font-medium mb-3 text-gray-900">Select the meetings you want to cancel</label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">Select All</span>
                    <Checkbox checked={selectedRecurringDates.length === selectedMeeting.recurringDates.length} onCheckedChange={checked => {
                if (checked) {
                  setSelectedRecurringDates(selectedMeeting.recurringDates || []);
                } else {
                  setSelectedRecurringDates([]);
                }
              }} />
                  </div>
                  {selectedMeeting.recurringDates.map((date, index) => <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                      <span className="text-sm">{date}</span>
                      <Checkbox checked={selectedRecurringDates.includes(date)} onCheckedChange={checked => {
                if (checked) {
                  setSelectedRecurringDates([...selectedRecurringDates, date]);
                } else {
                  setSelectedRecurringDates(selectedRecurringDates.filter(d => d !== date));
                }
              }} />
                    </div>)}
                </div>
              </div> : <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex gap-3">
                  <span className="font-medium text-gray-600 min-w-16">Event:</span>
                  <span className="text-gray-900">{selectedMeeting.eventType}</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-medium text-gray-600 min-w-16">When:</span>
                  <span className="text-gray-900">{selectedMeeting.date} {selectedMeeting.time} - {selectedMeeting.endTime}</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-medium text-gray-600 min-w-16">With:</span>
                  <span className="text-gray-900">{selectedMeeting.attendees.map(a => a.name).join(', ')}</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-medium text-gray-600 min-w-16">Where:</span>
                  <span className="text-gray-900">{selectedMeeting.location.name}</span>
                </div>
              </div>}

            <div className="mb-6">
              <label className="block text-sm font-medium mb-3 text-gray-900">Reason for cancellation (optional)</label>
              <textarea value={cancelReason} onChange={e => setCancelReason(e.target.value)} className="w-full h-24 p-3 border border-gray-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Why are you cancelling?" />
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
        </div>}

      {/* No Show Modal */}
      {showNoShow && selectedMeeting && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-2">Mark as No-Show</h2>
            <p className="text-sm text-gray-600 mb-6">Select attendees to mark as no-show</p>
            
            <div className="space-y-4 mb-6">
              {selectedMeeting.attendees.map((attendee, index) => <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {attendee.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{attendee.name}</span>
                  </div>
                  <Checkbox />
                </div>)}
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
        </div>}

      {/* Edit Location Modal */}
      {showEditLocation && selectedMeeting && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
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
        </div>}
    </div>;
}