import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FlaskConical, ArrowRight, CheckCircle2, Info, Leaf, ShieldAlert, Sparkles, DollarSign, Calendar, Sprout, Save } from 'lucide-react';
import { api } from '../services/api';

export const FertilizerPlanPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'Inorganic' | 'Organic' | 'Natural'>('Inorganic');
  const [cropName, setCropName] = useState<string>((location.state as any)?.cropName || 'Maize');
  const [acres, setAcres] = useState<number>(2);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const [soilData, setSoilData] = useState({
    pH: 6.8,
    nitrogen: 215,
    phosphorus: 32,
    potassium: 280,
    organicCarbon: 0.62
  });

  useEffect(() => {
    const saved = localStorage.getItem('agri_soil_data');
    if (saved) {
      try {
        setSoilData(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  // Dynamic fertilizer calculations based on NPK deficiencies
  const getFertilizerCalculations = () => {
    const nDef = Math.max(0, 280 - soilData.nitrogen);
    const pDef = Math.max(0, 50 - soilData.phosphorus);
    const kDef = Math.max(0, 300 - soilData.potassium);

    const ureaPerAcre = Math.round(40 + (nDef / 280) * 40); // 40-80 kg/acre
    const dapPerAcre = Math.round(20 + (pDef / 50) * 30);   // 20-50 kg/acre
    const mopPerAcre = Math.round(15 + (kDef / 300) * 25);  // 15-40 kg/acre
    const fymPerAcre = soilData.organicCarbon < 0.5 ? 6 : soilData.organicCarbon < 0.75 ? 4 : 3; // tonnes/acre
    const znSulfatePerAcre = soilData.pH > 7.5 ? 10 : 5; // kg/acre

    const totalUrea = ureaPerAcre * acres;
    const totalDap = dapPerAcre * acres;
    const totalMop = mopPerAcre * acres;
    const totalFym = fymPerAcre * acres;

    // Approximate Costs in INR
    const ureaCost = Math.round(totalUrea * 6); // ~₹300 per 50kg bag
    const dapCost = Math.round(totalDap * 27);  // ~₹1350 per 50kg bag
    const mopCost = Math.round(totalMop * 34);  // ~₹1700 per 50kg bag
    const totalEstCost = ureaCost + dapCost + mopCost;

    return {
      ureaPerAcre,
      dapPerAcre,
      mopPerAcre,
      fymPerAcre,
      znSulfatePerAcre,
      totalUrea,
      totalDap,
      totalMop,
      totalFym,
      totalEstCost
    };
  };

  const calc = getFertilizerCalculations();

  const handleSavePlan = () => {
    const planData = {
      cropName,
      acres,
      soilData,
      calculations: calc,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem(`agri_fertilizer_plan_${cropName}`, JSON.stringify(planData));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-8">
      {/* HEADER BAR */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1.5">
            <FlaskConical className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI Fertilizer Optimizer</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">Fertilizer Plan for {cropName}</h1>
          <p className="text-xs text-slate-500 font-medium">
            Calculated for {acres} Acres based on your soil test report (pH: {soilData.pH}, N: {soilData.nitrogen} kg/ha, P: {soilData.phosphorus} kg/ha)
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            Step 10 of 14
          </span>
        </div>
      </div>

      {/* CROP & ACREAGE CONTROLS */}
      <div className="agri-card p-4 flex flex-wrap items-center justify-between gap-4 bg-slate-50">
        <div className="flex items-center space-x-3">
          <Sprout className="w-5 h-5 text-emerald-600 shrink-0" />
          <label className="text-xs font-bold text-slate-700">Crop:</label>
          <select
            value={cropName}
            onChange={(e) => setCropName(e.target.value)}
            className="bg-white border border-slate-300 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-900 focus:outline-hidden"
          >
            <option value="Maize">Maize (Corn)</option>
            <option value="Groundnut">Groundnut</option>
            <option value="Paddy">Paddy (Rice)</option>
            <option value="Cotton">Cotton</option>
            <option value="Tomato">Tomato</option>
            <option value="Chilli">Chilli</option>
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <label className="text-xs font-bold text-slate-700">Farm Size (Acres):</label>
          <input
            type="number"
            min="1"
            max="100"
            value={acres}
            onChange={(e) => setAcres(Math.max(1, Number(e.target.value)))}
            className="w-20 bg-white border border-slate-300 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-900 focus:outline-hidden"
          />
        </div>

        <button
          onClick={handleSavePlan}
          className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs flex items-center space-x-1"
        >
          <Save className="w-4 h-4" />
          <span>{savedSuccess ? 'Saved!' : 'Save Plan'}</span>
        </button>
      </div>

      {/* FERTILIZER TYPE TABS */}
      <div className="agri-card p-4 sm:p-6 space-y-6">
        <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-2xl">
          {(['Inorganic', 'Organic', 'Natural'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab} Farming Plan
            </button>
          ))}
        </div>

        {activeTab === 'Inorganic' ? (
          <div className="space-y-6">
            {/* RECOMMENDED QUANTITY TABLE */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  Recommended Quantity ({acres} Acres Total)
                </h3>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  Est. Cost: ₹{calc.totalEstCost.toLocaleString()}
                </span>
              </div>

              <div className="table-responsive rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-emerald-950 text-white text-[11px] font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Fertilizer Name</th>
                      <th className="p-3 text-right">Per Acre</th>
                      <th className="p-3 text-right">Total ({acres} Acres)</th>
                      <th className="p-3 text-right">Est. Bags (50kg)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-slate-50 font-medium">
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Urea (Nitrogen N)</td>
                      <td className="p-3 text-right font-bold text-emerald-700">{calc.ureaPerAcre} kg</td>
                      <td className="p-3 text-right font-black text-slate-900">{calc.totalUrea} kg</td>
                      <td className="p-3 text-right text-slate-700">{Math.ceil(calc.totalUrea / 50)} bags</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">DAP (Phosphorus P)</td>
                      <td className="p-3 text-right font-bold text-emerald-700">{calc.dapPerAcre} kg</td>
                      <td className="p-3 text-right font-black text-slate-900">{calc.totalDap} kg</td>
                      <td className="p-3 text-right text-slate-700">{Math.ceil(calc.totalDap / 50)} bags</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">MOP (Potassium K)</td>
                      <td className="p-3 text-right font-bold text-emerald-700">{calc.mopPerAcre} kg</td>
                      <td className="p-3 text-right font-black text-slate-900">{calc.totalMop} kg</td>
                      <td className="p-3 text-right text-slate-700">{Math.ceil(calc.totalMop / 50)} bags</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Zinc Sulfate (Zn Micronutrient)</td>
                      <td className="p-3 text-right font-bold text-emerald-700">{calc.znSulfatePerAcre} kg</td>
                      <td className="p-3 text-right font-black text-slate-900">{calc.znSulfatePerAcre * acres} kg</td>
                      <td className="p-3 text-right text-slate-700">1 pack</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* APPLICATION SCHEDULE */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Split Application Schedule
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase bg-emerald-200/60 px-2 py-0.5 rounded">
                    Basal (At Sowing)
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-sm pt-1">100% DAP + 100% MOP</h4>
                  <p className="text-xs text-slate-600">Apply all DAP ({calc.totalDap} kg) and MOP ({calc.totalMop} kg) into furrows during seedbed preparation.</p>
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase bg-emerald-200/60 px-2 py-0.5 rounded">
                    1st Top Dressing (Day 30)
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-sm pt-1">50% Urea ({Math.round(calc.totalUrea / 2)} kg)</h4>
                  <p className="text-xs text-slate-600">Apply first split dose of Urea at knee-high stage along with earthing-up weeding.</p>
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase bg-emerald-200/60 px-2 py-0.5 rounded">
                    2nd Top Dressing (Day 60)
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-sm pt-1">50% Urea ({Math.round(calc.totalUrea / 2)} kg)</h4>
                  <p className="text-xs text-slate-600">Apply remaining Urea split during tassel formation to maximize grain weight.</p>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'Organic' ? (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-emerald-950 text-sm">Farmyard Manure (FYM) & Vermicompost</h4>
                <span className="text-xs font-bold text-emerald-800">{calc.totalFym} Tonnes total</span>
              </div>
              <p className="text-xs text-slate-700 font-medium">Apply {calc.fymPerAcre} tonnes of well-decomposed FYM or Vermicompost per acre during basal plowing to boost organic carbon ({soilData.organicCarbon}%).</p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
              <h4 className="font-extrabold text-emerald-950 text-sm">Neem Cake Soil Conditioner ({100 * acres} kg total)</h4>
              <p className="text-xs text-slate-700 font-medium">Incorporate 100 kg Neem Cake per acre to slow down nitrogen leaching and control root grubs/nematodes.</p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
              <h4 className="font-extrabold text-emerald-950 text-sm">Bio-Fertilizers (Azotobacter & PSB)</h4>
              <p className="text-xs text-slate-700 font-medium">Mix 2 kg Azotobacter (nitrogen fixer) and 2 kg PSB (phosphorus solubilizer) with 100 kg FYM per acre.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
              <h4 className="font-extrabold text-amber-950 text-sm">Jeevamrut Liquid Preparation ({200 * acres} L total)</h4>
              <p className="text-xs text-slate-700 font-medium">Mix 10kg desi cow dung, 10L cow urine, 2kg pulse flour, 2kg jaggery, and 200L water. Ferment for 48 hours and apply every 15 days via irrigation.</p>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
              <h4 className="font-extrabold text-amber-950 text-sm">Beejamrut Seed Treatment</h4>
              <p className="text-xs text-slate-700 font-medium">Treat seeds before sowing with Beejamrut solution to enhance germination rate and protect against seedling rot.</p>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
              <h4 className="font-extrabold text-amber-950 text-sm">Neemastra Organic Bio-Pesticide</h4>
              <p className="text-xs text-slate-700 font-medium">Foliar spray of Neemastra (5% strength) every 20 days for natural pest protection without chemical residues.</p>
            </div>
          </div>
        )}

        {/* DISCLAIMER NOTE */}
        <p className="text-xs text-slate-500 italic border-t border-slate-100 pt-3">
          * Calculated based on Indian Council of Agricultural Research (ICAR) fertilizer dosage recommendations for {cropName}.
        </p>

        {/* NAVIGATION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => navigate('/crop-plan')}
            className="flex-1 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Go to Crop Cultivation Plan</span>
          </button>

          <button
            onClick={() => navigate('/irrigation')}
            className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <span>Next: Water & Irrigation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
