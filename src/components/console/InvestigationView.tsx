import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Sparkles, 
  FileText, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

export const InvestigationView: React.FC = () => {
  const { exceptions, setSelectedExceptionId, setActiveConsoleTab, openCopilotWithPrompt } = useApp();
  const [selectedCaseId, setSelectedCaseId] = useState('INV-28491');

  const activeException = exceptions.find(e => e.invoiceNumber === selectedCaseId) || exceptions[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            AI Investigation Agent
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Deep-dive automated reasoning across contracts, vendor ledgers, and PO tolerances.
          </p>
        </div>

        <button
          onClick={() => openCopilotWithPrompt(`Run full investigative diagnostics on ${activeException.invoiceNumber}`)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Launch Copilot Inquiry</span>
        </button>
      </div>

      {/* Case Selector Strip */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-medium shrink-0">Select Target:</span>
        {exceptions.map(exc => (
          <button
            key={exc.id}
            onClick={() => setSelectedCaseId(exc.invoiceNumber)}
            className={`px-3 py-1.5 rounded-lg font-mono font-semibold transition-colors cursor-pointer shrink-0 ${
              selectedCaseId === exc.invoiceNumber
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {exc.invoiceNumber} ({exc.vendorName.split(' ')[0]})
          </button>
        ))}
      </div>

      {/* Primary Investigation Panel */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                {activeException.invoiceNumber}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                · {activeException.vendorName}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              {activeException.exceptionType} Analysis
            </h2>
          </div>

          <button
            onClick={() => {
              setSelectedExceptionId(activeException.invoiceNumber);
              setActiveConsoleTab('exception-detail');
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Full Detail View</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Diagnostic Findings */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/20">
          <div className="text-xs font-semibold text-cyan-300 mb-1">AI Root Cause Assessment:</div>
          <p className="text-xs text-slate-200 leading-relaxed">
            {activeException.aiFinding}
          </p>
        </div>

        {/* 7-Step Reasoning Sequence */}
        <div>
          <h3 className="text-sm font-bold text-white mb-3">Autonomous Investigation Steps</h3>
          <div className="space-y-2.5">
            {activeException.investigationSteps.length > 0 ? (
              activeException.investigationSteps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-indigo-600/20 text-indigo-400 font-mono font-bold flex items-center justify-center shrink-0">
                      {step.stepNumber}
                    </span>
                    <div>
                      <div className="font-semibold text-white">{step.title}</div>
                      <div className="text-[11px] text-slate-400">{step.findingSummary}</div>
                    </div>
                  </div>
                  <div className="font-mono text-emerald-400 font-bold shrink-0">
                    {step.confidencePct}% Conf
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-400">
                Investigation sequence synthesized for this case. Direct matching discrepancy recorded.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
