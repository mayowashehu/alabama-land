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

const TRUST_LABELS = ['C of O Titles', 'Verified Surveys', 'Flexible Payment'];

const BG_URL =
  "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=80')";

const IMG_FILTER = { filter: 'grayscale(12%) contrast(1.04)' };

export function HeroSection(): JSX.Element {
  const waHref = getWhatsAppLink('general');

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0f1810] grid grid-cols-1 lg:grid-cols-2">

      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.18]"
        style={{ backgroundImage: BG_URL }}
        aria-hidden="true"
      />

      <div
        className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-px bg-white/[0.07]"
        aria-hidden="true"
      />

      {/* Left — Copy */}
      <div className="relative z-10 flex flex-col justify-center px-10 sm:px-14 lg:px-16 py-20 lg:py-28">

        <div className="flex items-center gap-3 mb-7">
          <span className="block w-6 h-px bg-[#b8975a]" />
          <span className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-[#b8975a]">
            Sagamu, Ogun State
          </span>
        </div>

        <h1 className="font-cormorant text-[clamp(36px,4.5vw,54px)] font-medium leading-[1.1] text-[#f5f0e8] mb-5">
          {'Buy Peace.'}
          <br />
          <em className="italic text-[#d4b87a]">{'Build Legacy.'}</em>
        </h1>

        <p className="font-sans text-sm font-light leading-relaxed text-[#f5f0e8]/60 max-w-[340px] mb-8">
          Verified plots with Certificate of Occupancy titles. No Omo-onile
          complications &mdash; just clean, documented land in one of
          Nigeria&apos;s fastest-growing corridors.
        </p>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-9">
          {TRUST_LABELS.map((label) => (
            <div key={label} className="flex items-center gap-2">
              <span className="block w-[5px] h-[5px] rounded-full bg-[#b8975a]" />
              <span className="font-sans text-xs text-[#f5f0e8]/50 tracking-wide">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-start gap-4">
          <Link
            to="/listings"
            className="inline-block font-sans text-[13px] font-medium tracking-widest uppercase px-7 py-3.5 bg-[#b8975a] text-[#0f1810] transition-all duration-200 hover:bg-[#d4b87a] hover:-translate-y-px"
          >
            View Available Plots
          </Link>

          <a
            href={waHref}
            className="inline-flex items-center gap-2 font-sans text-[13px] font-normal tracking-widest uppercase px-7 py-3.5 border border-white/20 text-[#f5f0e8]/75 transition-all duration-200 hover:border-white/45 hover:text-[#f5f0e8] hover:-translate-y-px"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
            <span>{'Chat on WhatsApp'}</span>
          </a>
        </div>
      </div>

      {/* Right — Owner photo */}
      <div className="relative z-10 flex flex-col justify-end items-center lg:items-start px-10 sm:px-12 lg:px-14 pt-12 lg:pt-0">
        <div className="relative w-full max-w-[300px]">
          <span
            className="hidden lg:block absolute top-6 -right-4 w-px h-[calc(100%-48px)] bg-gradient-to-b from-transparent via-[#b8975a] to-transparent"
            aria-hidden="true"
          />
          <img
            src="/images/owner.jpg"
            alt="CEO Mrs. Alabama Onas"
            className="block w-full aspect-[3/4] object-cover object-top"
            style={IMG_FILTER}
          />
          <div className="border-t border-[#b8975a] bg-white/[0.04] px-5 py-4 backdrop-blur-sm">
            <p className="font-cormorant text-base font-medium tracking-wide text-[#f5f0e8] mb-0.5">
              Mrs. Alabama Onas
            </p>
            <p className="font-sans text-[11px] font-light tracking-[0.12em] uppercase text-[#b8975a]">
              Chief Executive Officer
            </p>
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