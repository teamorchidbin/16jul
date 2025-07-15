import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Switch } from '../../../components/ui/switch';

export const TeamAppearance = () => {
  const { teamId } = useParams();
  const [selectedTheme, setSelectedTheme] = useState('system');
  const [customBrandColors, setCustomBrandColors] = useState(false);
  const [lightBrandColor, setLightBrandColor] = useState('#007ee5');
  const [darkBrandColor, setDarkBrandColor] = useState('#fafafa');
  const [disableBranding, setDisableBranding] = useState(false);
  const [hideBookTeamButton, setHideBookTeamButton] = useState(false);

  const themes = [
    { name: 'System default', value: 'system', image: '/lovable-uploads/a8e28b12-738b-4efc-9df1-2dd1f74ac700.png' },
    { name: 'Light', value: 'light', image: '/lovable-uploads/b13e98ea-babf-46f1-aa8b-baa185c0abc6.png' },
    { name: 'Dark', value: 'dark', image: '/lovable-uploads/708c852c-2d28-4573-a68e-616ffc467d12.png' }
  ];

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="p-8 max-w-4xl w-full">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold mb-2">Appearance</h1>
          <p className="text-muted-foreground">Customize the appearance of your team's booking pages</p>
        </div>

        <div className="space-y-8">
          {/* Booking page theme */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-medium mb-2">Booking page theme</h2>
              <p className="text-sm text-muted-foreground">This only applies to your public booking pages</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {themes.map((theme, index) => (
                <div 
                  key={index} 
                  className={`border-2 rounded-lg p-4 cursor-pointer ${selectedTheme === theme.value ? 'border-primary' : 'border-border'}`}
                  onClick={() => setSelectedTheme(theme.value)}
                >
                  <div className="w-full h-20 rounded mb-2 overflow-hidden">
                    <img src={theme.image} alt={theme.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-sm text-center">{theme.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Custom brand colors */}
          <div className="pt-8 border-t space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium">Custom brand colors</h2>
                <p className="text-sm text-muted-foreground">Customize your own brand colour into your booking page.</p>
              </div>
              <Switch 
                checked={customBrandColors}
                onCheckedChange={setCustomBrandColors}
              />
            </div>

            {customBrandColors && (
              <div className="space-y-4 pl-4 border-l-2 border-border">
                <div className="space-y-2">
                  <Label>Brand Color (Light Theme)</Label>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="color" 
                      value={lightBrandColor}
                      onChange={(e) => setLightBrandColor(e.target.value)}
                      className="w-8 h-8 rounded border"
                    />
                    <Input 
                      value={lightBrandColor}
                      onChange={(e) => setLightBrandColor(e.target.value)}
                      className="w-32"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Brand Color (Dark Theme)</Label>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="color" 
                      value={darkBrandColor}
                      onChange={(e) => setDarkBrandColor(e.target.value)}
                      className="w-8 h-8 rounded border"
                    />
                    <Input 
                      value={darkBrandColor}
                      onChange={(e) => setDarkBrandColor(e.target.value)}
                      className="w-32"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Other settings */}
          <div className="pt-8 border-t space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-medium">Disable OneHash branding</h2>
                <p className="text-sm text-muted-foreground">Removes any OneHash related brandings, i.e. 'Powered by OneHash.'</p>
              </div>
              <Switch 
                checked={disableBranding}
                onCheckedChange={setDisableBranding}
              />
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-base font-medium">Custom brand logo</h2>
                <p className="text-sm text-muted-foreground">Add your own brand logo into your booking page.</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://cdn.prod.website-files.com/5e53d34464688e6f5960a338/610a36c2792530d601aaf35f_OneHash_Logo.svg" 
                    alt="OneHash Logo" 
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <Button variant="outline">Upload logo</Button>
                <Button variant="outline">Update</Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-base font-medium">Custom brand favicon</h2>
                <p className="text-sm text-muted-foreground">Add your own brand favicon into your booking page.</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://cdn.prod.website-files.com/5e53d34464688e6f5960a338/65d0f96d6759233ecabe6ea5_OneHash.svg" 
                    alt="OneHash Favicon" 
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <Button variant="outline">Upload favicon</Button>
                <Button variant="outline">Update</Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-medium">Hide Book a Team Member Button</h2>
                <p className="text-sm text-muted-foreground">Hide Book a Team Member Button from your public pages.</p>
              </div>
              <Switch 
                checked={hideBookTeamButton}
                onCheckedChange={setHideBookTeamButton}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
