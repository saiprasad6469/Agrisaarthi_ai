import React from 'react';
import { History, TestTube2, Sprout, FlaskConical, TrendingUp, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HistoryPage: React.FC = () => {
  const historyItems = [
    {
      id: 'h-1',
      title: 'Soil Health Report Uploaded',
      date: 'Yesterday, 4:30 PM',
      details: 'Extracted pH: 6.8, Nitrogen: 45 (Low), Potassium: 120 (Good)',
      link: '/soil-analysis',
      icon: TestTube2,
      color: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'h-2',
      title: 'AI Crop Recommendation Generated',
      date: '2 days ago',
      details: 'Top choice: Tomato (92% suitability), Estimated profit: ₹63,000/acre',
      link: '/crop-recommendations',
      icon: Sprout,
      color: 'bg-teal-100 text-teal-800'
    },
    {
      id: 'h-3',
      title: 'Fertilizer Plan Created for Tomato',
      date: '3 days ago',
      details: 'Recommended Urea (25kg/acre), DAP (15kg/acre), MOP (10kg/acre)',
      link: '/fertilizer-plan',
      icon: FlaskConical,
      color: 'bg-lime-100 text-lime-800'
    },
    {
      id: 'h-4',
      title: 'Profit & Expense Calculation Performed',
      date: '5 days ago',
      details: 'Total expenses: ₹32,000/acre, Expected Revenue: ₹95,000/acre',
      link: '/profit-analysis',
      icon: TrendingUp,
      color: 'bg-amber-100 text-amber-800'
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-8">
      <div className="bg-white p-6 rounded-3xl border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
          <History className="w-7 h-7 text-emerald-600" />
          <span>Farmer Activity History</span>
        </h1>
        <p className="text-xs text-slate-500">Track your past soil tests, crop recommendations, and financial estimations</p>
      </div>

      <div className="agri-card divide-y divide-slate-100">
        {historyItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={item.link}
              className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 font-medium">{item.details}</p>
                  <span className="text-[10px] text-slate-400 font-semibold">{item.date}</span>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-slate-400" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
