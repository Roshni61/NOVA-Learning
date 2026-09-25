import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PageSkeleton } from '../ui';

export const PublicOnlyRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-nova-bg dark:bg-slate-950 flex flex-col items-center justify-center p-4">
        <PageSkeleton />
      </div>
    );
  }

  if (isAuthenticated) {
    const destination = (location.state as any)?.from?.pathname || '/today';
    return <Navigate to={destination} replace />;
  }

  return <>{children}</>;
};

export default PublicOnlyRoute;
