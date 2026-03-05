import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { CampaignDashboardPage } from '@/components/pages/campaign-dashboard-page';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
  ];
}

export default function CampaignDashboard({ params }: { params: { id: string } }) {
  return (
    <DashboardLayout>
      <CampaignDashboardPage campaignId={params.id} />
    </DashboardLayout>
  );
}