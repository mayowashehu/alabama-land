import { Link } from 'react-router-dom';
import { getWhatsAppLink } from '../../utils/whatsapp';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.562 4.141 1.535 5.876L0 24l6.323-1.507A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.785 9.785 0 01-5.017-1.378l-.36-.214-3.732.889.937-3.627-.235-.373A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  );
}

/** Corner survey-beacon mark — echoes the concrete pillars that mark a plot's legal boundary. */
function BeaconMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M16 2v10M16 20v10M2 16h10M20 16h10" stroke="currentColor" strokeWidth="1" />
      <circle cx="16" cy="16" r="3.5" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

const TRUST_LABELS = ['C of O Titles', 'Verified Surveys', 'Flexible Payment'];

const BG_URL =
  "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=80')";

const IMG_FILTER = { filter: 'grayscale(12%) contrast(1.04)' };

export function HeroSection(): JSX.Element {
  const waHref = getWhatsAppLink('general');

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0c120d] grid grid-cols-1 lg:grid-cols-2">
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-fade { animation: heroFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        .hero-fade-1 { animation-delay: 0.05s; }
        .hero-fade-2 { animation-delay: 0.18s; }
        .hero-fade-3 { animation-delay: 0.30s; }
        .hero-fade-4 { animation-delay: 0.42s; }
        .hero-fade-5 { animation-delay: 0.54s; }
        @media (prefers-reduced-motion: reduce) {
          .hero-fade { animation: none; }
        }
      `}</style>

      {/* Cadastral grid — faint plot-boundary lines, grounded in the subject rather than decorative */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="cadastral" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M64 0H0V64" fill="none" stroke="#b8975a" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cadastral)" />
      </svg>

      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.14]"
        style={{ backgroundImage: BG_URL }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 100%, rgba(0,0,0,0.55) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div
        className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-px bg-white/[0.07]"
        aria-hidden="true"
      />

      {/* Corner beacons */}
      <BeaconMark className="hidden lg:block absolute top-8 left-8 w-6 h-6 text-[#b8975a]/30 z-10" />
      <BeaconMark className="hidden lg:block absolute top-8 right-8 w-6 h-6 text-[#b8975a]/30 z-10" />
      <BeaconMark className="hidden lg:block absolute bottom-8 right-8 w-6 h-6 text-[#b8975a]/30 z-10" />

      {/* Left — Copy */}
      <div className="relative z-10 flex flex-col justify-center px-10 sm:px-14 lg:px-16 py-20 lg:py-28">

        <div className="hero-fade hero-fade-1 flex items-center gap-3 mb-7">
          <span className="block w-6 h-px bg-[#b8975a]" />
          <span className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-[#b8975a]">
            Sagamu, Ogun State
          </span>
        </div>

        <h1 className="hero-fade hero-fade-2 font-cormorant text-[clamp(38px,4.8vw,58px)] font-medium leading-[1.08] text-[#f5f0e8] mb-5">
          {'Buy Peace.'}
          <br />
          <em className="italic text-[#d4b87a]">{'Build Legacy.'}</em>
        </h1>

        <p className="hero-fade hero-fade-3 font-sans text-sm font-light leading-relaxed text-[#f5f0e8]/60 max-w-[360px] mb-8">
          Verified plots with Certificate of Occupancy titles. No Omo-onile
          complications &mdash; just clean, documented land in one of
          Nigeria&apos;s fastest-growing corridors.
        </p>

        <div className="hero-fade hero-fade-4 flex flex-wrap items-center gap-x-6 gap-y-2.5 mb-10">
          {TRUST_LABELS.map((label) => (
            <div key={label} className="flex items-center gap-2">
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-[#b8975a]/70 shrink-0">
                <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="0.75" />
                <path d="M5 8.2l2 2 4-4.4" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-sans text-xs text-[#f5f0e8]/55 tracking-wide">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="hero-fade hero-fade-5 flex flex-col sm:flex-row items-start gap-4">
          <Link
            to="/listings"
            className="group relative inline-flex items-center overflow-hidden font-sans text-[13px] font-medium tracking-widest uppercase px-7 py-3.5 bg-[#b8975a] text-[#0f1810] transition-all duration-300 hover:-translate-y-px hover:shadow-[0_8px_24px_-6px_rgba(184,151,90,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4b87a]"
          >
            <span className="relative z-10">View Available Plots</span>
            <span className="absolute inset-0 bg-[#d4b87a] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" aria-hidden="true" />
          </Link>

          <a
            href={waHref}
            className="inline-flex items-center gap-2 font-sans text-[13px] font-normal tracking-widest uppercase px-7 py-3.5 border border-white/20 text-[#f5f0e8]/75 transition-all duration-300 hover:border-[#b8975a]/60 hover:text-[#f5f0e8] hover:-translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4b87a]"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
            <span>{'Chat on WhatsApp'}</span>
          </a>
        </div>
      </div>

      {/* Right — Owner photo, presented as a gallery-mounted plate rather than a card */}
      <div className="relative z-10 flex flex-col justify-end items-center lg:items-start px-10 sm:px-12 lg:px-16 pt-16 lg:pt-0 pb-14 lg:pb-24">
        <div className="hero-fade hero-fade-3 relative w-full max-w-[320px]">

          {/* Placard label — sits above the frame like a survey document header */}
          <div className="hidden lg:flex items-center gap-2 mb-4 pl-[2px]">
            <span className="block w-3 h-px bg-[#b8975a]/60" />
            <span className="font-mono text-[9px] tracking-[0.15em] text-[#b8975a]/60">
              PLOT REF &middot; 06.8438&deg;N 03.6383&deg;E
            </span>
          </div>

          <span
            className="hidden lg:block absolute top-4 -right-6 w-px h-[calc(100%-32px)] bg-gradient-to-b from-transparent via-[#b8975a]/70 to-transparent"
            aria-hidden="true"
          />

          {/* Outer mat — a thin offset line, like a passe-partout, before the photo itself */}
          <div className="relative border border-[#b8975a]/25 p-3 shadow-[0_35px_70px_-20px_rgba(0,0,0,0.65)]">
            <div className="relative overflow-hidden aspect-[4/5] group">
              <img
                src="/images/owner.png"
                alt="CEO Mrs. Alabama Onas"
                className="block w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                style={{ ...IMG_FILTER, objectPosition: '50% 22%' }}
              />

              {/* Scrim at the top so the caption reads clearly without sitting over her face */}
              <div
                className="absolute inset-x-0 top-0 h-[34%] pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(10,15,10,0.88) 0%, rgba(10,15,10,0.45) 55%, transparent 100%)',
                }}
                aria-hidden="true"
              />

              <div className="absolute inset-x-0 top-0 px-5 pt-4 pb-3">
                <p className="font-cormorant text-lg font-medium tracking-wide text-[#f5f0e8] mb-0.5">
                  Mrs. Alabama Onas
                </p>
                <p className="font-sans text-[10.5px] font-light tracking-[0.14em] uppercase text-[#d4b87a]">
                  Chief Executive Officer
                </p>
              </div>
            </div>
          </div>

          {/* Verification seal — a stamped mark overlapping the frame, echoing a survey plan's authentication stamp */}
          <div
            className="hidden sm:flex absolute -bottom-6 -left-6 w-[76px] h-[76px] items-center justify-center rounded-full bg-[#0c120d] border border-[#b8975a]/70 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.7)]"
            style={{ transform: 'rotate(-9deg)' }}
            aria-hidden="true"
          >
            <div className="absolute inset-[3px] rounded-full border border-[#b8975a]/25" />
            <div className="flex flex-col items-center gap-0.5">
              <BeaconMark className="w-3.5 h-3.5 text-[#b8975a]" />
              <span className="font-sans text-[7px] font-medium tracking-[0.14em] text-[#b8975a] leading-none">
                VERIFIED
              </span>
              <span className="font-sans text-[6px] tracking-[0.14em] text-[#b8975a]/70 leading-none">
                TITLE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Provenance mark */}
      <div className="absolute bottom-5 left-10 sm:left-14 lg:left-16 z-10">
        <span className="font-cormorant text-[11px] text-white/20 tracking-widest">
          EST. 2018 &middot; SAGAMU
        </span>
      </div>

    </section>
  );
}