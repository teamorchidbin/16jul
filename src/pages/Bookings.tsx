import React, { useState } from 'react';
import { CalendarIcon, Clock, MapPin, User, Users, MoreVertical, Video, ExternalLink, Edit, RotateCcw, X, UserPlus, StickyNote } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { AddGuestsModal } from '../components/AddGuestsModal';
import { MeetingNotesModal } from '../components/MeetingNotesModal';
export default function Bookings() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);
  const [showAddGuests, setShowAddGuests] = useState(false);
  const [showMeetingNotes, setShowMeetingNotes] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const tabs = [{
    id: 'upcoming',
    label: 'Upcoming',
    count: 3
  }, {
    id: 'unconfirmed',
    label: 'Unconfirmed',
    count: 1
  }, {
    id: 'recurring',
    label: 'Recurring',
    count: 2
  }, {
    id: 'past',
    label: 'Past',
    count: 15
  }, {
    id: 'canceled',
    label: 'Canceled',
    count: 2
  }];
  const mockBookings = {
    upcoming: {
      today: [{
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
        meetingNotes: ''
      }],
      tomorrow: [{
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
        meetingNotes: ''
      }]
    },
    unconfirmed: {
      later: [{
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
        meetingNotes: ''
      }]
    },
    recurring: {
      weekly: [{
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
        isRecurring: true
      }]
    },
    past: {
      yesterday: [{
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
        meetingNotes: 'Great meeting with actionable insights.'
      }]
    },
    canceled: {
      thisWeek: [{
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
        meetingNotes: ''
      }]
    }
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
    return <div key={booking.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-sm transition-all duration-200 cursor-pointer" onClick={() => toggleBookingExpansion(booking.id)}>
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
                {booking.location.type === 'online' ? <>
                    <Video className="h-4 w-4 text-muted-foreground" />
                    <button className="text-primary hover:text-primary/80 flex items-center gap-1" onClick={e => {
                  e.stopPropagation();
                  window.open(booking.location.link, '_blank');
                }}>
                      Join {booking.location.app}
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </> : <>
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{booking.location.address}</span>
                  </>}
              </div>
              
              {booking.notes && <div className="flex items-start gap-2 text-muted-foreground">
                  <StickyNote className="h-4 w-4 mt-0.5" />
                  <span className="text-sm">{booking.notes}</span>
                </div>}
            </div>
          </div>
          
          
        </div>
        
        {isExpanded && <div className="mt-6 pt-6 border-t border-border">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Meeting Details</h4>
              <Button variant="outline" size="sm" onClick={e => {
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
          </div>}
      </div>;
  };
  const renderSection = (title: string, bookings: any[]) => {
    if (bookings.length === 0) return null;
    return <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>
        <div className="space-y-4">
          {bookings.map(renderBookingCard)}
        </div>
      </div>;
  };
  const currentBookings = mockBookings[activeTab as keyof typeof mockBookings] || {};
  return <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        

        <div className="px-8 py-6">
          {/* Tabs */}
          <div className="flex space-x-1 bg-muted rounded-lg p-1 mb-8 w-fit">
            {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-6 py-3 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === tab.id ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                {tab.label}
                <Badge variant="secondary" className="text-xs">
                  {tab.count}
                </Badge>
              </button>)}
          </div>

          {/* Content */}
          <div className="max-w-4xl">
            {Object.keys(currentBookings).length > 0 ? Object.entries(currentBookings).map(([sectionKey, bookings]) => renderSection(sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1), bookings as any[])) : <div className="text-center py-12">
                <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No bookings found</h3>
                <p className="text-muted-foreground">
                  {activeTab === 'upcoming' && "You don't have any upcoming bookings."}
                  {activeTab === 'unconfirmed' && "No unconfirmed bookings at the moment."}
                  {activeTab === 'recurring' && "No recurring bookings set up."}
                  {activeTab === 'past' && "No past bookings to display."}
                  {activeTab === 'canceled' && "No canceled bookings."}
                </p>
              </div>}
          </div>
        </div>
      </div>

      <AddGuestsModal isOpen={showAddGuests} onClose={() => setShowAddGuests(false)} onAdd={handleAddGuests} />

      <MeetingNotesModal isOpen={showMeetingNotes} onClose={() => setShowMeetingNotes(false)} onSave={handleSaveMeetingNotes} />
    </>;
}