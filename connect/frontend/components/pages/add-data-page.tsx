'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Upload,
  FileSpreadsheet,
  Search,
  ArrowLeft,
  CheckCircle,
  Users,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const sampleLeads = [
  {
    firstName: 'Alice',
    lastName: 'Cooper',
    email: 'alice.cooper@newtech.com',
    title: 'VP of Sales',
    emailProvider: 'Google',
    company: 'NewTech Solutions',
  },
  {
    firstName: 'Bob',
    lastName: 'Wilson',
    email: 'bob.wilson@innovate.io',
    title: 'Marketing Director',
    emailProvider: 'Outlook',
    company: 'Innovate Corp',
  },
  {
    firstName: 'Carol',
    lastName: 'Davis',
    email: 'carol@startup.com',
    title: 'CEO',
    emailProvider: 'Google',
    company: 'Startup Inc',
  },
];

interface AddDataPageProps {
  campaignId: string;
}

export function AddDataPage({ campaignId }: AddDataPageProps) {
  const router = useRouter();
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [step, setStep] = useState<'select' | 'preview' | 'success'>('select');
  const [previewLeads, setPreviewLeads] = useState<any[]>([]);

  const handleSourceSelect = (source: string) => {
    setSelectedSource(source);
    // Simulate data ingestion
    setTimeout(() => {
      setPreviewLeads(sampleLeads);
      setStep('preview');
    }, 1000);
  };

  const handleAddLeads = () => {
    // Simulate adding leads to campaign
    setStep('success');
    setTimeout(() => {
      router.push(`/campaigns/${campaignId}`);
    }, 2000);
  };

  const handleBack = () => {
    if (step === 'preview') {
      setStep('select');
      setSelectedSource('');
      setPreviewLeads([]);
    } else {
      router.push(`/campaigns/${campaignId}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Add Data</h1>
            <p className="text-muted-foreground">Import new leads to your campaign</p>
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center space-x-4">
        <div className={`flex items-center space-x-2 ${step === 'select' ? 'text-primary' : 'text-muted-foreground/60'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
            step === 'select' ? 'border-primary bg-primary/10' : 'border-border'
          }`}>
            1
          </div>
          <span className="font-medium">Select Source</span>
        </div>
        <div className="w-8 h-px bg-border"></div>
        <div className={`flex items-center space-x-2 ${step === 'preview' ? 'text-primary' : 'text-muted-foreground/60'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
            step === 'preview' ? 'border-primary bg-primary/10' : 'border-border'
          }`}>
            2
          </div>
          <span className="font-medium">Preview Data</span>
        </div>
        <div className="w-8 h-px bg-border"></div>
        <div className={`flex items-center space-x-2 ${step === 'success' ? 'text-success' : 'text-muted-foreground/60'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
            step === 'success' ? 'border-success bg-success/10' : 'border-border'
          }`}>
            <CheckCircle className="w-4 h-4" />
          </div>
          <span className="font-medium">Complete</span>
        </div>
      </div>

      {/* Content */}
      {step === 'select' && (
        <Card>
          <CardHeader>
            <CardTitle>Choose Data Source</CardTitle>
            <CardDescription>Select how you want to add leads to your campaign</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                onClick={() => handleSourceSelect('csv')}
                className="p-6 border-2 border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
              >
                <Upload className="h-12 w-12 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">Upload CSV</h3>
                <p className="text-muted-foreground text-sm">Upload a CSV file with your leads data</p>
                <div className="mt-4">
                  <Badge variant="outline">Supports: .csv, .xlsx</Badge>
                </div>
              </div>

              <div
                onClick={() => handleSourceSelect('sheets')}
                className="p-6 border-2 border-border rounded-lg cursor-pointer hover:border-success/50 hover:bg-success/5 transition-colors"
              >
                <FileSpreadsheet className="h-12 w-12 text-success mb-4" />
                <h3 className="font-semibold text-lg mb-2">Google Sheets</h3>
                <p className="text-muted-foreground text-sm">Connect your Google Sheets directly</p>
                <div className="mt-4">
                  <Badge variant="outline">Real-time sync</Badge>
                </div>
              </div>

              <div
                onClick={() => handleSourceSelect('supersearch')}
                className="p-6 border-2 border-border rounded-lg cursor-pointer hover:border-chart-3/50 hover:bg-chart-3/5 transition-colors"
              >
                <Search className="h-12 w-12 text-chart-3 mb-4" />
                <h3 className="font-semibold text-lg mb-2">SuperSearch</h3>
                <p className="text-muted-foreground text-sm">Use our lead discovery tool</p>
                <div className="mt-4">
                  <Badge variant="outline">AI-powered</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 'preview' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Preview Leads</CardTitle>
                <CardDescription>Review the leads before adding them to your campaign</CardDescription>
              </div>
              <Badge variant="outline">{previewLeads.length} leads found</Badge>
            </div>
          </CardHeader>
          <CardContent>
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
                {previewLeads.map((lead, index) => (
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
            <div className="mt-6 flex justify-end">
              <Button onClick={handleAddLeads} size="lg">
                <Users className="w-4 h-4 mr-2" />
                Add {previewLeads.length} Leads to Campaign
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 'success' && (
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle className="mx-auto h-16 w-16 text-success mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Leads Added Successfully!</h2>
            <p className="text-muted-foreground mb-4">
              {previewLeads.length} new leads have been added to your campaign.
            </p>
            <p className="text-sm text-muted-foreground">Redirecting back to campaign...</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
