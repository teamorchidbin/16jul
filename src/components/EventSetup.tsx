import React, { useState } from 'react';
import { Bold, Italic, Link, MapPin, Plus, X, Clock, Settings } from 'lucide-react';
interface EventSetupProps {
  onChange?: () => void;
}
export const EventSetup = ({
  onChange
}: EventSetupProps) => {
  const [formData, setFormData] = useState({
    title: 'Product Hunt Chats',
    description: 'The essence of Product Hunt reflects in communities- Select a time suitable for you, and let\'s talk products!',
    url: 'product-hunt-chats',
    durations: ['15', '30', '45', '60'],
    defaultDuration: '15',
    allowBookerToSelectDuration: true,
    location: 'google-meet',
    customDuration: '',
    showCustomDuration: false
  });
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('google-meet');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [locationDetails, setLocationDetails] = useState({
    meetingLink: '',
    address: '',
    phone: '',
    displayPhone: false,
    googleMapsLink: '',
    showGoogleMaps: false
  });
  const availableDurations = ['15', '30', '45', '60'];
  const locationOptions = [{
    id: 'conferencing',
    label: 'Conferencing',
    type: 'header'
  }, {
    id: 'zoom',
    label: 'Zoom',
    type: 'option',
    icon: '🎥'
  }, {
    id: 'google-meet',
    label: 'Google Meet',
    type: 'option',
    icon: 'GM'
  }, {
    id: 'teams',
    label: 'Microsoft Teams',
    type: 'option',
    icon: 'MT'
  }, {
    id: 'facetime',
    label: 'FaceTime',
    type: 'option',
    icon: '📞'
  }, {
    id: 'phone',
    label: 'Phone',
    type: 'header'
  }, {
    id: 'attendee-phone',
    label: 'Attendee phone number',
    type: 'option',
    icon: '📱'
  }, {
    id: 'organizer-phone',
    label: 'Organizer phone number',
    type: 'option',
    icon: '☎️'
  }, {
    id: 'others',
    label: 'Others',
    type: 'header'
  }, {
    id: 'link-meeting',
    label: 'Link meeting',
    type: 'option',
    icon: '🔗'
  }, {
    id: 'attendee-location',
    label: 'Custom attendee location',
    type: 'option',
    icon: '📍'
  }, {
    id: 'in-person',
    label: 'In Person',
    type: 'option',
    icon: '🏢'
  }];
  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    onChange?.();
  };
  const handleDurationToggle = (duration: string) => {
    const newDurations = formData.durations.includes(duration) ? formData.durations.filter(d => d !== duration) : [...formData.durations, duration];
    handleFormChange('durations', newDurations);
  };
  const addCustomDuration = () => {
    if (formData.customDuration && !formData.durations.includes(formData.customDuration)) {
      handleFormChange('durations', [...formData.durations, formData.customDuration]);
      setFormData(prev => ({
        ...prev,
        customDuration: '',
        showCustomDuration: false
      }));
    }
  };
  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId);
    setShowLocationDropdown(false);
    handleFormChange('location', locationId);
  };
  const handleLinkInsert = () => {
    if (linkUrl) {
      document.execCommand('createLink', false, linkUrl);
      setShowLinkInput(false);
      setLinkUrl('');
    }
  };
  const renderLocationDetails = () => {
    if (['zoom', 'facetime', 'link-meeting'].includes(selectedLocation)) {
      return <div className="mt-4 p-4 bg-muted/30 rounded-lg">
          <label className="block text-sm font-medium text-foreground mb-2">Meeting Link</label>
          <input type="url" value={locationDetails.meetingLink} onChange={e => setLocationDetails(prev => ({
          ...prev,
          meetingLink: e.target.value
        }))} placeholder="https://zoom.us/j/..." className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background" />
        </div>;
    }
    if (selectedLocation === 'in-person') {
      return <div className="mt-4 p-4 bg-muted/30 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Address</label>
            <textarea value={locationDetails.address} onChange={e => setLocationDetails(prev => ({
            ...prev,
            address: e.target.value
          }))} placeholder="Enter the meeting address..." rows={3} className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <input type="checkbox" id="maps-link" checked={locationDetails.showGoogleMaps} onChange={e => setLocationDetails(prev => ({
              ...prev,
              showGoogleMaps: e.target.checked
            }))} className="mr-2" />
              <label htmlFor="maps-link" className="text-sm text-muted-foreground">Include Maps link</label>
            </div>
            {locationDetails.showGoogleMaps && <div className="animate-fade-in">
                <input type="url" value={locationDetails.googleMapsLink} onChange={e => setLocationDetails(prev => ({
              ...prev,
              googleMapsLink: e.target.value
            }))} placeholder="https://maps.google.com/..." className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background" />
              </div>}
          </div>
        </div>;
    }
    if (selectedLocation === 'organizer-phone') {
      return <div className="mt-4 p-4 bg-muted/30 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
            <input type="tel" value={locationDetails.phone} onChange={e => setLocationDetails(prev => ({
            ...prev,
            phone: e.target.value
          }))} placeholder="+1 (555) 000-0000" className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background" />
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="display-phone" checked={locationDetails.displayPhone} onChange={e => setLocationDetails(prev => ({
            ...prev,
            displayPhone: e.target.checked
          }))} className="mr-2" />
            <label htmlFor="display-phone" className="text-sm text-muted-foreground">
              Display phone number on booking page
            </label>
          </div>
        </div>;
    }
    return null;
  };
  return <div className="p-8 max-w-4xl space-y-6 mx-0">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Title</label>
        <input type="text" value={formData.title} onChange={e => handleFormChange('title', e.target.value)} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background" />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Description</label>
        <div className="border border-border rounded-lg bg-background">
          <div className="flex items-center space-x-2 p-3 border-b border-border">
            <button className="p-2 hover:bg-muted rounded transition-colors" onClick={() => document.execCommand('bold')}>
              <Bold className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-muted rounded transition-colors" onClick={() => document.execCommand('italic')}>
              <Italic className="h-4 w-4 text-muted-foreground" />
            </button>
            <div className="relative">
              <button className="p-2 hover:bg-muted rounded transition-colors" onClick={() => setShowLinkInput(!showLinkInput)}>
                <Link className="h-4 w-4 text-muted-foreground" />
              </button>
              {showLinkInput && <div className="absolute top-full left-0 mt-1 p-3 bg-popover border border-border rounded-lg shadow-lg z-10 w-64 animate-scale-in">
                  <input type="url" placeholder="Enter URL" value={linkUrl} onChange={e => setLinkUrl(e.target.value)} className="w-full px-3 py-2 border border-border rounded mb-2 text-sm bg-background" autoFocus />
                  <div className="flex justify-end space-x-2">
                    <button onClick={() => setShowLinkInput(false)} className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                      Cancel
                    </button>
                    <button onClick={handleLinkInsert} className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90">
                      Insert
                    </button>
                  </div>
                </div>}
            </div>
          </div>
          <div contentEditable className="w-full p-4 min-h-[100px] focus:outline-none" dangerouslySetInnerHTML={{
          __html: formData.description
        }} onInput={e => handleFormChange('description', e.currentTarget.innerHTML)} />
        </div>
        <div className="flex items-center mt-2">
          <input type="checkbox" id="translate" className="mr-2" />
          <label htmlFor="translate" className="text-sm text-muted-foreground">
            Translate description to the visitor's browser language using AI
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">URL</label>
        <div className="flex">
          <span className="inline-flex items-center px-4 py-3 border border-r-0 border-border bg-muted text-muted-foreground text-sm rounded-l-lg">
            cal.id/sanskar/
          </span>
          <input type="text" value={formData.url} onChange={e => handleFormChange('url', e.target.value)} className="flex-1 px-4 py-3 border border-border rounded-r-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-4">Available durations</label>
        <div className="flex flex-wrap gap-2 mb-4">
          {availableDurations.map(duration => <button key={duration} onClick={() => handleDurationToggle(duration)} className={`px-4 py-2 text-sm rounded border transition-colors ${formData.durations.includes(duration) ? 'bg-primary/10 border-primary text-primary' : 'bg-background border-border text-foreground hover:bg-muted'}`}>
              {duration} mins
            </button>)}
          {formData.durations.filter(d => !availableDurations.includes(d)).map(duration => <div key={duration} className="flex items-center">
              <span className="px-4 py-2 text-sm rounded border bg-primary/10 border-primary text-primary">
                {duration} mins
              </span>
            </div>)}
        </div>
        
        {!formData.showCustomDuration ? <button onClick={() => setFormData(prev => ({
        ...prev,
        showCustomDuration: true
      }))} className="text-sm text-primary hover:text-primary/80 flex items-center transition-colors">
            <Plus className="h-4 w-4 mr-1" />
            Add custom duration
          </button> : <div className="flex items-center space-x-2">
            <input type="number" value={formData.customDuration} onChange={e => setFormData(prev => ({
          ...prev,
          customDuration: e.target.value
        }))} placeholder="Duration" className="w-24 px-3 py-2 border border-border rounded text-sm bg-background" />
            <span className="text-sm">mins</span>
            <button onClick={addCustomDuration} className="px-3 py-2 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition-colors">
              Add
            </button>
            <button onClick={() => setFormData(prev => ({
          ...prev,
          showCustomDuration: false,
          customDuration: ''
        }))} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Default duration</label>
        <select value={formData.defaultDuration} onChange={e => handleFormChange('defaultDuration', e.target.value)} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background">
          {formData.durations.map(duration => <option key={duration} value={duration}>{duration} mins</option>)}
        </select>
      </div>

      <div>
        <div className="flex items-center">
          <input type="checkbox" id="allowBookerToSelectDuration" checked={formData.allowBookerToSelectDuration} onChange={e => handleFormChange('allowBookerToSelectDuration', e.target.checked)} className="mr-3" />
          <label htmlFor="allowBookerToSelectDuration" className="text-sm font-medium text-foreground">
            Allow booker to select duration
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Location</label>
        <div className="relative">
          <button onClick={() => setShowLocationDropdown(!showLocationDropdown)} className="w-full flex items-center justify-between p-4 border border-border rounded-lg hover:border-border/60 focus:ring-2 focus:ring-ring bg-background transition-colors">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center mr-3">
                <span className="text-primary-foreground text-xs font-bold">
                  {selectedLocation === 'google-meet' ? 'GM' : selectedLocation === 'zoom' ? '🎥' : '📍'}
                </span>
              </div>
              <span className="text-foreground">
                {locationOptions.find(opt => opt.id === selectedLocation)?.label || 'Select location'}
              </span>
            </div>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </button>
          
          {showLocationDropdown && <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto animate-scale-in">
              {locationOptions.map(option => <div key={option.id}>
                  {option.type === 'header' ? <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide bg-muted/30">
                      {option.label}
                    </div> : <button onClick={() => handleLocationSelect(option.id)} className="w-full flex items-center px-4 py-3 text-left hover:bg-muted transition-colors">
                      <span className="mr-3 text-sm">{option.icon}</span>
                      <span className="text-sm">{option.label}</span>
                    </button>}
                </div>)}
            </div>}
        </div>
        
        {renderLocationDetails()}
        
        <p className="text-sm text-muted-foreground mt-2">
          Can't find the right conferencing app? Visit our{' '}
          <a href="#" className="text-primary hover:text-primary/80 transition-colors">App Store</a>.
        </p>
      </div>
    </div>;
};