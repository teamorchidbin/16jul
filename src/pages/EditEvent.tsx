import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Eye, Settings, Clock, Zap, Shield, Smartphone, Workflow, Webhook, RotateCcw } from 'lucide-react';
import { EventSetup } from '../components/EventSetup';
import { EventAvailability } from '../components/EventAvailability';
import { EventLimits } from '../components/EventLimits';
import { EventAdvanced } from '../components/EventAdvanced';
import { EventApps } from '../components/EventApps';
import { EventWorkflows } from '../components/EventWorkflows';
import { EventWebhooks } from '../components/EventWebhooks';
import { RecurringEvent } from '../components/RecurringEvent';
import { Switch } from '../components/ui/switch';
import { mockTeams } from '../data/mockData';

const tabs = [{
  id: 'setup',
  name: 'Event Setup',
  icon: Settings
}, {
  id: 'availability',
  name: 'Availability',
  icon: Clock
}, {
  id: 'limits',
  name: 'Limits',
  icon: Shield
}, {
  id: 'advanced',
  name: 'Advanced',
  icon: Zap
}, {
  id: 'recurring',
  name: 'Recurring',
  icon: RotateCcw
}, {
  id: 'apps',
  name: 'Apps',
  icon: Smartphone
}, {
  id: 'workflows',
  name: 'Workflows',
  icon: Workflow
}, {
  id: 'webhooks',
  name: 'Webhooks',
  icon: Webhook
}];

export const EditEvent = () => {
  const {
    eventId,
    tab
  } = useParams();
  const [activeTab, setActiveTab] = useState(tab || 'setup');
  const [eventEnabled, setEventEnabled] = useState(true);
  const navigate = useNavigate();

  // Find the actual event from mockData using the eventId from URL
  const currentEvent = mockTeams.flatMap(team => team.eventTypes).find(event => event.id === eventId);
  const handleBack = () => {
    navigate('/');
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case 'setup':
        return <EventSetup />;
      case 'availability':
        return <EventAvailability />;
      case 'limits':
        return <EventLimits />;
      case 'advanced':
        return <EventAdvanced />;
      case 'recurring':
        return <RecurringEvent />;
      case 'apps':
        return <EventApps />;
      case 'workflows':
        return <EventWorkflows />;
      case 'webhooks':
        return <EventWebhooks />;
      default:
        return <EventSetup />;
    }
  };
  return <div className="min-h-screen bg-background">
      {/* Non-sticky Header matching EventTypes page */}
      <div className="bg-background border-b border-border px-6 py-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Event Types</h1>
          <p className="text-muted-foreground">Create events to share for people to book on your calendar.</p>
        </div>
      </div>

      {/* Event Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <button onClick={handleBack} className="mr-3 p-1.5 hover:bg-muted rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            </button>
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <h1 className="text-xl font-semibold text-foreground">
                  {currentEvent?.title || 'Event Not Found'}
                </h1>
                <div className="flex items-center space-x-2 px-2 py-1 bg-muted/70 text-muted-foreground text-sm rounded-md">
                  <span>cal.id/sanskar/{currentEvent?.url?.split('/').pop() || 'unknown'}</span>
                  <Copy className="h-3 w-3" />
                </div>
                <button className="text-sm text-primary hover:text-primary/80 flex items-center transition-colors">
                  <Eye className="h-4 w-4 mr-1" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Switch checked={eventEnabled} onCheckedChange={setEventEnabled} />
              <span className="text-sm text-muted-foreground">
                {eventEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full">
        {/* Sidebar */}
        <div className="w-56 bg-card border-r border-border min-h-screen sticky top-0">
          <nav className="p-4 space-y-1">
            {tabs.map(tabItem => (
              <button
                key={tabItem.id}
                onClick={() => setActiveTab(tabItem.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tabItem.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <tabItem.icon className="mr-2 h-4 w-4" />
                {tabItem.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-background">
          {renderTabContent()}
        </div>
      </div>
    </div>;
};
