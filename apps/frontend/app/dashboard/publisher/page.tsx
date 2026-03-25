import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { getUserRole } from '@/lib/auth-helpers';
import { getAdSlots } from '@/lib/api';
import { AdSlotList } from './components/ad-slot-list';
import { publisherHeaderTv, publisherStatsRowTv } from './publisher-dashboard.styles';

export default async function PublisherDashboard() {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session?.user) {
    redirect('/login');
  }

  const roleData = await getUserRole(session.user.id);
  if (roleData.role !== 'publisher' || !roleData.publisherId) {
    redirect('/');
  }

  const cookie = headersList.get('cookie') ?? '';
  const adSlots = await getAdSlots({ headers: { cookie } });

  const available = adSlots.filter((s) => s.isAvailable).length;
  const booked = adSlots.length - available;
  const monthlyRevenue = adSlots
    .filter((s) => !s.isAvailable)
    .reduce((sum, s) => sum + Number(s.basePrice), 0);

  const header = publisherHeaderTv();
  const stats = publisherStatsRowTv();

  return (
    <div className="space-y-8">
      <div className={header.block()}>
        <h1 className={header.title()}>My Ad Slots</h1>
        <p className={header.subtitle()}>Manage your advertising inventory</p>
      </div>

      <div className={stats.row()}>
        <p className={stats.item()}>
          <span className={stats.label()}>Total Slots </span>
          <span className={stats.value()}>({adSlots.length})</span>
        </p>
        <p className={stats.item()}>
          <span className={stats.label()}>Available </span>
          <span className={stats.value()}>({available})</span>
        </p>
        <p className={stats.item()}>
          <span className={stats.label()}>Booked </span>
          <span className={stats.value()}>({booked})</span>
        </p>
        <p className={stats.item()}>
          <span className={stats.label()}>Monthly Revenue </span>
          <span className={stats.value()}>(${monthlyRevenue.toLocaleString()})</span>
        </p>
      </div>

      <AdSlotList adSlots={adSlots} />
    </div>
  );
}
