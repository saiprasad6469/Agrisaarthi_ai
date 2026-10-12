import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  TestTube2,
  FileCheck2,
  Sprout,
  FlaskConical,
  TrendingUp,
  Store,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Sparkles,
  Mic,
  Droplets,
  PhoneCall,
  UserCheck,
  Award,
  ChevronRight,
  LogIn
} from 'lucide-react';
import { FarmerJourneyFlow } from '../components/FarmerJourneyFlow';

interface LandingPageProps {
  user?: any;
}

export const LandingPage: React.FC<LandingPageProps> = ({ user }) => {
  const navigate = useNavigate();

  // Redirect to login if user is not authenticated; otherwise open the feature page
  const handleFeatureClick = (path: string) => {
    if (!user) {
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  // Pictorial feature cards with high quality agricultural images
  const pictorialFeatures = [
    {
      id: 'soil-lab',
      title: 'Soil Testing Lab Finder',
      subtext: 'సమీప సాయిల్ టెస్టింగ్ ల్యాబ్స్ | निकटतम मृदा प्रयोगशाला',
      desc: 'Locate certified government & private soil testing laboratories near your farm instantly with phone numbers and map directions.',
      image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=800&q=80',
      icon: TestTube2,
      badge: 'Step 1: Test Soil',
      badgeColor: 'bg-emerald-600 text-white',
      link: '/soil-labs'
    },
    {
      id: 'soil-report',
      title: 'Soil Report AI Reader',
      subtext: 'మట్టి నివేదిక స్కాన్ చేయండి | मृदा रिपोर्ट स्कैन करें',
      desc: 'Take a photo or upload PDF of your soil card. AgriSaarthi AI automatically reads NPK, pH, and Carbon levels in seconds.',
      image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80',
      icon: FileCheck2,
      badge: 'Step 2: AI Report',
      badgeColor: 'bg-sky-600 text-white',
      link: '/soil-report'
    },
    {
      id: 'crop-recommendation',
      title: 'Smart Crop Selection',
      subtext: 'అనువైన పంటల ఎంపిక | सही फसल का चयन',
      desc: 'Get AI recommendations for Paddy, Maize, Cotton, Wheat, or Sugarcane based on your exact soil type, water availability, and season.',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
      icon: Sprout,
      badge: 'Step 3: Choose Crop',
      badgeColor: 'bg-teal-600 text-white',
      link: '/crop-recommendations'
    },
    {
      id: 'fertilizer-plan',
      title: 'NPK Fertilizer Calculator',
      subtext: 'ఎరువుల సరియైన మోతాదు | सही उर्वरक योजना',
      desc: 'Calculate exact bags of Urea, DAP, and Potash needed for your farm size to avoid overspending and maximize soil health.',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80',
      icon: FlaskConical,
      badge: 'Step 4: Fertilizer',
      badgeColor: 'bg-lime-600 text-white',
      link: '/fertilizer-plan'
    },
    {
      id: 'profit-analysis',
      title: 'Profit & Cost Estimator',
      subtext: 'లాభ నష్టాల లెక్కింపు | आय और लाभ का आकलन',
      desc: 'Forecast seed, labor, and water costs against expected yield revenue to guarantee maximum profit per acre.',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80',
      icon: TrendingUp,
      badge: 'Step 5: Income Plan',
      badgeColor: 'bg-amber-600 text-white',
      link: '/profit-analysis'
    },
    {
      id: 'market-prices',
      title: 'Live Mandi Market Prices',
      subtext: 'పంటల లైవ్ మార్కెట్ ధరలు | ताजा मंडी भाव',
      desc: 'Check live daily crop prices across local mandis and directly connect with verified buyers to sell your harvest at high rates.',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
      icon: Store,
      badge: 'Step 6: Mandi Sale',
      badgeColor: 'bg-purple-600 text-white',
      link: '/markets'
    }
  ];

  // Pictorial 9-Step Journey
  const pictorialSteps = [
    { num: '1', title: 'Register Farm', desc: 'Add farm location & acreage', icon: MapPin, path: '/farm', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80' },
    { num: '2', title: 'Find Soil Lab', desc: 'Locate nearest soil center', icon: TestTube2, path: '/soil-labs', img: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=400&q=80' },
    { num: '3', title: 'Upload Report', desc: 'Scan soil card photo or PDF', icon: FileCheck2, path: '/soil-report', img: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=400&q=80' },
    { num: '4', title: 'AI Soil Analysis', desc: 'Instant NPK & pH breakdown', icon: Sparkles, path: '/soil-analysis', img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=400&q=80' },
    { num: '5', title: 'Best Crop Choice', desc: 'AI ranks top suitable crops', icon: Sprout, path: '/crop-recommendations', img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=400&q=80' },
    { num: '6', title: 'Fertilizer Dosing', desc: 'Get exact bag quantities', icon: FlaskConical, path: '/fertilizer-plan', img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=400&q=80' },
    { num: '7', title: 'Irrigation & Tasks', desc: 'Watering & spray schedules', icon: Droplets, path: '/irrigation', img: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=400&q=80' },
    { num: '8', title: 'Profit Estimate', desc: 'Calculate income & risk', icon: TrendingUp, path: '/profit-analysis', img: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=400&q=80' },
    { num: '9', title: 'Sell at Mandi', desc: 'Find buyers & high prices', icon: Store, path: '/markets', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80' }
  ];

  // Farmer Stories
  const farmerStories = [
    {
      name: 'Ramesh Patel',
      location: 'Telangana (2.5 Acres)',
      crop: 'Maize & Cotton',
      result: '+35% Profit Increase',
      quote: 'AgriSaarthi AI helped me test my soil and showed me the exact amount of Urea needed. I saved ₹8,000 on fertilizers!',
      img: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Sunita Deshmukh',
      location: 'Maharashtra (3 Acres)',
      crop: 'Soybean & Turmeric',
      result: 'Direct Mandi Buyer Found',
      quote: 'The voice assistant in Marathi is wonderful! I just speak into my phone and get real-time mandi prices near Pune.',
      img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-20 pb-12 w-full overflow-x-hidden">
      {/* 1. HERO SECTION WITH PICTORIAL CALLOUTS */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-950 to-slate-950 text-white pt-8 pb-14 sm:pt-16 sm:pb-24 border-b border-emerald-800 shadow-xl">
        {/* Background graphic elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Pictorial Badge Header */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-emerald-200 text-xs sm:text-sm font-black shadow-md backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                <span>🌾 AI Digital Farming Companion for Indian Farmers</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
                Smart Farming Starts With Your <span className="text-emerald-400 underline decoration-amber-400 decoration-wavy">Soil.</span>
              </h1>

              {/* Vernacular & Simple Subtitle */}
              <div className="space-y-2 bg-emerald-900/40 backdrop-blur-xs p-4 rounded-2xl border border-emerald-700/40">
                <p className="text-base sm:text-lg text-emerald-100 font-semibold leading-relaxed">
                  మీ మట్టి గురించి తెలుసుకోండి • సరైన పంట ఎంచుకోండి • మోతాదు ఎరువులు వాడండి • ఎక్కువ లాభం పొందండి.
                </p>
                <p className="text-xs sm:text-sm text-emerald-300 font-medium">
                  Understand Soil → Choose Crop → Plan Fertilizer → Estimate Profit → Find Mandi Prices.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2">
                <button
                  type="button"
                  onClick={() => handleFeatureClick('/dashboard')}
                  className="inline-flex items-center justify-center px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-base sm:text-lg shadow-lg shadow-emerald-900/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  <span>{user ? '🌾 Open Farmer Dashboard' : '🚀 Login to Start'}</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>

                <a
                  href="#features"
                  className="inline-flex items-center justify-center px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-base sm:text-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95"
                >
                  <span>🖼️ Explore Pictorial Features</span>
                </a>
              </div>

              {/* Interactive Journey Flow Bar */}
              <div className="pt-4 border-t border-emerald-800/60">
                <p className="text-xs font-black uppercase tracking-wider text-emerald-300 mb-2">
                  🗺️ 7-Step Farmer Roadmap:
                </p>
                <FarmerJourneyFlow user={user} />
              </div>
            </div>

            {/* Right Pictorial Hero Banner Card */}
            <div className="lg:col-span-5">
              <div
                onClick={() => handleFeatureClick('/soil-analysis')}
                className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden border-4 border-emerald-500/30 shadow-2xl bg-slate-900 group cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1000&q=80"
                  alt="Indian farmer using AgriSaarthi AI app on mobile"
                  className="w-full h-[320px] sm:h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-5 text-white">
                  <div className="bg-emerald-950/90 backdrop-blur-md rounded-2xl p-4 border border-emerald-700/60 space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-slate-950" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-emerald-300 uppercase">Pictorial AI Soil Analysis</p>
                        <p className="text-sm font-extrabold text-white">Maize Field • 2.5 Acres • Nitrogen Rich</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-emerald-800 text-xs font-bold">
                      <div className="bg-emerald-900/50 p-2 rounded-xl border border-emerald-700/50">
                        <p className="text-[10px] text-emerald-300">Soil pH</p>
                        <p className="text-sm font-black text-amber-400">6.8 Good</p>
                      </div>
                      <div className="bg-emerald-900/50 p-2 rounded-xl border border-emerald-700/50">
                        <p className="text-[10px] text-emerald-300">Top Crop</p>
                        <p className="text-sm font-black text-emerald-400">Maize 96%</p>
                      </div>
                      <div className="bg-emerald-900/50 p-2 rounded-xl border border-emerald-700/50">
                        <p className="text-[10px] text-emerald-300">Est. Profit</p>
                        <p className="text-sm font-black text-white">₹72,000</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PICTORIAL HEADING SECTION: FARMER SERVICES & FEATURES */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* SECTION BANNER */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-700">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
              <Sprout className="w-10 h-10 sm:w-12 sm:h-12 text-amber-300" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black mb-1">
                <span>🖼️ PICTORIAL FARMER GUIDE</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                Everything You Need in Clear Pictures & Icons
              </h2>
              <p className="text-xs sm:text-base text-emerald-200 font-medium">
                రైతుల కోసం సులువైన చిత్రాలు మరియు ప్రతి అంశానికి స్పష్టమైన మార్గదర్శకత్వం.
              </p>
            </div>
          </div>

          <div className="bg-emerald-950/80 px-4 py-3 rounded-2xl border border-emerald-700 shrink-0 text-center sm:text-right">
            <p className="text-xs font-black text-amber-400">🗣️ Multilingual Voice Assistant</p>
            <p className="text-xs text-emerald-200">Tap mic anywhere to speak in your language!</p>
          </div>
        </div>

        {/* 6 PICTORIAL FEATURE CARDS WITH PICTURE BANNERS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pictorialFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={() => handleFeatureClick(feat.link)}
                className="bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col justify-between cursor-pointer hover:border-emerald-400"
              >
                {/* Visual Image Header Banner */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={feat.image}
                    alt={feat.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                  {/* Visual Step Badge Overlay */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-black shadow-md ${feat.badgeColor}`}>
                      {feat.badge}
                    </span>
                  </div>

                  {/* Icon Circle */}
                  <div className="absolute bottom-3 right-3 w-12 h-12 rounded-2xl bg-white text-emerald-800 flex items-center justify-center shadow-lg border border-slate-100">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-black text-slate-950 group-hover:text-emerald-700 transition-colors flex items-center">
                      <span>{feat.title}</span>
                    </h3>
                    <p className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg inline-block">
                      {feat.subtext}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium pt-1">
                      {feat.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeatureClick(feat.link);
                      }}
                      className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white font-black text-xs transition-all group/btn cursor-pointer"
                    >
                      <span>{user ? `Open ${feat.title}` : `Login to View ${feat.title}`}</span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. PICTORIAL 9-STEP FARMING JOURNEY */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
            <TestTube2 className="w-4 h-4 text-emerald-600" />
            <span>SIMPLE 9-STEP FARMER WORKFLOW</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            How AgriSaarthi AI Works: From Soil to Sale 🌾
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Follow these 9 visual steps to increase your yield and profit season after season. Click any step to get started.
          </p>
        </div>

        {/* 9 RESPONSIVE PICTORIAL STEP CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {pictorialSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                onClick={() => handleFeatureClick(step.path)}
                className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex items-start space-x-4 cursor-pointer hover:border-emerald-400 group"
              >
                {/* Step Thumbnail Image */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200 group-hover:scale-105 transition-transform">
                  <img src={step.img} alt={step.title} className="w-full h-full object-cover" />
                  <div className="absolute top-1 left-1 w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-md">
                    {step.num}
                  </div>
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center space-x-1.5">
                    <Icon className="w-4 h-4 text-emerald-600" />
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base group-hover:text-emerald-700 transition-colors">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-normal">{step.desc}</p>
                  <p className="text-[10px] text-emerald-700 font-bold pt-1">
                    {user ? 'View step →' : 'Login to view →'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. MULTILINGUAL VOICE ASSISTANT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-teal-700 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black">
              <Mic className="w-4 h-4 text-slate-950 animate-bounce" />
              <span>VOICE AI ASSISTANT FOR FARMERS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black">
              Don't Want to Type? Speak to AgriSaarthi AI in Your Language! 🗣️
            </h2>
            <p className="text-sm sm:text-base text-emerald-100 font-medium leading-relaxed max-w-2xl">
              Ask questions about your crops, weather, soil reports, or mandi prices by voice in **English, Telugu, Hindi, Marathi, Tamil, or Kannada**.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {['తెలుగు (Telugu)', 'हिंदी (Hindi)', 'మరాఠీ (Marathi)', 'தமிழ் (Tamil)', 'ಕನ್ನಡ (Kannada)', 'English'].map((lang) => (
                <span key={lang} className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-bold text-emerald-200">
                  🎙️ {lang}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center space-y-4 max-w-xs w-full">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-emerald-400 mx-auto flex items-center justify-center shadow-lg animate-pulse">
                <Mic className="w-10 h-10 text-slate-950" />
              </div>
              <div>
                <p className="text-sm font-black text-white">Tap Microphone</p>
                <p className="text-xs text-emerald-200 font-medium">Available on all screens</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. REAL FARMER TESTIMONIALS & RESULTS */}
      <section id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>FARMER SUCCESS STORIES</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900">Loved by Farmers Across India 🇮🇳</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {farmerStories.map((story, i) => (
            <div key={i} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-4 relative">
              <div className="flex items-center space-x-4">
                <img src={story.img} alt={story.name} className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500 shadow-sm" />
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">{story.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{story.location} • {story.crop}</p>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black">
                    {story.result}
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-700 italic font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                "{story.quote}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. BOTTOM CTA REGISTRATION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-600 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl">
          <h2 className="text-3xl sm:text-5xl font-black">Ready to Upgrade Your Farm with AI?</h2>
          <p className="text-base sm:text-lg text-emerald-100 max-w-xl mx-auto font-medium">
            Join thousands of smart farmers using AgriSaarthi AI today for soil testing, crop selection, fertilizer planning, and direct mandi sales.
          </p>
          <div>
            <button
              type="button"
              onClick={() => handleFeatureClick('/dashboard')}
              className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-white text-emerald-950 font-black text-lg shadow-lg hover:bg-emerald-50 transition-all hover:scale-105 cursor-pointer"
            >
              <span>{user ? '🌾 Open Farmer Dashboard' : '🚀 Login to Start'}</span>
              <ArrowRight className="w-5 h-5 ml-2 text-emerald-700" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
