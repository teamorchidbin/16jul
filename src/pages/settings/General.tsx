
import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Calendar } from 'lucide-react';

export const General = () => {
  const [dynamicGroupLinks, setDynamicGroupLinks] = useState(true);
  const [searchEngineIndexing, setSearchEngineIndexing] = useState(true);
  const [monthlyDigest, setMonthlyDigest] = useState(true);
  const [scheduleTimezoneOpen, setScheduleTimezoneOpen] = useState(false);
  const [noEndDate, setNoEndDate] = useState(false);

  return (
    <div className="p-8 max-w-4xl" style={{ color: '#202124' }}>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">General</h1>
        <p className="text-muted-foreground">Manage settings for your language and timezone</p>
      </div>

      <div className="space-y-6">
        {/* Language */}
        <div className="space-y-2">
          <Label>Language</Label>
          <Select defaultValue="english">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Timezone */}
        <div className="space-y-4">
          <Label>Timezone</Label>
          <Select defaultValue="asia-kolkata">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asia-kolkata">Asia/Kolkata</SelectItem>
              <SelectItem value="america-new-york">America/New_York</SelectItem>
              <SelectItem value="europe-london">Europe/London</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={scheduleTimezoneOpen} onOpenChange={setScheduleTimezoneOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Schedule timezone change</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Travel Schedule</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Plan your trip ahead to keep your existing schedule in a different timezone and prevent being booked at midnight.
                </p>
                
                <div className="space-y-2">
                  <Label>Time range</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm bg-muted px-3 py-2 rounded">Jul 11, 2025 - Jul 11, 2025</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Schedule timezone without end date</Label>
                  <Switch checked={noEndDate} onCheckedChange={setNoEndDate} />
                </div>

                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select defaultValue="asia-kolkata">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asia-kolkata">Asia/Kolkata</SelectItem>
                      <SelectItem value="america-new-york">America/New_York</SelectItem>
                      <SelectItem value="europe-london">Europe/London</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setScheduleTimezoneOpen(false)}>
                    Close
                  </Button>
                  <Button onClick={() => setScheduleTimezoneOpen(false)}>
                    Add
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Time format */}
        <div className="space-y-2">
          <Label>Time format</Label>
          <Select defaultValue="12-hour">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12-hour">12 hour</SelectItem>
              <SelectItem value="24-hour">24 hour</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            This is an internal setting and will not affect how times are displayed on public booking pages for you or anyone booking you.
          </p>
        </div>

        {/* Start of week */}
        <div className="space-y-2">
          <Label>Start of week</Label>
          <Select defaultValue="monday">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monday">Monday</SelectItem>
              <SelectItem value="sunday">Sunday</SelectItem>
              <SelectItem value="saturday">Saturday</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Settings toggles - Separated section */}
        <div className="pt-8 border-t space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Dynamic group links</h3>
              <p className="text-sm text-muted-foreground">Allow attendees to book you through dynamic group bookings</p>
            </div>
            <Switch 
              checked={dynamicGroupLinks}
              onCheckedChange={setDynamicGroupLinks}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Allow search engine indexing</h3>
              <p className="text-sm text-muted-foreground">Allow search engines to access your public content</p>
            </div>
            <Switch 
              checked={searchEngineIndexing}
              onCheckedChange={setSearchEngineIndexing}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Monthly digest email</h3>
              <p className="text-sm text-muted-foreground">Monthly digest email for teams</p>
            </div>
            <Switch 
              checked={monthlyDigest}
              onCheckedChange={setMonthlyDigest}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
