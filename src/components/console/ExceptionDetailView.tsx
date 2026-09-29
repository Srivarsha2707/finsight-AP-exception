import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Layers, 
  Search, 
  Building2, 
  History, 
  FileCode2, 
  Mail, 
  Share2, 
  ShieldAlert, 
  ChevronRight,
  ExternalLink,
  ChevronDown,
  Info
} from 'lucide-react';

export const ExceptionDetailView: React.FC = () => {
  const { 
    selectedExceptionId, 
    exceptions, 
    setActiveConsoleTab, 
    approveRecommendation, 
    sendVendorInquiry,
    openCopilotWithPrompt,
    addToast
  } = useApp();

  const currentException = exceptions.find(e => e.invoiceNumber === selectedExceptionId) || exceptions[0];

  const [activeEvidenceTab, setActiveEvidenceTab] = useState<'invoice' | 'po' | 'grn' | 'contract' | 'vendor' | 'hindsight' | 'history'>('invoice');
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [approvalNote, setApprovalNote] = useState('Reviewed pricing contract MSA-2025-ABC §4.2. Requesting corrected invoice at ₹1,180/unit.');
  const [isVendorInquiryOpen, setIsVendorInquiryOpen] = useState(false);
  const [vendorEmailBody, setVendorEmailBody] = useState(
`Dear ABC Supplies Billing Desk,

During automated 3-way reconciliation of Invoice #INV-28491, our system identified a unit price of ₹1,240 on SKU-IND-7712. 
As stipulated in PO-88219 and Master Services Agreement MSA-2025-ABC (§4.2), the agreed unit price is ₹1,180.

Please issue a revised invoice or credit note for the difference of ₹6,000 (pre-tax) so we may process immediate settlement.

Best regards,
Sarah Morgan | AP Operations Manager`
  );

  // Workflow progress milestones - Detect → Investigate → Explain → Recommend → Approve → Resolve → Hindsight → Prevent
  const workflowStages = [
    { name: 'Detect', completed: true },
    { name: 'Investigate', completed: true },
    { name: 'Explain', completed: true },
    { name: 'Recommend', completed: true },
    { name: 'Approve', completed: currentException.status === 'Resolved' },
    { name: 'Resolve', completed: currentException.status === 'Resolved' },
    { name: 'Hindsight', completed: true },
    { name: 'Prevent', completed: true }
  ];

  const handleApprove = () => {
    approveRecommendation(currentException.invoiceNumber, approvalNote);
    setIsApprovalModalOpen(false);
  };

  const handleSendVendorInquiry = () => {
    sendVendorInquiry(currentException.invoiceNumber, vendorEmailBody);
    setIsVendorInquiryOpen(false);
  };

  const handleEscalate = () => {
    addToast({
      type: 'info',
      title: 'Escalation Dispatched',
      message: `Exception ${currentException.invoiceNumber} escalated to Head of Procurement (Elena Rostova).`
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Back button and page breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={() => setActiveConsoleTab('exceptions')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Exceptions List</span>
        </button>

        <button
          onClick={() => openCopilotWithPrompt(`Explain root cause and evidence for ${currentException.invoiceNumber}`)}
          className="flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 border border-slate-700 transition-colors cursor-pointer w-full sm:w-auto"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Ask FinSight About This Exception</span>
        </button>
      </div>

      {/* HEADER CARD: Invoice #INV-28491, Vendor, Amount, Priority, Due Date */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
          <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight font-mono">
              Invoice #{currentException.invoiceNumber}
            </h1>
            <span className="text-sm sm:text-lg text-slate-300 font-semibold">
              · {currentException.vendorName}
            </span>
            <span className="text-lg sm:text-2xl font-extrabold text-white font-mono tabular-nums">
              · {currentException.currency}{currentException.amount.toLocaleString()}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono">
              {currentException.priority} Priority
            </span>
            <span className="text-xs text-rose-400 font-semibold">
              Due {currentException.dueDate}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Assigned:</span>
            <span className="text-xs font-semibold text-white px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700">
              {currentException.assignedTo}
            </span>
          </div>
        </div>

        {/* WORKFLOW PROGRESS TRACKER */}
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-800/80 overflow-x-auto pb-1">
          <div className="flex items-center justify-between relative min-w-[280px] max-w-4xl mx-auto px-2">
            <div className="absolute top-3 sm:top-3.5 left-4 right-4 h-0.5 bg-slate-800 -z-0" />
            
            {workflowStages.map((stage, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                <div 
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold font-mono transition-colors ${
                    stage.completed
                      ? 'bg-emerald-500 text-slate-950 shadow-[0_0_12px_#10b98188]'
                      : 'bg-slate-800 border border-slate-700 text-slate-400'
                  }`}
                >
                  {stage.completed ? '✓' : idx + 1}
                </div>
                <span className={`text-[10px] sm:text-xs mt-1.5 font-medium ${stage.completed ? 'text-white' : 'text-slate-500'}`}>
                  {stage.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TWO COLUMN GRID: WHAT HAPPENED vs AI RECOMMENDATION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: WHAT HAPPENED? */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-white uppercase tracking-wider text-xs text-slate-400">
                WHAT HAPPENED?
              </h2>
              <span className="text-xs font-mono font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                Price Mismatch (+5.08%)
              </span>
            </div>

            {/* Financial metric breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center">
              <div>
                <div className="text-[11px] text-slate-400">Invoice Price</div>
                <div className="text-lg font-bold text-rose-400 font-mono tabular-nums mt-0.5">
                  ₹{currentException.unitInvoicePrice || 1240}
                </div>
                <div className="text-[10px] text-slate-500">per unit</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400">PO Price</div>
                <div className="text-lg font-bold text-emerald-400 font-mono tabular-nums mt-0.5">
                  ₹{currentException.unitPoPrice || 1180}
                </div>
                <div className="text-[10px] text-slate-500">authorized</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400">Variance</div>
                <div className="text-lg font-bold text-rose-400 font-mono tabular-nums mt-0.5">
                  +{currentException.priceVariancePct || 5.08}%
                </div>
                <div className="text-[10px] text-slate-500">rate delta</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400">Allowed Tolerance</div>
                <div className="text-lg font-bold text-slate-300 font-mono tabular-nums mt-0.5">
                  {currentException.allowedTolerancePct || 2.00}%
                </div>
                <div className="text-[10px] text-slate-500">policy limit</div>
              </div>
            </div>

            {/* Total Financial Impact Box */}
            <div className="mt-4 p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-rose-300">
                  Total Financial Impact at Risk
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Includes rate differential + GST exposure across 100 units
                </div>
              </div>
              <div className="text-xl font-extrabold text-rose-400 font-mono tabular-nums">
                ₹{currentException.financialImpact.toLocaleString()}
              </div>
            </div>

            <p className="text-xs text-slate-300 mt-4 leading-relaxed">
              {currentException.aiFinding}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Evidence records analyzed: <strong className="text-white">{currentException.evidenceCount}</strong></span>
            <span>Recommended Owner: <strong className="text-slate-200">{currentException.recommendedOwner}</strong></span>
          </div>
        </div>

        {/* RIGHT COLUMN: AI RECOMMENDATION */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-gradient-to-b from-indigo-950/60 to-slate-900 border border-indigo-500/40 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>✦ AI RECOMMENDATION</span>
              </div>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                {currentException.aiConfidencePct}% Confidence
              </span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight">
              "{currentException.aiRecommendation}"
            </h3>

            <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-indigo-500/20 space-y-2">
              <div className="text-xs font-semibold text-slate-300">
                Why FinSight recommends this action:
              </div>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>Invoice unit price exceeds PO price by +5.08%, exceeding policy threshold of 2.0%.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>Contract (MSA-2025-ABC §4.2) legally locks unit pricing at ₹1,180 through Q4 2026.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>Similar Case #EX-19382 was resolved within 1.2 days through a vendor-issued corrected invoice.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setIsApprovalModalOpen(true)}
              className="flex-1 py-3 sm:py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/25 cursor-pointer text-center"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Approve Recommendation</span>
            </button>

            <button
              onClick={() => setIsVendorInquiryOpen(true)}
              className="py-3 sm:py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-center"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Request Information</span>
            </button>

            <button
              onClick={handleEscalate}
              className="py-3 sm:py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-colors cursor-pointer text-center"
            >
              <span>Escalate</span>
            </button>
          </div>
        </div>
      </div>

      {/* THREE-WAY MATCH VISUAL COMPONENT */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Three-Way Match Reconciliation
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Line-level automated comparison across Invoice, Purchase Order, and Goods Receipt Note.
            </p>
          </div>
          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 shrink-0">
            Tolerance Exceeded
          </span>
        </div>

        {/* 3 Pillars: Invoice, PO, GRN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Invoice Pillar */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-slate-300">1. Invoice</span>
              <span className="text-emerald-400 font-bold">✓ Parsed</span>
            </div>
            <div className="text-sm font-mono font-bold text-white">
              {currentException.matchingData.invoiceNumber}
            </div>
            <div className="text-xs text-slate-400 mt-1">Date: {currentException.matchingData.invoiceDate}</div>
            <div className="mt-3 pt-2 border-t border-slate-800 flex justify-between text-xs">
              <span className="text-slate-400">Total Billed:</span>
              <span className="font-mono font-bold text-rose-400">₹{currentException.matchingData.invoiceTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* PO Pillar */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-slate-300">2. Purchase Order</span>
              <span className="text-emerald-400 font-bold">✓ Matched</span>
            </div>
            <div className="text-sm font-mono font-bold text-white">
              {currentException.matchingData.poNumber}
            </div>
            <div className="text-xs text-slate-400 mt-1">Date: {currentException.matchingData.poDate}</div>
            <div className="mt-3 pt-2 border-t border-slate-800 flex justify-between text-xs">
              <span className="text-slate-400">Authorized:</span>
              <span className="font-mono font-bold text-emerald-400">₹{currentException.matchingData.poTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* GRN Pillar */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/30">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-slate-300">3. Goods Receipt</span>
              <span className="text-amber-400 font-bold">⚠ Discrepancy</span>
            </div>
            <div className="text-sm font-mono font-bold text-white">
              {currentException.matchingData.grnNumber}
            </div>
            <div className="text-xs text-slate-400 mt-1">Date: {currentException.matchingData.grnDate}</div>
            <div className="mt-3 pt-2 border-t border-slate-800 flex justify-between text-xs">
              <span className="text-slate-400">Received Units:</span>
              <span className="font-mono font-bold text-amber-400">95 Units (5 Quarantine)</span>
            </div>
          </div>
        </div>

        {/* Mobile Discrepancy Line Item Card (< md screens) */}
        <div className="block md:hidden p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-rose-300 text-sm">SKU-IND-7712</span>
            <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">+5.08% Variance</span>
          </div>
          <p className="text-xs text-slate-300 font-medium">Industrial Polymer Seal Ring (Batch 40)</p>
          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800/80">
            <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400">Invoice Rate</div>
              <div className="font-mono font-bold text-rose-400 text-base">₹1,240</div>
              <div className="text-[10px] text-slate-500">Qty: 100 units</div>
            </div>
            <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400">PO Auth Rate</div>
              <div className="font-mono font-bold text-emerald-400 text-base">₹1,180</div>
              <div className="text-[10px] text-amber-400">GRN: 95 rec'd (5 hold)</div>
            </div>
          </div>
        </div>

        {/* Discrepancy Line Item Table (>= md screens) */}
        <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 text-[11px] uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Line Code</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4 text-center">Inv Qty</th>
                <th className="py-3 px-4 text-center">PO Qty</th>
                <th className="py-3 px-4 text-center">GRN Qty</th>
                <th className="py-3 px-4 text-right">Inv Rate</th>
                <th className="py-3 px-4 text-right">PO Rate</th>
                <th className="py-3 px-4 text-right">Variance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-slate-900/60">
              <tr className="bg-rose-950/20 text-slate-200">
                <td className="py-3.5 px-4 font-mono font-bold text-rose-300">SKU-IND-7712</td>
                <td className="py-3.5 px-4">Industrial Polymer Seal Ring (Batch 40)</td>
                <td className="py-3.5 px-4 text-center font-mono font-semibold">100</td>
                <td className="py-3.5 px-4 text-center font-mono">100</td>
                <td className="py-3.5 px-4 text-center font-mono text-amber-400 font-semibold">95 ⚠</td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-rose-400">₹1,240</td>
                <td className="py-3.5 px-4 text-right font-mono text-emerald-400">₹1,180</td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-rose-400">+5.08%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* EVIDENCE CENTER: TABS (Invoice, PO, GRN, Contract, Vendor, History) */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Evidence Center
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Exact source documents examined by FinSight AI during automated investigation.
            </p>
          </div>

          {/* Segmented tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto text-xs">
            {[
              { id: 'invoice', label: 'Invoice' },
              { id: 'po', label: 'PO' },
              { id: 'grn', label: 'GRN' },
              { id: 'contract', label: 'Contract' },
              { id: 'vendor', label: 'Vendor' },
              { id: 'hindsight', label: '✦ Hindsight (12)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveEvidenceTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeEvidenceTab === tab.id || (activeEvidenceTab === 'history' && tab.id === 'hindsight')
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Invoice Evidence */}
        {activeEvidenceTab === 'invoice' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-500">Document ID:</span>
                <div className="font-mono font-semibold text-white mt-0.5">INV-28491.pdf</div>
              </div>
              <div>
                <span className="text-slate-500">Vendor Tax / GSTIN:</span>
                <div className="font-mono font-semibold text-white mt-0.5">27AABCA1234F1Z9</div>
              </div>
              <div>
                <span className="text-slate-500">OCR Extraction Engine:</span>
                <div className="font-semibold text-emerald-400 mt-0.5">FinSight Neural OCR (99.2% confidence)</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
              <strong className="text-amber-300">Why this evidence matters:</strong>
              <p className="text-slate-300 mt-1 leading-relaxed">
                The vendor invoice clearly itemizes unit pricing at ₹1,240 on Line 1. This rate is the root source of the discrepancy against the purchase order.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: PO Evidence */}
        {activeEvidenceTab === 'po' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-500">Purchase Order:</span>
                <div className="font-mono font-semibold text-white mt-0.5">PO-88219 (SAP S/4HANA)</div>
              </div>
              <div>
                <span className="text-slate-500">Procurement Officer:</span>
                <div className="font-semibold text-white mt-0.5">K. Patel (Sr. Buyer)</div>
              </div>
              <div>
                <span className="text-slate-500">Authorized Line Rate:</span>
                <div className="font-mono font-bold text-emerald-400 mt-0.5">₹1,180 per unit (Hard ceiling)</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs">
              <strong className="text-indigo-300">Why this evidence matters:</strong>
              <p className="text-slate-300 mt-1 leading-relaxed">
                PO-88219 was issued and digitally acknowledged by ABC Supplies on Sep 12, 2026. No PO amendment requisition was filed before delivery.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: GRN Evidence */}
        {activeEvidenceTab === 'grn' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-500">Receipt Note:</span>
                <div className="font-mono font-semibold text-white mt-0.5">GRN-44910</div>
              </div>
              <div>
                <span className="text-slate-500">Receiving Bay:</span>
                <div className="font-semibold text-white mt-0.5">Bay 4 (Logistics Warehouse)</div>
              </div>
              <div>
                <span className="text-slate-500">Dock Inspection:</span>
                <div className="font-mono font-semibold text-amber-400 mt-0.5">95 Accepted / 5 Quarantined</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
              <strong className="text-amber-300">Why this evidence matters:</strong>
              <p className="text-slate-300 mt-1 leading-relaxed">
                Physical dock check accepted 95 units, while 5 units were flagged during quality assurance seal testing. Finance should enforce credit on the 5 quarantined pieces.
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Contract Evidence */}
        {activeEvidenceTab === 'contract' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-500">Agreement Title:</span>
                <div className="font-semibold text-white mt-0.5">MSA-2025-ABC (Master Supply)</div>
              </div>
              <div>
                <span className="text-slate-500">Valid Period:</span>
                <div className="font-semibold text-white mt-0.5">Jan 01, 2025 - Dec 31, 2026</div>
              </div>
              <div>
                <span className="text-slate-500">Pricing Lock Clause:</span>
                <div className="font-semibold text-cyan-400 mt-0.5">Section 4.2 (Fixed Q4 Rate)</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 font-mono text-xs text-slate-300">
              <div className="text-[11px] text-cyan-400 font-bold uppercase mb-1">Clause §4.2 Extract:</div>
              "The Supplier agrees that prices stipulated for polymer sealing rings shall remain fixed at ₹1,180.00 net per unit for all purchase orders issued prior to December 31, 2026. Any rate adjustments require 30 days mutual written consent."
            </div>
          </div>
        )}

        {/* Tab 5: Vendor History */}
        {activeEvidenceTab === 'vendor' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-500">Total Invoices YTD:</span>
                <div className="font-mono font-bold text-white mt-0.5">284 Invoices</div>
              </div>
              <div>
                <span className="text-slate-500">Exception Rate:</span>
                <div className="font-mono font-bold text-rose-400 mt-0.5">9.5% (27 Mismatches)</div>
              </div>
              <div>
                <span className="text-slate-500">Avg Resolution:</span>
                <div className="font-mono font-bold text-white mt-0.5">1.8 Days</div>
              </div>
              <div>
                <span className="text-slate-500">Relationship Status:</span>
                <div className="font-semibold text-amber-400 mt-0.5">Commercial Review</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
              <strong className="text-slate-300">Vendor Pattern Summary:</strong>
              <p className="text-slate-400 mt-1 leading-relaxed">
                ABC Supplies historically complies promptly when presented with signed contract clauses, typically reissuing invoices within 24–48 hours.
              </p>
            </div>
          </div>
        )}

        {/* Tab 6: Hindsight / Historical Precedents */}
        {(activeEvidenceTab === 'hindsight' || activeEvidenceTab === 'history') && (
          <div className="space-y-5">
            {/* Top Analysis Header */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/80 to-slate-950 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    Hindsight Analysis
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-indigo-500/20 border border-indigo-500/40 text-indigo-300">
                    12 similar historical cases found
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  <strong className="text-cyan-300 font-semibold">Hindsight Insight:</strong> “This exception closely matches previous pricing discrepancies caused by outdated purchase orders.”
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setApprovalNote('Hindsight Precedent Applied: Unit price matches MSA-2025-ABC §4.2 lock. Requesting corrected invoice per 9 historical case resolutions.');
                    addToast({
                      type: 'info',
                      title: 'Insight Applied to Resolution Note',
                      message: 'Hindsight guidance successfully populated in your pending approval draft.'
                    });
                  }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-cyan-300" />
                  <span>Use This Insight</span>
                </button>
                <button
                  onClick={() => setActiveConsoleTab('hindsight')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>View All Cases →</span>
                </button>
              </div>
            </div>

            {/* Pattern & Action Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1">
                  Previous Resolution Pattern
                </div>
                <div className="text-sm font-extrabold text-white">
                  9 of 12 similar cases
                </div>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  Resolved by updating the PO and requesting a corrected invoice from the supplier. 2 cases were escalated to procurement, and 1 case accepted a credit note.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  Recommended Action Based on Hindsight
                </div>
                <p className="text-slate-300 leading-relaxed">
                  “Review the current PO against the latest supplier pricing and request a corrected invoice if the PO is valid.”
                </p>
                <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                  <Info className="w-3 h-3 text-cyan-400" />
                  <span>Final decision remains with the authorized finance controller.</span>
                </div>
              </div>
            </div>

            {/* Similar Past Cases Breakdown */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Key Historical Precedents
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-indigo-400">EXC-2048 · ABC Supplies</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-300">
                      94% Similarity
                    </span>
                  </div>
                  <div className="text-slate-300">
                    <span className="text-slate-500">Root Cause:</span> Outdated PO pricing (₹62,400 variance)
                  </div>
                  <div className="text-slate-300">
                    <span className="text-slate-500">Human Decision:</span> PO updated + corrected invoice requested
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium">
                    Outcome: Resolved in 1.4 days (Full credit received)
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-indigo-400">EXC-1938 · ABC Supplies</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-300">
                      92% Similarity
                    </span>
                  </div>
                  <div className="text-slate-300">
                    <span className="text-slate-500">Root Cause:</span> Price mismatch on polymer gaskets
                  </div>
                  <div className="text-slate-300">
                    <span className="text-slate-500">Human Decision:</span> Corrected invoice requested citing §4.2
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium">
                    Outcome: Resolved in 1.2 days (Reissued with discount)
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI INVESTIGATION AGENT: 7 STEPS AUDIT TRAIL */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
              <Sparkles className="w-4 h-4" />
              <span>Contextual Reasoning Trace</span>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight mt-0.5">
              How FinSight Reached This Conclusion
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">7 of 7 Steps Verified</span>
        </div>

        <div className="space-y-3">
          {currentException.investigationSteps.map((step) => (
            <div
              key={step.stepNumber}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-mono font-bold shrink-0 mt-0.5">
                  {step.stepNumber}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{step.title}</span>
                    <span className="text-[10px] text-slate-500 font-mono">({step.timestamp})</span>
                  </div>
                  <p className="text-slate-300 mt-0.5">{step.findingSummary}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 font-mono text-[10px] text-slate-400">
                  {step.evidenceRef}
                </span>
                <span className="font-mono text-emerald-400 font-semibold text-[11px]">
                  {step.confidencePct}% Conf
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* APPROVAL DIALOG MODAL */}
      {isApprovalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white">Approve AI Resolution</h3>
            <p className="text-xs text-slate-400 mt-1">
              You are approving the recommended resolution: "Request corrected invoice from supplier".
            </p>

            <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
              <div><strong>Invoice:</strong> {currentException.invoiceNumber}</div>
              <div><strong>Supplier:</strong> {currentException.vendorName}</div>
              <div><strong>Amount Blocked:</strong> ₹{currentException.amount.toLocaleString()}</div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Resolution Comments / Audit Log Note
              </label>
              <textarea
                rows={3}
                value={approvalNote}
                onChange={(e) => setApprovalNote(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsApprovalModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/30"
              >
                Confirm Approval & Resolve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VENDOR INQUIRY MODAL */}
      {isVendorInquiryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white">Dispute Inquiry to Vendor</h3>
            <p className="text-xs text-slate-400 mt-1">
              Pre-filled from ERP purchase order and contract terms. Dispatches directly to vendor contact desk.
            </p>

            <div className="mt-4">
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email Message Body
              </label>
              <textarea
                rows={9}
                value={vendorEmailBody}
                onChange={(e) => setVendorEmailBody(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl font-mono text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsVendorInquiryOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSendVendorInquiry}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Notice to Vendor</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
