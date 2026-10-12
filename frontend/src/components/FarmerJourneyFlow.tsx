import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TestTube2, Sparkles, Sprout, FlaskConical, Droplets, TrendingUp, Store, ChevronRight } from 'lucide-react';

interface FarmerJourneyFlowProps {
  user?: any;
}

export const FarmerJourneyFlow: React.FC<FarmerJourneyFlowProps> = ({ user }) => {
  const navigate = useNavigate();

  const steps = [
    { num: '1', label: 'Soil Test', hint: 'మట్టి పరిశీలన', path: '/soil-labs', icon: TestTube2, bg: 'bg-emerald-600 text-white' },
    { num: '2', label: 'AI Reader', hint: 'AI విశ్లేషణ', path: '/soil-report', icon: Sparkles, bg: 'bg-teal-600 text-white' },
    { num: '3', label: 'Best Crop', hint: 'పంట ఎంపిక', path: '/crop-recommendations', icon: Sprout, bg: 'bg-emerald-700 text-white' },
    { num: '4', label: 'Fertilizer', hint: 'ఎరువుల మోతాదు', path: '/fertilizer-plan', icon: FlaskConical, bg: 'bg-lime-700 text-white' },
    { num: '5', label: 'Irrigation', hint: 'నీటి యాజమాన్యం', path: '/irrigation', icon: Droplets, bg: 'bg-sky-600 text-white' },
    { num: '6', label: 'Profit Risk', hint: 'ఆదాయ అంచనా', path: '/profit-analysis', icon: TrendingUp, bg: 'bg-amber-600 text-white' },
    { num: '7', label: 'Mandi Sale', hint: 'మార్కెట్ విక్రయం', path: '/markets', icon: Store, bg: 'bg-purple-600 text-white' }
  ];

  const handleClick = (path: string) => {
    if (!user) {
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  return (
    <div className="w-full py-2 overflow-x-auto no-scrollbar">
      <div className="flex items-center min-w-max space-x-2 sm:space-x-3 px-1 py-1">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={step.label}>
              <button
                type="button"
                onClick={() => handleClick(step.path)}
                className="flex items-center space-x-2.5 bg-white/90 hover:bg-white px-3 sm:px-4 py-2 rounded-2xl border border-emerald-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer text-left"
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 shadow-xs ${step.bg}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-black text-slate-900 leading-tight">{step.label}</span>
                  <span className="text-[10px] text-emerald-700 font-extrabold leading-none mt-0.5">{step.hint}</span>
                </div>
              </button>
              {idx < steps.length - 1 && (
                <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0 opacity-70" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};


