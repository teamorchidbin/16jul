import React, { useState } from 'react';
import { CalendarIcon, Clock, MapPin, User, Users, MoreVertical } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';

export default function Bookings() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);

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
        invitee: 'Sanskar Yadav',
        email: 'sanskar@onehash.ai',
        date: 'Fri, December 20',
        time: '9:00am - 9:30am',
        timezone: 'Indian Standard Time',
        status: 'confirmed',
        attendees: 2
      },
      {
        id: '2',
        title: 'Product Demo',
        invitee: 'John Doe',
        email: 'john@example.com',
        date: 'Mon, December 23',
        time: '2:00pm - 3:00pm',
        timezone: 'Indian Standard Time',
        status: 'confirmed',
        attendees: 3
      }
    ],
    unconfirmed: [
      {
        id: '3',
        title: 'Discovery Call',
        invitee: 'Jane Smith',
        email: 'jane@company.com',
        date: 'Wed, December 25',
        time: '11:00am - 11:30am',
        timezone: 'Indian Standard Time',
        status: 'pending',
        attendees: 2
      }
    ],
    recurring: [
      {
        id: '4',
        title: 'Weekly Standup',
        invitee: 'Team Meeting',
        email: 'team@onehash.ai',
        date: 'Every Monday',
        time: '10:00am - 10:30am',
        timezone: 'Indian Standard Time',
        status: 'confirmed',
        attendees: 5,
        isRecurring: true
      }
    ],
    past: [
      {
        id: '5',
        title: 'Client Consultation',
        invitee: 'Alice Brown',
        email: 'alice@startup.com',
        date: 'Thu, December 19',
        time: '3:00pm - 4:00pm',
        timezone: 'Indian Standard Time',
        status: 'completed',
        attendees: 2
      }
    ],
    canceled: [
      {
        id: '6',
        title: 'Strategy Session',
        invitee: 'Bob Wilson',
        email: 'bob@agency.com',
        date: 'Tue, December 17',
        time: '1:00pm - 2:00pm',
        timezone: 'Indian Standard Time',
        status: 'canceled',
        attendees: 3
      }
    ]
  };

  const toggleBookingExpansion = (bookingId: string) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };

  const renderBookingCard = (booking: any) => {
    const isExpanded = expandedBooking === booking.id;
    
    return (
      <div 
        key={booking.id} 
        className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => toggleBookingExpansion(booking.id)}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-medium text-lg">{booking.title}</h3>
              <Badge variant={booking.status === 'confirmed' ? 'default' : 
                           booking.status === 'pending' ? 'secondary' : 
                           booking.status === 'completed' ? 'outline' : 'destructive'}>
                {booking.status}
              </Badge>
            </div>
            
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{booking.invitee} ({booking.email})</span>
              </div>
              
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>{booking.date}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{booking.time} ({booking.timezone})</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{booking.attendees} attendees</span>
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit Booking</DropdownMenuItem>
              <DropdownMenuItem>Reschedule</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {isExpanded && (
          <div className="mt-4 pt-4 border-t">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium mb-1">Meeting Link</p>
                <p className="text-muted-foreground">https://meet.google.com/abc-def-ghi</p>
              </div>
              <div>
                <p className="font-medium mb-1">Location</p>
                <p className="text-muted-foreground">Online Meeting</p>
              </div>
              <div>
                <p className="font-medium mb-1">Duration</p>
                <p className="text-muted-foreground">30 minutes</p>
              </div>
              <div>
                <p className="font-medium mb-1">Created</p>
                <p className="text-muted-foreground">2 days ago</p>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="font-medium mb-2">Notes</p>
              <p className="text-sm text-muted-foreground">
                Discussion about project requirements and timeline. Please come prepared with your questions.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-semibold">Bookings</h1>
          <p className="text-muted-foreground">Manage your upcoming and past bookings</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        {/* Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1 mb-6 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
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

        {/* Content */}
        <div className="space-y-4">
          {mockBookings[activeTab as keyof typeof mockBookings]?.length > 0 ? (
            mockBookings[activeTab as keyof typeof mockBookings].map(renderBookingCard)
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
    </div>
  );
}