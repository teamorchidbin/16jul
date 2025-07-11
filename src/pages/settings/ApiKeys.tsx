
import React from 'react';
import { Button } from '../../components/ui/button';
import { Plus, Link } from 'lucide-react';

export const ApiKeys = () => {
  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">API keys</h1>
          <p className="text-muted-foreground">API keys allow other apps to communicate with OneHash Cal</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
          <Link className="h-10 w-10 text-muted-foreground" />
        </div>
        
        <h2 className="text-xl font-semibold mb-4">Create your first API key</h2>
        
        <p className="text-muted-foreground text-center max-w-md mb-8 leading-relaxed">
          API keys allow other apps to communicate with OneHash Cal
        </p>

        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>
    </div>
  );
};
