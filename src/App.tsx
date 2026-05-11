import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WhatsAppFloat } from './components/layout/WhatsAppFloat';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Listings from './pages/Listings';
import ListingDetail from './pages/ListingDetail';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';

// Admin Pages (lazy)
const AdminLogin = lazy(() => import('./pages/admin/Login').then((m) => ({ default: m.Login })));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard').then((m) => ({ default: m.Dashboard })));
const ManageListings = lazy(() => import('./pages/admin/ManageListings').then((m) => ({ default: m.ManageListings })));
const NewListing = lazy(() => import('./pages/admin/NewListing').then((m) => ({ default: m.NewListing })));
const EditListing = lazy(() => import('./pages/admin/EditListing').then((m) => ({ default: m.EditListing })));
const Leads = lazy(() => import('./pages/admin/Leads').then((m) => ({ default: m.Leads })));

const queryClient = new QueryClient();

function LoadingSkeleton(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#0f1810] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Pulsing AO mark */}
        <span className="font-cormorant text-4xl font-medium text-[#f5f0e8]/10 animate-pulse select-none">
          AO
        </span>
        {/* Thin gold progress line */}
        <div className="w-24 h-px bg-white/[0.06] overflow-hidden">
          <div className="h-px bg-[#b8975a]/50 animate-[shimmer_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}

function AppShell(): JSX.Element {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdmin && <Navbar />}
      <main className="flex-1">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/:slug" element={<ListingDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          {/* Admin */}
          <Route
            path="/admin/login"
            element={
              <Suspense fallback={<LoadingSkeleton />}>
                <AdminLogin />
              </Suspense>
            }
          />
          <Route path="/admin" element={<Navigate to="/admin/listings" replace />} />
          <Route
            path="/admin/dashboard"
            element={
              <Suspense fallback={<LoadingSkeleton />}>
                <ProtectedRoute><AdminDashboard /></ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/admin/listings"
            element={
              <Suspense fallback={<LoadingSkeleton />}>
                <ProtectedRoute><ManageListings /></ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/admin/listings/new"
            element={
              <Suspense fallback={<LoadingSkeleton />}>
                <ProtectedRoute><NewListing /></ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/admin/listings/:id/edit"
            element={
              <Suspense fallback={<LoadingSkeleton />}>
                <ProtectedRoute><EditListing /></ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/admin/leads"
            element={
              <Suspense fallback={<LoadingSkeleton />}>
                <ProtectedRoute><Leads /></ProtectedRoute>
              </Suspense>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppFloat />}
    </div>
  );
}

export function App(): JSX.Element {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#131f14',
                border: '1px solid rgba(255,255,255,0.07)',
                color: 'rgba(245,240,232,0.8)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px',
                borderRadius: '0',
              },
              success: {
                iconTheme: { primary: '#b8975a', secondary: '#0f1810' },
              },
            }}
          />
          <AppShell />
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}