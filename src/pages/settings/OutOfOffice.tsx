
import React from 'react';
import { Button } from '../../components/ui/button';
import { Clock, Plus } from 'lucide-react';

export const OutOfOffice = () => {
  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Out of office</h1>
          <p className="text-muted-foreground">Let your bookers know when you're OOO.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
          <Clock className="h-10 w-10 text-muted-foreground" />
        </div>
        
        <h2 className="text-xl font-semibold mb-4">Create an OOO</h2>
        
        <p className="text-muted-foreground text-center max-w-md leading-relaxed">
          Communicate to your bookers when you're not available to take bookings. 
          They can still book you upon your return or you can forward them to a team member.
        </p>
      </div>
    </div>
  );
};
