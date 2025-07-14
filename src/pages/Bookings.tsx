
import React, { useState } from 'react';
import { CalendarIcon, Clock, MapPin, User, Users, MoreVertical, Video, ExternalLink, Edit, RotateCcw, X, UserPlus, StickyNote, Search, Filter, Download, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Checkbox } from '../components/ui/checkbox';
import { AddGuestsModal } from '../components/AddGuestsModal';
import { MeetingNotesModal } from '../components/MeetingNotesModal';
import { Header } from '../components/Header';
import { useToast } from '../hooks/use-toast';

export default function Bookings() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);
  const [showAddGuests, setShowAddGuests] = useState(false);
  const [showMeetingNotes, setShowMeetingNotes] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancelBookingId, setCancelBookingId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  const [isCanceled, setIsCanceled] = useState(false);
  const [showAttendeeFilter, setShowAttendeeFilter] = useState(false);
  const [showHostFilter, setShowHostFilter] = useState(false);
  const [showEventTypeFilter, setShowEventTypeFilter] = useState(false);
  const [showTeamFilter, setShowTeamFilter] = useState(false);
  const { toast } = useToast();

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', count: 3 },
    { id: 'unconfirmed', label: 'Unconfirmed', count: 1 },
    { id: 'recurring', label: 'Recurring', count: 2 },
    { id: 'past', label: 'Past', count: 15 },
    { id: 'canceled', label: 'Canceled', count: 2 }
  ];

  const mockBookings = {
    upcoming: [
      {
        id: '1',
        title: '30 Minute Meeting',
        attendees: ['Sanskar Yadav'],
        email: 'sanskar@onehash.ai',
        date: 'Today',
        time: '9:00am - 9:30am',
        timezone: 'Indian Standard Time',
        location: {
          type: 'online',
          app: 'Google Meet',
          link: 'https://meet.google.com/abc-def-ghi'
        },
        status: 'confirmed',
        notes: 'Discussion about project requirements and timeline. Please come prepared with your questions.',
        meetingNotes: '',
        isToday: true
      },
      {
        id: '2',
        title: 'Product Demo',
        attendees: ['John Doe', 'Jane Smith'],
        email: 'john@example.com',
        date: 'Tomorrow',
        time: '2:00pm - 3:00pm',
        timezone: 'Indian Standard Time',
        location: {
          type: 'physical',
          address: '123 Business Street, Tech Park, Bangalore'
        },
        status: 'confirmed',
        notes: 'Demo of new features and Q&A session.',
        meetingNotes: '',
        isToday: false
      }
    ],
    unconfirmed: [
      {
        id: '3',
        title: 'Discovery Call',
        attendees: ['Jane Smith'],
        email: 'jane@company.com',
        date: 'Wed, December 25',
        time: '11:00am - 11:30am',
        timezone: 'Indian Standard Time',
        location: {
          type: 'online',
          app: 'Zoom',
          link: 'https://zoom.us/j/123456789'
        },
        status: 'pending',
        notes: 'Initial discovery call to understand requirements.',
        meetingNotes: '',
        isToday: false
      }
    ],
    recurring: [
      {
        id: '4',
        title: 'Weekly Standup',
        attendees: ['Team Meeting'],
        email: 'team@onehash.ai',
        date: 'Every Monday',
        time: '10:00am - 10:30am',
        timezone: 'Indian Standard Time',
        location: {
          type: 'online',
          app: 'Jitsi',
          link: 'https://meet.jit.si/weekly-standup'
        },
        status: 'confirmed',
        notes: 'Weekly team sync and updates.',
        meetingNotes: '',
        isRecurring: true,
        isToday: false
      }
    ],
    past: [
      {
        id: '5',
        title: 'Client Consultation',
        attendees: ['Alice Brown'],
        email: 'alice@startup.com',
        date: 'Yesterday',
        time: '3:00pm - 4:00pm',
        timezone: 'Indian Standard Time',
        location: {
          type: 'online',
          app: 'Google Meet',
          link: 'https://meet.google.com/xyz-abc-def'
        },
        status: 'completed',
        notes: 'Consultation about marketing strategy.',
        meetingNotes: 'Great meeting with actionable insights.',
        isToday: false
      }
    ],
    canceled: [
      {
        id: '6',
        title: 'Strategy Session',
        attendees: ['Bob Wilson'],
        email: 'bob@agency.com',
        date: 'Tue, December 17',
        time: '1:00pm - 2:00pm',
        timezone: 'Indian Standard Time',
        location: {
          type: 'physical',
          address: '456 Corporate Ave, Business District, Mumbai'
        },
        status: 'canceled',
        notes: 'Strategy planning session.',
        meetingNotes: '',
        isToday: false
      }
    ]
  };

  const handleExport = () => {
    toast({
      title: "Export successful",
      description: "Your bookings will be sent to your email shortly.",
    });
  };

  const handleCancelEvent = (bookingId: string) => {
    setCancelBookingId(bookingId);
    setShowCancelDialog(true);
    setIsCanceled(false);
  };

  const confirmCancel = () => {
    setIsCanceled(true);
  };

  const handleReschedule = () => {
    window.location.href = '/scheduling-coming-soon';
  };

  const toggleBookingExpansion = (bookingId: string) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };

  const handleAddGuests = (emails: string[]) => {
    console.log('Adding guests:', emails);
    setShowAddGuests(false);
  };

  const handleSaveMeetingNotes = (notes: string) => {
    console.log('Saving meeting notes:', notes);
    setShowMeetingNotes(false);
  };

  const renderBookingCard = (booking: any) => {
    const isExpanded = expandedBooking === booking.id;
    return (
      <div key={booking.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-sm transition-all duration-200 cursor-pointer" onClick={() => setExpandedBooking(expandedBooking === booking.id ? null : booking.id)}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="font-semibold text-lg text-foreground">{booking.title}</h3>
              <Badge variant={booking.status === 'confirmed' ? 'default' : booking.status === 'pending' ? 'secondary' : booking.status === 'completed' ? 'outline' : 'destructive'}>
                {booking.status}
              </Badge>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{booking.attendees.join(', ')}</span>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{booking.date} • {booking.time}</span>
              </div>
              
              <div className="flex items-center gap-2">
                {booking.location.type === 'online' ? (
                  <>
                    <Video className="h-4 w-4 text-muted-foreground" />
                    <button className="text-primary hover:text-primary/80 flex items-center gap-1" onClick={(e) => {
                      e.stopPropagation();
                      window.open(booking.location.link, '_blank');
                    }}>
                      Join {booking.location.app}
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </>
                ) : (
                  <>
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{booking.location.address}</span>
                  </>
                )}
              </div>
              
              {booking.notes && (
                <div className="flex items-start gap-2 text-muted-foreground">
                  <StickyNote className="h-4 w-4 mt-0.5" />
                  <span className="text-sm">{booking.notes}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={(e) => {
              e.stopPropagation();
              handleReschedule();
            }}>
              <RotateCcw className="h-4 w-4 mr-1" />
              Reschedule
            </Button>
            <Button variant="outline" size="sm" onClick={(e) => {
              e.stopPropagation();
              handleCancelEvent(booking.id);
            }}>
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => console.log('Edit location')}>
                  <MapPin className="h-4 w-4 mr-2" />
                  Edit location
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  setSelectedBookingId(booking.id);
                  setShowAddGuests(true);
                }}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add guests
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Meeting Details</h4>
              <Button variant="outline" size="sm" onClick={(e) => {
                e.stopPropagation();
                setSelectedBookingId(booking.id);
                setShowMeetingNotes(true);
              }}>
                <StickyNote className="h-4 w-4 mr-1" />
                Meeting Notes
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium mb-1">Duration</p>
                <p className="text-muted-foreground">30 minutes</p>
              </div>
              <div>
                <p className="font-medium mb-1">Created</p>
                <p className="text-muted-foreground">2 days ago</p>
              </div>
              <div>
                <p className="font-medium mb-1">Timezone</p>
                <p className="text-muted-foreground">{booking.timezone}</p>
              </div>
              <div>
                <p className="font-medium mb-1">Attendees</p>
                <p className="text-muted-foreground">{booking.attendees.length}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSection = (title: string, bookings: any[]) => {
    if (bookings.length === 0) return null;
    return (
      <div className="mb-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">{title}</h3>
        <div className="space-y-3">
          {bookings.map(renderBookingCard)}
        </div>
      </div>
    );
  };

  const currentBookings = mockBookings[activeTab as keyof typeof mockBookings] || [];
  const todayBookings = currentBookings.filter((booking: any) => booking.isToday);
  const otherBookings = currentBookings.filter((booking: any) => !booking.isToday);
  const hasMultipleDates = todayBookings.length > 0 && otherBookings.length > 0;

  const selectedBooking = mockBookings[activeTab as keyof typeof mockBookings]?.find((booking: any) => booking.id === cancelBookingId);

  return (
    <div className="min-h-screen bg-background">
      <Header showEventTypesHeader={false} />
      
      <div className="px-8 py-6">
        <div className="flex items-center justify-between space-x-4 mb-8">
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-foreground mb-1">Bookings</h1>
            <p className="text-sm text-muted-foreground">Manage all your scheduled meetings and appointments.</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1 mb-8 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
              <Badge variant="secondary" className="text-xs">
                {tab.count}
              </Badge>
            </button>
          ))}
        </div>

        {/* Search and Actions */}
        <div className="flex items-center justify-between space-x-4 mb-6">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-sm"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-muted/30 border border-border rounded-lg p-4 mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">Filters</h3>
              <Button variant="ghost" size="sm">Clear all filters</Button>
            </div>
            
            <div className="grid grid-cols-5 gap-4">
              {/* Attendee Filter */}
              <div className="relative">
                <Popover open={showAttendeeFilter} onOpenChange={setShowAttendeeFilter}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      Attendee: All
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">All Users</h4>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Search"
                          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="sanskar-yadav" defaultChecked />
                          <div className="flex items-center space-x-2">
                            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-xs text-white">SY</div>
                            <label htmlFor="sanskar-yadav" className="text-sm">Sanskar Yadav</label>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground text-center">No more results</p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Host Filter */}
              <div className="relative">
                <Popover open={showHostFilter} onOpenChange={setShowHostFilter}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      Host: All
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">All Users</h4>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Search"
                          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="host-sanskar" defaultChecked />
                          <div className="flex items-center space-x-2">
                            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-xs text-white">SY</div>
                            <label htmlFor="host-sanskar" className="text-sm">Sanskar Yadav</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Event Type Filter */}
              <div className="relative">
                <Popover open={showEventTypeFilter} onOpenChange={setShowEventTypeFilter}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      Event Type: All
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="all-event-types" defaultChecked />
                        <label htmlFor="all-event-types" className="text-sm font-medium">All event types</label>
                      </div>
                      <hr />
                      <div>
                        <h5 className="font-medium mb-2">Personal</h5>
                        <div className="space-y-2 ml-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="30-min-meeting" />
                            <label htmlFor="30-min-meeting" className="text-sm">30 Minute Meeting</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="discovery-call" />
                            <label htmlFor="discovery-call" className="text-sm">Discovery Call</label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Tech Team</h5>
                        <div className="space-y-2 ml-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="tech-standup" />
                            <label htmlFor="tech-standup" className="text-sm">Weekly Standup</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Teams Filter */}
              <div className="relative">
                <Popover open={showTeamFilter} onOpenChange={setShowTeamFilter}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      Teams: All
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="all-teams" defaultChecked />
                        <label htmlFor="all-teams" className="text-sm font-medium">All</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="personal-team" />
                        <label htmlFor="personal-team" className="text-sm">Personal</label>
                      </div>
                      <hr />
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="tech-team-filter" />
                          <label htmlFor="tech-team-filter" className="text-sm">Tech Team</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="design-team-filter" />
                          <label htmlFor="design-team-filter" className="text-sm">Design Team</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="marketing-team-filter" />
                          <label htmlFor="marketing-team-filter" className="text-sm">Marketing Team</label>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Date Range Filter */}
              <div className="relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      Jul 14, 2025
                      <CalendarIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="range" className="rounded-md border" />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-4xl">
          {currentBookings.length > 0 ? (
            <>
              {hasMultipleDates && renderSection('Today', todayBookings)}
              {hasMultipleDates ? renderSection('Other', otherBookings) : renderSection('', currentBookings)}
            </>
          ) : (
            <div className="text-center py-12">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No bookings found</h3>
              <p className="text-muted-foreground">
                {activeTab === 'upcoming' && "You don't have any upcoming bookings."}
                {activeTab === 'unconfirmed' && "No unconfirmed bookings at the moment."}
                {activeTab === 'recurring' && "No recurring bookings set up."}
                {activeTab === 'past' && "No past bookings to display."}
                {activeTab === 'canceled' && "No canceled bookings."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Cancel Event Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="sm:max-w-md">
          {!isCanceled ? (
            <>
              <DialogHeader>
                <DialogTitle>Are you sure you want to cancel the event?</DialogTitle>
              </DialogHeader>
              
              {selectedBooking && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm mb-1">Event</h4>
                      <p className="text-sm">{selectedBooking.title}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-1">Date & Time</h4>
                      <p className="text-sm">{selectedBooking.date} • {selectedBooking.time}</p>
                      <p className="text-xs text-muted-foreground">{selectedBooking.timezone}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-1">Location</h4>
                      {selectedBooking.location.type === 'online' ? (
                        <button className="text-sm text-primary flex items-center gap-1">
                          {selectedBooking.location.app} <ExternalLink className="h-3 w-3" />
                        </button>
                      ) : (
                        <p className="text-sm">{selectedBooking.location.address}</p>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-1">Attendees</h4>
                      <div className="space-y-1">
                        {selectedBooking.attendees.map((attendee: string, index: number) => (
                          <div key={index} className="text-sm">
                            <p>{attendee}</p>
                            <p className="text-xs text-muted-foreground">{selectedBooking.email}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Reason for cancellation (optional)</label>
                    <textarea
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      placeholder="Why are you cancelling?"
                      className="w-full p-3 border border-border rounded-lg resize-none h-20 text-sm"
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                      Nevermind
                    </Button>
                    <Button variant="destructive" onClick={confirmCancel}>
                      Cancel event
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-6">
              <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                <X className="h-8 w-8 text-destructive" />
              </div>
              <DialogTitle className="text-xl mb-4">Event Canceled</DialogTitle>
              {selectedBooking && (
                <div className="space-y-3 text-sm text-left">
                  <div>
                    <h4 className="font-medium mb-1">Event</h4>
                    <p className="line-through text-muted-foreground">{selectedBooking.title}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">Date & Time</h4>
                    <p className="line-through text-muted-foreground">{selectedBooking.date} • {selectedBooking.time}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">Attendees</h4>
                    <div className="space-y-1">
                      {selectedBooking.attendees.map((attendee: string, index: number) => (
                        <div key={index}>
                          <p className="line-through text-muted-foreground">{attendee}</p>
                          <p className="text-xs line-through text-muted-foreground">{selectedBooking.email}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <Button 
                className="mt-6" 
                onClick={() => setShowCancelDialog(false)}
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AddGuestsModal 
        isOpen={showAddGuests} 
        onClose={() => setShowAddGuests(false)} 
        onAdd={(emails) => {
          console.log('Adding guests:', emails);
          setShowAddGuests(false);
        }} 
      />

      <MeetingNotesModal 
        isOpen={showMeetingNotes} 
        onClose={() => setShowMeetingNotes(false)} 
        onSave={(notes) => {
          console.log('Saving meeting notes:', notes);
          setShowMeetingNotes(false);
        }} 
      />
    </div>
  );
}
