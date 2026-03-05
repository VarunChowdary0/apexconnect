import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { CampaignWizardPage } from '@/components/pages/campaign-wizard-page';

export default function NewCampaign() {
  return (
    <DashboardLayout>
      <CampaignWizardPage />
    </DashboardLayout>
  );
}