import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  AlertTriangle, 
  Clock, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  Mail, 
  Upload, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const SuppliersView: React.FC = () => {
  const { suppliers, setSelectedExceptionId, setActiveConsoleTab, addToast } = useApp();
  const [selectedSupplierCode, setSelectedSupplierCode] = useState('VND-10042');
  const [activeTab, setActiveTab] = useState<'profile' | 'collaboration' | 'contracts'>('profile');
  const [newVendorMessage, setNewVendorMessage] = useState('');

  const currentSupplier = suppliers.find(s => s.code === selectedSupplierCode) || suppliers[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVendorMessage.trim()) return;

    addToast({
      type: 'info',
      title: 'Portal Message Posted',
      message: `Message sent to ${currentSupplier.contactName} (${currentSupplier.contactEmail}).`
    });
    setNewVendorMessage('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header & Supplier Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Supplier Intelligence
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Supplier health scoring, recurring dispute patterns, and collaboration portal.
          </p>
        </div>

        {/* Vendor Selector dropdown */}
        <select
          value={selectedSupplierCode}
          onChange={(e) => setSelectedSupplierCode(e.target.value)}
          className="px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
        >
          {suppliers.map(s => (
            <option key={s.code} value={s.code}>
              {s.name} ({s.code})
            </option>
          ))}
        </select>
      </div>

      {/* AI RECURRING PATTERN ALERT BANNER */}
      {currentSupplier.recurringIssueAlert && (
        <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/40 shadow-md flex items-start gap-4">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                ✦ Recurring Issue Detected
              </span>
              <span className="text-xs font-mono font-semibold text-rose-300">
                ₹1.8M Affected
              </span>
            </div>
            <h3 className="text-sm font-bold text-white mt-0.5">
              {currentSupplier.name}: 27 Price Mismatches in the last 90 days.
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Likely cause: Vendor pricing ERP rate table is out of sync with Master Agreement MSA-2025-ABC (§4.2). Recommend initiating joint commercial rate sync with vendor account director.
            </p>
            <div className="mt-3 flex items-center gap-3">
              <button
                onClick={() => setActiveTab('collaboration')}
                className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                Open Vendor Dialogue →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUPPLIER SUMMARY METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400">Supplier Health</div>
          <div className="mt-2 text-3xl font-extrabold text-emerald-400 font-mono">
            {currentSupplier.healthScore} <span className="text-xs text-slate-500 font-normal">/ 100</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Tier-1 Qualified</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400">Total Invoices</div>
          <div className="mt-2 text-3xl font-extrabold text-white font-mono">
            {currentSupplier.totalInvoices}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">₹{(currentSupplier.totalSpendYTD / 10000000).toFixed(1)} Cr YTD Spend</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400">Exception Rate</div>
          <div className="mt-2 text-3xl font-extrabold text-rose-400 font-mono">
            {currentSupplier.exceptionRate}%
          </div>
          <div className="text-[11px] text-rose-400/80 mt-1">+3.2% vs industry benchmark</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400">Open Exceptions</div>
          <div className="mt-2 text-3xl font-extrabold text-amber-400 font-mono">
            {currentSupplier.openExceptions}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Blocked in ERP gate</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400">Avg Resolution</div>
          <div className="mt-2 text-3xl font-extrabold text-cyan-400 font-mono">
            {currentSupplier.avgResolutionDays}d
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Turnaround from notice</div>
        </div>
      </div>

      {/* TABS: Profile & Invoices vs Collaboration Portal vs Contracts */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Vendor Profile & Invoices
        </button>
        <button
          onClick={() => setActiveTab('collaboration')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'collaboration'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Supplier Collaboration Center
        </button>
        <button
          onClick={() => setActiveTab('contracts')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'contracts'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Active Contracts (MSA)
        </button>
      </div>

      {/* TAB 1: Profile & Exceptions */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white">Vendor Contact & Metadata</h3>
            <div>
              <span className="text-slate-500">Key Account Director:</span>
              <div className="font-semibold text-white mt-0.5">{currentSupplier.contactName}</div>
            </div>
            <div>
              <span className="text-slate-500">Billing Email:</span>
              <div className="font-mono text-cyan-400 mt-0.5">{currentSupplier.contactEmail}</div>
            </div>
            <div>
              <span className="text-slate-500">Default Terms:</span>
              <div className="font-semibold text-white mt-0.5">{currentSupplier.paymentTerms}</div>
            </div>
            <div>
              <span className="text-slate-500">Category:</span>
              <div className="font-semibold text-slate-300 mt-0.5">{currentSupplier.category}</div>
            </div>
          </div>

          <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-3">Recent Open Invoices & Exceptions</h3>
            <div className="space-y-2 text-xs">
              <div 
                onClick={() => {
                  setSelectedExceptionId('INV-28491');
                  setActiveConsoleTab('exception-detail');
                }}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 cursor-pointer flex items-center justify-between group transition-colors"
              >
                <div>
                  <div className="font-mono font-bold text-white group-hover:text-indigo-400">INV-28491</div>
                  <div className="text-[11px] text-rose-400">Price Mismatch (+5.08%) · SKU-IND-7712</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-white">₹86,400</div>
                  <div className="text-[10px] text-amber-400">Due Today →</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-slate-400">
                <div>
                  <div className="font-mono font-semibold text-slate-200">INV-28310</div>
                  <div className="text-[11px] text-slate-400">Settled on Sep 15 via Net 30</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-slate-200">₹74,200</div>
                  <div className="text-[10px] text-emerald-400">Paid</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Supplier Collaboration Center */}
      {activeTab === 'collaboration' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Vendor Collaboration Thread</h3>
              <p className="text-xs text-slate-400">Direct secure communication channel with {currentSupplier.name}.</p>
            </div>
            <button 
              onClick={() => {
                addToast({
                  type: 'info',
                  title: 'Upload Portal Link Generated',
                  message: 'Shared one-time upload link sent to accounts@abcsupplies.com for revised invoice delivery.'
                });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Send Secure Document Upload Link</span>
            </button>
          </div>

          {/* Timeline of messages */}
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                <span className="font-semibold text-indigo-400">FinSight AP Agent</span>
                <span>Sep 28, 10:44 AM</span>
              </div>
              <p className="text-slate-300">
                Automated Price Variance Notice generated for INV-28491. Unit price ₹1,240 exceeds PO rate ₹1,180.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                <span className="font-semibold text-emerald-400">{currentSupplier.contactName} (Vendor)</span>
                <span>Sep 27, 03:12 PM</span>
              </div>
              <p className="text-slate-300">
                Acknowledged previous credit note request for INV-28290. Credit applied on statement #ST-9021.
              </p>
            </div>
          </div>

          {/* Post Message Form */}
          <form onSubmit={handleSendMessage} className="space-y-3 pt-4 border-t border-slate-800">
            <label className="block text-xs font-medium text-slate-300">
              Post Message to Vendor Desk
            </label>
            <textarea
              rows={3}
              value={newVendorMessage}
              onChange={(e) => setNewVendorMessage(e.target.value)}
              placeholder="Type message regarding pending exceptions or contract rate alignments..."
              className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send to Supplier Desk</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: Contracts */}
      {activeTab === 'contracts' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">Active Procurement Agreements</h3>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-white text-sm">MSA-2025-ABC (Master Supply Agreement)</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px]">Active</span>
            </div>
            <div className="text-slate-400">Effective: Jan 01, 2025 - Dec 31, 2026 · Governing Law: Karnataka Commercial Jurisdiction</div>
            <div className="p-3 rounded-lg bg-slate-900 border border-indigo-500/20 text-slate-300 font-mono text-[11px] mt-2">
              <strong className="text-cyan-300">Section 4.2 (Price Stability):</strong> "Industrial polymer seal rings shall maintain fixed unit pricing of ₹1,180 net. Any inflationary adjustments require thirty (30) days prior written consultation."
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
