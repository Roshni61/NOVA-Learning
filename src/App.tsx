import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoalProvider } from './context/GoalContext';
import { HomePage } from './pages/Home';
import { LoginPage, OnboardingPage } from './pages/Auth';
import { AppLayout } from './components/layout';
import { TodayPage, UniversePage, PathPage, TutorPage, ProfilePage, MissionWorkspacePage } from './pages/Dashboard';

export const App: React.FC = () => {
  return (
    <GoalProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Protected App Layout Shell */}
          <Route element={<AppLayout />}>
            <Route path="/today" element={<TodayPage />} />
            <Route path="/universe" element={<UniversePage />} />
            <Route path="/path" element={<PathPage />} />
            <Route path="/tutor" element={<TutorPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/mission/:conceptId" element={<MissionWorkspacePage />} />
          </Route>

          {/* Fallback Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </GoalProvider>
  );
};

export default App;
