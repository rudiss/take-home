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
  ctaCard,
  ctaNav,
  ctaNote,
  ctaSection,
  ctaSubtitle,
  ctaTitle,
  featureCard,
  featureDescription,
  featureIcon,
  featuresGrid,
  featuresSection,
  featuresSectionHeader,
  featuresSectionSubtitle,
  featureTitle,
  heroEyebrow,
  heroGrid,
  heroHeader,
  heroNav,
  heroNote,
  heroSection,
  heroSubtitle,
  heroTitle,
  heroVisualWrap,
  howItWorksSection,
  howItWorksSectionSubtitle,
  landingRoot,
  link,
  sectionHeading,
  stepBadge,
  stepDescription,
  stepItem,
  stepsGrid,
  stepTitle,
} from './landing-page.styles';
import { NewsletterForm } from '@/app/components/newsletter';

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
    <div className={landingRoot()}>
      {/* Hero */}
      <section className={heroSection()} aria-labelledby="hero-heading">
        <div className={heroGrid()}>
          <header className={heroHeader()}>
            <p className={heroEyebrow()}>Sponsorship marketplace</p>
            <h1 id="hero-heading" className={heroTitle()}>
              Connect your brand with audiences that actually care
            </h1>
            <p className={heroSubtitle()}>
              Anvara matches sponsors with trusted publishers—so campaigns feel native, measurable,
              and worth every dollar.
            </p>
            <nav className={heroNav()} aria-label="Get started">
              <Link href="/login" className={link({ intent: 'primary' })}>
                Get started free
              </Link>
              <Link href="/marketplace" className={link({ intent: 'secondary' })}>
                Browse marketplace
              </Link>
            </nav>
            <p className={heroNote()}>
              No credit card required for demo accounts · Set up in under a minute
            </p>
          </header>
          <div className={heroVisualWrap()} aria-hidden="true">
            <LandingHeroVisual />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={featuresSection()} aria-labelledby="features-heading">
        <header className={featuresSectionHeader()}>
          <h2 id="features-heading" className={sectionHeading()}>
            Built for both sides of the deal
          </h2>
          <p className={featuresSectionSubtitle()}>
            Whether you buy placements or sell them, Anvara keeps discovery, pricing, and handoffs
            straightforward.
          </p>
        </header>

        <ul className={featuresGrid()}>
          {features.map(({ icon: Icon, color, title, description, extraClass }) => (
            <li key={title} className={featureCard({ class: extraClass })}>
              <div className={featureIcon({ color })}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className={featureTitle()}>{title}</h3>
              <p className={featureDescription()}>{description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works */}
      <section className={howItWorksSection()} aria-labelledby="how-heading">
        <header className={featuresSectionHeader()}>
          <h2 id="how-heading" className={sectionHeading()}>
            How it works
          </h2>
          <p className={howItWorksSectionSubtitle()}>
            Three steps—from discovery to a confirmed placement.
          </p>
        </header>
        <ol className={stepsGrid()}>
          {steps.map(({ number, title, description }) => (
            <li key={number} className={stepItem()}>
              <span className={stepBadge()} aria-hidden="true">
                {number}
              </span>
              <h3 className={stepTitle()}>{title}</h3>
              <p className={stepDescription()}>{description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Newsletter */}
      <NewsletterForm />

      {/* CTA */}
      <section className={ctaSection()} aria-labelledby="cta-heading">
        <div className={ctaCard()}>
          <h2 id="cta-heading" className={ctaTitle()}>
            Ready to grow with the right partners?
          </h2>
          <p className={ctaSubtitle()}>
            Join teams using Anvara to book sponsorships that feel native—not noisy.
          </p>
          <nav className={ctaNav()} aria-label="Sign up">
            <Link href="/login" className={link({ intent: 'ctaPrimary' })}>
              Create your account
            </Link>
            <Link href="/marketplace" className={link({ intent: 'ctaSecondary' })}>
              Explore listings
            </Link>
          </nav>
          <p className={ctaNote()}>
            Built for the Anvara demo — swap in your analytics, SSO, and compliance stack for
            production.
          </p>
        </div>
      </section>
    </div>
  );
}
