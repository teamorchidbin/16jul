
import React from 'react';

export const Profile = () => {
  return (
    <div className="p-8">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold mb-2">Profile</h1>
        <p className="text-muted-foreground mb-6">Manage your public profile information.</p>
        
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                defaultValue="Sanskar Yadav"
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                defaultValue="sanskar@example.com"
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                rows={3}
                placeholder="Tell us about yourself..."
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              />
            </div>
            
            <div className="pt-4">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
