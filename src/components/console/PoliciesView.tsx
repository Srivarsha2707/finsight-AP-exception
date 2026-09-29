import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sliders, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Save 
} from 'lucide-react';

export const PoliciesView: React.FC = () => {
  const { addToast } = useApp();
  const [priceTolerance, setPriceTolerance] = useState(2.0);
  const [qtyTolerance, setQtyTolerance] = useState(0.0);
  const [approvalThreshold, setApprovalThreshold] = useState(100000);
  const [autoRoutePriceMismatch, setAutoRoutePriceMismatch] = useState('Procurement Operations');
  const [autoRouteTaxDiscrepancy, setAutoRouteTaxDiscrepancy] = useState('Corporate Tax');

  const handleSavePolicies = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'Policies & Tolerances Updated',
      message: `Price tolerance set to ${priceTolerance}% and manager approval ceiling at ₹${approvalThreshold.toLocaleString()}.`
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Policies & Tolerances
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Configure matching tolerance bands, managerial approval ceilings, and automated routing rules.
          </p>
        </div>

        <button
          onClick={handleSavePolicies}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-colors cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Policy Configuration</span>
        </button>
      </div>

      <form onSubmit={handleSavePolicies} className="space-y-6">
        {/* TOLERANCE THRESHOLDS */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <h2 className="text-base font-bold text-white tracking-tight">
            Matching Variance Tolerances
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price Tolerance */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-200">
                  Unit Price Variance Tolerance (%)
                </label>
                <span className="font-mono font-bold text-cyan-400 text-sm">
                  {priceTolerance.toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min="0.0"
                max="10.0"
                step="0.5"
                value={priceTolerance}
                onChange={(e) => setPriceTolerance(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400 leading-snug">
                Invoices exceeding {priceTolerance}% unit rate difference will trigger automatic exception investigation.
              </p>
            </div>

            {/* Quantity Tolerance */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-200">
                  Quantity Over-Receipt Tolerance (%)
                </label>
                <span className="font-mono font-bold text-cyan-400 text-sm">
                  {qtyTolerance.toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min="0.0"
                max="5.0"
                step="0.5"
                value={qtyTolerance}
                onChange={(e) => setQtyTolerance(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400 leading-snug">
                Strict dock enforcement: billed quantity must exactly match verified receipt slip.
              </p>
            </div>
          </div>
        </div>

        {/* FINANCIAL APPROVAL CEILINGS */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <h2 className="text-base font-bold text-white tracking-tight">
            Financial Governance & Dual-Approval Rules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <label className="block text-xs font-semibold text-slate-200">
                Manager Approval Threshold (INR)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-mono">₹</span>
                <input
                  type="number"
                  value={approvalThreshold}
                  onChange={(e) => setApprovalThreshold(parseInt(e.target.value) || 0)}
                  className="w-full pl-8 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm font-mono font-bold text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Exceptions with financial impact exceeding ₹{approvalThreshold.toLocaleString()} require secondary controller signoff.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <label className="block text-xs font-semibold text-slate-200">
                Automated Route: Price Mismatch
              </label>
              <select
                value={autoRoutePriceMismatch}
                onChange={(e) => setAutoRoutePriceMismatch(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Procurement Operations">Procurement Operations</option>
                <option value="Category Sourcing Lead">Category Sourcing Lead</option>
                <option value="Accounts Payable Lead">Accounts Payable Lead</option>
              </select>
              <p className="text-[11px] text-slate-400">
                FinSight will automatically assign investigated price variance packages to this team.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
