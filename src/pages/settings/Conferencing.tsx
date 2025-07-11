
import React from 'react';
import { Button } from '../../components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { MoreHorizontal, Plus, Video, Settings, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Conferencing = () => {
  const navigate = useNavigate();

  const conferencingApps = [
    {
      name: 'Facetime',
      description: 'Facetime makes it super simple for collaborating teams to jump on a video call.',
      icon: '📹',
      color: 'bg-green-500'
    },
    {
      name: 'Google Meet',
      description: 'Google Meet is Google\'s web-based video conferencing platform, designed to comp...',
      icon: '🔗',
      color: 'bg-blue-500',
      isDefault: true
    },
    {
      name: 'Jitsi Video',
      description: 'Jitsi is a free open-source video conferencing software for web and mobile. Make a ...',
      icon: '🔗',
      color: 'bg-gray-500'
    }
  ];

  const handleAddApp = () => {
    navigate('/apps');
  };

  const handleSetDefault = (appName: string) => {
    console.log(`Setting ${appName} as default`);
  };

  const handleRemoveApp = (appName: string) => {
    console.log(`Removing ${appName}`);
  };

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="p-8 max-w-4xl w-full">
        <div className="mb-8 text-center flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Conferencing</h1>
            <p className="text-muted-foreground">Add your favourite video conferencing apps for your meetings</p>
          </div>
          <Button onClick={handleAddApp} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>

        <div className="space-y-4">
          {conferencingApps.map((app, index) => (
            <div key={index} className="border rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${app.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                    {app.icon === '📹' ? <Video className="h-6 w-6" /> : app.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium">{app.name}</h3>
                      {app.isDefault && (
                        <span className="text-xs bg-muted px-2 py-1 rounded">Default</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{app.description}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleSetDefault(app.name)}>
                      <Settings className="h-4 w-4 mr-2" />
                      Set as default
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleRemoveApp(app.name)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove app
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
