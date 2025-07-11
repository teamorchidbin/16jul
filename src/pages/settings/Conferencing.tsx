
import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Plus, Settings, ExternalLink } from 'lucide-react';

export const Conferencing = () => {
  const [conferencingApps] = useState([
    {
      id: 1,
      name: 'Zoom',
      description: 'Video conferencing',
      icon: '📹',
      color: 'bg-blue-500',
      installed: true
    },
    {
      id: 2,
      name: 'Google Meet',
      description: 'Video conferencing',
      icon: '🎥',
      color: 'bg-green-500',
      installed: false
    },
    {
      id: 3,
      name: 'Microsoft Teams',
      description: 'Video conferencing',
      icon: '💼',
      color: 'bg-purple-500',
      installed: false
    }
  ]);

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="p-8 max-w-4xl w-full">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold mb-2">Conferencing</h1>
          <p className="text-muted-foreground">Configure your video conferencing settings</p>
        </div>

        <div className="space-y-8">
          {/* Conferencing Apps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conferencingApps.map((app) => (
              <div key={app.id} className="border rounded-lg p-6 hover:border-primary/50 transition-colors">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 ${app.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                    {app.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{app.name}</h3>
                    <p className="text-sm text-muted-foreground">{app.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  {app.installed ? (
                    <span className="text-sm text-green-600 font-medium">Installed</span>
                  ) : (
                    <span className="text-sm text-muted-foreground">Not installed</span>
                  )}
                  
                  {app.installed ? (
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Install
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Vertical dotted line */}
          <div className="flex justify-center my-8">
            <div className="w-px h-16 border-l-2 border-dotted border-gray-300"></div>
          </div>

          {/* Add New App Button */}
          <div className="text-center">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add a new app
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
