'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import {
  Reply,
  Play,
  Pause,
  ArrowLeft,
  Mail,
  TrendingDown,
  UserMinus,
  Plus,
  Clock,
  Users,
  FileText,
  Calendar,
  Repeat,
  ChevronLeft,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const campaignData = {
  1: {
    name: 'Q4 Enterprise Outreach',
    status: 'Active',
    replies: 126,
    bounceRate: 3.2,
    unsubscribeRate: 1.1,
    leadsCount: 2847,
    emailAccounts: [
      {
        id: 1,
        email: 'john.doe@acmecorp.com',
        name: 'John Doe',
        sent: 30,
        limit: 30,
        emails: [
          {
            id: 1,
            subject: 'Quick question about TechCorp\'s growth strategy',
            recipient: 'Sarah Johnson',
            recipientEmail: 'sarah.johnson@techcorp.com',
            body: 'Hi Sarah,\n\nI noticed TechCorp recently expanded their team - congratulations on the momentum!\n\nI\'m reaching out because we help companies like TechCorp scale their operations efficiently during rapid growth phases. Our platform has helped similar organizations reduce operational overhead by 40% while maintaining quality.\n\nWould you be open to a brief 15-minute call to discuss how this might apply to TechCorp\'s current priorities?\n\nBest regards,\nJohn Doe',
            dateSent: '2024-03-16',
            status: 'Delivered',
          },
          {
            id: 2,
            subject: 'Partnership opportunity with StartupIO',
            recipient: 'Michael Chen',
            recipientEmail: 'mchen@startupio.com',
            body: 'Hi Michael,\n\nI hope this email finds you well. I wanted to reach out regarding a potential partnership opportunity between StartupIO and our company.\n\nWe specialize in helping companies like yours increase their operational efficiency through advanced automation.\n\nWould you be interested in a brief 15-minute call?\n\nBest regards,\nJohn Doe',
            dateSent: '2024-03-16',
            status: 'Delivered',
          },
        ],
      },
      {
        id: 2,
        email: 'sales@acmecorp.com',
        name: 'Sales Team',
        sent: 20,
        limit: 30,
        emails: [
          {
            id: 3,
            subject: 'Healthcare analytics solution for HealthPlus',
            recipient: 'Emily Rodriguez',
            recipientEmail: 'e.rodriguez@healthplus.com',
            body: 'Hi Emily,\n\nI wanted to reach out about our healthcare analytics platform that could help HealthPlus improve patient outcomes while reducing costs.\n\nWe\'ve helped similar organizations achieve 25% efficiency improvements.\n\nWould you be interested in learning more?\n\nBest regards,\nSales Team',
            dateSent: '2024-03-17',
            status: 'Delivered',
          },
        ],
      },
    ],
    prompts: [
      {
        id: 1,
        text: `You are a sales development representative reaching out to enterprise decision makers. Write a personalized cold email that:

1. References their company's recent growth or news
2. Introduces our enterprise solution briefly
3. Asks for a 15-minute call
4. Keeps it under 100 words
5. Uses a professional but friendly tone

Variables available: {{firstName}}, {{company}}, {{jobTitle}}, {{recentNews}}`,
        dateUsed: '2024-03-15',
      }
    ],
    emails: [
      {
        id: 1,
        subject: `Quick question about {{company}}'s growth strategy`,
        body: `Hi {{firstName}},

I noticed {{company}} recently {{recentNews}} - congratulations on the momentum!

I'm reaching out because we help companies like {{company}} scale their operations efficiently during rapid growth phases. Our enterprise platform has helped similar organizations reduce operational overhead by 40% while maintaining quality.

Would you be open to a brief 15-minute call to discuss how this might apply to {{company}}'s current priorities?

Best regards,
John Doe
Enterprise Solutions`,
        status: 'Sent',
        dateSent: '2024-03-16',
        sentCount: 1247,
        openRate: 68.3,
        clickRate: 12.4,
        replyRate: 4.2,
        preview: 'Hi {{firstName}}, I noticed {{company}} recently {{recentNews}} - congratulations on the momentum!',
      },
      {
        id: 2,
        subject: 'Following up on {{company}}\'s growth initiatives',
        body: `Hi {{firstName}},

I wanted to follow up on my previous email about helping {{company}} with your growth initiatives.

I understand you're probably busy, but I believe our solution could save {{company}} significant time and resources.

Would you have 10 minutes this week for a quick call?

Best regards,
John Doe`,
        status: 'Sent',
        dateSent: '2024-03-18',
        sentCount: 892,
        openRate: 64.2,
        clickRate: 8.7,
        replyRate: 3.8,
        preview: 'Hi {{firstName}}, I wanted to follow up on my previous email about helping {{company}}...',
      }
    ],
    leads: [
      {
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@techcorp.com',
        title: 'VP of Engineering',
        emailProvider: 'Google',
        company: 'TechCorp',
        status: 'Replied',
      },
      {
        firstName: 'Michael',
        lastName: 'Chen',
        email: 'mchen@startupio.com',
        title: 'CEO',
        emailProvider: 'Outlook',
        company: 'StartupIO',
        status: 'Opened',
      },
      {
        firstName: 'Emily',
        lastName: 'Rodriguez',
        email: 'e.rodriguez@healthplus.com',
        title: 'CTO',
        emailProvider: 'Google',
        company: 'HealthPlus',
        status: 'Sent',
      },
      {
        firstName: 'David',
        lastName: 'Park',
        email: 'david@ecommstore.com',
        title: 'Marketing Director',
        emailProvider: 'Custom',
        company: 'EcommStore',
        status: 'Bounced',
      },
    ],
    schedule: {
      startTime: '09:00',
      endTime: '17:00',
      timezone: 'pst',
      activeDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      dailyLimit: 50,
    },
    followups: [
      {
        id: 1,
        step: 1,
        subject: 'Following up on our conversation',
        body: `Hi {{firstName}},

I wanted to follow up on my previous email about helping {{company}} with your growth initiatives.

Would you have 15 minutes this week for a quick call?

Best regards,
John Doe`,
        delay: 3,
        delayUnit: 'days',
      }
    ],
  },
  2: {
    name: 'SaaS Startup Campaign',
    status: 'Active',
    replies: 67,
    bounceRate: 2.8,
    unsubscribeRate: 0.9,
    leadsCount: 1523,
    emailAccounts: [
      {
        id: 1,
        email: 'sarah.chen@acmecorp.com',
        name: 'Sarah Chen',
        sent: 25,
        limit: 30,
        emails: [
          {
            id: 1,
            subject: 'Scaling DevStartup\'s infrastructure efficiently',
            recipient: 'Alex Thompson',
            recipientEmail: 'alex@devstartup.com',
            body: 'Hi Alex,\n\nAs DevStartup grows, I imagine you\'re facing the classic startup dilemma: scaling infrastructure without breaking the bank.\n\nWe\'ve helped Series A startups reduce infrastructure costs by 35% while improving performance.\n\nWould you be interested in a 20-minute demo?\n\nBest,\nSarah Chen',
            dateSent: '2024-03-12',
            status: 'Delivered',
          },
        ],
      },
    ],
    prompts: [
      {
        id: 1,
        text: `Write a cold email for SaaS startup founders and CTOs. Focus on:

1. Technical pain points they likely face
2. Our solution's technical benefits
3. Social proof from similar startups
4. Request for a demo
5. Keep it technical but accessible

Variables: {{firstName}}, {{company}}, {{techStack}}, {{fundingStage}}`,
        dateUsed: '2024-03-10',
      }
    ],
    emails: [
      {
        id: 1,
        subject: `Scaling {{company}}'s infrastructure efficiently`,
        body: `Hi {{firstName}},

As {{company}} grows, I imagine you're facing the classic startup dilemma: scaling infrastructure without breaking the bank or compromising on performance.

We've helped {{fundingStage}} startups using {{techStack}} reduce their infrastructure costs by 35% while improving performance. Companies like TechStart and DevCorp saw immediate results.

Would you be interested in a 20-minute demo to see how this could work for {{company}}?

Best,
Sarah Chen
Technical Solutions`,
        status: 'Sent',
        dateSent: '2024-03-12',
        sentCount: 823,
        openRate: 72.1,
        clickRate: 15.2,
        replyRate: 4.4,
        preview: 'Hi {{firstName}}, As {{company}} grows, I imagine you\'re facing the classic startup dilemma...',
      }
    ],
    leads: [
      {
        firstName: 'Alex',
        lastName: 'Thompson',
        email: 'alex@devstartup.com',
        title: 'CTO',
        emailProvider: 'Google',
        company: 'DevStartup',
        status: 'Replied',
      },
      {
        firstName: 'Lisa',
        lastName: 'Wang',
        email: 'lisa.wang@techflow.io',
        title: 'CEO',
        emailProvider: 'Google',
        company: 'TechFlow',
        status: 'Opened',
      },
    ],
    schedule: {
      startTime: '10:00',
      endTime: '16:00',
      timezone: 'est',
      activeDays: ['Mon', 'Tue', 'Wed', 'Thu'],
      dailyLimit: 30,
    },
    followups: [],
  },
  3: {
    name: 'E-commerce Prospects',
    status: 'Paused',
    replies: 28,
    bounceRate: 4.1,
    unsubscribeRate: 1.8,
    leadsCount: 894,
    emailAccounts: [
      {
        id: 1,
        email: 'mike.rodriguez@acmecorp.com',
        name: 'Mike Rodriguez',
        sent: 15,
        limit: 30,
        emails: [
          {
            id: 1,
            subject: 'Increase ShopBrand\'s conversion rate by 25%',
            recipient: 'Jennifer Martinez',
            recipientEmail: 'jen@shopbrand.com',
            body: 'Hi Jennifer,\n\nI see ShopBrand is doing great work in the e-commerce space.\n\nWe recently helped an e-commerce company increase their conversion rate by 25% and reduce cart abandonment by 30%.\n\nWould you be interested in a brief call?\n\nBest regards,\nMike Rodriguez',
            dateSent: '2024-03-10',
            status: 'Delivered',
          },
        ],
      },
    ],
    prompts: [
      {
        id: 1,
        text: `Target e-commerce business owners and marketing managers. Email should:

1. Address common e-commerce challenges
2. Mention ROI and conversion improvements
3. Include relevant case study
4. Request a consultation call
5. Use results-focused language

Variables: {{firstName}}, {{company}}, {{platform}}, {{monthlyRevenue}}`,
        dateUsed: '2024-03-08',
      }
    ],
    emails: [
      {
        id: 1,
        subject: `Increase {{company}}'s conversion rate by 25%`,
        body: `Hi {{firstName}},

I see {{company}} is doing great work in the e-commerce space. With {{monthlyRevenue}} in monthly revenue, you're clearly doing something right!

I wanted to reach out because we recently helped an e-commerce company similar to yours increase their conversion rate by 25% and reduce cart abandonment by 30% using our optimization platform.

Would you be interested in a brief call to discuss how we could help {{company}} achieve similar results?

Best regards,
Mike Rodriguez
E-commerce Growth`,
        status: 'Sent',
        dateSent: '2024-03-10',
        sentCount: 456,
        openRate: 68.4,
        clickRate: 11.2,
        replyRate: 3.1,
        preview: 'Hi {{firstName}}, I see {{company}} is doing great work in the e-commerce space...',
      }
    ],
    leads: [
      {
        firstName: 'Jennifer',
        lastName: 'Martinez',
        email: 'jen@shopbrand.com',
        title: 'Marketing Manager',
        emailProvider: 'Outlook',
        company: 'ShopBrand',
        status: 'Opened',
      },
    ],
    schedule: {
      startTime: '08:00',
      endTime: '18:00',
      timezone: 'cst',
      activeDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      dailyLimit: 75,
    },
    followups: [],
  },
  4: {
    name: 'Healthcare Decision Makers',
    status: 'Draft',
    replies: 0,
    bounceRate: 0,
    unsubscribeRate: 0,
    leadsCount: 0,
    emailAccounts: [],
    prompts: [
      {
        id: 1,
        text: `Healthcare industry outreach focusing on compliance and efficiency. Include:

1. Healthcare-specific pain points
2. Compliance and security benefits
3. ROI in terms of time savings
4. Request for consultation
5. Professional, trustworthy tone

Variables: {{firstName}}, {{organization}}, {{role}}, {{patientVolume}}`,
        dateUsed: '2024-03-20',
      }
    ],
    emails: [
      {
        id: 1,
        subject: `Streamline {{organization}}'s patient management`,
        body: `Hi {{firstName}},

Managing patient data efficiently while maintaining HIPAA compliance is always a challenge in healthcare.

Our platform helps healthcare organizations like {{organization}} reduce administrative time by 40% while ensuring full compliance. We've worked with facilities handling {{patientVolume}} patients monthly.

Would you be open to a consultation to discuss how this could benefit {{organization}}?

Best regards,
Dr. Emily Watson
Healthcare Solutions`,
        status: 'Draft',
        dateSent: null,
        sentCount: 0,
        openRate: 0,
        clickRate: 0,
        replyRate: 0,
        preview: 'Hi {{firstName}}, Managing patient data efficiently while maintaining HIPAA compliance...',
      }
    ],
    leads: [],
    schedule: {
      startTime: '09:00',
      endTime: '17:00',
      timezone: 'pst',
      activeDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      dailyLimit: 25,
    },
    followups: [],
  },
};

interface CampaignDashboardPageProps {
  campaignId: string;
}

export function CampaignDashboardPage({ campaignId }: CampaignDashboardPageProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('leads');
  const [selectedEmailAccount, setSelectedEmailAccount] = useState<any>(null);
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [showAllEmails, setShowAllEmails] = useState(false);
  const campaign = campaignData[parseInt(campaignId) as keyof typeof campaignData];

  // Handle tab query parameter from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && ['leads', 'prompts', 'emails', 'schedule', 'followups'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, []);

  if (!campaign) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-foreground">Campaign not found</h1>
          <p className="text-muted-foreground mt-2">The campaign you're looking for doesn't exist.</p>
          <Link href="/campaigns">
            <Button className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Campaigns
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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

  const handleRepliesClick = () => {
    router.push('/unibox');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Replied':
        return 'bg-success/10 text-success';
      case 'Opened':
        return 'bg-primary/10 text-primary';
      case 'Sent':
        return 'bg-muted text-foreground';
      case 'Bounced':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-foreground';
    }
  };

  const handleEmailClick = (email: any) => {
    setSelectedEmail(email);
  };

  const handleBackToAccountList = () => {
    setSelectedEmailAccount(null);
    setSelectedEmail(null);
    setShowAllEmails(false);
  };

  const handleBackToEmailList = () => {
    setSelectedEmail(null);
  };

  const getAllEmails = () => {
    return campaign.emailAccounts.flatMap(account =>
      account.emails.map(email => ({ ...email, accountName: account.name, accountEmail: account.email }))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/campaigns">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {campaign.name}
              </h1>
              {getStatusBadge(campaign.status)}
            </div>
            <p className="text-muted-foreground">Campaign performance and analytics</p>
          </div>
        </div>
        <div className="flex space-x-3">
          {campaign.status === 'Active' ? (
            <Button variant="outline">
              <Pause className="w-4 h-4 mr-2" />
              Pause Campaign
            </Button>
          ) : (
            <Button>
              <Play className="w-4 h-4 mr-2" />
              Resume Campaign
            </Button>
          )}
        </div>
      </div>

      {/* Metrics Boxes - Wider and Aligned */}
      <div className="grid grid-cols-4 gap-4">
        <div
          onClick={handleRepliesClick}
          className="bg-card rounded-lg border border-border p-6 cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{campaign.replies}</div>
            <div className="text-sm text-muted-foreground">Replies</div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{campaign.bounceRate}%</div>
            <div className="text-sm text-muted-foreground">Bounce Rate</div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{campaign.unsubscribeRate}%</div>
            <div className="text-sm text-muted-foreground">Unsubscribe Rate</div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{campaign.leadsCount.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Leads Used</div>
          </div>
        </div>
      </div>

      {/* Dark Tab Navigation */}
      <div className="bg-sidebar rounded-lg p-1">
        <div className="flex space-x-1">
          {[
            { id: 'leads', label: 'Leads', icon: Users },
            { id: 'prompts', label: 'Prompts', icon: FileText },
            { id: 'emails', label: 'Emails', icon: Mail },
            { id: 'schedule', label: 'Schedule', icon: Calendar },
            { id: 'followups', label: 'Followups', icon: Repeat },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id !== 'emails') {
                  setSelectedEmail(null);
                  setSelectedEmailAccount(null);
                  setShowAllEmails(false);
                }
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-sidebar-accent text-sidebar-foreground'
                  : 'text-muted-foreground/40 hover:text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Campaign Leads</CardTitle>
                  <CardDescription>All leads in this campaign</CardDescription>
                </div>
                <Link href={`/campaigns/${campaignId}/add-data`}>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Data
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {campaign.leads.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>First Name</TableHead>
                      <TableHead>Last Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Email Provider</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaign.leads.map((lead, index) => (
                      <TableRow key={index}>
                        <TableCell>{lead.firstName}</TableCell>
                        <TableCell>{lead.lastName}</TableCell>
                        <TableCell>{lead.email}</TableCell>
                        <TableCell>{lead.title}</TableCell>
                        <TableCell>{lead.emailProvider}</TableCell>
                        <TableCell>{lead.company}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(lead.status)}>
                            {lead.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground/60" />
                  <h3 className="mt-2 text-sm font-medium text-foreground">No leads added</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Add leads to this campaign to start sending emails.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Prompts Tab */}
        {activeTab === 'prompts' && (
          <Card>
            <CardHeader>
              <CardTitle>AI Prompts</CardTitle>
              <CardDescription>Prompts used to generate email content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaign.prompts.map((prompt) => (
                  <div key={prompt.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Prompt #{prompt.id}</h3>
                      <span className="text-sm text-muted-foreground">Used: {prompt.dateUsed}</span>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <pre className="text-sm whitespace-pre-wrap font-mono">
                        {prompt.text}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Emails Tab */}
        {activeTab === 'emails' && (
          <div className={`grid grid-cols-1 gap-6 ${selectedEmail ? 'lg:grid-cols-3' : ''}`}>
            {/* Email Account/List View */}
            <div className={selectedEmail ? 'lg:col-span-1' : ''}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>
                        {!selectedEmailAccount && !showAllEmails ? 'Email Accounts' :
                         showAllEmails ? 'All Sent Emails' : `Emails from ${selectedEmailAccount?.name}`}
                      </CardTitle>
                      <CardDescription>
                        {!selectedEmailAccount && !showAllEmails ? 'Email accounts linked to this campaign' :
                         showAllEmails ? 'All emails sent from all accounts' : 'Emails sent from this account'}
                      </CardDescription>
                    </div>
                    {(selectedEmailAccount || showAllEmails) && (
                      <Button variant="outline" size="sm" onClick={handleBackToAccountList}>
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back to Accounts
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {!selectedEmailAccount && !showAllEmails ? (
                    // Email Accounts View
                    <div className="space-y-3">
                      {/* Show All Option at Top */}
                      <div className="pb-3 border-b">
                        <Button
                          variant="outline"
                          onClick={() => setShowAllEmails(true)}
                          className="w-full bg-primary/10 border-border hover:bg-primary/10 text-primary font-medium"
                        >
                          Show All Emails ({getAllEmails().length})
                        </Button>
                      </div>

                      {campaign.emailAccounts.length > 0 ? (
                        <div>
                          {campaign.emailAccounts.map((account) => (
                            <div
                              key={account.id}
                              onClick={() => setSelectedEmailAccount(account)}
                              className="p-4 border rounded-lg cursor-pointer hover:bg-muted transition-colors border-border"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium text-sm">{account.name}</h3>
                                <Badge variant="outline">
                                  {account.sent}/{account.limit}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">{account.email}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {account.emails.length} emails sent
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Mail className="mx-auto h-8 w-8 text-muted-foreground/60" />
                          <p className="mt-2 text-sm text-muted-foreground">No email accounts linked</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    // Emails List View
                    <div className="space-y-3">
                      {(showAllEmails ? getAllEmails() : selectedEmailAccount?.emails || []).map((email: any) => (
                        <div
                          key={email.id}
                          onClick={() => handleEmailClick(email)}
                          className={`p-4 border rounded-lg cursor-pointer hover:bg-muted transition-colors ${
                            selectedEmail?.id === email.id ? 'border-primary bg-primary/10' : 'border-border'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-sm truncate">{email.subject}</h3>
                            <div className="flex items-center space-x-2">
                              {showAllEmails && (
                                <span className="text-xs font-bold text-foreground bg-muted px-2 py-1 rounded">
                                  {email.accountName}
                                </span>
                              )}
                              <Badge className={getStatusColor(email.status)}>
                                {email.status}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">To: {email.recipient}</p>
                          <p className="text-xs text-muted-foreground mb-1 line-clamp-1">
                            {email.body.split('\n')[0]}
                          </p>
                          <p className="text-xs text-muted-foreground">Sent: {email.dateSent}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Email Details */}
            {selectedEmail && (
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Email Details</CardTitle>
                        <CardDescription>Full email content and information</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleBackToEmailList}>
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back to List
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 p-3 bg-muted rounded-lg text-sm">
                      <div>
                        <span className="text-muted-foreground">To:</span>
                        <span className="ml-2 font-medium">{selectedEmail.recipient}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">From:</span>
                        <span className="ml-2 font-medium">
                          {selectedEmail.accountName || selectedEmailAccount?.name}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Date:</span>
                        <span className="ml-2">{selectedEmail.dateSent}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Status:</span>
                        <Badge className={`ml-2 ${getStatusColor(selectedEmail.status)}`}>
                          {selectedEmail.status}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Subject</Label>
                      <div className="mt-1 p-3 bg-muted rounded border">
                        {selectedEmail.subject}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Email Body</Label>
                      <div className="mt-1 p-4 bg-muted rounded border">
                        <pre className="text-sm whitespace-pre-wrap font-sans">
                          {selectedEmail.body}
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <Card>
            <CardHeader>
              <CardTitle>Campaign Schedule</CardTitle>
              <CardDescription>Current scheduling configuration for this campaign</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium mb-3 block">Sending Hours</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="start-time" className="text-xs text-muted-foreground">Start Time</Label>
                      <Select value={campaign.schedule.startTime}>
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
                      <Select value={campaign.schedule.endTime}>
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
                  <Select value={campaign.schedule.timezone}>
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
                        checked={campaign.schedule.activeDays.includes(day)}
                        disabled
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
                  value={campaign.schedule.dailyLimit}
                  className="w-32"
                  disabled
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Followups Tab */}
        {activeTab === 'followups' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Follow-up Sequence</CardTitle>
                  <CardDescription>Configure follow-up emails for this campaign</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Step
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaign.followups.map((followup, index) => (
                  <div key={followup.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Step {followup.step}</h3>
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

                {campaign.followups.length === 0 && (
                  <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
                    <Clock className="mx-auto h-8 w-8 text-muted-foreground/60" />
                    <p className="mt-2 text-sm text-muted-foreground">No follow-up steps configured</p>
                    <p className="text-xs text-muted-foreground/60">Add follow-up steps to increase response rates</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
