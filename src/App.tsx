import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GoalProvider } from './context/GoalContext';
import { AppLayout } from './components/layout';
import { PageSkeleton, ErrorBoundary } from './components/ui';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { PublicOnlyRoute } from './components/auth/PublicOnlyRoute';

// Lazy-loaded page route components for dynamic code splitting
const HomePage = lazy(() => import('./pages/Home/HomePage').then((m) => ({ default: m.HomePage })));
const LoginPage = lazy(() => import('./pages/Auth/LoginPage').then((m) => ({ default: m.LoginPage })));
const OnboardingPage = lazy(() => import('./pages/Auth/OnboardingPage').then((m) => ({ default: m.OnboardingPage })));
const TodayPage = lazy(() => import('./pages/Dashboard/TodayPage').then((m) => ({ default: m.TodayPage })));
const CatalogPage = lazy(() => import('./pages/Catalog/CatalogPage').then((m) => ({ default: m.CatalogPage })));
const CourseDetailPage = lazy(() => import('./pages/Catalog/CourseDetailPage').then((m) => ({ default: m.CourseDetailPage })));
const UniversePage = lazy(() => import('./pages/Dashboard/UniversePage').then((m) => ({ default: m.UniversePage })));
const PathPage = lazy(() => import('./pages/Dashboard/PathPage').then((m) => ({ default: m.PathPage })));
const TutorPage = lazy(() => import('./pages/Dashboard/TutorPage').then((m) => ({ default: m.TutorPage })));
const ProfilePage = lazy(() => import('./pages/Dashboard/ProfilePage').then((m) => ({ default: m.ProfilePage })));
const MissionWorkspacePage = lazy(() => import('./pages/Dashboard/MissionWorkspacePage').then((m) => ({ default: m.MissionWorkspacePage })));
const NotFoundPage = lazy(() => import('./pages/NotFound/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <GoalProvider>
          <BrowserRouter>
            <Suspense fallback={<PageSkeleton />}>
              <Routes>
                {/* Public Landing Page */}
                <Route path="/" element={<HomePage />} />
                <Route path="/landing" element={<HomePage />} />

                {/* Public Authentication Routes */}
                <Route
                  path="/login"
                  element={
                    <PublicOnlyRoute>
                      <LoginPage initialMode="login" />
                    </PublicOnlyRoute>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <PublicOnlyRoute>
                      <LoginPage initialMode="signup" />
                    </PublicOnlyRoute>
                  }
                />
                <Route
                  path="/forgot-password"
                  element={
                    <PublicOnlyRoute>
                      <LoginPage initialMode="login" />
                    </PublicOnlyRoute>
                  }
                />
                <Route path="/onboarding" element={<OnboardingPage />} />

                {/* Protected Routes (Require Authentication) */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<AppLayout />}>
                    {/* Authenticated Home / Dashboard Routes */}
                    <Route path="/today" element={<TodayPage />} />
                    <Route path="/home" element={<TodayPage />} />
                    <Route path="/dashboard" element={<TodayPage />} />

                    {/* Catalog & Learning Routes */}
                    <Route path="/catalog" element={<CatalogPage />} />
                    <Route path="/course/:courseId" element={<CourseDetailPage />} />
                    <Route path="/learn" element={<CatalogPage />} />
                    <Route path="/practice" element={<PathPage />} />

                    {/* Universe, Path, Tutor & Profile Routes */}
                    <Route path="/universe" element={<UniversePage />} />
                    <Route path="/path" element={<PathPage />} />
                    <Route path="/tutor" element={<TutorPage />} />
                    <Route path="/ai-tutor" element={<TutorPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/progress" element={<ProfilePage />} />
                    <Route path="/analytics" element={<ProfilePage />} />

                    {/* Daily Mission Workspace */}
                    <Route path="/mission/:conceptId" element={<MissionWorkspacePage />} />

                    {/* Protected Fallback */}
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>
                </Route>

                {/* Unauthenticated Catch-all Fallback -> Redirects to /login */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </GoalProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
