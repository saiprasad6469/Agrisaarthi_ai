import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle2, Clock, Filter, AlertCircle, ShoppingBag, Droplets, FlaskConical } from 'lucide-react';
import { api } from '../services/api';
import { NotificationItem } from '../types';

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'task' | 'fertilizer' | 'market'>('all');

  useEffect(() => {
    async function loadNotifs() {
      try {
        const res = await api.getNotifications();
        if (res.success) setNotifications(res.notifications);
      } catch (err) {
        // Fallback
      }
    }
    loadNotifs();
  }, []);

  const markRead = async (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    try {
      await api.markNotificationRead(id);
    } catch (err) {
      // Offline fallback
    }
  };

  const filtered = notifications.filter((n) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'task') return n.type === 'task' || n.type === 'irrigation';
    if (activeTab === 'fertilizer') return n.type === 'fertilizer';
    if (activeTab === 'market') return n.type === 'market';
    return true;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-8">
      {/* Header matching screenshot */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
            <Bell className="w-7 h-7 text-emerald-600" />
            <span>Notifications & Reminders</span>
          </h1>
          <p className="text-xs text-slate-500">Stay updated on crop tasks, fertilizer applications, and market price changes</p>
        </div>
      </div>

      {/* Tabs matching screenshot: All (7), Fertilizer (2), Market (3), Others (1) */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {[
          { key: 'all', label: 'All' },
          { key: 'task', label: 'Tasks & Reminders' },
          { key: 'fertilizer', label: 'Fertilizer' },
          { key: 'market', label: 'Market Updates' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === tab.key
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List matching screenshot layout */}
      <div className="agri-card divide-y divide-slate-100">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => markRead(item.id)}
            className={`p-4 flex items-start justify-between gap-4 cursor-pointer transition-colors ${
              !item.read ? 'bg-emerald-50/40' : 'hover:bg-slate-50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 ${
                  item.type === 'fertilizer'
                    ? 'bg-lime-100 text-lime-800'
                    : item.type === 'market'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {item.type === 'fertilizer' ? (
                  <FlaskConical className="w-5 h-5" />
                ) : item.type === 'market' ? (
                  <ShoppingBag className="w-5 h-5" />
                ) : (
                  <Bell className="w-5 h-5" />
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  {!item.read && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
                </div>
                <p className="text-xs text-slate-600 font-medium">{item.message}</p>
                <div className="text-[10px] text-slate-400 font-semibold">{item.time}</div>
              </div>
            </div>

            {!item.read && (
              <span className="text-[11px] text-emerald-700 font-bold hover:underline shrink-0">Mark read</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
