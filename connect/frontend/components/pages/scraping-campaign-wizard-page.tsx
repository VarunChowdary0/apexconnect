'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
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
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle,
  XCircle,
  Database,
  Mail,
  ExternalLink,
  Clock,
  MapPin,
  Building,
  User,
  X,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const steps = [
  { id: 1, name: 'Campaign Basics', description: 'Name your campaign' },
  { id: 2, name: 'Select Job Portals', description: 'Choose data sources' },
  { id: 3, name: 'Frequency & Schedule', description: 'Set automation' },
  { id: 4, name: 'Filters', description: 'Define search criteria' },
  { id: 5, name: 'Enrichment', description: 'Apollo.io integration' },
  { id: 6, name: 'People Data', description: 'Review people data' },
  { id: 7, name: 'Email Verification', description: 'Verify contacts' },
  { id: 8, name: 'Summary', description: 'Campaign complete' },
];

const jobPortals = [
  { id: 'naukri', name: 'Naukri.com', logo: '🔍' },
  { id: 'linkedin', name: 'LinkedIn Jobs', logo: '💼' },
  { id: 'glassdoor', name: 'Glassdoor', logo: '🏢' },
  { id: 'indeed', name: 'Indeed', logo: '📋' },
  { id: 'wellfound', name: 'Wellfound (AngelList)', logo: '🚀' },
  { id: 'monster', name: 'Monster.com', logo: '👹' },
];

const locationOptions = [
  'Bangalore, India',
  'Mumbai, India',
  'Delhi, India',
  'Hyderabad, India',
  'Chennai, India',
  'Pune, India',
  'New York, NY',
  'San Francisco, CA',
  'London, UK',
  'Remote',
];

const jobRoleOptions = [
  'Software Engineer',
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'DevOps Engineer',
  'Data Scientist',
  'Product Manager',
  'UI/UX Designer',
  'Marketing Manager',
  'Sales Manager',
];

const industryOptions = [
  'Technology',
  'SaaS',
  'Fintech',
  'E-commerce',
  'Healthcare',
  'Education',
  'Manufacturing',
  'Consulting',
  'Media',
  'Real Estate',
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

const mockJobData = [
  {
    id: 1,
    companyName: 'TechCorp Solutions',
    jobTitle: 'Senior Software Engineer',
    location: 'Bangalore, India',
    datePosted: '2024-03-19',
    portal: 'linkedin',
  },
  {
    id: 2,
    companyName: 'StartupIO',
    jobTitle: 'Full Stack Developer',
    location: 'Mumbai, India',
    datePosted: '2024-03-18',
    portal: 'naukri',
  },
  {
    id: 3,
    companyName: 'InnovateLabs',
    jobTitle: 'React Developer',
    location: 'Delhi, India',
    datePosted: '2024-03-17',
    portal: 'wellfound',
  },
];

export function ScrapingCampaignWizardPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    name: '',
    portals: [] as string[],
    frequency: '',
    schedule: '',
    scheduleSet: false,
    locations: [] as string[],
    jobRoles: [] as string[],
    industries: [] as string[],
    apolloUrl: '',
    peopleData: [] as any[],
    jobData: [] as any[],
    emailVerificationComplete: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showApolloModal, setShowApolloModal] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');
  const [jobRoleSearch, setJobRoleSearch] = useState('');
  const [industrySearch, setIndustrySearch] = useState('');

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
        if (campaignData.portals.length === 0) {
          newErrors.portals = 'Please select at least one job portal';
        }
        break;
      case 3:
        if (!campaignData.frequency) {
          newErrors.frequency = 'Please select a frequency';
        } else if (!campaignData.scheduleSet) {
          newErrors.schedule = 'Please set a schedule before proceeding';
        }
        break;
      case 4:
        if (campaignData.locations.length === 0) {
          newErrors.locations = 'Please select at least one location';
        }
        if (campaignData.jobRoles.length === 0) {
          newErrors.jobRoles = 'Please select at least one job role';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setErrors({});
  };

  const handlePortalToggle = (portalId: string) => {
    setCampaignData(prev => ({
      ...prev,
      portals: prev.portals.includes(portalId)
        ? prev.portals.filter(id => id !== portalId)
        : [...prev.portals, portalId]
    }));
  };

  const handleMultiSelectAdd = (field: 'locations' | 'jobRoles' | 'industries', value: string) => {
    if (value && !campaignData[field].includes(value)) {
      setCampaignData(prev => ({
        ...prev,
        [field]: [...prev[field], value]
      }));
    }
  };

  const handleMultiSelectRemove = (field: 'locations' | 'jobRoles' | 'industries', value: string) => {
    setCampaignData(prev => ({
      ...prev,
      [field]: prev[field].filter(item => item !== value)
    }));
  };

  const handleScheduleSetup = () => {
    // Mock schedule setup
    const scheduleText = campaignData.frequency === 'daily' ? 'Every day at 9:00 AM' :
                        campaignData.frequency === 'weekly' ? 'Every Monday at 9:00 AM' :
                        campaignData.frequency === 'once' ? 'Run once immediately' :
                        'Custom schedule set';

    setCampaignData(prev => ({
      ...prev,
      schedule: scheduleText,
      scheduleSet: true
    }));
  };

  const handleApolloEnrichment = () => {
    if (!campaignData.apolloUrl.trim()) {
      setErrors({ apollo: 'Please enter a valid Apollo.io URL' });
      return;
    }

    // Simulate Apollo enrichment
    setCampaignData(prev => ({ ...prev, peopleData: mockPeopleData }));
    setShowApolloModal(false);
    setErrors({});
  };

  const handleEmailVerification = () => {
    setIsVerifying(true);

    // Simulate email verification process
    setTimeout(() => {
      const verifiedPeople = campaignData.peopleData.map(person => ({
        ...person,
        emailVerified: Math.random() > 0.3 // 70% success rate
      }));

      setCampaignData(prev => ({
        ...prev,
        peopleData: verifiedPeople,
        emailVerificationComplete: true
      }));
      setIsVerifying(false);
    }, 3000);
  };

  const handleFinishCampaign = () => {
    // Save campaign and redirect
    console.log('Saving campaign:', campaignData);
    router.push('/scraping-campaigns');
  };

  const handleSendToSuperSearch = () => {
    const verifiedPeople = campaignData.peopleData.filter(person => person.emailVerified);
    console.log('Sending to SuperSearch:', verifiedPeople);
    router.push('/supersearch');
  };

  const handleSendToCampaigns = () => {
    const verifiedPeople = campaignData.peopleData.filter(person => person.emailVerified);
    console.log('Sending to Campaigns:', verifiedPeople);
    router.push('/campaigns');
  };

  const getPortalBadge = (portalId: string) => {
    const portal = jobPortals.find(p => p.id === portalId);
    return portal ? (
      <Badge variant="outline" className="text-xs">
        {portal.logo} {portal.name}
      </Badge>
    ) : null;
  };

  const filteredLocations = locationOptions.filter(location =>
    location.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const filteredJobRoles = jobRoleOptions.filter(role =>
    role.toLowerCase().includes(jobRoleSearch.toLowerCase())
  );

  const filteredIndustries = industryOptions.filter(industry =>
    industry.toLowerCase().includes(industrySearch.toLowerCase())
  );

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
          <Card>
            <CardHeader>
              <CardTitle>Select Job Portals</CardTitle>
              <CardDescription>Choose which job portals to scrape data from</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {jobPortals.map((portal) => (
                  <div
                    key={portal.id}
                    onClick={() => handlePortalToggle(portal.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      campaignData.portals.includes(portal.id)
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-border'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={campaignData.portals.includes(portal.id)}
                        onChange={() => {}}
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{portal.logo}</span>
                          <span className="font-medium">{portal.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.portals && (
                <p className="text-sm text-destructive">{errors.portals}</p>
              )}
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Frequency & Schedule</CardTitle>
              <CardDescription>Set how often the scraping should run</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm font-medium mb-3 block">Frequency</Label>
                <div className="grid grid-cols-2 gap-3">
                  {['once', 'daily', 'weekly', 'custom'].map((freq) => (
                    <div
                      key={freq}
                      onClick={() => setCampaignData(prev => ({ ...prev, frequency: freq }))}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        campaignData.frequency === freq
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-border'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Checkbox checked={campaignData.frequency === freq} onChange={() => {}} />
                        <span className="font-medium capitalize">{freq}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.frequency && (
                  <p className="text-sm text-destructive mt-2">{errors.frequency}</p>
                )}
              </div>

              {campaignData.frequency && (
                <div>
                  <Button variant="outline" onClick={handleScheduleSetup}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Set Schedule
                  </Button>
                  {campaignData.schedule && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Scheduled: {campaignData.schedule}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Define search criteria for job scraping</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Location Filter */}
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location
                </Label>
                <div className="space-y-2">
                  <Input
                    placeholder="Search locations..."
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                  />
                  <div className="max-h-32 overflow-y-auto border rounded-lg">
                    {filteredLocations.map((location) => (
                      <div
                        key={location}
                        onClick={() => {
                          handleMultiSelectAdd('locations', location);
                          setLocationSearch('');
                        }}
                        className="p-2 hover:bg-muted cursor-pointer text-sm"
                      >
                        {location}
                      </div>
                    ))}
                  </div>
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
                  {errors.locations && (
                    <p className="text-sm text-destructive">{errors.locations}</p>
                  )}
                </div>
              </div>

              {/* Job Role Filter */}
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  <User className="w-4 h-4 inline mr-1" />
                  Job Role
                </Label>
                <div className="space-y-2">
                  <Input
                    placeholder="Search job roles..."
                    value={jobRoleSearch}
                    onChange={(e) => setJobRoleSearch(e.target.value)}
                  />
                  <div className="max-h-32 overflow-y-auto border rounded-lg">
                    {filteredJobRoles.map((role) => (
                      <div
                        key={role}
                        onClick={() => {
                          handleMultiSelectAdd('jobRoles', role);
                          setJobRoleSearch('');
                        }}
                        className="p-2 hover:bg-muted cursor-pointer text-sm"
                      >
                        {role}
                      </div>
                    ))}
                  </div>
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
                  {errors.jobRoles && (
                    <p className="text-sm text-destructive">{errors.jobRoles}</p>
                  )}
                </div>
              </div>

              {/* Industry Filter */}
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  <Building className="w-4 h-4 inline mr-1" />
                  Industry
                </Label>
                <div className="space-y-2">
                  <Input
                    placeholder="Search industries..."
                    value={industrySearch}
                    onChange={(e) => setIndustrySearch(e.target.value)}
                  />
                  <div className="max-h-32 overflow-y-auto border rounded-lg">
                    {filteredIndustries.map((industry) => (
                      <div
                        key={industry}
                        onClick={() => {
                          handleMultiSelectAdd('industries', industry);
                          setIndustrySearch('');
                        }}
                        className="p-2 hover:bg-muted cursor-pointer text-sm"
                      >
                        {industry}
                      </div>
                    ))}
                  </div>
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
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Enrichment (Apollo.io)</CardTitle>
              <CardDescription>Enrich job data with people information from Apollo.io</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {campaignData.jobData.length > 0 && (
                <div>
                  <h3 className="font-medium mb-3">Job Postings Found ({campaignData.jobData.length})</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Portal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {campaignData.jobData.slice(0, 3).map((job) => (
                        <TableRow key={job.id}>
                          <TableCell className="font-medium">{job.companyName}</TableCell>
                          <TableCell>{job.jobTitle}</TableCell>
                          <TableCell>{job.location}</TableCell>
                          <TableCell>{getPortalBadge(job.portal)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {campaignData.jobData.length > 3 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      ... and {campaignData.jobData.length - 3} more jobs
                    </p>
                  )}
                </div>
              )}

              <div className="text-center py-8">
                <Button onClick={() => setShowApolloModal(true)} size="lg">
                  <Database className="w-5 h-5 mr-2" />
                  Enrich with Apollo
                </Button>
              </div>

              {campaignData.peopleData.length > 0 && (
                <div>
                  <h3 className="font-medium mb-3">People Data ({campaignData.peopleData.length})</h3>
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
                            <Button variant="ghost" size="sm" asChild>
                              <a href={person.linkedinProfile} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
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

      case 6:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Email Verification</CardTitle>
              <CardDescription>Verify all collected emails for deliverability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!campaignData.emailVerificationComplete && !isVerifying && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Verify all collected emails? ({campaignData.peopleData.length} emails)
                  </p>
                  <Button onClick={handleEmailVerification} size="lg">
                    <Mail className="w-5 h-5 mr-2" />
                    Start Email Verification
                  </Button>
                </div>
              )}

              {isVerifying && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Verifying emails...</p>
                </div>
              )}

              {campaignData.emailVerificationComplete && (
                <div>
                  <h3 className="font-medium mb-3">Verification Results</h3>
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
                              <div className="flex items-center space-x-2 text-success">
                                <CheckCircle className="w-4 h-4" />
                                <span>Valid</span>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2 text-destructive">
                                <XCircle className="w-4 h-4" />
                                <span>Invalid</span>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <div className="mt-6 p-4 bg-success/10 rounded-lg">
                    <p className="text-success font-medium">
                      {campaignData.peopleData.filter(p => p.emailVerified).length} valid emails
                    </p>
                    <p className="text-destructive">
                      {campaignData.peopleData.filter(p => !p.emailVerified).length} invalid emails (skipped)
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 8:
        const validEmails = campaignData.peopleData.filter(p => p.emailVerified);

        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-success mb-4" />
              <h1 className="text-2xl font-bold text-foreground mb-2">Campaign Created Successfully!</h1>
              <p className="text-muted-foreground">Your scraping campaign has been set up and is ready to use.</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Campaign Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium">Campaign Name</Label>
                    <p className="text-foreground">{campaignData.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Frequency</Label>
                    <p className="text-foreground capitalize">{campaignData.frequency}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Job Portals</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {campaignData.portals.map(portalId => getPortalBadge(portalId))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Valid Emails</Label>
                    <p className="text-success font-bold">{validEmails.length}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Filters Applied</Label>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="text-xs text-muted-foreground">Locations:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {campaignData.locations.map(loc => (
                          <Badge key={loc} variant="outline" className="text-xs">{loc}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Job Roles:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {campaignData.jobRoles.map(role => (
                          <Badge key={role} variant="outline" className="text-xs">{role}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={handleSendToSuperSearch}>
                <Database className="w-4 h-4 mr-2" />
                Dump into SuperSearch
              </Button>
              <Button onClick={handleSendToCampaigns}>
                <Mail className="w-4 h-4 mr-2" />
                Send to Campaigns
              </Button>
            </div>
          </div>
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
          <h1 className="text-2xl font-bold tracking-tight text-foreground">New Scraping Campaign</h1>
          <p className="text-muted-foreground">Step-by-step campaign creation wizard</p>
        </div>
        <Button variant="outline" onClick={() => router.push('/scraping-campaigns')}>
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
                  {step.id}
                </div>
                <div className="text-center mt-2">
                  <span className={`text-xs font-medium ${
                    currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {step.name}
                  </span>
                  <p className="text-xs text-muted-foreground/60 mt-1">{step.description}</p>
                </div>
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

        {currentStep === 7 && campaignData.emailVerificationComplete && (
          <Button onClick={handleFinishCampaign}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Finish & Save Campaign
          </Button>
        )}
      </div>

      {/* Schedule Modal */}
      <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Schedule</DialogTitle>
            <DialogDescription>
              Configure when the scraping should run
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="schedule-input">Schedule Details</Label>
              <Input
                id="schedule-input"
                placeholder="e.g., Every Monday at 9:00 AM"
                value={campaignData.schedule}
                onChange={(e) => setCampaignData(prev => ({ ...prev, schedule: e.target.value }))}
              />
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowScheduleModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowScheduleModal(false)}>
                Save Schedule
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Apollo Modal */}
      <Dialog open={showApolloModal} onOpenChange={setShowApolloModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enrich with Apollo.io</DialogTitle>
            <DialogDescription>
              Paste your Apollo People URL to enrich company data with contact information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="apollo-url">Apollo People URL</Label>
              <Textarea
                id="apollo-url"
                placeholder="https://app.apollo.io/#/people?..."
                value={campaignData.apolloUrl}
                onChange={(e) => setCampaignData(prev => ({ ...prev, apolloUrl: e.target.value }))}
                className="min-h-20"
              />
              {errors.apollo && (
                <p className="text-sm text-destructive mt-1">{errors.apollo}</p>
              )}
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowApolloModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleApolloEnrichment}>
                Start Enrichment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
