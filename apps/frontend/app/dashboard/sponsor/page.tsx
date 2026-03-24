import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { getUserRole } from '@/lib/auth-helpers';
import { getCampaigns } from '@/lib/api';
import { CampaignList } from './components/campaign-list';

export default async function SponsorDashboard() {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session?.user) {
    redirect('/login');
  }

  // Verify user has 'sponsor' role
  const roleData = await getUserRole(session.user.id);
  if (roleData.role !== 'sponsor') {
    redirect('/');
  }

  // Forward the session cookie to the backend API
  const cookie = headersList.get('cookie') ?? '';
  const campaigns = await getCampaigns({ headers: { cookie } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Campaigns</h1>
        {/* TODO: Add CreateCampaignButton here */}
      </div>

      <CampaignList campaigns={campaigns} />
    </div>
  );
}
