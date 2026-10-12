import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, MapPin, Ruler, Sprout, Save, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

interface ProfilePageProps {
  user: any;
  onUpdateUser: (u: any) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUpdateUser }) => {
  const [profile, setProfile] = useState({
    name: user?.name || 'Ramesh Kumar',
    mobile: user?.mobile || '9876543210',
    email: user?.email || 'ramesh@farmer.com',
    preferredLanguage: user?.preferredLanguage || 'en',
    farmSize: 5,
    state: 'Telangana',
    district: 'Nizamabad',
    village: 'Peddapur',
    soilType: 'Loam'
  });

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const farmRes = await api.getFarm();
        if (farmRes.success && farmRes.farm) {
          setProfile((prev) => ({
            ...prev,
            farmSize: farmRes.farm.farmSize || 5,
            soilType: farmRes.farm.soilType || 'Loam',
            village: farmRes.farm.location?.village || 'Peddapur',
            district: farmRes.farm.location?.district || 'Nizamabad',
            state: farmRes.farm.location?.state || 'Telangana'
          }));
        }
      } catch (err) {}
    }
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');

    try {
      await api.updateProfile({
        name: profile.name,
        mobile: profile.mobile,
        email: profile.email,
        preferredLanguage: profile.preferredLanguage
      });

      await api.updateFarm({
        farmSize: profile.farmSize,
        soilType: profile.soilType,
        village: profile.village,
        district: profile.district,
        state: profile.state
      });

      onUpdateUser({ ...user, name: profile.name, mobile: profile.mobile, email: profile.email });
      setMsg('Profile and farm information updated successfully!');
    } catch (err) {
      setMsg('Updated locally');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-8">
      <div className="bg-white p-6 rounded-3xl border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">Farm Profile</h1>
        <p className="text-xs text-slate-500">Manage your personal and farm information</p>
      </div>

      {msg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{msg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Details */}
        <div className="agri-card p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <User className="w-5 h-5 text-emerald-600" />
            <span>Personal Information</span>
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">Mobile Number</label>
              <input
                type="tel"
                value={profile.mobile}
                onChange={(e) => setProfile({ ...profile, mobile: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">Preferred Language</label>
              <select
                value={profile.preferredLanguage}
                onChange={(e) => setProfile({ ...profile, preferredLanguage: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
              >
                <option value="en">English</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="hi">हिंदी (Hindi)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Farm Information */}
        <div className="agri-card p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <Sprout className="w-5 h-5 text-emerald-600" />
            <span>Farm Information</span>
          </h2>

          <div className="grid sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">Farm Size (Acres)</label>
              <input
                type="number"
                value={profile.farmSize}
                onChange={(e) => setProfile({ ...profile, farmSize: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">Soil Type</label>
              <select
                value={profile.soilType}
                onChange={(e) => setProfile({ ...profile, soilType: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              >
                <option value="Loam">Loam Soil</option>
                <option value="Clay">Clay Soil</option>
                <option value="Black Cotton">Black Cotton Soil</option>
                <option value="Sandy Loam">Sandy Loam Soil</option>
                <option value="Red Soil">Red Soil</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">Village</label>
              <input
                type="text"
                value={profile.village}
                onChange={(e) => setProfile({ ...profile, village: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">District</label>
              <input
                type="text"
                value={profile.district}
                onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">State</label>
              <input
                type="text"
                value={profile.state}
                onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
        </button>
      </form>
    </div>
  );
};
