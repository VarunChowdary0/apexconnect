import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { CampaignsPage } from '@/components/pages/campaigns-page';

export default function Campaigns() {
  return (
    <DashboardLayout>
      <CampaignsPage />
    </DashboardLayout>
  );
}