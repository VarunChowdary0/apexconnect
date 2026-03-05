'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowLeft, ArrowRight, Upload, FileSpreadsheet, Search, Users, Mail, Calendar, Repeat, CircleCheck as CheckCircle, Trash2, Plus } from 'lucide-react';

const steps = [
  { id: 1, name: 'Campaign Name', icon: Users },
  { id: 2, name: 'Data Ingestion', icon: Upload },
  { id: 3, name: 'Leads Review', icon: Users },
  { id: 4, name: 'Prompt Selection', icon: Mail },
  { id: 5, name: 'Email Drafts', icon: Mail },
  { id: 6, name: 'Scheduling', icon: Calendar },
  { id: 7, name: 'Follow-ups', icon: Repeat },
  { id: 8, name: 'Review & Create', icon: CheckCircle },
];

const sampleLeads = [
  {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@techcorp.com',
    title: 'VP of Engineering',
    emailProvider: 'Google',
    company: 'TechCorp',
  },
  {
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.j@startup.io',
    title: 'CEO',
    emailProvider: 'Outlook',
    company: 'StartupIO',
  },
  {
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'mchen@healthplus.com',
    title: 'CTO',
    emailProvider: 'Google',
    company: 'HealthPlus',
  },
];

const samplePrompts = [
  {
    id: 1,
    name: 'Enterprise Outreach',
    text: 'You are a sales development representative reaching out to enterprise decision makers. Write a personalized cold email that references their company\'s recent growth, introduces our solution briefly, asks for a 15-minute call, and keeps it under 100 words.',
  },
  {
    id: 2,
    name: 'SaaS Startup Focus',
    text: 'Write a cold email for SaaS startup founders and CTOs. Focus on technical pain points, our solution\'s technical benefits, social proof from similar startups, and request for a demo.',
  },
  {
    id: 3,
    name: 'Custom Prompt',
    text: '',
  },
];

const mockEmailDrafts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  subject: `Email Draft ${i + 1}: ${[
    'Quick question about {{company}}\'s growth strategy',
    'Partnership opportunity with {{company}}',
    'Helping {{company}} scale efficiently',
    'Brief call about {{company}}\'s initiatives',
    'Solution for {{company}}\'s challenges'
  ][i % 5]}`,
  preview: `Hi {{firstName}}, ${[
    'I noticed {{company}} recently expanded their team...',
    'I wanted to reach out regarding a potential partnership...',
    'We help companies like {{company}} scale their operations...',
    'I hope this email finds you well. I wanted to discuss...',
    'Your recent growth at {{company}} caught my attention...'
  ][i % 5]}`,
  body: `Hi {{firstName}},

${[
  'I noticed {{company}} recently expanded their team - congratulations on the momentum!\n\nI\'m reaching out because we help companies like {{company}} scale their operations efficiently during rapid growth phases. Our platform has helped similar organizations reduce operational overhead by 40% while maintaining quality.\n\nWould you be open to a brief 15-minute call to discuss how this might apply to {{company}}\'s current priorities?',
  'I wanted to reach out regarding a potential partnership opportunity between {{company}} and our company.\n\nWe specialize in helping companies like yours increase their operational efficiency through advanced automation and personalization.\n\nWould you be interested in a brief 15-minute call to discuss how we might be able to help {{company}} achieve its growth goals?',
  'We help companies like {{company}} scale their operations efficiently during rapid growth phases.\n\nOur enterprise platform has helped similar organizations reduce operational overhead by 40% while maintaining quality standards.\n\nWould you have 15 minutes this week for a quick call to explore how this could benefit {{company}}?',
  'I hope this email finds you well. I wanted to discuss how we might be able to help {{company}} with your current growth initiatives.\n\nWe\'ve worked with companies similar to {{company}} and helped them achieve significant efficiency improvements.\n\nWould you be available for a brief call to discuss this further?',
  'Your recent growth at {{company}} caught my attention, and I believe we could help you scale even more efficiently.\n\nOur solution has helped companies in your industry reduce costs while improving performance.\n\nWould you be interested in a 15-minute demo to see how this could work for {{company}}?'
][i % 5]}

Best regards,
John Doe
Enterprise Solutions`
}));

export function CampaignWizardPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDraft, setSelectedDraft] = useState<any>(null);
  const [campaignData, setCampaignData] = useState({
    id: '',
    name: '',
    dataSource: '',
    leads: [] as any[],
    selectedPrompt: '',
    customPrompt: '',
    maxEmailLength: [150], // Default 150 words
    customPromptConfig: null as any,
    emails: [] as any[],
    emailsApproved: false,
    emailDrafts: mockEmailDrafts,
    schedule: {
      startTime: '09:00',
      endTime: '17:00',
      timezone: 'pst',
      activeDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      dailyLimit: 50,
    },
    followups: [] as any[],
  });

  // Restore any saved wizard state (e.g. from SuperSearch 'Use Selected')
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('campaignWizardData');
      const step = sessionStorage.getItem('campaignWizardStep');
      if (saved) {
        const parsed = JSON.parse(saved);
        setCampaignData(prev => ({ ...prev, ...parsed }));
      }
      if (step) {
        const stepNum = parseInt(step, 10);
        if (!Number.isNaN(stepNum)) setCurrentStep(stepNum);
      }
    } catch (e) {
      // ignore parse errors
    }
  }, []);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);
  const [customConfig, setCustomConfig] = useState({
    baseModel: 'gpt-4',
    temperature: [0.7],
    systemMessage: '',
    examples: [] as Array<{ input: string; output: string }>,
    criteria: null as { name: string; description: string; weight: number } | null,
  });

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!campaignData.name.trim()) {
          newErrors.name = 'Campaign name is required';
        } else if (campaignData.name.length < 3) {
          newErrors.name = 'Campaign name must be at least 3 characters';
        }
        break;
      case 2:
        if (!campaignData.dataSource) {
          newErrors.dataSource = 'Please select a data source';
        }
        break;
      case 3:
        if (campaignData.leads.length === 0) {
          newErrors.leads = 'At least one lead is required';
        }
        break;
      case 4:
        if (!campaignData.selectedPrompt) {
          newErrors.prompt = 'Please select a prompt';
        } else if (campaignData.selectedPrompt === 'custom' && !campaignData.customPrompt.trim()) {
          newErrors.customPrompt = 'Custom prompt is required';
        }
        break;
      case 5:
        if (!campaignData.emailsApproved && !selectedDraft) {
          newErrors.emails = 'Please approve the generated emails';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 2 && campaignData.dataSource) {
        // Simulate data ingestion
        setCampaignData(prev => ({ ...prev, leads: sampleLeads }));
      }
      if (currentStep === 4 && campaignData.selectedPrompt) {
        // Simulate email generation
        const generatedEmails = [
          {
            id: 1,
            subject: `Quick question about {{company}}'s growth strategy`,
            body: `Hi {{firstName}},\n\nI noticed {{company}} recently expanded their team - congratulations on the momentum!\n\nI'm reaching out because we help companies like {{company}} scale their operations efficiently during rapid growth phases. Our platform has helped similar organizations reduce operational overhead by 40% while maintaining quality.\n\nWould you be open to a brief 15-minute call to discuss how this might apply to {{company}}'s current priorities?\n\nBest regards,\nJohn Doe`,
          },
        ];
        setCampaignData(prev => ({ ...prev, emails: generatedEmails }));
      }
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setErrors({});
  };

  const handleCreateCampaign = () => {
    // Use a static campaign ID that works with generateStaticParams
    const campaignId = '4'; // Use the last available static ID for new campaigns
    const campaignWithId = { ...campaignData, id: campaignId };
    
    // Here you would typically save the campaign data to your backend
    console.log('Creating campaign:', campaignWithId);
    router.push('/campaigns');
  };

  const handleSuperSearchRedirect = () => {
    // Use a static campaign ID if not exists (for demo purposes with static export)
    const campaignId = campaignData.id || '4'; // Use the last available static ID
    const campaignWithId = { ...campaignData, id: campaignId };
    
    // Store current campaign data in sessionStorage for persistence
    sessionStorage.setItem('campaignWizardData', JSON.stringify(campaignWithId));
    sessionStorage.setItem('campaignWizardStep', currentStep.toString());
    sessionStorage.setItem('campaignIdForRedirect', campaignId);
    router.push('/supersearch?from=campaign-wizard');
  };

  const handleAddExample = () => {
    if (customConfig.examples.length < 5) {
      setCustomConfig(prev => ({
        ...prev,
        examples: [...prev.examples, { input: '', output: '' }]
      }));
    }
  };

  const handleRemoveExample = (index: number) => {
    setCustomConfig(prev => ({
      ...prev,
      examples: prev.examples.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateExample = (index: number, field: 'input' | 'output', value: string) => {
    setCustomConfig(prev => ({
      ...prev,
      examples: prev.examples.map((example, i) => 
        i === index ? { ...example, [field]: value } : example
      )
    }));
  };

  const handleAddCriteria = () => {
    if (!customConfig.criteria) {
      setCustomConfig(prev => ({
        ...prev,
        criteria: { name: '', description: '', weight: 5 }
      }));
    }
  };

  const handleRemoveCriteria = () => {
    setCustomConfig(prev => ({
      ...prev,
      criteria: null
    }));
  };

  const handleSaveCustomConfig = () => {
    const savedConfig = {
      id: Date.now(),
      name: 'Custom Configuration',
      ...customConfig,
      dateCreated: new Date().toLocaleDateString()
    };
    
    setCampaignData(prev => ({
      ...prev,
      customPromptConfig: savedConfig,
      selectedPrompt: 'custom-saved',
      customPrompt: '' // Clear the simple custom prompt when saving config
    }));
    
    // Close the custom prompt configuration panel
    setShowCustomPrompt(false);
    
    // Scroll to top of prompts section
    setTimeout(() => {
      const promptsSection = document.getElementById('prompts-section');
      if (promptsSection) {
        promptsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleDraftSelect = (draft: any) => {
    setSelectedDraft(draft);
  };

  const handleBackToList = () => {
    setSelectedDraft(null);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Campaign Name</CardTitle>
              <CardDescription>Give your campaign a descriptive name</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input
                  id="campaign-name"
                  placeholder="e.g., Q4 Enterprise Outreach"
                  value={campaignData.name}
                  onChange={(e) => setCampaignData(prev => ({ ...prev, name: e.target.value }))}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-destructive mt-1">{errors.name}</p>
                )}
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Data Ingestion</CardTitle>
              <CardDescription>Choose how you want to add leads to your campaign</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  onClick={() => setCampaignData(prev => ({ ...prev, dataSource: 'csv' }))}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-colors ${
                    campaignData.dataSource === 'csv'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-border'
                  }`}
                >
                  <Upload className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-medium mb-2">Upload CSV</h3>
                  <p className="text-sm text-muted-foreground">Upload a CSV file with your leads</p>
                </div>

                <div
                  onClick={() => setCampaignData(prev => ({ ...prev, dataSource: 'sheets' }))}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-colors ${
                    campaignData.dataSource === 'sheets'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-border'
                  }`}
                >
                  <FileSpreadsheet className="h-8 w-8 text-success mb-3" />
                  <h3 className="font-medium mb-2">Google Sheets</h3>
                  <p className="text-sm text-muted-foreground">Connect your Google Sheets</p>
                </div>

                <div
                  onClick={() => setCampaignData(prev => ({ ...prev, dataSource: 'supersearch' }))}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-colors ${
                    campaignData.dataSource === 'supersearch'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-border'
                  }`}
                >
                  <Search className="h-8 w-8 text-chart-3 mb-3" />
                  <h3 className="font-medium mb-2">SuperSearch</h3>
                  <p className="text-sm text-muted-foreground">Use our lead discovery tool</p>
                </div>
              </div>
              {errors.dataSource && (
                <p className="text-sm text-destructive">{errors.dataSource}</p>
              )}
              
              {campaignData.dataSource === 'supersearch' && (
                <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/30">
                  <p className="text-sm text-primary mb-3">
                    Click below to open SuperSearch and select your prospects
                  </p>
                  <Button onClick={handleSuperSearchRedirect} className="w-full">
                    <Search className="w-4 h-4 mr-2" />
                    Open SuperSearch
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Review Leads</CardTitle>
              <CardDescription>Review and manage the leads for your campaign</CardDescription>
            </CardHeader>
            <CardContent>
              {campaignData.leads.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>First Name</TableHead>
                      <TableHead>Last Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Email Provider</TableHead>
                      <TableHead>Company</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaignData.leads.map((lead, index) => (
                      <TableRow key={index}>
                        <TableCell>{lead.firstName}</TableCell>
                        <TableCell>{lead.lastName}</TableCell>
                        <TableCell>{lead.email}</TableCell>
                        <TableCell>{lead.title}</TableCell>
                        <TableCell>{lead.emailProvider}</TableCell>
                        <TableCell>{lead.company}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground/60" />
                  <p className="mt-2 text-sm text-muted-foreground">No leads available</p>
                </div>
              )}
              {errors.leads && (
                <p className="text-sm text-destructive mt-2">{errors.leads}</p>
              )}
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <div id="prompts-section">
              <CardTitle>Select Prompt</CardTitle>
              <CardDescription>Choose or create a prompt to generate your emails</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Show saved custom configuration */}
              {campaignData.customPromptConfig && (
                <div
                  onClick={() => setCampaignData(prev => ({ ...prev, selectedPrompt: 'custom-saved' }))}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors mb-4 ${
                    campaignData.selectedPrompt === 'custom-saved' ? 'border-primary bg-primary/10' : 'border-border hover:border-border'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className={`h-5 w-5 ${campaignData.selectedPrompt === 'custom-saved' ? 'text-primary' : 'text-muted-foreground'}`} />
                      <h3 className={`font-medium ${campaignData.selectedPrompt === 'custom-saved' ? 'text-primary' : 'text-foreground'}`}>Custom Configuration</h3>
                    </div>
                    <Badge className={campaignData.selectedPrompt === 'custom-saved' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}>
                      {campaignData.customPromptConfig.dateCreated}
                    </Badge>
                  </div>
                  <div className={`text-sm space-y-1 ${campaignData.selectedPrompt === 'custom-saved' ? 'text-primary' : 'text-muted-foreground'}`}>
                    <p><strong>Model:</strong> {campaignData.customPromptConfig.baseModel}</p>
                    <p><strong>Temperature:</strong> {campaignData.customPromptConfig.temperature[0]}</p>
                    <p><strong>Examples:</strong> {campaignData.customPromptConfig.examples.length}</p>
                    {campaignData.customPromptConfig.criteria && (
                      <p><strong>Criteria:</strong> {campaignData.customPromptConfig.criteria.name}</p>
                    )}
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="select-custom-config"
                        checked={campaignData.selectedPrompt === 'custom-saved'}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setCampaignData(prev => ({ ...prev, selectedPrompt: 'custom-saved' }));
                          }
                        }}
                      />
                      <label htmlFor="select-custom-config" className={`text-sm font-medium cursor-pointer ${campaignData.selectedPrompt === 'custom-saved' ? 'text-primary' : 'text-foreground'}`}>
                        Use this custom configuration
                      </label>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-3">
                {samplePrompts.map((prompt) => (
                  <div
                    key={prompt.id}
                    onClick={() => setCampaignData(prev => ({ 
                      ...prev, 
                      selectedPrompt: prompt.id === 3 ? 'custom' : prompt.id.toString()
                    }))}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      (prompt.id === 3 && campaignData.selectedPrompt === 'custom') ||
                      (prompt.id !== 3 && campaignData.selectedPrompt === prompt.id.toString())
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-border'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={
                          (prompt.id === 3 && campaignData.selectedPrompt === 'custom') ||
                          (prompt.id !== 3 && campaignData.selectedPrompt === prompt.id.toString())
                        }
                        onChange={() => {}}
                      />
                      <div className="flex-1">
                        <h3 className="font-medium mb-2">{prompt.name}</h3>
                        {prompt.id !== 3 && (
                          <p className="text-sm text-muted-foreground">{prompt.text}</p>
                        )}
                        {prompt.id === 3 && (
                          <p className="text-sm text-muted-foreground">Create your own custom prompt configuration</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {campaignData.selectedPrompt === 'custom' && !showCustomPrompt && (
                <div className="mt-4">
                  <Button onClick={() => setShowCustomPrompt(true)} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Configure Custom Prompt
                  </Button>
                </div>
              )}

              {campaignData.selectedPrompt === 'custom' && showCustomPrompt && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Configure Custom Prompt</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Base Model */}
                    <div>
                      <Label className="text-sm font-medium">Base Model</Label>
                      <Select 
                        value={customConfig.baseModel} 
                        onValueChange={(value) => setCustomConfig(prev => ({ ...prev, baseModel: value }))}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt-mini">GPT-mini</SelectItem>
                          <SelectItem value="gpt-4">GPT-4</SelectItem>
                          <SelectItem value="gpt-5">GPT-5</SelectItem>
                          <SelectItem value="claude-3">Claude-3</SelectItem>
                          <SelectItem value="claude-4">Claude-4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Temperature */}
                    <div>
                      <Label className="text-sm font-medium">Temperature: {customConfig.temperature[0]}</Label>
                      <Slider
                        value={customConfig.temperature}
                        onValueChange={(value) => setCustomConfig(prev => ({ ...prev, temperature: value }))}
                        max={2}
                        min={0}
                        step={0.1}
                        className="mt-2"
                      />
                    </div>

                    {/* System Message */}
                    <div>
                      <Label className="text-sm font-medium">System Message</Label>
                      <Textarea
                        placeholder="Enter your system prompt instructions..."
                        value={customConfig.systemMessage}
                        onChange={(e) => setCustomConfig(prev => ({ ...prev, systemMessage: e.target.value }))}
                        className="mt-1 min-h-24"
                      />
                    </div>

                    {/* Few-Shot Examples */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-sm font-medium">Few-Shot Examples</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleAddExample}
                          disabled={customConfig.examples.length >= 5}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Example
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        {customConfig.examples.map((example, index) => (
                          <div key={index} className="p-4 border rounded-lg bg-muted">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-medium">Example {index + 1}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveExample(index)}
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-xs text-muted-foreground">Input</Label>
                                <Textarea
                                  placeholder="Example input..."
                                  value={example.input}
                                  onChange={(e) => handleUpdateExample(index, 'input', e.target.value)}
                                  className="mt-1 min-h-20"
                                />
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">Output</Label>
                                <Textarea
                                  placeholder="Expected output..."
                                  value={example.output}
                                  onChange={(e) => handleUpdateExample(index, 'output', e.target.value)}
                                  className="mt-1 min-h-20"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Evaluation Criteria */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-sm font-medium">Evaluation Criteria</Label>
                        {!customConfig.criteria && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleAddCriteria}
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Criteria
                          </Button>
                        )}
                      </div>
                      
                      {customConfig.criteria && (
                        <div className="p-4 border rounded-lg bg-muted">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium">Evaluation Criteria</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={handleRemoveCriteria}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <Label className="text-xs text-muted-foreground">Name</Label>
                              <Input
                                placeholder="Criteria name..."
                                value={customConfig.criteria.name}
                                onChange={(e) => setCustomConfig(prev => ({
                                  ...prev,
                                  criteria: prev.criteria ? { ...prev.criteria, name: e.target.value } : null
                                }))}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Description</Label>
                              <Textarea
                                placeholder="Criteria description..."
                                value={customConfig.criteria.description}
                                onChange={(e) => setCustomConfig(prev => ({
                                  ...prev,
                                  criteria: prev.criteria ? { ...prev.criteria, description: e.target.value } : null
                                }))}
                                className="mt-1 min-h-16"
                              />
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Weight: {customConfig.criteria.weight}</Label>
                              <Slider
                                value={[customConfig.criteria.weight]}
                                onValueChange={(value) => setCustomConfig(prev => ({
                                  ...prev,
                                  criteria: prev.criteria ? { ...prev.criteria, weight: value[0] } : null
                                }))}
                                max={10}
                                min={1}
                                step={1}
                                className="mt-2"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Save Configuration */}
                    <div className="pt-4 border-t">
                      <Button onClick={handleSaveCustomConfig} className="w-full">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Save Configuration
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {campaignData.selectedPrompt === 'custom' && !showCustomPrompt && (
                <div>
                  <Textarea
                    id="custom-prompt"
                    value={campaignData.customPrompt}
                    onChange={(e) => setCampaignData(prev => ({ ...prev, customPrompt: e.target.value }))}
                    className={`min-h-32 ${errors.customPrompt ? 'border-destructive' : ''}`}
                  />
                  {errors.customPrompt && (
                    <p className="text-sm text-destructive mt-1">{errors.customPrompt}</p>
                  )}
                </div>
              )}

              {errors.prompt && (
                <p className="text-sm text-destructive">{errors.prompt}</p>
              )}

              {/* Maximum Email Length */}
              <div className="mt-6 pt-6 border-t">
                <Label className="text-sm font-medium mb-3 block">
                  Maximum Email Length: {campaignData.maxEmailLength[0]} words
                </Label>
                <Slider
                  value={campaignData.maxEmailLength}
                  onValueChange={(value) => setCampaignData(prev => ({ ...prev, maxEmailLength: value }))}
                  max={300}
                  min={50}
                  step={10}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>50 words</span>
                  <span>300 words</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <div className={`grid gap-6 ${selectedDraft ? 'grid-cols-3' : 'grid-cols-1'}`}>
            {/* Email Drafts List */}
            <div className={selectedDraft ? 'col-span-1' : 'col-span-1'}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Email Drafts ({campaignData.emailDrafts.length})</CardTitle>
                      <CardDescription>Generated email drafts for your campaign</CardDescription>
                    </div>
                    {selectedDraft && (
                      <Button variant="outline" size="sm" onClick={handleBackToList}>
                        Back to List
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {campaignData.emailDrafts.map((draft) => (
                      <div
                        key={draft.id}
                        onClick={() => handleDraftSelect(draft)}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-muted ${
                          selectedDraft?.id === draft.id ? 'border-primary bg-primary/10' : 'border-border'
                        }`}
                      >
                        <div className="font-medium text-sm mb-1 truncate">
                          {draft.subject}
                        </div>
                        <div className="text-xs text-muted-foreground line-clamp-2">
                          {draft.preview}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Selected Draft Details */}
            {selectedDraft && (
              <div className="col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Draft Details</CardTitle>
                    <CardDescription>Review the selected email draft</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Subject</Label>
                      <div className="mt-1 p-3 bg-muted rounded border">
                        {selectedDraft.subject}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium">Email Body</Label>
                      <div className="mt-1 p-4 bg-muted rounded border max-h-64 overflow-y-auto">
                        <pre className="text-sm whitespace-pre-wrap font-sans">
                          {selectedDraft.body}
                        </pre>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-4 border-t">
                      <Checkbox
                        id="approve-emails"
                        checked={campaignData.emailsApproved}
                        onCheckedChange={(checked) => 
                          setCampaignData(prev => ({ ...prev, emailsApproved: !!checked }))
                        }
                      />
                      <Label htmlFor="approve-emails" className="text-sm">
                        I approve these email drafts and want to proceed
                      </Label>
                    </div>

                    {errors.emails && (
                      <p className="text-sm text-destructive">{errors.emails}</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Campaign Schedule</CardTitle>
              <CardDescription>Configure when your emails will be sent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium mb-3 block">Sending Hours</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="start-time" className="text-xs text-muted-foreground">Start Time</Label>
                      <Select 
                        value={campaignData.schedule.startTime}
                        onValueChange={(value) => 
                          setCampaignData(prev => ({ 
                            ...prev, 
                            schedule: { ...prev.schedule, startTime: value }
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="08:00">8:00 AM</SelectItem>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="end-time" className="text-xs text-muted-foreground">End Time</Label>
                      <Select 
                        value={campaignData.schedule.endTime}
                        onValueChange={(value) => 
                          setCampaignData(prev => ({ 
                            ...prev, 
                            schedule: { ...prev.schedule, endTime: value }
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15:00">3:00 PM</SelectItem>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                          <SelectItem value="17:00">5:00 PM</SelectItem>
                          <SelectItem value="18:00">6:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-3 block">Timezone</Label>
                  <Select 
                    value={campaignData.schedule.timezone}
                    onValueChange={(value) => 
                      setCampaignData(prev => ({ 
                        ...prev, 
                        schedule: { ...prev.schedule, timezone: value }
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pst">Pacific Standard Time</SelectItem>
                      <SelectItem value="est">Eastern Standard Time</SelectItem>
                      <SelectItem value="cst">Central Standard Time</SelectItem>
                      <SelectItem value="mst">Mountain Standard Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">Active Days</Label>
                <div className="flex space-x-4">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox 
                        id={day} 
                        checked={campaignData.schedule.activeDays.includes(day)}
                        onCheckedChange={(checked) => {
                          setCampaignData(prev => ({
                            ...prev,
                            schedule: {
                              ...prev.schedule,
                              activeDays: checked
                                ? [...prev.schedule.activeDays, day]
                                : prev.schedule.activeDays.filter(d => d !== day)
                            }
                          }));
                        }}
                      />
                      <Label htmlFor={day} className="text-sm">{day}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">Daily Send Limit</Label>
                <Input 
                  type="number" 
                  value={campaignData.schedule.dailyLimit} 
                  onChange={(e) => 
                    setCampaignData(prev => ({ 
                      ...prev, 
                      schedule: { ...prev.schedule, dailyLimit: parseInt(e.target.value) || 50 }
                    }))
                  }
                  className="w-32" 
                />
              </div>
            </CardContent>
          </Card>
        );

      case 7:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Follow-up Sequence</CardTitle>
              <CardDescription>Add follow-up emails to increase response rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaignData.followups.map((followup, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Step {index + 1}</h3>
                      <Badge variant="outline">
                        {followup.delay} {followup.delayUnit} after previous
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium">Subject</Label>
                        <div className="mt-1 p-2 bg-muted rounded border text-sm">
                          {followup.subject}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Email Body</Label>
                        <div className="mt-1 p-3 bg-muted rounded border">
                          <pre className="text-sm whitespace-pre-wrap font-sans">
                            {followup.body}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {campaignData.followups.length === 0 && (
                  <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
                    <Repeat className="mx-auto h-8 w-8 text-muted-foreground/60" />
                    <p className="mt-2 text-sm text-muted-foreground">No follow-up steps added</p>
                    <p className="text-xs text-muted-foreground/60">You can add follow-ups later</p>
                  </div>
                )}

                <Button
                  variant="outline"
                  onClick={() => {
                    const newFollowup = {
                      subject: 'Following up on our conversation',
                      body: `Hi {{firstName}},\n\nI wanted to follow up on my previous email about helping {{company}} with your growth initiatives.\n\nWould you have 15 minutes this week for a quick call?\n\nBest regards,\nJohn Doe`,
                      delay: 3,
                      delayUnit: 'days',
                    };
                    setCampaignData(prev => ({
                      ...prev,
                      followups: [...prev.followups, newFollowup]
                    }));
                  }}
                >
                  Add Follow-up Step
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 8:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Review & Create Campaign</CardTitle>
              <CardDescription>Review your campaign settings before creating</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Campaign Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span>{campaignData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Data Source:</span>
                      <span className="capitalize">{campaignData.dataSource}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Leads:</span>
                      <span>{campaignData.leads.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Emails:</span>
                      <span>{campaignData.emails.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Follow-ups:</span>
                      <span>{campaignData.followups.length}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Schedule</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Hours:</span>
                      <span>{campaignData.schedule.startTime} - {campaignData.schedule.endTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Timezone:</span>
                      <span className="uppercase">{campaignData.schedule.timezone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Active Days:</span>
                      <span>{campaignData.schedule.activeDays.length} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Daily Limit:</span>
                      <span>{campaignData.schedule.dailyLimit} emails</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button onClick={handleCreateCampaign} className="w-full" size="lg">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Create Campaign
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Create New Campaign</h1>
          <p className="text-muted-foreground">Step-by-step campaign creation wizard</p>
        </div>
        <Button variant="outline" onClick={() => router.push('/campaigns')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Campaigns
        </Button>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round((currentStep / steps.length) * 100)}% Complete
            </span>
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="mb-6" />
          
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= step.id
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'border-border text-muted-foreground/60'
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <span className={`text-xs mt-2 text-center ${
                  currentStep >= step.id ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      {renderStepContent()}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {currentStep < steps.length && (
          <Button onClick={handleNext}>
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}