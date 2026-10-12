import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, Phone, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

interface LoginPageProps {
  onLoginSuccess: (token: string, user: any) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [loginInput, setLoginInput] = useState('9876543210');
  const [password, setPassword] = useState('farmer123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.login({ loginInput, password });
      if (res.success) {
        onLoginSuccess(res.token, res.user);
        navigate('/dashboard');
      } else {
        setError(res.message || 'Login failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials or server offline');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2 border border-slate-200">
        {/* Left Side Visual matching screenshot */}
        <div className="relative hidden md:block bg-emerald-900 text-white p-8 flex flex-col justify-between">
          <img
            src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80"
            alt="Farmer in field"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="relative z-10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 backdrop-blur-md flex items-center justify-center border border-emerald-400/30">
              <Sprout className="w-7 h-7 text-emerald-300" />
            </div>
            <h2 className="text-3xl font-extrabold text-white">AgriSaarthi AI</h2>
            <p className="text-emerald-100 text-sm leading-relaxed">
              Sign in to manage your soil reports, customized crop recommendations, fertilizer schedule and market prices.
            </p>
          </div>
          <div className="relative z-10 text-xs text-emerald-300">
            Exclusively for Farmers • 100% Free Soil Assistance
          </div>
        </div>

        {/* Right Side Login Form */}
        <div className="p-8 sm:p-10 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Sprout className="w-6 h-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-slate-900">Welcome Back Farmer!</h2>
            </div>
            <p className="text-slate-500 text-sm">Sign in to your account to continue your farming journey.</p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2 text-red-700 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Mobile Number or Email
              </label>
              <div className="relative">
                <Phone className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={loginInput}
                  onChange={(e) => setLoginInput(e.target.value)}
                  placeholder="Enter your mobile or email"
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs font-medium text-emerald-700 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center space-x-2"
            >
              <span>{loading ? 'Signing In...' : 'Login'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-emerald-700 hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
