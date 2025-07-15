
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

interface CopyTimesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopy: (selectedDays: string[]) => void;
  sourceDay: string;
}

export const CopyTimesModal = ({ isOpen, onClose, onCopy, sourceDay }: CopyTimesModalProps) => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const availableDays = days.filter(day => day !== sourceDay);

  const handleDayToggle = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedDays([]);
    } else {
      setSelectedDays([...availableDays]);
    }
    setSelectAll(!selectAll);
  };

  const handleCopy = () => {
    onCopy(selectedDays);
    onClose();
    setSelectedDays([]);
    setSelectAll(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Copy times to</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="select-all"
              checked={selectAll}
              onCheckedChange={handleSelectAll}
            />
            <label htmlFor="select-all" className="text-sm font-medium">
              Select All
            </label>
          </div>

          <div className="space-y-2">
            {availableDays.map((day) => (
              <div key={day} className="flex items-center space-x-2">
                <Checkbox
                  id={day}
                  checked={selectedDays.includes(day)}
                  onCheckedChange={() => handleDayToggle(day)}
                />
                <label htmlFor={day} className="text-sm">
                  {day}
                </label>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleCopy} disabled={selectedDays.length === 0}>
              Apply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
