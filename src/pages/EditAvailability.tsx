
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { EventAvailability } from '../components/EventAvailability';

export const EditAvailability = () => {
  const { scheduleId } = useParams();
  const navigate = useNavigate();

  const getScheduleName = (id: string) => {
    switch (id) {
      case 'working-hours':
        return 'Working Hours';
      case 'additional-hours':
        return 'Additional hours';
      default:
        return 'Schedule';
    }
  };

  return (
    <div className="px-6 pt-3 pb-6 space-y-4 w-full max-w-full">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/availability')}
          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-foreground">{getScheduleName(scheduleId || '')}</h1>
          <p className="text-muted-foreground">Configure your availability schedule.</p>
        </div>
      </div>

      {/* Availability Component */}
      <EventAvailability />
    </div>
  );
};
