import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { getUserRole } from '@/lib/auth-helpers';
import { getAdSlots } from '@/lib/api';
import { AdSlotList } from './components/ad-slot-list';

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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">My Ad Slots</h1>
        <p className="mt-1 text-[--color-muted]">Manage your advertising inventory</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Slots" value={adSlots.length} />
        <StatCard label="Available" value={available} />
        <StatCard label="Booked" value={booked} />
        <StatCard
          label="Monthly Revenue"
          value={`$${monthlyRevenue.toLocaleString()}`}
        />
      </div>

      <AdSlotList adSlots={adSlots} />
    </div>
  );
}
