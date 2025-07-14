
import React, { useState, useRef, useEffect } from 'react';
import { Plus, MoreHorizontal, Eye, Edit, Copy as CopyIcon, Code, Trash2, ArrowUp, ArrowDown, Search, Copy, Filter, Upload } from 'lucide-react';
import { CreateEventModal } from '../components/CreateEventModal';
import { useNavigate } from 'react-router-dom';
import { mockTeams } from '../data/mockData';
import { Switch } from '../components/ui/switch';

interface Booking {
  id: string;
  title: string;
  description: string;
  url: string;
  durations: number[];
  bookingsToday: number;
  isActive: boolean;
}

export default function Bookings() {
  const [selectedTeam, setSelectedTeam] = useState('personal');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showNewDropdown, setShowNewDropdown] = useState(false);
  const [hoveredBooking, setHoveredBooking] = useState<string | null>(null);
  const [showMoreOptions, setShowMoreOptions] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [copiedPublicLink, setCopiedPublicLink] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingStates, setBookingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [teamBookings, setTeamBookings] = useState(mockTeams);
  const navigate = useNavigate();
  const currentTeam = teamBookings.find(t => t.id === selectedTeam) || teamBookings[0];
  const filteredBookings = currentTeam.eventTypes.filter(booking => 
    booking.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    booking.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Initialize booking states
  useEffect(() => {
    const initialStates: {
      [key: string]: boolean;
    } = {};
    teamBookings.forEach(team => {
      team.eventTypes.forEach(booking => {
        initialStates[booking.id] = booking.isActive;
      });
    });
    setBookingStates(initialStates);
  }, [teamBookings]);

  const handleBookingClick = (bookingId: string) => {
    navigate(`/event/${bookingId}/setup`);
  };

  const handleCreateBooking = (bookingData: any) => {
    console.log('Creating booking with data:', bookingData);
    const newBookingId = `booking-${Date.now()}`;
    const newBooking: Booking = {
      id: newBookingId,
      title: bookingData.title || 'New Booking',
      description: bookingData.description || 'A new booking',
      url: `/${currentTeam.url}/${bookingData.url || 'new-booking'}`,
      durations: [parseInt(bookingData.duration) || 30],
      bookingsToday: 0,
      isActive: true
    };
    console.log('New booking object:', newBooking);

    // Update team bookings state
    setTeamBookings(prevTeams => {
      const updatedTeams = prevTeams.map(team => 
        team.id === selectedTeam ? {
          ...team,
          eventTypes: [...team.eventTypes, newBooking]
        } : team
      );
      console.log('Updated teams:', updatedTeams);
      return updatedTeams;
    });

    // Initialize booking state
    setBookingStates(prev => ({
      ...prev,
      [newBookingId]: true
    }));

    // Close modal and navigate to the NEW booking
    setIsCreateModalOpen(false);
    console.log('Navigating to new booking:', newBookingId);
    navigate(`/event/${newBookingId}/setup`);
  };

  const handleCopyLink = (bookingId: string, url: string) => {
    navigator.clipboard.writeText(`https://cal.id${url}`);
    setCopiedLink(bookingId);
    setTimeout(() => setCopiedLink(null), 1500);
  };

  const handleCopyPublicLink = () => {
    const publicUrl = selectedTeam === 'personal' ? 'https://cal.id/sanskar' : `https://cal.id/${currentTeam.url}`;
    navigator.clipboard.writeText(publicUrl);
    setCopiedPublicLink(true);
    setTimeout(() => setCopiedPublicLink(false), 1500);
  };

  const handleToggleBooking = (bookingId: string, checked: boolean) => {
    setBookingStates(prev => ({
      ...prev,
      [bookingId]: checked
    }));
  };

  const handleArrowClick = (bookingId: string, direction: 'up' | 'down') => {
    const bookingIndex = filteredBookings.findIndex(e => e.id === bookingId);
    if (direction === 'up' && bookingIndex > 0) {
      const newBookings = [...filteredBookings];
      [newBookings[bookingIndex], newBookings[bookingIndex - 1]] = [newBookings[bookingIndex - 1], newBookings[bookingIndex]];
      setTeamBookings(prevTeams => prevTeams.map(team => 
        team.id === selectedTeam ? {
          ...team,
          eventTypes: newBookings
        } : team
      ));
    } else if (direction === 'down' && bookingIndex < filteredBookings.length - 1) {
      const newBookings = [...filteredBookings];
      [newBookings[bookingIndex], newBookings[bookingIndex + 1]] = [newBookings[bookingIndex + 1], newBookings[bookingIndex]];
      setTeamBookings(prevTeams => prevTeams.map(team => 
        team.id === selectedTeam ? {
          ...team,
          eventTypes: newBookings
        } : team
      ));
    }
  };

  const handleMenuAction = (action: string, bookingId: string) => {
    setShowMoreOptions(null);
    switch (action) {
      case 'edit':
        handleBookingClick(bookingId);
        break;
      case 'duplicate':
        console.log('Duplicating booking', bookingId);
        break;
      case 'embed':
        console.log('Embed booking', bookingId);
        break;
      case 'delete':
        setTeamBookings(prevTeams => prevTeams.map(team => 
          team.id === selectedTeam ? {
            ...team,
            eventTypes: team.eventTypes.filter(e => e.id !== bookingId)
          } : team
        ));
        break;
    }
  };

  return (
    <div className="px-6 pt-3 pb-6 space-y-4 w-full max-w-full">
      {/* Team Selector */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4 flex-1 min-w-0 rounded-md">
          <div className="flex items-center bg-muted/50 rounded-lg p-1 flex-shrink-0">
            <button
              onClick={() => setSelectedTeam('personal')}
              className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                selectedTeam === 'personal'
                  ? 'bg-muted text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className={`h-5 w-5 rounded-full flex items-center justify-center text-xs font-medium mr-2 ${
                selectedTeam === 'personal' ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/20'
              }`}>
                {teamBookings[0].avatar}
              </div>
              <span className="truncate">Sanskar Yadav</span>
            </button>
          </div>
          
          <div className="w-px h-5 bg-border flex-shrink-0"></div>
          
          <div className="flex space-x-2 flex-1 overflow-x-auto scrollbar-none">
            {teamBookings.slice(1).map((team) => (
              <button
                key={team.id}
                onClick={() => setSelectedTeam(team.id)}
                className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-all flex-shrink-0 min-w-fit ${
                  selectedTeam === team.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <div className={`h-5 w-5 rounded-full flex items-center justify-center text-xs font-medium mr-2 ${
                  selectedTeam === team.id ? 'bg-primary-foreground text-primary' : 'bg-muted-foreground/20'
                }`}>
                  {team.avatar}
                </div>
                <span className="truncate">{team.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Bar and Action Buttons */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4 flex-1">
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
          
          <div className="relative">
            <button
              onClick={handleCopyPublicLink}
              className="flex items-center space-x-2 px-3 py-1.5 bg-muted/70 text-muted-foreground text-sm rounded-md hover:bg-muted transition-colors"
            >
              <span className="text-sm">
                {selectedTeam === 'personal' ? 'cal.id/sanskar' : `cal.id/${currentTeam.url}`}
              </span>
              <Copy className="h-4 w-4" />
            </button>
            {copiedPublicLink && (
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-foreground text-background text-xs rounded animate-fade-in whitespace-nowrap">
                Copied
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 bg-muted text-foreground text-sm font-medium rounded-lg hover:bg-muted/90 transition-colors">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-muted text-foreground text-sm font-medium rounded-lg hover:bg-muted/90 transition-colors">
            <Upload className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-2">
        {filteredBookings.map((booking) => {
          const isBookingActive = bookingStates[booking.id] ?? booking.isActive;
          return (
            <div
              key={booking.id}
              className="relative group animate-fade-in"
              onMouseEnter={() => setHoveredBooking(booking.id)}
              onMouseLeave={() => setHoveredBooking(null)}
            >
              {/* Move buttons - Fixed positioning to be half on tile, half outside */}
              {hoveredBooking === booking.id && (
                <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 flex flex-col space-y-1 z-10 animate-scale-in">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleArrowClick(booking.id, 'up');
                    }}
                    className="p-1.5 bg-background border border-border rounded-lg hover:bg-muted shadow-md transition-all transform hover:scale-105"
                  >
                    <ArrowUp className="h-3 w-3 text-muted-foreground" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleArrowClick(booking.id, 'down');
                    }}
                    className="p-1.5 bg-background border border-border rounded-lg hover:bg-muted shadow-md transition-all transform hover:scale-105"
                  >
                    <ArrowDown className="h-3 w-3 text-muted-foreground" />
                  </button>
                </div>
              )}

              <div
                onClick={() => handleBookingClick(booking.id)}
                className={`bg-card border border-border rounded-lg p-4 hover:border-border/60 transition-all hover:shadow-sm cursor-pointer ${
                  !isBookingActive ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-2 space-x-3">
                      <h3 className="font-semibold text-foreground text-base">
                        {booking.title}
                      </h3>
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyLink(booking.id, booking.url);
                          }}
                          className="flex items-center space-x-2 px-2 py-1 bg-muted/70 text-muted-foreground text-sm rounded hover:bg-muted transition-colors"
                        >
                          <Copy className="h-3 w-3" />
                          <span className="text-sm">Copy</span>
                        </button>
                        {copiedLink === booking.id && (
                          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-foreground text-background text-xs rounded animate-fade-in whitespace-nowrap">
                            Copied
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{booking.description}</p>
                    <div className="flex items-center">
                      {booking.durations?.map((duration) => (
                        <span
                          key={duration}
                          className="inline-flex items-center px-2 py-1 bg-muted text-foreground text-sm rounded mr-2"
                        >
                          {duration}m
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4" onClick={(e) => e.stopPropagation()}>
                    <Switch
                      checked={isBookingActive}
                      onCheckedChange={(checked) => handleToggleBooking(booking.id, checked)}
                    />
                    <button className="p-1.5 hover:bg-muted rounded-md transition-colors">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => setShowMoreOptions(showMoreOptions === booking.id ? null : booking.id)}
                        className="p-1.5 hover:bg-muted rounded-md transition-colors"
                      >
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </button>
                      
                      {showMoreOptions === booking.id && (
                        <div className="absolute right-0 top-full mt-1 w-40 bg-popover border border-border rounded-lg shadow-lg animate-scale-in z-10">
                          <div className="py-1">
                            <button
                              onClick={() => handleMenuAction('edit', booking.id)}
                              className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleMenuAction('duplicate', booking.id)}
                              className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                            >
                              <CopyIcon className="h-4 w-4 mr-2" />
                              Duplicate
                            </button>
                            <button
                              onClick={() => handleMenuAction('embed', booking.id)}
                              className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                            >
                              <Code className="h-4 w-4 mr-2" />
                              Embed
                            </button>
                            <button
                              onClick={() => handleMenuAction('delete', booking.id)}
                              className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        teams={teamBookings}
        selectedTeam={selectedTeam}
        onCreateEvent={handleCreateBooking}
      />
    </div>
  );
}
