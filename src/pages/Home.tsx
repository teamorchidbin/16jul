
import React from 'react';
import { Construction } from 'lucide-react';

export const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-6">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-6 bg-muted/50 rounded-full">
            <Construction className="h-16 w-16 text-muted-foreground" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Coming Soon
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            We're working hard to bring you something amazing. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
};
