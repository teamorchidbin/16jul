import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Switch } from './ui/switch';
export const EventLimits = () => {
  const [settings, setSettings] = useState({
    beforeEvent: {
      bufferTime: 'no-buffer',
      minimumNotice: {
        value: 2,
        unit: 'hours'
      }
    },
    afterEvent: {
      bufferTime: 'no-buffer',
      timeSlotIntervals: 'default'
    },
    limitBookingFrequency: {
      enabled: false,
      limit: 1,
      period: 'per-day',
      limits: [{
        limit: 1,
        period: 'per-day'
      }]
    },
    showFirstSlotOnly: {
      enabled: false
    },
    limitTotalBookingDuration: {
      enabled: false,
      duration: 60,
      unit: 'minutes',
      period: 'per-day',
      limits: [{
        duration: 60,
        unit: 'minutes',
        period: 'per-day'
      }]
    },
    limitFutureBookings: {
      enabled: false,
      days: 30,
      type: 'business-days',
      alwaysAvailable: true,
      dateRange: {
        start: 'Jul 10, 2025',
        end: 'Jul 10, 2025'
      }
    },
    offsetStartTimes: {
      enabled: false,
      offset: 0,
      unit: 'minutes'
    }
  });
  const updateSetting = (section: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };
  const addBookingLimit = () => {
    const newLimit = {
      limit: 1,
      period: 'per-day'
    };
    updateSetting('limitBookingFrequency', 'limits', [...settings.limitBookingFrequency.limits, newLimit]);
  };
  const addDurationLimit = () => {
    const newLimit = {
      duration: 60,
      unit: 'minutes',
      period: 'per-day'
    };
    updateSetting('limitTotalBookingDuration', 'limits', [...settings.limitTotalBookingDuration.limits, newLimit]);
  };
  return <div className="p-6 max-w-4xl space-y-6">
      {/* Before Event */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Before event</h3>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Buffer time</label>
            <select value={settings.beforeEvent.bufferTime} onChange={e => updateSetting('beforeEvent', 'bufferTime', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="no-buffer">No buffer time</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Notice</label>
            <div className="flex space-x-2">
              <input type="number" value={settings.beforeEvent.minimumNotice.value} onChange={e => updateSetting('beforeEvent', 'minimumNotice', {
              ...settings.beforeEvent.minimumNotice,
              value: parseInt(e.target.value)
            })} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              <select value={settings.beforeEvent.minimumNotice.unit} onChange={e => updateSetting('beforeEvent', 'minimumNotice', {
              ...settings.beforeEvent.minimumNotice,
              unit: e.target.value
            })} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="hours">Hours</option>
                <option value="days">Days</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* After Event */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">After event</h3>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Buffer time</label>
            <select value={settings.afterEvent.bufferTime} onChange={e => updateSetting('afterEvent', 'bufferTime', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="no-buffer">No buffer time</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time-slot intervals</label>
            <select value={settings.afterEvent.timeSlotIntervals} onChange={e => updateSetting('afterEvent', 'timeSlotIntervals', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="default">Use event length (default)</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Limit Booking Frequency */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-gray-900 text-base font-semibold">Limit booking frequency</h3>
            <p className="text-sm text-gray-600">Limit how many times this event can be booked</p>
          </div>
          <Switch checked={settings.limitBookingFrequency.enabled} onCheckedChange={checked => updateSetting('limitBookingFrequency', 'enabled', checked)} />
        </div>
        
        {settings.limitBookingFrequency.enabled && <div className="space-y-4">
            {settings.limitBookingFrequency.limits.map((limit, index) => <div key={index} className="flex items-center space-x-2">
                <input type="number" value={limit.limit} onChange={e => {
            const newLimits = [...settings.limitBookingFrequency.limits];
            newLimits[index] = {
              ...limit,
              limit: parseInt(e.target.value)
            };
            updateSetting('limitBookingFrequency', 'limits', newLimits);
          }} className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                <select value={limit.period} onChange={e => {
            const newLimits = [...settings.limitBookingFrequency.limits];
            newLimits[index] = {
              ...limit,
              period: e.target.value
            };
            updateSetting('limitBookingFrequency', 'limits', newLimits);
          }} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="per-day">Per day</option>
                  <option value="per-week">Per week</option>
                  <option value="per-month">Per month</option>
                </select>
              </div>)}
            <button onClick={addBookingLimit} className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Limit
            </button>
          </div>}
      </div>

      {/* Show First Slot Only */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-gray-900 mb-2 font-semibold text-base">Only show the first slot of each day as available</h3>
            <p className="text-sm text-gray-600 max-w-3xl">
              This will limit your availability for this event type to one slot per day, scheduled at the earliest available time.
            </p>
          </div>
          <Switch checked={settings.showFirstSlotOnly.enabled} onCheckedChange={checked => updateSetting('showFirstSlotOnly', 'enabled', checked)} />
        </div>
      </div>

      {/* Limit Total Booking Duration */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 text-base">Limit total booking duration</h3>
            <p className="text-sm text-gray-600">Limit total amount of time that this event can be booked</p>
          </div>
          <Switch checked={settings.limitTotalBookingDuration.enabled} onCheckedChange={checked => updateSetting('limitTotalBookingDuration', 'enabled', checked)} />
        </div>
        
        {settings.limitTotalBookingDuration.enabled && <div className="space-y-4">
            {settings.limitTotalBookingDuration.limits.map((limit, index) => <div key={index} className="flex items-center space-x-2">
                <input type="number" value={limit.duration} onChange={e => {
            const newLimits = [...settings.limitTotalBookingDuration.limits];
            newLimits[index] = {
              ...limit,
              duration: parseInt(e.target.value)
            };
            updateSetting('limitTotalBookingDuration', 'limits', newLimits);
          }} className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                <select value={limit.unit} onChange={e => {
            const newLimits = [...settings.limitTotalBookingDuration.limits];
            newLimits[index] = {
              ...limit,
              unit: e.target.value
            };
            updateSetting('limitTotalBookingDuration', 'limits', newLimits);
          }} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                </select>
                <select value={limit.period} onChange={e => {
            const newLimits = [...settings.limitTotalBookingDuration.limits];
            newLimits[index] = {
              ...limit,
              period: e.target.value
            };
            updateSetting('limitTotalBookingDuration', 'limits', newLimits);
          }} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="per-day">Per day</option>
                  <option value="per-week">Per week</option>
                </select>
              </div>)}
            <button onClick={addDurationLimit} className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Limit
            </button>
          </div>}
      </div>

      {/* Limit Future Bookings */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 text-base">Limit future bookings</h3>
            <p className="text-sm text-gray-600">Limit how far in the future this event can be booked</p>
          </div>
          <Switch checked={settings.limitFutureBookings.enabled} onCheckedChange={checked => updateSetting('limitFutureBookings', 'enabled', checked)} />
        </div>
        
        {settings.limitFutureBookings.enabled && <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input type="number" value={settings.limitFutureBookings.days} onChange={e => updateSetting('limitFutureBookings', 'days', parseInt(e.target.value))} className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              <select value={settings.limitFutureBookings.type} onChange={e => updateSetting('limitFutureBookings', 'type', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="business-days">business days</option>
                <option value="calendar-days">calendar days</option>
              </select>
              <span className="text-sm text-gray-600">into the future</span>
            </div>
            
            <div className="text-sm text-gray-600">
              Always {settings.limitFutureBookings.days} days available
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Within a date range</p>
              <div className="flex items-center space-x-2">
                <input type="text" value={settings.limitFutureBookings.dateRange.start} onChange={e => updateSetting('limitFutureBookings', 'dateRange', {
              ...settings.limitFutureBookings.dateRange,
              start: e.target.value
            })} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                <span className="text-gray-500">-</span>
                <input type="text" value={settings.limitFutureBookings.dateRange.end} onChange={e => updateSetting('limitFutureBookings', 'dateRange', {
              ...settings.limitFutureBookings.dateRange,
              end: e.target.value
            })} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>}
      </div>

      {/* Offset Start Times */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 text-base">Offset start times</h3>
            <p className="text-sm text-gray-600">Offset timeslots shown to bookers by a specified number of minutes</p>
          </div>
          <Switch checked={settings.offsetStartTimes.enabled} onCheckedChange={checked => updateSetting('offsetStartTimes', 'enabled', checked)} />
        </div>
        
        {settings.offsetStartTimes.enabled && <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Offset by</span>
              <input type="number" value={settings.offsetStartTimes.offset} onChange={e => updateSetting('offsetStartTimes', 'offset', parseInt(e.target.value))} className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              <select value={settings.offsetStartTimes.unit} onChange={e => updateSetting('offsetStartTimes', 'unit', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="minutes">Minutes</option>
              </select>
            </div>
            <p className="text-sm text-gray-600">
              e.g. this will show time slots to your bookers at {9 + settings.offsetStartTimes.offset / 60}:00 AM instead of 9:00 AM
            </p>
          </div>}
      </div>
    </div>;
};