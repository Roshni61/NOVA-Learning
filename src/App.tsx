import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoalProvider } from './context/GoalContext';
import { AppLayout } from './components/layout';
import { PageSkeleton } from './components/ui';

// Lazy-loaded page route components for dynamic code splitting
const HomePage = lazy(() => import('./pages/Home/HomePage').then((m) => ({ default: m.HomePage })));
const LoginPage = lazy(() => import('./pages/Auth/LoginPage').then((m) => ({ default: m.LoginPage })));
const OnboardingPage = lazy(() => import('./pages/Auth/OnboardingPage').then((m) => ({ default: m.OnboardingPage })));
const TodayPage = lazy(() => import('./pages/Dashboard/TodayPage').then((m) => ({ default: m.TodayPage })));
const CatalogPage = lazy(() => import('./pages/Catalog/CatalogPage').then((m) => ({ default: m.CatalogPage })));
const UniversePage = lazy(() => import('./pages/Dashboard/UniversePage').then((m) => ({ default: m.UniversePage })));
const PathPage = lazy(() => import('./pages/Dashboard/PathPage').then((m) => ({ default: m.PathPage })));
const TutorPage = lazy(() => import('./pages/Dashboard/TutorPage').then((m) => ({ default: m.TutorPage })));
const ProfilePage = lazy(() => import('./pages/Dashboard/ProfilePage').then((m) => ({ default: m.ProfilePage })));
const MissionWorkspacePage = lazy(() => import('./pages/Dashboard/MissionWorkspacePage').then((m) => ({ default: m.MissionWorkspacePage })));

export const App: React.FC = () => {
  return (
    <GoalProvider>
      <BrowserRouter>
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />

            {/* Protected App Layout Shell */}
            <Route element={<AppLayout />}>
              <Route path="/today" element={<TodayPage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/universe" element={<UniversePage />} />
              <Route path="/path" element={<PathPage />} />
              <Route path="/tutor" element={<TutorPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/mission/:conceptId" element={<MissionWorkspacePage />} />
            </Route>

            {/* Fallback Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </GoalProvider>
  );
};

export default App;
