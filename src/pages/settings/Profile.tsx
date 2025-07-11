
import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Bold, Italic, Link, MoreHorizontal, Plus, Trash2, Info } from 'lucide-react';

export const Profile = () => {
  const [fullName, setFullName] = useState('Sanskar Yadav');
  const [emails, setEmails] = useState([
    { email: 'sanskarix@gmail.com', isPrimary: true }
  ]);
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [about, setAbout] = useState('Head of Growth @OneHash | Building the craziest tools on the Internet 🚀');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [isAddEmailOpen, setIsAddEmailOpen] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const countries = [
    { code: '+91', name: '🇮🇳 India' },
    { code: '+1', name: '🇺🇸 USA' },
    { code: '+44', name: '🇬🇧 UK' },
    { code: '+971', name: '🇦🇪 UAE' },
    { code: '+61', name: '🇦🇺 Australia' },
    { code: '+1', name: '🇨🇦 Canada' },
  ];

  const handlePhoneChange = (value: string) => {
    const numbersOnly = value.replace(/\D/g, '');
    if (value !== numbersOnly) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
    setPhone(numbersOnly);
  };

  const handleSendCode = () => {
    if (phone && !phoneError) {
      setIsCodeSent(true);
    }
  };

  const handleAddEmail = () => {
    if (newEmail) {
      setEmails([...emails, { email: newEmail, isPrimary: false }]);
      setNewEmail('');
      setIsAddEmailOpen(false);
    }
  };

  const handleMakePrimary = (index: number) => {
    if (emails.length > 1) {
      const updatedEmails = emails.map((email, i) => ({
        ...email,
        isPrimary: i === index
      }));
      const primaryEmail = updatedEmails.splice(index, 1)[0];
      setEmails([primaryEmail, ...updatedEmails]);
    }
  };

  const handleDeleteEmail = (index: number) => {
    if (emails.length > 1) {
      setEmails(emails.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="p-8 max-w-4xl" style={{ color: '#202124' }}>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Profile</h1>
        <p className="text-muted-foreground">Manage settings for your Cal ID</p>
      </div>

      <div className="space-y-8 mb-12">
        {/* Profile Picture */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Profile Picture</Label>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              <img src="/lovable-uploads/b849b475-852b-4552-92f1-185302b164ba.png" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="space-x-2">
              <Button variant="outline">Upload Avatar</Button>
              <Button variant="outline">Remove</Button>
            </div>
          </div>
        </div>

        {/* Username */}
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <div className="flex">
            <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md text-sm text-muted-foreground">
              cal.id/
            </div>
            <Input id="username" value="sanskar" className="rounded-l-none" />
          </div>
        </div>

        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="space-y-2">
            {emails.map((emailItem, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <Input value={emailItem.email} readOnly />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                    {emailItem.isPrimary && (
                      <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">Primary</span>
                    )}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <div className="space-y-2">
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => handleMakePrimary(index)}
                            disabled={emails.length === 1 || emailItem.isPrimary}
                          >
                            Make Primary
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-destructive"
                            onClick={() => handleDeleteEmail(index)}
                            disabled={emails.length === 1}
                          >
                            Delete
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
            <Dialog open={isAddEmailOpen} onOpenChange={setIsAddEmailOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Email
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Email</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Add an email address to replace your primary or to use as an alternative email on your event types.
                    You may need to log out and back in to see any change take effect.
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="newEmail">Email Address</Label>
                    <Input
                      id="newEmail"
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="Enter email address"
                    />
                  </div>
                  <Button onClick={handleAddEmail} className="w-full">
                    Add
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <div className="flex items-center space-x-1">
            <Label htmlFor="phone">Phone Number</Label>
            <Info className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex">
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="w-32 rounded-r-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name} {country.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className={`rounded-l-none ${phoneError ? 'border-red-500' : ''}`}
                style={phoneError ? { borderColor: '#f1352c' } : {}}
                placeholder="Phone number"
              />
            </div>
            <Button variant="outline" size="sm" onClick={handleSendCode} disabled={!phone || phoneError}>
              Send code
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              disabled={!isCodeSent}
            />
            <Button variant="outline" disabled={!verificationCode}>
              Verify
            </Button>
          </div>
        </div>

        {/* About */}
        <div className="space-y-2">
          <Label htmlFor="about">About</Label>
          <div className="border rounded-md">
            <div className="flex items-center space-x-2 p-2 border-b">
              <Button variant="ghost" size="sm" onClick={() => {
                const textarea = document.getElementById('about') as HTMLTextAreaElement;
                if (textarea) {
                  const start = textarea.selectionStart;
                  const end = textarea.selectionEnd;
                  const selectedText = textarea.value.substring(start, end);
                  const newText = textarea.value.substring(0, start) + `**${selectedText}**` + textarea.value.substring(end);
                  setAbout(newText);
                }
              }}>
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => {
                const textarea = document.getElementById('about') as HTMLTextAreaElement;
                if (textarea) {
                  const start = textarea.selectionStart;
                  const end = textarea.selectionEnd;
                  const selectedText = textarea.value.substring(start, end);
                  const newText = textarea.value.substring(0, start) + `*${selectedText}*` + textarea.value.substring(end);
                  setAbout(newText);
                }
              }}>
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => {
                const textarea = document.getElementById('about') as HTMLTextAreaElement;
                if (textarea) {
                  const start = textarea.selectionStart;
                  const end = textarea.selectionEnd;
                  const selectedText = textarea.value.substring(start, end);
                  const link = prompt('Enter URL:');
                  if (link) {
                    const newText = textarea.value.substring(0, start) + `[${selectedText}](${link})` + textarea.value.substring(end);
                    setAbout(newText);
                  }
                }
              }}>
                <Link className="h-4 w-4" />
              </Button>
            </div>
            <Textarea
              id="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="border-none resize-none"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Danger Zone - Separated */}
      <div className="pt-8 border-t">
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2" style={{ color: '#f1352c' }}>Danger zone</h2>
          <p className="text-sm text-muted-foreground">Be careful. Account deletion cannot be undone.</p>
        </div>
        <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete account
        </Button>
      </div>
    </div>
  );
};
