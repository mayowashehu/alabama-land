import { Link } from 'react-router-dom';
import { getWhatsAppLink } from '../utils/whatsapp';

const WA_URL =
  "https://wa.me/2347082151926?text=Hi%2C+I+found+your+website+and+I%27m+interested+in+buying+land+in+Sagamu.+Can+you+help+me%3F";

export default function NotFound(): JSX.Element {
  const waHref = typeof getWhatsAppLink === 'function'
    ? getWhatsAppLink('general')
    : WA_URL;

  return (
    <div className="min-h-screen bg-[#0f1810] flex flex-col items-center justify-center px-10 sm:px-14 relative overflow-hidden">

      {/* Ghost background number */}
      <span
        className="absolute select-none font-cormorant font-medium text-[clamp(180px,30vw,320px)] leading-none text-[#f5f0e8]/[0.03] pointer-events-none"
        aria-hidden="true"
      >
        404
      </span>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <span className="block w-6 h-px bg-[#b8975a]" />
          <span className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-[#b8975a]">
            Page not found
          </span>
          <span className="block w-6 h-px bg-[#b8975a]" />
        </div>

        {/* Headline */}
        <h1 className="font-cormorant text-[clamp(32px,5vw,52px)] font-medium leading-[1.1] text-[#f5f0e8] mb-4">
          Lost, But
          <br />
          <em className="italic text-[#d4b87a]">Land Is Still Here.</em>
        </h1>

        {/* Subtext */}
        <p className="font-sans text-sm font-light leading-relaxed text-[#f5f0e8]/45 mb-10">
          This page does not exist — but verified plots in Sagamu do.
          <br />
          Let us take you somewhere useful.
        </p>

        {/* Actions */}
        <div className="flex flex-col w-full gap-3">
          <Link
            to="/listings"
            className="block text-center font-sans text-[12px] font-medium tracking-widest uppercase py-4 bg-[#b8975a] text-[#0f1810] transition-all duration-200 hover:bg-[#d4b87a] hover:-translate-y-px"
          >
            View Available Plots
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center font-sans text-[12px] font-medium tracking-widest uppercase py-4 border border-white/15 text-[#f5f0e8]/60 transition-all duration-200 hover:border-white/35 hover:text-[#f5f0e8] hover:-translate-y-px"
          >
            Chat on WhatsApp
          </a>
          <Link
            to="/"
            className="block text-center font-sans text-[12px] font-medium tracking-widest uppercase py-3 text-[#f5f0e8]/25 transition-colors duration-200 hover:text-[#f5f0e8]/60"
          >
            {'← Back to Home'}
          </Link>
        </div>

        {/* Provenance mark */}
        <p className="font-cormorant text-[11px] italic text-white/15 tracking-widest mt-12">
          Alabama Onas · Sagamu
        </p>

      </div>
    </div>
  );
}