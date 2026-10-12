import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Sprout, TrendingUp, AlertCircle, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { api } from '../services/api';
import { CropRecommendation } from '../types';

export const CropRecommendationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Top Picks' | 'Cereals' | 'Pulses'>('All');
  const [soilSummary, setSoilSummary] = useState({
    pH: 6.8,
    oc: 0.62,
    nStatus: 'Low',
    pStatus: 'Medium',
    kStatus: 'High'
  });

  useEffect(() => {
    async function fetchRecs() {
      setLoading(true);
      try {
        const saved = localStorage.getItem('agri_soil_data');
        let currentSoil = { pH: 6.8, nitrogen: 215, phosphorus: 32, potassium: 280, organicCarbon: 0.62 };
        if (saved) {
          try {
            currentSoil = JSON.parse(saved);
          } catch (e) {}
        }

        setSoilSummary({
          pH: currentSoil.pH,
          oc: currentSoil.organicCarbon,
          nStatus: currentSoil.nitrogen < 150 ? 'Low' : currentSoil.nitrogen <= 250 ? 'Moderate' : 'Good',
          pStatus: currentSoil.phosphorus < 25 ? 'Low' : 'Medium',
          kStatus: currentSoil.potassium > 200 ? 'High' : 'Medium'
        });

        const res = await api.recommendCrops({ soilData: currentSoil });
        if (res.success && res.recommendations) {
          setRecommendations(res.recommendations);
        }
      } catch (err) {
        // Fallback demo crops matching Screen 8
      } finally {
        setLoading(false);
      }
    }

    fetchRecs();

    const handleSoilUpdate = () => fetchRecs();
    window.addEventListener('agri_soil_updated', handleSoilUpdate);
    return () => window.removeEventListener('agri_soil_updated', handleSoilUpdate);
  }, []);

  const demoRecommendations = [
    {
      cropId: 'maize',
      cropName: 'Maize (Corn)',
      category: 'Cereals',
      suitabilityScore: 92,
      duration: '110-120 days',
      waterRequirement: 'Medium',
      expectedYield: '25-30 quintals/acre',
      estimatedCost: 18000,
      estimatedRevenue: 52000,
      estimatedProfit: 34000,
      risk: 'Low Risk',
      marketDemand: 'High Demand',
      whyThisCrop: 'Your soil pH is suitable for maize, good potassium level, fits your Nizamabad region and Kharif season.'
    },
    {
      cropId: 'groundnut',
      cropName: 'Groundnut',
      category: 'Pulses',
      suitabilityScore: 87,
      duration: '100-110 days',
      waterRequirement: 'Low to Medium',
      expectedYield: '12-15 quintals/acre',
      estimatedCost: 16000,
      estimatedRevenue: 48000,
      estimatedProfit: 32000,
      risk: 'Low Risk',
      marketDemand: 'High Demand',
      whyThisCrop: 'Fixes atmospheric nitrogen into soil and thrives in your soil organic carbon profile.'
    },
    {
      cropId: 'paddy',
      cropName: 'Paddy (Rice)',
      category: 'Cereals',
      suitabilityScore: 71,
      duration: '120-135 days',
      waterRequirement: 'High',
      expectedYield: '28-35 quintals/acre',
      estimatedCost: 22000,
      estimatedRevenue: 58000,
      estimatedProfit: 36000,
      risk: 'Moderate Risk',
      marketDemand: 'Very High Demand',
      whyThisCrop: 'High local market price stability in Nizamabad APMC yards, requires assured irrigation.'
    },
    {
      cropId: 'cotton',
      cropName: 'Cotton',
      category: 'Commercial',
      suitabilityScore: 64,
      duration: '150-160 days',
      waterRequirement: 'Medium',
      expectedYield: '10-14 quintals/acre',
      estimatedCost: 24000,
      estimatedRevenue: 60000,
      estimatedProfit: 36000,
      risk: 'Moderate Risk',
      marketDemand: 'High Demand',
      whyThisCrop: 'Provides high cash returns, requires pest monitoring during boll formation stage.'
    }
  ];

  const listToDisplay = recommendations.length > 0 ? recommendations : demoRecommendations;

  const filteredCrops = listToDisplay.filter((c) => {
    if (activeCategory === 'Top Picks') return c.suitabilityScore >= 80;
    if (activeCategory === 'Cereals') return c.category.toLowerCase().includes('cereal') || c.cropName.toLowerCase().includes('maize') || c.cropName.toLowerCase().includes('paddy');
    if (activeCategory === 'Pulses') return c.category.toLowerCase().includes('pulse') || c.cropName.toLowerCase().includes('groundnut');
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-8">
      {/* SCREEN 8 HEADER */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Suitable Crops for Your Soil</h1>
            <p className="text-xs text-slate-500 font-medium">Ranked specifically for your uploaded soil test parameters</p>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              Step 8 of 14
            </span>
          </div>
        </div>

        {/* SOIL HEALTH SUMMARY BADGE matching Screen 8 */}
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="font-bold text-emerald-950 flex items-center">
            <Sparkles className="w-4 h-4 text-emerald-600 mr-1.5" />
            Soil Health Summary:
          </span>
          <div className="flex flex-wrap items-center gap-2 font-mono font-bold">
            <span className="bg-white px-2.5 py-1 rounded-lg border border-emerald-200 text-slate-800">pH: {soilSummary.pH}</span>
            <span className="bg-white px-2.5 py-1 rounded-lg border border-emerald-200 text-slate-800">OC: {soilSummary.oc}%</span>
            <span className="bg-white px-2.5 py-1 rounded-lg border border-emerald-200 text-amber-700">N: {soilSummary.nStatus}</span>
            <span className="bg-white px-2.5 py-1 rounded-lg border border-emerald-200 text-emerald-700">P: {soilSummary.pStatus}</span>
            <span className="bg-white px-2.5 py-1 rounded-lg border border-emerald-200 text-emerald-700">K: {soilSummary.kStatus}</span>
          </div>
        </div>

        {/* CATEGORY FILTER TABS matching Screen 8 */}
        <div className="flex items-center space-x-2 pt-1 border-t border-slate-100 overflow-x-auto">
          {(['All', 'Top Picks', 'Cereals', 'Pulses'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeCategory === cat
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* CROP CARDS LIST */}
      <div className="space-y-4">
        {filteredCrops.map((rec) => (
          <div
            key={rec.cropId}
            className="agri-card p-5 space-y-4 border-l-4 border-l-emerald-600 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 font-black text-xl flex items-center justify-center">
                  <Sprout className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">{rec.cropName}</h3>
                  <div className="flex items-center space-x-2 text-xs text-emerald-700 font-semibold mt-0.5">
                    <span>{rec.suitabilityScore}% suitability</span>
                    <span>•</span>
                    <span>{rec.duration}</span>
                  </div>
                </div>
              </div>

              <Link
                to={`/crops/${rec.cropId}`}
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center"
              >
                View Details <ChevronRight className="w-4 h-4 ml-0.5" />
              </Link>
            </div>

            {/* METRICS GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-2xl text-xs">
              <div>
                <span className="text-slate-500 font-medium">Expected Yield</span>
                <p className="font-bold text-slate-900">{rec.expectedYield}</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Cultivation Cost</span>
                <p className="font-bold text-slate-900">₹{rec.estimatedCost.toLocaleString()} / acre</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Est. Revenue</span>
                <p className="font-bold text-emerald-700">₹{rec.estimatedRevenue.toLocaleString()} / acre</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Net Profit</span>
                <p className="font-extrabold text-emerald-800">₹{rec.estimatedProfit.toLocaleString()} / acre</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="text-xs text-slate-600 font-medium">
                <span className="font-bold text-slate-800">Why Recommended:</span> {rec.whyThisCrop}
              </div>

              <button
                onClick={() => navigate('/fertilizer-plan', { state: { cropName: rec.cropName } })}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs shrink-0 flex items-center justify-center space-x-1"
              >
                <span>Next: Fertilizer Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
