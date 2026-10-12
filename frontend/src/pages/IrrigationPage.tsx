import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplets, ArrowRight, ShieldCheck, Info } from 'lucide-react';

export const IrrigationPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-8">
      {/* SCREEN 11 HEADER BAR */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-1.5">
            <Droplets className="w-3.5 h-3.5 text-sky-600" />
            <span>Water Management</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Water Requirement</h1>
          <p className="text-xs text-slate-500 font-medium">Stage-wise irrigation schedule for Maize cultivation</p>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            Step 11 of 14
          </span>
        </div>
      </div>

      <div className="agri-card p-6 sm:p-8 space-y-6">
        {/* WATER REQUIREMENT BADGE CARD matching Screen 11 */}
        <div className="bg-sky-50 border border-sky-200 rounded-3xl p-6 text-center space-y-2">
          <div className="w-16 h-16 bg-sky-500 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <Droplets className="w-9 h-9 animate-bounce" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Medium Water Requirement</h2>
          <p className="text-xs text-slate-600 font-medium">Approximately 450 - 500 mm total water requirement across crop duration</p>
        </div>

        {/* IRRIGATION SCHEDULE TABLE matching Screen 11 */}
        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            Irrigation Schedule (by Growth Stage)
          </h3>

          <div className="bg-slate-50 rounded-2xl border border-slate-200 divide-y divide-slate-200 overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <span className="font-bold text-slate-800 text-sm">Germination</span>
              <span className="font-extrabold text-emerald-700 text-sm">5 - 7 days</span>
            </div>

            <div className="p-4 flex items-center justify-between">
              <span className="font-bold text-slate-800 text-sm">Vegetative Growth</span>
              <span className="font-extrabold text-emerald-700 text-sm">7 - 10 days</span>
            </div>

            <div className="p-4 flex items-center justify-between">
              <span className="font-bold text-slate-800 text-sm">Flowering (Critical)</span>
              <span className="font-extrabold text-emerald-700 text-sm">10 - 12 days</span>
            </div>

            <div className="p-4 flex items-center justify-between">
              <span className="font-bold text-slate-800 text-sm">Grain Filling</span>
              <span className="font-extrabold text-emerald-700 text-sm">8 - 10 days</span>
            </div>
          </div>
        </div>

        {/* TIP BOX matching Screen 11 */}
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center space-x-3 text-emerald-950 text-xs font-semibold">
          <Droplets className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Use drip or sprinkler irrigation if possible to save up to 40% water and ensure uniform nutrient uptake.</span>
        </div>

        {/* NEXT BUTTON matching Screen 11 */}
        <button
          onClick={() => navigate('/profit-analysis')}
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2"
        >
          <span>Next: Weather & Risk Analysis</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
