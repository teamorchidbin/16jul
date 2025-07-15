
import React, { useState } from 'react';
import { Calendar } from './ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { TimeSelector } from './TimeSelector';

interface DateOverrideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (override: any) => void;
}

export const DateOverrideModal = ({ isOpen, onClose, onSave }: DateOverrideModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isUnavailable, setIsUnavailable] = useState(false);
  const [timeSlots, setTimeSlots] = useState([
    { startTime: '09:00', endTime: '17:00' }
  ]);

  const handleAddTimeSlot = () => {
    setTimeSlots([...timeSlots, { startTime: '18:00', endTime: '19:00' }]);
  };

  const handleRemoveTimeSlot = (index: number) => {
    setTimeSlots(timeSlots.filter((_, i) => i !== index));
  };

  const handleTimeSlotChange = (index: number, field: 'startTime' | 'endTime', value: string) => {
    const updated = [...timeSlots];
    updated[index][field] = value;
    setTimeSlots(updated);
  };

  const handleSave = () => {
    if (selectedDate) {
      onSave({
        date: selectedDate,
        isUnavailable,
        timeSlots: isUnavailable ? [] : timeSlots
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select the dates to override</DialogTitle>
        </DialogHeader>
        
        <div className="flex gap-8">
          {/* Calendar Section */}
          <div className="flex-1">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">July 2025</h3>
            </div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </div>

          {/* Time Configuration Section */}
          {selectedDate && (
            <div className="flex-1 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Which hours are you free?</h3>
                
                {!isUnavailable && (
                  <div className="space-y-3">
                    {timeSlots.map((slot, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="flex-1">
                          <TimeSelector
                            value={slot.startTime}
                            onChange={(time) => handleTimeSlotChange(index, 'startTime', time)}
                            placeholder="Start time"
                          />
                        </div>
                        <span className="text-muted-foreground">-</span>
                        <div className="flex-1">
                          <TimeSelector
                            value={slot.endTime}
                            onChange={(time) => handleTimeSlotChange(index, 'endTime', time)}
                            placeholder="End time"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={handleAddTimeSlot}
                          className="h-10 w-10"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        {timeSlots.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => handleRemoveTimeSlot(index)}
                            className="h-10 w-10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center space-x-3 mt-4">
                  <Switch
                    checked={isUnavailable}
                    onCheckedChange={setIsUnavailable}
                  />
                  <span className="text-sm">Mark unavailable (All day)</span>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button onClick={handleSave}>
                  Add Override
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
