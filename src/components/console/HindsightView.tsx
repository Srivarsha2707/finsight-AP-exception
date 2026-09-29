import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockHindsightCases, mockHindsightPatterns } from '../../data/mockData';
import { HindsightCase } from '../../types';
import { recallMemory } from '../../src/services/hindsightService';
import {
  History,
  Search,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  Layers,
  X,
  Database,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export const HindsightView: React.FC = () => {
  const {
    setSelectedExceptionId,
    setActiveConsoleTab,
    openCopilotWithPrompt,
    addToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('All');
  const [selectedCaseModal, setSelectedCaseModal] =
    useState<HindsightCase | null>(null);

  // Real Hindsight state
  const [memories, setMemories] = useState<any[]>([]);
  const [isRecalling, setIsRecalling] = useState(false);
  const [recallError, setRecallError] = useState('');

  /*
   * REAL HINDSIGHT RECALL
   *
   * This calls:
   * Browser
   *   ↓
   * hindsightService.ts
   *   ↓
   * Express backend :3001
   *   ↓
   * Hindsight Cloud
   */
  const handleRecall = async () => {
    const query = searchQuery.trim() || 'invoice price mismatch';

    setIsRecalling(true);
    setRecallError('');

    try {
      const result = await recallMemory(query);

      setMemories(result.memories || []);

      addToast({
        type: 'success',
        title: 'Hindsight Recall Complete',
        message: `${(result.memories || []).length} relevant memories retrieved.`
      });
    } catch (error) {
      console.error('Hindsight recall failed:', error);

      setRecallError(
        'Unable to retrieve live Hindsight memories. Make sure the Hindsight server is running on port 3001.'
      );

      setMemories([]);

      addToast({
        type: 'error',
        title: 'Hindsight Recall Failed',
        message: 'Could not retrieve live memories.'
      });
    } finally {
      setIsRecalling(false);
    }
  };

  /*
   * EXISTING PROTOTYPE CASE FILTER
   *
   * We keep the original mock dataset so the existing UI
   * continues to work.
   */
  const filteredCases = mockHindsightCases.filter((c) => {
    const matchesType =
      selectedTypeFilter === 'All' ||
      c.exceptionType === selectedTypeFilter;

    const matchesSearch =
      c.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.rootCause.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.previousAction.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.exceptionType.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

  const handleApplyPrecedent = (caseItem: HindsightCase) => {
    setSelectedCaseModal(null);
    setSelectedExceptionId('INV-28491');
    setActiveConsoleTab('exception-detail');

    addToast({
      type: 'success',
      title: 'Hindsight Precedent Applied',
      message: `Historical resolution pattern from ${caseItem.caseId} linked to active invoice INV-28491.`
    });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">

      {/* =========================================================
          1. HEADER
      ========================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-teal-400 flex items-center justify-center text-white shadow-md">
              <History className="w-4 h-4" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Hindsight Intelligence
            </h1>

            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-indigo-500/20 border border-indigo-500/30 text-indigo-300">
              Historical Memory
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
            Learn from resolved exceptions to make better decisions and prevent recurrence.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              openCopilotWithPrompt(
                'What are the top 3 historical exception patterns across our vendor base?'
              )
            }
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer w-full sm:w-auto justify-center"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Ask Hindsight Copilot</span>
          </button>
        </div>
      </div>

      {/* =========================================================
          HINDSIGHT LIVE STATUS
      ========================================================= */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Hindsight Memory Connected
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs font-medium">
          <Database className="w-3 h-3" />
          finsight-ap-memory
        </div>
      </div>

      {/* =========================================================
          2. THREE CORE QUESTIONS BANNER
      ========================================================= */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-indigo-950/70 via-slate-900 to-teal-950/40 border border-indigo-500/30 shadow-xl">
        <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>
            The Hindsight Triad — How FinSight Evaluates Every Exception
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="font-bold text-indigo-300 text-sm flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-mono text-xs">
                1
              </span>
              <span>Have we seen this before?</span>
            </div>

            <p className="text-slate-300 mt-2 leading-relaxed">
              Hindsight searches historical memory for similar invoices,
              vendors, exception types, root causes, and previous resolutions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="font-bold text-cyan-300 text-sm flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-mono text-xs">
                2
              </span>
              <span>What happened before?</span>
            </div>

            <p className="text-slate-300 mt-2 leading-relaxed">
              Retrieves previous decisions, actions, outcomes, and contextual
              information stored in the FinSight memory bank.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="font-bold text-teal-300 text-sm flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center font-mono text-xs">
                3
              </span>
              <span>What should we do differently?</span>
            </div>

            <p className="text-slate-300 mt-2 leading-relaxed">
              Uses historical evidence to support better recommendations and
              identify recurring issues that can be prevented.
            </p>
          </div>

        </div>
      </div>

      {/* =========================================================
          3. TOP METRICS
      ========================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Similar Cases Found</span>
            <History className="w-4 h-4 text-indigo-400" />
          </div>

          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
            14,820
          </div>

          <div className="mt-1 text-[11px] text-emerald-400 font-mono">
            Historical prototype dataset
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Recurring Patterns</span>
            <Layers className="w-4 h-4 text-amber-400" />
          </div>

          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
            8 Patterns
          </div>

          <div className="mt-1 text-[11px] text-slate-400">
            Prototype pattern analysis
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Resolution Outcomes</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
            91.4%
          </div>

          <div className="mt-1 text-[11px] text-emerald-400/80">
            Prototype consistency score
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Prevention Opportunities</span>
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
          </div>

          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
            ₹2.4M
          </div>

          <div className="mt-1 text-[11px] text-cyan-400 font-mono">
            Prototype opportunity estimate
          </div>
        </div>

      </div>

      {/* =========================================================
          4. PATTERN RETROSPECTIVES
      ========================================================= */}
      <div className="space-y-4">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>What has happened before?</span>

              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                Pattern Retrospectives
              </span>
            </h2>

            <p className="text-xs text-slate-400 mt-0.5">
              Aggregated historical resolution patterns and root cause findings across major exception types.
            </p>
          </div>

          <span className="text-[11px] text-slate-500 font-mono italic">
            Sample prototype dataset
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {mockHindsightPatterns.map((pattern) => {

            const typeBadges: Record<string, string> = {
              'Price Mismatch':
                'bg-rose-500/10 text-rose-300 border-rose-500/30',

              'Missing GRN':
                'bg-amber-500/10 text-amber-300 border-amber-500/30',

              'Duplicate Invoice':
                'bg-purple-500/10 text-purple-300 border-purple-500/30',

              'Tax Discrepancy':
                'bg-blue-500/10 text-blue-300 border-blue-500/30'
            };

            return (
              <div
                key={pattern.id}
                className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm hover:border-slate-700 transition-all space-y-4 flex flex-col justify-between"
              >
                <div>

                  <div className="flex items-center justify-between gap-2">

                    <span
                      className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${
                        typeBadges[pattern.exceptionType] ||
                        'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {pattern.exceptionType}
                    </span>

                    <span className="text-xs font-mono font-bold text-white">
                      {pattern.totalSimilarCases} similar cases
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mt-3">
                    {pattern.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1">
                    Affecting {pattern.affectedValueFormatted} in cumulative invoice volume.
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">

                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Historical Resolution Breakdown:
                    </div>

                    {pattern.breakdown.map((b, idx) => (
                      <div key={idx} className="text-xs">

                        <div className="flex items-center justify-between text-slate-300 mb-1">

                          <span className="truncate max-w-[280px]">
                            • {b.label}
                          </span>

                          <span className="font-mono font-bold text-white shrink-0">
                            {b.count} cases ({b.pct}%)
                          </span>
                        </div>

                        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">

                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-teal-400 rounded-full"
                            style={{ width: `${b.pct}%` }}
                          />

                        </div>

                      </div>
                    ))}

                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1.5">

                    <div>
                      <span className="text-slate-500 font-medium">
                        Root Cause:{' '}
                      </span>

                      <span className="text-slate-300">
                        {pattern.primaryRootCause}
                      </span>
                    </div>

                    <div className="pt-1.5 border-t border-slate-900 text-emerald-400 font-medium">

                      <span>✦ Prevention: </span>

                      <span className="text-slate-200">
                        {pattern.recommendedPrevention}
                      </span>

                    </div>

                  </div>

                </div>

                <div className="pt-2 flex items-center justify-between">

                  <button
                    onClick={() => {
                      setSelectedTypeFilter(pattern.exceptionType);

                      const el =
                        document.getElementById('similar-cases-section');

                      el?.scrollIntoView({
                        behavior: 'smooth'
                      });
                    }}
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View matching past cases</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                </div>

              </div>
            );
          })}

        </div>
      </div>

      {/* =========================================================
          5. SIMILAR PAST CASES
      ========================================================= */}
      <div
        id="similar-cases-section"
        className="space-y-4 pt-4"
      >

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Similar Past Cases
            </h2>

            <p className="text-xs text-slate-400 mt-0.5">
              Search historical FinSight cases and query the live Hindsight memory bank.
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Hindsight Memory Connected</span>
          </div>

        </div>

        {/* =====================================================
            SEARCH + FILTER
        ===================================================== */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 flex-1">

            <div className="relative flex-1 min-w-[200px]">

              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleRecall();
                  }
                }}
                placeholder="Ask Hindsight: invoice price mismatch..."
                className="w-full pl-9 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />

            </div>

            {/* LIVE RECALL BUTTON */}
            <button
              onClick={handleRecall}
              disabled={isRecalling}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900 disabled:text-indigo-400 text-white text-xs font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              {isRecalling ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Recalling...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Recall from Hindsight</span>
                </>
              )}
            </button>

            {/* FILTER BUTTONS */}
            <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto text-xs no-scrollbar">

              {[
                'All',
                'Price Mismatch',
                'Missing GRN',
                'Tax Discrepancy',
                'Duplicate Invoice',
                'Non-PO Expense'
              ].map((type) => (

                <button
                  key={type}
                  onClick={() => setSelectedTypeFilter(type)}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    selectedTypeFilter === type
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {type}
                </button>

              ))}

            </div>

          </div>

          <div className="text-xs text-slate-400 font-mono shrink-0">
            Showing{' '}
            <strong className="text-white">
              {filteredCases.length}
            </strong>{' '}
            prototype cases
          </div>

        </div>

        {/* =====================================================
            LIVE HINDSIGHT RESULTS
        ===================================================== */}
        {(memories.length > 0 || recallError || isRecalling) && (

          <div className="rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-cyan-950/30 border border-indigo-500/30 overflow-hidden">

            <div className="p-4 sm:p-5 border-b border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">

              <div>

                <div className="flex items-center gap-2">

                  <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                    <Database className="w-3.5 h-3.5 text-indigo-300" />
                  </div>

                  <h3 className="text-sm font-bold text-white">
                    Live Hindsight Recall
                  </h3>

                  <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-[10px] font-mono">
                    REAL MEMORY
                  </span>

                </div>

                <p className="text-[11px] text-slate-400 mt-1">
                  Retrieved from the FinSight Hindsight memory bank.
                </p>

              </div>

              {memories.length > 0 && (
                <span className="text-xs font-mono text-cyan-300">
                  {memories.length} memories found
                </span>
              )}

            </div>

            <div className="p-4 sm:p-5">

              {isRecalling && (
                <div className="flex items-center gap-3 py-5 text-sm text-slate-300">

                  <RefreshCw className="w-4 h-4 text-indigo-400 animate-spin" />

                  <span>
                    Searching Hindsight memory for relevant historical context...
                  </span>

                </div>
              )}

              {!isRecalling && recallError && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-950/30 border border-rose-500/30">

                  <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />

                  <div>
                    <div className="text-sm font-semibold text-rose-300">
                      Hindsight recall unavailable
                    </div>

                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {recallError}
                    </p>
                  </div>

                </div>
              )}

              {!isRecalling &&
                !recallError &&
                memories.length === 0 && (
                  <div className="py-6 text-center">

                    <Database className="w-7 h-7 text-slate-600 mx-auto mb-2" />

                    <p className="text-sm text-slate-300">
                      No relevant memories found.
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Try a more specific query such as "invoice price mismatch".
                    </p>

                  </div>
                )}

              {!isRecalling && memories.length > 0 && (
                <div className="space-y-3">

                  {memories.map((memory, index) => (

                    <div
                      key={memory.id || index}
                      className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/30 transition-colors"
                    >

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">

                        <div className="flex items-center gap-2">

                          <span className="w-6 h-6 rounded-lg bg-indigo-500/15 border border-indigo-500/20 text-indigo-300 flex items-center justify-center text-[10px] font-mono font-bold">
                            {index + 1}
                          </span>

                          <span className="text-[10px] uppercase tracking-wider font-semibold text-indigo-300">
                            {memory.type || 'memory'}
                          </span>

                        </div>

                        {memory.mentioned_at && (
                          <span className="text-[10px] text-slate-500 font-mono">
                            {new Date(
                              memory.mentioned_at
                            ).toLocaleDateString()}
                          </span>
                        )}

                      </div>

                      <p className="text-sm text-slate-200 leading-relaxed">
                        {memory.text}
                      </p>

                      {memory.context && (
                        <div className="mt-3 pt-3 border-t border-slate-800">

                          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                            Context
                          </span>

                          <p className="text-xs text-slate-400 mt-1">
                            {memory.context}
                          </p>

                        </div>
                      )}

                    </div>

                  ))}

                </div>
              )}

            </div>
          </div>
        )}

        {/* =====================================================
            MOBILE PROTOTYPE CASE CARDS
        ===================================================== */}
        <div className="block md:hidden space-y-3">

          {filteredCases.map((c) => (

            <div
              key={c.caseId}
              onClick={() => setSelectedCaseModal(c)}
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 active:bg-slate-800/60 transition-all cursor-pointer space-y-3 shadow-sm"
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <span className="font-mono font-bold text-white text-sm">
                    {c.caseId}
                  </span>

                  <span className="text-[10px] font-semibold font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {c.similarityPct}% Match
                  </span>

                </div>

                <span className="text-sm font-mono font-bold text-white">
                  {c.currency}
                  {c.amount.toLocaleString()}
                </span>

              </div>

              <div>

                <div className="text-xs font-semibold text-slate-200">
                  {c.vendorName}
                </div>

                <div className="text-[11px] text-slate-400 mt-0.5">
                  {c.exceptionType} · Resolved in {c.resolutionTime}
                </div>

              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">

                <div className="text-[10px] text-slate-400">
                  Root Cause:
                </div>

                <div className="text-slate-200 mt-0.5 font-medium">
                  {c.rootCause}
                </div>

              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/80">

                <span className="text-[11px] text-emerald-400 font-medium">
                  ✓ {c.outcome.split('—')[0]}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCaseModal(c);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>View Case</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

              </div>

            </div>

          ))}

        </div>

        {/* =====================================================
            DESKTOP PROTOTYPE CASE TABLE
        ===================================================== */}
        <div className="hidden md:block bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full text-left text-xs">

              <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">

                <tr>

                  <th className="py-3.5 px-4 sm:px-6">
                    Case ID
                  </th>

                  <th className="py-3.5 px-4">
                    Type
                  </th>

                  <th className="py-3.5 px-4">
                    Vendor
                  </th>

                  <th className="py-3.5 px-4 text-right">
                    Amount
                  </th>

                  <th className="py-3.5 px-4">
                    Root Cause
                  </th>

                  <th className="py-3.5 px-4">
                    Previous Action & Outcome
                  </th>

                  <th className="py-3.5 px-4 text-center">
                    Turnaround
                  </th>

                  <th className="py-3.5 px-4 text-center">
                    Similarity
                  </th>

                  <th className="py-3.5 px-4 sm:px-6 text-right">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-slate-800/80">

                {filteredCases.map((c) => (

                  <tr
                    key={c.caseId}
                    onClick={() => setSelectedCaseModal(c)}
                    className="hover:bg-slate-800/50 transition-colors cursor-pointer group"
                  >

                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">

                      <span className="font-mono font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {c.caseId}
                      </span>

                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">

                      <span className="text-slate-300 font-medium">
                        {c.exceptionType}
                      </span>

                    </td>

                    <td className="py-4 px-4 whitespace-nowrap text-slate-200">
                      {c.vendorName}
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap text-right font-mono font-bold text-white tabular-nums">
                      {c.currency}
                      {c.amount.toLocaleString()}
                    </td>

                    <td className="py-4 px-4 max-w-[200px]">

                      <div
                        className="text-slate-300 truncate"
                        title={c.rootCause}
                      >
                        {c.rootCause}
                      </div>

                    </td>

                    <td className="py-4 px-4 max-w-[240px]">

                      <div
                        className="text-slate-300 font-medium truncate"
                        title={c.previousAction}
                      >
                        {c.previousAction}
                      </div>

                      <div className="text-[11px] text-emerald-400 truncate mt-0.5">
                        {c.outcome}
                      </div>

                    </td>

                    <td className="py-4 px-4 whitespace-nowrap text-center font-mono text-slate-400">
                      {c.resolutionTime}
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap text-center">

                      <span className="font-mono font-bold px-2 py-0.5 rounded bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-[11px]">
                        {c.similarityPct}%
                      </span>

                    </td>

                    <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCaseModal(c);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium group-hover:bg-indigo-600 group-hover:text-white transition-colors cursor-pointer"
                      >
                        View Case →
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {/* =========================================================
          6. HISTORICAL CASE DETAIL MODAL
      ========================================================= */}
      {selectedCaseModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">

          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-y-auto max-h-[92vh] p-5 sm:p-7 space-y-6">

            <div className="flex items-center justify-between pb-4 border-b border-slate-800">

              <div className="flex items-center gap-2.5">

                <div className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-mono font-bold">
                  <History className="w-4 h-4" />
                </div>

                <div>

                  <div className="flex items-center gap-2 flex-wrap">

                    <h3 className="text-lg font-bold text-white font-mono">
                      Case Dossier: {selectedCaseModal.caseId}
                    </h3>

                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-mono text-[11px]">
                      {selectedCaseModal.similarityPct}% Similarity Match
                    </span>

                  </div>

                  <p className="text-xs text-slate-400">
                    {selectedCaseModal.vendorName} · Resolved on{' '}
                    {selectedCaseModal.resolvedDate}
                  </p>

                </div>

              </div>

              <button
                onClick={() => setSelectedCaseModal(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

            </div>

            {/* Metric strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">

              <div>
                <span className="text-slate-500">
                  Invoice Amount:
                </span>

                <div className="font-mono font-bold text-white text-sm mt-0.5">
                  {selectedCaseModal.currency}
                  {selectedCaseModal.amount.toLocaleString()}
                </div>
              </div>

              <div>
                <span className="text-slate-500">
                  Exception Type:
                </span>

                <div className="font-semibold text-slate-200 mt-0.5">
                  {selectedCaseModal.exceptionType}
                </div>
              </div>

              <div>
                <span className="text-slate-500">
                  Turnaround Time:
                </span>

                <div className="font-mono font-semibold text-cyan-300 mt-0.5">
                  {selectedCaseModal.resolutionTime}
                </div>
              </div>

              <div>
                <span className="text-slate-500">
                  Authorized By:
                </span>

                <div className="font-semibold text-emerald-300 truncate mt-0.5">
                  {selectedCaseModal.humanDecision.split('by ')[1] ||
                    'AP Controller'}
                </div>
              </div>

            </div>

            {/* Root Cause & What Happened */}
            <div className="space-y-4 text-xs">

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">

                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  1. Root Cause Identified
                </div>

                <p className="text-slate-200 leading-relaxed font-medium">
                  {selectedCaseModal.rootCause}
                </p>

                <div className="text-slate-500 text-[11px] pt-1">
                  References: Invoice {selectedCaseModal.invoiceRef} against{' '}
                  {selectedCaseModal.poRef}
                </div>

              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-1.5">

                <div className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">
                  2. Previous Resolution Action
                </div>

                <p className="text-slate-200 leading-relaxed">
                  {selectedCaseModal.previousAction}
                </p>

                <div className="text-emerald-400 font-semibold pt-1">
                  Outcome: {selectedCaseModal.outcome}
                </div>

              </div>

              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5">

                <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">

                  <ShieldCheck className="w-3.5 h-3.5" />

                  <span>
                    3. Hindsight Takeaway & Prevention Rule
                  </span>

                </div>

                <p className="text-slate-200 leading-relaxed">
                  "{selectedCaseModal.keyLearning}"
                </p>

                <div className="text-emerald-300 font-medium pt-1 text-[11px]">
                  System Prevention:{' '}
                  {selectedCaseModal.preventionTakeaway}
                </div>

              </div>

            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">

              <span className="text-xs text-slate-400 text-center sm:text-left">
                Human-in-the-loop: Historical precedents provide advisory guidance only.
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">

                <button
                  onClick={() => setSelectedCaseModal(null)}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>

                <button
                  onClick={() =>
                    handleApplyPrecedent(selectedCaseModal)
                  }
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>
                    Apply Precedent to INV-28491
                  </span>

                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};