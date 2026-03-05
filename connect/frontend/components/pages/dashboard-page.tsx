'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Activity,
  Mail,
  Reply,
  Target,
  TrendingUp,
  Calendar,
  Users,
  Plus,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

const stats = [
  {
    name: 'Active Campaigns',
    value: '12',
    icon: Target,
    description: '+2 from last month',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    name: 'Emails Sent',
    value: '24,381',
    icon: Mail,
    description: '+18.2% from last month',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    name: 'Reply Rate',
    value: '4.2%',
    icon: Reply,
    description: '+0.8% from last month',
    color: 'text-chart-3',
    bgColor: 'bg-chart-3/10',
  },
  {
    name: 'Opportunities',
    value: '186',
    icon: TrendingUp,
    description: '+12 from last week',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
];

const campaigns = [
  {
    name: 'Q4 Enterprise Outreach',
    status: 'Active',
    progress: 78,
    sent: 2847,
    replies: 126,
    opportunities: 23,
  },
  {
    name: 'SaaS Startup Campaign',
    status: 'Active',
    progress: 45,
    sent: 1523,
    replies: 67,
    opportunities: 12,
  },
  {
    name: 'E-commerce Prospects',
    status: 'Paused',
    progress: 23,
    sent: 894,
    replies: 28,
    opportunities: 5,
  },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your cold email campaigns</p>
        </div>
        <div className="flex space-x-3">
          <Link href="/campaigns/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Campaigns</CardTitle>
                <CardDescription>Your most recent campaign performance</CardDescription>
              </div>
              <Link href="/campaigns">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <Link
                  key={campaign.name}
                  href={`/campaigns/${campaign.name === 'Q4 Enterprise Outreach' ? '1' : campaign.name === 'SaaS Startup Campaign' ? '2' : '3'}`}
                  className="flex items-center justify-between p-4 border border-border rounded-xl hover:shadow-md hover:border-border transition-all cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-foreground">{campaign.name}</h3>
                      <Badge
                        variant={campaign.status === 'Active' ? 'default' : 'secondary'}
                        className={campaign.status === 'Active' ? 'bg-success/10 text-success' : ''}
                      >
                        {campaign.status}
                      </Badge>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{campaign.progress}%</span>
                      </div>
                      <Progress value={campaign.progress} className="h-2" />
                    </div>
                  </div>
                  <div className="flex space-x-6 text-sm">
                    <div className="text-center">
                      <div className="font-medium text-foreground">{campaign.sent.toLocaleString()}</div>
                      <div className="text-muted-foreground">Sent</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-foreground">{campaign.replies}</div>
                      <div className="text-muted-foreground">Replies</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-foreground">{campaign.opportunities}</div>
                      <div className="text-muted-foreground">Opportunities</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/supersearch">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Find Prospects</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Search for new leads using our advanced SuperSearch feature</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/email-accounts">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="bg-success/10 p-2 rounded-lg">
                  <Mail className="h-5 w-5 text-success" />
                </div>
                <CardTitle className="text-lg">Add Email Account</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Connect your email accounts to start sending campaigns</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/analytics">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="bg-chart-3/10 p-2 rounded-lg">
                  <Activity className="h-5 w-5 text-chart-3" />
                </div>
                <CardTitle className="text-lg">View Analytics</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Analyze your campaign performance with detailed metrics</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
