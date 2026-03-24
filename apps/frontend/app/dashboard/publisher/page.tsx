import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { getUserRole } from '@/lib/auth-helpers';
import { getAdSlots } from '@/lib/api';
import { AdSlotList } from './components/ad-slot-list';

export default async function PublisherDashboard() {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session?.user) {
    redirect('/login');
  }

  // Verify user has 'publisher' role
  const roleData = await getUserRole(session.user.id);
  if (roleData.role !== 'publisher' || !roleData.publisherId) {
    redirect('/');
  }

  // Forward the session cookie to the backend API
  const cookie = headersList.get('cookie') ?? '';
  const adSlots = await getAdSlots({ headers: { cookie } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Ad Slots</h1>
      <h2 id="publisher-slots-heading" className="text-lg font-semibold text-[--color-foreground]">
        Your listings
      </h2>
      <AdSlotList adSlots={adSlots} aria-labelledby="publisher-slots-heading" />
    </div>
  );
}
