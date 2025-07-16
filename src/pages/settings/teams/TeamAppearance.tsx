
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Switch } from '../../../components/ui/switch';
import { Label } from '../../../components/ui/label';
import { Separator } from '../../../components/ui/separator';

export const TeamAppearance = () => {
  const { teamId } = useParams();
  const [selectedTheme, setSelectedTheme] = useState('system');
  const [customBrandColors, setCustomBrandColors] = useState(false);
  const [lightPrimary, setLightPrimary] = useState('#3b82f6');
  const [lightSecondary, setLightSecondary] = useState('#64748b');
  const [darkPrimary, setDarkPrimary] = useState('#60a5fa');
  const [darkSecondary, setDarkSecondary] = useState('#94a3b8');

  const handleSave = () => {
    console.log('Saving appearance settings');
  };

  const themeOptions = [
    { id: 'system', name: 'System default', description: 'Follows your device settings' },
    { id: 'light', name: 'Light', description: 'Light theme for booking pages' },
    { id: 'dark', name: 'Dark', description: 'Dark theme for booking pages' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Team Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize how your team's booking pages look
        </p>
      </div>

      <Separator />

      {/* Booking Page Theme */}
      <div className="space-y-4">
        <div>
          <h4 className="text-base font-medium">Booking page theme</h4>
          <p className="text-sm text-muted-foreground">This only applies to your public booking pages</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {themeOptions.map((theme) => (
            <div
              key={theme.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedTheme === theme.id ? 'border-primary bg-primary/5' : ''
              }`}
              onClick={() => setSelectedTheme(theme.id)}
            >
              <div className="aspect-video bg-muted rounded mb-2 flex items-center justify-center">
                <div className={`w-12 h-8 rounded ${
                  theme.id === 'dark' ? 'bg-gray-800' : 
                  theme.id === 'light' ? 'bg-white border' : 
                  'bg-gradient-to-r from-white to-gray-800'
                }`}></div>
              </div>
              <h4 className="font-medium text-center text-sm">{theme.name}</h4>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end">
          <Button variant="outline" size="sm">Update</Button>
        </div>
      </div>

      <Separator />

      {/* Custom Brand Colors */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-base font-medium">Custom brand colors</h4>
            <p className="text-sm text-muted-foreground">Customize your own brand colour into your booking page.</p>
          </div>
          <Switch
            checked={customBrandColors}
            onCheckedChange={setCustomBrandColors}
          />
        </div>

        {customBrandColors && (
          <div className="space-y-6 p-4 border rounded-lg bg-muted/10">
            {/* Light Mode Colors */}
            <div className="space-y-4">
              <h5 className="font-medium">Light Mode</h5>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="light-primary">Primary Color</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      id="light-primary"
                      type="color"
                      value={lightPrimary}
                      onChange={(e) => setLightPrimary(e.target.value)}
                      className="w-12 h-10 rounded border border-border cursor-pointer"
                    />
                    <span className="text-sm text-muted-foreground font-mono">{lightPrimary}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="light-secondary">Secondary Color</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      id="light-secondary"
                      type="color"
                      value={lightSecondary}
                      onChange={(e) => setLightSecondary(e.target.value)}
                      className="w-12 h-10 rounded border border-border cursor-pointer"
                    />
                    <span className="text-sm text-muted-foreground font-mono">{lightSecondary}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Dark Mode Colors */}
            <div className="space-y-4">
              <h5 className="font-medium">Dark Mode</h5>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dark-primary">Primary Color</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      id="dark-primary"
                      type="color"
                      value={darkPrimary}
                      onChange={(e) => setDarkPrimary(e.target.value)}
                      className="w-12 h-10 rounded border border-border cursor-pointer"
                    />
                    <span className="text-sm text-muted-foreground font-mono">{darkPrimary}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dark-secondary">Secondary Color</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      id="dark-secondary"
                      type="color"
                      value={darkSecondary}
                      onChange={(e) => setDarkSecondary(e.target.value)}
                      className="w-12 h-10 rounded border border-border cursor-pointer"
                    />
                    <span className="text-sm text-muted-foreground font-mono">{darkSecondary}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="p-4 border rounded-lg bg-background">
                <div 
                  className="h-8 rounded mb-2"
                  style={{ backgroundColor: lightPrimary }}
                ></div>
                <div 
                  className="h-6 rounded"
                  style={{ backgroundColor: lightSecondary }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end">
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};
