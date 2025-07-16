
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ArrowLeft, FileText, AlertTriangle, BarChart3 } from 'lucide-react';

export const EditRoutingForm = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [formName, setFormName] = useState('RFFFF');
  const [formDescription, setFormDescription] = useState('hwllUGELBVWufl');
  const [sendEmailToOwner, setSendEmailToOwner] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/routing-forms')}
              className="p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold">{formName}</h1>
              <p className="text-sm text-muted-foreground">hwllUGELBVWufl</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch defaultChecked />
            <Button variant="outline" size="sm">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Button>
            <Button variant="outline" size="sm">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </Button>
            <Button variant="outline" size="sm">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l3-3m-3 3l-3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
            </Button>
            <Button variant="outline" size="sm">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </Button>
            <Button variant="outline" size="sm">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </Button>
            <Button>Save</Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-80 border-r border-border bg-background p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Send Email to Owner</Label>
                <p className="text-sm text-muted-foreground">
                  Sends an email to the owner when the form is submitted
                </p>
              </div>
              <Switch
                checked={sendEmailToOwner}
                onCheckedChange={setSendEmailToOwner}
              />
            </div>
            
            <Button variant="outline" className="w-full">
              Test Preview
            </Button>
            
            {/* Warnings */}
            <div className="space-y-3">
              <div className="flex items-start space-x-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-orange-800">No routes defined</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2 p-3 bg-muted/50 border border-border rounded-lg">
                <BarChart3 className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p>No responses yet</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Tabs defaultValue="form" className="w-full">
            <div className="border-b border-border px-6">
              <TabsList className="bg-transparent">
                <TabsTrigger value="form" className="data-[state=active]:bg-muted">
                  Form
                </TabsTrigger>
                <TabsTrigger value="routing" className="data-[state=active]:bg-muted">
                  Routing
                </TabsTrigger>
                <TabsTrigger value="reporting" className="data-[state=active]:bg-muted">
                  Reporting
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="form" className="mt-0 p-0">
              <div className="flex-1 flex items-center justify-center min-h-[600px]">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <FileText className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Create your first field</h3>
                    <p className="text-muted-foreground mb-6">
                      Fields are the form fields that the booker would see.
                    </p>
                    <Button>Create Field</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="routing" className="mt-0 p-6">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Routing configuration will go here</p>
              </div>
            </TabsContent>
            
            <TabsContent value="reporting" className="mt-0 p-6">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Reporting dashboard will go here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
