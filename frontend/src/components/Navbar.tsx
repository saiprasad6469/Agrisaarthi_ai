import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout,
  Menu,
  X,
  Globe,
  LogOut,
  Bell,
  Mic,
  Sparkles,
  Home,
  TestTube2,
  CalendarDays,
  Store,
  UserCheck
} from 'lucide-react';
import { getTranslation } from '../utils/i18n';

interface NavbarProps {
  currentLang: string;
  onLangChange: (lang: any) => void;
  user: any;
  onLogout: () => void;
  onToggleSidebar?: () => void;
  onOpenVoice?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLangChange,
  user,
  onLogout,
  onToggleSidebar,
  onOpenVoice
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: Brand Logo & Mobile Sidebar Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {user ? (
              <button
                onClick={onToggleSidebar}
                className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                aria-label="Toggle Farmer Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            ) : (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-emerald-800" /> : <Menu className="w-6 h-6" />}
              </button>
            )}

            <Link to={user ? '/dashboard' : '/'} className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-emerald-700 to-teal-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-emerald-950 flex items-center leading-none">
                  AgriSaarthi <span className="text-emerald-600 font-black ml-1">AI</span>
                </span>
                <span className="text-[10px] text-emerald-700 font-bold tracking-wide leading-tight hidden sm:block">
                  🌾 Smart Soil • Better Crops
                </span>
              </div>
            </Link>
          </div>

          {/* Center Navigation Links for Desktop/Laptop */}
          {!user && (
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a
                href="#features"
                className="text-slate-700 hover:text-emerald-700 font-bold text-sm transition-colors flex items-center space-x-1.5"
              >
                <Sprout className="w-4 h-4 text-emerald-600" />
                <span>Farmer Features</span>
              </a>
              <a
                href="#how-it-works"
                className="text-slate-700 hover:text-emerald-700 font-bold text-sm transition-colors flex items-center space-x-1.5"
              >
                <TestTube2 className="w-4 h-4 text-emerald-600" />
                <span>How It Works</span>
              </a>
              <a
                href="#testimonials"
                className="text-slate-700 hover:text-emerald-700 font-bold text-sm transition-colors flex items-center space-x-1.5"
              >
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>Farmer Stories</span>
              </a>
            </nav>
          )}

          {/* Right Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* VOICE MIC TRIGGER BUTTON */}
            <button
              onClick={onOpenVoice}
              className="px-2 py-1.5 sm:px-3.5 sm:py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-black flex items-center space-x-1 sm:space-x-1.5 shadow-xs transition-all hover:scale-105 active:scale-95 shrink-0"
              title="Speak in your local language"
            >
              <Mic className="w-4 h-4 text-amber-300 animate-pulse shrink-0" />
              <span className="text-[11px] sm:text-xs whitespace-nowrap">
                <span className="hidden sm:inline">🗣️ </span>Voice<span className="hidden sm:inline"> AI</span>
              </span>
            </button>

            {/* MULTILINGUAL LANGUAGE SELECTOR */}
            <div className="relative flex items-center bg-emerald-50 hover:bg-emerald-100 rounded-xl px-1.5 sm:px-3 py-1.5 text-xs font-bold text-emerald-900 border border-emerald-200 transition-colors shrink-0">
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-700 mr-1 sm:mr-1.5 shrink-0" />
              <select
                value={currentLang}
                onChange={(e) => onLangChange(e.target.value)}
                className="bg-transparent border-none text-emerald-950 font-extrabold focus:outline-hidden cursor-pointer text-xs max-w-[70px] sm:max-w-none truncate pr-1"
                aria-label="Select Farmer Language"
              >
                <option value="en">English</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="mr">मराठी (Marathi)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
              </select>
            </div>

            {user ? (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Link
                  to="/notifications"
                  className="p-2 text-slate-600 hover:text-emerald-700 rounded-xl hover:bg-slate-100 relative"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full"></span>
                </Link>

                <div className="hidden sm:flex items-center space-x-2 pl-2 border-l border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
                    {user.name ? user.name.charAt(0) : 'R'}
                  </div>
                  <span className="text-xs font-bold text-slate-800 truncate max-w-[100px]">
                    {user.name || 'Ramesh'}
                  </span>
                </div>

                <button
                  onClick={onLogout}
                  className="p-2 text-slate-500 hover:text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-xs font-extrabold text-emerald-800 hover:text-emerald-950 transition-colors"
                >
                  {getTranslation('login', currentLang)}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all hover:shadow-lg"
                >
                  {getTranslation('getStarted', currentLang)}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER NAVIGATION FOR GUESTS */}
      {!user && mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-emerald-100 px-4 pt-3 pb-5 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-3 p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-800 font-bold text-sm"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Sprout className="w-4 h-4" />
            </div>
            <span>🌾 Farmer Features & Services</span>
          </a>

          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-3 p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-800 font-bold text-sm"
          >
            <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-700">
              <TestTube2 className="w-4 h-4" />
            </div>
            <span>🧪 9-Step Soil to Market Guide</span>
          </a>

          <a
            href="#testimonials"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-3 p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-800 font-bold text-sm"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
              <UserCheck className="w-4 h-4" />
            </div>
            <span>👨‍🌾 Farmer Testimonials & Results</span>
          </a>

          <div className="pt-2 flex flex-col gap-2">
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 text-center text-white bg-emerald-600 font-extrabold rounded-xl shadow-md text-sm"
            >
              🚀 Register / Get Started Free
            </Link>
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-emerald-900 border border-emerald-300 font-bold rounded-xl text-sm hover:bg-emerald-50"
            >
              🔑 Login to Farmer Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

