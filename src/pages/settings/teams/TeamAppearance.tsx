
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Switch } from '../../../components/ui/switch';
import { Label } from '../../../components/ui/label';
import { Separator } from '../../../components/ui/separator';

export const TeamAppearance = () => {
  const { teamId } = useParams();
  const [customBrandColors, setCustomBrandColors] = useState(false);
  const [lightPrimary, setLightPrimary] = useState('#3b82f6');
  const [lightSecondary, setLightSecondary] = useState('#64748b');
  const [darkPrimary, setDarkPrimary] = useState('#60a5fa');
  const [darkSecondary, setDarkSecondary] = useState('#94a3b8');

  const handleSave = () => {
    console.log('Saving appearance settings');
  };

  return (
    <div className="min-h-screen bg-background flex justify-center animate-fade-in">
      <div className="p-8 max-w-2xl w-full">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold mb-2">Team Appearance</h1>
          <p className="text-muted-foreground">Customize how your team's booking pages look</p>
        </div>

        <div className="space-y-6">
          {/* Custom Brand Colors Toggle */}
          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/20 transition-colors duration-200">
            <div>
              <Label htmlFor="custom-colors" className="text-base font-medium">Custom brand colors</Label>
              <p className="text-sm text-muted-foreground">Use your own brand colors instead of default</p>
            </div>
            <Switch
              id="custom-colors"
              checked={customBrandColors}
              onCheckedChange={setCustomBrandColors}
              className="transition-all duration-200"
            />
          </div>

          {/* Color Picker Section */}
          {customBrandColors && (
            <div className="space-y-6 p-4 border rounded-lg bg-muted/10 animate-scale-in">
              <h3 className="text-lg font-semibold">Brand Colors</h3>
              
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
