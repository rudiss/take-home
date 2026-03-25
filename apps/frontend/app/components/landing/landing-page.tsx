import Link from 'next/link';
import { LandingHeroVisual } from '@/app/components/landing/landing-hero-visual';
import {
  IconBriefcase,
  IconChart,
  IconHandshake,
  IconMegaphone,
  IconRocket,
  IconSparkles,
} from '@/app/components/landing/landing-icons';
import {
  featureCard,
  featureIcon,
  link,
  sectionHeading,
  stepBadge,
} from './landing-page.styles';

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

interface Feature {
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  color: 'indigo' | 'emerald' | 'violet' | 'amber' | 'sky' | 'rose';
  title: string;
  description: string;
  extraClass?: string;
}

const features: Feature[] = [
  {
    icon: IconMegaphone,
    color: 'indigo',
    title: 'For sponsors',
    description:
      'Browse vetted inventory by format and price. Request placements in one flow and align with publishers on goals and creative.',
  },
  {
    icon: IconChart,
    color: 'emerald',
    title: 'Campaign clarity',
    description:
      'Tie spend to real placements—newsletters, display, podcast reads, and more—without opaque bundles.',
  },
  {
    icon: IconBriefcase,
    color: 'violet',
    title: 'For publishers',
    description:
      'List slots with clear descriptions and pricing. Sponsors discover you on the open marketplace—you stay in control of your inventory.',
    extraClass: 'sm:col-span-2 lg:col-span-1',
  },
  {
    icon: IconHandshake,
    color: 'amber',
    title: 'Direct relationships',
    description:
      'Negotiate and confirm placements publisher-to-sponsor—no anonymous resellers in the middle.',
  },
  {
    icon: IconSparkles,
    color: 'sky',
    title: 'Premium presentation',
    description:
      'Your listings look polished out of the box—so sponsors take your inventory seriously.',
  },
  {
    icon: IconRocket,
    color: 'rose',
    title: 'Ship faster',
    description:
      'From first browse to booked placement, the path is short—fewer meetings, fewer spreadsheets.',
  },
];

const steps = [
  {
    number: 1,
    title: 'Discover',
    description:
      'Sponsors explore the marketplace; publishers list slots with formats, pricing, and context.',
  },
  {
    number: 2,
    title: 'Align',
    description:
      'Review details, add an optional note, and request the placement when it fits your campaign.',
  },
  {
    number: 3,
    title: 'Launch',
    description:
      'Confirm with the publisher and track campaigns from your dashboard—simple handoffs, less friction.',
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function LandingPage() {
  return (
    <main className="pb-16 pt-2 sm:pb-24 sm:pt-4">
      {/* Hero */}
      <section
        className="relative overflow-hidden rounded-3xl border border-[--color-border] bg-linear-to-br from-indigo-50/90 via-[--color-background] to-emerald-50/80 px-6 py-14 shadow-[--shadow-lg] sm:px-10 sm:py-16 lg:px-14 lg:py-20 dark:from-indigo-950/40 dark:via-[--color-background] dark:to-emerald-950/30"
        aria-labelledby="hero-heading"
      >
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <header className="text-center lg:text-left">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-[--color-primary]">
              Sponsorship marketplace
            </p>
            <h1
              id="hero-heading"
              className="text-balance text-4xl font-bold tracking-tight text-[--color-foreground] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]"
            >
              Connect your brand with audiences that actually care
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-[--color-muted] lg:mx-0">
              Anvara matches sponsors with trusted publishers—so campaigns feel native, measurable,
              and worth every dollar.
            </p>
            <nav
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
              aria-label="Get started"
            >
              <Link href="/login" className={link({ intent: 'primary' })}>
                Get started free
              </Link>
              <Link href="/marketplace" className={link({ intent: 'secondary' })}>
                Browse marketplace
              </Link>
            </nav>
            <p className="mt-6 text-sm text-[--color-muted]">
              No credit card required for demo accounts · Set up in under a minute
            </p>
          </header>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden="true">
            <LandingHeroVisual />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto mt-20 max-w-6xl sm:mt-28" aria-labelledby="features-heading">
        <header className="mx-auto max-w-2xl text-center">
          <h2 id="features-heading" className={sectionHeading()}>
            Built for both sides of the deal
          </h2>
          <p className="mt-4 text-lg text-[--color-muted]">
            Whether you buy placements or sell them, Anvara keeps discovery, pricing, and handoffs
            straightforward.
          </p>
        </header>

        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, color, title, description, extraClass }) => (
            <li key={title} className={featureCard({ class: extraClass })}>
              <div className={featureIcon({ color })}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-[--color-foreground]">{title}</h3>
              <p className="mt-2 text-[--color-muted]">{description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works */}
      <section
        className="mx-auto mt-20 max-w-6xl rounded-3xl border border-[--color-border] bg-[--color-surface] px-6 py-14 sm:mt-28 sm:px-10 sm:py-16"
        aria-labelledby="how-heading"
      >
        <header className="mx-auto max-w-2xl text-center">
          <h2 id="how-heading" className={sectionHeading()}>
            How it works
          </h2>
          <p className="mt-4 text-lg text-[--color-muted]">
            Three steps—from discovery to a confirmed placement.
          </p>
        </header>
        <ol className="mx-auto mt-12 grid max-w-4xl gap-10 md:grid-cols-3 md:gap-8">
          {steps.map(({ number, title, description }) => (
            <li
              key={number}
              className="relative flex flex-col items-center text-center md:items-start md:text-left"
            >
              <span className={stepBadge()} aria-hidden="true">
                {number}
              </span>
              <h3 className="text-lg font-semibold text-[--color-foreground]">{title}</h3>
              <p className="mt-2 text-sm text-[--color-muted]">{description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-20 max-w-6xl sm:mt-28" aria-labelledby="cta-heading">
        <div className="overflow-hidden rounded-3xl bg-linear-to-br from-[--color-primary] to-indigo-800 px-8 py-14 text-center text-white shadow-[--shadow-lg] sm:px-12 sm:py-16">
          <h2 id="cta-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to grow with the right partners?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-indigo-100">
            Join teams using Anvara to book sponsorships that feel native—not noisy.
          </p>
          <nav
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            aria-label="Sign up"
          >
            <Link href="/login" className={link({ intent: 'ctaPrimary' })}>
              Create your account
            </Link>
            <Link href="/marketplace" className={link({ intent: 'ctaSecondary' })}>
              Explore listings
            </Link>
          </nav>
          <p className="mt-10 text-sm text-indigo-200">
            Built for the Anvara demo — swap in your analytics, SSO, and compliance stack for
            production.
          </p>
        </div>
      </section>
    </main>
  );
}
