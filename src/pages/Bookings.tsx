
import React, { useState } from 'react';
import { CalendarIcon, Clock, MapPin, User, Users, MoreVertical, Video, ExternalLink, Edit, RotateCcw, X, UserPlus, StickyNote, Search, Filter, Download, ChevronDown, Upload } from 'lucide-react';
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
  const [showEditLocation, setShowEditLocation] = useState(false);
  const [showNoShowDialog, setShowNoShowDialog] = useState(false);
  const [noShowBookingId, setNoShowBookingId] = useState<string | null>(null);
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([]);
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
        notes: 'Discussion about project requirements and timeline.',
        meetingNotes: '',
        isToday: true,
        isPast: false
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
        isToday: false,
        isPast: false
      },
      {
        id: '7',
        title: 'Client Call',
        attendees: ['Mike Wilson'],
        email: 'mike@company.com',
        date: 'Today',
        time: '1:00pm - 1:30pm',
        timezone: 'Indian Standard Time',
        location: {
          type: 'online',
          app: 'Zoom',
          link: 'https://zoom.us/j/987654321'
        },
        status: 'confirmed',
        notes: 'Follow-up call with client.',
        meetingNotes: '',
        isToday: true,
        isPast: true
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
        isToday: false,
        isPast: false
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
        isToday: false,
        isPast: false
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
        isToday: false,
        isPast: true
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
        isToday: false,
        isPast: false
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

  const handleMarkNoShow = (bookingId: string) => {
    setNoShowBookingId(bookingId);
    setShowNoShowDialog(true);
  };

  const confirmNoShow = () => {
    console.log('Marking as no-show:', selectedAttendees);
    setShowNoShowDialog(false);
    setSelectedAttendees([]);
    toast({
      title: "Attendees marked as no-show",
      description: "The selected attendees have been marked as no-show.",
    });
  };

  const renderBookingCard = (booking: any) => {
    return (
      <div key={booking.id} className="group relative rounded-xl border border-border bg-card p-6 transition-all hover:shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-semibold text-card-foreground truncate">{booking.title}</h3>
              <Badge variant={booking.status === 'confirmed' ? 'default' : booking.status === 'pending' ? 'secondary' : booking.status === 'completed' ? 'outline' : 'destructive'}>
                {booking.status}
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{booking.attendees.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{booking.date} • {booking.time}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
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
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <StickyNote className="h-4 w-4 mt-0.5" />
                  <span>{booking.notes}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2 ml-4">
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
                <DropdownMenuItem onClick={() => setShowEditLocation(true)}>
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
            <Button variant="outline" size="sm" onClick={(e) => {
              e.stopPropagation();
              setSelectedBookingId(booking.id);
              setShowMeetingNotes(true);
            }}>
              <StickyNote className="h-4 w-4 mr-1" />
              Notes
            </Button>
            {booking.isPast && (
              <Button variant="outline" size="sm" onClick={(e) => {
                e.stopPropagation();
                handleMarkNoShow(booking.id);
              }}>
                Mark as No-Show
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const currentBookings = mockBookings[activeTab as keyof typeof mockBookings] || [];
  const todayBookings = currentBookings.filter(booking => booking.isToday);
  const otherBookings = currentBookings.filter(booking => !booking.isToday);
  const showTodaySection = todayBookings.length > 0 && otherBookings.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header showEventTypesHeader={true} />
      
      <div className="px-8 py-6">
        <div className="flex items-center justify-between space-x-4 mb-8">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground mb-1">Bookings</h1>
            <p className="text-muted-foreground">Manage all your scheduled meetings and appointments.</p>
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
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-sm"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Upload className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-muted/30 border border-border rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="sm" className="text-muted-foreground">Clear all filters</Button>
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
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-xs text-white">SY</div>
                            <label className="text-sm">Sanskar Yadav</label>
                          </div>
                          <Checkbox defaultChecked />
                        </div>
                      </div>
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
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-xs text-white">SY</div>
                            <label className="text-sm">Sanskar Yadav</label>
                          </div>
                          <Checkbox defaultChecked />
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
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">All event types</label>
                        <Checkbox defaultChecked />
                      </div>
                      <hr />
                      <div>
                        <h5 className="font-medium mb-2">Personal</h5>
                        <div className="space-y-2 ml-4">
                          <div className="flex items-center justify-between">
                            <label className="text-sm">30 Minute Meeting</label>
                            <Checkbox />
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="text-sm">Discovery Call</label>
                            <Checkbox />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Tech Team</h5>
                        <div className="space-y-2 ml-4">
                          <div className="flex items-center justify-between">
                            <label className="text-sm">Weekly Standup</label>
                            <Checkbox />
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
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">All</label>
                        <Checkbox defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Personal</label>
                        <Checkbox />
                      </div>
                      <hr />
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm">Tech Team</label>
                          <Checkbox />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm">Design Team</label>
                          <Checkbox />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm">Marketing Team</label>
                          <Checkbox />
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
        <div className="space-y-6">
          {showTodaySection && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Today</h3>
              <div className="space-y-4">
                {todayBookings.map(renderBookingCard)}
              </div>
            </div>
          )}
          
          {otherBookings.length > 0 && (
            <div className="space-y-4">
              {otherBookings.map(renderBookingCard)}
            </div>
          )}
          
          {currentBookings.length === 0 && (
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
                <DialogTitle>Cancel Event</DialogTitle>
                <DialogDescription>
                  Are you sure you want to cancel this event? All attendees will be notified.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Event:</span>
                    <div className="mt-1">30 Minute Meeting</div>
                  </div>
                  <div>
                    <span className="font-medium">Date & Time:</span>
                    <div className="mt-1">Monday, July 14, 2025</div>
                    <div>9:00 AM - 9:30 AM (IST)</div>
                  </div>
                  <div>
                    <span className="font-medium">Location:</span>
                    <div className="mt-1 text-primary">Google Meet</div>
                  </div>
                  <div>
                    <span className="font-medium">Attendees:</span>
                    <div className="mt-1">
                      <div>Sanskar Yadav (sanskar@onehash.ai)</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Reason for cancellation (optional)</label>
                  <textarea
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    placeholder="Why are you cancelling?"
                    className="w-full p-3 border border-border rounded-lg resize-none h-24 text-sm"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                    Keep Event
                  </Button>
                  <Button variant="destructive" onClick={confirmCancel}>
                    Cancel Event
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                <X className="h-8 w-8 text-destructive" />
              </div>
              <DialogTitle className="text-xl mb-4">Event Canceled</DialogTitle>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Event:</span>
                  <div className="mt-1 line-through text-muted-foreground">30 Minute Meeting</div>
                </div>
                <div>
                  <span className="font-medium">Date & Time:</span>
                  <div className="mt-1 line-through text-muted-foreground">Monday, July 14, 2025</div>
                  <div className="line-through text-muted-foreground">9:00 AM - 9:30 AM (IST)</div>
                </div>
                <div>
                  <span className="font-medium">Attendees:</span>
                  <div className="mt-1">
                    <div>Sanskar Yadav (sanskar@onehash.ai)</div>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4">All attendees have been notified of the cancellation.</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Location Dialog */}
      <Dialog open={showEditLocation} onOpenChange={setShowEditLocation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Edit Location
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium">Current Location:</span>
              <div className="mt-2 flex items-center gap-2">
                <Video className="h-4 w-4 text-primary" />
                <span className="text-sm">Google Meet</span>
              </div>
            </div>

            <div className="space-y-2">
              <select className="w-full p-3 border border-border rounded-lg bg-background">
                <option>Google Meet</option>
                <option>Zoom</option>
                <option>Microsoft Teams</option>
                <option>Phone call</option>
                <option>Physical location</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowEditLocation(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowEditLocation(false)}>
                Update
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mark as No-Show Dialog */}
      <Dialog open={showNoShowDialog} onOpenChange={setShowNoShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Mark as No-Show</DialogTitle>
            <DialogDescription>
              After Event workflow reminders will not be triggered for attendees marked as no-show
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm">yo</label>
                <Checkbox 
                  checked={selectedAttendees.includes('yo')}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedAttendees([...selectedAttendees, 'yo']);
                    } else {
                      setSelectedAttendees(selectedAttendees.filter(a => a !== 'yo'));
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowNoShowDialog(false)}>
                Close
              </Button>
              <Button onClick={confirmNoShow}>
                Confirm
              </Button>
            </div>
          </div>
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
