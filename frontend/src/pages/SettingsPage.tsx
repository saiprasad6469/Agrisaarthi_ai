import React, { useState } from 'react';
import { Settings, Globe, Bell, Mic, Shield, LogOut, Trash2 } from 'lucide-react';
import { api } from '../services/api';

interface SettingsPageProps {
  currentLang: string;
  onLangChange: (lang: any) => void;
  onLogout: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ currentLang, onLangChange, onLogout }) => {
  const [taskNotifs, setTaskNotifs] = useState(true);
  const [marketNotifs, setMarketNotifs] = useState(true);
  const [voicePlayback, setVoicePlayback] = useState(true);

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your farmer account? This action cannot be undone.')) {
      try {
        await api.deleteAccount();
      } catch (err) {}
      onLogout();
    }
  };

  const languages = [
    { id: 'en', label: 'English' },
    { id: 'te', label: 'తెలుగు (Telugu)' },
    { id: 'hi', label: 'हिंदी (Hindi)' },
    { id: 'mr', label: 'मराठी (Marathi)' },
    { id: 'ta', label: 'தமிழ் (Tamil)' },
    { id: 'kn', label: 'ಕನ್ನಡ (Kannada)' }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-8">
      <div className="bg-white p-6 rounded-3xl border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
          <Settings className="w-7 h-7 text-emerald-600" />
          <span>Farmer Settings</span>
        </h1>
        <p className="text-xs text-slate-500">Configure language, notification alerts, voice assistant, and account preferences</p>
      </div>

      {/* 1. Language Preferences */}
      <div className="agri-card p-6 space-y-3">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Globe className="w-4 h-4 text-emerald-600" />
          <span>Multilingual Voice & UI Language</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {languages.map((l) => (
            <button
              key={l.id}
              onClick={() => onLangChange(l.id)}
              className={`p-3 rounded-xl text-xs font-bold text-center border transition-all ${
                currentLang === l.id
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Notification Preferences */}
      <div className="agri-card p-6 space-y-3">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Bell className="w-4 h-4 text-emerald-600" />
          <span>Notification Alerts</span>
        </h2>
        <div className="space-y-2 text-xs font-semibold">
          <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer">
            <span>Crop Task & Fertilizer Reminders</span>
            <input
              type="checkbox"
              checked={taskNotifs}
              onChange={(e) => setTaskNotifs(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded-sm"
            />
          </label>
          <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer">
            <span>Market Price Updates & Trend Alerts</span>
            <input
              type="checkbox"
              checked={marketNotifs}
              onChange={(e) => setMarketNotifs(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded-sm"
            />
          </label>
        </div>
      </div>

      {/* 3. Voice Preferences */}
      <div className="agri-card p-6 space-y-3">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Mic className="w-4 h-4 text-emerald-600" />
          <span>Voice Assistance</span>
        </h2>
        <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer text-xs font-semibold">
          <span>Enable Spoken Audio Responses in AI Assistant</span>
          <input
            type="checkbox"
            checked={voicePlayback}
            onChange={(e) => setVoicePlayback(e.target.checked)}
            className="w-4 h-4 text-emerald-600 rounded-sm"
          />
        </label>
      </div>

      {/* 4. Account Actions */}
      <div className="agri-card p-6 space-y-3">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span>Account Actions</span>
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <button
            onClick={onLogout}
            className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Account</span>
          </button>
          <button
            onClick={handleDeleteAccount}
            className="flex-1 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs rounded-xl border border-red-200 flex items-center justify-center space-x-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};
