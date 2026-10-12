import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, Phone, CheckCircle2, Navigation, Clock, Building, ArrowRight } from 'lucide-react';

export const SoilLabsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('Hyderabad, Telangana');

  const labs = [
    {
      id: 'lab-1',
      name: 'Government Soil Testing Lab',
      distance: '4.2 km',
      verified: true,
      address: 'Agricultural Research Institute, Gachibowli, Hyderabad',
      phone: '+91 94400 12345',
      timing: '9:30 AM - 5:30 PM',
      fee: '₹100 (Govt Subsidized)'
    },
    {
      id: 'lab-2',
      name: 'Soil Testing Center (ICAR)',
      distance: '8.7 km',
      verified: true,
      address: 'ICAR Soil Health Lab, Machapur, Hyderabad',
      phone: '+91 98480 67890',
      timing: '10:00 AM - 5:00 PM',
      fee: '₹150'
    },
    {
      id: 'lab-3',
      name: 'Private Soil Lab (AgriTech)',
      distance: '12.1 km',
      verified: true,
      address: 'AgriTech Laboratory, Kukatpally, Hyderabad',
      phone: '+91 91234 56789',
      timing: '9:00 AM - 7:00 PM',
      fee: '₹250'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      {/* SCREEN 4 HEADER */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Soil Testing Centers</h1>
          <p className="text-xs text-slate-500 font-medium">Find government and certified labs near your farm</p>
        </div>
        <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 self-start sm:self-auto">
          Step 4 of 14
        </span>
      </div>

      {/* SEARCH BAR matching Screen 4 */}
      <div className="agri-card p-4 flex items-center space-x-3">
        <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search location or pin code..."
          className="flex-1 bg-transparent text-sm font-bold text-slate-900 focus:outline-hidden"
        />
        <button className="p-2 bg-emerald-600 text-white rounded-xl shadow-xs">
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* LABS LIST matching Screen 4 */}
      <div className="space-y-4">
        {labs.map((lab) => (
          <div key={lab.id} className="agri-card p-6 space-y-4 border-l-4 border-l-emerald-600 hover:shadow-md transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-black text-slate-900">{lab.name}</h3>
                  {lab.verified && (
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-md flex items-center">
                      <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" /> Verified
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{lab.address}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-sm font-black text-emerald-700">{lab.distance}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600 font-medium">
              <div className="flex items-center space-x-4">
                <span>Fee: <strong className="text-slate-900">{lab.fee}</strong></span>
                <span>•</span>
                <span>Timing: <strong className="text-slate-900">{lab.timing}</strong></span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.open(`tel:${lab.phone.replace(/[^0-9+]/g, '')}`, '_self')}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl flex items-center space-x-1"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Call Lab</span>
                </button>

                <button
                  onClick={() => {
                    const query = encodeURIComponent(`${lab.name}, ${lab.address}`);
                    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer');
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs flex items-center space-x-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Navigate (Google Maps)</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
