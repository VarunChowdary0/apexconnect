'use client';

import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Plus,
  Play,
  Pause,
  Trash2,
  MoreHorizontal,
  Target,
} from 'lucide-react';
import Link from 'next/link';

const campaigns = [
  {
    id: 1,
    name: 'Q4 Enterprise Outreach',
    status: 'Active',
    progress: 78,
    sent: 2847,
    clicks: 234,
    replies: 126,
    opportunities: 23,
    estimatedCompletion: 'Dec 15, 2024 at 3:30 PM',
    emailAccounts: {
      sent: 50,
      total: 60
    }
  },
  {
    id: 2,
    name: 'SaaS Startup Campaign',
    status: 'Active',
    progress: 45,
    sent: 1523,
    clicks: 89,
    replies: 67,
    opportunities: 12,
    estimatedCompletion: 'Dec 20, 2024 at 11:45 AM',
    emailAccounts: {
      sent: 25,
      total: 30
    }
  },
  {
    id: 3,
    name: 'E-commerce Prospects',
    status: 'Paused',
    progress: 23,
    sent: 894,
    clicks: 45,
    replies: 28,
    opportunities: 5,
    estimatedCompletion: 'Jan 8, 2025 at 2:15 PM',
    emailAccounts: {
      sent: 15,
      total: 30
    }
  },
  {
    id: 4,
    name: 'Healthcare Decision Makers',
    status: 'Draft',
    progress: 0,
    sent: 0,
    clicks: 0,
    replies: 0,
    opportunities: 0,
    estimatedCompletion: 'Not scheduled',
    emailAccounts: {
      sent: 0,
      total: 0
    }
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Active':
      return <Badge className="bg-success/10 text-success">Active</Badge>;
    case 'Paused':
      return <Badge variant="secondary">Paused</Badge>;
    case 'Draft':
      return <Badge variant="outline">Draft</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export function CampaignsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const [nameError, setNameError] = useState('');

  const handleCreateCampaign = () => {
    if (campaignName.length <= 3) {
      setNameError('Campaign name must be more than 3 characters');
      return;
    }
    setNameError('');
    // Here you would proceed to the Ingest Data step
    console.log('Proceeding to Ingest Data step with campaign:', campaignName);
    setShowCreateModal(false);
    setCampaignName('');
  };

  const handleModalClose = () => {
    setShowCreateModal(false);
    setCampaignName('');
    setNameError('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Campaigns</h1>
          <p className="text-muted-foreground">Manage your cold email campaigns</p>
        </div>
        <Link href="/campaigns/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Campaign
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">2</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,264</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Replies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">221</div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
          <CardDescription>Overview of all your email campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Sent</TableHead>
                  <TableHead>Clicks</TableHead>
                  <TableHead>Replies</TableHead>
                  <TableHead>Opportunities</TableHead>
                  <TableHead>Email Accounts</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow 
                    key={campaign.id} 
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => window.location.href = `/campaigns/${campaign.id}`}
                  >
                    <TableCell>
                      <span className="font-medium text-primary">{campaign.name}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center space-x-2 cursor-pointer">
                            <Progress value={campaign.progress} className="w-16 h-2" />
                            <span className="text-sm text-muted-foreground">{campaign.progress}%</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Estimated completion by {campaign.estimatedCompletion}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{campaign.sent.toLocaleString()}</TableCell>
                    <TableCell>{campaign.clicks}</TableCell>
                    <TableCell>{campaign.replies}</TableCell>
                    <TableCell>{campaign.opportunities}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {campaign.emailAccounts.sent}/{campaign.emailAccounts.total}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Play className="mr-2 h-4 w-4" />
                            Resume
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pause className="mr-2 h-4 w-4" />
                            Pause
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TooltipProvider>
        </CardContent>
      </Card>

      {/* Create Campaign Modal */}
      <Dialog open={showCreateModal} onOpenChange={handleModalClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Let's create a new campaign</DialogTitle>
            <DialogDescription>
              Enter a name for your new campaign to get started.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="campaign-name">Campaign Name</Label>
              <Input
                id="campaign-name"
                placeholder="Enter campaign name..."
                value={campaignName}
                onChange={(e) => {
                  setCampaignName(e.target.value);
                  if (nameError) setNameError('');
                }}
                className={nameError ? 'border-destructive' : ''}
              />
              {nameError && (
                <p className="text-sm text-destructive">{nameError}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button onClick={handleCreateCampaign}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}