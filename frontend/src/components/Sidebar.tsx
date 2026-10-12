import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Tractor,
  TestTube2,
  Sparkles,
  FlaskConical,
  CalendarDays,
  Droplets,
  TrendingUp,
  Store,
  Users,
  Bot,
  History,
  Bell,
  Settings
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Farm', path: '/farm', icon: Tractor },
    { label: 'Soil Analysis & Reports', path: '/soil-analysis', icon: TestTube2 },
    { label: 'Crop Recommendations', path: '/crop-recommendations', icon: Sparkles },
    { label: 'Fertilizer Plan', path: '/fertilizer-plan', icon: FlaskConical },
    { label: 'Crop Cultivation Plan', path: '/crop-plan', icon: CalendarDays },
    { label: 'Irrigation Planner', path: '/irrigation', icon: Droplets },
    { label: 'Profit & Risk', path: '/profit-analysis', icon: TrendingUp },
    { label: 'Market Prices', path: '/markets', icon: Store },
    { label: 'Buyers', path: '/buyers', icon: Users },
    { label: 'AI Assistant', path: '/assistant', icon: Bot },
    { label: 'History', path: '/history', icon: History },
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Settings', path: '/settings', icon: Settings }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-50 lg:z-30 w-64 bg-white border-r border-slate-200 overflow-y-auto transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="py-4 px-3 space-y-1">
          <div className="px-3 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Farmer Portal
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                      : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-800'
                  }`
                }
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </aside>
    </>
  );
};
