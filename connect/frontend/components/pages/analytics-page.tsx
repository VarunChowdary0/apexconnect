'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Mail,
  MousePointer,
  Reply,
  Target,
  Download,
} from 'lucide-react';

const metrics = [
  {
    name: 'Total Sent',
    value: '24,381',
    change: '+18.2%',
    trend: 'up',
    icon: Mail,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    name: 'Open Rate',
    value: '68.3%',
    change: '+4.1%',
    trend: 'up',
    icon: MousePointer,
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    name: 'Click Rate',
    value: '12.7%',
    change: '+2.3%',
    trend: 'up',
    icon: MousePointer,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
  {
    name: 'Reply Rate',
    value: '4.2%',
    change: '-0.5%',
    trend: 'down',
    icon: Reply,
    color: 'text-chart-3',
    bgColor: 'bg-chart-3/10',
  },
  {
    name: 'Opportunities',
    value: '186',
    change: '+22.1%',
    trend: 'up',
    icon: Target,
    color: 'text-chart-2',
    bgColor: 'bg-chart-2/10',
  },
];

const timeSeriesData = [
  { date: 'Jan 1', sent: 1200, opens: 820, replies: 45, clicks: 156 },
  { date: 'Jan 8', sent: 1350, opens: 923, replies: 52, clicks: 172 },
  { date: 'Jan 15', sent: 1480, opens: 1011, replies: 63, clicks: 188 },
  { date: 'Jan 22', sent: 1620, opens: 1106, replies: 68, clicks: 206 },
  { date: 'Jan 29', sent: 1750, opens: 1195, replies: 74, clicks: 223 },
  { date: 'Feb 5', sent: 1890, opens: 1291, replies: 79, clicks: 241 },
  { date: 'Feb 12', sent: 2020, opens: 1374, replies: 85, clicks: 257 },
];

const campaignData = [
  { name: 'Q4 Enterprise', sent: 2847, opens: 1947, replies: 126 },
  { name: 'SaaS Startup', sent: 1523, opens: 1041, replies: 67 },
  { name: 'E-commerce', sent: 894, opens: 611, replies: 28 },
  { name: 'Healthcare', sent: 1156, opens: 789, replies: 48 },
];

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Track your campaign performance and metrics</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {metrics.map((metric) => (
          <Card key={metric.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.name}
              </CardTitle>
              <div className={`${metric.bgColor} p-2 rounded-lg`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <div className="flex items-center space-x-1 mt-1">
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-success" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-destructive" />
                )}
                <span className={`text-xs font-medium ${
                  metric.trend === 'up' ? 'text-success' : 'text-destructive'
                }`}>
                  {metric.change}
                </span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaign Analytics</TabsTrigger>
          <TabsTrigger value="accounts">Account Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Over Time</CardTitle>
              <CardDescription>Email metrics for the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="sent"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    name="Sent"
                  />
                  <Line
                    type="monotone"
                    dataKey="opens"
                    stroke="#10B981"
                    strokeWidth={2}
                    name="Opens"
                  />
                  <Line
                    type="monotone"
                    dataKey="replies"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    name="Replies"
                  />
                  <Line
                    type="monotone"
                    dataKey="clicks"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    name="Clicks"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
              <CardDescription>Performance metrics by campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={campaignData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sent" fill="#3B82F6" name="Sent" />
                  <Bar dataKey="opens" fill="#10B981" name="Opens" />
                  <Bar dataKey="replies" fill="#8B5CF6" name="Replies" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Performance</CardTitle>
              <CardDescription>Performance metrics by email account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Mail className="mx-auto h-12 w-12 text-muted-foreground/60" />
                <h3 className="mt-2 text-sm font-medium text-foreground">No email accounts connected</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Connect your email accounts to see detailed analytics.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Campaigns</CardTitle>
            <CardDescription>Campaigns with highest reply rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaignData.map((campaign) => (
                <div key={campaign.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{campaign.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {campaign.sent.toLocaleString()} sent
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">
                      {((campaign.replies / campaign.sent) * 100).toFixed(1)}% reply rate
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest campaign activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Q4 Enterprise campaign sent 150 emails</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Received 3 new replies</p>
                  <p className="text-xs text-muted-foreground">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-chart-3 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">SaaS Startup campaign paused</p>
                  <p className="text-xs text-muted-foreground">12 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New lead marked as opportunity</p>
                  <p className="text-xs text-muted-foreground">18 minutes ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
