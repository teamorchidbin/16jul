import React, { useState, useRef, useEffect } from 'react';
import { Plus, MoreHorizontal, ExternalLink, Edit, Copy as CopyIcon, Code, Trash2, ArrowUp, ArrowDown, Search, Copy } from 'lucide-react';
import { CreateEventModal } from '../components/CreateEventModal';
import { useNavigate } from 'react-router-dom';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';

interface EventType {
  id: string;
  title: string;
  description: string;
  url: string;
  durations: number[];
  bookingsToday: number;
  isActive: boolean;
}

interface Team {
  id: string;
  name: string;
  url: string;
  avatar: string;
  eventTypes: EventType[];
}

const defaultTeams: Team[] = [
  {
    id: 'meta',
    name: 'Meta',
    url: 'meta',
    avatar: 'M',
    eventTypes: [
      { id: 'meta-1', title: 'Product Strategy Session', description: 'Deep dive into product roadmap and strategic initiatives', url: '/meta/product-strategy', durations: [60], bookingsToday: 2, isActive: true },
      { id: 'meta-2', title: 'Engineering Sync', description: 'Weekly engineering team alignment meeting', url: '/meta/engineering-sync', durations: [30], bookingsToday: 5, isActive: true },
      { id: 'meta-3', title: 'Design Review', description: 'Review and feedback session for design concepts', url: '/meta/design-review', durations: [45], bookingsToday: 3, isActive: true },
      { id: 'meta-4', title: 'User Research Interview', description: 'One-on-one user research and feedback session', url: '/meta/user-research', durations: [30, 60], bookingsToday: 4, isActive: true },
      { id: 'meta-5', title: 'Technical Architecture Review', description: 'System design and architecture discussion', url: '/meta/tech-review', durations: [90], bookingsToday: 1, isActive: true },
      { id: 'meta-6', title: 'Marketing Campaign Planning', description: 'Strategic planning for upcoming campaigns', url: '/meta/marketing-planning', durations: [60], bookingsToday: 2, isActive: true },
      { id: 'meta-7', title: 'Data Analysis Workshop', description: 'Collaborative data analysis and insights session', url: '/meta/data-workshop', durations: [120], bookingsToday: 1, isActive: true },
      { id: 'meta-8', title: 'Partnership Discussion', description: 'Explore potential partnership opportunities', url: '/meta/partnership', durations: [45], bookingsToday: 3, isActive: true },
      { id: 'meta-9', title: 'Performance Review', description: 'Individual performance evaluation meeting', url: '/meta/performance-review', durations: [60], bookingsToday: 2, isActive: true },
      { id: 'meta-10', title: 'Innovation Brainstorm', description: 'Creative ideation and innovation session', url: '/meta/innovation', durations: [90], bookingsToday: 1, isActive: true }
    ]
  },
  {
    id: 'google',
    name: 'Google',
    url: 'google',
    avatar: 'G',
    eventTypes: [
      { id: 'google-1', title: 'Technical Interview', description: 'Software engineering technical assessment', url: '/google/tech-interview', durations: [60, 90], bookingsToday: 8, isActive: true },
      { id: 'google-2', title: 'Code Review Session', description: 'Collaborative code review and improvement', url: '/google/code-review', durations: [45], bookingsToday: 12, isActive: true },
      { id: 'google-3', title: 'System Design Discussion', description: 'Large-scale system architecture planning', url: '/google/system-design', durations: [90, 120], bookingsToday: 4, isActive: true },
      { id: 'google-4', title: 'Product Launch Meeting', description: 'Coordination for upcoming product launches', url: '/google/product-launch', durations: [60], bookingsToday: 6, isActive: true },
      { id: 'google-5', title: 'Research Collaboration', description: 'Academic and industry research partnership', url: '/google/research-collab', durations: [120], bookingsToday: 2, isActive: true },
      { id: 'google-6', title: 'AI/ML Model Review', description: 'Machine learning model evaluation session', url: '/google/ml-review', durations: [75], bookingsToday: 5, isActive: true },
      { id: 'google-7', title: 'Cloud Architecture Consulting', description: 'Google Cloud platform consultation', url: '/google/cloud-consulting', durations: [60, 90], bookingsToday: 7, isActive: true },
      { id: 'google-8', title: 'Developer Relations Meetup', description: 'Community engagement and developer support', url: '/google/devrel-meetup', durations: [30], bookingsToday: 15, isActive: true },
      { id: 'google-9', title: 'Security Audit Review', description: 'Security assessment and vulnerability discussion', url: '/google/security-audit', durations: [90], bookingsToday: 3, isActive: true },
      { id: 'google-10', title: 'Accessibility Standards Review', description: 'Ensuring inclusive design and accessibility', url: '/google/accessibility-review', durations: [45], bookingsToday: 4, isActive: true }
    ]
  },
  {
    id: 'tesla',
    name: 'Tesla',
    url: 'tesla',
    avatar: 'T',
    eventTypes: [
      { id: 'tesla-1', title: 'Vehicle Engineering Review', description: 'Automotive engineering and design discussion', url: '/tesla/vehicle-engineering', durations: [90], bookingsToday: 3, isActive: true },
      { id: 'tesla-2', title: 'Battery Technology Session', description: 'Advanced battery technology development meeting', url: '/tesla/battery-tech', durations: [60, 120], bookingsToday: 4, isActive: true },
      { id: 'tesla-3', title: 'Autopilot Development Sync', description: 'Autonomous driving technology coordination', url: '/tesla/autopilot-sync', durations: [75], bookingsToday: 6, isActive: true },
      { id: 'tesla-4', title: 'Manufacturing Process Review', description: 'Production line optimization and efficiency', url: '/tesla/manufacturing-review', durations: [60], bookingsToday: 5, isActive: true },
      { id: 'tesla-5', title: 'Sustainability Initiative Planning', description: 'Environmental impact and sustainability projects', url: '/tesla/sustainability', durations: [45], bookingsToday: 2, isActive: true },
      { id: 'tesla-6', title: 'Charging Infrastructure Meeting', description: 'Supercharger network expansion planning', url: '/tesla/charging-infra', durations: [60], bookingsToday: 3, isActive: true },
      { id: 'tesla-7', title: 'Software Update Planning', description: 'Over-the-air update development coordination', url: '/tesla/software-update', durations: [45], bookingsToday: 8, isActive: true },
      { id: 'tesla-8', title: 'Supply Chain Optimization', description: 'Logistics and supply chain efficiency meeting', url: '/tesla/supply-chain', durations: [90], bookingsToday: 2, isActive: true },
      { id: 'tesla-9', title: 'Quality Assurance Review', description: 'Product quality and testing standards discussion', url: '/tesla/qa-review', durations: [60], bookingsToday: 4, isActive: true },
      { id: 'tesla-10', title: 'Energy Solutions Consultation', description: 'Solar and energy storage project planning', url: '/tesla/energy-solutions', durations: [75], bookingsToday: 3, isActive: true }
    ]
  },
  {
    id: 'onehash',
    name: 'OneHash',
    url: 'onehash',
    avatar: 'O',
    eventTypes: [
      { id: 'onehash-1', title: 'SaaS Product Demo', description: 'Comprehensive product demonstration session', url: '/onehash/product-demo', durations: [30, 45], bookingsToday: 12, isActive: true },
      { id: 'onehash-2', title: 'Customer Onboarding', description: 'New customer setup and configuration', url: '/onehash/customer-onboarding', durations: [60], bookingsToday: 8, isActive: true },
      { id: 'onehash-3', title: 'Technical Integration Support', description: 'API integration and technical assistance', url: '/onehash/tech-support', durations: [45, 90], bookingsToday: 6, isActive: true },
      { id: 'onehash-4', title: 'Business Consultation', description: 'Strategic business process optimization', url: '/onehash/business-consultation', durations: [60], bookingsToday: 5, isActive: true },
      { id: 'onehash-5', title: 'Feature Request Discussion', description: 'Customer feedback and feature planning session', url: '/onehash/feature-request', durations: [30], bookingsToday: 10, isActive: true },
      { id: 'onehash-6', title: 'Training Workshop', description: 'User training and best practices session', url: '/onehash/training-workshop', durations: [90, 120], bookingsToday: 4, isActive: true },
      { id: 'onehash-7', title: 'Account Review Meeting', description: 'Quarterly account performance and growth review', url: '/onehash/account-review', durations: [45], bookingsToday: 3, isActive: true },
      { id: 'onehash-8', title: 'Enterprise Sales Consultation', description: 'Large-scale deployment and pricing discussion', url: '/onehash/enterprise-sales', durations: [60, 90], bookingsToday: 4, isActive: true },
      { id: 'onehash-9', title: 'Support Escalation Review', description: 'Critical issue resolution and follow-up', url: '/onehash/support-escalation', durations: [30], bookingsToday: 7, isActive: true },
      { id: 'onehash-10', title: 'Partnership Integration', description: 'Third-party integration and partnership setup', url: '/onehash/partnership-integration', durations: [75], bookingsToday: 2, isActive: true }
    ]
  }
];

export const EventTypes = () => {
  const [selectedTeam, setSelectedTeam] = useState('personal');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showNewDropdown, setShowNewDropdown] = useState(false);
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);
  const [showMoreOptions, setShowMoreOptions] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [copiedPublicLink, setCopiedPublicLink] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [eventStates, setEventStates] = useState<{ [key: string]: boolean }>({});
  const [teamEvents, setTeamEvents] = useState<Team[]>([]);
  const navigate = useNavigate();

  // Initialize teams with default teams and load from localStorage
  useEffect(() => {
    const personalTeam = {
      id: 'personal',
      name: 'Sanskar Yadav',
      url: 'sanskar',
      avatar: 'S',
      eventTypes: [
        { id: 'personal-1', title: '15 Minute Consultation', description: 'Quick consultation for urgent matters', url: '/sanskar/15min-consultation', durations: [15], bookingsToday: 8, isActive: true },
        { id: 'personal-2', title: '30 Minute Strategy Call', description: 'Strategic planning and discussion session', url: '/sanskar/30min-strategy', durations: [30], bookingsToday: 12, isActive: true },
        { id: 'personal-3', title: '1 Hour Deep Dive', description: 'Comprehensive analysis and problem-solving session', url: '/sanskar/1hour-deepdive', durations: [60], bookingsToday: 5, isActive: true },
        { id: 'personal-4', title: 'Coffee Chat', description: 'Informal networking and relationship building', url: '/sanskar/coffee-chat', durations: [30], bookingsToday: 15, isActive: true },
        { id: 'personal-5', title: 'Mentorship Session', description: 'Career guidance and professional development', url: '/sanskar/mentorship', durations: [45], bookingsToday: 7, isActive: true },
        { id: 'personal-6', title: 'Project Review', description: 'Project progress evaluation and feedback', url: '/sanskar/project-review', durations: [60, 90], bookingsToday: 4, isActive: true },
        { id: 'personal-7', title: 'Investment Pitch', description: 'Startup pitch and investment discussion', url: '/sanskar/investment-pitch', durations: [45], bookingsToday: 3, isActive: true },
        { id: 'personal-8', title: 'Technical Advisory', description: 'Technology consulting and advisory session', url: '/sanskar/tech-advisory', durations: [60], bookingsToday: 6, isActive: true },
        { id: 'personal-9', title: 'Board Meeting Prep', description: 'Preparation for board presentations', url: '/sanskar/board-prep', durations: [90], bookingsToday: 2, isActive: true },
        { id: 'personal-10', title: 'Industry Insights Discussion', description: 'Market trends and industry analysis', url: '/sanskar/industry-insights', durations: [45], bookingsToday: 9, isActive: true }
      ]
    };

    // Save default teams to localStorage if not already present
    const savedTeams = localStorage.getItem('teams');
    if (!savedTeams) {
      localStorage.setItem('teams', JSON.stringify(defaultTeams));
      window.dispatchEvent(new Event('teamsUpdated'));
    }

    const parsedTeams = savedTeams ? JSON.parse(savedTeams) : defaultTeams;
    setTeamEvents([personalTeam, ...parsedTeams]);

    const handleTeamsUpdate = () => {
      const updatedSavedTeams = localStorage.getItem('teams');
      const updatedParsedTeams = updatedSavedTeams ? JSON.parse(updatedSavedTeams) : defaultTeams;
      setTeamEvents([personalTeam, ...updatedParsedTeams]);
    };

    window.addEventListener('teamsUpdated', handleTeamsUpdate);
    return () => {
      window.removeEventListener('teamsUpdated', handleTeamsUpdate);
    };
  }, []);

  const currentTeam = teamEvents.find(t => t.id === selectedTeam) || teamEvents[0];
  const filteredEvents = currentTeam?.eventTypes?.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  useEffect(() => {
    const initialStates: { [key: string]: boolean } = {};
    teamEvents.forEach(team => {
      team.eventTypes?.forEach(event => {
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

    setTeamEvents(prevTeams => {
      const updatedTeams = prevTeams.map(team => 
        team.id === selectedTeam 
          ? { ...team, eventTypes: [...(team.eventTypes || []), newEvent] }
          : team
      );
      
      if (selectedTeam !== 'personal') {
        const teamsToSave = updatedTeams.slice(1);
        localStorage.setItem('teams', JSON.stringify(teamsToSave));
        window.dispatchEvent(new Event('teamsUpdated'));
      }
      
      return updatedTeams;
    });

    setEventStates(prev => ({ ...prev, [newEventId]: true }));
    setIsCreateModalOpen(false);
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
    setEventStates(prev => ({ ...prev, [eventId]: checked }));
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
        setTeamEvents(prevTeams => prevTeams.map(team => 
          team.id === selectedTeam 
            ? { ...team, eventTypes: team.eventTypes.filter(e => e.id !== eventId) }
            : team
        ));
        break;
    }
  };

  if (!teamEvents.length) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="px-6 pt-3 pb-6 space-y-4 w-full max-w-full">
      {/* Team Tabs */}
      <Tabs value={selectedTeam} onValueChange={setSelectedTeam} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="meta">Meta</TabsTrigger>
          <TabsTrigger value="google">Google</TabsTrigger>
          <TabsTrigger value="tesla">Tesla</TabsTrigger>
          <TabsTrigger value="onehash">OneHash</TabsTrigger>
        </TabsList>

        {/* Search Bar and New Button */}
        <div className="flex items-center justify-between space-x-4 mt-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search events..." 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-sm" 
              />
            </div>
            
            <div className="relative">
              <button 
                onClick={handleCopyPublicLink} 
                className="flex items-center space-x-2 px-3 py-1.5 bg-muted/70 text-muted-foreground text-sm rounded-md hover:bg-muted transition-colors"
                title="Copy Public Link"
              >
                <span className="text-sm">
                  {selectedTeam === 'personal' ? 'cal.id/sanskar' : `cal.id/${currentTeam?.url}`}
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
          
          <div className="relative">
            <button 
              onClick={() => setShowNewDropdown(!showNewDropdown)} 
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              New
            </button>
            
            {showNewDropdown && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-lg animate-scale-in z-10">
                <div className="py-1">
                  {teamEvents.map(team => (
                    <button 
                      key={team.id} 
                      onClick={() => {
                        setSelectedTeam(team.id);
                        setIsCreateModalOpen(true);
                        setShowNewDropdown(false);
                      }} 
                      className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors flex items-center"
                    >
                      <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-xs font-medium mr-2">
                        {team.avatar}
                      </div>
                      {team.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Event Types List for each team */}
        {teamEvents.map(team => (
          <TabsContent key={team.id} value={team.id} className="space-y-2 mt-6">
            {team.eventTypes?.filter(event => 
              event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
              event.description.toLowerCase().includes(searchQuery.toLowerCase())
            ).map(event => {
              const isEventActive = eventStates[event.id] ?? event.isActive;
              return (
                <div 
                  key={event.id} 
                  className="relative group animate-fade-in" 
                  onMouseEnter={() => setHoveredEvent(event.id)} 
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  <div 
                    onClick={() => handleEventClick(event.id)} 
                    className={`bg-card border border-border rounded-lg p-4 hover:border-border/60 transition-all hover:shadow-sm cursor-pointer ${
                      !isEventActive ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center mb-2 space-x-3">
                          <h3 className="font-semibold text-foreground text-base">
                            {event.title}
                          </h3>
                          <div className="flex items-center space-x-2" onClick={e => e.stopPropagation()}>
                            <Switch 
                              checked={isEventActive} 
                              onCheckedChange={checked => handleToggleEvent(event.id, checked)} 
                            />
                          </div>
                          <div className="relative">
                            <button 
                              onClick={e => {
                                e.stopPropagation();
                                handleCopyLink(event.id, event.url);
                              }} 
                              className="flex items-center space-x-2 px-2 py-1 bg-muted/70 text-muted-foreground text-sm rounded hover:bg-muted transition-colors"
                              title="Copy Link"
                            >
                              <Copy className="h-3 w-3" />
                              <span className="text-sm">Copy</span>
                            </button>
                            {copiedLink === event.id && (
                              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-foreground text-background text-xs rounded animate-fade-in whitespace-nowrap">
                                Copied
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{event.description}</p>
                        <div className="flex items-center">
                          {event.durations?.map(duration => (
                            <span key={duration} className="inline-flex items-center px-2 py-1 bg-muted text-foreground text-sm rounded mr-2">
                              {duration}m
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4" onClick={e => e.stopPropagation()}>
                        <button 
                          className="p-1.5 hover:bg-muted rounded-md transition-colors"
                          title="Preview"
                        >
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </button>
                        <div className="relative">
                          <button 
                            onClick={() => setShowMoreOptions(showMoreOptions === event.id ? null : event.id)} 
                            className="p-1.5 hover:bg-muted rounded-md transition-colors"
                            title="More Options"
                          >
                            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                          </button>
                          
                          {showMoreOptions === event.id && (
                            <div className="absolute right-0 top-full mt-1 w-40 bg-popover border border-border rounded-lg shadow-lg animate-scale-in z-10">
                              <div className="py-1">
                                <button 
                                  onClick={() => handleMenuAction('edit', event.id)} 
                                  className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                                  title="Edit"
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </button>
                                <button 
                                  onClick={() => handleMenuAction('duplicate', event.id)} 
                                  className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                                  title="Duplicate"
                                >
                                  <CopyIcon className="h-4 w-4 mr-2" />
                                  Duplicate
                                </button>
                                <button 
                                  onClick={() => handleMenuAction('embed', event.id)} 
                                  className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                                  title="Embed"
                                >
                                  <Code className="h-4 w-4 mr-2" />
                                  Embed
                                </button>
                                <button 
                                  onClick={() => handleMenuAction('delete', event.id)} 
                                  className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors text-destructive"
                                  title="Delete"
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
          </TabsContent>
        ))}
      </Tabs>

      <CreateEventModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        teams={teamEvents} 
        selectedTeam={selectedTeam} 
        onCreateEvent={handleCreateEvent} 
      />
    </div>
  );
};
