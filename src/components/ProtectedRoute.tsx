import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { isAdminDemoMode } from '../config/demoMode';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

  if (!isAuthenticated && !isAdminDemoMode) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
