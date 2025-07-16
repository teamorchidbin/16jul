
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowLeft, FileText, AlertTriangle, BarChart3, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { FormFieldModal, FormField } from '../components/FormFieldModal';

export const EditRoutingForm = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [formName, setFormName] = useState('RFFFF');
  const [formDescription, setFormDescription] = useState('hwllUGELBVWufl');
  const [sendEmailToOwner, setSendEmailToOwner] = useState(true);
  const [showFieldModal, setShowFieldModal] = useState(false);
  const [editingField, setEditingField] = useState<FormField | undefined>();
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [routes, setRoutes] = useState<any[]>([]);

  const handleCreateField = () => {
    setEditingField(undefined);
    setShowFieldModal(true);
  };

  const handleEditField = (field: FormField) => {
    setEditingField(field);
    setShowFieldModal(true);
  };

  const handleSaveField = (field: FormField) => {
    if (editingField) {
      setFormFields(prev => prev.map(f => f.id === field.id ? field : f));
    } else {
      setFormFields(prev => [...prev, field]);
    }
    setShowFieldModal(false);
    setEditingField(undefined);
  };

  const handleDeleteField = (fieldId: string) => {
    setFormFields(prev => prev.filter(f => f.id !== fieldId));
  };

  const toggleFieldCollapse = (fieldId: string) => {
    setFormFields(prev => prev.map(f => 
      f.id === fieldId ? { ...f, collapsed: !f.collapsed } : f
    ));
  };

  const handleAddRoute = () => {
    const newRoute = {
      id: `route-${Date.now()}`,
      name: `Route ${routes.length + 1}`,
      conditions: []
    };
    setRoutes(prev => [...prev, newRoute]);
  };

  const comparisonOptions = [
    'Equals',
    'Does not equal',
    'Contains',
    'Not contains',
    'Is empty',
    'Is not empty'
  ];

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
              <div className="p-6">
                {formFields.length === 0 ? (
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
                        <Button onClick={handleCreateField}>Create Field</Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formFields.map((field) => (
                      <div key={field.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            {field.collapsed ? (
                              <div className="flex items-center space-x-4">
                                <span className="font-medium">{field.label || 'Untitled Field'}</span>
                                <span className="text-sm text-muted-foreground">({field.type})</span>
                                {field.required && (
                                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Required</span>
                                )}
                              </div>
                            ) : (
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label>Label</Label>
                                  <Input value={field.label} readOnly />
                                </div>
                                <div className="space-y-2">
                                  <Label>Identifier</Label>
                                  <Input value={field.identifier} readOnly />
                                </div>
                                <div className="space-y-2">
                                  <Label>Type</Label>
                                  <Input value={field.type} readOnly />
                                </div>
                                {field.options && (
                                  <div className="space-y-2">
                                    <Label>Options</Label>
                                    <div className="space-y-1">
                                      {field.options.map((option, index) => (
                                        <div key={index} className="text-sm p-2 bg-muted rounded">
                                          {option}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleFieldCollapse(field.id)}
                            >
                              {field.collapsed ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronUp className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditField(field)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteField(field.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" onClick={handleCreateField} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add field
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="routing" className="mt-0 p-6">
              <div className="space-y-6">
                {routes.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">No routes defined yet</p>
                    <Button onClick={handleAddRoute}>Add Route</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {routes.map((route, index) => (
                      <div key={route.id} className="border rounded-lg p-4 space-y-4">
                        <div className="space-y-2">
                          <Label>Route Name</Label>
                          <Input 
                            value={route.name}
                            onChange={(e) => {
                              const newRoutes = [...routes];
                              newRoutes[index].name = e.target.value;
                              setRoutes(newRoutes);
                            }}
                            placeholder="Enter route name"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>For responses matching the following criteria (matches all by default)</Label>
                          <div className="flex space-x-2">
                            <Select>
                              <SelectTrigger className="w-40">
                                <SelectValue placeholder="Select field" />
                              </SelectTrigger>
                              <SelectContent>
                                {formFields.map(field => (
                                  <SelectItem key={field.id} value={field.identifier}>
                                    {field.label || field.identifier}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            
                            <Select defaultValue="Equals">
                              <SelectTrigger className="w-40">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {comparisonOptions.map(option => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            
                            <Input placeholder="Enter string" className="flex-1" />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" onClick={handleAddRoute} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Route
                    </Button>
                  </div>
                )}
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

      <FormFieldModal
        open={showFieldModal}
        onClose={() => {
          setShowFieldModal(false);
          setEditingField(undefined);
        }}
        onSave={handleSaveField}
        field={editingField}
      />
    </div>
  );
};
