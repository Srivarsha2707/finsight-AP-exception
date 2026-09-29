import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  CheckSquare, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const ApprovalsView: React.FC = () => {
  const { approvals, approveRecommendation, setSelectedExceptionId, setActiveConsoleTab, addToast } = useApp();

  const handleApproveItem = (invoiceNumber: string) => {
    approveRecommendation(invoiceNumber, 'Approved directly from Approvals Center queue');
  };

  const handleReviewItem = (invoiceNumber: string) => {
    setSelectedExceptionId(invoiceNumber);
    setActiveConsoleTab('exception-detail');
  };

  const handleBatchApproveAll = () => {
    approvals.forEach(app => {
      if (app.status === 'Pending') {
        approveRecommendation(app.invoiceNumber, 'Batch approval executed by AP Manager');
      }
    });
    addToast({
      type: 'success',
      title: 'Batch Approval Complete',
      message: 'All eligible pending AP exceptions have been authorized and queued for settlement.'
    });
  };

  const pendingCount = approvals.filter(a => a.status === 'Pending').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Approvals Center
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Human-in-the-loop governance: review and authorize AI-recommended exception actions.
          </p>
        </div>

        <button
          onClick={handleBatchApproveAll}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/30 transition-colors cursor-pointer"
        >
          <CheckSquare className="w-4 h-4" />
          <span>Batch Authorize All High-Confidence Items</span>
        </button>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Pending Approvals</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-3 text-3xl font-extrabold text-white font-mono tabular-nums">
            {pendingCount}
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Awaiting controller review
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>High Value (&gt; ₹100,000)</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-3 text-3xl font-extrabold text-rose-400 font-mono tabular-nums">
            6
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Requires dual signoff
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Due Today</span>
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-3 text-3xl font-extrabold text-cyan-400 font-mono tabular-nums">
            4
          </div>
          <div className="mt-1 text-xs text-slate-400">
            To prevent vendor discount forfeiture
          </div>
        </div>
      </div>

      {/* Approvals Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-800">
          <h2 className="text-base font-bold text-white tracking-tight">
            Pending Resolution Approvals
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Every item includes an explainable AI recommendation with confidence scoring.
          </p>
        </div>

        {/* Mobile Approvals Cards (< md) */}
        <div className="block md:hidden divide-y divide-slate-800/80">
          {approvals.map((app) => (
            <div key={app.id} className="p-4 space-y-3 hover:bg-slate-800/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-white text-sm">{app.invoiceNumber}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                    app.status === 'Approved'
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                      : 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                  }`}>
                    {app.status}
                  </span>
                </div>
                <span className="font-mono font-bold text-white text-sm">
                  {app.currency}{app.amount.toLocaleString()}
                </span>
              </div>

              <div>
                <div className="text-xs font-semibold text-slate-200">{app.vendorName}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{app.exceptionType} · Due {app.dueDate}</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                <div className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider mb-0.5 flex items-center justify-between">
                  <span>AI Recommendation</span>
                  <span className="text-emerald-400 font-mono">{app.confidencePct}% Conf</span>
                </div>
                <p className="text-slate-200 text-xs">{app.aiRecommendation}</p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                {app.status === 'Pending' ? (
                  <>
                    <button
                      onClick={() => handleReviewItem(app.invoiceNumber)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold text-center cursor-pointer"
                    >
                      Review
                    </button>
                    <button
                      onClick={() => handleApproveItem(app.invoiceNumber)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm text-center cursor-pointer"
                    >
                      Approve
                    </button>
                  </>
                ) : (
                  <div className="w-full py-2 text-center text-xs text-emerald-400 font-semibold flex items-center justify-center gap-1.5 bg-emerald-950/30 rounded-xl border border-emerald-500/20">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Authorized & Queued for Settlement</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View (>= md) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Invoice</th>
                <th className="py-3.5 px-4">Vendor</th>
                <th className="py-3.5 px-4 text-right">Amount</th>
                <th className="py-3.5 px-4">Exception</th>
                <th className="py-3.5 px-4">AI Recommendation</th>
                <th className="py-3.5 px-4">Due Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {approvals.map((app) => (
                <tr key={app.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-mono font-bold text-white whitespace-nowrap">
                    {app.invoiceNumber}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-slate-200">
                    {app.vendorName}
                  </td>
                  <td className="py-4 px-4 text-right font-mono font-bold text-white tabular-nums whitespace-nowrap">
                    {app.currency}{app.amount.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="text-slate-300 font-medium">{app.exceptionType}</span>
                  </td>
                  <td className="py-4 px-4 text-slate-300 min-w-[240px]">
                    <div className="flex items-center gap-1.5">
                      <span>{app.aiRecommendation}</span>
                      <span className="text-[10px] font-mono text-emerald-400 font-semibold px-1.5 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/30">
                        {app.confidencePct}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className={app.dueDate === 'Today' ? 'text-rose-400 font-semibold' : 'text-slate-300'}>
                      {app.dueDate}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                      app.status === 'Approved'
                        ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                        : 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap space-x-2">
                    {app.status === 'Pending' ? (
                      <>
                        <button
                          onClick={() => handleReviewItem(app.invoiceNumber)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
                        >
                          Review
                        </button>
                        <button
                          onClick={() => handleApproveItem(app.invoiceNumber)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                        >
                          Approve
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-emerald-400 font-semibold flex items-center justify-end gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Authorized</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
