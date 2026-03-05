'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Mail,
  Plus,
  Settings,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

export function EmailAccountsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Email Accounts</h1>
          <p className="text-muted-foreground">Manage your connected email accounts</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Account
        </Button>
      </div>

      {/* Empty State */}
      <Card className="text-center py-16">
        <CardContent>
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <Mail className="w-12 h-12 text-muted-foreground/60" />
          </div>
          <CardTitle className="mb-2">Add an email account to get started</CardTitle>
          <CardDescription className="mb-6 max-w-md mx-auto">
            Connect your email accounts to start sending cold email campaigns.
            We support Gmail, Outlook, and custom SMTP configurations.
          </CardDescription>
          <div className="flex justify-center space-x-4">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Gmail Account
            </Button>
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Outlook Account
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="bg-success/10 p-2 rounded-lg">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <CardTitle className="text-lg">Easy Setup</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Connect your email accounts in just a few clicks with OAuth authentication</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Settings className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Advanced Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Configure daily send limits, warm-up settings, and deliverability options</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="bg-warning/10 p-2 rounded-lg">
                <AlertCircle className="h-5 w-5 text-warning" />
              </div>
              <CardTitle className="text-lg">Health Monitoring</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Monitor your email account health, deliverability scores, and reputation</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
