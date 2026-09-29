import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  ChevronRight,
  History
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { exceptions, setActiveConsoleTab, setSelectedExceptionId, openCopilotWithPrompt } = useApp();

  const handleOpenException = (invoiceNumber: string) => {
    setSelectedExceptionId(invoiceNumber);
    setActiveConsoleTab('exception-detail');
  };

  const highPriorityExceptions = exceptions.slice(0, 5);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. WELCOME HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Good morning, Sarah
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Your AP operations at a glance. 142 exceptions tracked across enterprise pipelines.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => setActiveConsoleTab('invoices')}
            className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer text-center"
          >
            Upload / Ingest Invoice
          </button>
          <button
            onClick={() => setActiveConsoleTab('approvals')}
            className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Review Approvals (18)</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <div 
          onClick={() => setActiveConsoleTab('exceptions')}
          className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm hover:border-slate-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Open Exceptions</span>
            <span className="text-rose-400 font-mono font-medium">+12.4%</span>
          </div>
          <div className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
            142
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span>Requires resolution</span>
            <span className="text-indigo-400 group-hover:translate-x-0.5 transition-transform">→</span>
          </div>
        </div>

        <div 
          onClick={() => setActiveConsoleTab('exceptions')}
          className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm hover:border-slate-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>High Priority</span>
            <span className="text-amber-400 font-mono font-medium">-4.2%</span>
          </div>
          <div className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
            28
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span>Action due &lt; 24h</span>
            <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform">→</span>
          </div>
        </div>

        <div 
          onClick={() => setActiveConsoleTab('analytics')}
          className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm hover:border-slate-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Amount at Risk</span>
            <span className="text-indigo-400 font-mono font-medium">+8.7%</span>
          </div>
          <div className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
            ₹4.2M
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span>Across mismatched invoices</span>
            <span className="text-indigo-400 group-hover:translate-x-0.5 transition-transform">→</span>
          </div>
        </div>

        <div 
          onClick={() => setActiveConsoleTab('analytics')}
          className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm hover:border-slate-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Resolved This Week</span>
            <span className="text-emerald-400 font-mono font-medium">+14%</span>
          </div>
          <div className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
            86%
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span>Avg 1.4 days resolution</span>
            <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform">→</span>
          </div>
        </div>
      </div>

      {/* 3. AI INSIGHT HERO PANEL */}
      <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-indigo-950/70 via-slate-900 to-indigo-900/40 border border-indigo-500/30 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>FinSight Intelligence</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Price mismatch exceptions increased 18% this week, primarily across three vendors.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              27 related exceptions · ₹1.8M affected. ABC Supplies Ltd. accounts for 74% of the price deviations due to an un-synchronized rate table amendment.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => openCopilotWithPrompt('Analyze the 18% spike in price mismatch exceptions this week across ABC Supplies.')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ask FinSight</span>
            </button>
            <button
              onClick={() => setActiveConsoleTab('suppliers')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>View affected vendors</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. NEEDS YOUR ATTENTION TABLE */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Needs Your Attention
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              High-priority exceptions requiring immediate investigation or controller signoff.
            </p>
          </div>
          <button
            onClick={() => setActiveConsoleTab('exceptions')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
          >
            <span>View all 142 exceptions</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Exception Cards View (< md screens) */}
        <div className="block md:hidden divide-y divide-slate-800/80">
          {highPriorityExceptions.map((exc) => {
            const priorityBadge = 
              exc.priority === 'Critical' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' :
              exc.priority === 'High' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
              'bg-slate-800 text-slate-300 border-slate-700';

            return (
              <div
                key={exc.id}
                onClick={() => handleOpenException(exc.invoiceNumber)}
                className="p-4 hover:bg-slate-800/40 active:bg-slate-800/60 transition-colors cursor-pointer space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white text-sm">{exc.invoiceNumber}</span>
                    <span className={`text-[10px] font-semibold font-mono px-2 py-0.5 rounded-full border ${priorityBadge}`}>
                      {exc.priority}
                    </span>
                  </div>
                  <span className="text-sm font-mono font-bold text-white">
                    {exc.currency}{exc.amount.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-medium text-slate-200 truncate max-w-[200px]">{exc.vendorName}</span>
                  <span className={exc.dueDate === 'Today' ? 'text-rose-400 font-semibold' : 'text-slate-400'}>
                    Due {exc.dueDate}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-400 font-medium">{exc.exceptionType}</span>
                  <span className="text-xs text-indigo-400 font-semibold flex items-center gap-1">
                    <span>Investigate</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Table View (>= md screens) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Priority</th>
                <th className="py-3.5 px-4">Invoice</th>
                <th className="py-3.5 px-4">Vendor</th>
                <th className="py-3.5 px-4">Exception</th>
                <th className="py-3.5 px-4 text-right">Amount</th>
                <th className="py-3.5 px-4">Age</th>
                <th className="py-3.5 px-4">Due</th>
                <th className="py-3.5 px-4">Risk</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {highPriorityExceptions.map((exc) => {
                const priorityStyles = {
                  Critical: 'text-rose-400 font-semibold',
                  High: 'text-amber-400 font-semibold',
                  Medium: 'text-blue-400',
                  Low: 'text-slate-400'
                };

                const statusStyles = {
                  'Investigating': 'text-purple-300 bg-purple-950/40 border-purple-500/30',
                  'Pending Approval': 'text-amber-300 bg-amber-950/40 border-amber-500/30',
                  'Recommendation Ready': 'text-cyan-300 bg-cyan-950/40 border-cyan-500/30',
                  'Resolved': 'text-emerald-300 bg-emerald-950/40 border-emerald-500/30',
                  'Detected': 'text-slate-300 bg-slate-800 border-slate-700',
                  'Vendor Contacted': 'text-blue-300 bg-blue-950/40 border-blue-500/30',
                  'Escalated': 'text-rose-300 bg-rose-950/40 border-rose-500/30'
                };

                return (
                  <tr
                    key={exc.id}
                    onClick={() => handleOpenException(exc.invoiceNumber)}
                    className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <span className={priorityStyles[exc.priority]}>
                        {exc.priority}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="font-mono font-semibold text-white group-hover:text-indigo-400 transition-colors">
                        {exc.invoiceNumber}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-slate-200">
                      {exc.vendorName}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="text-slate-300 font-medium">
                        {exc.exceptionType}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-right font-mono font-bold text-white tabular-nums">
                      {exc.currency}{exc.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-slate-400">
                      {exc.ageDays} {exc.ageDays === 1 ? 'day' : 'days'}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={exc.dueDate === 'Today' ? 'text-rose-400 font-semibold' : 'text-slate-300'}>
                        {exc.dueDate}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="text-slate-300">
                        {exc.risk}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${statusStyles[exc.status] || 'text-slate-300'}`}>
                        {exc.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenException(exc.invoiceNumber);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium group-hover:bg-indigo-600 group-hover:text-white transition-colors"
                      >
                        Investigate →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. EARLY PAYMENT & RECURRING PATTERN MINI STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
            <Zap className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Early Payment Opportunity
              </span>
              <span className="text-xs font-mono font-semibold text-emerald-300">
                Potential Savings: ₹18,400
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Invoice <strong className="text-white">INV-28491</strong> offers a 2% prompt discount if paid by Oct 12. Resolving the price variance today secures this cash rebate.
            </p>
            <button
              onClick={() => handleOpenException('INV-28491')}
              className="mt-3 text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
            >
              <span>Resolve Exception Now →</span>
            </button>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-indigo-500/30 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
            <History className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                <span>✦ Hindsight Insight</span>
              </span>
              <span className="text-xs font-mono text-indigo-300">
                27 Similar Cases
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              27 price mismatches were recorded for this supplier in the historical dataset. Most were associated with outdated PO pricing.
            </p>
            <button
              onClick={() => setActiveConsoleTab('hindsight')}
              className="mt-3 text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer group"
            >
              <span>View Hindsight Analysis</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
