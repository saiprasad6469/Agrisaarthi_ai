import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Sun, Upload, TestTube2, Sprout, FlaskConical, Droplets, TrendingUp, CalendarDays, ArrowRight, CheckCircle2, Sparkles, Store, Users, Mic } from 'lucide-react';
import { FarmerJourneyFlow } from '../components/FarmerJourneyFlow';
import { AgriSaarthiHeroFooter } from '../components/AgriSaarthiHeroFooter';

interface FarmerDashboardProps {
  user: any;
}

export const FarmerDashboardPage: React.FC<FarmerDashboardProps> = ({ user }) => {
  const navigate = useNavigate();

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

  const quickPictorialActions = [
    {
      title: 'Soil Labs',
      sub: 'ల్యాబ్ లొకేషన్',
      desc: 'Find Testing Labs',
      icon: TestTube2,
      path: '/soil-labs',
      img: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=400&q=80',
      badgeBg: 'bg-emerald-600'
    },
    {
      title: 'Upload Report',
      sub: 'స్కాన్ రిపోర్ట్',
      desc: 'AI Photo/PDF Extraction',
      icon: Upload,
      path: '/soil-report',
      img: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=400&q=80',
      badgeBg: 'bg-sky-600'
    },
    {
      title: 'Best Crop',
      sub: 'పంట ఎంపిక',
      desc: 'AI Recommendation',
      icon: Sprout,
      path: '/crop-recommendations',
      img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=400&q=80',
      badgeBg: 'bg-teal-600'
    },
    {
      title: 'Fertilizer Plan',
      sub: 'ఎరువుల మోతాదు',
      desc: 'NPK Dosage Calculator',
      icon: FlaskConical,
      path: '/fertilizer-plan',
      img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=400&q=80',
      badgeBg: 'bg-lime-600'
    },
    {
      title: 'Profit & Risk',
      sub: 'ఆదాయము',
      desc: 'Calculate Yield Income',
      icon: TrendingUp,
      path: '/profit-analysis',
      img: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=400&q=80',
      badgeBg: 'bg-amber-600'
    },
    {
      title: 'Mandi Prices',
      sub: 'మార్కెట్ ధరలు',
      desc: 'Live Daily Rates',
      icon: Store,
      path: '/markets',
      img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
      badgeBg: 'bg-purple-600'
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto pb-10 w-full overflow-x-hidden">
      {/* HEADER BANNER WITH FARMER AVATAR & WEATHER */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-950 to-slate-900 p-5 sm:p-8 rounded-3xl text-white shadow-xl border border-emerald-800 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500 border-4 border-emerald-300 flex items-center justify-center font-black text-slate-950 text-2xl shadow-md shrink-0">
              {user?.name ? user.name.charAt(0) : 'R'}
            </div>
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-800 text-amber-300 text-xs font-black mb-1 border border-emerald-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AgriSaarthi AI Farmer Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Namaste {user?.name || 'Ramesh'}! 🌾
              </h1>
              <p className="text-xs sm:text-sm text-emerald-200 font-semibold">
                మీ పొలం వివరాలు మరియు మట్టి ఆరోగ్యం ఇక్కడ పరిశీలించండి.
              </p>
            </div>
          </div>

          {/* LOCATION & MY FARM WIDGET CARDS */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-emerald-900/80 border border-emerald-700/80 px-4 py-2.5 rounded-2xl flex items-center space-x-3 backdrop-blur-md">
              <Sun className="w-6 h-6 text-amber-400 animate-spin" />
              <div>
                <p className="text-xs font-bold text-emerald-300">Hyderabad Farm</p>
                <p className="text-xs font-black text-white">32°C <span className="font-normal text-emerald-200">Partly Sunny</span></p>
              </div>
            </div>

            <div className="bg-amber-400 text-slate-950 px-4 py-2.5 rounded-2xl shadow-md font-black">
              <p className="text-[10px] uppercase tracking-wider text-slate-900">Active Crop</p>
              <p className="text-sm">🌽 2 Acres Maize</p>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-emerald-800/80">
          <FarmerJourneyFlow />
        </div>
      </div>

      {/* 6 PICTORIAL QUICK ACTION TILES */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center space-x-2">
            <span>🖼️ Pictorial Farmer Services</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              (చిత్రాల ద్వారా సేవలు)
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {quickPictorialActions.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                to={item.path}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group flex flex-col justify-between"
              >
                <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  <div className={`absolute top-2 left-2 w-7 h-7 rounded-lg ${item.badgeBg} text-white flex items-center justify-center shadow-md`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="absolute bottom-1.5 left-2 right-2">
                    <span className="text-[10px] font-black text-amber-300 bg-slate-950/70 backdrop-blur-xs px-2 py-0.5 rounded-md truncate block">
                      {item.sub}
                    </span>
                  </div>
                </div>

                <div className="p-3 text-left">
                  <h3 className="font-extrabold text-slate-900 text-sm leading-snug group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">{item.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ACTIVE SOIL REPORT OVERVIEW */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border-l-8 border-l-emerald-600 border border-slate-200 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <h3 className="text-lg font-black text-slate-900">Active Soil Health Report Overview</h3>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-700">
            <span className="bg-emerald-50 text-emerald-800 px-3 py-1 rounded-xl border border-emerald-200">
              🧪 pH: <strong>{soilData.pH} (Optimal)</strong>
            </span>
            <span className="bg-emerald-50 text-emerald-800 px-3 py-1 rounded-xl border border-emerald-200">
              🌱 Nitrogen: <strong>{soilData.nitrogen} kg/ha</strong>
            </span>
            <span className="bg-emerald-50 text-emerald-800 px-3 py-1 rounded-xl border border-emerald-200">
              🧪 Carbon: <strong>{soilData.organicCarbon}%</strong>
            </span>
          </div>
        </div>

        <Link
          to="/soil-analysis"
          className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md shrink-0 flex items-center justify-center space-x-2 transition-all hover:scale-105"
        >
          <span>View Full AI Analysis</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* HERO FOOTER BANNER */}
      <AgriSaarthiHeroFooter />
    </div>
  );
};

