
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Clock, Shield, Zap, RotateCcw, Smartphone, Workflow, Webhook } from 'lucide-react';
import { EventSetup } from '../components/EventSetup';
import { EventAvailability } from '../components/EventAvailability';
import { EventLimits } from '../components/EventLimits';
import { EventAdvanced } from '../components/EventAdvanced';
import { EventApps } from '../components/EventApps';
import { EventWorkflows } from '../components/EventWorkflows';
import { EventWebhooks } from '../components/EventWebhooks';
import { RecurringEvent } from '../components/RecurringEvent';
import { Header } from '../components/Header';
import { mockTeams } from '../data/mockData';

const tabs = [
  { id: 'setup', name: 'Event Setup', icon: Settings },
  { id: 'availability', name: 'Availability', icon: Clock },
  { id: 'limits', name: 'Limits', icon: Shield },
  { id: 'advanced', name: 'Advanced', icon: Zap },
  { id: 'recurring', name: 'Recurring', icon: RotateCcw },
  { id: 'apps', name: 'Apps', icon: Smartphone },
  { id: 'workflows', name: 'Workflows', icon: Workflow },
  { id: 'webhooks', name: 'Webhooks', icon: Webhook },
];

export const EditEvent = () => {
  const { eventId, tab } = useParams();
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

  return (
    <div className="min-h-screen bg-background">
      <Header 
        eventData={{
          title: currentEvent?.title || 'Event Not Found',
          url: currentEvent?.url?.split('/').pop() || 'unknown',
          enabled: eventEnabled,
          onEnabledChange: setEventEnabled
        }}
      />

      <div className="flex w-full">
        {/* Sidebar */}
        <div className="w-56 bg-card border-r border-border min-h-screen sticky top-0">
          <div className="p-4">
            <button 
              onClick={handleBack} 
              className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Event Types
            </button>
          </div>
          <nav className="px-4 pb-4 space-y-1">
            {tabs.map((tabItem) => (
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
    </div>
  );
};
