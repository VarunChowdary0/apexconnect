import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { EmailAccountsPage } from '@/components/pages/email-accounts-page';

export default function EmailAccounts() {
  return (
    <DashboardLayout>
      <EmailAccountsPage />
    </DashboardLayout>
  );
}