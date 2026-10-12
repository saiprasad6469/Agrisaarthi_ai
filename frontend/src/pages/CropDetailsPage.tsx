import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Droplets, TestTube2, CheckCircle2, ArrowRight, ShieldCheck, TrendingUp } from 'lucide-react';

export const CropDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isMaize = !id || id.toLowerCase().includes('maize') || id === 'crop-1';

  const cropData = {
    name: isMaize ? 'Maize (Corn)' : 'Groundnut',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=1000',
    duration: '110 - 120 days',
    waterRequirement: 'Medium',
    soilPhRange: '6.0 - 7.5',
    reasons: [
      'Your soil pH (6.8) is highly suitable for optimal maize root absorption.',
      'Good potassium level (280 kg/ha) supports strong stem and cob formation.',
      'Fits your Nizamabad location, temperature profile, and Kharif season.'
    ]
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-8">
      {/* NAVIGATION BAR */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Suitable Crops
        </button>
        <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
          Step 9 of 14
        </span>
      </div>

      {/* SCREEN 9 MAIN CARD */}
      <div className="agri-card overflow-hidden">
        {/* HERO IMAGE BANNER matching Screen 9 */}
        <div className="relative h-56 sm:h-64 w-full bg-emerald-900 overflow-hidden">
          <img
            src={cropData.image}
            alt={cropData.name}
            className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
            <div>
              <span className="px-3 py-1 bg-emerald-600 text-white font-extrabold text-xs rounded-lg uppercase tracking-wider">
                92% Suitability Score
              </span>
              <h1 className="text-3xl font-black text-white mt-2">{cropData.name}</h1>
            </div>
          </div>
        </div>

        {/* STATS GRID matching Screen 9 */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
            <div className="space-y-1">
              <Clock className="w-5 h-5 text-emerald-600 mx-auto" />
              <div className="text-[11px] font-bold text-slate-500 uppercase">Duration</div>
              <div className="text-sm font-extrabold text-slate-900">{cropData.duration}</div>
            </div>

            <div className="space-y-1 border-x border-slate-200">
              <Droplets className="w-5 h-5 text-sky-600 mx-auto" />
              <div className="text-[11px] font-bold text-slate-500 uppercase">Water Req.</div>
              <div className="text-sm font-extrabold text-slate-900">{cropData.waterRequirement}</div>
            </div>

            <div className="space-y-1">
              <TestTube2 className="w-5 h-5 text-emerald-600 mx-auto" />
              <div className="text-[11px] font-bold text-slate-500 uppercase">Soil pH Range</div>
              <div className="text-sm font-extrabold text-emerald-700">{cropData.soilPhRange}</div>
            </div>
          </div>

          {/* WHY RECOMMENDED? BOX matching Screen 9 */}
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-extrabold text-emerald-900 uppercase tracking-wider flex items-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mr-2" />
              Why Recommended?
            </h3>

            <ul className="space-y-2.5 text-sm font-medium text-slate-800">
              {cropData.reasons.map((reason, idx) => (
                <li key={idx} className="flex items-start space-x-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-2"></span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ACTION BUTTON matching Screen 9 */}
          <button
            onClick={() => navigate('/fertilizer-plan', { state: { cropName: cropData.name } })}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <span>Next: Fertilizer Plan</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
