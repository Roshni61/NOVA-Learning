import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PageSkeleton } from '../ui';

export const ProtectedRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-nova-bg dark:bg-slate-950 flex flex-col items-center justify-center p-4">
        <PageSkeleton />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect unauthenticated user immediately to /login
    // replace: true prevents history entry to stop back-button exposure
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
