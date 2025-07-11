
import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Bold, Italic, Link, MoreHorizontal, Plus, Trash2, Info } from 'lucide-react';

export const Profile = () => {
  const [fullName, setFullName] = useState('Sanskar Yadav');
  const [email, setEmail] = useState('sanskarix@gmail.com');
  const [phone, setPhone] = useState('+91');
  const [about, setAbout] = useState('Head of Growth @OneHash | Building the craziest tools on the Internet 🚀');
  const [verificationCode, setVerificationCode] = useState('');

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Profile</h1>
        <p className="text-muted-foreground">Manage settings for your OneHash Cal profile</p>
      </div>

      <div className="space-y-8">
        {/* Profile Picture */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Profile Picture</Label>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              <img 
                src="/lovable-uploads/b849b475-852b-4552-92f1-185302b164ba.png" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
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
            <Input 
              id="username" 
              value="sanskar" 
              className="rounded-l-none"
            />
          </div>
        </div>

        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input 
            id="fullName" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Input 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">Primary</span>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Email
            </Button>
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
              <Select defaultValue="+91">
                <SelectTrigger className="w-20 rounded-r-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+91">🇮🇳 +91</SelectItem>
                  <SelectItem value="+1">🇺🇸 +1</SelectItem>
                  <SelectItem value="+44">🇬🇧 +44</SelectItem>
                </SelectContent>
              </Select>
              <Input 
                id="phone" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-l-none"
              />
            </div>
            <Button variant="outline" className="justify-start">
              Send code
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input 
              placeholder="Verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <Button variant="outline">Verify</Button>
          </div>
        </div>

        {/* About */}
        <div className="space-y-2">
          <Label htmlFor="about">About</Label>
          <div className="border rounded-md">
            <div className="flex items-center space-x-2 p-2 border-b">
              <Button variant="ghost" size="sm">
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
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

        {/* Danger Zone */}
        <div className="mt-12 pt-8 border-t">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-destructive mb-2">Danger zone</h2>
            <p className="text-sm text-muted-foreground">Be careful. Account deletion cannot be undone.</p>
          </div>
          <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete account
          </Button>
        </div>
      </div>
    </div>
  );
};
