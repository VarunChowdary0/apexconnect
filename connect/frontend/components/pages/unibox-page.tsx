'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Inbox,
  ThumbsUp,
  Minus,
  ThumbsDown,
  Reply,
  Archive,
  Star,
  MoreHorizontal,
  Target,
  Paperclip,
  Send,
  Sparkles,
  X,
  ChevronDown,
  Folder,
  Badge as LucideBadge,
  Trash2,
  MailOpen,
  Mail,
} from 'lucide-react';

const replies = [
  {
    id: 1,
    from: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    company: 'TechCorp',
    subject: 'Re: Partnership Opportunity',
    preview: 'Thanks for reaching out! This sounds interesting and I\'d like to learn more...',
    sentiment: 'positive',
    timestamp: '2 minutes ago',
    unread: true,
    campaign: 'Q4 Enterprise Outreach',
  },
  {
    id: 2,
    from: 'Michael Chen',
    email: 'mchen@startupio.com',
    company: 'StartupIO',
    subject: 'Re: SaaS Solution Demo',
    preview: 'Hi there, I appreciate the outreach but we\'re not looking for new solutions...',
    sentiment: 'negative',
    timestamp: '15 minutes ago',
    unread: true,
    campaign: 'SaaS Startup Campaign',
  },
  {
    id: 3,
    from: 'Emily Rodriguez',
    email: 'e.rodriguez@healthplus.com',
    company: 'HealthPlus',
    subject: 'Re: Healthcare Analytics Platform',
    preview: 'We might be interested. Can you send over more information about pricing...',
    sentiment: 'neutral',
    timestamp: '1 hour ago',
    unread: false,
    campaign: 'Healthcare Decision Makers',
  },
  {
    id: 4,
    from: 'David Park',
    email: 'david@ecommstore.com',
    company: 'EcommStore',
    subject: 'Re: E-commerce Optimization',
    preview: 'This looks great! I\'d love to schedule a call to discuss further...',
    sentiment: 'positive',
    timestamp: '3 hours ago',
    unread: false,
    campaign: 'E-commerce Prospects',
  },
];

const campaigns = [
  { id: '1', name: 'Q4 Enterprise Outreach' },
  { id: '2', name: 'SaaS Startup Campaign' },
  { id: '3', name: 'E-commerce Prospects' },
  { id: '4', name: 'Healthcare Decision Makers' },
];

const mockThreadAttachments = [
  {
    id: 1,
    name: 'Company_Brochure.pdf',
    size: '2.4 MB',
    type: 'pdf',
    url: '#',
    sender: 'John Doe',
    timestamp: '2 days ago',
  },
  {
    id: 2,
    name: 'Product_Demo.mp4',
    size: '15.2 MB',
    type: 'video',
    url: '#',
    sender: 'Sarah Johnson',
    timestamp: '1 day ago',
  },
  {
    id: 3,
    name: 'Pricing_Sheet.xlsx',
    size: '1.1 MB',
    type: 'excel',
    url: '#',
    sender: 'John Doe',
    timestamp: '2 hours ago',
  },
];

const mockDetailedEmailThread = {
  id: 1,
  from: 'Sarah Johnson',
  email: 'sarah.johnson@techcorp.com',
  company: 'TechCorp',
  subject: 'Re: Partnership Opportunity',
  sentiment: 'positive',
  timestamp: '2 minutes ago',
  campaign: 'Q4 Enterprise Outreach',
  thread: [
    {
      id: 1,
      from: 'John Doe',
      email: 'john@coldemailpro.com',
      content: 'Hi Sarah,\n\nI hope this email finds you well. I wanted to reach out regarding a potential partnership opportunity between TechCorp and our company.\n\nWe specialize in helping companies like yours increase their email marketing ROI through advanced automation and personalization.\n\nWould you be interested in a brief 15-minute call to discuss how we might be able to help TechCorp achieve its growth goals?\n\nBest regards,\nJohn Doe',
      timestamp: '2 days ago',
      sent: true,
    },
    {
      id: 2,
      from: 'Sarah Johnson',
      email: 'sarah.johnson@techcorp.com',
      content: 'Hi John,\n\nThanks for reaching out! This sounds interesting and I\'d like to learn more about your solution.\n\nWe\'re currently evaluating our email marketing stack and looking for ways to improve our engagement rates. A 15-minute call sounds perfect.\n\nI\'m available next week on Tuesday or Wednesday afternoon. Would either of those work for you?\n\nLooking forward to hearing from you.\n\nBest,\nSarah Johnson\nDirector of Marketing\nTechCorp',
      timestamp: '2 minutes ago',
      sent: false,
    },
  ],
};

export function UniboxPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedEmail, setSelectedEmail] = useState<any>(mockDetailedEmailThread);
  const [showThreadAttachments, setShowThreadAttachments] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [emailListTab, setEmailListTab] = useState('all');
  const [selectedCampaign, setSelectedCampaign] = useState<string>('');
  const [selectedEmails, setSelectedEmails] = useState<Set<number>>(new Set());
  const [campaignEmails, setCampaignEmails] = useState<any[]>([]);
  const [loadingCampaign, setLoadingCampaign] = useState(false);

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <Badge className="bg-success/10 text-success">Positive</Badge>;
      case 'negative':
        return <Badge className="bg-destructive/10 text-destructive">Negative</Badge>;
      case 'neutral':
        return <Badge className="bg-warning/10 text-warning">Neutral</Badge>;
      default:
        return <Badge variant="secondary">{sentiment}</Badge>;
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp className="h-4 w-4 text-success" />;
      case 'negative':
        return <ThumbsDown className="h-4 w-4 text-destructive" />;
      case 'neutral':
        return <Minus className="h-4 w-4 text-warning" />;
      default:
        return null;
    }
  };

  const handleEmailSelect = (emailId: number, checked: boolean) => {
    const newSelected = new Set(selectedEmails);
    if (checked) {
      newSelected.add(emailId);
    } else {
      newSelected.delete(emailId);
    }
    setSelectedEmails(newSelected);
  };

  const handleEmailAction = (action: string, emailId: number) => {
    console.log(`${action} action for email ${emailId}`);
    // Mock action implementation
    switch (action) {
      case 'blocklist':
        console.log('Added to blocklist');
        break;
      case 'label':
        console.log('Create label');
        break;
      case 'delete':
        console.log('Delete email');
        break;
      case 'unread':
        console.log('Mark as unread');
        break;
      case 'read':
        console.log('Mark as read');
        break;
    }
  };

  const currentEmails = selectedCampaign ? campaignEmails : replies;
  const filteredReplies = currentEmails.filter(reply => {
    if (emailListTab === 'all') return true;
    if (emailListTab === 'positive') return reply.sentiment === 'positive';
    if (emailListTab === 'neutral') return reply.sentiment === 'neutral';
    if (emailListTab === 'negative') return reply.sentiment === 'negative';
    if (emailListTab === 'opportunities') return reply.sentiment === 'positive'; // Mock opportunities
    if (emailListTab === 'archived') return false; // Mock archived (none for now)
    return true;
  });

  const handleEmailClick = (reply: any) => {
    // If clicking on the email that has detailed thread data, use the mock data
    if (reply.id === 1) {
      setSelectedEmail(mockDetailedEmailThread);
    } else {
      // For other emails, create a basic thread structure
      setSelectedEmail({
        ...reply,
        thread: [
          {
            id: 1,
            from: 'John Doe',
            email: 'john@coldemailpro.com',
            content: `Hi ${reply.from.split(' ')[0]},\n\nThank you for your interest in our services. We'd love to discuss how we can help your company achieve its goals.\n\nBest regards,\nJohn Doe`,
            timestamp: '2 days ago',
            sent: true,
          },
          {
            id: 2,
            from: reply.from,
            email: reply.email,
            content: reply.preview,
            timestamp: reply.timestamp,
            sent: false,
          },
        ],
      });
    }
  };

  const handleBackToList = () => {
    setSelectedEmail(null);
  };

  const handleSendReply = () => {
    if (replyText.trim()) {
      // Mock sending reply
      console.log('Sending reply:', replyText);
      setReplyText('');
    }
  };

  const handleAIAssist = () => {
    // Mock AI assist
    setReplyText('Thank you for your interest! I\'d be happy to schedule a call to discuss this further. When would be a good time for you?');
  };

  const handleCampaignSelect = (campaignId: string) => {
    if (campaignId === 'all') {
      setSelectedCampaign('');
      setCampaignEmails([]);
      setLoadingCampaign(false);
      return;
    }

    setLoadingCampaign(true);
    setSelectedCampaign(campaignId);

    // Mock loading campaign emails
    setTimeout(() => {
      const mockCampaignEmails = [
        {
          id: 101,
          from: 'Alex Thompson',
          email: 'alex@devstartup.com',
          company: 'DevStartup',
          subject: 'Re: Scaling infrastructure efficiently',
          preview: 'Thanks for reaching out about infrastructure scaling. This looks interesting...',
          sentiment: 'positive',
          timestamp: '1 hour ago',
          unread: true,
          campaign: campaigns.find(c => c.id === campaignId)?.name || 'Unknown Campaign',
        },
        {
          id: 102,
          from: 'Lisa Wang',
          email: 'lisa.wang@techflow.io',
          company: 'TechFlow',
          subject: 'Re: SaaS solution demo',
          preview: 'We might be interested in learning more about your platform...',
          sentiment: 'neutral',
          timestamp: '3 hours ago',
          unread: false,
          campaign: campaigns.find(c => c.id === campaignId)?.name || 'Unknown Campaign',
        },
      ];
      setCampaignEmails(mockCampaignEmails);
      setLoadingCampaign(false);
    }, 500);
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Unibox</h1>
          <p className="text-muted-foreground">Unified inbox for all your email replies</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-1 pt-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Replies</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-3">
            <div className="text-2xl font-bold">221</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1 pt-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <ThumbsUp className="h-4 w-4 mr-1" />
              Positive
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-3">
            <div className="text-2xl font-bold text-success">89</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1 pt-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Minus className="h-4 w-4 mr-1" />
              Neutral
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-3">
            <div className="text-2xl font-bold text-warning">95</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1 pt-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <ThumbsDown className="h-4 w-4 mr-1" />
              Negative
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-3">
            <div className="text-2xl font-bold text-destructive">37</div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Filter */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Folder className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-bold text-foreground">All Campaigns:</span>
            </div>
            <Select value={selectedCampaign} onValueChange={handleCampaignSelect} disabled={loadingCampaign}>
              <SelectTrigger className="w-64 border-border bg-card font-medium text-foreground">
                <SelectValue placeholder={loadingCampaign ? "Loading..." : "Select a campaign to filter emails"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Replies</SelectItem>
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
      <div className={`grid gap-6 h-[600px] ${selectedEmail ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {/* Replies List */}
        <Card className={selectedEmail ? 'lg:col-span-1' : ''}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CardTitle>Replies</CardTitle>
                <div className="flex items-center space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                          <Target className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Opportunities</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                          <Archive className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Archived</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              {selectedEmail && (
                <Button variant="outline" size="sm" onClick={handleBackToList}>
                  <X className="h-4 w-4 mr-1" />
                  Back to List
                </Button>
              )}
            </div>
            <Tabs value={emailListTab} onValueChange={setEmailListTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="positive">
                  <ThumbsUp className="h-3 w-3" />
                </TabsTrigger>
                <TabsTrigger value="neutral">
                  <Minus className="h-3 w-3" />
                </TabsTrigger>
                <TabsTrigger value="negative">
                  <ThumbsDown className="h-3 w-3" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[480px]">
              <div className="space-y-1 p-4 pt-0">
                {filteredReplies.map((reply) => (
                  <div
                    key={reply.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedEmail?.id === reply.id
                        ? 'bg-primary/10 border border-primary/30'
                        : 'hover:bg-muted border border-transparent'
                    }`}
                  >
                    <div className="flex items-start space-x-3" onClick={() => handleEmailClick(reply)}>
                      <input
                        type="checkbox"
                        checked={selectedEmails.has(reply.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleEmailSelect(reply.id, e.target.checked);
                        }}
                        className="mt-1 h-4 w-4 text-primary focus:ring-primary border-border rounded"
                      />
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>{reply.from.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium truncate">{reply.from}</p>
                          {reply.unread && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{reply.company}</p>
                        <p className="text-sm font-medium text-foreground mb-1 truncate">
                          {reply.subject}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{reply.preview}</p>
                        <div className="flex items-center justify-between mt-2">
                          {getSentimentIcon(reply.sentiment)}
                          <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                        </div>
                      </div>
                    </div>

                    {/* Email Actions - Only show when checkbox is selected */}
                    {selectedEmails.has(reply.id) && (
                      <div className="flex items-center justify-end space-x-2 mt-3 pt-2 border-t border-border">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEmailAction('blocklist', reply.id);
                                }}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Add to blocklist</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEmailAction('label', reply.id);
                                }}
                              >
                                <LucideBadge className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Create label</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEmailAction('delete', reply.id);
                                }}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete email</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEmailAction(reply.unread ? 'read' : 'unread', reply.id);
                                }}
                              >
                                {reply.unread ? (
                                  <MailOpen className="h-3 w-3" />
                                ) : (
                                  <Mail className="h-3 w-3" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{reply.unread ? 'Mark as read' : 'Mark as unread'}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Email Thread */}
        {selectedEmail && (
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{selectedEmail.subject}</CardTitle>
                <CardDescription>
                  From {selectedEmail.campaign} • {selectedEmail.timestamp}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-3">
                {getSentimentBadge(selectedEmail.sentiment)}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Target className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Mark as Opportunity</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Archive className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Archive</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setShowThreadAttachments(true)}>
                        <Paperclip className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View Thread Attachments</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[320px] mb-4">
              <div className="space-y-4">
                {selectedEmail.thread.map((message: any) => (
                  <div key={message.id} className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${message.sent ? 'order-2' : 'order-1'}`}>
                      <div className={`p-4 rounded-lg ${
                        message.sent
                          ? 'bg-primary text-white ml-4'
                          : 'bg-muted text-foreground mr-4'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-medium opacity-75">
                              {message.from}
                            </span>
                            <span className="text-xs opacity-60">
                              {message.timestamp}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 opacity-60 hover:opacity-100"
                          >
                            <Paperclip className="h-3 w-3" />
                          </Button>
                        </div>
                        <pre className="text-sm whitespace-pre-wrap font-sans">
                          {message.content}
                        </pre>
                      </div>
                    </div>
                    <div className={`flex items-end ${message.sent ? 'order-1 mr-2' : 'order-2 ml-2'}`}>
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>
                          {message.from.split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Reply Section */}
            <div className="border-t pt-4">
              <div className="space-y-3">
                <Textarea
                  placeholder="Type your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm" onClick={handleAIAssist}>
                            <Sparkles className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>AI Assist</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Paperclip className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Attach Files</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Button onClick={handleSendReply} disabled={!replyText.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Reply
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        )}
      </div>

      {/* Thread Attachments Modal */}
      <Dialog open={showThreadAttachments} onOpenChange={setShowThreadAttachments}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thread Attachments</DialogTitle>
            <DialogDescription>
              All attachments exchanged in this conversation
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-3">
              {mockThreadAttachments.map((attachment) => (
                <div key={attachment.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Paperclip className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{attachment.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {attachment.size} • From {attachment.sender} • {attachment.timestamp}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
