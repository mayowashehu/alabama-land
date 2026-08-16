import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { StatsSection } from '../components/sections/StatsSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { getWhatsAppLink } from '../utils/whatsapp';

const IMG_STYLE = { filter: 'grayscale(12%) contrast(1.04)' };

function BeaconMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16 2v10M16 20v10M2 16h10M20 16h10" stroke="currentColor" strokeWidth="1" />
      <circle cx="16" cy="16" r="3.5" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

// ─── Process Step ────────────────────────────────────────────────────────────

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}

function ProcessStep({ number, title, description, isLast }: ProcessStepProps): JSX.Element {
  return (
    <div className={`group flex flex-col py-8 border-t border-white/[0.06] transition-colors duration-300 ${!isLast ? 'lg:border-r lg:border-white/[0.06] lg:pr-8' : ''}`}>
      <span className="font-cormorant text-[13px] text-[#b8975a]/60 tracking-widest tabular-nums mb-5 transition-colors duration-300 group-hover:text-[#b8975a]">
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
    <div className="group flex flex-col bg-[#131f14] border border-white/[0.07] p-8 transition-all duration-300 hover:border-[#b8975a]/30 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)]">
      <div className="flex items-start justify-between mb-7">
        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#b8975a]/50">
          {'0' + (index + 1)}
        </span>
        <div className="w-7 h-7 text-[#b8975a]/40 transition-colors duration-300 group-hover:text-[#b8975a]/80">
          {icon}
        </div>
      </div>
      <h3 className="font-cormorant text-lg font-medium text-[#f5f0e8] mb-3 leading-snug">
        {title}
      </h3>
      <span className="block w-6 h-px bg-[#b8975a]/40 mb-3 transition-all duration-300 group-hover:w-10" />
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
      <section className="relative w-full min-h-screen overflow-hidden bg-[#0c120d] grid grid-cols-1 lg:grid-cols-2 pt-16">
        <style>{`
          @keyframes aboutHeroFadeUp {
            from { opacity: 0; transform: translateY(14px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .ah-fade { animation: aboutHeroFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both; }
          .ah-fade-1 { animation-delay: 0.05s; }
          .ah-fade-2 { animation-delay: 0.18s; }
          .ah-fade-3 { animation-delay: 0.30s; }
          .ah-fade-4 { animation-delay: 0.42s; }
          @media (prefers-reduced-motion: reduce) {
            .ah-fade { animation: none; }
          }
        `}</style>

        {/* Cadastral grid, matching the home hero */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none" aria-hidden="true" preserveAspectRatio="none">
          <defs>
            <pattern id="cadastral-about" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M64 0H0V64" fill="none" stroke="#b8975a" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cadastral-about)" />
        </svg>

        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.12]"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=80')" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 100%, rgba(0,0,0,0.5) 0%, transparent 60%)' }}
          aria-hidden="true"
        />
        <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-px bg-white/[0.07]" aria-hidden="true" />

        <BeaconMark className="hidden lg:block absolute top-24 left-8 w-6 h-6 text-[#b8975a]/30 z-10" />
        <BeaconMark className="hidden lg:block absolute top-24 right-8 w-6 h-6 text-[#b8975a]/30 z-10" />
        <BeaconMark className="hidden lg:block absolute bottom-8 right-8 w-6 h-6 text-[#b8975a]/30 z-10" />

        {/* Left: copy */}
        <div className="relative z-10 flex flex-col justify-center px-10 sm:px-14 lg:px-16 py-20 lg:py-28">
          <div className="ah-fade ah-fade-1 flex items-center gap-3 mb-7">
            <span className="block w-6 h-px bg-[#b8975a]" />
            <span className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-[#b8975a]">
              Our story
            </span>
          </div>

          <h1 className="ah-fade ah-fade-2 font-cormorant text-[clamp(34px,5vw,58px)] font-medium leading-[1.1] text-[#f5f0e8] mb-6">
            The Woman Behind
            <br />
            <em className="italic text-[#d4b87a]">Every Plot.</em>
          </h1>

          <p className="ah-fade ah-fade-3 font-sans text-sm font-light leading-relaxed text-[#f5f0e8]/55 max-w-[380px] mb-10">
            Mrs. Alaba Afusat has spent years ensuring Sagamu families own land the right way — with full documents, no stress, no Omo-onile drama.
          </p>

          <div className="ah-fade ah-fade-4 flex flex-col gap-4 sm:flex-row">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center overflow-hidden font-sans text-[13px] font-medium tracking-widest uppercase px-7 py-3.5 bg-[#b8975a] text-[#0f1810] transition-all duration-300 hover:-translate-y-px hover:shadow-[0_8px_24px_-6px_rgba(184,151,90,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4b87a]"
            >
              <span className="relative z-10">Talk to Mrs. Alaba</span>
              <span className="absolute inset-0 bg-[#d4b87a] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" aria-hidden="true" />
            </a>
            <Link
              to="/listings"
              className="inline-flex items-center gap-2 font-sans text-[13px] font-normal tracking-widest uppercase px-7 py-3.5 border border-white/20 text-[#f5f0e8]/75 transition-all duration-300 hover:border-[#b8975a]/60 hover:text-[#f5f0e8] hover:-translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4b87a]"
            >
              View Plots
              <span aria-hidden="true">{'→'}</span>
            </Link>
          </div>
        </div>

        {/* Right: photo, matted like the home hero */}
        <div className="relative z-10 flex flex-col justify-end items-center lg:items-start px-10 sm:px-12 lg:px-16 pt-16 lg:pt-0 pb-14 lg:pb-24">
          <div className="ah-fade ah-fade-3 relative w-full max-w-[320px]">

            <div className="hidden lg:flex items-center gap-2 mb-4 pl-[2px]">
              <span className="block w-3 h-px bg-[#b8975a]/60" />
              <span className="font-mono text-[9px] tracking-[0.15em] text-[#b8975a]/60">
                SAGAMU &middot; OGUN STATE
              </span>
            </div>

            <span
              className="hidden lg:block absolute top-4 -right-6 w-px h-[calc(100%-32px)] bg-gradient-to-b from-transparent via-[#b8975a]/70 to-transparent"
              aria-hidden="true"
            />

            <div className="relative border border-[#b8975a]/25 p-3 shadow-[0_35px_70px_-20px_rgba(0,0,0,0.65)]">
              <div className="relative overflow-hidden aspect-[4/5] group">
                <img
                  src="/images/owner.png"
                  alt="Mrs. Alaba Afusat, CEO"
                  className="block w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  style={{ ...IMG_STYLE, objectPosition: '50% 22%' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />

                <div
                  className="absolute inset-x-0 top-0 h-[34%] pointer-events-none"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(10,15,10,0.88) 0%, rgba(10,15,10,0.45) 55%, transparent 100%)',
                  }}
                  aria-hidden="true"
                />

                <div className="absolute inset-x-0 top-0 px-5 pt-4 pb-3">
                  <p className="font-cormorant text-lg font-medium tracking-wide text-[#f5f0e8] mb-0.5">
                    Mrs. Alaba Afusat
                  </p>
                  <p className="font-sans text-[10.5px] font-light tracking-[0.14em] uppercase text-[#d4b87a]">
                    Chief Executive Officer
                  </p>
                </div>
              </div>
            </div>

            {/* Seal varied from the home hero and trust section — different rotation and label, tied to her tenure since this page is about her story */}
            <div
              className="hidden sm:flex absolute -bottom-6 -left-6 w-[76px] h-[76px] items-center justify-center rounded-full bg-[#0c120d] border border-[#b8975a]/70 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.7)]"
              style={{ transform: 'rotate(7deg)' }}
              aria-hidden="true"
            >
              <div className="absolute inset-[3px] rounded-full border border-[#b8975a]/25" />
              <div className="flex flex-col items-center gap-0.5">
                <BeaconMark className="w-3.5 h-3.5 text-[#b8975a]" />
                <span className="font-sans text-[7px] font-medium tracking-[0.14em] text-[#b8975a] leading-none">
                  SINCE
                </span>
                <span className="font-sans text-[9px] font-medium tracking-[0.08em] text-[#b8975a]/80 leading-none mt-0.5">
                  2018
                </span>
              </div>
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
            className="group relative inline-flex items-center overflow-hidden font-sans text-[13px] font-medium tracking-widest uppercase px-10 py-4 bg-[#b8975a] text-[#0f1810] transition-all duration-300 hover:-translate-y-px hover:shadow-[0_8px_24px_-6px_rgba(184,151,90,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4b87a]"
          >
            <span className="relative z-10">Start the Conversation</span>
            <span className="absolute inset-0 bg-[#d4b87a] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" aria-hidden="true" />
          </a>

          <p className="font-sans text-[11px] text-[#f5f0e8]/20 mt-6 tracking-wide">
            Typically replies within the hour
          </p>
        </div>
      </section>
    </>
  );
}