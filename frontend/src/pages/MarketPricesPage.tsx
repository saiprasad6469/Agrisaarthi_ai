import React, { useState, useEffect } from 'react';
import { Store, TrendingUp, TrendingDown, Clock, MapPin, AlertCircle, Filter } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { api } from '../services/api';

export const MarketPricesPage: React.FC = () => {
  const [markets, setMarkets] = useState<any[]>([]);
  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  const [selectedDistrict, setSelectedDistrict] = useState('Nizamabad');

  useEffect(() => {
    async function loadMarkets() {
      try {
        const res = await api.getMarkets({ crop: selectedCrop, district: selectedDistrict });
        if (res.success) setMarkets(res.markets);
      } catch (err) {
        // Fallback
      }
    }
    loadMarkets();
  }, [selectedCrop, selectedDistrict]);

  const historyData = markets[0]?.priceHistory || [
    { date: 'Apr 20', price: 15 },
    { date: 'Apr 21', price: 16 },
    { date: 'Apr 22', price: 18 },
    { date: 'Apr 23', price: 17 },
    { date: 'Apr 24', price: 19 },
    { date: 'Apr 25', price: 20 },
    { date: 'Apr 26', price: 22 }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-8">
      {/* Header matching provided screenshot */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
            <Store className="w-7 h-7 text-emerald-600" />
            <span>Crop Market Prices</span>
          </h1>
          <p className="text-xs text-slate-500">Live market prices and trends across APMC yards & wholesale mandis</p>
        </div>

        {/* Demo badge */}
        <div className="bg-amber-100/80 border border-amber-300 text-amber-900 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1.5 self-start md:self-auto">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span>Demo Market Data</span>
        </div>
      </div>

      {/* Filter Toolbar matching screenshot */}
      <div className="agri-card p-4 flex flex-wrap items-center gap-4 text-xs font-semibold">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-slate-500">Filters:</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-slate-600">Crop:</span>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900"
          >
            <option value="Tomato">Tomato</option>
            <option value="Chilli">Chilli</option>
            <option value="Maize (Corn)">Maize (Corn)</option>
            <option value="Cotton">Cotton</option>
            <option value="Paddy (Rice)">Paddy (Rice)</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-slate-600">District:</span>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900"
          >
            <option value="Nizamabad">Nizamabad</option>
            <option value="Kamareddy">Kamareddy</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>
        </div>
      </div>

      {/* Market Prices Table matching screenshot */}
      <div className="agri-card p-6 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase bg-slate-50">
                <th className="p-3.5">Market Name</th>
                <th className="p-3.5">Price (₹/kg)</th>
                <th className="p-3.5">Trend</th>
                <th className="p-3.5">Distance</th>
                <th className="p-3.5">Demand</th>
                <th className="p-3.5">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {markets.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-900">{m.name}</td>
                  <td className="p-3.5 font-extrabold text-emerald-700">{m.currentPrice}</td>
                  <td className="p-3.5">
                    <span
                      className={`inline-flex items-center font-bold ${
                        m.trendDirection === 'down' ? 'text-red-600' : 'text-emerald-600'
                      }`}
                    >
                      {m.trendDirection === 'down' ? (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      )}
                      {m.trend}
                    </span>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-600">{m.distance}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        m.demand === 'High' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {m.demand}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-500 font-medium">{m.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Price Trend Chart matching screenshot */}
      <div className="agri-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">Price Trend ({markets[0]?.name || 'Nizamabad Market'})</h2>
          <span className="text-xs font-semibold text-slate-500">Last 7 Days</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={['dataMin - 2', 'dataMax + 2']} />
              <Tooltip formatter={(val: any) => [`₹${val} / kg`, 'Market Price']} />
              <Line type="monotone" dataKey="price" stroke="#16a34a" strokeWidth={3} dot={{ r: 4, fill: '#16a34a' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
