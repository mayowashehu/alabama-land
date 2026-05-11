// ─── Navbar ────────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Listings', path: '/listings' },
  { label: 'About', path: '/about' },
  { label: 'Blog', path: '/blog' },
];

export function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isHomepage = location.pathname === '/';
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = (): void => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On homepage: transparent → frosted dark on scroll
  // Off homepage: always frosted dark
  const frosted = isScrolled || !isHomepage;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${frosted
          ? 'bg-[#0f1810]/90 backdrop-blur-md border-b border-white/[0.06]'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-10 sm:px-14 lg:px-16">
        <div className="flex justify-between items-center h-16 lg:h-18">

          {/* Logo */}
          <Link to="/" className="flex flex-col gap-0 group">
            <span className="font-cormorant text-2xl font-medium leading-none text-[#f5f0e8] tracking-wide">
              AO
            </span>
            <span className="font-sans text-[9px] font-medium tracking-[0.22em] uppercase text-[#b8975a] leading-none mt-0.5">
              Alabama Onas
            </span>
            <span className="font-sans text-[9px] font-light tracking-[0.12em] text-[#f5f0e8]/30 leading-none mt-0.5">
              Multibiz Enterprises
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-sans text-[12px] font-medium tracking-[0.1em] uppercase transition-colors duration-200 ${isActive(link.path)
                    ? 'text-[#b8975a]'
                    : 'text-[#f5f0e8]/50 hover:text-[#f5f0e8]'
                  }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="w-px h-4 bg-white/10" aria-hidden="true" />

            <Link
              to="/admin/login"
              className="font-sans text-[11px] font-medium tracking-widest uppercase px-4 py-2 border border-white/15 text-[#f5f0e8]/40 transition-all duration-200 hover:border-white/30 hover:text-[#f5f0e8]/70"
            >
              Admin
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden p-2 text-[#f5f0e8]/60 hover:text-[#f5f0e8] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#0f1810]/95 backdrop-blur-md border-t border-white/[0.06]">
          <div className="px-10 py-6 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`font-sans text-[12px] font-medium tracking-[0.12em] uppercase py-3 border-b border-white/[0.05] transition-colors duration-200 ${isActive(link.path)
                    ? 'text-[#b8975a]'
                    : 'text-[#f5f0e8]/50 hover:text-[#f5f0e8]'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <a
                href="https://wa.me/2347082151926?text=Hi%2C+I+found+your+website+and+I%27m+interested+in+buying+land+in+Sagamu."
                target="_blank"
                rel="noopener noreferrer"
                className="text-center font-sans text-[12px] font-medium tracking-widest uppercase py-3 bg-[#b8975a] text-[#0f1810] transition-colors hover:bg-[#d4b87a]"
              >
                WhatsApp Us
              </a>
              <Link
                to="/admin/login"
                onClick={() => setIsOpen(false)}
                className="text-center font-sans text-[11px] font-medium tracking-widest uppercase py-3 border border-white/15 text-[#f5f0e8]/40 hover:border-white/30 hover:text-[#f5f0e8]/70 transition-all"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}