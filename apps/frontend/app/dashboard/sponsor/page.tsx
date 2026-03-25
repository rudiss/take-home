import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { getUserRole } from '@/lib/auth-helpers';
import { getCampaigns } from '@/lib/api';
import { CampaignList } from './components/campaign-list';
import { sponsorPageTv } from './sponsor-dashboard.styles';

function StatCard({
  label,
  value,
}: Readonly<{ label: string; value: string | number }>) {
  const page = sponsorPageTv();
  return (
    <div className={page.statCard()}>
      <p className={page.statLabel()}>{label}</p>
      <p className={page.statValue()}>{value}</p>
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

  const page = sponsorPageTv();

  return (
    <div className={page.root()}>
      <div className={page.headerBlock()}>
        <h1 className={page.title()}>My Campaigns</h1>
        <p className={page.subtitle()}>Manage and track your sponsorship campaigns</p>
      </div>

      <div className={page.statsGrid()}>
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
