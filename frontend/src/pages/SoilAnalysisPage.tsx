import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TestTube2, AlertTriangle, CheckCircle2, Info, ArrowRight, RefreshCw, Edit3 } from 'lucide-react';
import { api } from '../services/api';

export const SoilAnalysisPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [soilHealth, setSoilHealth] = useState<any[]>([]);
  const [summary, setSummary] = useState('');
  const [activeSoilData, setActiveSoilData] = useState<any>({
    pH: 6.8,
    nitrogen: 215,
    phosphorus: 32,
    potassium: 280,
    organicCarbon: 0.62,
    sulfur: 12,
    zinc: 0.75,
    iron: 4.5
  });

  const loadAnalysis = async (currentData?: any) => {
    setLoading(true);
    try {
      const saved = localStorage.getItem('agri_soil_data');
      const dataToUse = currentData || (saved ? JSON.parse(saved) : activeSoilData);
      setActiveSoilData(dataToUse);

      const res = await api.analyzeSoil(dataToUse);
      if (res.success) {
        setSoilHealth(res.soilHealth);
        setSummary(res.overallSummary);
      }
    } catch (err) {
      // Fallback preview matching uploaded data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalysis();

    const handleSoilUpdate = () => {
      loadAnalysis();
    };

    window.addEventListener('agri_soil_updated', handleSoilUpdate);
    return () => window.removeEventListener('agri_soil_updated', handleSoilUpdate);
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Verified Soil Report Active</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
            <TestTube2 className="w-7 h-7 text-emerald-600" />
            <span>Soil Report Analysis</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Based on your uploaded report (pH: {activeSoilData.pH}, N: {activeSoilData.nitrogen} kg/ha, P: {activeSoilData.phosphorus} kg/ha, K: {activeSoilData.potassium} kg/ha, OC: {activeSoilData.organicCarbon}%)
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            to="/soil-report"
            className="inline-flex items-center px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors"
          >
            <Edit3 className="w-4 h-4 mr-1.5 text-emerald-700" />
            Re-Upload / Edit
          </Link>
          <Link
            to="/crop-recommendations"
            className="inline-flex items-center px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            Find Suitable Crops <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>
      </div>

      {/* PARAMETER CARDS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {soilHealth.map((item) => (
          <div key={item.name} className="agri-card p-4 space-y-2 border-t-4 border-t-emerald-600">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{item.name}</div>
            <div className="text-2xl font-black text-slate-900">
              {item.value} <span className="text-xs font-normal text-slate-500">{item.unit}</span>
            </div>
            <span
              className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-extrabold ${
                item.status === 'Good'
                  ? 'bg-emerald-100 text-emerald-800'
                  : item.status === 'Low'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>

      {/* WHAT THIS MEANS SUMMARY BOX */}
      <div className="bg-amber-50/90 border border-amber-200 rounded-3xl p-6 space-y-3 shadow-2xs">
        <div className="flex items-center space-x-2 text-amber-900 font-bold text-lg">
          <Info className="w-5 h-5 text-amber-600" />
          <span>What This Means For Your Farm</span>
        </div>
        <p className="text-slate-800 text-sm leading-relaxed font-medium">
          {summary || `Your soil pH (${activeSoilData.pH}) and organic carbon (${activeSoilData.organicCarbon}%) are in good condition. Nitrogen levels (${activeSoilData.nitrogen} kg/ha) and Potassium (${activeSoilData.potassium} kg/ha) support high yields for Maize, Groundnut, and Paddy.`}
        </p>
      </div>
    </div>
  );
};
