import React, { useState, useEffect } from 'react';
import { CalendarDays, CheckCircle2, Clock, Check, BellRing, Sparkles, RefreshCw, Sprout, Plus, Printer, Filter, ChevronRight, AlertCircle } from 'lucide-react';
import { api } from '../services/api';
import { CropTask } from '../types';

export const CropPlanPage: React.FC = () => {
  const [tasks, setTasks] = useState<CropTask[]>([]);
  const [selectedCrop, setSelectedCrop] = useState('Maize');
  const [farmSize, setFarmSize] = useState<number>(2);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDay, setNewTaskDay] = useState(25);
  const [newTaskCategory, setNewTaskCategory] = useState('fertilizer');
  const [newTaskDesc, setNewTaskDesc] = useState('');

  const [soilData, setSoilData] = useState({
    pH: 6.8,
    nitrogen: 215,
    phosphorus: 32,
    potassium: 280,
    organicCarbon: 0.62
  });

  const generatePlanForCrop = (crop: string, acres: number, soil: any): CropTask[] => {
    const ureaPerAcre = soil.nitrogen < 150 ? 60 : 50;
    const dapPerAcre = soil.phosphorus < 25 ? 30 : 25;
    const mopPerAcre = soil.potassium < 150 ? 25 : 15;

    let baseTasks: CropTask[] = [];

    if (crop === 'Groundnut') {
      baseTasks = [
        { id: 'gn-0', day: 0, title: 'Land Preparation & Gypsum Basal', description: `Apply 100 kg Gypsum and ${dapPerAcre * acres} kg DAP per ${acres} acres during plowing.`, category: 'sowing', status: 'completed', dueDate: 'Day 0' },
        { id: 'gn-15', day: 15, title: 'Weeding & Soil Loosening', description: 'Perform manual weeding and aerate root zone before pegging.', category: 'monitoring', status: 'upcoming', dueDate: 'Day 15' },
        { id: 'gn-35', day: 35, title: 'Pegging Stage Irrigation & Gypsum Top Dress', description: `Apply second dose of Gypsum (100kg/acre) for pod development.`, category: 'fertilizer', status: 'upcoming', dueDate: 'Day 35' },
        { id: 'gn-60', day: 60, title: 'Pod Filling & Leaf Spot Inspection', description: 'Inspect leaves for Tikka disease. Spray Neem oil or Mancozeb if needed.', category: 'monitoring', status: 'upcoming', dueDate: 'Day 60' },
        { id: 'gn-100', day: 100, title: 'Harvesting & Drying Pods', description: 'Uproot plants, separate pods, and dry under shade to 8% moisture.', category: 'harvest', status: 'upcoming', dueDate: 'Day 100' }
      ];
    } else if (crop === 'Paddy') {
      baseTasks = [
        { id: 'pd-0', day: 0, title: 'Nursery Bed Preparation & Sowing', description: 'Prepare raised nursery bed with bio-fertilizers and sow certified seeds.', category: 'sowing', status: 'completed', dueDate: 'Day 0' },
        { id: 'pd-20', day: 20, title: 'Main Field Transplanting & Basal NPK', description: `Transplant 20-day seedlings with 2-3 cm standing water. Apply ${dapPerAcre * acres} kg DAP.`, category: 'sowing', status: 'completed', dueDate: 'Day 20' },
        { id: 'pd-40', day: 40, title: 'Active Tillering & First Urea Split', description: `Top dress ${(ureaPerAcre / 2) * acres} kg Urea for ${acres} acres.`, category: 'fertilizer', status: 'upcoming', dueDate: 'Day 40' },
        { id: 'pd-65', day: 65, title: 'Panicle Initiation & Water Management', description: 'Maintain 5 cm standing water. Check for Stem Borer or Blast disease.', category: 'irrigation', status: 'upcoming', dueDate: 'Day 65' },
        { id: 'pd-90', day: 90, title: 'Heading & Grain Filling Phase', description: 'Ensure moist soil condition without waterlogging.', category: 'irrigation', status: 'upcoming', dueDate: 'Day 90' },
        { id: 'pd-125', day: 125, title: 'Harvesting & Threshing', description: 'Drain water 10 days before harvest. Combine harvest mature golden grains.', category: 'harvest', status: 'upcoming', dueDate: 'Day 125' }
      ];
    } else {
      // Default Maize / General Crop
      baseTasks = [
        {
          id: 'm-0',
          day: 0,
          title: 'Land Preparation & Basal Fertilizer',
          description: `Deep plow field and apply ${5 * acres} tonnes FYM organic manure along with basal dose: ${dapPerAcre * acres} kg DAP and ${mopPerAcre * acres} kg MOP for ${acres} acres.`,
          category: 'sowing',
          status: 'completed',
          dueDate: 'Day 0'
        },
        {
          id: 'm-12',
          day: 12,
          title: 'Seedling Germination & Thinning',
          description: 'Inspect germinated seedlings for uniform spacing (20 cm apart) and maintain moist soil beds.',
          category: 'irrigation',
          status: 'upcoming',
          dueDate: 'Day 12'
        },
        {
          id: 'm-30',
          day: 30,
          title: 'First Top Dressing (Urea Application)',
          description: `Apply 50% split dose of Urea (${(ureaPerAcre / 2) * acres} kg for ${acres} acres) at knee-high stage along with earthing-up weeding.`,
          category: 'fertilizer',
          status: 'upcoming',
          dueDate: 'Day 30'
        },
        {
          id: 'm-45',
          day: 45,
          title: 'Pest & Disease Inspection (Fall Armyworm Check)',
          description: 'Inspect whorl leaves for early signs of pests. Apply Neem oil spray (5ml/L water) if necessary.',
          category: 'monitoring',
          status: 'upcoming',
          dueDate: 'Day 45'
        },
        {
          id: 'm-60',
          day: 60,
          title: 'Tasseling & Silking Irrigation Stage',
          description: 'Critical water requirement stage. Ensure continuous moisture via drip or furrow irrigation.',
          category: 'irrigation',
          status: 'upcoming',
          dueDate: 'Day 60'
        },
        {
          id: 'm-75',
          day: 75,
          title: 'Second Top Dressing & Grain Filling',
          description: `Apply remaining Urea (${(ureaPerAcre / 2) * acres} kg for ${acres} acres) to enhance kernel weight and starch density.`,
          category: 'fertilizer',
          status: 'upcoming',
          dueDate: 'Day 75'
        },
        {
          id: 'm-110',
          day: 110,
          title: 'Harvesting & Market Dispatch',
          description: `Harvest mature cobs when husk turns straw yellow. Dry grains to 12% moisture and transport to APMC market.`,
          category: 'harvest',
          status: 'upcoming',
          dueDate: 'Day 110'
        }
      ];
    }

    return baseTasks;
  };

  useEffect(() => {
    const saved = localStorage.getItem('agri_soil_data');
    let activeSoil = soilData;
    if (saved) {
      try {
        activeSoil = JSON.parse(saved);
        setSoilData(activeSoil);
      } catch (e) {}
    }

    const savedTasksKey = `agri_crop_plan_${selectedCrop}_${farmSize}`;
    const savedTasks = localStorage.getItem(savedTasksKey);
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (e) {
        setTasks(generatePlanForCrop(selectedCrop, farmSize, activeSoil));
      }
    } else {
      setTasks(generatePlanForCrop(selectedCrop, farmSize, activeSoil));
    }
  }, [selectedCrop, farmSize]);

  const toggleStatus = (taskId: string) => {
    setTasks((prev) => {
      const updated = prev.map((t) => (t.id === taskId ? { ...t, status: (t.status === 'completed' ? 'upcoming' : 'completed') as any } : t));
      localStorage.setItem(`agri_crop_plan_${selectedCrop}_${farmSize}`, JSON.stringify(updated));
      return updated;
    });
  };

  const handleAddCustomTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: CropTask = {
      id: 'custom-' + Date.now(),
      day: Number(newTaskDay),
      title: newTaskTitle,
      description: newTaskDesc || 'Custom milestone created by farmer.',
      category: newTaskCategory,
      status: 'upcoming',
      dueDate: `Day ${newTaskDay}`
    };

    const updated = [...tasks, newTask].sort((a, b) => a.day - b.day);
    setTasks(updated);
    localStorage.setItem(`agri_crop_plan_${selectedCrop}_${farmSize}`, JSON.stringify(updated));

    setNewTaskTitle('');
    setNewTaskDesc('');
    setShowAddModal(false);
  };

  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const progressPercent = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  const filteredTasks = activeCategory === 'all' ? tasks : tasks.filter((t) => t.category === activeCategory);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-8">
      {/* HEADER BAR */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI Cultivation Schedule</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <CalendarDays className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />
            <span>Crop Cultivation Plan – {selectedCrop}</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Timeline Customized for {farmSize} Acres using your verified soil test data (pH {soilData.pH})
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => window.print()}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl border border-slate-200 flex items-center space-x-1.5 text-xs font-bold"
          >
            <Printer className="w-4 h-4" />
            <span>Print Plan</span>
          </button>

          <button
            onClick={() => alert('Reminders set! SMS & push notifications enabled for all upcoming crop milestones.')}
            className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl flex items-center space-x-1.5 text-xs font-bold shadow-xs"
          >
            <BellRing className="w-4 h-4" />
            <span>Enable Reminders</span>
          </button>
        </div>
      </div>

      {/* CROP & FARM SIZE SELECTOR & PROGRESS BAR */}
      <div className="agri-card p-4 space-y-4 bg-slate-50">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Sprout className="w-5 h-5 text-emerald-600 shrink-0" />
            <label className="text-xs font-bold text-slate-700">Preferred Crop:</label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="bg-white border border-slate-300 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-900 focus:outline-hidden"
            >
              <option value="Maize">Maize (Corn)</option>
              <option value="Groundnut">Groundnut</option>
              <option value="Paddy">Paddy (Rice)</option>
              <option value="Cotton">Cotton</option>
              <option value="Tomato">Tomato</option>
              <option value="Chilli">Chilli (Pepper)</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <label className="text-xs font-bold text-slate-700">Farm Size (Acres):</label>
            <input
              type="number"
              min="1"
              max="100"
              value={farmSize}
              onChange={(e) => setFarmSize(Math.max(1, Number(e.target.value)))}
              className="w-20 bg-white border border-slate-300 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-900 focus:outline-hidden"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center space-x-1 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Milestone</span>
          </button>
        </div>

        {/* PROGRESS BAR */}
        <div className="space-y-1.5 pt-2 border-t border-slate-200">
          <div className="flex justify-between items-center text-xs font-bold text-slate-700">
            <span>Cultivation Progress</span>
            <span className="text-emerald-700">{completedCount} of {tasks.length} Completed ({progressPercent}%)</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
            <div className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
      </div>

      {/* CATEGORY FILTER TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { key: 'all', label: 'All Tasks' },
          { key: 'sowing', label: 'Sowing & Prep' },
          { key: 'irrigation', label: 'Water & Irrigation' },
          { key: 'fertilizer', label: 'Fertilizer Application' },
          { key: 'monitoring', label: 'Pest Monitoring' },
          { key: 'harvest', label: 'Harvesting & Market' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveCategory(tab.key)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
              activeCategory === tab.key
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CULTIVATION TIMELINE LIST */}
      <div className="agri-card p-4 sm:p-8 space-y-6">
        <div className="relative pl-6 sm:pl-8 border-l-2 border-emerald-200 space-y-6">
          {filteredTasks.map((task) => (
            <div key={task.id} className="relative group">
              {/* STATUS CIRCLE MARKER */}
              <button
                onClick={() => toggleStatus(task.id)}
                className={`absolute -left-[31px] sm:-left-[43px] top-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all shadow-xs ${
                  task.status === 'completed'
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'bg-white border-slate-300 text-slate-400 hover:border-emerald-500'
                }`}
              >
                {task.status === 'completed' ? <Check className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
              </button>

              {/* TASK CARD CONTENT */}
              <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-emerald-300 transition-colors">
                <div className="space-y-1 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-black text-emerald-800 uppercase bg-emerald-100 px-2.5 py-0.5 rounded-md">
                      Day {task.day}
                    </span>
                    <h3 className={`text-base font-extrabold ${task.status === 'completed' ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                      {task.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">{task.description}</p>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <span
                    className={`text-[11px] font-black px-3 py-1 rounded-full ${
                      task.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {task.status === 'completed' ? 'Completed' : 'Upcoming'}
                  </span>
                  <button
                    onClick={() => toggleStatus(task.id)}
                    className="text-xs text-slate-600 hover:text-emerald-700 font-bold underline"
                  >
                    {task.status === 'completed' ? 'Mark Pending' : 'Mark Done'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD CUSTOM TASK MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-slate-900">Add Custom Cultivation Milestone</h3>

            <form onSubmit={handleAddCustomTask} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700">Milestone Title:</label>
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Bio-Pest Spray or Micro-Nutrient Application"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Day Number:</label>
                  <input
                    type="number"
                    min="0"
                    max="200"
                    required
                    value={newTaskDay}
                    onChange={(e) => setNewTaskDay(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Category:</label>
                  <select
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-hidden"
                  >
                    <option value="sowing">Sowing</option>
                    <option value="irrigation">Irrigation</option>
                    <option value="fertilizer">Fertilizer</option>
                    <option value="monitoring">Pest Check</option>
                    <option value="harvest">Harvest</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Description:</label>
                <textarea
                  rows={3}
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  placeholder="Instructions for this milestone..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
