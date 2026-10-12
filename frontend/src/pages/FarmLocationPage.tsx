import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Navigation, ArrowLeft, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export const FarmLocationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const lab = (location.state as any)?.lab || {
    name: 'Government Soil Testing Lab',
    distance: '4.2 km',
    duration: '12 min',
    address: 'Agricultural Research Institute, Gachibowli, Hyderabad'
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      {/* SCREEN 5 HEADER */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Labs
        </button>
        <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
          Step 5 of 14
        </span>
      </div>

      <div className="agri-card overflow-hidden space-y-0">
        <div className="p-4 bg-emerald-950 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Navigation className="w-5 h-5 text-emerald-400 animate-pulse" />
            <h1 className="text-lg font-bold">Map Navigation</h1>
          </div>
          <span className="text-xs font-mono text-emerald-300 font-bold">{lab.distance} • {lab.duration || '12 min'}</span>
        </div>

        {/* INTERACTIVE MOCK MAP VIEW matching Screen 5 */}
        <div className="relative h-80 sm:h-96 w-full bg-slate-200 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-70"></div>

          {/* SIMULATED ROUTE PATH LINE matching Screen 5 */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path
              d="M 150 250 Q 250 150 350 80"
              fill="none"
              stroke="#0284c7"
              strokeWidth="6"
              strokeDasharray="8 4"
              className="animate-pulse"
            />
          </svg>

          {/* USER LOCATION PIN */}
          <div className="absolute left-[130px] top-[230px] flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs shadow-lg ring-4 ring-sky-200">
              You
            </div>
            <span className="text-[10px] font-bold text-slate-800 bg-white/90 px-2 py-0.5 rounded shadow-xs mt-1">Hyderabad</span>
          </div>

          {/* DESTINATION LAB PIN matching Screen 5 */}
          <div className="absolute right-[180px] top-[60px] flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xl ring-4 ring-emerald-200">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="bg-emerald-950 text-white text-[11px] font-bold px-3 py-1 rounded-lg shadow-md mt-1 text-center">
              {lab.name}
              <p className="text-[9px] text-emerald-300">{lab.distance}</p>
            </div>
          </div>
        </div>

        {/* DETAILS BOTTOM CARD matching Screen 5 */}
        <div className="p-6 bg-white space-y-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">{lab.name}</h2>
              <p className="text-xs text-slate-500 font-medium">{lab.address}</p>
            </div>
            <div className="text-right">
              <span className="text-lg font-black text-emerald-700">{lab.distance}</span>
              <p className="text-xs text-slate-500 font-semibold">Est. 12 min drive</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                const query = encodeURIComponent(`${lab.name}, ${lab.address}`);
                window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer');
              }}
              className="px-5 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <Navigation className="w-5 h-5 text-emerald-400" />
              <span>Open in Google Maps App</span>
            </button>

            <button
              onClick={() => navigate('/soil-report')}
              className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>Upload Soil Report</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
