import Link from 'next/link';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/auth';
import { getMarketplaceAdSlot } from '@/lib/api';
import { getUserRole, type RoleData } from '@/lib/auth-helpers';
import { adSlotDetailTv } from '../marketplace.styles';
import { AdSlotMain } from './components/ad-slot-main';
import { BookingSidebar } from './components/booking-sidebar';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdSlotPage({ params }: Readonly<Props>) {
  const { id } = await params;

  let adSlot;
  try {
    adSlot = await getMarketplaceAdSlot(id);
  } catch {
    notFound();
  }

  let user: { id: string; name?: string; email?: string } | null = null;
  let roleInfo: RoleData | null = null;

  try {
    const headersList = await headers();
    const session = await auth.api.getSession({ headers: headersList });
    if (session?.user?.id) {
      user = {
        id: session.user.id,
        name: session.user.name ?? undefined,
        email: session.user.email ?? undefined,
      };
      roleInfo = await getUserRole(session.user.id);
    }
  } catch {
    // Anonymous visitor — no session
  }

  const d = adSlotDetailTv();

  return (
    <div className={d.root()}>
      <Link href="/marketplace" className={d.backLink()}>
        ← Back to Marketplace
      </Link>

      <div className={d.layout()}>
        <AdSlotMain adSlot={adSlot} />
        <BookingSidebar key={id} adSlot={adSlot} user={user} roleInfo={roleInfo} />
      </div>
    </div>
  );
}
