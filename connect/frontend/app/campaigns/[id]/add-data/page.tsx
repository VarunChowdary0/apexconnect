import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { AddDataPage } from '@/components/pages/add-data-page';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
  ];
}

export default function AddData({ params }: { params: { id: string } }) {
  return (
    <DashboardLayout>
      <AddDataPage campaignId={params.id} />
    </DashboardLayout>
  );
}