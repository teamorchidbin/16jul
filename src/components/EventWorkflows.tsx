import React, { useState } from 'react';
import { Plus, Mail, MessageSquare, Clock } from 'lucide-react';
import { Switch } from './ui/switch';

const workflowTemplates = [{
  id: 'sms-reminder',
  name: 'SMS Reminder - 10 minutes before',
  description: 'Send an SMS reminder to attendees 10 minutes before the meeting starts',
  icon: MessageSquare,
  trigger: 'Before event',
  action: 'Send SMS',
  timing: '10 minutes before'
}, {
  id: 'email-reminder',
  name: 'Email Reminder - 30 minutes before',
  description: 'Send an email reminder to attendees 30 minutes before the meeting starts',
  icon: Mail,
  trigger: 'Before event',
  action: 'Send Email',
  timing: '30 minutes before'
}, {
  id: 'thankyou-email',
  name: 'Thank You Email - After meeting',
  description: 'Send a thank you email to attendees after the meeting ends',
  icon: Mail,
  trigger: 'After event',
  action: 'Send Email',
  timing: 'Immediately after'
}];

export const EventWorkflows = () => {
  const [activeWorkflows, setActiveWorkflows] = useState<string[]>([]);

  const toggleWorkflow = (workflowId: string) => {
    setActiveWorkflows(prev => 
      prev.includes(workflowId) 
        ? prev.filter(id => id !== workflowId) 
        : [...prev, workflowId]
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Available Workflows</h3>
          <button className="flex items-center px-3 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
            <Plus className="h-4 w-4 mr-2" />
            Create Custom Workflow
          </button>
        </div>

        <div className="space-y-3">
          {workflowTemplates.map(workflow => (
            <div 
              key={workflow.id} 
              className={`w-full p-4 border rounded-lg transition-all ${
                activeWorkflows.includes(workflow.id) 
                  ? 'border-[#008c44]/30 bg-[#008c44]/5' 
                  : 'border-border bg-card hover:border-border/60'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activeWorkflows.includes(workflow.id) ? 'bg-[#008c44]/10' : 'bg-muted'
                  }`}>
                    <workflow.icon className={`h-5 w-5 ${
                      activeWorkflows.includes(workflow.id) ? 'text-[#008c44]' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">{workflow.name}</h4>
                    <p className="text-muted-foreground mb-2 text-sm">{workflow.description}</p>
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {workflow.trigger}
                      </span>
                      <span>•</span>
                      <span>{workflow.action}</span>
                      <span>•</span>
                      <span>{workflow.timing}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-sm text-muted-foreground">
                  {activeWorkflows.includes(workflow.id) ? 'Enabled' : 'Disabled'}
                </span>
                <Switch 
                  checked={activeWorkflows.includes(workflow.id)} 
                  onCheckedChange={() => toggleWorkflow(workflow.id)} 
                />
              </div>
            </div>
          ))}
        </div>

        {activeWorkflows.length === 0 && (
          <div className="text-center py-8 bg-muted/20 rounded-lg border border-dashed border-border">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium">No workflows are currently active</p>
            <p className="text-muted-foreground/70 text-sm mt-1">Enable workflows above to automate your event processes</p>
          </div>
        )}
      </div>
    </div>
  );
};
