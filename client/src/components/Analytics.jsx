import React from 'react';
import { BarChart3, TrendingUp, MousePointer, Globe } from 'lucide-react';

export default function Analytics({ links = [] }) {
  const totalClicks = links.reduce((acc, curr) => acc + (curr.clicks || 0), 0);

  return (
    <div className="max-w-5xl mx-auto py-8 px-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Performance Analytics</h2>
      
      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <MousePointer className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-semibold">Total Clicks</p>
            <p className="text-2xl font-extrabold text-slate-900">{totalClicks}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-semibold">Active Links</p>
            <p className="text-2xl font-extrabold text-slate-900">{links.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-semibold">Avg. Clicks / Link</p>
            <p className="text-2xl font-extrabold text-slate-900">
              {links.length > 0 ? (totalClicks / links.length).toFixed(1) : 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}