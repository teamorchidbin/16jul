
import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Checkbox } from '../../components/ui/checkbox';
import { Upload } from 'lucide-react';

export const Appearance = () => {
  const [customBrandColors, setCustomBrandColors] = useState(true);
  const [disableBranding, setDisableBranding] = useState(false);
  const [lightBrandColor, setLightBrandColor] = useState('#007ee5');
  const [darkBrandColor, setDarkBrandColor] = useState('#fafafa');
  
  const [monthLayout, setMonthLayout] = useState(true);
  const [weeklyLayout, setWeeklyLayout] = useState(true);
  const [columnLayout, setColumnLayout] = useState(true);
  const [defaultView, setDefaultView] = useState('month');

  const themeOptions = [
    { name: 'System default', selected: false, image: '/lovable-uploads/836ff3f8-9c01-4824-87ee-cb55f5d1de44.png' },
    { name: 'Light', selected: true, image: '/lovable-uploads/359ae3dc-e188-432c-bfe8-975b576e073a.png' },
    { name: 'Dark', selected: false, image: '/lovable-uploads/b2998ace-808f-41d1-affe-28a5275649f1.png' }
  ];

  const bookingThemes = [
    { name: 'System default', selected: true, image: '/lovable-uploads/836ff3f8-9c01-4824-87ee-cb55f5d1de44.png' },
    { name: 'Light', selected: false, image: '/lovable-uploads/359ae3dc-e188-432c-bfe8-975b576e073a.png' },
    { name: 'Dark', selected: false, image: '/lovable-uploads/b2998ace-808f-41d1-affe-28a5275649f1.png' }
  ];

  const layoutOptions = [
    { 
      name: 'Month', 
      checked: monthLayout, 
      onChange: (checked: boolean | "indeterminate") => setMonthLayout(checked === true),
      image: '/lovable-uploads/7adc3e4a-6c37-4058-be71-591e83f35731.png'
    },
    { 
      name: 'Weekly', 
      checked: weeklyLayout, 
      onChange: (checked: boolean | "indeterminate") => setWeeklyLayout(checked === true),
      image: '/lovable-uploads/400903b2-a89f-4b36-9dac-3b74abaad938.png'
    },
    { 
      name: 'Column', 
      checked: columnLayout, 
      onChange: (checked: boolean | "indeterminate") => setColumnLayout(checked === true),
      image: '/lovable-uploads/1f362857-f00f-437a-9e9d-6533171745eb.png'
    }
  ];

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="p-8 max-w-4xl w-full">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold mb-2">Appearance</h1>
        </div>

        <div className="space-y-8">
          {/* Dashboard theme */}
          <div className="border rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-medium mb-2">Dashboard theme</h2>
                <p className="text-sm text-muted-foreground">This only applies to your logged in dashboard</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {themeOptions.map((theme, index) => (
                  <div key={index} className={`border-2 rounded-lg p-4 cursor-pointer ${theme.selected ? 'border-primary' : 'border-border'}`}>
                    <div className="w-full h-24 bg-muted rounded mb-2 overflow-hidden">
                      <img src={theme.image} alt={theme.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-sm text-center">{theme.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking page theme */}
          <div className="border rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-medium mb-2">Booking page theme</h2>
                <p className="text-sm text-muted-foreground">This only applies to your public booking pages</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {bookingThemes.map((theme, index) => (
                  <div key={index} className={`border-2 rounded-lg p-4 cursor-pointer ${theme.selected ? 'border-primary' : 'border-border'}`}>
                    <div className="w-full h-24 bg-muted rounded mb-2 overflow-hidden">
                      <img src={theme.image} alt={theme.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-sm text-center">{theme.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking layout */}
          <div className="border rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-medium mb-2">Booking layout</h2>
                <p className="text-sm text-muted-foreground">
                  You can select multiple and bookers can switch views. This can be overridden on a per event basis.
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                {layoutOptions.map((layout, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="w-full h-24 bg-muted rounded mb-2 overflow-hidden">
                      <img src={layout.image} alt={layout.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={layout.checked}
                        onCheckedChange={layout.onChange}
                      />
                      <span className="text-sm">{layout.name}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <Label className="text-sm font-medium">Default view</Label>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <Button 
                    variant={defaultView === 'month' ? 'default' : 'outline'} 
                    className="justify-start"
                    onClick={() => setDefaultView('month')}
                  >
                    Month
                  </Button>
                  <Button 
                    variant={defaultView === 'weekly' ? 'default' : 'outline'} 
                    className="justify-start"
                    onClick={() => setDefaultView('weekly')}
                  >
                    Weekly
                  </Button>
                  <Button 
                    variant={defaultView === 'column' ? 'default' : 'outline'} 
                    className="justify-start"
                    onClick={() => setDefaultView('column')}
                  >
                    Column
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Custom brand colors */}
          <div className="border rounded-lg p-6">
            <div className="space-y-4">
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
                        className="w-8 h-8 rounded border cursor-pointer"
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
                        className="w-8 h-8 rounded border cursor-pointer"
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
          </div>

          {/* Other settings */}
          <div className="border rounded-lg p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-medium">Disable OneHash branding</h2>
                  <p className="text-xs text-muted-foreground">Removes any OneHash related brandings, i.e. 'Powered by OneHash.'</p>
                </div>
                <Switch 
                  checked={disableBranding}
                  onCheckedChange={setDisableBranding}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-medium">Custom brand logo</h2>
                    <p className="text-xs text-muted-foreground">Add your own brand logo into your booking page.</p>
                  </div>
                  <Button variant="outline">Preview</Button>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                    <img 
                      src="https://cdn.prod.website-files.com/5e53d34464688e6f5960a338/610a36c2792530d601aaf35f_OneHash_Logo.svg" 
                      alt="OneHash Logo" 
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload logo
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="text-sm font-medium">Custom brand favicon</h2>
                  <p className="text-xs text-muted-foreground">Add your own brand favicon into your booking page.</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                    <img 
                      src="https://cdn.prod.website-files.com/5e53d34464688e6f5960a338/65d0f96d6759233ecabe6ea5_OneHash.svg" 
                      alt="OneHash Favicon" 
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload favicon
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
