
import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { MoreHorizontal, Bold, Italic, Link, Upload, Trash2 } from 'lucide-react';

const countryCodes = [
  { country: 'India', code: '+91' },
  { country: 'United States', code: '+1' },
  { country: 'United Kingdom', code: '+44' },
  { country: 'United Arab Emirates', code: '+971' },
  { country: 'Canada', code: '+1' },
  { country: 'Australia', code: '+61' },
];

export const Profile = () => {
  const [emails, setEmails] = useState([
    { email: 'sanskarix@gmail.com', isPrimary: true },
  ]);
  const [showAddEmail, setShowAddEmail] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [about, setAbout] = useState('');

  const selectedCountryCode = countryCodes.find(c => c.country === selectedCountry)?.code || '+91';

  const handlePhoneChange = (value: string) => {
    const numbersOnly = value.replace(/\D/g, '');
    if (value !== numbersOnly) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
      setPhoneNumber(numbersOnly);
    }
  };

  const handleSendCode = () => {
    if (phoneNumber && !phoneError) {
      setCodeSent(true);
    }
  };

  const handleMakePrimary = (emailToMakePrimary: string) => {
    setEmails(emails.map(e => ({
      ...e,
      isPrimary: e.email === emailToMakePrimary
    })).sort((a, b) => b.isPrimary ? 1 : -1));
  };

  const handleDeleteEmail = (emailToDelete: string) => {
    if (emails.length > 1) {
      setEmails(emails.filter(e => e.email !== emailToDelete));
    }
  };

  const handleAddEmail = () => {
    if (newEmail) {
      setEmails([...emails, { email: newEmail, isPrimary: false }]);
      setNewEmail('');
      setShowAddEmail(false);
    }
  };

  const insertFormatting = (tag: string) => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = about.substring(start, end);
    
    let formattedText = '';
    switch (tag) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'link':
        formattedText = `[${selectedText}](url)`;
        break;
      default:
        formattedText = selectedText;
    }
    
    const newText = about.substring(0, start) + formattedText + about.substring(end);
    setAbout(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 0);
  };

  return (
    <div className="p-8 max-w-4xl" style={{ color: '#202124' }}>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Profile</h1>
        <p className="text-muted-foreground">Manage settings for your Cal.com profile</p>
      </div>

      <div className="space-y-8">
        {/* Profile Information */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Full name</Label>
            <Input defaultValue="Sanskar Yadav" />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <div className="space-y-2">
              {emails.map((emailObj, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="flex-1 flex items-center space-x-2">
                    <Input value={emailObj.email} readOnly />
                    {emailObj.isPrimary && (
                      <span className="text-xs bg-muted px-2 py-1 rounded">Primary</span>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem
                        onClick={() => handleMakePrimary(emailObj.email)}
                        disabled={emailObj.isPrimary || emails.length === 1}
                        className={emailObj.isPrimary || emails.length === 1 ? 'opacity-50' : ''}
                      >
                        Make Primary
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteEmail(emailObj.email)}
                        disabled={emails.length === 1}
                        className={emails.length === 1 ? 'opacity-50' : ''}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
              <Button variant="outline" onClick={() => setShowAddEmail(true)}>
                Add Email
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>About</Label>
            <div className="space-y-2">
              <div className="flex space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => insertFormatting('bold')}
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => insertFormatting('italic')}
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => insertFormatting('link')}
                >
                  <Link className="h-4 w-4" />
                </Button>
              </div>
              <textarea
                className="w-full min-h-[100px] p-3 border border-input rounded-md resize-none"
                placeholder="A little something about yourself"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Country</Label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countryCodes.map((country) => (
                    <SelectItem key={country.country} value={country.country}>
                      {country.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Phone Number</Label>
              <div className="flex space-x-2">
                <div className="flex-1 flex">
                  <div className="px-3 py-2 bg-muted border border-r-0 rounded-l-md text-sm">
                    {selectedCountryCode}
                  </div>
                  <Input
                    className={`rounded-l-none ${phoneError ? 'border-red-500' : ''}`}
                    placeholder="Phone number"
                    value={phoneNumber}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSendCode}
                  disabled={!phoneNumber || phoneError}
                >
                  Send code
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Verification Code</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                disabled={!codeSent}
              />
              <Button 
                disabled={!verificationCode || !codeSent}
              >
                Verify
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Avatar</Label>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                SY
              </div>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="border-t pt-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-4">Danger Zone</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-red-700">Delete Account</h4>
                  <p className="text-sm text-red-600">Permanently delete your account and all associated data</p>
                </div>
                <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Email Dialog */}
      <Dialog open={showAddEmail} onOpenChange={setShowAddEmail}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Email</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Add an email address to replace your primary or to use as an alternative email on your event types
            </p>
            <p className="text-sm text-muted-foreground">
              You may need to log out and back in to see any change take effect.
            </p>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input
                placeholder="Enter email address"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setShowAddEmail(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEmail}>
                Add
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
