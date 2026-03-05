import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ScrapingCampaignWizardPage } from '@/components/pages/scraping-campaign-wizard-page';

export default function NewScrapingCampaign() {
  return (
    <DashboardLayout>
      <ScrapingCampaignWizardPage />
    </DashboardLayout>
  );
}