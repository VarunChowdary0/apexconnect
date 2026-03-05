import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ScrapingCampaignsPage } from '@/components/pages/scraping-campaigns-page';

export default function ScrapingCampaigns() {
  return (
    <DashboardLayout>
      <ScrapingCampaignsPage />
    </DashboardLayout>
  );
}