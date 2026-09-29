import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Layers, 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  History
} from 'lucide-react';

export const PreventionView: React.FC = () => {
  const { setActiveConsoleTab, setSelectedExceptionId, openCopilotWithPrompt } = useApp();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Prevention & Self-Learning Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Detect recurring exception root causes and continuously learn from human controller decisions.
          </p>
        </div>

        <button
          onClick={() => setActiveConsoleTab('hindsight')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600/30 text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto"
        >
          <History className="w-3.5 h-3.5" />
          <span>Open Hindsight Intelligence →</span>
        </button>
      </div>

      {/* HINDSIGHT TO PREVENTION FLOW STRIP */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-indigo-500/30 shadow-md">
        <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-1.5">
          <History className="w-3.5 h-3.5" />
          <span>How Hindsight Powers Exception Prevention</span>
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
          {[
            { label: 'Resolved Cases', desc: '14,820 historic records' },
            { label: 'Hindsight Analysis', desc: 'Vector similarity search' },
            { label: 'Pattern Detection', desc: 'Vendor & SKU clustering' },
            { label: 'Recurring Issue', desc: 'Root cause synthesis' },
            { label: 'Prevention Recommendation', desc: 'ERP guardrails & PO checks' }
          ].map((node, idx, arr) => (
            <React.Fragment key={node.label}>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 shrink-0 min-w-[150px]">
                <div className="font-bold text-white text-xs">{node.label}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{node.desc}</div>
              </div>
              {idx < arr.length - 1 && (
                <ArrowRight className="w-4 h-4 text-indigo-400 shrink-0 mx-1" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 1. RECURRING ISSUE DETECTION HERO */}
      <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-amber-950/50 via-slate-900 to-indigo-950/40 border border-amber-500/40 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>✦ Recurring Issue Detected</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              ABC Supplies — repeated price mismatch
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span className="text-rose-400 font-mono font-bold text-xs sm:text-sm bg-rose-500/10 px-2.5 py-1 rounded-md border border-rose-500/20">
                27 cases
              </span>
              <span className="text-amber-300 font-mono font-bold text-xs sm:text-sm bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                ₹1.8M affected invoice value
              </span>
              <span className="text-slate-300 text-xs">
                Common pattern: <strong>outdated PO pricing</strong>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
              <strong>Likely cause:</strong> Vendor billing system ERP rate table appears out of sync with current Master Agreement MSA-2025-ABC (§4.2). The vendor has been invoicing standard list rates (₹1,240) rather than the negotiated contract rate (₹1,180).
            </p>
            <div className="mt-3 p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200">
              <strong className="text-cyan-300">Prevention recommendation:</strong> Review supplier pricing updates before PO creation and enforce master rate sync in procurement catalog.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => openCopilotWithPrompt('Explain the 27 recurring price mismatches with ABC Supplies and draft an audit memo.')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
            >
              Ask Copilot to Analyze
            </button>
            <button
              onClick={() => {
                setSelectedExceptionId('INV-28491');
                setActiveConsoleTab('exception-detail');
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              Investigate Pattern →
            </button>
          </div>
        </div>
      </div>

      {/* 2. SELF-LEARNING FROM RESOLUTION HISTORY */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <TrendingUp className="w-4 h-4" />
            <span>Continuous Human-in-the-Loop Feedback</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1">
            FinSight Learns From Resolution History
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Every human override, approval note, and vendor settlement outcome updates the neural routing weights.
          </p>
        </div>

        {/* Learning Workflow Illustration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-[11px] font-bold text-cyan-400 uppercase">1. AI Initial Recommendation</div>
            <div className="text-white font-semibold mt-1">"Request corrected invoice"</div>
            <p className="text-slate-400 mt-1">Confidence 92% based on standard contract terms.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-[11px] font-bold text-amber-400 uppercase">2. Human Decision / Override</div>
            <div className="text-white font-semibold mt-1">"Update PO with emergency surcharge"</div>
            <p className="text-slate-400 mt-1">Reason: Rush freight authorized by VP Procurement.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30">
            <div className="text-[11px] font-bold text-emerald-400 uppercase">3. Model Adaptation</div>
            <div className="text-emerald-300 font-semibold mt-1">Weight Updated for Emergency Tags</div>
            <p className="text-slate-400 mt-1">Future rush freight orders will auto-route to VP PO amendment queue.</p>
          </div>
        </div>

        {/* AI Learning History Table */}
        <div className="rounded-xl border border-slate-800 overflow-hidden text-xs">
          <div className="p-3.5 bg-slate-950/70 border-b border-slate-800 font-bold text-slate-300">
            AI Model Learning Log (Recent Human Overrides)
          </div>
          <div className="divide-y divide-slate-800/80">
            {[
              {
                id: 'LRN-401',
                vendor: 'TechNova Solutions',
                originalAI: 'Request Corrected Invoice',
                humanDecision: 'Updated PO with Retroactive Approval',
                reason: 'Supplier provided expedited freight receipt approved by plant manager.',
                adaptation: 'Trained model to recognize expediting sign-off tags in Bay 4 dock logs.',
                date: 'Sep 22, 2026'
              },
              {
                id: 'LRN-402',
                vendor: 'Global Logistics Corp',
                originalAI: 'Reject Invoice for Tax Delta',
                humanDecision: 'Accepted Reverse Charge Mechanism (RCM)',
                reason: 'Interstate transport falls under Indian GST RCM notification §9(3).',
                adaptation: 'Integrated freight tax exemption lookup into automated 3-way matcher.',
                date: 'Sep 18, 2026'
              }
            ].map((lrn) => (
              <div key={lrn.id} className="p-4 bg-slate-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-indigo-400">{lrn.id}</span>
                    <span className="text-white font-semibold">{lrn.vendor}</span>
                    <span className="text-slate-500">· {lrn.date}</span>
                  </div>
                  <div className="text-slate-300">
                    <strong>AI Recommendation:</strong> <span className="text-slate-400">{lrn.originalAI}</span> → <strong className="text-amber-300">Human Override:</strong> {lrn.humanDecision}
                  </div>
                  <div className="text-[11px] text-slate-400 leading-relaxed">
                    <strong>Recorded Reason:</strong> {lrn.reason}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-emerald-500/20 text-xs shrink-0 max-w-xs">
                  <div className="text-emerald-400 font-semibold">Model Optimization:</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">{lrn.adaptation}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
