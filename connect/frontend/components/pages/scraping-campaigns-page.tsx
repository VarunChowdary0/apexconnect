'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Plus,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  CheckCircle,
  Copy,
  ExternalLink,
  Clock,
  Database,
  Mail,
  Search,
  X,
  Play,
  Pause,
  Trash2,
  Edit,
  Calendar,
  MapPin,
  Building,
  User,
  Filter,
  Eye,
  Settings,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const steps = [
  { id: 1, name: 'Campaign Basics', description: 'Name your campaign' },
  { id: 2, name: 'Select Portal', description: 'Choose job portal' },
  { id: 3, name: 'Filters', description: 'Set search criteria' },
  { id: 4, name: 'Scheduling', description: 'Configure automation' },
  { id: 4.5, name: 'Scraping', description: 'Fetching data' },
  { id: 5, name: 'Job Listings', description: 'Review scraped jobs' },
  { id: 6, name: 'People Data', description: 'Apollo enrichment' },
  { id: 7, name: 'Email Verification', description: 'Verify contacts' },
  { id: 8, name: 'Summary', description: 'Campaign complete' },
];

const jobPortals = [
  { id: 'linkedin', name: 'LinkedIn', logo: '💼', color: 'bg-primary/10 border-primary/30' },
  { id: 'naukri', name: 'Naukri', logo: '🔍', color: 'bg-chart-3/10 border-chart-3/30' },
  { id: 'indeed', name: 'Indeed', logo: '📋', color: 'bg-success/10 border-success/30' },
  { id: 'glassdoor', name: 'Glassdoor', logo: '🏢', color: 'bg-warning/10 border-warning/30' },
  { id: 'wellfound', name: 'Wellfound', logo: '🚀', color: 'bg-destructive/10 border-destructive/30' },
];

const jobRoleOptions = [
  'Software Engineer', 'Full Stack Developer', 'Frontend Developer', 'Backend Developer',
  'DevOps Engineer', 'Data Scientist', 'Product Manager', 'UI/UX Designer',
  'Marketing Manager', 'Sales Manager', 'Business Analyst', 'Project Manager'
];

const industryOptions = [
  'Technology', 'SaaS', 'Fintech', 'E-commerce', 'Healthcare', 'Education',
  'Manufacturing', 'Consulting', 'Media', 'Real Estate', 'Automotive', 'Gaming'
];

const locationOptions = [
  'Bangalore, India', 'Mumbai, India', 'Delhi, India', 'Hyderabad, India',
  'Chennai, India', 'Pune, India', 'New York, NY', 'San Francisco, CA',
  'London, UK', 'Toronto, Canada', 'Sydney, Australia', 'Remote'
];

const mockJobListings = [
  {
    id: 1,
    jobTitle: 'Senior Software Engineer',
    company: 'TechCorp Solutions',
    location: 'Bangalore, India',
    datePosted: '2024-03-20',
  },
  {
    id: 2,
    jobTitle: 'Full Stack Developer',
    company: 'StartupIO',
    location: 'Mumbai, India',
    datePosted: '2024-03-19',
  },
  {
    id: 3,
    jobTitle: 'React Developer',
    company: 'InnovateLabs',
    location: 'Delhi, India',
    datePosted: '2024-03-18',
  },
];

const mockPeopleData = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Engineering Manager',
    email: 'rajesh.kumar@techcorp.com',
    linkedinProfile: 'https://linkedin.com/in/rajeshkumar',
    emailVerified: null,
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'CTO',
    email: 'priya@startupio.com',
    linkedinProfile: 'https://linkedin.com/in/priyasharma',
    emailVerified: null,
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'VP Engineering',
    email: 'amit.patel@innovatelabs.com',
    linkedinProfile: 'https://linkedin.com/in/amitpatel',
    emailVerified: null,
  },
];

const mockExistingCampaigns = [
  {
    id: 1,
    name: 'Tech Startups - Software Engineers',
    status: 'Running',
    portal: 'linkedin',
    frequency: 'daily',
    schedule: 'Every day at 9:00 AM',
    totalLeads: 247,
    lastRun: '2024-03-20 09:00',
    nextRun: '2024-03-21 09:00',
  },
  {
    id: 2,
    name: 'Marketing Managers - E-commerce',
    status: 'Scheduled',
    portal: 'indeed',
    frequency: 'weekly',
    schedule: 'Every Monday at 10:00 AM',
    totalLeads: 0,
    lastRun: null,
    nextRun: '2024-03-22 10:00',
  },
  {
    id: 3,
    name: 'Healthcare Professionals - Remote',
    status: 'Completed',
    portal: 'glassdoor',
    frequency: 'once',
    schedule: 'Completed on March 15, 2024',
    totalLeads: 156,
    lastRun: '2024-03-15 14:30',
    nextRun: null,
  },
];

// Mock detailed campaign data
const mockCampaignDetails = {
  1: {
    ...mockExistingCampaigns[0],
    filters: {
      jobRoles: ['Software Engineer', 'Full Stack Developer', 'Backend Developer'],
      industries: ['Technology', 'SaaS', 'Fintech'],
      locations: ['Bangalore, India', 'Mumbai, India', 'Remote'],
      dateFilter: 'last-7-days',
      experienceLevel: 'Mid-Senior',
    },
    jobListings: [
      { id: 1, title: 'Senior Software Engineer', company: 'TechCorp Solutions', location: 'Bangalore, India', datePosted: '2024-03-20' },
      { id: 2, title: 'Full Stack Developer', company: 'StartupIO', location: 'Mumbai, India', datePosted: '2024-03-19' },
      { id: 3, title: 'Backend Developer', company: 'InnovateLabs', location: 'Remote', datePosted: '2024-03-18' },
    ],
    peopleData: [
      { id: 1, name: 'Rajesh Kumar', role: 'Engineering Manager', email: 'rajesh.kumar@techcorp.com', company: 'TechCorp Solutions', linkedinProfile: 'https://linkedin.com/in/rajeshkumar' },
      { id: 2, name: 'Priya Sharma', role: 'CTO', email: 'priya@startupio.com', company: 'StartupIO', linkedinProfile: 'https://linkedin.com/in/priyasharma' },
      { id: 3, name: 'Amit Patel', role: 'VP Engineering', email: 'amit.patel@innovatelabs.com', company: 'InnovateLabs', linkedinProfile: 'https://linkedin.com/in/amitpatel' },
    ],
  },
  2: {
    ...mockExistingCampaigns[1],
    filters: {
      jobRoles: ['Marketing Manager', 'Digital Marketing Specialist'],
      industries: ['E-commerce', 'Retail', 'Consumer Goods'],
      locations: ['Delhi, India', 'Pune, India'],
      dateFilter: 'last-30-days',
      experienceLevel: 'Mid-Level',
    },
    jobListings: [],
    peopleData: [],
  },
  3: {
    ...mockExistingCampaigns[2],
    filters: {
      jobRoles: ['Healthcare Administrator', 'Medical Director'],
      industries: ['Healthcare', 'Medical Devices'],
      locations: ['Remote', 'New York, NY'],
      dateFilter: 'last-14-days',
      experienceLevel: 'Senior',
    },
    jobListings: [
      { id: 1, title: 'Healthcare Administrator', company: 'MedTech Solutions', location: 'Remote', datePosted: '2024-03-15' },
      { id: 2, title: 'Medical Director', company: 'HealthCare Plus', location: 'New York, NY', datePosted: '2024-03-14' },
    ],
    peopleData: [
      { id: 1, name: 'Dr. Sarah Wilson', role: 'Medical Director', email: 'sarah.wilson@medtech.com', company: 'MedTech Solutions', linkedinProfile: 'https://linkedin.com/in/sarahwilson' },
      { id: 2, name: 'Michael Johnson', role: 'Healthcare Administrator', email: 'mjohnson@healthcareplus.com', company: 'HealthCare Plus', linkedinProfile: 'https://linkedin.com/in/michaeljohnson' },
    ],
  }
};

export function ScrapingCampaignsPage() {
  const router = useRouter();
  const [showWizard, setShowWizard] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeople, setSelectedPeople] = useState<Set<number>>(new Set());
  const [peopleSearchTerm, setPeopleSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('filters');
  const [showEditScheduleModal, setShowEditScheduleModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState({
    frequency: '',
    time: '',
    timezone: 'UTC'
  });
  const [campaignData, setCampaignData] = useState({
    name: '',
    portal: '',
    jobRoles: [] as string[],
    industries: [] as string[],
    locations: [] as string[],
    frequency: '',
    jobsNeeded: 50,
    dateFilter: 'last-7-days',
    startTime: '09:00',
    timezone: 'IST',
    jobListings: [] as any[],
    apolloUrl: '',
    peopleData: [] as any[],
    emailVerificationComplete: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchInputs, setSearchInputs] = useState({
    jobRole: '',
    industry: '',
    location: '',
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
        if (!campaignData.portal) {
          newErrors.portal = 'Please select a job portal';
        }
        break;
      case 4:
        if (!campaignData.frequency) {
          newErrors.frequency = 'Please select a frequency';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 4) {
        // Start scraping process
        setIsLoading(true);
        setCurrentStep(4.5);
        
        // Simulate scraping for 3 seconds
        setTimeout(() => {
          setCampaignData(prev => ({ ...prev, jobListings: mockJobListings }));
          setIsLoading(false);
          setCurrentStep(5);
        }, 3000);
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 4.5) {
      setCurrentStep(4);
    } else {
      setCurrentStep(prev => Math.max(prev - 1, 1));
    }
    setErrors({});
  };

  const handleStepClick = (stepId: number) => {
    if (stepId !== 4.5 && stepId <= currentStep) {
      setCurrentStep(stepId);
      setErrors({});
    }
  };

  const handleMultiSelectAdd = (field: 'jobRoles' | 'industries' | 'locations', value: string) => {
    if (value && !campaignData[field].includes(value)) {
      setCampaignData(prev => ({
        ...prev,
        [field]: [...prev[field], value]
      }));
      setSearchInputs(prev => ({ ...prev, [field.slice(0, -1)]: '' }));
    }
  };

  const handleMultiSelectRemove = (field: 'jobRoles' | 'industries' | 'locations', value: string) => {
    setCampaignData(prev => ({
      ...prev,
      [field]: prev[field].filter(item => item !== value)
    }));
  };

  const handleCopyJobList = () => {
    const jobListText = campaignData.jobListings
      .map(job => `${job.jobTitle} - ${job.company} - ${job.location} - ${job.datePosted}`)
      .join('\n');
    navigator.clipboard.writeText(jobListText);
  };

  const handleApolloEnrichment = () => {
    if (!campaignData.apolloUrl.trim()) {
      setErrors({ apollo: 'Please enter a valid Apollo.io URL' });
      return;
    }
    
    setCampaignData(prev => ({ ...prev, peopleData: mockPeopleData }));
    setErrors({});
  };

  const handleEmailVerification = () => {
    const verifiedPeople = campaignData.peopleData.map(person => ({
      ...person,
      emailVerified: Math.random() > 0.3 // 70% success rate
    }));
    
    setCampaignData(prev => ({ 
      ...prev, 
      peopleData: verifiedPeople,
      emailVerificationComplete: true 
    }));
  };

  const handleFinishCampaign = () => {
    setShowWizard(false);
    setCampaignData({
      name: '',
      portal: '',
      jobRoles: [],
      industries: [],
      locations: [],
      frequency: '',
      jobsNeeded: 50,
      dateFilter: 'last-7-days',
      startTime: '09:00',
      timezone: 'IST',
      jobListings: [],
      apolloUrl: '',
      peopleData: [],
      emailVerificationComplete: false,
    });
    setCurrentStep(1);
  };

  const getPortalInfo = (portalId: string) => {
    return jobPortals.find(p => p.id === portalId);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Running':
        return <Badge className="bg-success/10 text-success">Running</Badge>;
      case 'Scheduled':
        return <Badge className="bg-primary/10 text-primary">Scheduled</Badge>;
      case 'Completed':
        return <Badge className="bg-muted text-muted-foreground">Completed</Badge>;
      case 'Paused':
        return <Badge variant="secondary">Paused</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredOptions = (field: 'jobRole' | 'industry' | 'location') => {
    const searchTerm = searchInputs[field].toLowerCase();
    const options = field === 'jobRole' ? jobRoleOptions : 
                   field === 'industry' ? industryOptions : locationOptions;
    return options.filter(option => option.toLowerCase().includes(searchTerm));
  };

  const handleCampaignClick = (campaignId: number) => {
    const campaignDetails = mockCampaignDetails[campaignId as keyof typeof mockCampaignDetails];
    if (campaignDetails) {
      setSelectedCampaign(campaignDetails);
    }
  };

  const handleBackToCampaigns = () => {
    setSelectedCampaign(null);
    setSelectedPeople(new Set());
    setPeopleSearchTerm('');
    setActiveTab('filters');
  };

  const handleDumpToSuperSearch = () => {
    const selectedPeopleData = selectedPeople.size > 0 
      ? selectedCampaign.peopleData.filter((person: any) => selectedPeople.has(person.id))
      : selectedCampaign.peopleData;
    console.log('Dumping to SuperSearch:', selectedPeopleData);
    router.push('/supersearch');
  };

  const handleEditSchedule = () => {
    if (selectedCampaign) {
      setEditingSchedule({
        frequency: selectedCampaign.frequency,
        time: selectedCampaign.schedule.split(' at ')[1] || '09:00',
        timezone: 'UTC'
      });
      setShowEditScheduleModal(true);
    }
  };

  const handleSaveSchedule = () => {
    if (selectedCampaign) {
      // Update the campaign's schedule
      const updatedCampaign = {
        ...selectedCampaign,
        frequency: editingSchedule.frequency,
        schedule: `${editingSchedule.frequency} at ${editingSchedule.time}`
      };
      
      // In a real app, this would make an API call
      // For now, we'll update the local state
      setSelectedCampaign(updatedCampaign);
      setShowEditScheduleModal(false);
      
      // Show success message (you could use a toast here)
      console.log('Schedule updated successfully');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="h-48">
            <CardHeader>
              <CardTitle>Campaign Basics</CardTitle>
              <CardDescription>Give your scraping campaign a descriptive name</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input
                  id="campaign-name"
                  placeholder="e.g., Tech Startups - Software Engineers"
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
          <Card className="h-80">
            <CardHeader>
              <CardTitle>Select Portal</CardTitle>
              <CardDescription>Select which portal to scrape job postings from</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {jobPortals.map((portal) => (
                  <div
                    key={portal.id}
                    onClick={() => setCampaignData(prev => ({ ...prev, portal: portal.id }))}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      campaignData.portal === portal.id
                        ? `border-primary ${portal.color}`
                        : 'border-border hover:border-border'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={campaignData.portal === portal.id}
                        onChange={() => {}}
                      />
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{portal.logo}</span>
                        <span className="font-medium">{portal.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.portal && (
                <p className="text-sm text-destructive">{errors.portal}</p>
              )}
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="h-96">
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Set search criteria for job scraping</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Job Role Filter */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Job Role</Label>
                <div className="space-y-2">
                  <Input
                    placeholder="Type to search job roles..."
                    value={searchInputs.jobRole}
                    onChange={(e) => setSearchInputs(prev => ({ ...prev, jobRole: e.target.value }))}
                  />
                  {searchInputs.jobRole && (
                    <div className="max-h-32 overflow-y-auto border rounded-lg">
                      {filteredOptions('jobRole').map((role) => (
                        <div
                          key={role}
                          onClick={() => handleMultiSelectAdd('jobRoles', role)}
                          className="p-2 hover:bg-muted cursor-pointer text-sm"
                        >
                          {role}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {campaignData.jobRoles.map((role) => (
                      <Badge key={role} variant="secondary" className="flex items-center gap-1">
                        {role}
                        <X
                          className="w-3 h-3 cursor-pointer"
                          onClick={() => handleMultiSelectRemove('jobRoles', role)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Industry Filter */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Industry</Label>
                <div className="space-y-2">
                  <Input
                    placeholder="Type to search industries..."
                    value={searchInputs.industry}
                    onChange={(e) => setSearchInputs(prev => ({ ...prev, industry: e.target.value }))}
                  />
                  {searchInputs.industry && (
                    <div className="max-h-32 overflow-y-auto border rounded-lg">
                      {filteredOptions('industry').map((industry) => (
                        <div
                          key={industry}
                          onClick={() => handleMultiSelectAdd('industries', industry)}
                          className="p-2 hover:bg-muted cursor-pointer text-sm"
                        >
                          {industry}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {campaignData.industries.map((industry) => (
                      <Badge key={industry} variant="secondary" className="flex items-center gap-1">
                        {industry}
                        <X
                          className="w-3 h-3 cursor-pointer"
                          onClick={() => handleMultiSelectRemove('industries', industry)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Location</Label>
                <div className="space-y-2">
                  <Input
                    placeholder="Type to search locations..."
                    value={searchInputs.location}
                    onChange={(e) => setSearchInputs(prev => ({ ...prev, location: e.target.value }))}
                  />
                  {searchInputs.location && (
                    <div className="max-h-32 overflow-y-auto border rounded-lg">
                      {filteredOptions('location').map((location) => (
                        <div
                          key={location}
                          onClick={() => handleMultiSelectAdd('locations', location)}
                          className="p-2 hover:bg-muted cursor-pointer text-sm"
                        >
                          {location}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {campaignData.locations.map((location) => (
                      <Badge key={location} variant="secondary" className="flex items-center gap-1">
                        {location}
                        <X
                          className="w-3 h-3 cursor-pointer"
                          onClick={() => handleMultiSelectRemove('locations', location)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="h-96">
            <CardHeader>
              <CardTitle>Scheduling</CardTitle>
              <CardDescription>How often should scraping run?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Frequency</Label>
                  <Select 
                    value={campaignData.frequency}
                    onValueChange={(value) => setCampaignData(prev => ({ ...prev, frequency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="once">Once</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.frequency && (
                    <p className="text-sm text-destructive mt-1">{errors.frequency}</p>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Number of Jobs</Label>
                  <Input
                    type="number"
                    value={campaignData.jobsNeeded}
                    onChange={(e) => setCampaignData(prev => ({ ...prev, jobsNeeded: parseInt(e.target.value) || 50 }))}
                    placeholder="50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Job Posted Date</Label>
                  <Select 
                    value={campaignData.dateFilter}
                    onValueChange={(value) => setCampaignData(prev => ({ ...prev, dateFilter: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-24h">Last 24 hours</SelectItem>
                      <SelectItem value="last-7-days">Last 7 days</SelectItem>
                      <SelectItem value="last-30-days">Last 30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Start Time & Timezone</Label>
                  <div className="flex space-x-2">
                    <Input
                      type="time"
                      value={campaignData.startTime}
                      onChange={(e) => setCampaignData(prev => ({ ...prev, startTime: e.target.value }))}
                      className="flex-1"
                    />
                    <Select 
                      value={campaignData.timezone}
                      onValueChange={(value) => setCampaignData(prev => ({ ...prev, timezone: value }))}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IST">IST</SelectItem>
                        <SelectItem value="PST">PST</SelectItem>
                        <SelectItem value="EST">EST</SelectItem>
                        <SelectItem value="GMT">GMT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={handleNext} size="lg" className="w-full">
                  Start Scraping
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 4.5:
        return (
          <Card className="h-64">
            <CardContent className="flex flex-col items-center justify-center h-full space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-foreground mb-2">Scraping job listings...</h3>
                <p className="text-sm text-muted-foreground">
                  Fetching data from {getPortalInfo(campaignData.portal)?.name}. This may take a few seconds.
                </p>
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card className="h-96">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Job Listings</CardTitle>
                  <CardDescription>Scraped job postings from {getPortalInfo(campaignData.portal)?.name}</CardDescription>
                </div>
                <Button variant="outline" onClick={handleCopyJobList}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy List
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Date Posted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaignData.jobListings.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.jobTitle}</TableCell>
                      <TableCell>{job.company}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>{job.datePosted}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );

      case 6:
        return (
          <Card className="h-96">
            <CardHeader>
              <CardTitle>People Data (Apollo.io Enrichment)</CardTitle>
              <CardDescription>Enrich job data with people information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {campaignData.peopleData.length === 0 ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="apollo-url">Apollo.io URL</Label>
                    <Input
                      id="apollo-url"
                      placeholder="Paste Apollo.io search URL here"
                      value={campaignData.apolloUrl}
                      onChange={(e) => setCampaignData(prev => ({ ...prev, apolloUrl: e.target.value }))}
                      className={errors.apollo ? 'border-destructive' : ''}
                    />
                    {errors.apollo && (
                      <p className="text-sm text-destructive mt-1">{errors.apollo}</p>
                    )}
                  </div>
                  <Button onClick={handleApolloEnrichment}>
                    <Database className="w-4 h-4 mr-2" />
                    Enrich with Apollo
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Found {campaignData.peopleData.length} people from Apollo enrichment
                    </p>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>LinkedIn</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {campaignData.peopleData.map((person) => (
                        <TableRow key={person.id}>
                          <TableCell className="font-medium">{person.name}</TableCell>
                          <TableCell>{person.role}</TableCell>
                          <TableCell>{person.email}</TableCell>
                          <TableCell>
                            <a
                              href={person.linkedinProfile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 7:
        return (
          <Card className="h-96">
            <CardHeader>
              <CardTitle>Email Verification</CardTitle>
              <CardDescription>Verify email addresses for better deliverability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!campaignData.emailVerificationComplete ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Verify {campaignData.peopleData.length} email addresses to improve campaign success rates.
                  </p>
                  <Button onClick={handleEmailVerification}>
                    <Mail className="w-4 h-4 mr-2" />
                    Verify Emails
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-success/10 rounded-lg">
                      <div className="text-2xl font-bold text-success">
                        {campaignData.peopleData.filter(p => p.emailVerified).length}
                      </div>
                      <div className="text-sm text-success">Verified</div>
                    </div>
                    <div className="p-3 bg-destructive/10 rounded-lg">
                      <div className="text-2xl font-bold text-destructive">
                        {campaignData.peopleData.filter(p => p.emailVerified === false).length}
                      </div>
                      <div className="text-sm text-destructive">Invalid</div>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {Math.round((campaignData.peopleData.filter(p => p.emailVerified).length / campaignData.peopleData.length) * 100)}%
                      </div>
                      <div className="text-sm text-primary">Success Rate</div>
                    </div>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {campaignData.peopleData.map((person) => (
                        <TableRow key={person.id}>
                          <TableCell className="font-medium">{person.name}</TableCell>
                          <TableCell>{person.email}</TableCell>
                          <TableCell>
                            {person.emailVerified ? (
                              <Badge className="bg-success/10 text-success">Verified</Badge>
                            ) : (
                              <Badge variant="destructive">Invalid</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 8:
        return (
          <Card className="h-96">
            <CardHeader>
              <CardTitle>Campaign Summary</CardTitle>
              <CardDescription>Your scraping campaign is complete!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="font-medium">Campaign Created</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="font-medium">{campaignData.jobListings.length} Jobs Scraped</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="font-medium">{campaignData.peopleData.length} People Enriched</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="font-medium">
                      {campaignData.peopleData.filter(p => p.emailVerified).length} Emails Verified
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <div className="text-sm text-primary mb-1">Campaign Name</div>
                    <div className="font-medium">{campaignData.name}</div>
                  </div>
                  <div className="p-4 bg-success/10 rounded-lg">
                    <div className="text-sm text-success mb-1">Schedule</div>
                    <div className="font-medium">
                      {campaignData.frequency} at {campaignData.startTime} {campaignData.timezone}
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <Button onClick={handleFinishCampaign} size="lg" className="w-full">
                  Finish Campaign Setup
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  if (selectedCampaign) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={handleBackToCampaigns}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Campaigns
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{selectedCampaign.name}</h1>
              <div className="flex items-center space-x-4 mt-1">
                {getStatusBadge(selectedCampaign.status)}
                <span className="text-sm text-muted-foreground">
                  {getPortalInfo(selectedCampaign.portal)?.logo} {getPortalInfo(selectedCampaign.portal)?.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {selectedCampaign.totalLeads} leads
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleEditSchedule}>
              <Settings className="w-4 h-4 mr-2" />
              Edit Schedule
            </Button>
            <Button onClick={handleDumpToSuperSearch}>
              <ExternalLink className="w-4 h-4 mr-2" />
              Dump to SuperSearch
            </Button>
          </div>
        </div>

        {/* Campaign Details Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="filters">Filters</TabsTrigger>
            <TabsTrigger value="jobs">Job Listings ({selectedCampaign.jobListings.length})</TabsTrigger>
            <TabsTrigger value="people">People Data ({selectedCampaign.peopleData.length})</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="filters" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Search Filters</CardTitle>
                <CardDescription>Current search criteria for this campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Job Roles</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedCampaign.filters.jobRoles.map((role: string) => (
                      <Badge key={role} variant="secondary">{role}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block">Industries</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedCampaign.filters.industries.map((industry: string) => (
                      <Badge key={industry} variant="secondary">{industry}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block">Locations</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedCampaign.filters.locations.map((location: string) => (
                      <Badge key={location} variant="secondary">{location}</Badge>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Date Filter</Label>
                    <Badge variant="outline">{selectedCampaign.filters.dateFilter}</Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Experience Level</Label>
                    <Badge variant="outline">{selectedCampaign.filters.experienceLevel}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Job Listings</CardTitle>
                    <CardDescription>Jobs scraped from {getPortalInfo(selectedCampaign.portal)?.name}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground/60" />
                      <Input
                        placeholder="Search jobs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Date Posted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedCampaign.jobListings
                      .filter((job: any) => 
                        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        job.company.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((job: any) => (
                        <TableRow key={job.id}>
                          <TableCell className="font-medium">{job.title}</TableCell>
                          <TableCell>{job.company}</TableCell>
                          <TableCell>{job.location}</TableCell>
                          <TableCell>{job.datePosted}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="people" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>People Data</CardTitle>
                    <CardDescription>Contact information enriched from Apollo.io</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground/60" />
                      <Input
                        placeholder="Search people..."
                        value={peopleSearchTerm}
                        onChange={(e) => setPeopleSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        if (selectedPeople.size === selectedCampaign.peopleData.length) {
                          setSelectedPeople(new Set());
                        } else {
                          setSelectedPeople(new Set(selectedCampaign.peopleData.map((p: any) => p.id)));
                        }
                      }}
                    >
                      {selectedPeople.size === selectedCampaign.peopleData.length ? 'Deselect All' : 'Select All'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedPeople.size === selectedCampaign.peopleData.length}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedPeople(new Set(selectedCampaign.peopleData.map((p: any) => p.id)));
                            } else {
                              setSelectedPeople(new Set());
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>LinkedIn</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedCampaign.peopleData
                      .filter((person: any) => 
                        person.name.toLowerCase().includes(peopleSearchTerm.toLowerCase()) ||
                        person.role.toLowerCase().includes(peopleSearchTerm.toLowerCase()) ||
                        person.company.toLowerCase().includes(peopleSearchTerm.toLowerCase())
                      )
                      .map((person: any) => (
                        <TableRow key={person.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedPeople.has(person.id)}
                              onCheckedChange={(checked) => {
                                const newSelected = new Set(selectedPeople);
                                if (checked) {
                                  newSelected.add(person.id);
                                } else {
                                  newSelected.delete(person.id);
                                }
                                setSelectedPeople(newSelected);
                              }}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{person.name}</TableCell>
                          <TableCell>{person.role}</TableCell>
                          <TableCell>{person.company}</TableCell>
                          <TableCell>{person.email}</TableCell>
                          <TableCell>
                            <a
                              href={person.linkedinProfile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Schedule Settings</CardTitle>
                <CardDescription>Campaign automation schedule</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Frequency</Label>
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="font-medium capitalize">{selectedCampaign.frequency}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Schedule</Label>
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="font-medium">{selectedCampaign.schedule}</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Last Run</Label>
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="font-medium">
                        {selectedCampaign.lastRun || 'Never'}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Next Run</Label>
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="font-medium">
                        {selectedCampaign.nextRun || 'Not scheduled'}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Schedule Modal */}
        <Dialog open={showEditScheduleModal} onOpenChange={setShowEditScheduleModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Schedule</DialogTitle>
              <DialogDescription>
                Update the automation schedule for this campaign
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="frequency">Frequency</Label>
                <Select 
                  value={editingSchedule.frequency}
                  onValueChange={(value) => setEditingSchedule(prev => ({ ...prev, frequency: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once">Once</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={editingSchedule.time}
                  onChange={(e) => setEditingSchedule(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select 
                  value={editingSchedule.timezone}
                  onValueChange={(value) => setEditingSchedule(prev => ({ ...prev, timezone: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="IST">IST</SelectItem>
                    <SelectItem value="PST">PST</SelectItem>
                    <SelectItem value="EST">EST</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowEditScheduleModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveSchedule}>
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  if (showWizard) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                onClick={() => handleStepClick(step.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                  currentStep >= step.id
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'border-muted-foreground/40 text-muted-foreground hover:border-muted-foreground'
                } ${step.id === 4.5 ? 'cursor-not-allowed' : ''}`}
              >
                {currentStep > step.id ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-2 ${
                  currentStep > step.id ? 'bg-primary' : 'bg-muted-foreground/40'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1 || currentStep === 4.5}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          {currentStep < 8 && currentStep !== 4.5 && (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Scraping Campaigns</h1>
          <p className="text-muted-foreground mt-1">Automate job scraping and lead generation</p>
        </div>
        <Button onClick={() => setShowWizard(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {/* Campaigns List */}
      <div className="grid gap-6">
        {mockExistingCampaigns.map((campaign) => (
          <Card key={campaign.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div
                onClick={() => campaign && handleCampaignClick(campaign.id)}
                className="bg-card rounded-lg p-6 cursor-pointer hover:bg-muted transition-all duration-200 border border-border hover:border-border"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getPortalInfo(campaign.portal)?.logo}</span>
                      <div>
                        <h3 className="font-semibold text-lg text-primary">
                          {campaign?.name || 'Unnamed Campaign'}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1">
                          {getStatusBadge(campaign?.status || 'Unknown')}
                          <span className="text-sm text-muted-foreground">
                            {getPortalInfo(campaign.portal)?.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {campaign?.totalLeads || 0} leads
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Schedule</div>
                      <div className="font-medium">{campaign.schedule}</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Last Run</div>
                      <div className="font-medium">
                        {campaign.lastRun ? new Date(campaign.lastRun).toLocaleDateString() : 'Never'}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Next Run</div>
                      <div className="font-medium">
                        {campaign.nextRun ? new Date(campaign.nextRun).toLocaleDateString() : 'Not scheduled'}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {campaign.status === 'Running' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Pause className="w-4 h-4" />
                        </Button>
                      )}
                      {campaign.status === 'Scheduled' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}