
import React, { useState } from 'react';
import { ArrowLeft, Plus, ChevronDown, Copy, Trash2, Edit3, Info } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Switch } from '../components/ui/switch';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { TimeSelector } from '../components/TimeSelector';
import { DateOverrideModal } from '../components/DateOverrideModal';
import { CopyTimesModal } from '../components/CopyTimesModal';
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/ui/tooltip';

interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface DaySchedule {
  day: string;
  enabled: boolean;
  timeSlots: TimeSlot[];
}

export const EditAvailability = () => {
  const navigate = useNavigate();
  const { scheduleId } = useParams();
  const [isSetToDefault, setIsSetToDefault] = useState(true);
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [scheduleTitle, setScheduleTitle] = useState(
    scheduleId === 'working-hours' ? 'Working Hours' : 'Additional hours'
  );
  const [isOverrideModalOpen, setIsOverrideModalOpen] = useState(false);
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  const [copySourceDay, setCopySourceDay] = useState('');

  const [weekDays, setWeekDays] = useState<DaySchedule[]>([
    { day: 'Monday', enabled: true, timeSlots: [{ startTime: '09:00', endTime: '17:00' }] },
    { day: 'Tuesday', enabled: true, timeSlots: [{ startTime: '09:00', endTime: '17:00' }] },
    { day: 'Wednesday', enabled: true, timeSlots: [{ startTime: '09:00', endTime: '17:00' }] },
    { day: 'Thursday', enabled: true, timeSlots: [{ startTime: '09:00', endTime: '17:00' }] },
    { day: 'Friday', enabled: true, timeSlots: [{ startTime: '09:00', endTime: '17:00' }] },
    { day: 'Saturday', enabled: false, timeSlots: [] },
    { day: 'Sunday', enabled: false, timeSlots: [] }
  ]);

  const handleDayToggle = (dayIndex: number) => {
    const updated = [...weekDays];
    updated[dayIndex].enabled = !updated[dayIndex].enabled;
    if (updated[dayIndex].enabled && updated[dayIndex].timeSlots.length === 0) {
      updated[dayIndex].timeSlots = [{ startTime: '09:00', endTime: '17:00' }];
    }
    setWeekDays(updated);
  };

  const handleAddTimeSlot = (dayIndex: number) => {
    const updated = [...weekDays];
    updated[dayIndex].timeSlots.push({ startTime: '18:00', endTime: '19:00' });
    setWeekDays(updated);
  };

  const handleRemoveTimeSlot = (dayIndex: number, slotIndex: number) => {
    const updated = [...weekDays];
    updated[dayIndex].timeSlots = updated[dayIndex].timeSlots.filter((_, i) => i !== slotIndex);
    setWeekDays(updated);
  };

  const handleTimeSlotChange = (dayIndex: number, slotIndex: number, field: 'startTime' | 'endTime', value: string) => {
    const updated = [...weekDays];
    updated[dayIndex].timeSlots[slotIndex][field] = value;
    setWeekDays(updated);
  };

  const handleCopyTimes = (day: string) => {
    setCopySourceDay(day);
    setIsCopyModalOpen(true);
  };

  const handleCopyTimesToDays = (selectedDays: string[]) => {
    const sourceDay = weekDays.find(d => d.day === copySourceDay);
    if (!sourceDay) return;

    const updated = [...weekDays];
    selectedDays.forEach(targetDay => {
      const targetIndex = updated.findIndex(d => d.day === targetDay);
      if (targetIndex !== -1) {
        updated[targetIndex].timeSlots = [...sourceDay.timeSlots];
        updated[targetIndex].enabled = true;
      }
    });
    setWeekDays(updated);
  };

  const handleSaveTitle = () => {
    setIsEditingTitle(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/availability')}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2">
                {isEditingTitle ? (
                  <div className="flex items-center space-x-2">
                    <Input
                      value={scheduleTitle}
                      onChange={(e) => setScheduleTitle(e.target.value)}
                      className="text-xl font-semibold border-none p-0 h-auto bg-transparent focus:ring-0"
                      onBlur={handleSaveTitle}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveTitle()}
                      autoFocus
                    />
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <h1 className="text-xl font-semibold">{scheduleTitle}</h1>
                    <button
                      onClick={() => setIsEditingTitle(true)}
                      className="p-1 hover:bg-muted rounded transition-colors"
                    >
                      <Edit3 className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">Mon - Fri, 9:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-muted-foreground">Set to Default</span>
                <Switch checked={isSetToDefault} onCheckedChange={setIsSetToDefault} />
              </div>
              <Button>Save</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Days Schedule */}
          <div className="space-y-6">
            {weekDays.map((daySchedule, dayIndex) => (
              <div key={dayIndex} className="space-y-3">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center space-x-4 min-w-0 flex-shrink-0">
                    <Switch 
                      checked={daySchedule.enabled} 
                      onCheckedChange={() => handleDayToggle(dayIndex)}
                    />
                    <div className="w-20 text-sm font-medium">
                      {daySchedule.day}
                    </div>
                  </div>
                  
                  {!daySchedule.enabled ? (
                    <div className="text-sm text-muted-foreground">Unavailable</div>
                  ) : (
                    <div className="flex-1 space-y-3">
                      {daySchedule.timeSlots.map((timeSlot, slotIndex) => (
                        <div key={slotIndex} className="flex items-center space-x-3">
                          <div className="w-32">
                            <TimeSelector
                              value={timeSlot.startTime}
                              onChange={(time) => handleTimeSlotChange(dayIndex, slotIndex, 'startTime', time)}
                            />
                          </div>
                          <span className="text-muted-foreground">-</span>
                          <div className="w-32">
                            <TimeSelector
                              value={timeSlot.endTime}
                              onChange={(time) => handleTimeSlotChange(dayIndex, slotIndex, 'endTime', time)}
                            />
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleAddTimeSlot(dayIndex)}
                            className="h-8 w-8"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCopyTimes(daySchedule.day)}
                            className="h-8 w-8"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          {daySchedule.timeSlots.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveTimeSlot(dayIndex, slotIndex)}
                              className="h-8 w-8"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Timezone Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Timezone</h3>
              <div className="relative max-w-md">
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent appearance-none bg-background"
                >
                  <option value="Asia/Kolkata">Asia/Kolkata</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="Asia/Tokyo">Asia/Tokyo</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Date Overrides Section */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <h3 className="text-lg font-semibold">Date overrides</h3>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="p-1 hover:bg-muted rounded-full transition-colors">
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p><strong>Date overrides are archived automatically after the date has passed</strong></p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Add dates when your availability changes from your daily hours.
              </p>
              <Button
                variant="outline"
                onClick={() => setIsOverrideModalOpen(true)}
                className="flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add an override
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <DateOverrideModal
        isOpen={isOverrideModalOpen}
        onClose={() => setIsOverrideModalOpen(false)}
        onSave={(override) => {
          console.log('Override saved:', override);
        }}
      />

      <CopyTimesModal
        isOpen={isCopyModalOpen}
        onClose={() => setIsCopyModalOpen(false)}
        onCopy={handleCopyTimesToDays}
        sourceDay={copySourceDay}
      />
    </div>
  );
};
