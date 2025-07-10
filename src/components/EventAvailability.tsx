import React, { useState } from 'react';
import { ChevronDown, Clock, ExternalLink } from 'lucide-react';
export const EventAvailability = () => {
  const [availabilityType, setAvailabilityType] = useState('working-hours');
  const schedules = [{
    id: 'working-hours',
    name: 'Working Hours - Default',
    hours: '9:00 AM - 5:00 PM, Mon-Fri',
    workingHours: [{
      day: 'Monday',
      start: '9:00 am',
      end: '5:00 pm'
    }, {
      day: 'Tuesday',
      start: '9:00 am',
      end: '5:00 pm'
    }, {
      day: 'Wednesday',
      start: '9:00 am',
      end: '5:00 pm'
    }, {
      day: 'Thursday',
      start: '9:00 am',
      end: '5:00 pm'
    }, {
      day: 'Friday',
      start: '9:00 am',
      end: '5:00 pm'
    }, {
      day: 'Saturday',
      start: 'Unavailable',
      end: ''
    }, {
      day: 'Sunday',
      start: 'Unavailable',
      end: ''
    }]
  }, {
    id: 'business-hours',
    name: 'Business Hours',
    hours: '8:00 AM - 6:00 PM, Mon-Fri',
    workingHours: [{
      day: 'Monday',
      start: '8:00 am',
      end: '6:00 pm'
    }, {
      day: 'Tuesday',
      start: '8:00 am',
      end: '6:00 pm'
    }, {
      day: 'Wednesday',
      start: '8:00 am',
      end: '6:00 pm'
    }, {
      day: 'Thursday',
      start: '8:00 am',
      end: '6:00 pm'
    }, {
      day: 'Friday',
      start: '8:00 am',
      end: '6:00 pm'
    }, {
      day: 'Saturday',
      start: '10:00 am',
      end: '2:00 pm'
    }, {
      day: 'Sunday',
      start: 'Unavailable',
      end: ''
    }]
  }, {
    id: 'flexible',
    name: 'Flexible Schedule',
    hours: '10:00 AM - 8:00 PM, Mon-Sun',
    workingHours: [{
      day: 'Monday',
      start: '10:00 am',
      end: '8:00 pm'
    }, {
      day: 'Tuesday',
      start: '10:00 am',
      end: '8:00 pm'
    }, {
      day: 'Wednesday',
      start: '11:00 am',
      end: '7:00 pm'
    }, {
      day: 'Thursday',
      start: '10:00 am',
      end: '8:00 pm'
    }, {
      day: 'Friday',
      start: '9:00 am',
      end: '6:00 pm'
    }, {
      day: 'Saturday',
      start: '12:00 pm',
      end: '8:00 pm'
    }, {
      day: 'Sunday',
      start: '1:00 pm',
      end: '6:00 pm'
    }]
  }];
  const currentSchedule = schedules.find(s => s.id === availabilityType) || schedules[0];
  const timezone = 'Asia/Calcutta';
  return <div className="p-8 max-w-4xl space-y-8">
      <div>
        
        
        <div className="mb-8">
          <div className="relative">
            <select value={availabilityType} onChange={e => setAvailabilityType(e.target.value)} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent appearance-none bg-background">
              {schedules.map(schedule => <option key={schedule.id} value={schedule.id}>
                  {schedule.name}
                </option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="space-y-4">
            {currentSchedule.workingHours.map((schedule, index) => <div key={index} className="flex items-center justify-between py-3">
                <div className="w-28 text-foreground w-28 ">
                  {schedule.day}
                </div>
                <div className="flex items-center space-x-4 text-muted-foreground">
                  {schedule.start === 'Unavailable' ? <span className="text-muted-foreground">Unavailable</span> : <>
                      <span>{schedule.start}</span>
                      <span>-</span>
                      <span>{schedule.end}</span>
                    </>}
                </div>
              </div>)}
          </div>
          
          <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground mr-2">🌍</span>
              <span className="text-sm font-medium text-foreground">{timezone}</span>
            </div>
            <button className="text-primary hover:text-primary/80 text-sm font-medium flex items-center transition-colors">
              <Clock className="h-4 w-4 mr-1" />
              Edit
              <ExternalLink className="h-3 w-3 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>;
};