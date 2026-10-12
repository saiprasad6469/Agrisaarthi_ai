import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { PublicLayout } from './layouts/PublicLayout';
import { MainLayout } from './layouts/MainLayout';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';

import { FarmerDashboardPage } from './pages/FarmerDashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { FarmLocationPage } from './pages/FarmLocationPage';
import { SoilLabsPage } from './pages/SoilLabsPage';
import { SoilReportPage } from './pages/SoilReportPage';
import { SoilAnalysisPage } from './pages/SoilAnalysisPage';
import { CropRecommendationsPage } from './pages/CropRecommendationsPage';
import { CropDetailsPage } from './pages/CropDetailsPage';
import { FertilizerPlanPage } from './pages/FertilizerPlanPage';
import { CropPlanPage } from './pages/CropPlanPage';
import { IrrigationPage } from './pages/IrrigationPage';
import { ProfitAnalysisPage } from './pages/ProfitAnalysisPage';
import { MarketPricesPage } from './pages/MarketPricesPage';
import { BuyerDiscoveryPage } from './pages/BuyerDiscoveryPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';

interface ProtectedRouteProps {
  user: any;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function AppRoutes() {
  const navigate = useNavigate();
  const [currentLang, setCurrentLang] = useState<string>('en');

  // Authenticated farmer state - defaults to null for unauthenticated guests
  const [user, setUser] = useState<any>(() => {
    const saved = localStorage.getItem('agri_farmer_user');
    const token = localStorage.getItem('agri_farmer_token');
    return saved && token ? JSON.parse(saved) : null;
  });

  const handleLoginSuccess = (token: string, userData: any) => {
    localStorage.setItem('agri_farmer_token', token);
    localStorage.setItem('agri_farmer_user', JSON.stringify(userData));
    setUser(userData);
    if (userData.preferredLanguage) {
      setCurrentLang(userData.preferredLanguage);
    }
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('agri_farmer_token');
    localStorage.removeItem('agri_farmer_user');
    setUser(null);
    navigate('/', { replace: true });
  };

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route element={<PublicLayout currentLang={currentLang} onLangChange={setCurrentLang} user={user} onLogout={handleLogout} />}>
        <Route path="/" element={<LandingPage user={user} />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <LoginPage onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" replace /> : <RegisterPage onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* FARMER PORTAL PROTECTED ROUTES - REQUIRES LOGIN */}
      <Route
        element={
          <ProtectedRoute user={user}>
            <MainLayout currentLang={currentLang} onLangChange={setCurrentLang} user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<FarmerDashboardPage user={user} />} />
        <Route path="/profile" element={<ProfilePage user={user} onUpdateUser={setUser} />} />
        <Route path="/farm" element={<ProfilePage user={user} onUpdateUser={setUser} />} />
        <Route path="/farm-location" element={<FarmLocationPage />} />
        <Route path="/soil-labs" element={<SoilLabsPage />} />
        <Route path="/soil-report" element={<SoilReportPage />} />
        <Route path="/soil-analysis" element={<SoilAnalysisPage />} />
        <Route path="/crop-recommendations" element={<CropRecommendationsPage />} />
        <Route path="/crops/:id" element={<CropDetailsPage />} />
        <Route path="/fertilizer-plan" element={<FertilizerPlanPage />} />
        <Route path="/crop-plan" element={<CropPlanPage />} />
        <Route path="/irrigation" element={<IrrigationPage />} />
        <Route path="/profit-analysis" element={<ProfitAnalysisPage />} />
        <Route path="/markets" element={<MarketPricesPage />} />
        <Route path="/buyers" element={<BuyerDiscoveryPage />} />
        <Route path="/assistant" element={<AIAssistantPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/settings" element={<SettingsPage currentLang={currentLang} onLangChange={setCurrentLang} onLogout={handleLogout} />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
