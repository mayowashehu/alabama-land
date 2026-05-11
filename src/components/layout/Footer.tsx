import { Link } from 'react-router-dom';

const QUICK_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Available Plots', path: '/listings' },
  { label: 'About Us', path: '/about' },
  { label: 'Blog', path: '/blog' },
];

const RESOURCES = [
  { label: 'How to Buy', href: '#' },
  { label: 'Document Types', href: '#' },
  { label: 'Payment Plans', href: '#' },
  { label: 'FAQs', href: '#' },
];

const WA_SVG = (
  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.562 4.141 1.535 5.876L0 24l6.323-1.507A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.785 9.785 0 01-5.017-1.378l-.36-.214-3.732.889.937-3.627-.235-.373A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
  </svg>
);

export function Footer(): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#080f09] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-10 sm:px-14 lg:px-16 pt-16 pb-10">

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-flex flex-col gap-0 mb-6">
              <span className="font-cormorant text-2xl font-medium leading-none text-[#f5f0e8] tracking-wide">
                AO
              </span>
              <span className="font-sans text-[9px] font-medium tracking-[0.22em] uppercase text-[#b8975a] leading-none mt-0.5">
                Alabama Onas
              </span>
              <span className="font-sans text-[9px] font-light tracking-[0.12em] text-[#f5f0e8]/25 leading-none mt-0.5">
                Multibiz Enterprises
              </span>
            </Link>
            <p className="font-cormorant text-base italic text-[#f5f0e8]/40 leading-relaxed">
              {'"Buy Peace, Build Legacy."'}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="font-sans text-[10px] font-medium tracking-[0.18em] uppercase text-[#b8975a] mb-5">
              Quick Links
            </p>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-sans text-sm font-light text-[#f5f0e8]/45 hover:text-[#f5f0e8] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="font-sans text-[10px] font-medium tracking-[0.18em] uppercase text-[#b8975a] mb-5">
              Resources
            </p>
            <ul className="flex flex-col gap-3">
              {RESOURCES.map((r) => (
                <li key={r.label}>
                  <a
                    href={r.href}
                    className="font-sans text-sm font-light text-[#f5f0e8]/45 hover:text-[#f5f0e8] transition-colors duration-200"
                  >
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-[10px] font-medium tracking-[0.18em] uppercase text-[#b8975a] mb-5">
              Contact
            </p>
            <div className="flex flex-col gap-4">
              <a
                href="https://wa.me/2347082151926"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 font-sans text-sm font-light text-[#f5f0e8]/45 hover:text-[#b8975a] transition-colors duration-200"
              >
                {WA_SVG}
                +234 708 215 1926
              </a>
              <p className="font-sans text-sm font-light text-[#f5f0e8]/30 leading-relaxed">
                Sagamu, Ogun State
                <br />
                Nigeria
              </p>
            </div>
          </div>
        </div>

        {/* Credentials strip */}
        <div className="border-t border-white/[0.06] pt-8 mb-8">
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {[
              ['CAC Registration', 'In Process'],
              ['Documents', 'C of O · Gov\'t Consent · Excision'],
              ['Service Area', 'Sagamu & Ogun State'],
            ].map(([label, value]) => (
              <p key={label} className="font-sans text-[11px] text-[#f5f0e8]/25">
                <span className="text-[#f5f0e8]/40 font-medium">{label}:</span>
                {' '}
                {value}
              </p>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="font-sans text-[11px] font-light text-[#f5f0e8]/20">
            {`© ${year} Alabama Onas Multibiz Enterprises. All rights reserved.`}
          </p>
          <p className="font-cormorant text-sm italic text-[#f5f0e8]/15">
            Buy Peace, Build Legacy.
          </p>
        </div>

      </div>
    </footer>
  );
}