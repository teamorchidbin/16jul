import React, { useState, useRef, useEffect } from 'react';
import { Plus, MoreHorizontal, Eye, Edit, Copy as CopyIcon, Code, Trash2, ArrowUp, ArrowDown, Search, Copy } from 'lucide-react';
import { CreateEventModal } from '../components/CreateEventModal';
import { useNavigate } from 'react-router-dom';
import { mockTeams } from '../data/mockData';
import { Switch } from '../components/ui/switch';
interface EventType {
  id: string;
  title: string;
  description: string;
  url: string;
  durations: number[];
  bookingsToday: number;
  isActive: boolean;
}
export const EventTypes = () => {
  const [selectedTeam, setSelectedTeam] = useState('personal');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showNewDropdown, setShowNewDropdown] = useState(false);
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);
  const [showMoreOptions, setShowMoreOptions] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [copiedPublicLink, setCopiedPublicLink] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [eventStates, setEventStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [teamEvents, setTeamEvents] = useState(mockTeams);
  const navigate = useNavigate();
  const currentTeam = teamEvents.find(t => t.id === selectedTeam) || teamEvents[0];
  const filteredEvents = currentTeam.eventTypes.filter(event => event.title.toLowerCase().includes(searchQuery.toLowerCase()) || event.description.toLowerCase().includes(searchQuery.toLowerCase()));

  // Initialize event states
  useEffect(() => {
    const initialStates: {
      [key: string]: boolean;
    } = {};
    teamEvents.forEach(team => {
      team.eventTypes.forEach(event => {
        initialStates[event.id] = event.isActive;
      });
    });
    setEventStates(initialStates);
  }, [teamEvents]);
  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}/setup`);
  };
  const handleCreateEvent = (eventData: any) => {
    console.log('Creating event with data:', eventData);
    const newEventId = `event-${Date.now()}`;
    const newEvent: EventType = {
      id: newEventId,
      title: eventData.title || 'New Event',
      description: eventData.description || 'A new event',
      url: `/${currentTeam.url}/${eventData.url || 'new-event'}`,
      durations: [parseInt(eventData.duration) || 30],
      bookingsToday: 0,
      isActive: true
    };
    console.log('New event object:', newEvent);

    // Update team events state
    setTeamEvents(prevTeams => {
      const updatedTeams = prevTeams.map(team => team.id === selectedTeam ? {
        ...team,
        eventTypes: [...team.eventTypes, newEvent]
      } : team);
      console.log('Updated teams:', updatedTeams);
      return updatedTeams;
    });

    // Initialize event state
    setEventStates(prev => ({
      ...prev,
      [newEventId]: true
    }));

    // Close modal and navigate to the NEW event
    setIsCreateModalOpen(false);
    console.log('Navigating to new event:', newEventId);
    navigate(`/event/${newEventId}/setup`);
  };
  const handleCopyLink = (eventId: string, url: string) => {
    navigator.clipboard.writeText(`https://cal.id${url}`);
    setCopiedLink(eventId);
    setTimeout(() => setCopiedLink(null), 1500);
  };
  const handleCopyPublicLink = () => {
    const publicUrl = selectedTeam === 'personal' ? 'https://cal.id/sanskar' : `https://cal.id/${currentTeam.url}`;
    navigator.clipboard.writeText(publicUrl);
    setCopiedPublicLink(true);
    setTimeout(() => setCopiedPublicLink(false), 1500);
  };
  const handleToggleEvent = (eventId: string, checked: boolean) => {
    setEventStates(prev => ({
      ...prev,
      [eventId]: checked
    }));
  };
  const handleArrowClick = (eventId: string, direction: 'up' | 'down') => {
    const eventIndex = filteredEvents.findIndex(e => e.id === eventId);
    if (direction === 'up' && eventIndex > 0) {
      const newEvents = [...filteredEvents];
      [newEvents[eventIndex], newEvents[eventIndex - 1]] = [newEvents[eventIndex - 1], newEvents[eventIndex]];
      setTeamEvents(prevTeams => prevTeams.map(team => team.id === selectedTeam ? {
        ...team,
        eventTypes: newEvents
      } : team));
    } else if (direction === 'down' && eventIndex < filteredEvents.length - 1) {
      const newEvents = [...filteredEvents];
      [newEvents[eventIndex], newEvents[eventIndex + 1]] = [newEvents[eventIndex + 1], newEvents[eventIndex]];
      setTeamEvents(prevTeams => prevTeams.map(team => team.id === selectedTeam ? {
        ...team,
        eventTypes: newEvents
      } : team));
    }
  };
  const handleMenuAction = (action: string, eventId: string) => {
    setShowMoreOptions(null);
    switch (action) {
      case 'edit':
        handleEventClick(eventId);
        break;
      case 'duplicate':
        console.log('Duplicating event', eventId);
        break;
      case 'embed':
        console.log('Embed event', eventId);
        break;
      case 'delete':
        setTeamEvents(prevTeams => prevTeams.map(team => team.id === selectedTeam ? {
          ...team,
          eventTypes: team.eventTypes.filter(e => e.id !== eventId)
        } : team));
        break;
    }
  };
  return <div className="px-6 pt-3 pb-6 space-y-4 w-full max-w-full">
      {/* Team Selector */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4 flex-1 min-w-0 rounded-md">
          <div className="flex items-center bg-muted/50 rounded-lg p-1 flex-shrink-0">
            <button onClick={() => setSelectedTeam('personal')} className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap ${selectedTeam === 'personal' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
              <div className={`h-5 w-5 rounded-full flex items-center justify-center text-xs font-medium mr-2 ${selectedTeam === 'personal' ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/20'}`}>
                {teamEvents[0].avatar}
              </div>
              <span className="truncate">Sanskar Yadav</span>
            </button>
          </div>
          
          <div className="w-px h-5 bg-border flex-shrink-0"></div>
          
          <div className="flex space-x-2 flex-1 overflow-x-auto scrollbar-none">
            {teamEvents.slice(1).map(team => <button key={team.id} onClick={() => setSelectedTeam(team.id)} className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-all flex-shrink-0 min-w-fit ${selectedTeam === team.id ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
                <div className={`h-5 w-5 rounded-full flex items-center justify-center text-xs font-medium mr-2 ${selectedTeam === team.id ? 'bg-primary-foreground text-primary' : 'bg-muted-foreground/20'}`}>
                  {team.avatar}
                </div>
                <span className="truncate">{team.name}</span>
              </button>)}
          </div>
        </div>
      </div>

      {/* Search Bar and New Button */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Search events..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-sm" />
          </div>
          
          <div className="relative">
            <button onClick={handleCopyPublicLink} className="flex items-center space-x-2 px-3 py-1.5 bg-muted/70 text-muted-foreground text-sm rounded-md hover:bg-muted transition-colors">
              <span className="text-sm">
                {selectedTeam === 'personal' ? 'cal.id/sanskar' : `cal.id/${currentTeam.url}`}
              </span>
              <Copy className="h-4 w-4" />
            </button>
            {copiedPublicLink && <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-foreground text-background text-xs rounded animate-fade-in whitespace-nowrap">
                Copied
              </div>}
          </div>
        </div>
        
        <div className="relative">
          <button onClick={() => setShowNewDropdown(!showNewDropdown)} className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            New
          </button>
          
          {showNewDropdown && <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-lg animate-scale-in z-10">
              <div className="py-1">
                {teamEvents.map(team => <button key={team.id} onClick={() => {
              console.log('Selected team for new event:', team.id);
              setSelectedTeam(team.id);
              setIsCreateModalOpen(true);
              setShowNewDropdown(false);
            }} className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors flex items-center">
                    <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-xs font-medium mr-2">
                      {team.avatar}
                    </div>
                    {team.name}
                  </button>)}
              </div>
            </div>}
        </div>
      </div>

      {/* Event Types List */}
      <div className="space-y-2">
        {filteredEvents.map(event => {
        const isEventActive = eventStates[event.id] ?? event.isActive;
        return <div key={event.id} className="relative group animate-fade-in" onMouseEnter={() => setHoveredEvent(event.id)} onMouseLeave={() => setHoveredEvent(null)}>
              {/* Move buttons - Fixed positioning to be half on tile, half outside */}
              {hoveredEvent === event.id && <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 flex flex-col space-y-1 z-10 animate-scale-in">
                  <button onClick={e => {
              e.stopPropagation();
              handleArrowClick(event.id, 'up');
            }} className="p-1.5 bg-background border border-border rounded-lg hover:bg-muted shadow-md transition-all transform hover:scale-105">
                    <ArrowUp className="h-3 w-3 text-muted-foreground" />
                  </button>
                  <button onClick={e => {
              e.stopPropagation();
              handleArrowClick(event.id, 'down');
            }} className="p-1.5 bg-background border border-border rounded-lg hover:bg-muted shadow-md transition-all transform hover:scale-105">
                    <ArrowDown className="h-3 w-3 text-muted-foreground" />
                  </button>
                </div>}

              <div onClick={() => handleEventClick(event.id)} className={`bg-card border border-border rounded-lg p-4 hover:border-border/60 transition-all hover:shadow-sm cursor-pointer ${!isEventActive ? 'opacity-50' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-2 space-x-3">
                      <h3 className="font-semibold text-foreground text-base">
                        {event.title}
                      </h3>
                      <div className="relative">
                        <button onClick={e => {
                      e.stopPropagation();
                      handleCopyLink(event.id, event.url);
                    }} className="flex items-center space-x-2 px-2 py-1 bg-muted/70 text-muted-foreground text-sm rounded hover:bg-muted transition-colors">
                          <Copy className="h-3 w-3" />
                          <span className="text-sm">Copy</span>
                        </button>
                        {copiedLink === event.id && <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-foreground text-background text-xs rounded animate-fade-in whitespace-nowrap">
                            Copied
                          </div>}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{event.description}</p>
                    <div className="flex items-center">
                      {event.durations?.map(duration => <span key={duration} className="inline-flex items-center px-2 py-1 bg-muted text-foreground text-sm rounded mr-2">
                          {duration}m
                        </span>)}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4" onClick={e => e.stopPropagation()}>
                    <Switch checked={isEventActive} onCheckedChange={checked => handleToggleEvent(event.id, checked)} />
                    <button className="p-1.5 hover:bg-muted rounded-md transition-colors">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <div className="relative">
                      <button onClick={() => setShowMoreOptions(showMoreOptions === event.id ? null : event.id)} className="p-1.5 hover:bg-muted rounded-md transition-colors">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </button>
                      
                      {showMoreOptions === event.id && <div className="absolute right-0 top-full mt-1 w-40 bg-popover border border-border rounded-lg shadow-lg animate-scale-in z-10">
                          <div className="py-1">
                            <button onClick={() => handleMenuAction('edit', event.id)} className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </button>
                            <button onClick={() => handleMenuAction('duplicate', event.id)} className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors">
                              <CopyIcon className="h-4 w-4 mr-2" />
                              Duplicate
                            </button>
                            <button onClick={() => handleMenuAction('embed', event.id)} className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors">
                              <Code className="h-4 w-4 mr-2" />
                              Embed
                            </button>
                            <button onClick={() => handleMenuAction('delete', event.id)} className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </button>
                          </div>
                        </div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>;
      })}
      </div>

      <CreateEventModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} teams={teamEvents} selectedTeam={selectedTeam} onCreateEvent={handleCreateEvent} />
    </div>;
};