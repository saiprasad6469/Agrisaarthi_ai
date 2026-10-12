import React, { useState, useEffect } from 'react';
import { Users, MapPin, Phone, ShoppingBag, ShieldCheck, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

export const BuyerDiscoveryPage: React.FC = () => {
  const [buyers, setBuyers] = useState<any[]>([]);

  useEffect(() => {
    async function loadBuyers() {
      try {
        const res = await api.getBuyers({});
        if (res.success) setBuyers(res.buyers);
      } catch (err) {
        // Fallback
      }
    }
    loadBuyers();
  }, []);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
            <Users className="w-7 h-7 text-emerald-600" />
            <span>Find Potential Buyers</span>
          </h1>
          <p className="text-xs text-slate-500">Connect with verified wholesale traders, exporters & food processors</p>
        </div>

        <div className="bg-amber-100/80 border border-amber-300 text-amber-900 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1.5 self-start md:self-auto">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span>Verified Buyer Directory (Demo Data)</span>
        </div>
      </div>

      {/* Buyer Cards Grid matching screenshot */}
      <div className="grid md:grid-cols-3 gap-6">
        {buyers.map((b) => (
          <div key={b.id} className="agri-card p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 mb-1">
                    {b.buyerType}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{b.name}</h3>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center">
                  <ShoppingBag className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                  <span>Crops: <strong className="text-slate-900">{b.cropsRequired?.join(', ')}</strong></span>
                </div>
                <div className="flex items-center">
                  <span className="text-slate-500 font-semibold mr-2">Required:</span>
                  <strong className="text-slate-900 font-bold">{b.quantityRequired}</strong>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                  <span>Location: {b.location} ({b.distance})</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                  <span>Contact: {b.contact}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => alert(`Contacting buyer ${b.name} at ${b.contact}`)}
                className="flex-1 py-2 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold text-xs text-center rounded-xl border border-emerald-200"
              >
                View Buyer
              </button>
              <a
                href={`tel:${b.contact}`}
                className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center rounded-xl shadow-xs"
              >
                Contact Buyer
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
