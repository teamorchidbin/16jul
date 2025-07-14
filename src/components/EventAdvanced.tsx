import React, { useState } from 'react';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
export const EventAdvanced = () => {
  const [settings, setSettings] = useState({
    requiresConfirmation: false,
    hideEventTypeDetails: false,
    redirectOnBooking: '',
    passThroughHiddenFields: false,
    eventLayout: 'default'
  });
  const layoutOptions = [{
    id: 'default',
    name: 'Default',
    icon: Monitor,
    description: 'Standard booking page layout'
  }, {
    id: 'mobile',
    name: 'Mobile Optimized',
    icon: Smartphone,
    description: 'Optimized for mobile devices'
  }, {
    id: 'minimal',
    name: 'Minimal',
    icon: Tablet,
    description: 'Clean, minimal design'
  }];
  return <div className="p-6 max-w-6xl mx-auto space-y-6">
      

      {/* Booking Settings */}
      <div className="pb-6 space-y-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Booking Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Requires confirmation</h4>
              <p className="text-sm text-gray-600">Bookings will require your confirmation before they are scheduled</p>
            </div>
            <input type="checkbox" checked={settings.requiresConfirmation} onChange={e => setSettings(prev => ({
            ...prev,
            requiresConfirmation: e.target.checked
          }))} className="rounded" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Hide event type details</h4>
              <p className="text-sm text-gray-600">Hide the event type name and description from the booking page</p>
            </div>
            <input type="checkbox" checked={settings.hideEventTypeDetails} onChange={e => setSettings(prev => ({
            ...prev,
            hideEventTypeDetails: e.target.checked
          }))} className="rounded" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Pass through hidden fields</h4>
              <p className="text-sm text-gray-600">Pass through UTM parameters and other hidden fields to the booking confirmation</p>
            </div>
            <input type="checkbox" checked={settings.passThroughHiddenFields} onChange={e => setSettings(prev => ({
            ...prev,
            passThroughHiddenFields: e.target.checked
          }))} className="rounded" />
          </div>
        </div>
      </div>

      {/* Redirect Settings */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Redirect Settings</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Redirect on booking</label>
          <input type="url" value={settings.redirectOnBooking} onChange={e => setSettings(prev => ({
          ...prev,
          redirectOnBooking: e.target.value
        }))} placeholder="https://example.com/thank-you" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          <p className="text-sm text-gray-600 mt-1">Redirect bookers to this URL after they complete their booking</p>
        </div>
      </div>

      {/* Layout Settings */}
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-4">Event Layout</h3>
        <p className="text-sm text-gray-600 mb-4">Choose how your booking page will be displayed to bookers</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {layoutOptions.map(layout => <div key={layout.id} className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${settings.eventLayout === layout.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => setSettings(prev => ({
          ...prev,
          eventLayout: layout.id
        }))}>
              <div className="flex flex-col items-center text-center">
                <layout.icon className={`h-8 w-8 mb-2 ${settings.eventLayout === layout.id ? 'text-blue-600' : 'text-gray-400'}`} />
                <h4 className="font-medium text-gray-900 mb-1">{layout.name}</h4>
                <p className="text-xs text-gray-600">{layout.description}</p>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};