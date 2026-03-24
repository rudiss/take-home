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
  if (roleData.role !== 'sponsor' || !roleData.sponsorId) {
    redirect('/');
  }

  // Forward the session cookie to the backend API
  const cookie = headersList.get('cookie') ?? '';
  const campaigns = await getCampaigns({ headers: { cookie } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Campaigns</h1>
      <h2 id="sponsor-campaigns-heading" className="text-lg font-semibold text-[--color-foreground]">
        Your campaigns
      </h2>
      <CampaignList campaigns={campaigns} aria-labelledby="sponsor-campaigns-heading" />
    </div>
  );
}
