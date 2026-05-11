import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import apiClient from '../../services/api';
import toast from 'react-hot-toast';
import type React from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Listings', path: '/admin/listings' },
  { label: 'Leads', path: '/admin/leads' },
];

// ─── Icons ───────────────────────────────────────────────────────────────────

function DashboardIcon(): JSX.Element {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h7m-7 6h16" />
    </svg>
  );
}

function ListingsIcon(): JSX.Element {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  );
}

function LeadsIcon(): JSX.Element {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
    </svg>
  );
}

function ExternalIcon(): JSX.Element {
  return (
    <svg className="w-3 h-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

const NAV_ICONS: Record<string, JSX.Element> = {
  '/admin/dashboard': <DashboardIcon />,
  '/admin/listings': <ListingsIcon />,
  '/admin/leads': <LeadsIcon />,
};

export function AdminLayout({ children }: AdminLayoutProps): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async (): Promise<void> => {
    try {
      await apiClient.post('/api/v1/auth/logout');
    } catch {
      // ignore
    } finally {
      logout();
      toast.success('Logged out');
      navigate('/admin/login');
    }
  };

  const isActive = (path: string): boolean => {
    if (path === '/admin/listings') return location.pathname.startsWith('/admin/listings');
    if (path === '/admin/leads') return location.pathname.startsWith('/admin/leads');
    return location.pathname === path;
  };

  return (
    <div className="flex min-h-screen bg-[#0c1610]">

      {/* ── Desktop Sidebar ───────────────────────────────────────────── */}
      <aside className="hidden md:flex md:w-56 md:flex-col bg-[#080f09] border-r border-white/[0.06] flex-shrink-0">

        {/* Logo */}
        <div className="px-6 pt-8 pb-7 border-b border-white/[0.06]">
          <Link to="/admin/dashboard" className="flex flex-col gap-0">
            <span className="font-cormorant text-xl font-medium leading-none text-[#f5f0e8] tracking-wide">
              AO
            </span>
            <span className="font-sans text-[9px] font-medium tracking-[0.22em] uppercase text-[#b8975a] leading-none mt-1">
              Alabama Onas
            </span>
            <span className="font-sans text-[9px] font-light tracking-[0.1em] text-[#f5f0e8]/20 leading-none mt-0.5">
              Admin Panel
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-6">
          <p className="font-sans text-[9px] font-medium tracking-[0.2em] uppercase text-[#f5f0e8]/20 px-3 mb-3">
            Navigation
          </p>
          <div className="flex flex-col gap-0.5">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 transition-all duration-150 ${
                    active
                      ? 'bg-[#b8975a]/10 text-[#b8975a] border-l-2 border-[#b8975a]'
                      : 'text-[#f5f0e8]/40 hover:text-[#f5f0e8]/80 hover:bg-white/[0.03] border-l-2 border-transparent'
                  }`}
                >
                  <span className={active ? 'text-[#b8975a]' : 'text-[#f5f0e8]/25'}>
                    {NAV_ICONS[item.path]}
                  </span>
                  <span className="font-sans text-[12px] font-medium tracking-[0.06em]">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer actions */}
        <div className="px-3 py-5 border-t border-white/[0.06] flex flex-col gap-1">
          <Link
            to="/"
            className="flex items-center justify-between gap-2 px-3 py-2.5 font-sans text-[11px] font-medium tracking-wider uppercase text-[#f5f0e8]/30 hover:text-[#f5f0e8]/60 transition-colors"
          >
            View Website
            <ExternalIcon />
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center px-3 py-2.5 font-sans text-[11px] font-medium tracking-wider uppercase text-[#f5f0e8]/25 hover:text-red-400/70 transition-colors text-left"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main Content Area ─────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* Top bar */}
        <header className="bg-[#0c1610] border-b border-white/[0.06] px-6 sm:px-8 py-4 flex items-center justify-between flex-shrink-0">

          {/* Left: greeting */}
          <div>
            <p className="font-sans text-[10px] font-light tracking-[0.1em] uppercase text-[#f5f0e8]/20">
              Welcome back
            </p>
            <p className="font-cormorant text-base font-medium text-[#f5f0e8]">
              Mrs. Alaba
            </p>
          </div>

          {/* Right: actions (desktop) */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-sans text-[11px] font-medium tracking-widest uppercase text-[#f5f0e8]/30 hover:text-[#f5f0e8]/60 transition-colors"
            >
              View Website
              <ExternalIcon />
            </Link>
            <span className="block w-px h-4 bg-white/10" aria-hidden="true" />
            <button
              type="button"
              onClick={handleLogout}
              className="font-sans text-[11px] font-medium tracking-widest uppercase text-[#f5f0e8]/25 hover:text-red-400/70 transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Mobile: hamburger-style nav pills */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              to="/"
              className="font-sans text-[10px] tracking-wider uppercase text-[#f5f0e8]/30 hover:text-[#f5f0e8]/60"
            >
              Site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="font-sans text-[10px] tracking-wider uppercase text-[#f5f0e8]/25 hover:text-red-400/60"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Mobile nav tabs */}
        <div className="md:hidden bg-[#080f09] border-b border-white/[0.06] px-4 py-3">
          <div className="flex gap-1 overflow-x-auto">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 font-sans text-[11px] font-medium tracking-[0.08em] uppercase transition-all duration-150 ${
                    active
                      ? 'bg-[#b8975a]/10 text-[#b8975a] border border-[#b8975a]/30'
                      : 'text-[#f5f0e8]/35 border border-white/[0.06] hover:text-[#f5f0e8]/60 hover:border-white/15'
                  }`}
                >
                  {NAV_ICONS[item.path]}
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10">
          {children}
        </main>
      </div>

    </div>
  );
}