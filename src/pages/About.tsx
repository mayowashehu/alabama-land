import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { StatsSection } from '../components/sections/StatsSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { getWhatsAppLink } from '../utils/whatsapp';

const IMG_STYLE = { filter: 'grayscale(12%) contrast(1.04)' };

// ─── Process Step ────────────────────────────────────────────────────────────

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}

function ProcessStep({ number, title, description, isLast }: ProcessStepProps): JSX.Element {
  return (
    <div className={`flex flex-col py-8 border-t border-white/[0.06] ${!isLast ? 'lg:border-r lg:border-white/[0.06] lg:pr-8' : ''}`}>
      <span className="font-cormorant text-[13px] text-[#b8975a] tracking-widest tabular-nums mb-5">
        {'0' + number}
      </span>
      <h3 className="font-cormorant text-xl font-medium text-[#f5f0e8] mb-2 leading-snug">
        {title}
      </h3>
      <p className="font-sans text-sm font-light leading-relaxed text-[#f5f0e8]/45">
        {description}
      </p>
    </div>
  );
}

// ─── Credential Card ──────────────────────────────────────────────────────────

interface CredentialCardProps {
  index: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

function CredentialCard({ index, title, description, icon }: CredentialCardProps): JSX.Element {
  return (
    <div className="flex flex-col bg-[#131f14] border border-white/[0.07] p-8 transition-colors duration-300 hover:border-[#b8975a]/30">
      <div className="flex items-start justify-between mb-7">
        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#b8975a]/50">
          {'0' + (index + 1)}
        </span>
        <div className="w-7 h-7 text-[#b8975a]/40">
          {icon}
        </div>
      </div>
      <h3 className="font-cormorant text-lg font-medium text-[#f5f0e8] mb-3 leading-snug">
        {title}
      </h3>
      <span className="block w-6 h-px bg-[#b8975a]/40 mb-3" />
      <p className="font-sans text-sm font-light leading-relaxed text-[#f5f0e8]/45">
        {description}
      </p>
    </div>
  );
}

// ─── About Page ───────────────────────────────────────────────────────────────

const PROCESS_STEPS = [
  { title: 'Browse', description: 'View all available plots with full details and document types listed upfront.' },
  { title: 'Verify', description: 'Ask any question directly via WhatsApp. No middlemen. Mrs. Alaba answers personally.' },
  { title: 'Reserve', description: 'Secure your plot with a reservation. All paperwork begins immediately.' },
  { title: 'Own', description: 'Receive your documents. Your land. Your legacy.' },
];

const CREDENTIALS = [
  {
    title: 'CAC Registered Business',
    description: 'Alabama Onas Multibiz Enterprises is a registered Nigerian business — not an individual, not a side hustle.',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Only Verified Plots Listed',
    description: 'Every plot has been personally inspected by Mrs. Alaba. If the documents are not clean, it does not get listed.',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Direct Communication Always',
    description: 'You will never speak to an assistant or agent. Mrs. Alaba handles every inquiry personally via WhatsApp.',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

export default function About(): JSX.Element {
  const waHref = getWhatsAppLink('general');

  return (
    <>
      <Helmet>
        <title>About Mrs. Alaba Afusat | Alabama Onas — Sagamu Land</title>
        <meta
          name="description"
          content="Meet Mrs. Alaba Afusat, CEO of Alabama Onas Multibiz Enterprises. Verified land for sale in Sagamu, Ogun State with full C of O documentation."
        />
        <meta property="og:image" content="/images/owner.png" />
      </Helmet>

      {/* ── Section 1: Hero ───────────────────────────────────────────────── */}
      <section className="relative w-full min-h-screen overflow-hidden bg-[#0f1810] grid grid-cols-1 lg:grid-cols-2 pt-16">

        {/* Subtle texture */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.12]"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=80')" }}
          aria-hidden="true"
        />
        <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-px bg-white/[0.07]" aria-hidden="true" />

        {/* Left: copy */}
        <div className="relative z-10 flex flex-col justify-center px-10 sm:px-14 lg:px-16 py-20 lg:py-28">
          <div className="flex items-center gap-3 mb-7">
            <span className="block w-6 h-px bg-[#b8975a]" />
            <span className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-[#b8975a]">
              Our story
            </span>
          </div>

          <h1 className="font-cormorant text-[clamp(34px,5vw,58px)] font-medium leading-[1.1] text-[#f5f0e8] mb-6">
            The Woman Behind
            <br />
            <em className="italic text-[#d4b87a]">Every Plot.</em>
          </h1>

          <p className="font-sans text-sm font-light leading-relaxed text-[#f5f0e8]/55 max-w-[380px] mb-10">
            Mrs. Alaba Afusat has spent years ensuring Sagamu families own land the right way — with full documents, no stress, no Omo-onile drama.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-sans text-[13px] font-medium tracking-widest uppercase px-7 py-3.5 bg-[#b8975a] text-[#0f1810] transition-all duration-200 hover:bg-[#d4b87a] hover:-translate-y-px"
            >
              Talk to Mrs. Alaba
            </a>
            <Link
              to="/listings"
              className="inline-flex items-center gap-2 font-sans text-[13px] font-normal tracking-widest uppercase px-7 py-3.5 border border-white/20 text-[#f5f0e8]/75 transition-all duration-200 hover:border-white/45 hover:text-[#f5f0e8] hover:-translate-y-px"
            >
              View Plots
              <span aria-hidden="true">{'→'}</span>
            </Link>
          </div>
        </div>

        {/* Right: photo */}
        <div className="relative z-10 flex flex-col justify-end items-center lg:items-start px-10 sm:px-12 lg:px-14 pt-12 lg:pt-0">
          <div className="relative w-full max-w-[300px]">
            <span
              className="hidden lg:block absolute top-6 -right-4 w-px h-[calc(100%-48px)] bg-gradient-to-b from-transparent via-[#b8975a] to-transparent"
              aria-hidden="true"
            />
            <img
              src="/images/owner.png"
              alt="Mrs. Alaba Afusat, CEO"
              className="block w-full aspect-[3/4] object-cover object-top"
              style={IMG_STYLE}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="border-t border-[#b8975a] bg-white/[0.04] px-5 py-4 backdrop-blur-sm">
              <p className="font-cormorant text-base font-medium tracking-wide text-[#f5f0e8] mb-0.5">
                Mrs. Alaba Afusat
              </p>
              <p className="font-sans text-[11px] font-light tracking-[0.12em] uppercase text-[#b8975a]">
                Chief Executive Officer
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 left-10 sm:left-14 lg:left-16 z-10">
          <span className="font-cormorant text-[11px] text-white/20 tracking-widest">
            EST. 2018 · SAGAMU
          </span>
        </div>
      </section>

      {/* ── Section 2: Her Story ──────────────────────────────────────────── */}
      <section className="w-full bg-[#0c1610] border-t border-white/[0.06] px-10 sm:px-14 lg:px-16 py-20 sm:py-24 lg:py-32">
        <div className="max-w-6xl mx-auto">

          <div className="flex items-center gap-3 mb-10">
            <span className="block w-6 h-px bg-[#b8975a]" />
            <span className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-[#b8975a]">
              Her story
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Pull quote */}
            <div className="lg:sticky lg:top-28">
              <blockquote className="border-l-2 border-[#b8975a]/40 pl-6">
                <p className="font-cormorant text-[clamp(22px,3vw,32px)] italic font-normal leading-[1.4] text-[#d4b87a]/80 mb-4">
                  {'"I have seen too many families lose their savings to fake land. I decided to be the person they could trust."'}
                </p>
                <cite className="font-sans text-[11px] font-light tracking-[0.1em] uppercase text-[#f5f0e8]/30 not-italic">
                  — Mrs. Alaba Afusat
                </cite>
              </blockquote>
            </div>

            {/* Story paragraphs */}
            <div className="flex flex-col gap-6">
              {[
                'Mrs. Alaba started in property development over a decade ago, watching families invest their life savings into land only to discover fraudulent documents or land disputes years later. The pain in their eyes never left her. She decided that if she could not stop land fraud entirely, she could at least be the one person families could trust completely.',
                'In Sagamu, Ogun State, land has always been a generational investment. Families building ancestral homes, diaspora Nigerians securing their children\'s future, young couples buying their first plot. But the fear of Omo-onile, fake C of O certificates, and middlemen exploiting them kept many from buying. Mrs. Alaba saw an opportunity to fill that trust gap.',
                'Today, Alabama Onas has helped families across 12 estates in and around Sagamu secure verified land with full documentation. No cutting corners. No excuses. Every plot Mrs. Alaba lists has passed her personal inspection and the Ogun State Land Registry verification process.',
              ].map((para, i) => (
                <p key={i} className="font-sans text-sm font-light leading-[1.9] text-[#f5f0e8]/55">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Stats ─────────────────────────────────────────────── */}
      <StatsSection />

      {/* ── Section 4: How It Works ──────────────────────────────────────── */}
      <section className="w-full bg-[#0f1810] border-t border-white/[0.06] px-10 sm:px-14 lg:px-16 py-20 sm:py-24 lg:py-32">
        <div className="max-w-6xl mx-auto">

          <div className="flex items-center gap-3 mb-5">
            <span className="block w-6 h-px bg-[#b8975a]" />
            <span className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-[#b8975a]">
              The process
            </span>
          </div>

          <h2 className="font-cormorant text-[clamp(28px,4vw,46px)] font-medium leading-[1.1] text-[#f5f0e8] mb-14">
            How It Works When You
            <br />
            <em className="italic text-[#d4b87a]">Buy Through Us.</em>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 lg:gap-x-8">
            {PROCESS_STEPS.map((step, i) => (
              <ProcessStep
                key={step.title}
                number={i + 1}
                title={step.title}
                description={step.description}
                isLast={i === PROCESS_STEPS.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Credentials ───────────────────────────────────────── */}
      <section className="w-full bg-[#0c1610] border-t border-white/[0.06] px-10 sm:px-14 lg:px-16 py-20 sm:py-24 lg:py-32">
        <div className="max-w-6xl mx-auto">

          <div className="flex items-center gap-3 mb-5">
            <span className="block w-6 h-px bg-[#b8975a]" />
            <span className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-[#b8975a]">
              Why buyers trust us
            </span>
          </div>

          <h2 className="font-cormorant text-[clamp(28px,4vw,46px)] font-medium leading-[1.1] text-[#f5f0e8] mb-14">
            Built on Verified
            <br />
            <em className="italic text-[#d4b87a]">Transparency.</em>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04]">
            {CREDENTIALS.map((c, i) => (
              <CredentialCard
                key={c.title}
                index={i}
                title={c.title}
                description={c.description}
                icon={c.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: Testimonials ──────────────────────────────────────── */}
      <TestimonialsSection />

      {/* ── Section 7: Final CTA ─────────────────────────────────────────── */}
      <section className="w-full bg-[#080f09] border-t border-white/[0.06] px-10 sm:px-14 lg:px-16 py-20 sm:py-24 lg:py-32">
        <div className="max-w-2xl mx-auto text-center">

          <div className="flex items-center justify-center gap-3 mb-7">
            <span className="block w-6 h-px bg-[#b8975a]" />
            <span className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-[#b8975a]">
              Take the next step
            </span>
            <span className="block w-6 h-px bg-[#b8975a]" />
          </div>

          <h2 className="font-cormorant text-[clamp(28px,5vw,52px)] font-medium leading-[1.1] text-[#f5f0e8] mb-4">
            Ready to Buy Land
            <br />
            <em className="italic text-[#d4b87a]">the Right Way?</em>
          </h2>

          <p className="font-sans text-sm font-light leading-relaxed text-[#f5f0e8]/45 mb-10">
            Talk to Mrs. Alaba directly. No pressure, no middlemen, no nonsense.
          </p>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-sans text-[13px] font-medium tracking-widest uppercase px-10 py-4 bg-[#b8975a] text-[#0f1810] transition-all duration-200 hover:bg-[#d4b87a] hover:-translate-y-px"
          >
            Start the Conversation
          </a>

          <p className="font-sans text-[11px] text-[#f5f0e8]/20 mt-6 tracking-wide">
            Typically replies within the hour
          </p>
        </div>
      </section>
    </>
  );
}