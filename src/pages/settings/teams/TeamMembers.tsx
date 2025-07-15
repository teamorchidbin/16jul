
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Switch } from '../../../components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover';
import { Checkbox } from '../../../components/ui/checkbox';
import { LayoutGrid, Plus, ExternalLink } from 'lucide-react';
import { InviteTeamMemberModal } from '../../../components/InviteTeamMemberModal';

export const TeamMembers = () => {
  const { teamId } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showRoleColumn, setShowRoleColumn] = useState(true);
  const [showLastActiveColumn, setShowLastActiveColumn] = useState(true);
  const [userImpersonation, setUserImpersonation] = useState(true);
  const [makeTeamPrivate, setMakeTeamPrivate] = useState(false);

  const members = [
    {
      id: 1,
      name: 'Sanskar Yadav',
      email: 'sanskarix@gmail.com',
      role: 'OWNER',
      lastActive: '7/15/2025',
      avatar: '/lovable-uploads/b849b475-852b-4552-92f1-185302b164ba.png'
    }
  ];

  const handleMemberAdded = (memberData: any) => {
    console.log('Member added:', memberData);
    // Add logic to handle new member
  };

  return (
    <div className="min-h-screen bg-background flex justify-center animate-fade-in">
      <div className="p-8 max-w-6xl w-full">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold mb-2">Members</h1>
          <p className="text-muted-foreground">Manage your team members and their permissions</p>
        </div>

        {/* Header Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="hover:scale-105 transition-transform duration-200">
                  View <LayoutGrid className="h-4 w-4 ml-2" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 animate-scale-in">
                <div className="space-y-3">
                  <Input placeholder="Search" className="h-8" />
                  <div className="text-sm text-muted-foreground">Toggle columns</div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="role-view" 
                        checked={showRoleColumn}
                        onCheckedChange={(checked) => setShowRoleColumn(checked === true)}
                      />
                      <label htmlFor="role-view" className="text-sm">Role</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="last-active-view" 
                        checked={showLastActiveColumn}
                        onCheckedChange={(checked) => setShowLastActiveColumn(checked === true)}
                      />
                      <label htmlFor="last-active-view" className="text-sm">Last Active</label>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Show all columns
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Button 
            onClick={() => setShowInviteModal(true)}
            className="hover:scale-105 transition-transform duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>

        {/* Members Table */}
        <div className="border rounded-lg overflow-hidden animate-fade-in">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-muted/50 transition-colors">
                <TableHead>Member (1)</TableHead>
                {showRoleColumn && <TableHead>Role</TableHead>}
                {showLastActiveColumn && <TableHead>Last Active</TableHead>}
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id} className="hover:bg-muted/50 transition-colors duration-200">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img 
                        src={member.avatar} 
                        alt={member.name}
                        className="w-8 h-8 rounded-full transition-transform duration-200 hover:scale-110"
                      />
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  {showRoleColumn && (
                    <TableCell>
                      <span className="text-blue-600 font-medium">{member.role}</span>
                    </TableCell>
                  )}
                  {showLastActiveColumn && (
                    <TableCell>{member.lastActive}</TableCell>
                  )}
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="hover:scale-110 transition-transform duration-200"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Settings */}
        <div className="mt-12 space-y-8 animate-fade-in">
          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/20 transition-colors duration-200">
            <div>
              <h3 className="text-base font-medium">User Impersonation</h3>
              <p className="text-sm text-muted-foreground">Allows your team Owners/Admins to temporarily sign in as you.</p>
            </div>
            <Switch 
              checked={userImpersonation}
              onCheckedChange={setUserImpersonation}
              className="transition-all duration-200"
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/20 transition-colors duration-200">
            <div>
              <h3 className="text-base font-medium">Make team private</h3>
              <p className="text-sm text-muted-foreground">Your team members won't be able to see other team members when this is turned on.</p>
            </div>
            <Switch 
              checked={makeTeamPrivate}
              onCheckedChange={setMakeTeamPrivate}
              className="transition-all duration-200"
            />
          </div>
        </div>

        <InviteTeamMemberModal 
          open={showInviteModal}
          onClose={() => setShowInviteModal(false)}
          onMemberAdded={handleMemberAdded}
        />
      </div>
    </div>
  );
};
