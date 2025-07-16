
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';

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

  const currentEvent = mockTeams.flatMap(team => team.eventTypes).find(event => event.id === eventId);

  const handleBack = () => {
    navigate('/event-types');
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

      <div className="w-full">
        {/* Back button and Event Title */}
        <div className="px-8 py-4 bg-background">
          <button 
            onClick={handleBack} 
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Event Types
          </button>
          <h1 className="text-2xl font-bold text-foreground">{currentEvent?.title || 'Event Not Found'}</h1>
        </div>

        {/* Horizontal Tabs */}
        <div className="px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-8 mb-6">
              {tabs.map((tabItem) => (
                <TabsTrigger 
                  key={tabItem.id} 
                  value={tabItem.id} 
                  className="flex items-center space-x-2"
                >
                  <tabItem.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tabItem.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tab Content */}
            {tabs.map((tabItem) => (
              <TabsContent key={tabItem.id} value={tabItem.id}>
                {renderTabContent()}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};
