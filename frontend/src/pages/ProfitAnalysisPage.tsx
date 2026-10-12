import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, CloudRain, Cloud, AlertTriangle, TrendingUp, MapPin, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const ProfitAnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSubStep, setActiveSubStep] = useState<'weather' | 'market'>('weather');

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-8">
      {/* STEP NAVIGATION HEADER */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Risk & Profit Analysis</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            {activeSubStep === 'weather' ? 'Weather & Risk Analysis' : 'Market Price & Demand'}
          </h1>
          <p className="text-xs text-slate-500 font-medium">Location: Hyderabad & Nizamabad, Telangana</p>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            {activeSubStep === 'weather' ? 'Step 12 of 14' : 'Step 13 of 14'}
          </span>
        </div>
      </div>

      {activeSubStep === 'weather' ? (
        /* SCREEN 12: WEATHER & RISK ANALYSIS */
        <div className="agri-card p-6 sm:p-8 space-y-6">
          {/* WEATHER FORECAST CARDS matching Screen 12 */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center">
              <Sun className="w-4 h-4 text-amber-500 mr-2" />
              Weather Forecast (3 Days)
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200 text-center space-y-1">
                <div className="text-xs font-bold text-slate-500">Today</div>
                <div className="text-2xl font-black text-slate-900">32°C</div>
                <div className="text-[11px] font-semibold text-amber-800 flex items-center justify-center">
                  <Sun className="w-3.5 h-3.5 mr-1 text-amber-500" /> Partly Cloudy
                </div>
              </div>

              <div className="bg-sky-50/60 p-4 rounded-2xl border border-sky-200 text-center space-y-1">
                <div className="text-xs font-bold text-slate-500">Tomorrow</div>
                <div className="text-2xl font-black text-slate-900">30°C</div>
                <div className="text-[11px] font-semibold text-sky-800 flex items-center justify-center">
                  <CloudRain className="w-3.5 h-3.5 mr-1 text-sky-500" /> Light Rain
                </div>
              </div>

              <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200 text-center space-y-1">
                <div className="text-xs font-bold text-slate-500">Wed</div>
                <div className="text-2xl font-black text-slate-900">28°C</div>
                <div className="text-[11px] font-semibold text-slate-700 flex items-center justify-center">
                  <Cloud className="w-3.5 h-3.5 mr-1 text-slate-500" /> Cloudy
                </div>
              </div>
            </div>
          </div>

          {/* RISK ANALYSIS LIST matching Screen 12 */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Risk Analysis
            </h3>

            <div className="space-y-3">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Weather Risk</h4>
                    <p className="text-xs text-slate-500">Normal temperature variation</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-extrabold rounded-full">
                  Medium
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Drought Risk</h4>
                    <p className="text-xs text-slate-500">Adequate water sources</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-extrabold rounded-full">
                  Low
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Pest & Disease Risk</h4>
                    <p className="text-xs text-slate-500">Monitor stem borer in early stage</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-extrabold rounded-full">
                  Medium
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Market Price Risk</h4>
                    <p className="text-xs text-slate-500">Price subject to regional supply</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-extrabold rounded-full">
                  Medium
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveSubStep('market')}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <span>Next: Market & Profit</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      ) : (
        /* SCREEN 13: MARKET INFORMATION */
        <div className="agri-card p-6 sm:p-8 space-y-6">
          {/* PRICE TREND CARD matching Screen 13 */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase">Crop</span>
                <h3 className="text-xl font-black text-slate-900">Maize (Corn)</h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-md">
                  +5% from last week
                </span>
                <div className="text-2xl font-black text-emerald-800 mt-0.5">
                  ₹ 1,850 <span className="text-xs font-normal text-slate-500">/ quintal</span>
                </div>
              </div>
            </div>

            {/* MOCK PRICE TREND LINE */}
            <div className="pt-2">
              <div className="text-[11px] font-bold text-slate-500 mb-1">Price Trend (May - Sep)</div>
              <div className="h-16 w-full bg-emerald-50 rounded-xl border border-emerald-200 flex items-end p-2 gap-1 justify-between">
                {[1650, 1700, 1720, 1780, 1850].map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-emerald-600 rounded-t-md transition-all"
                      style={{ height: `${((val - 1500) / 400) * 100}%` }}
                    ></div>
                    <span className="text-[9px] font-bold text-slate-500 mt-1">
                      {['May', 'Jun', 'Jul', 'Aug', 'Sep'][idx]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* NEARBY MARKETS LIST matching Screen 13 */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Nearby Markets
            </h3>

            <div className="space-y-2.5">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Miyapur Market</h4>
                    <p className="text-xs text-slate-500">12 km distance</p>
                  </div>
                </div>
                <span className="font-extrabold text-slate-900 text-sm">₹ 1,820 / qtl</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Gachibowli Market</h4>
                    <p className="text-xs text-slate-500">18 km distance</p>
                  </div>
                </div>
                <span className="font-extrabold text-emerald-700 text-sm">₹ 1,850 / qtl</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Shamshabad Market</h4>
                    <p className="text-xs text-slate-500">25 km distance</p>
                  </div>
                </div>
                <span className="font-extrabold text-slate-900 text-sm">₹ 1,800 / qtl</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/crop-plan')}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <span>Next: Profit Estimation & Crop Plan</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
