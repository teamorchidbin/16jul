
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
  const [lightBrandColor, setLightBrandColor] = useState('007ee5');
  const [darkBrandColor, setDarkBrandColor] = useState('fafafa');
  
  const [monthLayout, setMonthLayout] = useState(true);
  const [weeklyLayout, setWeeklyLayout] = useState(true);
  const [columnLayout, setColumnLayout] = useState(true);

  const themeOptions = [
    { name: 'System default', selected: false },
    { name: 'Light', selected: true },
    { name: 'Dark', selected: false }
  ];

  const bookingThemes = [
    { name: 'System default', selected: true },
    { name: 'Light', selected: false },
    { name: 'Dark', selected: false }
  ];

  const layoutOptions = [
    { name: 'Month', checked: monthLayout, onChange: setMonthLayout },
    { name: 'Weekly', checked: weeklyLayout, onChange: setWeeklyLayout },
    { name: 'Column', checked: columnLayout, onChange: setColumnLayout }
  ];

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Appearance</h1>
      </div>

      <div className="space-y-12">
        {/* Dashboard theme */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-medium mb-2">Dashboard theme</h2>
            <p className="text-sm text-muted-foreground">This only applies to your logged in dashboard</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {themeOptions.map((theme, index) => (
              <div key={index} className={`border-2 rounded-lg p-4 cursor-pointer ${theme.selected ? 'border-primary' : 'border-border'}`}>
                <div className="w-full h-24 bg-muted rounded mb-2 flex items-center justify-center">
                  <div className="w-8 h-8 bg-background rounded"></div>
                </div>
                <p className="text-sm text-center">{theme.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking page theme */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-medium mb-2">Booking page theme</h2>
            <p className="text-sm text-muted-foreground">This only applies to your public booking pages</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {bookingThemes.map((theme, index) => (
              <div key={index} className={`border-2 rounded-lg p-4 cursor-pointer ${theme.selected ? 'border-primary' : 'border-border'}`}>
                <div className="w-full h-24 bg-muted rounded mb-2 flex items-center justify-center">
                  <div className="w-8 h-8 bg-background rounded"></div>
                </div>
                <p className="text-sm text-center">{theme.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking layout */}
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
                <div className="w-full h-24 bg-muted rounded mb-2"></div>
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
              <Button variant="outline" className="justify-start">Month</Button>
              <Button variant="ghost" className="justify-start">Weekly</Button>
              <Button variant="ghost" className="justify-start">Column</Button>
            </div>
          </div>
        </div>

        {/* Custom brand colors */}
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
                  <div className="w-8 h-8 bg-blue-500 rounded"></div>
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
                  <div className="w-8 h-8 bg-gray-100 rounded border"></div>
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

        {/* Disable branding */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">Disable OneHash branding</h2>
            <p className="text-sm text-muted-foreground">Removes any OneHash related brandings, i.e. 'Powered by OneHash.'</p>
          </div>
          <Switch 
            checked={disableBranding}
            onCheckedChange={setDisableBranding}
          />
        </div>

        {/* Custom brand logo */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium">Custom brand logo</h2>
              <p className="text-sm text-muted-foreground">Add your own brand logo into your booking page.</p>
            </div>
            <Button variant="outline">Preview</Button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">OneHash</span>
            </div>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload logo
            </Button>
          </div>
        </div>

        {/* Custom brand favicon */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-medium">Custom brand favicon</h2>
            <p className="text-sm text-muted-foreground">Add your own brand favicon into your booking page.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 via-yellow-500 via-green-500 to-blue-500 rounded-full"></div>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload favicon
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
