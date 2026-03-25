import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { getUserRole } from '@/lib/auth-helpers';
import { getCampaigns } from '@/lib/api';
import { CampaignList } from './components/campaign-list';

function StatCard({
  label,
  value,
}: Readonly<{ label: string; value: string | number }>) {
  return (
    <div className="rounded-xl bg-[--color-background] p-5 shadow-[--shadow-card]">
      <p className="text-sm font-medium text-[--color-muted]">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}

export default async function SponsorDashboard() {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session?.user) {
    redirect('/login');
  }

  const roleData = await getUserRole(session.user.id);
  if (roleData.role !== 'sponsor' || !roleData.sponsorId) {
    redirect('/');
  }

  const cookie = headersList.get('cookie') ?? '';
  const campaigns = await getCampaigns({ headers: { cookie } });

  const totalBudget = campaigns.reduce((sum, c) => sum + Number(c.budget), 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + Number(c.spent), 0);
  const activeCampaigns = campaigns.filter((c) => c.status === 'ACTIVE').length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">My Campaigns</h1>
        <p className="mt-1 text-[--color-muted]">Manage and track your sponsorship campaigns</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Campaigns" value={campaigns.length} />
        <StatCard label="Active" value={activeCampaigns} />
        <StatCard
          label="Total Budget"
          value={`$${totalBudget.toLocaleString()}`}
        />
        <StatCard
          label="Total Spent"
          value={`$${totalSpent.toLocaleString()}`}
        />
      </div>

      <CampaignList campaigns={campaigns} />
    </div>
  );
}
