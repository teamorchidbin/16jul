
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
  const [disableBranding, setDisableBranding] = useState(false);
  const [hideTeamMemberButton, setHideTeamMemberButton] = useState(false);

  const handleSave = () => {
    console.log('Saving appearance settings');
  };

  const themeOptions = [
    { id: 'system', name: 'System default', description: 'Follows your device settings' },
    { id: 'light', name: 'Light', description: 'Light theme for booking pages' },
    { id: 'dark', name: 'Dark', description: 'Dark theme for booking pages' }
  ];

  return (
    <div className="min-h-screen bg-background flex justify-center animate-fade-in">
      <div className="p-8 max-w-2xl w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Team Appearance</h1>
          <p className="text-muted-foreground">Customize how your team's booking pages look</p>
        </div>

        <div className="space-y-8">
          {/* Booking Page Theme */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Booking page theme</h3>
              <p className="text-sm text-muted-foreground">This only applies to your public booking pages</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {themeOptions.map((theme) => (
                <div
                  key={theme.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:bg-muted/20 ${
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
                  <h4 className="font-medium text-center">{theme.name}</h4>
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
                <h3 className="text-lg font-semibold">Custom brand colors</h3>
                <p className="text-sm text-muted-foreground">Customize your own brand colour into your booking page.</p>
              </div>
              <Switch
                checked={customBrandColors}
                onCheckedChange={setCustomBrandColors}
                className="transition-all duration-200"
              />
            </div>

            {customBrandColors && (
              <div className="space-y-6 p-4 border rounded-lg bg-muted/10 animate-scale-in">
                {/* Light Mode Colors */}
                <div className="space-y-4">
                  <h4 className="font-medium">Light Mode</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="light-primary">Primary Color</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          id="light-primary"
                          type="color"
                          value={lightPrimary}
                          onChange={(e) => setLightPrimary(e.target.value)}
                          className="w-12 h-10 rounded border border-border cursor-pointer transition-transform duration-200 hover:scale-105"
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
                          className="w-12 h-10 rounded border border-border cursor-pointer transition-transform duration-200 hover:scale-105"
                        />
                        <span className="text-sm text-muted-foreground font-mono">{lightSecondary}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Dark Mode Colors */}
                <div className="space-y-4">
                  <h4 className="font-medium">Dark Mode</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dark-primary">Primary Color</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          id="dark-primary"
                          type="color"
                          value={darkPrimary}
                          onChange={(e) => setDarkPrimary(e.target.value)}
                          className="w-12 h-10 rounded border border-border cursor-pointer transition-transform duration-200 hover:scale-105"
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
                          className="w-12 h-10 rounded border border-border cursor-pointer transition-transform duration-200 hover:scale-105"
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
                      className="h-8 rounded mb-2 transition-colors duration-200"
                      style={{ backgroundColor: lightPrimary }}
                    ></div>
                    <div 
                      className="h-6 rounded transition-colors duration-200"
                      style={{ backgroundColor: lightSecondary }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Disable OneHash Branding */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Disable OneHash branding</h3>
                <p className="text-sm text-muted-foreground">Removes any OneHash related brandings, i.e. 'Powered by OneHash.'</p>
              </div>
              <Switch
                checked={disableBranding}
                onCheckedChange={setDisableBranding}
                className="transition-all duration-200"
              />
            </div>
          </div>

          <Separator />

          {/* Custom Brand Logo */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Custom brand logo</h3>
              <p className="text-sm text-muted-foreground">Add your own brand logo into your booking page.</p>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  OH
                </div>
                <span className="text-sm">Upload logo</span>
              </div>
              <Button variant="outline" size="sm">Update</Button>
            </div>
          </div>

          <Separator />

          {/* Custom Brand Favicon */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Custom brand favicon</h3>
              <p className="text-sm text-muted-foreground">Add your own brand favicon into your booking page.</p>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded bg-gradient-to-br from-red-400 via-yellow-400 via-green-400 to-blue-400 flex items-center justify-center">
                  <div className="w-8 h-8 rounded bg-white"></div>
                </div>
                <span className="text-sm">Upload favicon</span>
              </div>
              <Button variant="outline" size="sm">Update</Button>
            </div>
          </div>

          <Separator />

          {/* Hide Book a Team Member Button */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Hide Book a Team Member Button</h3>
                <p className="text-sm text-muted-foreground">Hide Book a Team Member Button from your public pages.</p>
              </div>
              <Switch
                checked={hideTeamMemberButton}
                onCheckedChange={setHideTeamMemberButton}
                className="transition-all duration-200"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end pt-6">
            <Button 
              onClick={handleSave}
              className="hover:scale-105 transition-transform duration-200"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
