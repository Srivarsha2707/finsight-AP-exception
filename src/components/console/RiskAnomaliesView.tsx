import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockRiskAnomalies } from '../../data/mockData';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Copy, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const RiskAnomaliesView: React.FC = () => {
  const { setSelectedExceptionId, setActiveConsoleTab, addToast } = useApp();
  const [filterRisk, setFilterRisk] = useState<string>('All');

  const filteredRisks = mockRiskAnomalies.filter(r => 
    filterRisk === 'All' || r.riskLevel === filterRisk
  );

  const handleAction = (riskId: string, actionDesc: string) => {
    addToast({
      type: 'success',
      title: 'Action Applied',
      message: `${actionDesc} executed for incident ${riskId}.`
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Risk & Anomaly Intelligence
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Proactive protection against duplicate invoices, payment drift, and remittance bank alterations.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-xl border border-slate-700 text-xs">
          {['All', 'Critical', 'High', 'Low'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterRisk(lvl)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                filterRisk === lvl ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* EARLY PAYMENT DISCOUNT CALLOUT */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Early Payment Opportunity
                </span>
                <span className="text-xs font-mono font-bold text-white px-2 py-0.5 rounded bg-emerald-900/80">
                  Save ₹18,400
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">
                Invoice INV-28491 (ABC Supplies Ltd.)
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Payment due: Oct 12 · 2% prompt discount active. Resolving price mismatch today captures ₹18,400 in direct savings.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedExceptionId('INV-28491');
              setActiveConsoleTab('exception-detail');
            }}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/30 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <span>Review Opportunity & Resolve</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ANOMALIES LIST */}
      <div className="space-y-4">
        {filteredRisks.map((item) => {
          const riskBadgeStyles = {
            Critical: 'text-rose-400 bg-rose-950/60 border-rose-500/40',
            High: 'text-amber-400 bg-amber-950/60 border-amber-500/40',
            Medium: 'text-blue-400 bg-blue-950/60 border-blue-500/40',
            Low: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40'
          };

          return (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold border ${riskBadgeStyles[item.riskLevel]}`}>
                    {item.riskLevel} Risk
                  </span>
                  <span className="text-xs font-mono text-slate-500">{item.id}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-xs text-slate-300 font-semibold">{item.vendorName}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-xs text-slate-500">{item.detectedDate}</span>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                  {item.description}
                </p>

                <div className="text-xs text-indigo-300 font-medium">
                  <strong>Suggested Protection:</strong> {item.suggestedAction}
                </div>
              </div>

              <div className="flex flex-col sm:items-end justify-between gap-3 shrink-0">
                <div className="text-right">
                  <div className="text-[11px] text-slate-400">Affected Amount</div>
                  <div className="text-xl font-bold font-mono text-white">
                    {item.currency}{item.affectedAmount.toLocaleString()}
                  </div>
                </div>

                <button
                  onClick={() => handleAction(item.id, item.suggestedAction)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
                >
                  Apply Suggested Action
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
