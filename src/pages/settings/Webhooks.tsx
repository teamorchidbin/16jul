
import React from 'react';
import { Button } from '../../components/ui/button';
import { Plus, Link } from 'lucide-react';

export const Webhooks = () => {
  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Webhooks</h1>
        <p className="text-muted-foreground">Receive meeting data in real-time when something happens in OneHash Cal</p>
      </div>

      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
          <Link className="h-10 w-10 text-muted-foreground" />
        </div>
        
        <h2 className="text-xl font-semibold mb-4">Create your first Webhook</h2>
        
        <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
          With Webhooks you can receive meeting data in real-time when something happens in OneHash Cal.
        </p>

        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New
        </Button>
      </div>
    </div>
  );
};
