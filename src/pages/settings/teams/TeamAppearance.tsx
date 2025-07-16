
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';

export const TeamAppearance = () => {
  const { teamId } = useParams();
  const [brandColor, setBrandColor] = useState('#3b82f6');
  const [darkBrandColor, setDarkBrandColor] = useState('#60a5fa');
  const [hideBranding, setHideBranding] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Team Appearance</CardTitle>
          <CardDescription>
            Customize how your team's booking pages look to your users.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="brand-color">Brand Color</Label>
            <div className="flex space-x-2">
              <Input
                id="brand-color"
                type="color"
                value={brandColor}
                onChange={(e) => setBrandColor(e.target.value)}
                className="w-16 h-10 p-1 border rounded"
              />
              <Input
                value={brandColor}
                onChange={(e) => setBrandColor(e.target.value)}
                placeholder="#3b82f6"
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dark-brand-color">Dark Mode Brand Color</Label>
            <div className="flex space-x-2">
              <Input
                id="dark-brand-color"
                type="color"
                value={darkBrandColor}
                onChange={(e) => setDarkBrandColor(e.target.value)}
                className="w-16 h-10 p-1 border rounded"
              />
              <Input
                value={darkBrandColor}
                onChange={(e) => setDarkBrandColor(e.target.value)}
                placeholder="#60a5fa"
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select defaultValue="light">
              <SelectTrigger>
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="auto">Auto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
};
