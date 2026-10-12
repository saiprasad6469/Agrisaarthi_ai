import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, TestTube2, Sprout, Store, Bot } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const items = [
    { label: 'Home', path: '/dashboard', icon: Home },
    { label: 'Soil', path: '/soil-analysis', icon: TestTube2 },
    { label: 'Crops', path: '/crop-recommendations', icon: Sprout },
    { label: 'Market', path: '/markets', icon: Store },
    { label: 'Assistant', path: '/assistant', icon: Bot }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 lg:hidden px-2 py-1 shadow-lg">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center py-1.5 px-3 rounded-lg text-xs font-medium transition-colors ${
                  isActive ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`
              }
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
