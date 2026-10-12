import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [mobile, setMobile] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 space-y-6">
        <Link to="/login" className="inline-flex items-center text-xs font-semibold text-emerald-700 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Login
        </Link>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Reset Password</h2>
          <p className="text-slate-500 text-sm">Enter your registered mobile number to reset password.</p>
        </div>

        {submitted ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <p className="font-bold text-slate-900">OTP Sent!</p>
            <p className="text-xs text-slate-600">Password reset OTP sent to {mobile}. Follow SMS instructions.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Mobile Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="9876543210"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors"
            >
              Send Reset OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
