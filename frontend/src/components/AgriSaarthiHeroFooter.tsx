import React from 'react';
import { Sprout, FlaskConical, Droplets, TrendingUp, ShieldCheck, Sun, CheckCircle2 } from 'lucide-react';

export const AgriSaarthiHeroFooter: React.FC = () => {
  const pills = [
    { title: 'Better Crop Selection', icon: Sprout },
    { title: 'Optimized Fertilizer Use', icon: FlaskConical },
    { title: 'Efficient Water Management', icon: Droplets },
    { title: 'Higher Income & Market Access', icon: TrendingUp },
    { title: 'Reduced Risk from Climate Change', icon: ShieldCheck },
    { title: 'Sustainable & Resilient Farming', icon: Sprout }
  ];

  return (
    <div className="w-full space-y-6 pt-6">
      {/* BRAND BANNER WITH 6 PILLS matching Screen 15 bottom banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6 border border-emerald-800/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-800/60 pb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
              <Sprout className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight">AgriSaarthi AI</h2>
              <p className="text-xs text-emerald-200 font-medium">Smart Soil. Better Crops. Brighter Future.</p>
            </div>
          </div>
          <p className="text-xs text-emerald-300 font-semibold italic max-w-md">
            Solving Today's Agriculture Challenges with AI, Data and You
          </p>
        </div>

        {/* 6 PILL CARDS matching bottom banner of reference image */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {pills.map((pill, idx) => {
            const Icon = pill.icon;
            return (
              <div
                key={idx}
                className="bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-700/50 p-3.5 rounded-2xl text-center space-y-2 transition-all hover:scale-105"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto">
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold text-white leading-tight">{pill.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* EL NIÑO EFFECT & OUR SOLUTION CARD matching reference image */}
      <div className="bg-amber-50/90 border border-amber-200 rounded-3xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-red-500 text-white flex items-center justify-center shrink-0 shadow-md">
            <Sun className="w-9 h-9 animate-pulse" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-black uppercase tracking-wider">
              El Niño Effect
            </span>
            <h3 className="text-lg font-black text-amber-950 mt-1">El Niño & Water Stress</h3>
            <p className="text-xs text-amber-800">Irregular rainfall & higher temperatures forecast across South India.</p>
          </div>
        </div>

        <div className="md:col-span-2 bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs space-y-2">
          <h4 className="text-xs font-black uppercase tracking-wider text-emerald-900 flex items-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1.5" />
            Our Climate Resilient Solution:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-semibold">
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>Weather Forecasting & Risk Alerts</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>Drought-Resistant Crop Selection</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>Optimized Drip Irrigation Schedules</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>Soil Moisture & NPK Monitoring</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
