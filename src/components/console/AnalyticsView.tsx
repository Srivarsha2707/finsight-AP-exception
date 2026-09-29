import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  Layers, 
  Calendar,
  Download
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { addToast } = useApp();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'ytd'>('30d');

  const handleExport = () => {
    addToast({
      type: 'info',
      title: 'Executive Report Generated',
      message: 'AP Intelligence Quarterly Exposure & Avoidance summary PDF prepared.'
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            AP Intelligence & Executive View
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Macro financial impact, exception trends, and autonomous vs human resolution metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-xl border border-slate-700 text-xs">
            {(['7d', '30d', '90d', 'ytd'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 rounded-lg font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  timeRange === r ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Executive Deck</span>
          </button>
        </div>
      </div>

      {/* EXECUTIVE FINANCIAL EXPOSURE VS RECOVERY HERO (CFO View) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/60 border border-slate-800 shadow-xl">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Total Exception Exposure
          </div>
          <div className="mt-3 text-4xl font-extrabold text-white font-mono tabular-nums">
            ₹12.4M
          </div>
          <p className="text-xs text-slate-300 mt-2">
            Aggregate face value of blocked or disputed invoices across current fiscal quarter.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Active open pool: ₹4.2M</span>
            <span className="text-rose-400">142 cases</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950/60 border border-emerald-500/30 shadow-xl">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Recovered / Avoided Impact
          </div>
          <div className="mt-3 text-4xl font-extrabold text-emerald-400 font-mono tabular-nums">
            ₹4.8M
          </div>
          <p className="text-xs text-slate-300 mt-2">
            Overpayments prevented via rate correction notices, quarantine holds, and duplicate blocks.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Captured prompt discounts: ₹640K</span>
            <span className="text-emerald-400">86% weekly resolve</span>
          </div>
        </div>
      </div>

      {/* FOUR SUPPORTING OPERATIONAL METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400">Average Resolution Time</div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">1.4 Days</div>
          <div className="text-[11px] text-emerald-400 mt-1">-58% vs manual AP cycle</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400">Exception Rate</div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">7.2%</div>
          <div className="text-[11px] text-slate-400 mt-1">Across 1,980 ingestions</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400">Autonomous AI Resolution</div>
          <div className="mt-2 text-2xl font-bold text-cyan-400 font-mono">76.4%</div>
          <div className="text-[11px] text-cyan-400/80 mt-1">Requires zero human touch</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400">Human Intervention Rate</div>
          <div className="mt-2 text-2xl font-bold text-amber-400 font-mono">23.6%</div>
          <div className="text-[11px] text-amber-400/80 mt-1">High-value or edge cases</div>
        </div>
      </div>

      {/* VISUAL CHARTS & BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Exception Types Distribution */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <h3 className="text-base font-bold text-white mb-4">Top Exception Categories</h3>
          <div className="space-y-3">
            {[
              { label: 'Price Mismatches', count: 39, pct: 36, color: 'bg-indigo-500' },
              { label: 'Missing GRN (Dock Holds)', count: 28, pct: 26, color: 'bg-amber-500' },
              { label: 'Quantity Discrepancies', count: 21, pct: 19, color: 'bg-blue-500' },
              { label: 'Tax / GST Rate Conflicts', count: 18, pct: 16, color: 'bg-purple-500' },
              { label: 'Duplicate Invoices & Fraud', count: 4, pct: 3, color: 'bg-rose-500' }
            ].map((cat, i) => (
              <div key={i} className="text-xs">
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>{cat.label} ({cat.count})</span>
                  <span className="font-mono font-semibold">{cat.pct}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className={`h-full ${cat.color}`} style={{ width: `${cat.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Risk Vendors */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <h3 className="text-base font-bold text-white mb-4">Vendors with Highest Rate Variances</h3>
          <div className="space-y-3 text-xs">
            {[
              { name: 'ABC Supplies Ltd.', count: 27, affected: '₹1.8M', rate: '9.5%' },
              { name: 'Global Logistics Corp', count: 18, affected: '₹1.2M', rate: '11.4%' },
              { name: 'Vertex Industrial', count: 12, affected: '₹680K', rate: '7.8%' },
              { name: 'TechNova Solutions', count: 4, affected: '₹340K', rate: '6.2%' }
            ].map((v, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">{v.name}</div>
                  <div className="text-[11px] text-slate-400">{v.count} exceptions · {v.rate} exception rate</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-rose-400">{v.affected}</div>
                  <div className="text-[10px] text-slate-500">at risk</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
