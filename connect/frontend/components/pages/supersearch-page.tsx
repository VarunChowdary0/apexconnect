'use client';

import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Filter, RotateCcw, X, MapPin, Building, User, CircleCheck as CheckCircle, Circle as XCircle } from 'lucide-react';

const mockAllProspects = [
  {
    id: 1,
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@techcorp.com',
    jobTitle: 'VP of Engineering',
    company: 'TechCorp',
    industry: 'Technology',
    location: 'San Francisco, CA',
    emailVerified: true,
  },
  {
    id: 2,
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'mchen@startupio.com',
    jobTitle: 'CTO',
    company: 'StartupIO',
    industry: 'SaaS',
    location: 'New York, NY',
    emailVerified: true,
  },
  {
    id: 3,
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'e.rodriguez@healthplus.com',
    jobTitle: 'Marketing Director',
    company: 'HealthPlus',
    industry: 'Healthcare',
    location: 'Boston, MA',
    emailVerified: false,
  },
  {
    id: 4,
    firstName: 'David',
    lastName: 'Park',
    email: 'david@ecommstore.com',
    jobTitle: 'CEO',
    company: 'EcommStore',
    industry: 'E-commerce',
    location: 'Austin, TX',
    emailVerified: true,
  },
  {
    id: 5,
    firstName: 'Lisa',
    lastName: 'Wang',
    email: 'lisa.wang@fintech.io',
    jobTitle: 'Product Manager',
    company: 'FinTech Solutions',
    industry: 'Fintech',
    location: 'Seattle, WA',
    emailVerified: true,
  },
  {
    id: 6,
    firstName: 'James',
    lastName: 'Wilson',
    email: 'james@consulting.com',
    jobTitle: 'Senior Consultant',
    company: 'Wilson Consulting',
    industry: 'Consulting',
    location: 'Chicago, IL',
    emailVerified: false,
  },
  {
    id: 7,
    firstName: 'Maria',
    lastName: 'Garcia',
    email: 'maria@edtech.com',
    jobTitle: 'VP of Sales',
    company: 'EdTech Innovations',
    industry: 'Education',
    location: 'Los Angeles, CA',
    emailVerified: true,
  },
  {
    id: 8,
    firstName: 'Robert',
    lastName: 'Brown',
    email: 'robert@manufacturing.com',
    jobTitle: 'Operations Manager',
    company: 'Brown Manufacturing',
    industry: 'Manufacturing',
    location: 'Detroit, MI',
    emailVerified: true,
  },
];

// Mock data for different upload sources
const mockCsvData = [
  {
    id: 101,
    firstName: 'Alex',
    lastName: 'Thompson',
    email: 'alex@newtech.com',
    jobTitle: 'Software Engineer',
    company: 'NewTech Solutions',
    industry: 'Technology',
    location: 'Portland, OR',
    emailVerified: true,
  },
  {
    id: 102,
    firstName: 'Jennifer',
    lastName: 'Lee',
    email: 'jennifer@startup.io',
    jobTitle: 'Product Designer',
    company: 'Startup Inc',
    industry: 'SaaS',
    location: 'San Diego, CA',
    emailVerified: true,
  },
];

const mockGoogleSheetsData = [
  {
    id: 201,
    firstName: 'Carlos',
    lastName: 'Rodriguez',
    email: 'carlos@healthtech.com',
    jobTitle: 'Data Scientist',
    company: 'HealthTech Corp',
    industry: 'Healthcare',
    location: 'Miami, FL',
    emailVerified: true,
  },
  {
    id: 202,
    firstName: 'Amanda',
    lastName: 'Foster',
    email: 'amanda@financeplus.com',
    jobTitle: 'Financial Analyst',
    company: 'FinancePlus',
    industry: 'Finance',
    location: 'Charlotte, NC',
    emailVerified: false,
  },
];

const mockApolloData = [
  {
    id: 301,
    firstName: 'Kevin',
    lastName: 'Zhang',
    email: 'kevin@ecommercetech.com',
    jobTitle: 'Growth Manager',
    company: 'EcommerceTech',
    industry: 'E-commerce',
    location: 'Las Vegas, NV',
    emailVerified: true,
  },
  {
    id: 302,
    firstName: 'Rachel',
    lastName: 'Kim',
    email: 'rachel@mediagroup.com',
    jobTitle: 'Marketing Director',
    company: 'Media Group',
    industry: 'Media',
    location: 'Nashville, TN',
    emailVerified: true,
  },
];

const campaigns = [
  { id: 'all', name: 'All Campaigns' },
  { id: '1', name: 'Q4 Enterprise Outreach' },
  { id: '2', name: 'SaaS Startup Campaign' },
  { id: '3', name: 'E-commerce Prospects' },
  { id: '4', name: 'Healthcare Decision Makers' },
];

const jobRoleOptions = [
  'CEO', 'CTO', 'VP of Engineering', 'Marketing Director', 'Sales Manager',
  'Product Manager', 'Software Engineer', 'Data Scientist', 'Designer'
];

const industryOptions = [
  'Technology', 'SaaS', 'Healthcare', 'Finance', 'E-commerce',
  'Manufacturing', 'Education', 'Real Estate', 'Media', 'Fintech', 'Consulting'
];

const locationOptions = [
  'San Francisco, CA', 'New York, NY', 'Boston, MA', 'Austin, TX',
  'Seattle, WA', 'Chicago, IL', 'Los Angeles, CA', 'Denver, CO', 'Detroit, MI'
];

export function SuperSearchPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<string>('all');
  const [selectedProspects, setSelectedProspects] = useState<Set<number>>(new Set());
  const [showAddData, setShowAddData] = useState(false);
  const [isFromCampaignWizard, setIsFromCampaignWizard] = useState(false);
  const [allProspects, setAllProspects] = useState(mockAllProspects);
  const [selectedDataSource, setSelectedDataSource] = useState<string>('');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [googleSheetsUrl, setGoogleSheetsUrl] = useState('');
  const [apolloUrl, setApolloUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  // Filter states
  const [selectedJobRoles, setSelectedJobRoles] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  
  // Search states
  const [jobRoleSearch, setJobRoleSearch] = useState('');
  const [industrySearch, setIndustrySearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');

  // Check if coming from campaign wizard
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fromCampaignWizard = urlParams.get('from') === 'campaign-wizard';
    setIsFromCampaignWizard(fromCampaignWizard);
  }, []);

  const handleProspectSelect = (prospectId: number, checked: boolean) => {
    const newSelected = new Set(selectedProspects);
    if (checked) {
      newSelected.add(prospectId);
    } else {
      newSelected.delete(prospectId);
    }
    setSelectedProspects(newSelected);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProspects(new Set(filteredProspects.map(p => p.id)));
    } else {
      setSelectedProspects(new Set());
    }
  };

  const handleFilterToggle = (filterType: 'jobRoles' | 'industries' | 'locations', value: string) => {
    const setters = {
      jobRoles: setSelectedJobRoles,
      industries: setSelectedIndustries,
      locations: setSelectedLocations,
    };
    
    const currentValues = {
      jobRoles: selectedJobRoles,
      industries: selectedIndustries,
      locations: selectedLocations,
    };

    const setter = setters[filterType];
    const current = currentValues[filterType];
    
    if (current.includes(value)) {
      setter(current.filter(item => item !== value));
    } else {
      setter([...current, value]);
    }
  };

  const handleReloadData = () => {
    console.log('Reloading data with filters:', {
      campaign: selectedCampaign,
      jobRoles: selectedJobRoles,
      industries: selectedIndustries,
      locations: selectedLocations,
    });
  };

  const handleUseSelected = () => {
    const selectedData = filteredProspects.filter(p => selectedProspects.has(p.id));
    
    if (isFromCampaignWizard) {
      // Get the campaign ID from session storage
      const campaignId = sessionStorage.getItem('campaignIdForRedirect');
      const campaignData = JSON.parse(sessionStorage.getItem('campaignWizardData') || '{}');
      
      // Update campaign data with selected prospects
      campaignData.leads = selectedData;
      campaignData.dataSource = 'supersearch';
      
      // Store updated campaign data (this would typically be sent to backend)
      sessionStorage.setItem('campaignWizardData', JSON.stringify(campaignData));
      
  // Ensure the wizard will open at Leads Review (step 3)
  sessionStorage.setItem('campaignWizardStep', '3');

  // Redirect back to campaign wizard Add New Campaign page
  window.location.href = '/campaigns/new';
    } else {
      console.log('Using selected prospects:', selectedData);
      // Handle normal SuperSearch flow
    }
  };

  const handleDataSourceSelect = (source: string) => {
    setSelectedDataSource(source);
    // Reset form fields when switching sources
    setCsvFile(null);
    setGoogleSheetsUrl('');
    setApolloUrl('');
  };

  const handleCsvFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
    } else {
      alert('Please select a valid CSV file');
    }
  };

  const handleAddData = async () => {
    setIsUploading(true);
    
    try {
      let newData: any[] = [];
      
      if (selectedDataSource === 'csv' && csvFile) {
        // Simulate CSV processing
        await new Promise(resolve => setTimeout(resolve, 1500));
        newData = mockCsvData;
      } else if (selectedDataSource === 'sheets' && googleSheetsUrl) {
        // Simulate Google Sheets processing
        if (!googleSheetsUrl.includes('docs.google.com/spreadsheets')) {
          alert('Please enter a valid Google Sheets URL');
          setIsUploading(false);
          return;
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
        newData = mockGoogleSheetsData;
      } else if (selectedDataSource === 'apollo' && apolloUrl) {
        // Simulate Apollo.io processing
        if (!apolloUrl.includes('apollo.io')) {
          alert('Please enter a valid Apollo.io URL');
          setIsUploading(false);
          return;
        }
        await new Promise(resolve => setTimeout(resolve, 2500));
        newData = mockApolloData;
      } else {
        alert('Please provide the required input for the selected data source');
        setIsUploading(false);
        return;
      }
      
      // Add new data to existing prospects
      setAllProspects(prev => [...prev, ...newData]);
      
      // Reset form and go back to main view
      setSelectedDataSource('');
      setCsvFile(null);
      setGoogleSheetsUrl('');
      setApolloUrl('');
      setShowAddData(false);
      
      alert(`Successfully added ${newData.length} new prospects!`);
    } catch (error) {
      alert('Error adding data. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Filter prospects based on selected filters
  const filteredProspects = allProspects.filter(prospect => {
    const jobRoleMatch = selectedJobRoles.length === 0 || selectedJobRoles.includes(prospect.jobTitle);
    const industryMatch = selectedIndustries.length === 0 || selectedIndustries.includes(prospect.industry);
    const locationMatch = selectedLocations.length === 0 || selectedLocations.includes(prospect.location);
    return jobRoleMatch && industryMatch && locationMatch;
  });

  const filteredJobRoles = jobRoleOptions.filter(role =>
    role.toLowerCase().includes(jobRoleSearch.toLowerCase())
  );

  const filteredIndustries = industryOptions.filter(industry =>
    industry.toLowerCase().includes(industrySearch.toLowerCase())
  );

  const filteredLocations = locationOptions.filter(location =>
    location.toLowerCase().includes(locationSearch.toLowerCase())
  );

  if (showAddData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => setShowAddData(false)}>
              ← Back to SuperSearch
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Add New Data</h1>
              <p className="text-muted-foreground">Upload or import prospect data</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Choose Data Source</CardTitle>
            <CardDescription>Select how you want to add prospect data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Data Source Selection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  onClick={() => handleDataSourceSelect('csv')}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-colors ${
                    selectedDataSource === 'csv'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50 hover:bg-primary/5'
                  }`}
                >
                  <div className="h-12 w-12 text-primary mb-4">📄</div>
                  <h3 className="font-semibold text-lg mb-2">Upload CSV</h3>
                  <p className="text-muted-foreground text-sm">Upload a CSV file with your prospect data</p>
                </div>

                <div
                  onClick={() => handleDataSourceSelect('sheets')}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-colors ${
                    selectedDataSource === 'sheets'
                      ? 'border-success bg-success/10'
                      : 'border-border hover:border-success/50 hover:bg-success/5'
                  }`}
                >
                  <div className="h-12 w-12 text-success mb-4">📊</div>
                  <h3 className="font-semibold text-lg mb-2">Google Sheets</h3>
                  <p className="text-muted-foreground text-sm">Connect your Google Sheets directly</p>
                </div>

                <div
                  onClick={() => handleDataSourceSelect('apollo')}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-colors ${
                    selectedDataSource === 'apollo'
                      ? 'border-chart-3 bg-chart-3/10'
                      : 'border-border hover:border-chart-3/50 hover:bg-chart-3/5'
                  }`}
                >
                  <div className="h-12 w-12 text-chart-3 mb-4">🔗</div>
                  <h3 className="font-semibold text-lg mb-2">Apollo.io URL</h3>
                  <p className="text-muted-foreground text-sm">Import data from Apollo.io people search</p>
                </div>
              </div>

              {/* Input Forms */}
              {selectedDataSource === 'csv' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Upload CSV File</CardTitle>
                    <CardDescription>Select a CSV file containing prospect data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="csv-upload">CSV File</Label>
                      <Input
                        id="csv-upload"
                        type="file"
                        accept=".csv"
                        onChange={handleCsvFileChange}
                        className="mt-1"
                      />
                      {csvFile && (
                        <p className="text-sm text-success mt-2">
                          Selected: {csvFile.name}
                        </p>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Expected columns: firstName, lastName, email, jobTitle, company, industry, location</p>
                    </div>
                    <Button 
                      onClick={handleAddData} 
                      disabled={!csvFile || isUploading}
                      className="w-full"
                    >
                      {isUploading ? 'Processing...' : 'Add CSV Data'}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {selectedDataSource === 'sheets' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Google Sheets Integration</CardTitle>
                    <CardDescription>Paste your Google Sheets sharing link</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="sheets-url">Google Sheets URL</Label>
                      <Input
                        id="sheets-url"
                        type="url"
                        placeholder="https://docs.google.com/spreadsheets/d/..."
                        value={googleSheetsUrl}
                        onChange={(e) => setGoogleSheetsUrl(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Make sure your sheet is publicly accessible or shared with view permissions</p>
                      <p>Expected columns: firstName, lastName, email, jobTitle, company, industry, location</p>
                    </div>
                    <Button 
                      onClick={handleAddData} 
                      disabled={!googleSheetsUrl.trim() || isUploading}
                      className="w-full"
                    >
                      {isUploading ? 'Processing...' : 'Add Google Sheets Data'}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {selectedDataSource === 'apollo' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Apollo.io Integration</CardTitle>
                    <CardDescription>Paste your Apollo.io people search URL</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="apollo-url">Apollo.io URL</Label>
                      <Input
                        id="apollo-url"
                        type="url"
                        placeholder="https://app.apollo.io/#/people?..."
                        value={apolloUrl}
                        onChange={(e) => setApolloUrl(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Paste the URL from your Apollo.io people search results</p>
                      <p>We'll extract contact information from the search results</p>
                    </div>
                    <Button 
                      onClick={handleAddData} 
                      disabled={!apolloUrl.trim() || isUploading}
                      className="w-full"
                    >
                      {isUploading ? 'Processing...' : 'Add Apollo Data'}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">SuperSearch</h1>
          <p className="text-muted-foreground">Search and filter your prospect database</p>
        </div>
        <Button onClick={() => setShowAddData(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Data
        </Button>
      </div>

      {/* Campaign Selection */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center space-x-4">
            <Label className="text-sm font-medium">Campaign:</Label>
            <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select a campaign" />
              </SelectTrigger>
              <SelectContent>
                {campaigns.map((campaign) => (
                  <SelectItem key={campaign.id} value={campaign.id}>
                    {campaign.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Prospects Table */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Prospects ({filteredProspects.length})</CardTitle>
                  <CardDescription>All prospects in your database</CardDescription>
                </div>
                {selectedProspects.size > 0 && (
                  <Button onClick={handleUseSelected}>
                    Use Selected ({selectedProspects.size})
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedProspects.size === filteredProspects.length && filteredProspects.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProspects.map((prospect) => (
                      <TableRow key={prospect.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedProspects.has(prospect.id)}
                            onCheckedChange={(checked) => handleProspectSelect(prospect.id, !!checked)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {prospect.firstName} {prospect.lastName}
                        </TableCell>
                        <TableCell>{prospect.email}</TableCell>
                        <TableCell>{prospect.jobTitle}</TableCell>
                        <TableCell>{prospect.company}</TableCell>
                        <TableCell>{prospect.industry}</TableCell>
                        <TableCell>{prospect.location}</TableCell>
                        <TableCell>
                          {prospect.emailVerified ? (
                            <Badge className="bg-success/10 text-success">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          ) : (
                            <Badge className="bg-destructive/10 text-destructive">
                              <XCircle className="w-3 h-3 mr-1" />
                              Unverified
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Filter Panel */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Filter className="h-5 w-5" />
                    <span>Filters</span>
                  </CardTitle>
                  <CardDescription>Filter prospects by criteria</CardDescription>
                </div>
                <Button size="sm" onClick={handleReloadData}>
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reload
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Job Role Filter */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  <User className="w-4 h-4 inline mr-1" />
                  Job Role
                </Label>
                <div className="space-y-2">
                  <Input
                    placeholder="Search job roles..."
                    value={jobRoleSearch}
                    onChange={(e) => setJobRoleSearch(e.target.value)}
                  />
                  <ScrollArea className="h-32">
                    <div className="space-y-2">
                      {filteredJobRoles.slice(0, 5).map((role) => (
                        <div key={role} className="flex items-center space-x-2">
                          <Checkbox
                            id={role}
                            checked={selectedJobRoles.includes(role)}
                            onCheckedChange={() => handleFilterToggle('jobRoles', role)}
                          />
                          <label htmlFor={role} className="text-sm cursor-pointer">{role}</label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="flex flex-wrap gap-1">
                    {selectedJobRoles.map((role) => (
                      <Badge key={role} variant="secondary" className="text-xs">
                        {role}
                        <X
                          className="w-3 h-3 ml-1 cursor-pointer"
                          onClick={() => handleFilterToggle('jobRoles', role)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Industry Filter */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  <Building className="w-4 h-4 inline mr-1" />
                  Industry
                </Label>
                <div className="space-y-2">
                  <Input
                    placeholder="Search industries..."
                    value={industrySearch}
                    onChange={(e) => setIndustrySearch(e.target.value)}
                  />
                  <ScrollArea className="h-32">
                    <div className="space-y-2">
                      {filteredIndustries.slice(0, 5).map((industry) => (
                        <div key={industry} className="flex items-center space-x-2">
                          <Checkbox
                            id={industry}
                            checked={selectedIndustries.includes(industry)}
                            onCheckedChange={() => handleFilterToggle('industries', industry)}
                          />
                          <label htmlFor={industry} className="text-sm cursor-pointer">{industry}</label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="flex flex-wrap gap-1">
                    {selectedIndustries.map((industry) => (
                      <Badge key={industry} variant="secondary" className="text-xs">
                        {industry}
                        <X
                          className="w-3 h-3 ml-1 cursor-pointer"
                          onClick={() => handleFilterToggle('industries', industry)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location
                </Label>
                <div className="space-y-2">
                  <Input
                    placeholder="Search locations..."
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                  />
                  <ScrollArea className="h-32">
                    <div className="space-y-2">
                      {filteredLocations.slice(0, 5).map((location) => (
                        <div key={location} className="flex items-center space-x-2">
                          <Checkbox
                            id={location}
                            checked={selectedLocations.includes(location)}
                            onCheckedChange={() => handleFilterToggle('locations', location)}
                          />
                          <label htmlFor={location} className="text-sm cursor-pointer">{location}</label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="flex flex-wrap gap-1">
                    {selectedLocations.map((location) => (
                      <Badge key={location} variant="secondary" className="text-xs">
                        {location}
                        <X
                          className="w-3 h-3 ml-1 cursor-pointer"
                          onClick={() => handleFilterToggle('locations', location)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}